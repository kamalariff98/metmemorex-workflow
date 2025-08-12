import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    // Add system message for code generation
    const systemMessage = {
      role: 'system' as const,
      content: 'You are a helpful coding assistant. Generate clean, well-documented code based on the user\'s requirements. Always include comments explaining the code. Format your response as code blocks with appropriate language tags.'
    };

    const result = await streamText({
      model: openai('gpt-4o-mini', {
        apiKey: process.env.OPENAI_API_KEY,
      }),
      messages: [systemMessage, ...messages],
      temperature: 0.2, // Lower temperature for more consistent code
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Code API error:', error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
