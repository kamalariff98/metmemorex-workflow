import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return Response.json({ success: false, error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Use OpenAI API directly
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error?.message || 'Failed to generate image');
    }

    return Response.json({ 
      success: true, 
      imageUrl: result.data[0].url,
      mimeType: 'image/png'
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to generate image' 
    }, { status: 500 });
  }
}

