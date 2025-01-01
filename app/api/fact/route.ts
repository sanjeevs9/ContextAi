import { OpenAI } from 'openai';
import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { FactCheckRequest, FactCheckResponse } from '@/utils/type';
import { validateAuth } from '@/lib/auth-middleware';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const supabase = createClient();

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await validateAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized',login:false }, { status: 401 });
    }
    console.log(session.userData?.email)
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

    // If free user and daily limit is 0, stop the process
    if (!isPremium && userData.daily_check_limit <= 0) {
      return NextResponse.json({ 
        error: 'Daily limit reached. Please upgrade to premium for unlimited checks.' ,
        buy: false,
        login: true
      }, { status: 403 });
    }

    const body: FactCheckRequest = await request.json();
    const { text, domain } = body;

    // Perform all fact checking operations
    const opinionCheck = await checkIfOpinion(text);
    
    let response: FactCheckResponse;
    let confidenceScore = 0;
    let resultType='false';
    
    if (opinionCheck.isOpinion) {
      response = {
        isOpinion: true,
        factualScore: 0,
        explanation: opinionCheck.explanation,
      };
      confidenceScore = 0;
      resultType = 'false';
    } else {
      const factCheck = await performFactCheck(text);
  
      const sourceCredibility = domain ? 
        await getSourceCredibility(domain) : undefined;

      response = {
        ...factCheck,
        isOpinion: false,
        sourceCredibility,
      };
      confidenceScore = factCheck.factual_score;
      resultType = 'true';
    }
    
    const explanation = response.explanation || response.detailed_explanation;
    console.log(userData);
    // Update the cache with results
    const { data: cacheData, error: cacheError } = await supabase
    .from('fact_check_cache')
    .insert({
      user_id: userData.user_id,
      query_text: text,
      confidence_score: confidenceScore, // Will update this after fact check
      result_type: resultType,      // Will update this after fact check
      explanation: explanation,      // Will update this after fact check
      reference_sources: response.references || [], // Will update this after fact check
    })
    .select()
    .single();

 
  if (cacheError) {
    console.error('Error storing in cache:', cacheError);
  }

    // Decrease daily limit for free users after successful fact check
    if (!isPremium) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ daily_check_limit: userData.daily_check_limit - 1 })
        .eq('email', session.userData?.email);

      if (updateError) {
        console.error('Error updating daily limit:', updateError);
      }
    }
    response.cache_id = cacheData?.cache_id;
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Fact-check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

//check if the text is an opinion
async function checkIfOpinion(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a fact-checking assistant that MUST return JSON in this exact format:
        {
          "isOpinion": boolean,
          "factualScore": number,  // 0-100
          "references": string[],
          "explanation": string    // use this field name only
        }

        Example correct response:
        {
          "isOpinion": false,
          "factualScore": 100,
          "references": ["https://example.com/source"],
          "explanation": "This is a factual statement because..."
        }

        CRITICAL REQUIREMENTS:
        - Field names must be exactly as shown above
        - DO NOT use "factual_score" or "detailed_explanation"
        - Use "factualScore" and "explanation" exactly as written
        - No additional fields allowed
        - No variant field names allowed`
      },
      {
        role: "user",
        content: text
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content!);
}

async function performFactCheck(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `Fact check the given statement and provide:
          - A factual score (0-100)
          - A detailed explanation
          - References if possible
          Respond in JSON format.`
      },
      {
        role: "user",
        content: text
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content!);
}

async function getSourceCredibility(domain: string) {
  // Check domain credibility in Supabase
  const { data, error } = await supabase
    .from('domain_credibility')
    .select('score, label')
    .eq('domain', domain)
    .single();

  if (error || !data) {
    return {
      score: 0,
      label: 'Unknown' as const
    };
  }

  return data;
}