export const PRICE_RANGES = {
  BUDGET: { min: 0, max: 25 },
  MODERATE: { min: 25, max: 100 },
  PREMIUM: { min: 100, max: 500 },
  LUXURY: { min: 500, max: 10000 }
} as const;

export const OCCASIONS = [
  'Birthday',
  'Christmas',
  'Anniversary',
  'Wedding',
  'Graduation',
  'Housewarming',
  'Baby Shower',
  'Valentine\'s Day',
  'Mother\'s Day',
  'Father\'s Day',
  'Thank You',
  'Other'
] as const;

export const RELATIONSHIPS = [
  'Friend',
  'Parent',
  'Sibling',
  'Partner',
  'Colleague',
  'Child',
  'Grandparent',
  'Other Family'
] as const;

export const INTERESTS = [
  'Technology',
  'Gaming',
  'Sports',
  'Fitness',
  'Cooking',
  'Reading',
  'Music',
  'Art',
  'Fashion',
  'Travel',
  'Home Decor',
  'Gardening',
  'Photography',
  'DIY',
  'Beauty',
  'Wellness'
] as const;

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Sports & Outdoors',
  'Books & Media',
  'Beauty & Personal Care',
  'Toys & Games',
  'Art & Collectibles',
  'Food & Beverages',
  'Jewelry & Accessories'
] as const;

export const AGE_RANGES = {
  CHILD: { min: 0, max: 12 },
  TEEN: { min: 13, max: 19 },
  YOUNG_ADULT: { min: 20, max: 30 },
  ADULT: { min: 31, max: 50 },
  SENIOR: { min: 51, max: 100 }
} as const;
