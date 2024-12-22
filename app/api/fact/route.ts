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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: FactCheckRequest = await request.json();
    const { text, domain } = body;

    // 1. Check if it's an opinion
    const opinionCheck = await checkIfOpinion(text);
    
    if (opinionCheck.isOpinion) {
      return NextResponse.json({
        isOpinion: true,
        factualScore: 0,
        explanation: opinionCheck.explanation,
      });
    }

    // 2. Perform fact check
    const factCheck = await performFactCheck(text);

    // 3. Get source credibility if domain is provided
    const sourceCredibility = domain ? 
      await getSourceCredibility(domain) : undefined;

    const response: FactCheckResponse = {
      ...factCheck,
      isOpinion: false,
      sourceCredibility,
    };

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