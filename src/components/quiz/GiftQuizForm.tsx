'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, User, Heart, Tag } from 'lucide-react';
import type { QuizFormData } from '@/types';

const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Christmas',
  'Valentine\'s Day',
  'Graduation',
  'Housewarming',
  'Baby Shower',
  'Other'
];

const RELATIONSHIPS = [
  'Partner',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Colleague',
  'Other'
];

const INTERESTS = [
  'Technology',
  'Cooking',
  'Reading',
  'Sports',
  'Music',
  'Art',
  'Gaming',
  'Fashion',
  'Travel',
  'Fitness',
  'Home Decor',
  'Gardening'
];

export default function GiftQuizForm() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<QuizFormData>();
  const selectedInterests = watch('interests', []);

  const onSubmitForm = (data: QuizFormData) => {
    const params = new URLSearchParams({
      minPrice: data.budget.min.toString(),
      maxPrice: data.budget.max.toString(),
      occasion: data.occasion,
      age: data.recipientAge.toString(),
      relationship: data.relationship,
      interests: data.interests.join(',')
    });

    router.push(`/results?${params.toString()}`);
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formAnimation}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          {/* Budget Range */}
          <motion.div variants={itemAnimation} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <label className="block text-sm font-medium text-gray-800">
                Budget Range
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700">
                  Minimum ($)
                </label>
                <input
                  type="number"
                  id="minBudget"
                  {...register('budget.min', { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700">
                  Maximum ($)
                </label>
                <input
                  type="number"
                  id="maxBudget"
                  {...register('budget.max', { required: true, min: 0 })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Occasion */}
          <motion.div variants={itemAnimation} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Calendar className="w-5 h-5" />
              <label className="block text-sm font-medium text-gray-800">
                Occasion
              </label>
            </div>
            <select
              {...register('occasion', { required: true })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            >
              <option value="">Select an occasion</option>
              {OCCASIONS.map(occasion => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Recipient Age */}
          <motion.div variants={itemAnimation} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <User className="w-5 h-5" />
              <label className="block text-sm font-medium text-gray-800">
                Recipient's Age
              </label>
            </div>
            <input
              type="number"
              {...register('recipientAge', { required: true, min: 0, max: 120 })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            />
          </motion.div>

          {/* Relationship */}
          <motion.div variants={itemAnimation} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Heart className="w-5 h-5" />
              <label className="block text-sm font-medium text-gray-800">
                Your Relationship to Recipient
              </label>
            </div>
            <select
              {...register('relationship', { required: true })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            >
              <option value="">Select relationship</option>
              {RELATIONSHIPS.map(relationship => (
                <option key={relationship} value={relationship}>
                  {relationship}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Interests */}
          <motion.div variants={itemAnimation} className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Tag className="w-5 h-5" />
              <label className="block text-sm font-medium text-gray-800">
                Recipient's Interests
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INTERESTS.map(interest => (
                <motion.div
                  key={interest}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-start"
                >
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      value={interest}
                      {...register('interests')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <label className="ml-3 text-sm text-gray-700">
                    {interest}
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemAnimation}
            className="pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <span>Find Perfect Gifts</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
