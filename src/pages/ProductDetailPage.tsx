import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Star,
  Plus,
  Minus,
  Sparkles,
  Droplets,
  Sun,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { addToCart } from '../lib/cart-store';
import { isInWishlist, toggleWishlist, WISHLIST_UPDATED_EVENT } from '../lib/wishlist-store';
import { showToast } from '../components/common/Toast';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingr' | 'how' | 'rev'>('desc');
  const [wishlisted, setWishlisted] = useState(false);
  const [relatedCarouselIndex, setRelatedCarouselIndex] = useState(0);

  // Sync wishlist state
  useEffect(() => {
    if (product) {
      setWishlisted(isInWishlist(product.id));
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleUpdate = () => setWishlisted(isInWishlist(product.id));
    window.addEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-4">
        <SEOHead title="Product Not Found" description="The requested Luméa skincare product could not be located." noIndex />
        <h1 className="font-heading text-3xl text-[#3E2F3F]">Product Not Found</h1>
        <p className="text-xs text-[#3E2F3F]/70">
          The product you are looking for may have been retired or moved.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Back to Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    showToast({
      type: 'cart',
      title: 'Added to Bag',
      description: `${quantity} × ${product.name} added to your bag.`
    });
  };

  const handleWishlistToggle = () => {
    const res = toggleWishlist(product.id);
    setWishlisted(res.added);
    showToast({
      type: 'wishlist',
      title: res.added ? 'Saved to Wishlist' : 'Removed from Wishlist',
      description: product.name
    });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.images[0],
    'description': product.shortDescription,
    'sku': product.id,
    'brand': {
      '@type': 'Brand',
      'name': 'Luméa'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://lumea-skincare.example/shop/${product.slug}`,
      'priceCurrency': 'USD',
      'price': product.price.toFixed(2),
      'availability': 'https://schema.org/InStock'
    }
  };

  return (
    <div className="overflow-hidden">
      <SEOHead
        title={product.name}
        description={product.shortDescription}
        canonicalPath={`/shop/${product.slug}`}
        ogType="product"
        ogImage={product.images[0]}
        jsonLd={jsonLd}
      />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-[#F6E0E6] py-3.5" aria-label="Breadcrumb">
        <div className="lumea-container">
          <ol className="flex items-center space-x-2 text-xs text-[#C39DB8]">
            <li>
              <Link to="/" className="hover:text-[#6B4B6B] transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-[#6B4B6B] transition-colors">Shop</Link>
            </li>
            <li>/</li>
            <li className="text-[#3E2F3F] font-medium truncate" aria-current="page">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Product Hero */}
      <section className="py-12 lg:py-16 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Gallery Left (Clean Main Image Display - 4 thumbnail boxes removed) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-square rounded-[28px] overflow-hidden bg-white border border-[#EFC6D8] shadow-md group">
                <picture className="w-full h-full block">
                  <source
                    srcSet={(product.images[0] || '/assets/products/radiant-face-serum.png').replace(/\.(png|jpe?g)$/i, '.webp')}
                    type="image/webp"
                  />
                  <img
                    src={product.images[0] || '/assets/products/radiant-face-serum.png'}
                    alt={product.name}
                    width={600}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/products/radiant-face-serum.png';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  />
                </picture>

                {product.badge && (
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs text-[#6B4B6B] text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-xs border border-[#F6E0E6]">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Right Product Details & Purchase Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C39DB8] font-semibold block mb-1">
                  {product.category}
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F] leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#3E2F3F]">{product.rating}</span>
                  <span className="text-xs text-[#C39DB8]">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#6B4B6B]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#3E2F3F]/80 leading-relaxed border-t border-b border-[#F6E0E6] py-4">
                {product.shortDescription}
              </p>

              {/* Key Benefits with Line Icons */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                  Key Benefits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3E2F3F]/80">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#6B4B6B] shrink-0" />
                    <span>Hydrating & replenishing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#6B4B6B] shrink-0" />
                    <span>Visible brightening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#6B4B6B] shrink-0" />
                    <span>Anti-aging defense</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6B4B6B] shrink-0" />
                    <span>Suitable for sensitive skin</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#3E2F3F]">Quantity:</span>
                  <div className="flex items-center border border-[#EFC6D8] rounded-full px-3 py-1 bg-white shadow-2xs">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      aria-label="Decrease quantity"
                      className="text-[#6B4B6B] hover:text-[#3E2F3F] p-1 disabled:opacity-40"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#3E2F3F]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(99, prev + 1))}
                      aria-label="Increase quantity"
                      className="text-[#6B4B6B] hover:text-[#3E2F3F] p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={handleWishlistToggle}
                    aria-pressed={wishlisted}
                    className="w-full py-3.5 bg-white hover:bg-[#F6E0E6] text-[#6B4B6B] border border-[#EFC6D8] rounded-full text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#EFC6D8] text-[#6B4B6B]' : ''}`} />
                    <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Tabs (Description, Ingredients, How to Use, Reviews) */}
      <section className="py-12 bg-white border-y border-[#F6E0E6]">
        <div className="lumea-container">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-[#F6E0E6] space-x-8 overflow-x-auto" role="tablist">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'ingr', label: 'Ingredients' },
              { id: 'how', label: 'How to Use' },
              { id: 'rev', label: `Reviews (${product.reviewCount})` }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#6B4B6B] border-b-2 border-[#6B4B6B]'
                    : 'text-[#3E2F3F]/60 hover:text-[#3E2F3F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8 text-xs sm:text-sm text-[#3E2F3F]/80 leading-relaxed max-w-3xl">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <div className="space-y-2 pt-2">
                  <h3 className="font-heading text-base text-[#3E2F3F] font-semibold">Formula Highlights:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.benefits.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'ingr' && (
              <div className="space-y-4">
                <p className="text-xs text-[#C39DB8]">
                  Full transparent ingredient list formulated without parabens, phthalates, synthetic dyes, or sulfates.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.ingredients.map((ingr, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#FFF7F7] border border-[#F6E0E6] rounded-full text-xs text-[#3E2F3F]"
                    >
                      {ingr}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'how' && (
              <div className="space-y-4">
                <p>{product.howToUse}</p>
                <div className="p-4 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[16px] text-xs text-[#6B4B6B]">
                  <strong>Pro Ritual Tip:</strong> Gently pat and press into slightly damp skin to maximize trans-epidermal moisture absorption.
                </div>
              </div>
            )}

            {activeTab === 'rev' && (
              <div className="space-y-6">
                <div className="p-4 bg-[#FFF7F7] rounded-[16px] border border-[#F6E0E6] flex items-center justify-between">
                  <div>
                    <p className="font-heading text-lg text-[#3E2F3F]">Overall Customer Rating</p>
                    <p className="text-xs text-[#C39DB8]">{product.rating} out of 5 stars based on {product.reviewCount} verified reviews</p>
                  </div>
                  <span className="text-[11px] text-[#6B4B6B] font-semibold bg-[#F6E0E6] px-3 py-1 rounded-full">
                    Demo Feedback
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-[#F6E0E6] rounded-[16px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#3E2F3F]">Elena R. — Verified Buyer</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#3E2F3F]/80">
                      "My sensitive barrier has never felt this calm. It sinks right in without feeling heavy and gave me a soft glow in less than a week."
                    </p>
                  </div>

                  <div className="p-4 border border-[#F6E0E6] rounded-[16px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#3E2F3F]">Camille T. — Verified Buyer</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#3E2F3F]/80">
                      "Beautiful packaging, lovely delicate texture, and truly gentle ingredients. I am on my second bottle!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* "You may also like" Related Products Carousel */}
      <section className="py-20 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-[#3E2F3F]">
              You may also like
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRelatedCarouselIndex(prev => Math.max(0, prev - 1))}
                disabled={relatedCarouselIndex === 0}
                aria-label="Previous related products"
                className="w-8 h-8 rounded-full bg-white border border-[#EFC6D8] flex items-center justify-center text-[#6B4B6B] disabled:opacity-40 hover:bg-[#F6E0E6] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRelatedCarouselIndex(prev => Math.min(relatedProducts.length - 3, prev + 1))}
                disabled={relatedCarouselIndex >= relatedProducts.length - 3}
                aria-label="Next related products"
                className="w-8 h-8 rounded-full bg-white border border-[#EFC6D8] flex items-center justify-center text-[#6B4B6B] disabled:opacity-40 hover:bg-[#F6E0E6] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(relatedCarouselIndex, relatedCarouselIndex + 3).map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
