import { HeroImageBackground } from '../components/common/HeroImageBackground';
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronRight, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL or defaults
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [selectedSkinType, setSelectedSkinType] = useState<string>(
    searchParams.get('skinType') || 'All'
  );
  const [selectedConcern, setSelectedConcern] = useState<string>(
    searchParams.get('concern') || 'All'
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 100
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sort') || 'popular'
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', 'Serum', 'Moisturizer', 'Cleanser', 'Toner', 'Mask', 'Eye Care', 'Sunscreen'];
  const skinTypes = ['All', 'Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
  const concerns = ['All', 'Hydration', 'Acne', 'Anti-Aging', 'Brightening', 'Soothing'];

  // Handle URL sync
  const updateQueryParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val === 'All' || !val) {
      params.delete(key);
    } else {
      params.set(key, val);
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSkinType('All');
    setSelectedConcern('All');
    setMaxPrice(100);
    setSortBy('popular');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Skin type filter
      if (selectedSkinType !== 'All' && !product.skinTypes.includes(selectedSkinType as any)) {
        return false;
      }
      // Concern filter
      if (selectedConcern !== 'All' && !product.concerns.includes(selectedConcern as any)) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.popularity - a.popularity;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, selectedSkinType, selectedConcern, maxPrice, sortBy]);

  // Pagination (9 items per page for spacious 3-col grid across 24 products)
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedSkinType !== 'All' || selectedConcern !== 'All' || maxPrice < 100;

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Shop Our Skincare Collection"
        description="Thoughtfully crafted. Naturally effective. Explore all 24 botanical serums, cleansers, creams, and sunscreens by Luméa."
        canonicalPath="/shop"
      />

      {/* 1. Collection Hero Header (Full-Width Edge-to-Edge with Blurred Botanical Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Theme-Matching Botanical Background Image (Blurred for optimal contrast) */}
        <HeroImageBackground src="/assets/articles/morning-vs-night-skincare-routine.webp" />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/42 via-[#FFF8F9]/32 to-[#FDEEF3]/45 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#F7D3E2]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#EFC6D8]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-center space-y-4 sm:space-y-5">
          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58] shrink-0" />
            <span className="truncate">Thoughtfully Crafted • Naturally Effective</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#3E2F3F] tracking-tight leading-[1.18]">
            Shop Our Skincare Collection
          </h1>

          {/* Subtitle with exact wording */}
          <p className="text-xs sm:text-base lg:text-lg text-[#3E2F3F]/85 leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Thoughtfully crafted. Naturally effective. Explore all 24 botanical serums, cleansers, creams, and sunscreens by Luméa.
          </p>

          {/* Micro Trust Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-[#6B4B6B]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ✨ 24 Botanical Formulations
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌿 100% Vegan & Cruelty-Free
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌸 Dermatologist Approved
            </span>
          </div>
        </div>
      </section>

      {/* 2. Shop Main Body (2 Columns) */}
      <section className="py-12 bg-[#FFF7F7]">
        <div className="lumea-container">
          
          {/* Mobile Filter Toggle & Toolbar */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#F6E0E6]">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#EFC6D8] rounded-full text-xs font-semibold text-[#6B4B6B] shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <span className="text-xs text-[#3E2F3F]/70">
              {filteredProducts.length} Products
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Left Filter Panel */}
            <aside className="hidden lg:block lg:col-span-3 bg-white rounded-[24px] border border-[#F6E0E6] p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F6E0E6]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#6B4B6B]" />
                  <h2 className="font-heading text-lg text-[#3E2F3F]">Filter</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    aria-label="Reset all filters"
                    title="Reset all filters"
                    className="p-1.5 text-[#6B4B6B] hover:text-[#3E2F3F] hover:bg-[#F6E0E6] rounded-full transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="sr-only">Reset all filters</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                  Category
                </span>
                <div className="space-y-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        updateQueryParam('category', cat);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-[#F6E0E6] text-[#6B4B6B] font-semibold'
                          : 'text-[#3E2F3F]/75 hover:bg-[#FFF7F7]'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#6B4B6B]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Type Filter */}
              <div className="space-y-2.5 pt-4 border-t border-[#F6E0E6]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                  Skin Type
                </span>
                <div className="space-y-1.5">
                  {skinTypes.map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedSkinType(st);
                        updateQueryParam('skinType', st);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        selectedSkinType === st
                          ? 'bg-[#F6E0E6] text-[#6B4B6B] font-semibold'
                          : 'text-[#3E2F3F]/75 hover:bg-[#FFF7F7]'
                      }`}
                    >
                      <span>{st}</span>
                      {selectedSkinType === st && <span className="w-1.5 h-1.5 rounded-full bg-[#6B4B6B]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern Filter */}
              <div className="space-y-2.5 pt-4 border-t border-[#F6E0E6]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                  Skin Concern
                </span>
                <div className="space-y-1.5">
                  {concerns.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedConcern(c);
                        updateQueryParam('concern', c);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        selectedConcern === c
                          ? 'bg-[#F6E0E6] text-[#6B4B6B] font-semibold'
                          : 'text-[#3E2F3F]/75 hover:bg-[#FFF7F7]'
                      }`}
                    >
                      <span>{c}</span>
                      {selectedConcern === c && <span className="w-1.5 h-1.5 rounded-full bg-[#6B4B6B]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider ($0 - $100) */}
              <div className="space-y-2.5 pt-4 border-t border-[#F6E0E6]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F]">
                    Price Limit
                  </span>
                  <span className="text-xs font-semibold text-[#6B4B6B]">
                    Up to ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="1"
                  value={maxPrice}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setMaxPrice(val);
                    updateQueryParam('maxPrice', val.toString());
                  }}
                  className="w-full accent-[#6B4B6B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#C39DB8]">
                  <span>$15</span>
                  <span>$100</span>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2.5 bg-[#FFF7F7] hover:bg-[#F6E0E6] border border-[#EFC6D8] rounded-full text-xs font-medium text-[#6B4B6B] transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </aside>

            {/* Right Product Grid Column */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Toolbar */}
              <div className="hidden lg:flex items-center justify-between bg-white px-6 py-3.5 rounded-[20px] border border-[#F6E0E6]">
                <span className="text-xs font-semibold text-[#3E2F3F]">
                  Showing {filteredProducts.length} Products
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#3E2F3F]/70">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => {
                      setSortBy(e.target.value);
                      updateQueryParam('sort', e.target.value);
                    }}
                    className="bg-[#FFF7F7] border border-[#EFC6D8] rounded-full px-3 py-1.5 text-xs text-[#3E2F3F] focus:outline-none focus:border-[#6B4B6B]"
                  >
                    <option value="popular">Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Product Grid (Covering more width with bigger, prominent luxury cards) */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16 bg-white rounded-[24px] border border-[#F6E0E6] p-8 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#F6E0E6] rounded-full flex items-center justify-center text-[#6B4B6B]">
                    <Filter className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-heading text-xl text-[#3E2F3F]">No products match your filters</h3>
                  <p className="text-xs text-[#3E2F3F]/70 max-w-sm mx-auto">
                    Try adjusting your category, price range, or skin concern selection to explore more botanical options.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-medium transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Working Pagination (1 2 3 >) */}
              {totalPages > 1 && (
                <div className="pt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        aria-label={`Go to page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                        className={`w-9 h-9 rounded-full text-xs font-semibold transition-colors flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-[#6B4B6B] text-white shadow-xs'
                            : 'bg-white hover:bg-[#F6E0E6] text-[#3E2F3F] border border-[#F6E0E6]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {currentPage < totalPages && (
                    <button
                      onClick={() => {
                        setCurrentPage(prev => prev + 1);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      aria-label="Go to next page"
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#F6E0E6] text-[#6B4B6B] border border-[#F6E0E6] flex items-center justify-center text-xs transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          <div
            className="fixed inset-0 bg-[#3E2F3F]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FFF7F7] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#F6E0E6]">
                  <h2 id="mobile-filter-title" className="font-heading text-lg text-[#3E2F3F]">
                    Filter Products
                  </h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="Close filters"
                    className="p-1.5 text-[#6B4B6B] rounded-full hover:bg-[#F6E0E6]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                    Category
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          updateQueryParam('category', cat);
                        }}
                        className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                          selectedCategory === cat ? 'bg-[#6B4B6B] text-white font-semibold' : 'bg-white text-[#3E2F3F]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Skin Types */}
                <div className="space-y-2 pt-4 border-t border-[#F6E0E6]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3E2F3F] block">
                    Skin Type
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {skinTypes.map(st => (
                      <button
                        key={st}
                        onClick={() => {
                          setSelectedSkinType(st);
                          updateQueryParam('skinType', st);
                        }}
                        className={`text-left px-3 py-1.5 rounded-lg text-xs ${
                          selectedSkinType === st ? 'bg-[#6B4B6B] text-white font-semibold' : 'bg-white text-[#3E2F3F]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div className="space-y-2 pt-4 border-t border-[#F6E0E6]">
                  <div className="flex justify-between text-xs font-semibold text-[#3E2F3F]">
                    <span>Price Up to</span>
                    <span className="text-[#6B4B6B]">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    value={maxPrice}
                    onChange={e => {
                      const val = Number(e.target.value);
                      setMaxPrice(val);
                      updateQueryParam('maxPrice', val.toString());
                    }}
                    className="w-full accent-[#6B4B6B]"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-[#F6E0E6]">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full py-2 bg-white text-[#3E2F3F] rounded-full text-xs"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
