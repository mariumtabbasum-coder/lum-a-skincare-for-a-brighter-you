export interface RecommendedProduct {
  productId: string;
  product: {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    images: string[];
    badge?: string;
    rating: number;
    reviewCount: number;
  };
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  followUpQuestion?: string | null;
  recommendations?: RecommendedProduct[];
  timestamp: number;
  isError?: boolean;
}

export interface QuickReplyOption {
  label: string;
  actionText: string;
  category?: 'concern' | 'skinType' | 'routine' | 'general';
}
