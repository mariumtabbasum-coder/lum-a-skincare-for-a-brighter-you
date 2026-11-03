import { PRODUCTS } from '../../data/products';
import type { RecommendedProduct } from './types';

interface LocalChatResponse {
  message: string;
  followUpQuestion: string;
  recommendations: RecommendedProduct[];
}

export function createLocalChatResponse(
  message: string,
  history: Array<{ role: string; text: string }> = [],
): LocalChatResponse {
  const query = `${history.map((item) => item.text).join(' ')} ${message}`.toLowerCase();
  const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'] as const;
  const skinType = skinTypes.find((type) => query.includes(type.toLowerCase()));
  const concernTerms: Array<[string, string]> = [
    ['hydration', 'Hydration'],
    ['dryness', 'Hydration'],
    ['acne', 'Acne'],
    ['blemish', 'Acne'],
    ['breakout', 'Acne'],
    ['aging', 'Anti-Aging'],
    ['wrinkle', 'Anti-Aging'],
    ['bright', 'Brightening'],
    ['glow', 'Brightening'],
    ['redness', 'Soothing'],
    ['sooth', 'Soothing'],
    ['irritat', 'Soothing'],
  ];
  const concerns = [...new Set(
    concernTerms.filter(([term]) => query.includes(term)).map(([, concern]) => concern),
  )];
  const categories = ['Serum', 'Moisturizer', 'Cleanser', 'Toner', 'Mask', 'Eye Care', 'Sunscreen'] as const;
  const category = categories.find((item) => query.includes(item.toLowerCase()));

  const matches = PRODUCTS.map((product) => {
    let score = product.isBestseller ? 1 : 0;
    const reasons: string[] = [];

    if (category && product.category === category) {
      score += 4;
      reasons.push(`matches your interest in ${category.toLowerCase()}`);
    }
    if (skinType && product.skinTypes.includes(skinType)) {
      score += 3;
      reasons.push(`is suitable for ${skinType.toLowerCase()} skin`);
    }
    for (const concern of concerns) {
      if (product.concerns.includes(concern as (typeof product.concerns)[number])) {
        score += 2;
        reasons.push(`supports ${concern.toLowerCase()}`);
      }
    }

    return { product, score, reason: reasons.slice(0, 2).join(' and ') };
  }).sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);

  const recommendations = matches.slice(0, 3).map(({ product, reason }) => ({
    productId: product.id,
    product: {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      images: product.images,
      badge: product.badge,
      rating: product.rating,
      reviewCount: product.reviewCount,
    },
    reason: reason || product.shortDescription,
  }));

  if (query.includes('hello') || query.includes('hi ') || query.trim() === 'hi') {
    return {
      message: "Hello! I can help you explore Luméa's skincare and find products for your routine.",
      followUpQuestion: 'What is your skin type or main skincare concern?',
      recommendations: [],
    };
  }

  const isRoutineQuestion = query.includes('routine');
  const messageText = isRoutineQuestion
    ? `A simple routine is: cleanse, apply a targeted serum, moisturize, and finish with sunscreen in the morning. ${skinType ? `For ${skinType.toLowerCase()} skin, choose gentle formulas that feel comfortable.` : ''} Here are some Luméa products to explore.`
    : skinType
      ? `For ${skinType.toLowerCase()} skin, a gentle routine focused on your skin's comfort is a good place to start. Here are a few Luméa products to explore.`
      : 'I can help you explore gentle skincare options from Luméa. Here are a few products to get started.';

  return {
    message: messageText,
    followUpQuestion: isRoutineQuestion
      ? 'Is your main goal hydration, brightening, soothing, or something else?'
      : 'Would you like recommendations for hydration, brightening, soothing, or another concern?',
    recommendations,
  };
}
