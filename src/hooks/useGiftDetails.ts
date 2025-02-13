import { useState, useEffect } from 'react';
import { Gift, GiftDetails } from '@/types';
import { allGifts } from '@/data/gifts';

export const useGiftDetails = (giftId: string) => {
  const [gift, setGift] = useState<GiftDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedGifts, setRelatedGifts] = useState<Gift[]>([]);

  useEffect(() => {
    const fetchGiftDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Find the gift in our data
        const foundGift = allGifts.find(g => g.id === giftId);
        
        if (!foundGift) {
          setError('Gift not found');
          return;
        }

        // Enhance the gift with additional details
        const enhancedGift: GiftDetails = {
          ...foundGift,
          reviews: [], // In a real app, these would come from an API
          rating: 4.5,
          availability: 'in_stock',
          specifications: {
            'Brand': 'Premium Brand',
            'Material': 'High Quality',
            'Dimensions': 'Standard Size',
            'Warranty': '1 Year'
          }
        };

        setGift(enhancedGift);

        // Find related gifts based on category and tags
        const related = allGifts
          .filter(g => 
            g.id !== giftId && 
            (g.category === foundGift.category || 
             g.tags.some(tag => foundGift.tags.includes(tag)))
          )
          .slice(0, 4);

        setRelatedGifts(related);
      } catch (err) {
        setError('Failed to load gift details');
        console.error('Error loading gift details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (giftId) {
      fetchGiftDetails();
    }
  }, [giftId]);

  return {
    gift,
    loading,
    error,
    relatedGifts
  };
};
