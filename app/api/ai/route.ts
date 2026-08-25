import { NextRequest, NextResponse } from 'next/server';
import { callOpenAI, callClaude, callGemini, callDeepSeek } from '@/lib/ai-service';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const verified = token ? verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { prompt, providers = ['openai', 'claude', 'gemini', 'deepseek'] } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const results: any[] = [];

    // Call selected AI providers in parallel
    const promises = [];

    if (providers.includes('openai')) {
      promises.push(
        callOpenAI(prompt)
          .then(result => results.push(result))
          .catch(err => results.push({ provider: 'OpenAI', error: err.message }))
      );
    }

    if (providers.includes('claude')) {
      promises.push(
        callClaude(prompt)
          .then(result => results.push(result))
          .catch(err => results.push({ provider: 'Claude', error: err.message }))
      );
    }

    if (providers.includes('gemini')) {
      promises.push(
        callGemini(prompt)
          .then(result => results.push(result))
          .catch(err => results.push({ provider: 'Gemini', error: err.message }))
      );
    }

    if (providers.includes('deepseek')) {
      promises.push(
        callDeepSeek(prompt)
          .then(result => results.push(result))
          .catch(err => results.push({ provider: 'DeepSeek', error: err.message }))
      );
    }

    await Promise.all(promises);

    return NextResponse.json(
      { responses: results },
      { status: 200 }
    );
  } catch (error) {
    console.error('AI service error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
