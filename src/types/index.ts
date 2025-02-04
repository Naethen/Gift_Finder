export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  affiliateLink: string;
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
  gender?: string;
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  occasions: string[];
}
