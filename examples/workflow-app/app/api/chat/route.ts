import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini', {
        apiKey: process.env.OPENAI_API_KEY,
      }),
      messages,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
