'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import GiftCard from '@/components/gifts/GiftCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4"
          >
            <Heart className="w-6 h-6 text-red-600 fill-current" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Favorite Gifts
          </h1>
          <p className="text-lg text-gray-800">
            Keep track of gifts you love and want to remember for later.
          </p>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
              hidden: {
                opacity: 0,
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {favorites.map((gift) => (
                <motion.div
                  key={gift.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <GiftCard gift={gift} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-700">
              Start adding gifts to your favorites by clicking the heart icon on any gift card.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
