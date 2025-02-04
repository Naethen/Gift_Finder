'use client';

import Link from 'next/link';
import { GiftIcon, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <GiftIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GiftFinder</span>
            </Link>
          </div>
          <div className="ml-10 flex items-center space-x-4">
            <Link
              href="/favorites"
              className="relative inline-flex items-center p-2 text-gray-400 hover:text-gray-600"
            >
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                >
                  {favorites.length}
                </motion.span>
              )}
            </Link>
            <Link
              href="/quiz"
              className="inline-block rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
            >
              Find a Gift
            </Link>
            <Link
              href="/browse"
              className="inline-block rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
            >
              Browse All
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
