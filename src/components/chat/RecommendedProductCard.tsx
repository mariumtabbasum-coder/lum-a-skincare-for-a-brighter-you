import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Star, ArrowUpRight } from 'lucide-react';
import { RecommendedProduct } from './types';
import { addToCart } from '../../lib/cart-store';
import { showToast } from '../common/Toast';

interface RecommendedProductCardProps {
  item: RecommendedProduct;
  onNavigate?: () => void;
}

export const RecommendedProductCard: React.FC<RecommendedProductCardProps> = ({
  item,
  onNavigate,
}) => {
  const { product, reason } = item;
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;

    setIsAdding(true);
    try {
      addToCart(product.id, 1);
      showToast({
        type: 'cart',
        title: 'Added to Bag',
        description: `${product.name} is now in your cart.`,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const thumbnail = product.images?.[0] || '/assets/products/radiant-face-serum.png';

  return (
    <div className="group bg-[#FFF9FA] border border-[#F2D7E0] rounded-[18px] p-3 shadow-xs hover:shadow-md hover:border-[#E8BFCF] transition-all duration-300">
      <div className="flex gap-3">
        {/* Product Image Thumbnail */}
        <Link
          to={`/shop/${product.slug}`}
          onClick={onNavigate}
          className="relative w-20 h-20 shrink-0 overflow-hidden rounded-[14px] bg-[#FAF0F3] border border-[#F2DCE3] block"
          title={`View ${product.name}`}
        >
          <picture className="w-full h-full block">
            <source
              srcSet={thumbnail.replace(/\.(png|jpe?g)$/i, '.webp')}
              type="image/webp"
            />
            <img
              src={thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          </picture>
          {product.badge && (
            <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-medium bg-[#5D3A58] text-white rounded-full tracking-wide">
              {product.badge}
            </span>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#9C7594]">
                {product.category}
              </span>
              <div className="flex items-center text-[11px] text-[#D9822B] font-medium">
                <Star className="w-3 h-3 fill-current inline-block mr-0.5" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <Link
              to={`/shop/${product.slug}`}
              onClick={onNavigate}
              className="text-[13px] font-serif font-semibold text-[#3E2F3F] hover:text-[#5D3A58] transition-colors line-clamp-1 block"
            >
              {product.name}
            </Link>

            <div className="text-[12px] font-semibold text-[#5D3A58] mt-0.5">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Reason */}
      {reason && (
        <div className="mt-2.5 pt-2 border-t border-[#F5E2E8] text-[11px] text-[#695466] leading-relaxed flex items-start gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A8587C] mt-1 shrink-0" />
          <p className="italic">{reason}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-3 flex items-center gap-2 pt-1">
        <Link
          to={`/shop/${product.slug}`}
          onClick={onNavigate}
          className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-[#5D3A58] bg-[#F8E7EC] hover:bg-[#F2D6DF] rounded-full transition-colors text-center"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
            justAdded
              ? 'bg-[#3E6B48] text-white'
              : 'bg-[#5D3A58] text-white hover:bg-[#4E2E4A] active:scale-98'
          }`}
          aria-label={`Add ${product.name} to bag`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>In Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
