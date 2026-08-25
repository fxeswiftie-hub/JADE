'use client';

import { useState, useEffect } from 'react';
import { User, Settings, LogOut, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserStats {
  inspirations: number;
  workshops: number;
  portfolios: number;
  likes: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<UserStats>({
    inspirations: 0,
    workshops: 0,
    portfolios: 0,
    likes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // In a real app, you'd fetch from an API endpoint
      // For now, we'll use mock data
      setUser({
        name: 'Creative Creator',
        email: 'creator@example.com',
        username: 'creator123',
        avatar: '👤',
      });
      setStats({
        inspirations: 24,
        workshops: 8,
        portfolios: 5,
        likes: 342,
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-jade-50 via-rose-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-jade-600 to-rose-500 bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-lg text-gray-600">Your creative journey dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-jade-400 to-rose-400 rounded-full flex items-center justify-center text-4xl">
                {user?.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">@{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 bg-jade-50 text-jade-600 rounded-lg hover:bg-jade-100 transition-colors font-medium"
            >
              <Settings size={20} />
              Settings
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Inspirations', value: stats.inspirations, icon: '💡', color: 'from-jade-500 to-jade-600' },
            { label: 'Workshops', value: stats.workshops, icon: '🛠️', color: 'from-rose-500 to-rose-600' },
            { label: 'Portfolios', value: stats.portfolios, icon: '🌟', color: 'from-cyan-500 to-cyan-600' },
            { label: 'Likes Received', value: stats.likes, icon: '❤️', color: 'from-amber-500 to-amber-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {stat.icon}
              </div>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/inspiration"
            className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-lg card-hover text-center"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Inspiration</h3>
            <p className="text-gray-600 mb-4">Browse and manage your inspiration collection</p>
            <span className="text-jade-600 font-semibold hover:underline">Visit →</span>
          </Link>

          <Link
            href="/workshop"
            className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-lg card-hover text-center"
          >
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Creative Workshop</h3>
            <p className="text-gray-600 mb-4">Chat with 4 AI models to refine your ideas</p>
            <span className="text-rose-600 font-semibold hover:underline">Enter →</span>
          </Link>

          <Link
            href="/portfolio"
            className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-lg card-hover text-center"
          >
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Portfolio</h3>
            <p className="text-gray-600 mb-4">Showcase your creative masterpieces</p>
            <span className="text-cyan-600 font-semibold hover:underline">View →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
