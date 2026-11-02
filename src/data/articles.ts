/**
 * Luméa Glow Journal Articles Data
 * 9 Editorial Articles accurately corresponding to user reference mockup (3x3 grid)
 * plus the Featured Panoramic Guide.
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Skincare' | 'Ingredients' | 'Lifestyle' | 'Beauty';
  date: string;
  readingTime: string;
  commentsCount: number;
  image: string;
  featured?: boolean;
  content: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'the-ultimate-guide-to-your-skin-type',
    title: 'The Ultimate Guide to Your Skin Type',
    summary: 'Find the right products, ingredients, and routine for your unique skin. Identify whether you are dry, normal, oily, combination, or sensitive.',
    category: 'Skincare',
    date: 'Apr 18, 2025',
    readingTime: '5 min read',
    commentsCount: 6,
    image: '/assets/aistudio/image_c103160f.png',
    featured: true,
    content: [
      'Understanding your unique skin type is the foundational step toward achieving lasting balance and that luminous, lit-from-within glow.',
      'Many people confuse skin type (your genetic predisposition, like sebum production levels) with skin condition (temporary states like dehydration or reactive redness caused by climate, stress, or harsh products).',
      'The Bare-Faced Test: Wash your face gently with a mild cleanser and pat dry. Do not apply any toners, serums, or creams. After 30 minutes, observe your forehead, nose, cheeks, and chin in natural daylight. If your face feels tight all over, you lean Dry. If your T-zone is shiny while cheeks feel comfortable, you are Combination. If shine is present throughout, you lean Oily. If skin is calm and balanced, you enjoy Normal skin.',
      'Remember, gentle consistency always triumphs over aggressive multi-step stripping. Treat your skin as a living, breathing ecosystem.'
    ]
  },
  {
    id: 'art-02',
    slug: '10-skincare-habits-that-actually-work',
    title: '10 Skincare Habits That Actually Work',
    summary: 'Discover the foundational daily rituals that truly transform your skin’s texture, clarity, and natural barrier resilience.',
    category: 'Skincare',
    date: 'Apr 14, 2025',
    readingTime: '4 min read',
    commentsCount: 2,
    image: '/assets/aistudio/image_1a8d23e0.png',
    content: [
      'Healthy skin is not built overnight through dramatic interventions; it is nurtured through small, consistent, daily habits.',
      '1. Wash with lukewarm water: Hot water strips the stratum corneum of essential lipids, while cold water fails to dissolve sebum efficiently.',
      '2. Apply serums to damp skin: Humectants like hyaluronic acid and glycerin bind environmental water; applying them to slightly damp skin dramatically amplifies absorption.',
      '3. Respect your skin barrier: Avoid over-exfoliation. Two to three times weekly is plenty for gentle acid exfoliation.',
      '4. Change your pillowcase frequently: Pure silk or breathable bamboo fabric minimizes friction, sleep creases, and bacterial buildup.',
      '5. Never skip broad-spectrum sunscreen: Even on overcast days, UVA rays penetrate cloud cover and windows, driving photoaging.'
    ]
  },
  {
    id: 'art-03',
    slug: 'morning-vs-night-skincare-routine',
    title: 'Morning vs. Night Skincare Routine',
    summary: 'Daytime defense against environmental stressors versus overnight deep cellular repair—how to optimize each phase.',
    category: 'Skincare',
    date: 'Apr 12, 2025',
    readingTime: '4 min read',
    commentsCount: 1,
    image: '/assets/aistudio/image_0a90419c.png',
    content: [
      'Your skin follows a biological circadian clock. In the daytime, your skin is in defense mode against UV light, pollution, and oxidation. At night, blood flow increases, DNA repair mechanisms activate, and trans-epidermal water loss peaks.',
      'Morning Philosophy: Focus on gentle cleansing, antioxidant defense (like Vitamin C or green tea extract), lightweight hydration, and broad-spectrum SPF 50.',
      'Night Philosophy: Double cleanse to remove sunscreen and airborne micro-particles, apply restorative peptides or bakuchiol, and envelope with a nourishing lipid barrier cream.'
    ]
  },
  {
    id: 'art-04',
    slug: 'diy-face-masks-for-glowing-skin',
    title: 'DIY Face Masks for Glowing Skin',
    summary: 'Gentle, botanical kitchen remedies infused with soothing rosewater, raw honey, and colloidal oat for an instant radiant glow.',
    category: 'Beauty',
    date: 'Apr 10, 2025',
    readingTime: '3 min read',
    commentsCount: 3,
    image: '/assets/aistudio/image_ea555b87.png',
    content: [
      'Botanical masking delivers concentrated comfort directly to parched or irritated skin.',
      'The Soothing Honey & Rose Glow Mask: Mix 1 tablespoon of raw organic honey (a natural enzymatic humectant) with 1 teaspoon of steam-distilled rosewater and 1 teaspoon of colloidal oat flour.',
      'Apply an even layer to clean skin and rest for 15 minutes. Rinse with lukewarm water to reveal supple, calmed, and illuminated skin.'
    ]
  },
  {
    id: 'art-05',
    slug: 'best-ingredients-for-healthy-skin',
    title: 'Best Ingredients for Healthy Skin',
    summary: 'A deep dive into clean actives: multi-molecular hyaluronic acid, niacinamide, and plant squalane.',
    category: 'Ingredients',
    date: 'Apr 8, 2025',
    readingTime: '5 min read',
    commentsCount: 4,
    image: '/assets/aistudio/image_0a17ccbd.png',
    content: [
      'Active ingredients make all the difference when formulating gentle yet potent skincare routines. Here are the top botanical heroes we love at Luméa.',
      '1. Multi-Molecular Hyaluronic Acid: Penetrates multiple skin depths to bind hydration without tackiness.',
      '2. Niacinamide (Vitamin B3): A versatile superstar that calms redness, balances oiliness, and refines texture.',
      '3. Centella Asiatica: Renowned in traditional herbal remedies for quieting stressed barriers.',
      '4. Plant Squalane: Mimics the skin’s natural sebum to seal in moisture weightlessly.'
    ]
  },
  {
    id: 'art-06',
    slug: 'how-to-build-a-natural-skincare-routine',
    title: 'How to Build a Natural Skincare Routine',
    summary: 'Streamline your beauty shelf down to the essential four steps that nourish your lipid mantle without irritation.',
    category: 'Skincare',
    date: 'Apr 5, 2025',
    readingTime: '4 min read',
    commentsCount: 2,
    image: '/assets/aistudio/image_9880be47.png',
    content: [
      'Over-exfoliating and layer fatigue are among the most common causes of barrier dysfunction today. Skincare maximalism can overwhelm your lipid mantle.',
      'The Essential 4-Pillar Routine: 1. Cleanse gently with non-stripping surfactants. 2. Target with one bio-compatible botanical serum. 3. Moisturize with oat ceramides and squalane. 4. Shield daily with SPF.',
      'By stripping away unnecessary fillers, you reduce reactivity and allow clean botanical actives to perform at their peak.'
    ]
  },
  {
    id: 'art-07',
    slug: 'healthy-skin-happy-you-self-care-tips',
    title: 'Healthy Skin, Happy You: Self Care Tips',
    summary: 'Mindful daily touch, facial massage, and lymphatic drainage strokes that calm your nervous system and rejuvenate skin.',
    category: 'Lifestyle',
    date: 'Apr 3, 2025',
    readingTime: '4 min read',
    commentsCount: 1,
    image: '/assets/aistudio/image_0d9c48eb.png',
    content: [
      'Skincare is not merely aesthetic—it is a tactile meditation. The sensation of a cool cleansing wash, the gentle aroma of steam-distilled rose petals, and the rhythmic pressure of fingers across cheekbones trigger parasympathetic relaxation.',
      'Try pairing your evening cream application with deep lymphatic drainage strokes: glide from the center of the forehead outward toward ears, and down the sides of the neck.',
      'When your mind is serene, your skin reflects that inner peace.'
    ]
  },
  {
    id: 'art-08',
    slug: 'sun-protection-101-why-it-matters',
    title: 'Sun Protection 101: Why It Matters',
    summary: 'Why broad-spectrum daily SPF is non-negotiable for preserving collagen, preventing photoaging, and cellular defense.',
    category: 'Skincare',
    date: 'Mar 31, 2025',
    readingTime: '4 min read',
    commentsCount: 3,
    image: '/assets/aistudio/image_5d70e469.png',
    content: [
      'Up to 90% of visible skin aging—from fine lines and loss of elasticity to irregular pigmentation—is caused by chronic sun exposure.',
      'Broad-Spectrum Coverage: UVB rays cause sunburn on the superficial epidermis, but UVA rays penetrate deeply into the dermis where collagen and elastin reside.',
      'Choose a weightless mineral or hybrid SPF 50 that wears comfortably under makeup and reapply every two hours during direct outdoor exposure.'
    ]
  },
  {
    id: 'art-09',
    slug: 'skincare-for-different-skin-types',
    title: 'Skincare for Different Skin Types',
    summary: 'Tailoring cleansers, botanical serums, and lipid moisturizers to oily, dry, combination, and delicate sensitive skin.',
    category: 'Skincare',
    date: 'Mar 28, 2025',
    readingTime: '5 min read',
    commentsCount: 5,
    image: '/assets/aistudio/image_4eb6bc74.png',
    content: [
      'No two skin complexions have the same hydration and sebum requirements.',
      'For Dry Skin: Seek rich emulsions with ceramides, squalane, and shea butter.',
      'For Oily & Acne-Prone Skin: Favor lightweight watery essences, niacinamide, and gentle BHA salicylic acid.',
      'For Sensitive Skin: Stick to fragrance-free formulas fortified with Centella Asiatica, chamomile, and colloidal oatmeal.'
    ]
  },
  {
    id: 'art-10',
    slug: 'winter-skincare-essentials-youll-love',
    title: 'Winter Skincare Essentials You’ll Love',
    summary: 'Rich barrier balms, ceramide hydration, and cold-weather rituals to shield your complexion against biting winds and indoor heat.',
    category: 'Beauty',
    date: 'Mar 25, 2025',
    readingTime: '4 min read',
    commentsCount: 2,
    image: '/assets/aistudio/image_0df2759d.png',
    content: [
      'Cold outdoor air combined with artificial indoor heating drastically reduces ambient humidity, accelerating trans-epidermal moisture loss.',
      'Switch from a lightweight summer gel to a rich ceramide cream. Layer a botanical oil or balm over damp skin as the final evening step to seal in moisture like a protective cocoon.',
      'Don’t forget delicate areas: apply an intensive nourishing hand cream and peptide lip balm before heading outdoors.'
    ]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}
