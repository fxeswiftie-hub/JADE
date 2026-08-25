'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Portfolio {
  _id: string;
  title: string;
  description: string;
  type: 'photography' | 'copywriting' | 'music' | 'handicraft';
  imageUrl?: string;
  contentUrl?: string;
  createdAt: string;
}

const typeEmojis = {
  photography: '📸',
  copywriting: '✍️',
  music: '🎵',
  handicraft: '🧶',
};

const typeColors = {
  photography: 'from-rose-500 to-rose-600',
  copywriting: 'from-jade-500 to-jade-600',
  music: 'from-cyan-500 to-cyan-600',
  handicraft: 'from-amber-500 to-amber-600',
};

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setPortfolios(data.portfolios || []);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolios = selectedType
    ? portfolios.filter(p => p.type === selectedType)
    : portfolios;

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-jade-600 to-rose-500 bg-clip-text text-transparent">
            🌟 Portfolio Showcase
          </h1>
          <p className="text-xl text-gray-600">
            Explore amazing creative works from our community
          </p>
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedType === null
                ? 'bg-gradient-to-r from-jade-500 to-jade-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-jade-200 hover:border-jade-400'
            }`}
          >
            All Works
          </button>
          {Object.entries(typeEmojis).map(([type, emoji]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedType === type
                  ? `bg-gradient-to-r ${typeColors[type as keyof typeof typeColors]} text-white shadow-md`
                  : 'bg-white text-gray-700 border border-jade-200 hover:border-jade-400'
              }`}
            >
              {emoji} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading portfolio...</p>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">No works found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((work) => (
              <div
                key={work._id}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-lg card-hover overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-jade-200 to-rose-200 overflow-hidden">
                  {work.imageUrl ? (
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      {typeEmojis[work.type as keyof typeof typeEmojis]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                      {work.title}
                    </h3>
                    <span className={`ml-2 px-3 py-1 bg-gradient-to-r ${typeColors[work.type as keyof typeof typeColors]} text-white text-xs rounded-full font-bold whitespace-nowrap`}>
                      {work.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{new Date(work.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors font-medium">
                      <Heart size={18} />
                      <span>Like</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-jade-50 text-jade-600 hover:bg-jade-100 rounded-lg transition-colors font-medium">
                      <MessageCircle size={18} />
                      <span>Comment</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyan-50 text-cyan-600 hover:bg-cyan-100 rounded-lg transition-colors font-medium">
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
