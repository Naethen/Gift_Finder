import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QuizFormData } from '@/types';
import { filterGiftsByQuizResponse, calculateGiftMatchScore } from '@/data/utils';
import { allGifts } from '@/data/gifts';

export const useQuiz = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuizSubmit = useCallback(async (formData: QuizFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Filter gifts based on quiz responses
      const filteredGifts = filterGiftsByQuizResponse(allGifts, formData);

      // Calculate match scores for filtered gifts
      const giftsWithScores = filteredGifts.map(gift => ({
        gift,
        score: calculateGiftMatchScore(gift, formData)
      }));

      // Sort by match score
      const sortedGifts = giftsWithScores.sort((a, b) => b.score - a.score);

      // Take top 10 recommendations
      const recommendations = sortedGifts.slice(0, 10).map(item => item.gift);

      // Store results in sessionStorage
      sessionStorage.setItem('quizResults', JSON.stringify({
        recommendations,
        formData,
        timestamp: new Date().toISOString()
      }));

      // Navigate to results page
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your quiz');
    } finally {
      setIsSubmitting(false);
    }
  }, [router]);

  return {
    handleQuizSubmit,
    isSubmitting,
    error
  };
};
