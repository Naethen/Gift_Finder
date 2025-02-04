'use client';

import { motion } from 'framer-motion';
import GiftQuizForm from '@/components/quiz/GiftQuizForm';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Gift, Sparkles } from 'lucide-react';

export default function QuizPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="flex justify-center gap-4 mb-6"
            >
              <Gift className="w-12 h-12 text-indigo-600" />
              <Sparkles className="w-12 h-12 text-purple-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 sm:text-5xl"
            >
              Gift Finder Quiz
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-lg leading-8 text-gray-700"
            >
              Let's find the perfect gift together! Answer a few questions about your recipient
              and we'll suggest gifts they'll love.
            </motion.p>
          </div>

          {/* Quiz Form with Card Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10 blur-xl" />
            <div className="relative">
              <GiftQuizForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
