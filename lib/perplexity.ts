
interface Message {
  role: string;
  content: string;
}

interface CompletionResponse {
  choices: Array<{
    message: {
      content: string;
    }
  }>;
}

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

async function getPerplexityCompletion(messages: Message[]): Promise<CompletionResponse> {
    console.log(messages)
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: messages,
      max_tokens: 1024,
    })
  });

  if (!response.ok) {
    throw new Error(`Perplexity API error: ${response.statusText}`);
  }

  return response.json();
}

export default getPerplexityCompletion; 