export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  affiliateLink: string;
  rating: number;
}

export interface QuizFormData {
  budget: {
    min: number;
    max: number;
  };
  occasion: string;
  recipientAge: number;
  relationship: string;
  interests: string[];
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  occasions: string[];
}

export type PriceRange = {
  min: number;
  max: number;
};

export interface GiftDetails extends Gift {
  reviews: Review[];
  rating: number;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  specifications: Record<string, string>;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type GiftCategory = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export interface QuizResponse {
  formData: QuizFormData;
  recommendations: Gift[];
  timestamp: string;
}
