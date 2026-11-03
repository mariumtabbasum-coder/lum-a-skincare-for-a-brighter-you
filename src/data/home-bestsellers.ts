import type { ProductCardData } from '../components/common/ProductCard';

// Keep the homepage payload small; the full product catalog is loaded by Shop.
export const HOME_BESTSELLERS: ProductCardData[] = [
  {
    id: 'lumea-01',
    slug: 'radiant-face-serum',
    name: 'Radiant Face Serum',
    category: 'Serum',
    price: 32,
    reviewCount: 124,
    badge: 'Best Seller',
    images: ['/assets/aistudio/image_75e5f76d.png'],
  },
  {
    id: 'lumea-02',
    slug: 'hydrating-moisturizer',
    name: 'Hydrating Moisturizer',
    category: 'Moisturizer',
    price: 26,
    reviewCount: 98,
    badge: 'Best Seller',
    images: ['/assets/aistudio/image_620ab9fc.png'],
  },
  {
    id: 'lumea-03',
    slug: 'brightening-toner',
    name: 'Brightening Toner',
    category: 'Toner',
    price: 24,
    reviewCount: 104,
    badge: 'Best Seller',
    images: ['/assets/aistudio/image_ecf932c4.png'],
  },
  {
    id: 'lumea-04',
    slug: 'night-repair-cream',
    name: 'Night Repair Cream',
    category: 'Moisturizer',
    price: 36,
    reviewCount: 112,
    badge: 'Best Seller',
    images: ['/assets/aistudio/image_8c6d850c.png'],
  },
];
