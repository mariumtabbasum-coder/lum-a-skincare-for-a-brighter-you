import { PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import type { RecommendedProduct } from './types';

interface LocalChatResponse {
  message: string;
  followUpQuestion: string | null;
  recommendations: RecommendedProduct[];
}

const skinTypes = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'] as const;
type Concern = Product['concerns'][number];

const concernTerms: Array<[string, Concern]> = [
  ['dehydrat', 'Hydration'], ['hydration', 'Hydration'], ['dryness', 'Hydration'],
  ['acne', 'Acne'], ['blemish', 'Acne'], ['breakout', 'Acne'], ['pimple', 'Acne'],
  ['aging', 'Anti-Aging'], ['ageing', 'Anti-Aging'], ['wrinkle', 'Anti-Aging'], ['fine line', 'Anti-Aging'],
  ['bright', 'Brightening'], ['glow', 'Brightening'], ['dark spot', 'Brightening'], ['dull', 'Brightening'],
  ['redness', 'Soothing'], ['sooth', 'Soothing'], ['irritat', 'Soothing'], ['calm', 'Soothing'],
];

const categoryTerms: Array<[string, Product['category']]> = [
  ['eye cream', 'Eye Care'], ['eye care', 'Eye Care'],
  ['serum', 'Serum'], ['moisturizer', 'Moisturizer'], ['moisturiser', 'Moisturizer'], ['cream', 'Moisturizer'],
  ['cleanser', 'Cleanser'], ['face wash', 'Cleanser'], ['toner', 'Toner'], ['mask', 'Mask'],
  ['sunscreen', 'Sunscreen'], ['spf', 'Sunscreen'],
];

function toRecommendation(product: Product, reason: string): RecommendedProduct {
  return {
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
    reason,
  };
}

export function createLocalChatResponse(
  message: string,
  history: Array<{ role: string; text: string }> = [],
): LocalChatResponse {
  const current = message.trim().toLowerCase();
  const previousUserMessage = [...history].reverse().find((item) => item.role === 'user')?.text ?? '';
  const isFollowUp = /\b(it|this|that|them|those|same|also)\b|\bwhat about\b|\band for\b/.test(current);
  const isRoutine = /\b(routine|regimen|order of application|what order)\b/.test(current);
  const previousContext = isFollowUp || isRoutine ? previousUserMessage.toLowerCase() : '';
  const currentSkinType = skinTypes.find((type) => current.includes(type.toLowerCase()));
  const skinType = currentSkinType ?? skinTypes.find((type) => previousContext.includes(type.toLowerCase()));
  const currentConcerns = concernTerms.filter(([term]) => current.includes(term)).map(([, concern]) => concern);
  const concerns = [...new Set((currentConcerns.length
    ? currentConcerns
    : concernTerms.filter(([term]) => previousContext.includes(term)).map(([, concern]) => concern))
  )];
  const category = categoryTerms.find(([term]) => current.includes(term))?.[1]
    ?? categoryTerms.find(([term]) => previousContext.includes(term))?.[1];
  const namedProducts = PRODUCTS.filter((product) =>
    current.includes(product.name.toLowerCase()) || current.includes(product.slug.replaceAll('-', ' ')),
  );
  const askedProduct = namedProducts[0];

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)[!.\s]*$/.test(current)) {
    return {
      message: "Hi! I'm here to help with Luméa products and skincare routines. What would you like help with?",
      followUpQuestion: 'Are you looking for a product, a routine, or help with a skin concern?',
      recommendations: [],
    };
  }

  if (/\b(track|tracking|where is my order|order status|shipping|delivery|return|refund)\b/.test(current)) {
    if (/\b(track|tracking|where is my order|order status)\b/.test(current)) {
      return {
        message: 'You can check the demo order tracker in My Account under “Track Orders”. I can help with product questions here, but I cannot access a real order or shipment.',
        followUpQuestion: null,
        recommendations: [],
      };
    }
    return {
      message: 'Shipping and returns details are available on the Shipping & Returns page. I can help with product or routine questions here, but I cannot access a real order.',
      followUpQuestion: null,
      recommendations: [],
    };
  }

  if (/\b(pregnan|breastfeed|prescription|diagnos|infection|rash|burning|severe pain|medical)\b/.test(current)) {
    return {
      message: 'I can share general cosmetic product information, but I cannot advise on medical conditions or product safety during pregnancy or treatment. Please check with a qualified dermatologist or healthcare professional.',
      followUpQuestion: null,
      recommendations: [],
    };
  }

  const asksIngredients = /\b(ingredient|ingredients|what is it made of|formula contains|does it contain|contains)\b/.test(current);
  const asksUsage = /\b(how do i use|how to use|how do i apply|how should i apply|how to apply|when should i apply|how often|how do i layer|can i use|application|every day|daily)\b/.test(current);
  const asksPrice = /\b(price|cost|how much)\b/.test(current);
  const asksCompare = /\b(compare|difference between|versus|\bvs\b)\b/.test(current);
  const asksPores = /\bpores?\b|open\s+pores?|enlarged\s+pores?|large\s+pores?/.test(current);
  const isRomanUrdu = /\b(k liye|ke liye|kya|kiya|kru|karun|karoon|batao|mujhe|meri|chahiye|kaise|kese|hai|hain)\b/.test(current);

  if (asksPores) {
    const poreProducts = ['brightening-toner', 'exfoliating-scrub', 'clay-face-mask']
      .map((slug) => PRODUCTS.find((product) => product.slug === slug))
      .filter((product): product is Product => Boolean(product))
      .filter((product) => !skinType || product.skinTypes.includes(skinType));
    const recommendations = poreProducts.map((product) => toRecommendation(
      product,
      product.slug === 'brightening-toner'
        ? 'Niacinamide and pore-refining benefits'
        : product.slug === 'exfoliating-scrub'
          ? '2% salicylic acid (BHA) and benefits for enlarged pores'
          : 'Absorbs excess sebum and helps clear congested pores',
    ));

    return {
      message: isRomanUrdu
        ? 'Open pores ko permanently band nahi kiya ja sakta, lekin extra oil aur clogged pores kam karne se unki appearance behtar ho sakti hai. Gentle cleanser ke baad niacinamide ya salicylic acid (BHA) wala ek product dheere se routine mein shamil karo; ek waqt mein kai exfoliating products mat lagao aur din mein SPF use karo. Luméa catalog mein yeh options pores ke liye sab se relevant hain.'
        : 'Pores cannot be permanently closed, but reducing excess oil and congestion can make them look less noticeable. After a gentle cleanse, introduce one pore-focused ingredient such as niacinamide or salicylic acid (BHA) gradually, avoid stacking exfoliants, and use SPF during the day. These Luméa catalog options are the closest matches for visible pores.',
      followUpQuestion: isRomanUrdu
        ? 'Tumhari skin oily, combination, dry ya sensitive hai?'
        : 'Is your skin oily, combination, dry, or sensitive?',
      recommendations,
    };
  }

  const ranked = PRODUCTS.map((product) => {
    let score = product.isBestseller ? 1 : 0;
    const reasons: string[] = [];
    if (category && product.category === category) {
      score += 4;
      reasons.push(category.toLowerCase());
    }
    if (skinType && product.skinTypes.includes(skinType)) {
      score += 3;
      reasons.push(`${skinType.toLowerCase()} skin`);
    }
    for (const concern of concerns) {
      if (product.concerns.includes(concern)) {
        score += 3;
        reasons.push(concern.toLowerCase());
      }
    }
    if (asksIngredients && product.ingredients.some((ingredient) => current.includes(ingredient.toLowerCase()))) score += 4;
    return { product, score, reason: reasons.length ? `Selected for ${[...new Set(reasons)].slice(0, 2).join(' and ')}` : product.shortDescription };
  }).sort((a, b) => b.score - a.score || b.product.popularity - a.product.popularity);

  const selected = askedProduct
    ? [ranked.find((item) => item.product.id === askedProduct.id)!]
    : ranked.slice(0, asksCompare ? 2 : 3);
  const recommendations = selected.map(({ product, reason }) => toRecommendation(product, reason));

  if (asksCompare && namedProducts.length > 1) {
    const [first, second] = namedProducts;
    return {
      message: `${first.name} is a ${first.category.toLowerCase()} priced at $${first.price.toFixed(2)}. ${second.name} is a ${second.category.toLowerCase()} priced at $${second.price.toFixed(2)}. ${first.name} is described as ${first.shortDescription.toLowerCase()} ${second.name} is described as ${second.shortDescription.toLowerCase()}`,
      followUpQuestion: 'Which result matters more to you: hydration, brightening, soothing, or something else?',
      recommendations: [toRecommendation(first, 'First product you asked to compare'), toRecommendation(second, 'Second product you asked to compare')],
    };
  }

  if (askedProduct) {
    if (asksPrice) {
      return { message: `${askedProduct.name} is listed at $${askedProduct.price.toFixed(2)}.`, followUpQuestion: 'Would you like to know what it does or how to use it?', recommendations };
    }
    if (asksIngredients) {
      const ingredient = askedProduct.ingredients.find((item) => current.includes(item.toLowerCase()));
      if (/\b(does it contain|contains)\b/.test(current) && ingredient) {
        return { message: `Yes. ${ingredient} appears on the listed ingredients for ${askedProduct.name}.`, followUpQuestion: 'Would you like to know how to use this product?', recommendations };
      }
      return { message: `${askedProduct.name} includes ${askedProduct.ingredients.slice(0, 5).join(', ')}.`, followUpQuestion: 'Would you like application guidance for this product?', recommendations };
    }
    if (asksUsage) {
      return { message: askedProduct.howToUse, followUpQuestion: 'What is your main skin concern?', recommendations };
    }
    if (/\b(suitable|good for|work for|help with|target)\b/.test(current)) {
      const matchingConcerns = concerns.filter((concern) => askedProduct.concerns.includes(concern));
      const concernText = matchingConcerns.length ? ` It is listed for ${matchingConcerns.map((item) => item.toLowerCase()).join(' and ')}.` : '';
      return {
        message: `${askedProduct.name} is listed as suitable for ${askedProduct.skinTypes.map((item) => item.toLowerCase()).join(', ')} skin.${concernText}`,
        followUpQuestion: 'Would you like to know its ingredients or how to use it?',
        recommendations,
      };
    }
    return { message: askedProduct.shortDescription, followUpQuestion: 'Would you like its ingredients, price, or usage instructions?', recommendations };
  }

  if (asksUsage) {
    const product = selected[0].product;
    return {
      message: `${product.name}: ${product.howToUse}`,
      followUpQuestion: skinType ? `Is your ${skinType.toLowerCase()} skin also concerned with dryness, breakouts, or redness?` : 'Tell me your skin type and I can narrow down which product to use.',
      recommendations,
    };
  }

  if (asksIngredients) {
    const product = selected[0].product;
    return {
      message: `${product.name} contains ${product.ingredients.slice(0, 5).join(', ')}. These are the ingredients listed for this product in the catalog.`,
      followUpQuestion: 'Is there a particular ingredient you want to learn about?',
      recommendations,
    };
  }

  if (isRoutine) {
    return {
      message: `A simple ${skinType ? `${skinType.toLowerCase()}-skin ` : ''}routine is: cleanse, apply a targeted treatment, moisturize, then use sunscreen in the morning. At night, cleanse, treat, and moisturize. Introduce new products one at a time.`,
      followUpQuestion: 'What is the main goal for your routine: hydration, breakouts, brightening, or soothing?',
      recommendations,
    };
  }

  if (asksCompare) {
    const [first, second] = selected.map(({ product }) => product);
    return {
      message: `${first.name} is a ${first.category.toLowerCase()} priced at $${first.price.toFixed(2)}; ${second.name} is a ${second.category.toLowerCase()} priced at $${second.price.toFixed(2)}. Their intended uses differ, so choose based on the concern you want to address.`,
      followUpQuestion: 'Which result matters more to you: hydration, brightening, soothing, or something else?',
      recommendations,
    };
  }

  if (asksPrice) {
    return {
      message: `The ${category?.toLowerCase() ?? 'matching'} options I found range from $${Math.min(...selected.map(({ product }) => product.price)).toFixed(2)} to $${Math.max(...selected.map(({ product }) => product.price)).toFixed(2)}.`,
      followUpQuestion: 'Do you have a particular product or budget in mind?',
      recommendations,
    };
  }

  if (concerns.length || skinType || category) {
    const focus = [skinType ? `${skinType.toLowerCase()} skin` : '', ...concerns.map((concern) => concern.toLowerCase()), category?.toLowerCase() ?? '']
      .filter(Boolean).join(' and ');
    return {
      message: `For ${focus}, start with gentle products and introduce them one at a time. I matched these catalog options to what you mentioned.`,
      followUpQuestion: 'Do you prefer a lightweight feel or a richer cream?',
      recommendations,
    };
  }

  return {
    message: "I can help with Luméa product ingredients, how to use a product, routines, skin types, or concerns like dryness and breakouts. I don't have enough detail to match that yet.",
    followUpQuestion: 'What product or skincare concern are you asking about?',
    recommendations: [],
  };
}
