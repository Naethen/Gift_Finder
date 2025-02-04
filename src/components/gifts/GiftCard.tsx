import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift } from '@/types';
import { Heart, Share2, ExternalLink } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';

interface GiftCardProps {
  gift: Gift;
  priority?: boolean;
}

export default function GiftCard({ gift, priority = false }: GiftCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isLiked = isFavorite(gift.id);

  const handleLikeClick = () => {
    if (isLiked) {
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
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <motion.div variants={imageVariants}>
          <Image
            src={gift.imageUrl}
            alt={gift.name}
            width={400}
            height={400}
            className="object-cover w-full h-full"
            priority={priority}
          />
        </motion.div>
      </div>

      {/* Price Tag */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="font-semibold text-gray-900">${gift.price}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{gift.name}</h3>
        <p className="text-sm text-gray-800 line-clamp-2 mb-3">{gift.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gift.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLikeClick}
            className={`p-2 rounded-full ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            } transition-colors`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.a
              href={gift.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <span className="text-sm font-medium">View Deal</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/5 pointer-events-none"
      />
    </motion.div>
  );
}
