'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { Gift } from '@/types';
import { getGiftSuggestions } from '@/lib/gifts';
import GiftCard from '@/components/gifts/GiftCard';
import { Sparkles, Filter } from 'lucide-react';

// Dynamically import Confetti for better performance
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Intersection observer for infinite scroll animation
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    // Parse search params to get quiz data
    const quizData = {
      budget: {
        min: Number(searchParams.get('minPrice')) || 0,
        max: Number(searchParams.get('maxPrice')) || 1000,
      },
      occasion: searchParams.get('occasion') || '',
      recipientAge: Number(searchParams.get('age')) || 0,
      relationship: searchParams.get('relationship') || '',
      interests: searchParams.get('interests')?.split(',') || [],
    };

    // Get gift suggestions
    const suggestions = getGiftSuggestions(quizData);
    setGifts(suggestions);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

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
            className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4"
          >
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            We Found Your Perfect Gifts!
          </h1>
          <p className="text-lg text-gray-600">
            Based on your preferences, we've curated these amazing gift ideas just for you.
          </p>
        </motion.div>

        {/* Filters Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFiltering(!isFiltering)}
          className="fixed bottom-8 right-8 z-10 flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </motion.button>

        {/* Results Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          ref={ref}
        >
          <AnimatePresence>
            {gifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.1 }}
              >
                <GiftCard gift={gift} priority={index < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {gifts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No gifts found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or preferences to see more options.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
