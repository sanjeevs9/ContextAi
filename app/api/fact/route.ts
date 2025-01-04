import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { FactCheckRequest, FactCheckResponse } from '@/utils/type';
import { validateAuth } from '@/lib/auth-middleware';
import getPerplexityCompletion from '@/lib/perplexity';
import dotenv from 'dotenv';

dotenv.config();
const supabase = createClient();

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await validateAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized', login: false }, { status: 401 });
    }

    // Check subscription status and daily limit
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_status, daily_check_limit, user_id')
      .eq('email', session.userData?.email)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'Error fetching user data', buy: false, login: false }, { status: 500 });
    }
   
    const isPremium = userData.subscription_status === 'premium';
    if (!isPremium && userData.daily_check_limit <= 0) {
      return NextResponse.json({ 
        error: 'Daily limit reached. Please upgrade to premium for unlimited checks.',
        buy: false,
        login: true
      }, { status: 403 });
    }

    const body: FactCheckRequest = await request.json();
    const { text, domain } = body;

    // Perform fact checking
    const factCheck = await checkIfOpinion(text);
    // const sourceCredibility = domain ? await getSourceCredibility(domain) : undefined;

    const response: FactCheckResponse = {
      ...factCheck,
      // sourceCredibility,
    };

    // Cache the results
    const { data : cacheData, error: cacheError } = await supabase
      .from('fact_check_cache')
      .insert({
        user_id: userData.user_id,
        query_text: text,
        confidence_score: factCheck.factualScore,
        result_type: factCheck.isOpinion ? false : true,
        explanation: factCheck.explanation,
        reference_sources: factCheck.references || [],
      })
      .select()
      .single();

    if (cacheError) {
      console.error('Error storing in cache:', cacheError);
    }

    // Decrease daily limit for free users
    if (!isPremium) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ daily_check_limit: userData.daily_check_limit - 1 })
        .eq('email', session.userData?.email);

      if (updateError) {
        console.error('Error updating daily limit:', updateError);
      }
    }
  
    return NextResponse.json({
      ...response,
      cache_id: cacheData.cache_id  
    });
  } catch (error) {
    console.error('Fact-check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkIfOpinion(text: string) {
  const messages = [
    {
      role: "system",
      content: `You are a fact-checking assistant. Analyze the given statement and return ONLY a JSON object in this exact format:
      {
        "isOpinion": boolean,
        "factualScore": number (0-100),
        "references": ["url1", "url2"],
        "explanation": "minimum 100 words explanation"
      }

      Rules:
      1. isOpinion: true if statement is subjective, false if objective
      2. factualScore: 0-100 indicating how factual the statement is
      3. references: array of credible source URLs
      4. explanation: detailed analysis in minimum 100 words
      
      Return ONLY the JSON object, no additional text or markdown.`
    },
    {
      role: "user",
      content: text
    }
  ];

  const completion = await getPerplexityCompletion(messages);
  console.log(completion.choices[0].message.content);
  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    throw new Error('Invalid response format from API');
  }
}

// async function getSourceCredibility(domain: string) {
//   const { data, error } = await supabase
//     .from('domain_credibility')
//     .select('score, label')
//     .eq('domain', domain)
//     .single();

//   if (error || !data) {
//     return {
//       score: 0,
//       label: 'Unknown' as const
//     };
//   }

//   return data;
// }