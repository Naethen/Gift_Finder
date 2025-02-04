import { Gift, QuizFormData } from '@/types';
import { allGifts } from '@/data/gifts';

// Mock gift data
const gifts: Gift[] = [
  {
    id: '1',
    name: 'Premium Wireless Noise-Cancelling Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, perfect for music lovers and travelers.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Technology',
    tags: ['Music', 'Technology', 'Travel'],
    affiliateLink: 'https://amazon.com'
  },
  {
    id: '2',
    name: 'Artisanal Coffee Brewing Kit',
    description: 'Complete coffee brewing set including pour-over dripper, kettle, and locally roasted beans.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    category: 'Kitchen',
    tags: ['Coffee', 'Kitchen', 'Cooking'],
    affiliateLink: 'https://amazon.com'
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone notifications.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
    category: 'Technology',
    tags: ['Fitness', 'Technology', 'Health'],
    affiliateLink: 'https://amazon.com'
  },
  // Add more mock gifts...
];

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
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(gift.category)) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      if (!gift.tags.some(tag => filters.tags!.includes(tag))) return false;
    }

    return true;
  });
}

export function getGiftSuggestions(quizData: QuizFormData): Gift[] {
  const filters: {
    minPrice: number;
    maxPrice: number;
    categories?: string[];
    tags?: string[];
  } = {
    minPrice: quizData.budget.min,
    maxPrice: quizData.budget.max,
    tags: [quizData.occasion, ...quizData.interests]
  };

  // Add age-appropriate filters
  if (quizData.recipientAge < 12) {
    filters.tags = [...(filters.tags || []), 'Kids'];
  } else if (quizData.recipientAge < 20) {
    filters.tags = [...(filters.tags || []), 'Teens'];
  }

  // Add relationship-based filters
  if (quizData.relationship) {
    filters.tags = [...(filters.tags || []), quizData.relationship];
  }

  return filterGifts(filters);
}

// Get unique categories
export function getCategories(): string[] {
  const categories = new Set(allGifts.map(gift => gift.category));
  return Array.from(categories);
}

// Get unique tags
export function getTags(): string[] {
  const tags = new Set(allGifts.flatMap(gift => gift.tags));
  return Array.from(tags);
}
