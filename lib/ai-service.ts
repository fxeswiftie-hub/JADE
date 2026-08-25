import axios from 'axios';

interface AIResponse {
  provider: string;
  content: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export async function callOpenAI(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    return {
      provider: 'OpenAI',
      content: response.data.choices[0].message.content,
      usage: {
        inputTokens: response.data.usage.prompt_tokens,
        outputTokens: response.data.usage.completion_tokens,
      },
    };
  } catch (error) {
    throw new Error(`OpenAI API error: ${error}`);
  }
}

export async function callClaude(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
    });

    return {
      provider: 'Claude',
      content: response.data.content[0].text,
      usage: {
        inputTokens: response.data.usage.input_tokens,
        outputTokens: response.data.usage.output_tokens,
      },
    };
  } catch (error) {
    throw new Error(`Claude API error: ${error}`);
  }
}

export async function callGemini(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [{
          parts: [{ text: prompt }],
        }],
      }
    );

    return {
      provider: 'Gemini',
      content: response.data.candidates[0].content.parts[0].text,
    };
  } catch (error) {
    throw new Error(`Gemini API error: ${error}`);
  }
}

export async function callDeepSeek(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post('https://api.deepseek.com/chat/completions', {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
    });

    return {
      provider: 'DeepSeek',
      content: response.data.choices[0].message.content,
    };
  } catch (error) {
    throw new Error(`DeepSeek API error: ${error}`);
  }
}

export async function moderateContent(content: string): Promise<boolean> {
  try {
    const response = await axios.post('https://api.openai.com/v1/moderations', {
      input: content,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const result = response.data.results[0];
    return !result.flagged;
  } catch (error) {
    console.error('Moderation error:', error);
    return true;
  }
}
