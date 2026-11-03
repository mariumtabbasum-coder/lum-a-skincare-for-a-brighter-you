import { HeroImageBackground } from '../components/common/HeroImageBackground';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Leaf, Package, Check } from 'lucide-react';
import gsap from 'gsap';
import { SEOHead } from '../lib/seo';
import { getBestsellers } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { validateEmail } from '../lib/validation';

export const HomePage: React.FC = () => {
  const bestsellers = getBestsellers();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [communityEmail, setCommunityEmail] = useState('');
  const [communityError, setCommunityError] = useState('');
  const [communitySuccess, setCommunitySuccess] = useState(false);

  // GSAP Hero Entrance & Subtle Botanical Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const fadeInElements = heroRef.current?.querySelectorAll('.hero-fade-in');
      if (fadeInElements && fadeInElements.length > 0) {
        gsap.from(fadeInElements, {
          opacity: 0,
          y: 20,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'opacity,transform'
        });
      }

      const driftElements = heroRef.current?.querySelectorAll('.botanical-drift');
      if (driftElements && driftElements.length > 0) {
        gsap.to(driftElements, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEmail(communityEmail);
    if (!result.valid) {
      setCommunityError(result.message);
      return;
    }
    setCommunityError('');
    setCommunitySuccess(true);
    setCommunityEmail('');
  };

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Pure Care for Naturally Radiant Skin"
        description="Clean ingredients. Real results. A more confident you. Formulated with gentle active botanicals to nourish and illuminate your skin's natural resilience."
        canonicalPath="/"
      />

      {/* 1. Hero Section (Full-Width Edge-to-Edge with Blurred Theme Background Image & Exact Wording) */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]"
      >
        {/* Soft Theme-Matching Botanical Background Image (Blurred for optimal text contrast) */}
        <HeroImageBackground src="/assets/articles/healthy-skin-happy-you-self-care-tips.webp" />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/42 via-[#FFF8F9]/32 to-[#FDEEF3]/45 backdrop-blur-[1px]" />
        
        {/* Ambient botanical radial flourishes with drift animation */}
        <div className="botanical-drift absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#EFC6D8]/40 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#F6E0E6]/50 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column Text & Action */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              {/* Clean Kicker Badge (Mobile-optimized text & padding) */}
              <div className="hero-fade-in inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 border border-[#F3DDE6] text-[#6B4B6B] text-[10px] sm:text-xs font-semibold tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-[#6B4B6B] shrink-0" />
                <span className="truncate">Clean Beauty • Natural Ingredients • Skincare for Life</span>
              </div>

              <div className="hero-fade-in space-y-3">
                <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3E2F3F] leading-[1.18] tracking-tight">
                  Pure Care for Naturally <span className="italic font-normal text-[#6B4B6B]">Radiant Skin</span>
                </h1>
                <p className="text-xs sm:text-base text-[#3E2F3F]/85 max-w-xl font-normal leading-relaxed">
                  Clean ingredients. Real results. A more confident you. Formulated with gentle active botanicals to nourish and illuminate your skin's natural resilience.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="hero-fade-in pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg shadow-[#5D3A58]/25 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <span>Shop Bestsellers</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-[#FFF2F5] border border-[#EFC6D8] text-[#5D3A58] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-95"
                >
                  <span>Our Story</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="hero-fade-in pt-4 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs text-[#3E2F3F]/80 font-medium border-t border-[#F3DDE6]/90">
                <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-[#6B4B6B]" /> 100% Natural Ingredients</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#6B4B6B]" /> Dermatologist Approved</span>
                <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-[#6B4B6B]" /> Recyclable Glass</span>
              </div>
            </div>

            {/* Right Column Large Hero Visual (Enlarged prominent botanical portrait & serum) */}
            <div className="hero-fade-in lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl group">
                {/* Floating Botanical Badge with subtle botanical-drift */}
                <div className="botanical-drift absolute -top-3 -right-2 sm:-right-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#F3DDE6] shadow-lg z-20 pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 text-[#6B4B6B]" />
                  <span className="text-[11px] font-semibold text-[#5D3A58]">Active Botanicals</span>
                </div>

                {/* Glow ambient layer */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#EFC6D8]/50 via-[#F7D3E2]/40 to-transparent rounded-[36px] sm:rounded-[44px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                {/* Main Hero Visual Card */}
                <div className="relative rounded-[30px] sm:rounded-[38px] overflow-hidden border border-[#F3DDE6] shadow-2xl bg-white/90 backdrop-blur-xs">
                  <picture className="w-full h-auto block">
                    <source srcSet="/assets/aistudio/home-hero-model-portrait.webp" type="image/webp" />
                    <img
                      src="/assets/aistudio/home-hero-model-portrait.png"
                      alt="Luméa Radiant Skin Ritual & Face Serum"
                      width={1052}
                      height={724}
                      className="w-full h-auto max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  {/* Subtle bottom glass overlay banner */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-[#3E2F3F]/80 via-[#3E2F3F]/40 to-transparent backdrop-blur-[2px] flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#EFC6D8]">Award-Winning Nectar</span>
                      <p className="font-heading text-sm sm:text-base text-white">Radiant Face Serum</p>
                    </div>
                    <Link
                      to="/shop/radiant-face-serum"
                      className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-[#5D3A58] rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip (4 elevated interactive cards on theme background — background color is NOT white) */}
      <section className="bg-[#FFF7F7] border-b border-[#F6E0E6] py-10 sm:py-12">
        <div className="lumea-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            
            <div className="group p-6 rounded-[24px] bg-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#3E2F3F] tracking-wide group-hover:text-[#5D3A58] transition-colors">
                100% Natural Ingredients
              </h3>
              <p className="text-xs text-[#3E2F3F]/70 leading-relaxed">Pure cold-pressed active botanicals</p>
            </div>

            <div className="group p-6 rounded-[24px] bg-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#3E2F3F] tracking-wide group-hover:text-[#5D3A58] transition-colors">
                Dermatologist Approved
              </h3>
              <p className="text-xs text-[#3E2F3F]/70 leading-relaxed">Hypoallergenic & non-comedogenic</p>
            </div>

            <div className="group p-6 rounded-[24px] bg-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#3E2F3F] tracking-wide group-hover:text-[#5D3A58] transition-colors">
                Cruelty Free
              </h3>
              <p className="text-xs text-[#3E2F3F]/70 leading-relaxed">Ethically sourced, never animal tested</p>
            </div>

            <div className="group p-6 rounded-[24px] bg-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#3E2F3F] tracking-wide group-hover:text-[#5D3A58] transition-colors">
                Sustainable Packaging
              </h3>
              <p className="text-xs text-[#3E2F3F]/70 leading-relaxed">100% recyclable UV-protecting glass</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Bestsellers Section */}
      <section className="py-20 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F]">
                Bestsellers
              </h2>
              <p className="text-xs sm:text-sm text-[#3E2F3F]/70 mt-1">
                Most loved. For your natural glow.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#5D3A58]/25 hover:-translate-y-0.5 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Power of Nature Section (Styled like "Your skin deserves the best" Banner with rich botanical styling) */}
      <section className="py-14 sm:py-18 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#5D3A58] via-[#6B4B6B] to-[#4E2E4A] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-[#8C5E87]/30 transition-all duration-500">
            {/* Blurred Botanical Background Image */}
            <img
              src="/assets/aistudio/image_b6ba22aa.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center filter blur-[6px] opacity-20 scale-110 pointer-events-none"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D3A58]/95 via-[#6B4B6B]/85 to-[#4E2E4A]/95" />

            {/* Ambient decorative blurs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#EFC6D8]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-[#F6E0E6]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/25 text-[11px] font-semibold uppercase tracking-widest text-[#FDE8EF]">
                  <span>🌿 OUR PHILOSOPHY</span>
                </span>
                
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                  The Power of Nature
                </h2>
                
                <p className="text-xs sm:text-base text-[#FFF7F7]/90 leading-relaxed font-normal max-w-xl">
                  We believe in the purest ingredients, carefully selected from nature to bring out your skin's natural glow. Pure botanical formulas crafted with biocompatible active botanicals to nourish and illuminate your skin.
                </p>

                {/* Botanical Trust Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#FFF7F7]/90">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-[#EFC6D8]" /> Botanicals
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EFC6D8]" /> Vitamins
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#EFC6D8]" /> Antioxidants
                  </span>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#FFF2F5] text-[#5D3A58] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                  >
                    <span>Our Philosophy</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 backdrop-blur-xs active:scale-95"
                  >
                    <span>Explore Ingredients</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High-End Botanical Visual (Circular Nectar with Natural Elements) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-xs sm:max-w-sm rounded-[32px] overflow-hidden p-3 bg-white/10 backdrop-blur-md border border-white/25 shadow-2xl group">
                  <picture className="w-full h-auto block">
                    <source srcSet="/assets/aistudio/nature-circle-serum.webp" type="image/webp" />
                    <img
                      src="/assets/aistudio/nature-circle-serum.png"
                      alt="Luméa Pure Botanical Ingredients & Serum"
                      width={550}
                      height={550}
                      className="w-full h-auto aspect-square object-cover rounded-[24px] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-heading text-sm text-white">Cold-Pressed Herbal Actives</p>
                    <p className="text-[11px] text-[#EFC6D8]">100% Pure Organic Extracts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Statement & Community Newsletter Banner */}
      <section className="py-16 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="bg-gradient-to-r from-[#6B4B6B] to-[#583C58] rounded-[28px] p-8 sm:p-12 text-white shadow-xl hover:shadow-2xl hover:shadow-[#583C58]/30 transition-all duration-500 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Your skin deserves the best.
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF7F7]/80 max-w-md mx-auto leading-relaxed">
                Join our botanical community for clean beauty secrets, ritual inspiration, and early access to limited seasonal harvests.
              </p>

              {communitySuccess ? (
                <div className="p-4 bg-white/20 backdrop-blur-xs rounded-full inline-flex items-center gap-2 text-xs font-medium text-[#FFF7F7]">
                  <Check className="w-4 h-4 text-[#EFC6D8]" />
                  <span>Welcome to the Luméa Community! (Frontend demo: no email recorded)</span>
                </div>
              ) : (
                <form onSubmit={handleCommunitySubmit} noValidate className="max-w-md mx-auto pt-2 space-y-2">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 sm:relative sm:bg-white sm:rounded-full sm:p-1.5 sm:shadow-md">
                    <input
                      type="email"
                      value={communityEmail}
                      onChange={e => {
                        setCommunityEmail(e.target.value);
                        if (communityError) setCommunityError('');
                      }}
                      placeholder="Your email address"
                      aria-label="Email for community updates"
                      aria-invalid={!!communityError}
                      className="w-full px-5 py-3 sm:py-2.5 bg-white rounded-full text-xs text-[#3E2F3F] placeholder-[#C39DB8] focus:outline-none focus:ring-2 focus:ring-[#EFC6D8] sm:focus:ring-0 sm:pr-4 sm:flex-1 shadow-sm sm:shadow-none"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 sm:py-2.5 bg-[#3E2F3F] hover:bg-[#6B4B6B] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-md sm:shadow-none cursor-pointer"
                    >
                      Join Community
                    </button>
                  </div>
                  {communityError && (
                    <p className="text-xs text-red-200">{communityError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
