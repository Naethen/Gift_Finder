'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ExternalLink, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useGiftDetails } from '@/hooks/useGiftDetails';
import { useFavorites } from '@/context/FavoritesContext';
import GiftCard from '@/components/gifts/GiftCard';
import LoadingState from '@/components/ui/LoadingState';

export default function GiftDetailsPage({ params }: { params: { id: string } }) {
  const { gift, loading, error, relatedGifts } = useGiftDetails(params.id);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Gift Not Found</h2>
        <p className="text-gray-600 mb-8">The gift you're looking for doesn't exist.</p>
        <Link
          href="/browse"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Browse Gifts
        </Link>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(gift.id)) {
      removeFavorite(gift.id);
      toast.success('Removed from favorites');
    } else {
      addFavorite(gift);
      toast.success('Added to favorites');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: gift.name,
        text: gift.description,
        url: window.location.href
      });
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/browse"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Browse
          </Link>
        </div>

        {/* Gift Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={gift.imageUrl}
                alt={gift.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold mb-2">{gift.name}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="inline-flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    {gift.rating}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{gift.category}</span>
                </div>
              </div>

              <div className="text-2xl font-bold text-primary">
                ${gift.price.toFixed(2)}
              </div>

              <p className="text-gray-600">{gift.description}</p>

              {/* Specifications */}
              {gift.specifications && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Specifications</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(gift.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-gray-600 text-sm">{key}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <a
                  href={gift.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex justify-center items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                  View Product
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-3 rounded-lg border ${
                    isFavorite(gift.id)
                      ? 'bg-primary/10 border-primary'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite(gift.id) ? 'fill-primary text-primary' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Gifts */}
        {relatedGifts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGifts.map(relatedGift => (
                <GiftCard key={relatedGift.id} gift={relatedGift} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
