import { Gift, QuizFormData } from '@/types';
import { allGifts } from '@/data/gifts';

export function getAllGifts(): Gift[] {
  return allGifts;
}

export function getGiftById(id: string): Gift | undefined {
  return allGifts.find(gift => gift.id === id);
}

export function searchGifts(query: string): Gift[] {
  const lowercaseQuery = query.toLowerCase();
  return allGifts.filter(gift => 
    gift.name.toLowerCase().includes(lowercaseQuery) ||
    gift.description.toLowerCase().includes(lowercaseQuery) ||
    gift.category.toLowerCase().includes(lowercaseQuery) ||
    gift.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function filterGifts(filters: {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  tags?: string[];
}): Gift[] {
  return allGifts.filter(gift => {
    // Price filter
    if (filters.minPrice !== undefined && gift.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && gift.price > filters.maxPrice) return false;

    // Category filter
    if (filters.categories?.length && !filters.categories.includes(gift.category)) return false;

    // Tags filter
    if (filters.tags?.length && !gift.tags.some(tag => filters.tags?.includes(tag))) return false;

    return true;
  });
}

export function getGiftSuggestions(quizData: QuizFormData): Gift[] {
  let suggestions = allGifts;

  // Filter by budget
  suggestions = suggestions.filter(gift => 
    gift.price >= quizData.budget.min && 
    gift.price <= quizData.budget.max
  );

  // Filter by interests
  if (quizData.interests.length > 0) {
    suggestions = suggestions.filter(gift =>
      gift.tags.some(tag => quizData.interests.includes(tag))
    );
  }

  // Sort by relevance (more matching tags = higher relevance)
  suggestions.sort((a, b) => {
    const aMatches = a.tags.filter(tag => quizData.interests.includes(tag)).length;
    const bMatches = b.tags.filter(tag => quizData.interests.includes(tag)).length;
    return bMatches - aMatches;
  });

  return suggestions;
}

export function getCategories(): string[] {
  return Array.from(new Set(allGifts.map(gift => gift.category)));
}

export function getTags(): string[] {
  const allTags = allGifts.flatMap(gift => gift.tags);
  return Array.from(new Set(allTags));
}
