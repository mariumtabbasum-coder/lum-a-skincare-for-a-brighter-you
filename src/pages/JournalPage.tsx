import { HeroImageBackground } from '../components/common/HeroImageBackground';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MessageSquare, ArrowRight, Sparkles, Leaf, Share2, Check } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { ARTICLES, Article } from '../data/articles';

export const JournalPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyArticle = async (slug: string, id: string) => {
    const origin = window.location.origin;
    const url = `${origin}/journal/${slug}`;
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        // fallback
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        success = true;
      } catch {
        success = false;
      }
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2800);
  };

  const categories = ['All', 'Skincare', 'Ingredients', 'Lifestyle', 'Beauty'];

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article is art-01 unless a search query is active
  const featuredArticle = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const isDefaultView = !searchQuery.trim() && selectedCategory === 'All';

  // In default view, exclude the featured panoramic article from the 3x3 grid
  const gridArticles = isDefaultView
    ? filteredArticles.filter(a => a.id !== featuredArticle.id)
    : filteredArticles;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
  const paginatedGrid = gridArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="overflow-hidden bg-[#FFF7F7] min-h-screen">
      <SEOHead
        title="Glow Journal — Skincare Tips & Botanical Guides"
        description="Skincare tips, ingredient guides, & a healthier you. Read expert editorial guidance from Luméa."
        canonicalPath="/journal"
      />

      {/* 1. Glow Journal Header (Full-Width Edge-to-Edge with Blurred Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Botanical Background Image (Blurred for optimal contrast) */}
        <HeroImageBackground src="/assets/articles/best-ingredients-for-healthy-skin.webp" />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/42 via-[#FFF8F9]/32 to-[#FDEEF3]/45 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#F7D3E2]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#EFC6D8]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58] shrink-0" />
            <span className="truncate">Editorial Wisdom & Rituals</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#3E2F3F] tracking-tight leading-[1.18]">
            Glow Journal
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#3E2F3F]/85 leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Skincare tips, ingredient guides, & a healthier you. Read expert editorial guidance from Luméa.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-[#6B4B6B]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              📖 Evidence-Based Skincare
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌿 Botanical Ingredient Science
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ✨ Daily Ritual Guides
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Article Toolbar: Category Filter Pills & Search */}
      <section className="pb-4 sm:pb-6">
        <div className="lumea-container">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-xs p-4 sm:p-5 rounded-[22px] border border-[#F3DDE6] shadow-2xs">
            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Article categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  aria-pressed={selectedCategory === cat}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#5D3A58] text-white shadow-xs'
                      : 'bg-white text-[#3E2F3F] border border-[#F3DDE6] hover:bg-[#FDF6F8] hover:border-[#6B4B6B]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar Input */}
            <div className="relative max-w-xs sm:w-72 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E6B89]" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles..."
                aria-label="Search articles"
                className="w-full pl-11 pr-4 py-2 bg-white border border-[#EFC6D8] rounded-full text-xs text-[#3E2F3F] placeholder-[#9E6B89]/75 focus:outline-none focus:border-[#6B4B6B] focus:ring-1 focus:ring-[#6B4B6B] shadow-2xs transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Editorial Content Area */}
      <section className="py-8 sm:py-12">
        <div className="lumea-container space-y-10 sm:space-y-12">
          
          {/* Featured Article Spotlight: Pure Coded Responsive Editorial Card with Exact Wording */}
          {isDefaultView && (
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#F3DDE6] shadow-sm bg-gradient-to-br from-[#FFF5F7] via-[#FDEEF3] to-[#FCEAF0] p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column: Text & Reliable Button */}
                <div className="md:col-span-7 space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[11px] font-semibold text-[#6B4B6B] tracking-wide uppercase shadow-2xs">
                    <span>Featured Skin Guide • 6 Min Read</span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#3E2F3F] tracking-tight leading-[1.2]">
                    The Ultimate Guide to Your Skin Type
                  </h2>

                  <p className="text-sm sm:text-base text-[#3E2F3F]/80 leading-relaxed font-sans font-light">
                    Find the right products, ingredients, and routine for your unique skin.
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/journal/the-ultimate-guide-to-your-skin-type"
                      className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 shadow-md shadow-[#5D3A58]/25 hover:shadow-lg active:scale-95 group/btn cursor-pointer"
                      aria-label="Read The Ultimate Guide to Your Skin Type"
                    >
                      <span>Skin Guide</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Clean Photographic Thumbnail */}
                <div className="md:col-span-5">
                  <Link
                    to="/journal/the-ultimate-guide-to-your-skin-type"
                    className="block group overflow-hidden rounded-2xl border border-[#F3DDE6] shadow-md bg-white aspect-4/3 relative"
                  >
                    <picture className="w-full h-full block">
                      <source
                        srcSet="/assets/articles/skincare-for-different-skin-types.webp"
                        type="image/webp"
                      />
                      <img
                        src="/assets/articles/skincare-for-different-skin-types.png"
                        alt="The Ultimate Guide to Your Skin Type"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full text-[10px] font-bold text-[#5D3A58] uppercase tracking-wider shadow-2xs border border-[#F3DDE6]">
                      Editor's Pick
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 3. 3-Column Grid of Articles (Strictly Matching User Reference 3x3 Mockup) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#F6E0E6]">
              <h2 className="font-heading text-2xl text-[#3E2F3F]">
                {selectedCategory === 'All' ? 'Latest Stories' : `${selectedCategory} Articles`}
              </h2>
              <span className="text-xs text-[#9E6B89]">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            {paginatedGrid.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {paginatedGrid.map(art => (
                  <article
                    key={art.id}
                    className="relative bg-white rounded-[24px] border border-[#F3DDE6] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#6B4B6B]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Top Image */}
                    <div className="aspect-[16/10] rounded-[18px] overflow-hidden bg-[#FDF6F8] mb-4">
                      <Link to={`/journal/${art.slug}`}>
                        <picture className="w-full h-full block">
                          <source
                            srcSet={art.image?.replace(/\.(png|jpe?g)$/i, '.webp')}
                            type="image/webp"
                          />
                          <img
                            src={art.image}
                            alt={art.title}
                            width={400}
                            height={250}
                            decoding="async"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </picture>
                      </Link>
                    </div>

                    {/* Card Content & Title */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="mb-4">
                        <Link to={`/journal/${art.slug}`} className="flex items-start gap-2.5 group/title">
                          <Leaf className="w-4 h-4 text-[#8C537B] shrink-0 mt-1 stroke-[1.6]" />
                          <h3 className="font-heading text-lg sm:text-[1.125rem] font-medium text-[#3E2F3F] group-hover/title:text-[#6B4B6B] transition-colors leading-snug">
                            {art.title}
                          </h3>
                        </Link>
                      </div>

                      {/* Metadata Line matching reference image: Calendar Date + Comments Count & Copy Link */}
                      <div className="flex items-center justify-between text-xs text-[#9E6B89] pt-3 border-t border-[#F6E0E6]/80 relative z-10">
                        <span className="inline-flex items-center gap-1.5 font-sans">
                          <Calendar className="w-3.5 h-3.5 text-[#B4829E] stroke-[1.7]" />
                          {art.date}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 font-sans">
                            <MessageSquare className="w-3.5 h-3.5 text-[#B4829E] stroke-[1.7]" />
                            {art.commentsCount ?? 0}
                          </span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCopyArticle(art.slug, art.id);
                              }}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                                copiedId === art.id
                                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                  : 'bg-[#FDF2F5] hover:bg-[#F6E0E6] text-[#6B4B6B]'
                              }`}
                              title={copiedId === art.id ? 'Copied!' : 'Copy article link'}
                              aria-label={copiedId === art.id ? 'Link copied' : 'Copy link'}
                            >
                              {copiedId === art.id ? (
                                <>
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Share2 className="w-3 h-3 stroke-[1.8]" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>

                            {/* Floating "Copied!" Tooltip */}
                            {copiedId === art.id && (
                              <div
                                role="status"
                                aria-live="polite"
                                className="absolute bottom-full mb-1.5 right-0 whitespace-nowrap px-2.5 py-1 bg-[#3E2F3F] text-white text-[10px] font-medium rounded-md shadow-md flex items-center gap-1 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                              >
                                <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[2.5]" />
                                <span>Copied!</span>
                                <div className="absolute top-full right-4 -mt-1 border-3 border-transparent border-t-[#3E2F3F]" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Botanical Watermark in bottom-right corner matching reference */}
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 pointer-events-none opacity-20 text-[#B4829E] select-none">
                      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                        <path d="M42 42C30 42 20 32 20 20C32 20 42 30 42 42Z" />
                        <path d="M20 20L42 42" />
                        <path d="M28 28C24 22 24 16 28 12C32 16 32 22 28 28Z" />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-[24px] border border-[#F6E0E6] p-8 space-y-3">
                <Sparkles className="w-8 h-8 text-[#C39DB8] mx-auto" />
                <h3 className="font-heading text-lg text-[#3E2F3F]">No articles found</h3>
                <p className="text-xs text-[#3E2F3F]/70">Try adjusting your search query or choosing another category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-5 py-2 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => setCurrentPage(pNum)}
                      aria-current={currentPage === pNum ? 'page' : undefined}
                      className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer ${
                        currentPage === pNum
                          ? 'bg-[#5D3A58] text-white'
                          : 'bg-white text-[#3E2F3F] border border-[#F6E0E6] hover:bg-[#F6E0E6]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};
