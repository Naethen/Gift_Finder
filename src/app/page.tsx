'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Heart, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-3xl" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Floating icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute hidden md:block"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 3) * 20}%`,
            opacity: 0.1,
          }}
        >
          {i % 4 === 0 ? (
            <Gift className="w-12 h-12 text-indigo-600" />
          ) : i % 4 === 1 ? (
            <Heart className="w-12 h-12 text-pink-600" />
          ) : i % 4 === 2 ? (
            <Search className="w-12 h-12 text-purple-600" />
          ) : (
            <Sparkles className="w-12 h-12 text-yellow-600" />
          )}
        </motion.div>
      ))}

      <div className="relative">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-indigo-600 animate-pulse" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 sm:text-6xl"
            >
              Find the Perfect Gift for Your Loved Ones
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-700"
            >
              Answer a few simple questions and let our AI-powered gift finder suggest thoughtful presents 
              tailored to your recipient's interests and your budget.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                href="/quiz"
                className="relative group rounded-full px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <span className="relative z-10">Start Gift Quiz</span>
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 rounded-full blur-lg transition-opacity"
                  initial={false}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
              
              <Link
                href="/browse"
                className="text-base font-semibold leading-6 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Browse All Gifts <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
