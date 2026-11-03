import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Plus } from 'lucide-react';
import { addToCart } from '../../lib/cart-store';
import { isInWishlist, toggleWishlist, WISHLIST_UPDATED_EVENT } from '../../lib/wishlist-store';
import { showToast } from './Toast';

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  reviewCount: number;
  badge?: string;
  images: string[];
}

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(product.id));
    const handleUpdate = () => setWishlisted(isInWishlist(product.id));
    window.addEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
  }, [product.id]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleWishlist(product.id);
    setWishlisted(result.added);
    showToast({
      type: 'wishlist',
      title: result.added ? 'Added to Wishlist' : 'Removed from Wishlist',
      description: product.name
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    showToast({
      type: 'cart',
      title: 'Added to Cart',
      description: `${product.name} has been added to your bag.`
    });
  };

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-[26px] border border-[#F3DDE6] hover:border-[#6B4B6B]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#6B4B6B]/15 hover:-translate-y-2 overflow-hidden p-4 sm:p-5 ${className}`}
    >
      {/* Product Image Tile with Rounded Container */}
      <div className="relative w-full aspect-square bg-gradient-to-b from-[#FFF5F8] to-[#FCEAF0]/50 rounded-[22px] overflow-hidden mb-4 flex items-center justify-center border border-[#F6E0E6]/60 group-hover:border-[#EFC6D8] transition-colors">
        <Link
          to={`/shop/${product.slug}`}
          className="w-full h-full flex items-center justify-center focus:outline-none"
          tabIndex={-1}
          aria-hidden="true"
        >
          <picture className="w-full h-full block">
            <source
              srcSet={product.images[0]?.replace(/\.(png|jpe?g)$/i, '.webp')}
              type="image/webp"
            />
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 transform-gpu backface-hidden"
            />
          </picture>
        </Link>

        {/* Top Badges */}
        {product.badge && (
          <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/95 backdrop-blur-xs text-[#5D3A58] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-xs border border-[#F6E0E6]">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          className="absolute top-3.5 right-3.5 w-12 h-12 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#5D3A58] shadow-xs hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#EFC6D8] text-[#5D3A58]' : 'text-[#5D3A58]'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        <button
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          className="product-card-quick-add pointer-events-none absolute bottom-3.5 inset-x-3.5 py-3 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-200 shadow-lg shadow-[#5D3A58]/30 backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between px-1">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#76536B] font-semibold block mb-1.5 group-hover:text-[#6B4B6B] transition-colors">
            {product.category}
          </span>
          <Link
            to={`/shop/${product.slug}`}
            className="font-heading text-base sm:text-lg font-semibold text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors line-clamp-1 mb-1.5 block leading-snug"
          >
            {product.name}
          </Link>
          
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-[11px] font-medium text-[#76536B]">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price and Cart Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F6E0E6]/80">
          <span className="text-base sm:text-lg font-bold text-[#5D3A58]">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="px-4 py-2 bg-[#F6E0E6] hover:bg-[#5D3A58] text-[#5D3A58] hover:text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-[#5D3A58]/20 flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
