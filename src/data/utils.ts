import { Gift, QuizFormData } from '@/types';
import { INTERESTS, PRICE_RANGES } from './constants';

export function filterGiftsByQuizResponse(gifts: Gift[], quizData: QuizFormData): Gift[] {
  return gifts.filter(gift => {
    // Filter by price range
    const withinBudget = gift.price >= quizData.budget.min && gift.price <= quizData.budget.max;
    if (!withinBudget) return false;

    // Filter by interests
    const hasMatchingInterests = quizData.interests.some(interest => 
      gift.tags.includes(interest.toLowerCase())
    );
    if (!hasMatchingInterests) return false;

    return true;
  });
}

export function calculateGiftMatchScore(gift: Gift, quizData: QuizFormData): number {
  let score = 0;
  const maxScore = 100;

  // Price match (30% of total score)
  const priceScore = calculatePriceMatchScore(gift.price, quizData.budget);
  score += priceScore * 0.3;

  // Interest match (40% of total score)
  const interestScore = calculateInterestMatchScore(gift.tags, quizData.interests);
  score += interestScore * 0.4;

  // Age appropriateness (30% of total score)
  const ageScore = calculateAgeAppropriatenessScore(gift.tags, quizData.recipientAge);
  score += ageScore * 0.3;

  return Math.round(score);
}

function calculatePriceMatchScore(price: number, budget: { min: number; max: number }): number {
  if (price >= budget.min && price <= budget.max) return 100;
  
  const midPoint = (budget.min + budget.max) / 2;
  const maxDeviation = budget.max - midPoint;
  const actualDeviation = Math.abs(price - midPoint);
  
  return Math.max(0, 100 - (actualDeviation / maxDeviation) * 100);
}

function calculateInterestMatchScore(giftTags: string[], userInterests: string[]): number {
  if (!userInterests.length) return 0;
  
  const matchingTags = giftTags.filter(tag => 
    userInterests.some(interest => tag.toLowerCase().includes(interest.toLowerCase()))
  );
  
  return (matchingTags.length / Math.min(giftTags.length, userInterests.length)) * 100;
}

function calculateAgeAppropriatenessScore(tags: string[], age: number): number {
  // Define age-specific keywords
  const ageKeywords = {
    child: ['kids', 'children', 'toys', 'educational'],
    teen: ['teen', 'young', 'trendy', 'gaming'],
    adult: ['professional', 'sophisticated', 'practical'],
    senior: ['comfortable', 'classic', 'traditional']
  };

  let relevantKeywords;
  if (age <= 12) relevantKeywords = ageKeywords.child;
  else if (age <= 19) relevantKeywords = ageKeywords.teen;
  else if (age <= 65) relevantKeywords = ageKeywords.adult;
  else relevantKeywords = ageKeywords.senior;

  const matchingKeywords = tags.filter(tag =>
    relevantKeywords.some(keyword => tag.toLowerCase().includes(keyword))
  );

  return (matchingKeywords.length / relevantKeywords.length) * 100;
}
