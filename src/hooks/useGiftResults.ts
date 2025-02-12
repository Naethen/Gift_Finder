import { useState, useEffect } from 'react';
import { Gift, QuizFormData } from '@/types';

interface QuizResults {
  recommendations: Gift[];
  formData: QuizFormData;
  timestamp: string;
}

export const useGiftResults = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>([]);
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc' | 'match'>('match');

  useEffect(() => {
    try {
      const storedResults = sessionStorage.getItem('quizResults');
      if (!storedResults) {
        setError('No quiz results found. Please take the quiz first.');
        setLoading(false);
        return;
      }

      const parsedResults: QuizResults = JSON.parse(storedResults);
      setResults(parsedResults);
      setFilteredGifts(parsedResults.recommendations);
    } catch (err) {
      setError('Failed to load quiz results');
    } finally {
      setLoading(false);
    }
  }, []);

  const sortGifts = (gifts: Gift[], order: typeof sortOrder) => {
    return [...gifts].sort((a, b) => {
      switch (order) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'match':
          // Assuming gifts are already sorted by match score from the quiz
          return 0;
        default:
          return 0;
      }
    });
  };

  const handleSort = (order: typeof sortOrder) => {
    setSortOrder(order);
    setFilteredGifts(sortGifts(filteredGifts, order));
  };

  const filterByPriceRange = (minPrice: number, maxPrice: number) => {
    if (!results) return;
    
    const filtered = results.recommendations.filter(
      gift => gift.price >= minPrice && gift.price <= maxPrice
    );
    
    setFilteredGifts(sortGifts(filtered, sortOrder));
  };

  return {
    results,
    loading,
    error,
    filteredGifts,
    sortOrder,
    handleSort,
    filterByPriceRange
  };
};
