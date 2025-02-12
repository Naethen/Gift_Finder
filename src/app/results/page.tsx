'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useGiftResults } from '@/hooks/useGiftResults';
import GiftCard from '@/components/gifts/GiftCard';
import GiftCardSkeleton from '@/components/gifts/GiftCardSkeleton';
import { Sparkles, Filter, ArrowUp, ArrowDown, RefreshCcw } from 'lucide-react';

// Dynamically import Confetti for better performance
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function ResultsPage() {
  const {
    results,
    loading,
    error,
    filteredGifts,
    sortOrder,
    handleSort,
    filterByPriceRange
  } = useGiftResults();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [showConfetti, setShowConfetti] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <GiftCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Oops! {error}</h2>
        <p className="text-gray-600 mb-8">Let's find you the perfect gift!</p>
        <Link
          href="/quiz"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          Take the Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h1 className="text-3xl font-bold">Your Perfect Gifts Await!</h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-600">
            We've found {filteredGifts.length} amazing gifts based on your preferences
          </p>
        </motion.div>

        {/* Filters and Sort Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSort('price-asc')}
                  className={`px-3 py-1 rounded-lg ${
                    sortOrder === 'price-asc'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSort('price-desc')}
                  className={`px-3 py-1 rounded-lg ${
                    sortOrder === 'price-desc'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Link
              href="/quiz"
              className="inline-flex items-center px-4 py-2 rounded-lg text-primary hover:bg-primary/10"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Link>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-24 px-3 py-2 border rounded-lg"
                        onChange={(e) => {
                          const min = Number(e.target.value);
                          const max = Number(
                            (e.target.nextElementSibling as HTMLInputElement)?.value
                          );
                          if (max) filterByPriceRange(min, max);
                        }}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-24 px-3 py-2 border rounded-lg"
                        onChange={(e) => {
                          const max = Number(e.target.value);
                          const min = Number(
                            (e.target.previousElementSibling?.previousElementSibling as HTMLInputElement)
                              ?.value
                          );
                          if (min) filterByPriceRange(min, max);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GiftCard gift={gift} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGifts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No gifts match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
