import { HeroVideoBackground } from '../components/common/HeroVideoBackground';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Users, Sparkles } from 'lucide-react';
import { SEOHead } from '../lib/seo';

export const AboutPage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#FFF7F7]">
      <SEOHead
        title="More Than Skincare, It's a Philosophy"
        description="We believe in real beauty, honest care, and the power of nature. Discover Luméa's journey and botanical values."
        canonicalPath="/about"
      />

      {/* 1. Hero Section (Full-Width Edge-to-Edge with Blurred Theme Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Theme-Matching Botanical Background Image (Blurred for optimal contrast) */}
        <HeroVideoBackground />
        {/* Luméa Signature Pastel Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/95 via-[#FFF8F9]/88 to-[#FDEEF3]/95 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#EFC6D8]/40 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-tl from-[#F6E0E6]/50 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58]" />
            <span>Our Philosophy</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl text-[#3E2F3F] leading-tight tracking-tight">
            More Than Skincare, <span className="italic font-normal text-[#6B4B6B]">It's a Philosophy</span>
          </h1>

          <p className="text-xs sm:text-base text-[#3E2F3F]/85 leading-relaxed max-w-xl mx-auto font-normal">
            We believe in real beauty, honest care, and the power of nature. Discover Luméa's journey and botanical values.
          </p>

          <div className="pt-2">
            <a
              href="#journey"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#5D3A58] hover:bg-[#43263E] text-white rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-[#5D3A58]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Our Journey Section (Responsive Interactive Timeline with Exact Milestone Text) */}
      <section id="journey" className="py-12 sm:py-16 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9E6B89]">
              Evolution
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F] mt-1">
              Our Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#3E2F3F]/70 mt-1.5">
              From small-batch botanical infusions to a conscious global community.
            </p>
          </div>

          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#F3DDE6] shadow-sm bg-white p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Milestone 2018 */}
              <div className="relative p-6 rounded-[22px] bg-gradient-to-b from-[#FFF9FB] to-white border border-[#F3DDE6] space-y-3 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6E0E6] text-[#5D3A58] text-xs font-bold tracking-wider">
                  <span>2018</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl text-[#3E2F3F]">The First Step</h3>
                <p className="text-xs sm:text-sm text-[#3E2F3F]/75 leading-relaxed">
                  Small-batch botanical infusions formulated with a simple promise: pure cold-pressed active botanicals, zero fillers, and genuine biocompatibility.
                </p>
              </div>

              {/* Milestone 2020 */}
              <div className="relative p-6 rounded-[22px] bg-gradient-to-b from-[#FFF9FB] to-white border border-[#F3DDE6] space-y-3 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6E0E6] text-[#5D3A58] text-xs font-bold tracking-wider">
                  <span>2020</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl text-[#3E2F3F]">A Community Grows</h3>
                <p className="text-xs sm:text-sm text-[#3E2F3F]/75 leading-relaxed">
                  Conscious skincare rituals touched thousands of glowing faces worldwide. Our botanical research expanded into dermatologist-certified daily serums.
                </p>
              </div>

              {/* Milestone 2023 */}
              <div className="relative p-6 rounded-[22px] bg-gradient-to-b from-[#FFF9FB] to-white border border-[#F3DDE6] space-y-3 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6E0E6] text-[#5D3A58] text-xs font-bold tracking-wider">
                  <span>2023</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl text-[#3E2F3F]">Expanding Our Promise</h3>
                <p className="text-xs sm:text-sm text-[#3E2F3F]/75 leading-relaxed">
                  Introduced 100% recyclable UV-protecting glass and eco-certified packaging while maintaining our uncompromising pledge to cruelty-free formulations.
                </p>
              </div>
            </div>

            {/* Bottom Brand Motto Banner */}
            <div className="mt-8 pt-6 border-t border-[#F6E0E6] text-center">
              <span className="font-heading text-xl sm:text-2xl text-[#6B4B6B] tracking-wide">
                Real skin. Real people. Real care.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values (4 Interactive Rounded Cards with Rich Hover States) */}
      <section className="py-14 sm:py-18 bg-white border-y border-[#F6E0E6]">
        <div className="lumea-container">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9E6B89]">
              Principles
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F] mt-1">
              Our Values
            </h2>
            <p className="text-xs sm:text-sm text-[#3E2F3F]/70 mt-1.5">
              Every formula is guided by our four core pillars of integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="group p-8 bg-gradient-to-b from-[#FFFDFE] to-white rounded-[24px] border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/15 hover:-translate-y-2.5 transition-all duration-300 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center mx-auto transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Clean Ingredients
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
                Zero parabens, sulfates, synthetic dyes, or harsh denatured alcohols. Pure and bio-compatible.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-b from-[#FFFDFE] to-white rounded-[24px] border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/15 hover:-translate-y-2.5 transition-all duration-300 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center mx-auto transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Sustainability
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
                100% recyclable glass bottles, FSC-certified cardboard boxes, and post-consumer recycled pump caps.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-b from-[#FFFDFE] to-white rounded-[24px] border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/15 hover:-translate-y-2.5 transition-all duration-300 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center mx-auto transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Inclusivity
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
                Formulated to nourish every Fitzpatrick skin type, age, and lifestyle with gentle universal respect.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-b from-[#FFFDFE] to-white rounded-[24px] border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/15 hover:-translate-y-2.5 transition-all duration-300 text-center space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center mx-auto transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Transparency
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
                Clear ingredient percentages, transparent origins, and absolutely no hidden fragrance cocktails.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. "Kind to your skin. Kind to the planet." Banner (Centered Boxed Card like Home Section Reference) */}
      <section id="impact" className="py-14 sm:py-18 bg-[#FFF7F7]">
        <div className="lumea-container">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#5D3A58] via-[#4E2E4A] to-[#43263E] p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#8C5E87]/30">
            {/* Soft Botanical Background Image (Blurred for optimal contrast) */}
            <img
              src="/assets/aistudio/about_kind_to_skin_new.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center filter blur-[4px] opacity-20 scale-105 select-none pointer-events-none"
            />
            {/* Deep Plum Luxury Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5D3A58]/95 via-[#4E2E4A]/92 to-[#43263E]/95 backdrop-blur-[1px]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#EFC6D8]">
                Sustainable Beauty
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                Kind to your skin. <span className="italic font-normal text-[#EFC6D8]">Kind to the planet.</span>
              </h2>
              <p className="text-xs sm:text-base text-white/90 leading-relaxed max-w-lg mx-auto font-normal">
                Pure ingredients. Healthier skin. A kinder tomorrow.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#FFF2F5] text-[#5D3A58] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <span>Our Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
