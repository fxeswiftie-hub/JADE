'use client';

import { useState } from 'react';
import { Send, Loader } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  provider?: string;
  timestamp: Date;
}

interface ProviderChat {
  provider: string;
  messages: Message[];
  loading: boolean;
}

export default function WorkshopPage() {
  const [chats, setChats] = useState<ProviderChat[]>([
    { provider: 'OpenAI', messages: [], loading: false },
    { provider: 'Claude', messages: [], loading: false },
    { provider: 'Gemini', messages: [], loading: false },
    { provider: 'DeepSeek', messages: [], loading: false },
  ]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('New Creative Session');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');

    // Add user message to all chats
    setChats(chats.map(chat => ({
      ...chat,
      messages: [...chat.messages, { role: 'user', content: userMessage, timestamp: new Date() }],
      loading: true,
    })));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: userMessage,
          providers: ['openai', 'claude', 'gemini', 'deepseek'],
        }),
      });

      const data = await response.json();

      // Update chats with AI responses
      setChats(chats.map(chat => {
        const response = data.responses.find((r: any) => r.provider === chat.provider);
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              role: 'assistant',
              content: response?.content || response?.error || 'No response',
              provider: chat.provider,
              timestamp: new Date(),
            },
          ],
          loading: false,
        };
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      setChats(chats.map(chat => ({ ...chat, loading: false })));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-jade-600 to-rose-500 bg-clip-text text-transparent">
            💡 AI Creative Workshop
          </h1>
          <p className="text-xl text-gray-600">
            Chat with 4 different AI models simultaneously to refine your ideas
          </p>
        </div>

        {/* Workshop Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {chats.map((chat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-soft flex flex-col h-96 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-jade-500 to-jade-600 text-white p-4">
                <h3 className="text-lg font-bold">{chat.provider}</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat.messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-center">
                      Start a conversation with {chat.provider}...
                    </p>
                  </div>
                ) : (
                  chat.messages.map((msg, msgIdx) => (
                    <div
                      key={msgIdx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-jade-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {chat.loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2">
                      <Loader size={16} className="animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-jade-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Share your creative idea with all 4 AI models..."
                className="flex-1 px-4 py-3 border border-jade-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jade-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-jade-500 to-jade-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Send size={20} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
