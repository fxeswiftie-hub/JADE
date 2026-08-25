'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Brain, Gallery } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-jade-600 via-rose-500 to-cyan-500 bg-clip-text text-transparent animate-fade-in">
            ✨ JADE
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            A creative platform for collecting inspiration, brainstorming with AI, and showcasing your masterpieces
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/inspiration" className="px-8 py-3 bg-gradient-to-r from-jade-500 to-jade-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:-translate-y-1">
              Explore Inspiration <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link href="/login" className="px-8 py-3 border-2 border-jade-300 text-jade-600 rounded-full font-semibold hover:bg-jade-50 transition-all">
              Start Creating
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-rose-500" size={32} />,
                title: '📚 Inspiration Library',
                description: 'Collect and organize inspiration from books, websites, designs, and more',
              },
              {
                icon: <Brain className="text-jade-500" size={32} />,
                title: '💡 AI Creative Workshop',
                description: 'Collaborate with 4 different AI models to expand and refine your ideas',
              },
              {
                icon: <Gallery className="text-cyan-500" size={32} />,
                title: '🌟 Portfolio Showcase',
                description: 'Display your works in photography, copywriting, music, and crafts',
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white shadow-soft hover:shadow-medium card-hover">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Create?</h2>
          <p className="text-lg text-gray-600 mb-8">Join JADE and transform your creative process with AI assistance</p>
          <Link href="/register" className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all hover:-translate-y-1 inline-block">
            Get Started Now <ArrowRight className="inline ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
