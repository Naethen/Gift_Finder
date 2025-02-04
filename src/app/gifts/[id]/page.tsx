'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Gift } from '@/types';
import { getGiftById } from '@/lib/gifts';
import LoadingState from '@/components/ui/LoadingState';

export default function GiftDetailsPage({ params }: { params: { id: string } }) {
  const [gift, setGift] = useState<Gift | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchGift = () => {
      const giftData = getGiftById(params.id);
      setGift(giftData || null);
      setIsLoading(false);
    };

    fetchGift();
  }, [params.id]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: gift?.name,
        text: gift?.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) return <LoadingState />;
  if (!gift) return <div>Gift not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link
          href="/browse"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src={gift.imageUrl}
              alt={gift.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{gift.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-gray-900">
                ${gift.price}
              </span>
              <div className="flex gap-2">
                {gift.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-8">{gift.description}</p>

            <div className="flex items-center gap-4 mt-auto">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLiked(!isLiked);
                  toast.success(
                    isLiked ? 'Removed from favorites' : 'Added to favorites'
                  );
                }}
                className={`p-3 rounded-full ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 bg-gray-100'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-3 rounded-full text-gray-400 hover:text-gray-600 bg-gray-100"
              >
                <Share2 className="w-6 h-6" />
              </motion.button>

              <motion.a
                href={gift.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Deal
                <ExternalLink className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Similar Gifts */}
        {/* Add similar gifts section here */}
      </motion.div>
    </div>
  );
}
