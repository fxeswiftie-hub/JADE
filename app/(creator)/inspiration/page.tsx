'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Tag, Search } from 'lucide-react';
import Link from 'next/link';

interface Inspiration {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  source?: string;
  createdAt: string;
}

export default function InspirationPage() {
  const [inspirations, setInspirations] = useState<Inspiration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInspirations();
  }, []);

  const fetchInspirations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/inspiration', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setInspirations(data.inspirations || []);
    } catch (error) {
      console.error('Failed to fetch inspirations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInspirations = inspirations.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'book', 'website', 'design', 'copywriting', 'visual', 'other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-jade-600 to-rose-500 bg-clip-text text-transparent">
            📚 My Inspiration Library
          </h1>
          <p className="text-xl text-gray-600">
            Explore and organize your creative inspiration
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 text-jade-400" size={20} />
            <input
              type="text"
              placeholder="Search inspiration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-jade-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jade-500 bg-white/80 backdrop-blur"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-jade-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-jade-200 hover:border-jade-400'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Inspiration Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading inspiration...</p>
          </div>
        ) : filteredInspirations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">No inspiration found yet</p>
            <Link
              href="/workshop"
              className="inline-block px-6 py-3 bg-gradient-to-r from-jade-500 to-jade-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Creating
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInspirations.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-soft hover:shadow-lg card-hover overflow-hidden group"
              >
                {item.imageUrl && (
                  <div className="h-48 bg-gradient-to-br from-jade-200 to-rose-200 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-jade-100 text-jade-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-jade-600 hover:bg-jade-50 rounded-lg transition-colors">
                      <Heart size={16} />
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm">Use</span>
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
