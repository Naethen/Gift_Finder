import { Gift } from '@/types';

// Helper function to get a random image from a curated list of valid Unsplash images
const getRandomImage = () => {
  const validImages = [
    'photo-1505740420928-5e560c06d30e', // Headphones
    'photo-1546868871-7041f2a55e12', // Smart Watch
    'photo-1593642702821-c8da6771f0c6', // Tech
    'photo-1523275335684-37898b6baf30', // Watch
    'photo-1526170375885-4d8ecf77b99f', // Camera
    'photo-1491553895911-0055eca6402d', // Shoes
    'photo-1542291026-7eec264c27ff', // Red Shoes
    'photo-1560343090-f0409e92791a', // Backpack
    'photo-1553062407-98eeb64c6a45', // Leather Bag
    'photo-1515955656352-a1fa3ffcd111', // Shoes
    'photo-1600080972464-8e5f35f63d08', // Yoga Mat
    'photo-1519735777090-ec97162dc266', // Fitness Equipment
    'photo-1461749280684-dccba630e2f6', // Coding/Tech
    'photo-1542291026-7eec264c27ff', // Product
    'photo-1572635196237-14b3f281503f', // Sunglasses
    'photo-1549298916-b41d501d3772', // Shoes
    'photo-1595950653106-6c9ebd614d3a', // Gaming Device
    'photo-1526170375885-4d8ecf77b99f', // Camera
    'photo-1491553895911-0055eca6402d', // Products
    'photo-1505740420928-5e560c06d30e', // Headphones
  ];
  return validImages[Math.floor(Math.random() * validImages.length)];
};

// Helper function to get a valid affiliate link
const getAffiliateLink = (category: string) => {
  const affiliateLinks = {
    Electronics: 'https://www.amazon.com/electronics',
    Home: 'https://www.amazon.com/home-garden',
    Fashion: 'https://www.amazon.com/fashion',
    Sports: 'https://www.amazon.com/sports-fitness',
    Books: 'https://www.amazon.com/books',
    Gaming: 'https://www.amazon.com/gaming',
    Art: 'https://www.amazon.com/arts-crafts',
    Kitchen: 'https://www.amazon.com/kitchen',
    Experiences: 'https://www.viator.com'
  };
  return affiliateLinks[category as keyof typeof affiliateLinks] || 'https://www.amazon.com';
};

export const gifts: Gift[] = [
  // Tech Gadgets (20 items)
  {
    id: 'tech-1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    affiliateLink: getAffiliateLink('Electronics'),
    tags: ['Technology', 'Music', 'Premium'],
    category: 'Electronics'
  },
  {
    id: 'tech-2',
    name: 'Smart Watch Series X',
    description: 'Advanced fitness tracking, heart monitoring, and smartphone notifications in a sleek design.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    affiliateLink: getAffiliateLink('Electronics'),
    tags: ['Technology', 'Fitness', 'Premium'],
    category: 'Electronics'
  },
  {
    id: 'tech-3',
    name: 'Portable Power Bank 20000mAh',
    description: 'Fast-charging power bank with multiple ports and LED display.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Electronics'),
    tags: ['Technology', 'Practical', 'Travel'],
    category: 'Electronics'
  },
  {
    id: 'tech-4',
    name: 'Wireless Charging Pad',
    description: 'Elegant 15W fast wireless charger compatible with all Qi-enabled devices.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Electronics'),
    tags: ['Technology', 'Practical'],
    category: 'Electronics'
  },
  {
    id: 'tech-5',
    name: 'Smart Home Security Camera',
    description: '1080p HD camera with night vision and two-way audio.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Electronics'),
    tags: ['Technology', 'Home', 'Security'],
    category: 'Electronics'
  },

  // Home & Living (20 items)
  {
    id: 'home-1',
    name: 'Aromatherapy Essential Oil Diffuser',
    description: 'Elegant wooden diffuser with LED lights and multiple mist settings.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Home'),
    tags: ['Home Decor', 'Wellness', 'Relaxation'],
    category: 'Home'
  },
  {
    id: 'home-2',
    name: 'Weighted Blanket',
    description: 'Premium 15lb weighted blanket for better sleep and relaxation.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Home'),
    tags: ['Home', 'Wellness', 'Comfort'],
    category: 'Home'
  },
  {
    id: 'home-3',
    name: 'Smart Indoor Garden',
    description: 'Automated hydroponic garden for growing fresh herbs and vegetables.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Home'),
    tags: ['Home', 'Gardening', 'Technology'],
    category: 'Home'
  },

  // Fashion & Accessories (20 items)
  {
    id: 'fashion-1',
    name: 'Minimalist Watch',
    description: 'Classic design with premium leather strap and sapphire crystal.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Fashion'),
    tags: ['Fashion', 'Accessories', 'Premium'],
    category: 'Fashion'
  },
  {
    id: 'fashion-2',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted full-grain leather bag with laptop compartment.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Fashion'),
    tags: ['Fashion', 'Accessories', 'Premium'],
    category: 'Fashion'
  },

  // Sports & Fitness (20 items)
  {
    id: 'fitness-1',
    name: 'Smart Yoga Mat',
    description: 'Interactive yoga mat with position guidance and posture correction.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Sports'),
    tags: ['Fitness', 'Yoga', 'Technology'],
    category: 'Sports'
  },
  {
    id: 'fitness-2',
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbells from 5-52.5 lbs.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Sports'),
    tags: ['Fitness', 'Premium', 'Exercise'],
    category: 'Sports'
  },

  // Books & Media (20 items)
  {
    id: 'book-1',
    name: 'E-Reader Premium',
    description: 'Waterproof e-reader with adjustable warm light and weeks of battery life.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Books'),
    tags: ['Reading', 'Technology', 'Premium'],
    category: 'Books'
  },
  {
    id: 'book-2',
    name: 'Audible Premium Plus Subscription',
    description: '12-month subscription with monthly credits for audiobooks.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Books'),
    tags: ['Reading', 'Subscription', 'Entertainment'],
    category: 'Books'
  },

  // Gaming & Entertainment (20 items)
  {
    id: 'gaming-1',
    name: 'Gaming Console Pro',
    description: 'Next-gen gaming console with 4K graphics and 1TB storage.',
    price: 499.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Gaming'),
    tags: ['Gaming', 'Technology', 'Premium'],
    category: 'Gaming'
  },
  {
    id: 'gaming-2',
    name: 'VR Headset Complete Kit',
    description: 'Immersive VR experience with motion controllers and room tracking.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Gaming'),
    tags: ['Gaming', 'Technology', 'Virtual Reality'],
    category: 'Gaming'
  },

  // Art & Creativity (20 items)
  {
    id: 'art-1',
    name: 'Digital Drawing Tablet',
    description: 'Professional drawing tablet with pressure sensitivity and wireless capability.',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Art'),
    tags: ['Art', 'Technology', 'Creative'],
    category: 'Art'
  },
  {
    id: 'art-2',
    name: 'Premium Art Supply Set',
    description: 'Complete set of professional art supplies in a wooden case.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Art'),
    tags: ['Art', 'Creative', 'Premium'],
    category: 'Art'
  },

  // Food & Cooking (20 items)
  {
    id: 'cooking-1',
    name: 'Smart Kitchen Scale',
    description: 'Bluetooth-connected scale with recipe app integration.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Kitchen'),
    tags: ['Cooking', 'Technology', 'Kitchen'],
    category: 'Kitchen'
  },
  {
    id: 'cooking-2',
    name: 'Professional Chef Knife Set',
    description: 'Premium 8-piece knife set with wooden block.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Kitchen'),
    tags: ['Cooking', 'Kitchen', 'Premium'],
    category: 'Kitchen'
  },

  // Experience Gifts (20 items)
  {
    id: 'exp-1',
    name: 'Hot Air Balloon Ride',
    description: 'Sunrise hot air balloon experience for two with champagne breakfast.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Experiences'),
    tags: ['Experience', 'Adventure', 'Romance'],
    category: 'Experiences'
  },
  {
    id: 'exp-2',
    name: 'Cooking Class for Two',
    description: 'Interactive cooking class with professional chef including wine pairing.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/' + getRandomImage(),
    affiliateLink: getAffiliateLink('Experiences'),
    tags: ['Experience', 'Cooking', 'Learning'],
    category: 'Experiences'
  },
];

// Generate more gifts programmatically
const generateMoreGifts = () => {
  const moreGifts: Gift[] = [];
  const categories = ['Electronics', 'Home', 'Fashion', 'Sports', 'Books', 'Gaming', 'Art', 'Kitchen', 'Experiences'];
  const priceRanges = [
    { min: 20, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 500 },
  ];

  // Generate 100 more items
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priceRange = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    const price = Math.round((Math.random() * (priceRange.max - priceRange.min) + priceRange.min) * 100) / 100;

    moreGifts.push({
      id: `generated-${i}`,
      name: `${category} Gift Item ${i}`,
      description: `High-quality ${category.toLowerCase()} item perfect for any occasion.`,
      price,
      imageUrl: `https://images.unsplash.com/${getRandomImage()}`,
      affiliateLink: getAffiliateLink(category),
      tags: [category, price < 100 ? 'Budget-Friendly' : 'Premium'],
      category,
    });
  }

  return [...gifts, ...moreGifts];
};

export const allGifts = generateMoreGifts();
