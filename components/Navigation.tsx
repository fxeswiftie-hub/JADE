'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-jade-600 to-rose-500 bg-clip-text text-transparent">
            ✨ JADE
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/inspiration" className="text-gray-600 hover:text-jade-600 transition-colors">Inspiration</Link>
            <Link href="/portfolio" className="text-gray-600 hover:text-jade-600 transition-colors">Portfolio</Link>
            <Link href="/login" className="px-6 py-2 bg-gradient-to-r from-jade-500 to-jade-600 text-white rounded-full font-semibold hover:shadow-medium transition-all">Login</Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-jade-100">
            <Link href="/inspiration" className="block py-2 text-gray-600 hover:text-jade-600">Inspiration</Link>
            <Link href="/portfolio" className="block py-2 text-gray-600 hover:text-jade-600">Portfolio</Link>
            <Link href="/login" className="block py-2 px-6 bg-jade-500 text-white rounded-full font-semibold mt-4 text-center">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
