'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">✨ JADE</h3>
            <p className="text-sm">A creative platform for collecting inspiration, collaborating with AI, and showcasing your work</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/inspiration" className="hover:text-jade-400 transition-colors">Inspiration</Link></li>
              <li><Link href="/portfolio" className="hover:text-jade-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-jade-400 transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="hover:text-jade-400 transition-colors">Documentation</Link></li>
              <li><Link href="/faq" className="hover:text-jade-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-jade-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-jade-400 transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-jade-400 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 JADE. All rights reserved. ✨</p>
        </div>
      </div>
    </footer>
  );
}
