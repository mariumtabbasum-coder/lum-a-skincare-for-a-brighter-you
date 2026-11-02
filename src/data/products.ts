/**
 * Luméa Product Catalog (24 Products)
 * Single source of truth for shop, product detail, quiz recommendations, search, cart, and wishlist.
 * Prices are strictly numerical and IDs are unique strings.
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Serum' | 'Moisturizer' | 'Cleanser' | 'Toner' | 'Mask' | 'Eye Care' | 'Sunscreen';
  skinTypes: ('Normal' | 'Dry' | 'Oily' | 'Combination' | 'Sensitive')[];
  concerns: ('Hydration' | 'Acne' | 'Anti-Aging' | 'Brightening' | 'Soothing')[];
  price: number;
  rating: number; // Demo rating
  reviewCount: number; // Demo count
  badge?: 'Best Seller' | 'New' | 'Editor Choice' | 'Organic';
  isBestseller?: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  popularity: number;
  createdAt: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'lumea-01',
    slug: 'radiant-face-serum',
    name: 'Radiant Face Serum',
    category: 'Serum',
    skinTypes: ['Normal', 'Dry', 'Combination', 'Sensitive'],
    concerns: ['Brightening', 'Hydration', 'Anti-Aging'],
    price: 32.00,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Best Seller',
    isBestseller: true,
    images: [
      '/assets/aistudio/image_75e5f76d.png',
      '/assets/products/radiant-face-serum.png',
      '/assets/aistudio/nature-circle-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'A lightweight, fast-absorbing serum that hydrates, brightens, and improves skin texture.',
    description: 'Infused with natural botanicals and powerful antioxidants, this serum helps you achieve smoother, brighter, and healthier skin. Its potent formula penetrates deeply to lock in moisture and protect against environmental stressors.',
    benefits: [
      'Deep cellular hydration',
      'Visible brightening within 14 days',
      'Antioxidant defense against pollutants',
      'Suitable for sensitive and dry skin types'
    ],
    ingredients: [
      'Aqua (Water)',
      'Rosa Damascena Flower Water',
      'Sodium Hyaluronate (Multi-molecular)',
      'Niacinamide (Vitamin B3)',
      'Ascorbyl Glucoside (Stable Vitamin C)',
      'Camellia Sinensis Leaf Extract',
      'Glycerin',
      'Ethylhexylglycerin'
    ],
    howToUse: 'Apply 3-4 drops morning and night to freshly cleansed face and neck. Gently press into skin until absorbed before applying moisturizer.',
    popularity: 99,
    createdAt: '2024-01-15'
  },
  {
    id: 'lumea-02',
    slug: 'hydrating-moisturizer',
    name: 'Hydrating Moisturizer',
    category: 'Moisturizer',
    skinTypes: ['Normal', 'Dry', 'Sensitive'],
    concerns: ['Hydration', 'Soothing'],
    price: 26.00,
    rating: 4.9,
    reviewCount: 98,
    badge: 'Best Seller',
    isBestseller: true,
    images: [
      '/assets/aistudio/image_620ab9fc.png',
      '/assets/products/hydrating-moisturizer.png',
      '/assets/aistudio/image_620ab9fc.png',
      '/assets/aistudio/image_8c6d850c.png'
    ],
    shortDescription: 'A velvety, replenishing cream designed to lock in 24-hour hydration and calm delicate barriers.',
    description: 'Enriched with squalane and oat ceramides, this silky daily moisturizer fortifies the lipid barrier while delivering uninterrupted comfort without greasiness.',
    benefits: [
      'Locks in moisture for up to 24 hours',
      'Soothes visible redness and irritation',
      'Non-comedogenic and velvet-soft finish'
    ],
    ingredients: [
      'Aqua',
      'Plant Squalane',
      'Avena Sativa (Oat) Kernel Flour',
      'Ceramide NP',
      'Shea Butter Ethyl Esters',
      'Tocopherol (Vitamin E)'
    ],
    howToUse: 'Smooth a dime-sized amount over face, neck, and décolleté following serums. Use daily, morning and evening.',
    popularity: 95,
    createdAt: '2024-01-20'
  },
  {
    id: 'lumea-03',
    slug: 'brightening-toner',
    name: 'Brightening Toner',
    category: 'Toner',
    skinTypes: ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'],
    concerns: ['Brightening', 'Hydration', 'Soothing'],
    price: 24.00,
    rating: 4.9,
    reviewCount: 104,
    badge: 'Best Seller',
    isBestseller: true,
    images: [
      '/assets/aistudio/image_ecf932c4.png',
      '/assets/products/brightening-toner.png',
      '/assets/aistudio/image_8c6d850c.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'A delicate botanical toner with cherry blossom hydrosol and niacinamide to rebalance pH and illuminate.',
    description: 'Refresh, balance, and replenish your skin barrier with this velvety essence toner. Formulated with pure cherry blossom water, hyaluronic acid, and botanical antioxidants, it smooths texture and primes skin for radiant hydration.',
    benefits: [
      'Restores optimal pH 5.5 balance after cleansing',
      'Visible luminosity and refined pore appearance',
      'Hydrates and primes for maximum serum penetration'
    ],
    ingredients: [
      'Aqua (Purified Water)',
      'Prunus Serrulata (Cherry Blossom) Flower Hydrosol',
      'Niacinamide (Vitamin B3)',
      'Sodium Hyaluronate',
      'Hamamelis Virginiana (Witch Hazel) Leaf Extract',
      'Glycerin',
      'Panthenol',
      'Rosa Damascena Flower Extract'
    ],
    howToUse: 'After cleansing, pump onto a cotton pad or into clean palms. Gently pat into face and neck morning and evening before serums.',
    popularity: 96,
    createdAt: '2024-02-01'
  },
  {
    id: 'lumea-04',
    slug: 'night-repair-cream',
    name: 'Night Repair Cream',
    category: 'Moisturizer',
    skinTypes: ['Normal', 'Dry', 'Combination', 'Sensitive'],
    concerns: ['Anti-Aging', 'Hydration'],
    price: 36.00,
    rating: 4.8,
    reviewCount: 112,
    badge: 'Best Seller',
    isBestseller: true,
    images: [
      '/assets/aistudio/image_8c6d850c.png',
      '/assets/products/night-repair-cream.png',
      '/assets/aistudio/home-hero-model-portrait.png',
      '/assets/aistudio/nature-circle-serum.png'
    ],
    shortDescription: 'A rich regenerative evening cream with bio-peptides and antioxidant botanicals to firm and repair.',
    description: 'Repair, firm, and restore while you rest. Powered by botanical collagen boosters, peptides, and cold-pressed floral oils, this lavish night cream restores elasticity and deeply replenishes cellular vitality overnight.',
    benefits: [
      'Accelerates overnight cellular renewal and firming',
      'Restores moisture barrier and diminishes fine dehydration lines',
      'Leaves skin supple, plump, and luminous by sunrise'
    ],
    ingredients: [
      'Rosa Canina (Rosehip) Seed Oil',
      'Palmitoyl Tripeptide-38',
      'Oenothera Biennis (Evening Primrose) Oil',
      'Sodium Hyaluronate (Multi-molecular)',
      'Ceramide Complex',
      'Allantoin',
      'Camellia Japonica Seed Oil'
    ],
    howToUse: 'Warm a pearl-sized amount between fingertips and gently press into face and neck before bedtime.',
    popularity: 94,
    createdAt: '2024-01-10'
  },
  {
    id: 'lumea-05',
    slug: 'vitamin-c-serum',
    name: 'Vitamin C Serum',
    category: 'Serum',
    skinTypes: ['Normal', 'Oily', 'Combination'],
    concerns: ['Brightening', 'Anti-Aging'],
    price: 32.00,
    rating: 4.7,
    reviewCount: 79,
    badge: 'Editor Choice',
    images: [
      '/assets/products/vitamin-c-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png',
      '/assets/aistudio/image_620ab9fc.png',
      '/assets/aistudio/image_8c6d850c.png'
    ],
    shortDescription: '15% stabilized Vitamin C complex boosted with Ferulic acid to brighten dullness.',
    description: 'Target hyperpigmentation and reveal luminosity with this gentle yet effective daily antioxidant shield.',
    benefits: ['Fades dark spots and post-blemish marks', 'Neutralizes free radicals', 'Revitalizes tired complexion'],
    ingredients: ['15% Tetrahexyldecyl Ascorbate', 'Ferulic Acid', 'Kakadu Plum Extract', 'Vitamin E'],
    howToUse: 'Smooth 3 drops over dry face each morning followed by SPF sunscreen.',
    popularity: 90,
    createdAt: '2024-02-10'
  },
  {
    id: 'lumea-06',
    slug: 'clay-face-mask',
    name: 'Clay Face Mask',
    category: 'Mask',
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Acne', 'Soothing'],
    price: 26.00,
    rating: 4.6,
    reviewCount: 64,
    badge: 'Organic',
    images: [
      '/assets/products/clay-face-mask.png',
      '/assets/aistudio/image_620ab9fc.png',
      '/assets/aistudio/nature-circle-serum.png',
      '/assets/aistudio/image_8c6d850c.png'
    ],
    shortDescription: 'French pink kaolin clay infused with botanical extracts to purify congested pores.',
    description: 'A creamy, non-drying mask that gently absorbs excess sebum and unclogs pores while replenishing minerals.',
    benefits: ['Clarifies pores without stripping', 'Refines skin texture', 'Calms oily shine'],
    ingredients: ['French Pink Kaolin Clay', 'Bentonite', 'Witch Hazel Water', 'Calendula Extract', 'Rosemary Leaf'],
    howToUse: 'Apply an even layer to clean skin. Leave on for 10-12 minutes until nearly dry, then wash away with warm water.',
    popularity: 88,
    createdAt: '2024-02-15'
  },
  {
    id: 'lumea-07',
    slug: 'eye-cream',
    name: 'Eye Cream',
    category: 'Eye Care',
    skinTypes: ['Normal', 'Dry', 'Sensitive', 'Combination'],
    concerns: ['Anti-Aging', 'Hydration', 'Brightening'],
    price: 32.00,
    rating: 4.8,
    reviewCount: 52,
    badge: 'New',
    images: [
      '/assets/products/eye-cream.png',
      '/assets/aistudio/home-hero-model-portrait.png',
      '/assets/aistudio/nature-circle-serum.png',
      '/assets/aistudio/image_8c6d850c.png'
    ],
    shortDescription: 'Targeted cooling caffeine and peptide balm to diminish under-eye puffiness and fine lines.',
    description: 'Designed specifically for the fragile orbital area, this lightweight cream awakens tired eyes and softens crow’s feet.',
    benefits: ['Visibly reduces under-eye puffiness', 'Hydrates delicate contour', 'Light-reflective mineral finish'],
    ingredients: ['Green Coffee Bean Caffeine', 'Acetyl Tetrapeptide-5', 'Cucumber Fruit Water', 'Niacinamide'],
    howToUse: 'Gently tap a grain-of-rice amount along the orbital bone morning and night using ring finger.',
    popularity: 85,
    createdAt: '2024-03-01'
  },
  {
    id: 'lumea-08',
    slug: 'balancing-essence',
    name: 'Balancing Essence',
    category: 'Toner',
    skinTypes: ['Normal', 'Dry', 'Sensitive', 'Combination'],
    concerns: ['Hydration', 'Soothing'],
    price: 20.00,
    rating: 4.7,
    reviewCount: 47,
    images: [
      '/assets/products/balancing-essence.png',
      '/assets/aistudio/nature-circle-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'Pure steam-distilled organic rose water and hyaluronic essence for refreshed radiance.',
    description: 'Preps and balances skin immediately post-cleansing, providing a splash of botanical hydration that primes for serums.',
    benefits: ['Restores skin pH harmony', 'Delivers instant calming hydration', 'Pure floral sensory experience'],
    ingredients: ['Organic Rosa Damascena Flower Distillate', 'Vegetable Glycerin', 'Sodium Hyaluronate', 'Panthenol'],
    howToUse: 'Spritz generously directly onto clean face or sweep across with a reusable cotton round.',
    popularity: 87,
    createdAt: '2024-01-28'
  },
  {
    id: 'lumea-09',
    slug: 'sunscreen-spf-50',
    name: 'Sunscreen SPF 50',
    category: 'Sunscreen',
    skinTypes: ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'],
    concerns: ['Anti-Aging', 'Soothing'],
    price: 30.00,
    rating: 4.9,
    reviewCount: 138,
    badge: 'Best Seller',
    images: [
      '/assets/products/sunscreen-spf-50.png',
      '/assets/aistudio/image_620ab9fc.png',
      '/assets/aistudio/nature-circle-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Ultra-light mineral shield with broad-spectrum UVA/UVB defense and zero white cast.',
    description: 'An undetectable SPF 50 fluid enriched with niacinamide and zinc oxide that melts into all skin tones.',
    benefits: ['Broad spectrum SPF 50 mineral protection', 'Invisible satin finish with zero residue', 'Reef-safe and fragrance-free'],
    ingredients: ['Zinc Oxide (Non-nano 12%)', 'Niacinamide', 'Bisabolol', 'Green Tea Polyphenols', 'Isododecane'],
    howToUse: 'Apply 2 generous finger lengths to face and neck as the final morning step, 15 minutes before sun exposure.',
    popularity: 97,
    createdAt: '2024-02-25'
  },
  {
    id: 'lumea-10',
    slug: 'calming-gel',
    name: 'Calming Gel',
    category: 'Moisturizer',
    skinTypes: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Soothing', 'Hydration'],
    price: 22.00,
    rating: 4.7,
    reviewCount: 42,
    images: [
      '/assets/products/calming-gel.png',
      '/assets/aistudio/nature-circle-serum.png'
    ],
    shortDescription: 'Delicate floral mist to hydrate on the go and set makeup with a dewy glow.',
    description: 'Formulated with handpicked Damask roses to revitalize dry or stressed skin throughout the day.',
    benefits: ['On-the-go refresh', 'Soothes windburn and air-conditioning dryness'],
    ingredients: ['Rosa Centifolia Water', 'Aloe Leaf Extract', 'Sodium PCA'],
    howToUse: 'Close eyes and mist face from 8-10 inches away whenever skin feels dry.',
    popularity: 81,
    createdAt: '2024-03-05'
  },
  {
    id: 'lumea-11',
    slug: 'peptide-serum',
    name: 'Peptide Serum',
    category: 'Serum',
    skinTypes: ['Normal', 'Dry', 'Combination'],
    concerns: ['Anti-Aging', 'Hydration'],
    price: 38.00,
    rating: 4.8,
    reviewCount: 65,
    badge: 'New',
    images: [
      '/assets/products/peptide-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Multi-peptide elixir formulated to boost skin bounce and elasticity.',
    description: 'A concentrated blend of copper peptides and matrix metalloproteinase defenders to firm contours.',
    benefits: ['Restores skin bounce', 'Smooths micro-creases', 'Promotes collagen synthesis'],
    ingredients: ['Copper Tripeptide-1', 'Matrixyl 3000', 'Hyaluronic Acid', 'Arginine'],
    howToUse: 'Apply morning and night before cream.',
    popularity: 89,
    createdAt: '2024-03-12'
  },
  {
    id: 'lumea-12',
    slug: 'gentle-cleanser',
    name: 'Gentle Cleanser',
    category: 'Cleanser',
    skinTypes: ['Dry', 'Normal', 'Combination'],
    concerns: ['Hydration', 'Acne'],
    price: 28.00,
    rating: 4.8,
    reviewCount: 54,
    images: [
      '/assets/products/gentle-cleanser.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'First-cleanse golden oil that dissolves waterproof makeup and excess sebum seamlessly.',
    description: 'Emulsifies into a gentle milky liquid upon contact with water, leaving zero residue.',
    benefits: ['Melts stubborn makeup', 'Non-comedogenic jojoba base', 'Softens pores'],
    ingredients: ['Simmondsia Chinensis (Jojoba) Seed Oil', 'Camellia Oleifera Seed Oil', 'Polyglyceryl-4 Oleate'],
    howToUse: 'Massage onto dry skin, then add water to emulsify and rinse.',
    popularity: 84,
    createdAt: '2024-02-18'
  },
  {
    id: 'lumea-13',
    slug: 'sleeping-mask',
    name: 'Sleeping Mask',
    category: 'Mask',
    skinTypes: ['Normal', 'Dry', 'Combination'],
    concerns: ['Brightening', 'Hydration'],
    price: 34.00,
    rating: 4.9,
    reviewCount: 71,
    badge: 'Best Seller',
    images: [
      '/assets/products/sleeping-mask.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Cushioning sleeping mask with glycolic fruit acids and peony extract.',
    description: 'Gently sloughs away dead skin cells while you sleep to unveil baby-soft luminosity by sunrise.',
    benefits: ['Wakes up radiant skin', 'Ultra-hydrating gel-cream texture', 'Pillow-safe formula'],
    ingredients: ['Paeonia Lactiflora Extract', 'Lactic Acid (Fruit origin)', 'Tremella Mushroom Extract'],
    howToUse: 'Smooth generously over face as your last PM step. Rinse in the morning.',
    popularity: 91,
    createdAt: '2024-01-25'
  },
  {
    id: 'lumea-14',
    slug: 'bakuchiol-serum',
    name: 'Bakuchiol Serum',
    category: 'Serum',
    skinTypes: ['Sensitive', 'Normal', 'Dry', 'Combination'],
    concerns: ['Anti-Aging', 'Brightening'],
    price: 42.00,
    rating: 4.9,
    reviewCount: 88,
    badge: 'Organic',
    images: [
      '/assets/products/bakuchiol-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Natural plant-derived retinol alternative designed for sensitive, easily irritated skin.',
    description: 'Delivers all the renewing and smoothing benefits of retinol without irritation, flaking, or photosensitivity.',
    benefits: ['Smooths fine wrinkles', 'Safe for day and night use', 'Gentle on sensitive complexions'],
    ingredients: ['1% Pure Bakuchiol', 'Marula Oil', 'Squalane', 'Rosemary Leaf Extract'],
    howToUse: 'Apply 3-4 drops nightly onto clean face.',
    popularity: 93,
    createdAt: '2024-02-12'
  },
  {
    id: 'lumea-15',
    slug: 'moisture-boost-cream',
    name: 'Moisture Boost Cream',
    category: 'Moisturizer',
    skinTypes: ['Sensitive', 'Dry'],
    concerns: ['Soothing', 'Hydration'],
    price: 29.00,
    rating: 4.7,
    reviewCount: 46,
    images: [
      '/assets/products/moisture-boost-cream.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Intensive restorative barrier cream packed with 5 essential ceramides and colloidal oatmeal.',
    description: 'Specially engineered for compromised, sensitized barriers recovering from weather or treatments.',
    benefits: ['Immediate soothing comfort', 'Strengthens compromised skin barrier', 'Fragrance-free'],
    ingredients: ['Ceramides NP/AP/EOP', 'Colloidal Oatmeal', 'Phytosphingosine', 'Cholesterol'],
    howToUse: 'Massage over irritated or dry areas morning and evening.',
    popularity: 86,
    createdAt: '2024-03-02'
  },
  {
    id: 'lumea-16',
    slug: 'hyaluronic-acid-serum',
    name: 'Hyaluronic Acid Serum',
    category: 'Serum',
    skinTypes: ['Oily', 'Combination'],
    concerns: ['Acne', 'Soothing'],
    price: 22.00,
    rating: 4.6,
    reviewCount: 39,
    images: [
      '/assets/products/hyaluronic-acid-serum.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'Targeted foaming gel with willow bark and tea tree to refine congested pores.',
    description: 'Lathers lightly into an airy cloud that dissolves oil and buildup while preserving baseline hydration.',
    benefits: ['Clears congested pores', 'Controls surface shine', 'Refreshing natural scent'],
    ingredients: ['Salix Alba (Willow Bark) Extract', 'Tea Tree Leaf Hydrosol', 'Zinc PCA', 'Glycerin'],
    howToUse: 'Lather with warm water on wet skin, then rinse thoroughly.',
    popularity: 83,
    createdAt: '2024-02-28'
  },
  {
    id: 'lumea-17',
    slug: 'exfoliating-scrub',
    name: 'Exfoliating Scrub',
    category: 'Cleanser',
    skinTypes: ['Combination', 'Oily', 'Normal'],
    concerns: ['Acne', 'Brightening'],
    price: 30.00,
    rating: 4.8,
    reviewCount: 62,
    badge: 'Editor Choice',
    images: [
      '/assets/products/exfoliating-scrub.png',
      '/assets/aistudio/nature-circle-serum.png'
    ],
    shortDescription: 'Liquid exfoliating treatment with 2% BHA and lactic acid to reveal glass skin.',
    description: 'Gently dissolves pore-clogging debris and smoothens uneven texture for visible clarity.',
    benefits: ['Smooths rough bumps', 'Minimizes enlarged pores', 'Promotes healthy cell turnover'],
    ingredients: ['2% Salicylic Acid', '5% Lactic Acid', 'Apple Fruit Extract', 'Centella Asiatica'],
    howToUse: 'Apply 2-3 nights per week with a cotton pad after cleansing.',
    popularity: 92,
    createdAt: '2024-01-30'
  },
  {
    id: 'lumea-18',
    slug: 'retinol-serum',
    name: 'Retinol Serum',
    category: 'Serum',
    skinTypes: ['Oily', 'Combination', 'Normal'],
    concerns: ['Acne', 'Brightening'],
    price: 28.00,
    rating: 4.7,
    reviewCount: 57,
    images: [
      '/assets/products/retinol-serum.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: '10% Niacinamide + 1% Zinc PCA serum to refine skin texture and regulate sebum.',
    description: 'Clear, watery booster that balances oil production and visibly refines pore appearance.',
    benefits: ['Balances oil and sebum', 'Calms blemishes', 'Even skin tone'],
    ingredients: ['10% Niacinamide', '1% Zinc PCA', 'Hyaluronic Acid', 'Tamarind Seed Extract'],
    howToUse: 'Dispense 3 drops onto clean skin morning and night.',
    popularity: 87,
    createdAt: '2024-02-05'
  },
  {
    id: 'lumea-19',
    slug: 'daily-moisturizer',
    name: 'Daily Moisturizer',
    category: 'Moisturizer',
    skinTypes: ['Oily', 'Sensitive', 'Combination'],
    concerns: ['Soothing', 'Acne'],
    price: 25.00,
    rating: 4.6,
    reviewCount: 43,
    images: [
      '/assets/products/daily-moisturizer.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Featherlight water gel moisturizer loaded with 80% Madagascar Centella Asiatica.',
    description: 'Instant cooling relief for hot, reactive, or acne-prone skin without heaviness or sticky residue.',
    benefits: ['Cools skin temperature on contact', 'Calms reactive flare-ups', 'Ultra-fresh weightless hydration'],
    ingredients: ['Centella Asiatica Leaf Water', 'Madecassoside', 'Asiaticoside', 'Betaine'],
    howToUse: 'Smooth generously over cleansed skin whenever soothing hydration is needed.',
    popularity: 82,
    createdAt: '2024-03-08'
  },
  {
    id: 'lumea-20',
    slug: 'collagen-cream',
    name: 'Collagen Cream',
    category: 'Moisturizer',
    skinTypes: ['Dry', 'Sensitive'],
    concerns: ['Hydration', 'Anti-Aging'],
    price: 35.00,
    rating: 4.9,
    reviewCount: 68,
    badge: 'Organic',
    images: [
      '/assets/products/collagen-cream.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'Rich recovery salve that forms a breathable protective blanket over dry patches.',
    description: 'A comforting blend of organic shea butter and bio-fermented ceramides to restore suppleness.',
    benefits: ['Intense hydration rescue', 'Prevents trans-epidermal moisture loss', 'Restores elasticity'],
    ingredients: ['Butyrospermum Parkii Butter', 'Ceramide AP', 'Sunflower Seed Wax', 'Bisabolol'],
    howToUse: 'Warm a pea size between palms and press into dry zones.',
    popularity: 88,
    createdAt: '2024-01-18'
  },
  {
    id: 'lumea-21',
    slug: 'bb-cream',
    name: 'BB Cream',
    category: 'Sunscreen',
    skinTypes: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Anti-Aging', 'Soothing'],
    price: 28.00,
    rating: 4.7,
    reviewCount: 51,
    images: [
      '/assets/products/bb-cream.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'Everyday tinted mineral SPF 30 that blurs minor imperfections with a luminous sheer veil.',
    description: 'Combines daily sun protection with light botanical tint to even out skin tone naturally.',
    benefits: ['Natural glow finish', 'Protects against blue light and UV', '100% mineral filters'],
    ingredients: ['Titanium Dioxide', 'Zinc Oxide', 'Iron Oxides', 'Argan Kernel Oil'],
    howToUse: 'Smooth over face each morning as primer and sun protection.',
    popularity: 85,
    createdAt: '2024-02-22'
  },
  {
    id: 'lumea-22',
    slug: 'hand-cream',
    name: 'Hand Cream',
    category: 'Moisturizer',
    skinTypes: ['Normal', 'Dry', 'Combination', 'Sensitive'],
    concerns: ['Anti-Aging', 'Brightening'],
    price: 34.00,
    rating: 4.8,
    reviewCount: 37,
    badge: 'New',
    images: [
      '/assets/products/hand-cream.png',
      '/assets/aistudio/image_620ab9fc.png'
    ],
    shortDescription: 'Silky roll-on serum targeting dark shadows and loss of firmness around the eyes.',
    description: 'Featuring a cooling stainless rollerball that stimulates microcirculation while delivering peptides.',
    benefits: ['Instant depuffing cooling effect', 'Brightens dark under-eye circles', 'Tightens loose skin'],
    ingredients: ['Palmitoyl Oligopeptide', 'Chrysin', 'N-Hydroxysuccinimide', 'Marine Collagen Alternative'],
    howToUse: 'Glide the rollerball around each eye contour twice daily.',
    popularity: 80,
    createdAt: '2024-03-15'
  },
  {
    id: 'lumea-23',
    slug: 'firming-mask',
    name: 'Firming Mask',
    category: 'Mask',
    skinTypes: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Soothing', 'Hydration'],
    price: 27.00,
    rating: 4.7,
    reviewCount: 44,
    images: [
      '/assets/products/firming-mask.png',
      '/assets/aistudio/image_8c6d850c.png'
    ],
    shortDescription: 'Jelly leave-on mask infused with real chamomile petals to quiet flushed or irritated skin.',
    description: 'Bathes sensitized skin in healing botanical extracts for an instantly comforted, plump feeling.',
    benefits: ['Reduces visible redness', 'Comforts sunburn and wind exposure', 'Hydrating jelly texture'],
    ingredients: ['Chamomilla Recutita Flower Extract', 'Allantoin', 'Licorice Root Extract', 'Sodium Hyaluronate'],
    howToUse: 'Smooth a generous layer over face. Leave for 15 minutes and rinse, or leave overnight.',
    popularity: 83,
    createdAt: '2024-02-14'
  },
  {
    id: 'lumea-24',
    slug: 'lip-balm',
    name: 'Lip Balm',
    category: 'Moisturizer',
    skinTypes: ['Normal', 'Dry', 'Sensitive', 'Combination', 'Oily'],
    concerns: ['Hydration', 'Anti-Aging'],
    price: 18.00,
    rating: 4.9,
    reviewCount: 95,
    badge: 'Best Seller',
    images: [
      '/assets/products/lip-balm.png',
      '/assets/aistudio/home-hero-model-portrait.png'
    ],
    shortDescription: 'Nourishing botanical peptide gloss that deeply hydrates, softens, and naturally plumps lips.',
    description: 'Glides on with a glass-like shine without stickiness, drenching dry lips in botanical oils and peptides.',
    benefits: ['Cushiony high-shine moisture', 'Locks in hydration overnight', 'Natural petal tint'],
    ingredients: ['Castor Seed Oil', 'Peptide Tripeptide-1', 'Murumuru Seed Butter', 'Vitamin E'],
    howToUse: 'Swipe onto lips as needed throughout the day or apply thick layer at bedtime as lip mask.',
    popularity: 96,
    createdAt: '2024-01-05'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter(p => p.isBestseller).slice(0, 4);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS.slice(0, count);
  return PRODUCTS.filter(p => p.slug !== currentSlug && (p.category === current.category || p.skinTypes.some(t => current.skinTypes.includes(t))))
    .slice(0, count);
}
