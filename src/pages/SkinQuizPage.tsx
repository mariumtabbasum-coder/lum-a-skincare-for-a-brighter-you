import { HeroVideoBackground } from '../components/common/HeroVideoBackground';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
  Droplet,
  Sun,
  Flame,
  Feather,
  Heart,
  Clock,
  Compass,
  ShoppingBag
} from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { PRODUCTS, Product } from '../data/products';
import { addToCart } from '../lib/cart-store';
import { showToast } from '../components/common/Toast';
import { ProductCard } from '../components/common/ProductCard';

interface QuizAnswers {
  skinType: string;
  concern: string;
  routineTime: string;
  texturePref: string;
  environment: string;
}

export const SkinQuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinType: '',
    concern: '',
    routineTime: '',
    texturePref: '',
    environment: ''
  });
  const [validationError, setValidationError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = 5;

  const handleSelectOption = (field: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && !answers.skinType) {
      setValidationError('Please select your skin type to continue.');
      return;
    }
    if (currentStep === 2 && !answers.concern) {
      setValidationError('Please select your primary skin concern to continue.');
      return;
    }
    if (currentStep === 3 && !answers.routineTime) {
      setValidationError('Please select your routine preference to continue.');
      return;
    }
    if (currentStep === 4 && !answers.texturePref) {
      setValidationError('Please choose your favorite texture finish.');
      return;
    }
    if (currentStep === 5 && !answers.environment) {
      setValidationError('Please select your primary daily environment.');
      return;
    }

    setValidationError('');

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#EFC6D8', '#6B4B6B', '#F6E0E6']
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setValidationError('');
    }
  };

  const handleRestart = () => {
    setAnswers({
      skinType: '',
      concern: '',
      routineTime: '',
      texturePref: '',
      environment: ''
    });
    setCurrentStep(1);
    setIsCompleted(false);
    setValidationError('');
  };

  // Deterministic routine recommendation generator
  const getRecommendedRoutine = (): {
    cleanse: Product;
    treat: Product;
    moisturize: Product;
    protect: Product;
  } => {
    // 1. Cleanser
    const cleanse =
      answers.skinType === 'Oily'
        ? (PRODUCTS.find(p => p.slug === 'exfoliating-scrub') || PRODUCTS.find(p => p.category === 'Cleanser') || PRODUCTS[0])
        : (PRODUCTS.find(p => p.slug === 'gentle-cleanser') || PRODUCTS.find(p => p.category === 'Cleanser') || PRODUCTS[0]);

    // 2. Treatment Serum
    let treat = PRODUCTS.find(p => p.slug === 'radiant-face-serum') || PRODUCTS[0];
    if (answers.concern === 'Anti-Aging') {
      treat = PRODUCTS.find(p => p.slug === 'bakuchiol-serum') || PRODUCTS.find(p => p.slug === 'retinol-serum') || treat;
    } else if (answers.concern === 'Brightening') {
      treat = PRODUCTS.find(p => p.slug === 'vitamin-c-serum') || treat;
    } else if (answers.concern === 'Acne') {
      treat = PRODUCTS.find(p => p.slug === 'hyaluronic-acid-serum') || PRODUCTS.find(p => p.slug === 'peptide-serum') || treat;
    }

    // 3. Moisturizer
    let moisturize = PRODUCTS.find(p => p.slug === 'hydrating-moisturizer') || PRODUCTS[0];
    if (answers.skinType === 'Dry' || answers.texturePref === 'Rich Nourishing') {
      moisturize = PRODUCTS.find(p => p.slug === 'night-repair-cream' || p.slug === 'collagen-cream') || moisturize;
    } else if (answers.skinType === 'Oily' || answers.skinType === 'Sensitive') {
      moisturize = PRODUCTS.find(p => p.slug === 'calming-gel' || p.slug === 'daily-moisturizer') || moisturize;
    }

    // 4. Sunscreen Protection
    const protect = PRODUCTS.find(p => p.slug === 'sunscreen-spf-50') || PRODUCTS.find(p => p.category === 'Sunscreen') || PRODUCTS[0];

    return { cleanse, treat, moisturize, protect };
  };

  const routine = getRecommendedRoutine();

  const handleAddFullRoutine = () => {
    addToCart(routine.cleanse.id, 1);
    addToCart(routine.treat.id, 1);
    addToCart(routine.moisturize.id, 1);
    addToCart(routine.protect.id, 1);
    showToast({
      type: 'cart',
      title: 'Personalized Routine Added',
      description: 'All 4 curated botanical steps added to your bag.'
    });
  };

  return (
    <div className="overflow-hidden">
      <SEOHead
        title="Skincare Quiz — Discover Your Perfect Routine"
        description="Take our quick 5-step quiz and get a personalized, botanical skincare ritual tailored precisely for your skin."
        canonicalPath="/skin-quiz"
      />

      {/* Hero Header (Full-Width Edge-to-Edge with Blurred Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Botanical Background Image (Blurred for optimal contrast) */}
        <HeroVideoBackground src="https://videos.pexels.com/video-files/9698203/9698203-hd_1920_1080_25fps.mp4" />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/48 via-[#FFF8F9]/38 to-[#FDEEF3]/50 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#F7D3E2]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#EFC6D8]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58] shrink-0" />
            <span className="truncate">Personalized Skin Ritual</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#3E2F3F] tracking-tight leading-[1.18]">
            Discover Your Perfect Skincare Routine
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#3E2F3F]/85 leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Take our quick 5-step quiz and get a personalized, botanical skincare ritual tailored precisely for your skin.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-[#6B4B6B]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌿 100% Tailored Routine
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ⏱️ Takes Under 2 Minutes
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ✨ Formulated by Dermatologists
            </span>
          </div>
        </div>
      </section>

      {/* Quiz Interaction Body */}
      <section className="py-16 bg-[#FFF7F7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!isCompleted ? (
            /* Quiz Active Card */
            <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#F6E0E6] p-4 sm:p-8 md:p-10 shadow-sm space-y-6 sm:space-y-8">
              
              {/* Progress Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6B4B6B] font-semibold">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#F6E0E6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6B4B6B] transition-all duration-300 rounded-full"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* STEP 1: Skin Type */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      What is your skin type?
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      Select how your bare skin feels a few hours after washing.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { type: 'Normal', label: 'Balanced & healthy', icon: Feather },
                      { type: 'Dry', label: 'Feels tight & dry', icon: Droplet },
                      { type: 'Oily', label: 'Shiny easily', icon: Flame },
                      { type: 'Combination', label: 'T-zone shine, dry cheeks', icon: Sparkles },
                      { type: 'Sensitive', label: 'Prone to redness', icon: Heart }
                    ].map(item => {
                      const Icon = item.icon;
                      const selected = answers.skinType === item.type;
                      return (
                        <button
                          key={item.type}
                          onClick={() => handleSelectOption('skinType', item.type)}
                          aria-pressed={selected}
                          className={`group p-4 rounded-[20px] border text-center flex flex-col items-center justify-center space-y-2.5 transition-all duration-300 cursor-pointer ${
                            selected
                              ? 'bg-[#FDF6F8] border-[#6B4B6B] shadow-md ring-2 ring-[#6B4B6B]/40 -translate-y-1'
                              : 'bg-white border-[#F6E0E6] hover:border-[#6B4B6B]/50 hover:bg-[#FDF6F8] hover:shadow-lg hover:shadow-[#6B4B6B]/15 hover:-translate-y-1.5'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selected ? 'bg-[#6B4B6B] text-white shadow-xs' : 'bg-[#F6E0E6] text-[#6B4B6B] group-hover:scale-110 group-hover:bg-[#6B4B6B] group-hover:text-white'}`}>
                            <Icon className="w-5 h-5 transition-transform" />
                          </div>
                          <div>
                            <p className={`text-xs font-semibold transition-colors ${selected ? 'text-[#6B4B6B]' : 'text-[#3E2F3F] group-hover:text-[#6B4B6B]'}`}>{item.type}</p>
                            <p className="text-[10px] text-[#C39DB8] leading-tight mt-0.5">{item.label}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Concern */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      What is your primary skin concern?
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      Choose the primary goal you would like your daily routine to target.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { concern: 'Hydration', label: 'Dullness & moisture barrier replenishment' },
                      { concern: 'Brightening', label: 'Hyperpigmentation & uneven skin tone' },
                      { concern: 'Anti-Aging', label: 'Fine lines, elasticity & firmness' },
                      { concern: 'Acne', label: 'Blemishes, blackheads & congestion' },
                      { concern: 'Soothing', label: 'Redness, flare-ups & reactivity' }
                    ].map(item => {
                      const selected = answers.concern === item.concern;
                      return (
                        <button
                          key={item.concern}
                          onClick={() => handleSelectOption('concern', item.concern)}
                          aria-pressed={selected}
                          className={`group p-4 rounded-[20px] border text-left space-y-1.5 transition-all duration-300 cursor-pointer ${
                            selected
                              ? 'bg-[#FDF6F8] border-[#6B4B6B] ring-2 ring-[#6B4B6B]/40 shadow-sm -translate-y-0.5'
                              : 'bg-white border-[#F6E0E6] hover:border-[#6B4B6B]/50 hover:bg-[#FDF6F8] hover:shadow-md hover:shadow-[#6B4B6B]/10 hover:-translate-y-1'
                          }`}
                        >
                          <p className={`text-xs font-semibold transition-colors ${selected ? 'text-[#6B4B6B]' : 'text-[#3E2F3F] group-hover:text-[#6B4B6B]'}`}>{item.concern}</p>
                          <p className="text-[11px] text-[#C39DB8]">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Routine Complexity */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      How much time do you prefer to spend on skincare?
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      We craft routines that naturally fit your lifestyle.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { time: 'Minimal', label: '2-3 quick essentials in under 3 minutes' },
                      { time: 'Balanced', label: '4 thoughtful steps (Cleanse, Treat, Moisturize, Protect)' },
                      { time: 'Ritual', label: 'A mindful multi-step pampering sensory self-care ritual' }
                    ].map(item => {
                      const selected = answers.routineTime === item.time;
                      return (
                        <button
                          key={item.time}
                          onClick={() => handleSelectOption('routineTime', item.time)}
                          aria-pressed={selected}
                          className={`group p-5 rounded-[20px] border text-left space-y-2 transition-all duration-300 cursor-pointer ${
                            selected
                              ? 'bg-[#FDF6F8] border-[#6B4B6B] ring-2 ring-[#6B4B6B]/40 shadow-sm -translate-y-0.5'
                              : 'bg-white border-[#F6E0E6] hover:border-[#6B4B6B]/50 hover:bg-[#FDF6F8] hover:shadow-md hover:shadow-[#6B4B6B]/10 hover:-translate-y-1'
                          }`}
                        >
                          <Clock className={`w-5 h-5 transition-transform group-hover:scale-110 ${selected ? 'text-[#6B4B6B]' : 'text-[#C39DB8] group-hover:text-[#6B4B6B]'}`} />
                          <p className={`text-xs font-semibold transition-colors ${selected ? 'text-[#6B4B6B]' : 'text-[#3E2F3F] group-hover:text-[#6B4B6B]'}`}>{item.time}</p>
                          <p className="text-[11px] text-[#3E2F3F]/70">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Texture Preference */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      What texture do you love most on your skin?
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      Texture determines the sensorial comfort of your daily application.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { pref: 'Lightweight Dewy', label: 'Fast-absorbing water essences with subtle glow' },
                      { pref: 'Velvet Matte', label: 'Silky, shine-free finish that controls excess sebum' },
                      { pref: 'Rich Nourishing', label: 'Deeply comforting cushion balms that blanket dry barriers' }
                    ].map(item => {
                      const selected = answers.texturePref === item.pref;
                      return (
                        <button
                          key={item.pref}
                          onClick={() => handleSelectOption('texturePref', item.pref)}
                          aria-pressed={selected}
                          className={`group p-5 rounded-[20px] border text-left space-y-2 transition-all duration-300 cursor-pointer ${
                            selected
                              ? 'bg-[#FDF6F8] border-[#6B4B6B] ring-2 ring-[#6B4B6B]/40 shadow-sm -translate-y-0.5'
                              : 'bg-white border-[#F6E0E6] hover:border-[#6B4B6B]/50 hover:bg-[#FDF6F8] hover:shadow-md hover:shadow-[#6B4B6B]/10 hover:-translate-y-1'
                          }`}
                        >
                          <p className={`text-xs font-semibold transition-colors ${selected ? 'text-[#6B4B6B]' : 'text-[#3E2F3F] group-hover:text-[#6B4B6B]'}`}>{item.pref}</p>
                          <p className="text-[11px] text-[#3E2F3F]/70">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Environment */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center sm:text-left">
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      What is your daily environment like?
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      Environmental exposure influences barrier dehydration and UV requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { env: 'Urban Indoor', label: 'Offices, air conditioning, digital screens & daily city commute' },
                      { env: 'Sunny Outdoor', label: 'Frequent direct sunlight, sports & fresh air exposure' },
                      { env: 'Dry / Changing Climates', label: 'Shifting seasons, low humidity & winter heating' }
                    ].map(item => {
                      const selected = answers.environment === item.env;
                      return (
                        <button
                          key={item.env}
                          onClick={() => handleSelectOption('environment', item.env)}
                          aria-pressed={selected}
                          className={`group p-5 rounded-[20px] border text-left space-y-2 transition-all duration-300 cursor-pointer ${
                            selected
                              ? 'bg-[#FDF6F8] border-[#6B4B6B] ring-2 ring-[#6B4B6B]/40 shadow-sm -translate-y-0.5'
                              : 'bg-white border-[#F6E0E6] hover:border-[#6B4B6B]/50 hover:bg-[#FDF6F8] hover:shadow-md hover:shadow-[#6B4B6B]/10 hover:-translate-y-1'
                          }`}
                        >
                          <Compass className={`w-5 h-5 transition-transform group-hover:scale-110 ${selected ? 'text-[#6B4B6B]' : 'text-[#C39DB8] group-hover:text-[#6B4B6B]'}`} />
                          <p className={`text-xs font-semibold transition-colors ${selected ? 'text-[#6B4B6B]' : 'text-[#3E2F3F] group-hover:text-[#6B4B6B]'}`}>{item.env}</p>
                          <p className="text-[11px] text-[#3E2F3F]/70">{item.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Validation Warning Notice */}
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-[14px] text-xs text-red-600 flex items-center gap-2" role="alert">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F6E0E6] gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
                    currentStep === 1
                      ? 'text-[#C39DB8] opacity-40 cursor-not-allowed'
                      : 'text-[#3E2F3F] hover:bg-[#F6E0E6]'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3 bg-[#6B4B6B] hover:bg-[#503350] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#6B4B6B]/30 hover:scale-[1.02] active:scale-98 group cursor-pointer shrink-0"
                >
                  <span>{currentStep === totalSteps ? 'See Results' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ) : (
            /* Quiz Results Screen */
            <div className="space-y-10 animate-in zoom-in-95 duration-300">
              
              <div className="bg-white rounded-[28px] border border-[#EFC6D8] p-8 sm:p-12 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F6E0E6] text-[#6B4B6B] rounded-full text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Formulation
                </span>

                <h2 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F]">
                  Your Personalized Ritual
                </h2>

                <p className="text-xs sm:text-sm text-[#3E2F3F]/80 max-w-lg mx-auto leading-relaxed">
                  Based on your <strong className="text-[#6B4B6B]">{answers.skinType}</strong> profile and focus on <strong className="text-[#6B4B6B]">{answers.concern}</strong>, here is your harmonious 4-step daily routine.
                </p>

                {/* Honest Cosmetic Guidance Disclaimer */}
                <div className="p-3 bg-[#FFF7F7] border border-[#F6E0E6] rounded-[16px] text-[11px] text-[#6B4B6B] max-w-md mx-auto">
                  <em>Notice: Skincare recommendations provide cosmetic routine guidance and do not replace professional dermatological diagnosis.</em>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleAddFullRoutine}
                    className="px-8 py-3.5 bg-[#6B4B6B] hover:bg-[#503350] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#6B4B6B]/30 hover:scale-[1.02] active:scale-98 flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Entire 4-Step Routine</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="px-6 py-3.5 bg-white hover:bg-[#F6E0E6] text-[#3E2F3F] border border-[#EFC6D8] hover:border-[#6B4B6B]/50 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>

              {/* 4 Curated Steps Grid */}
              <div className="space-y-6">
                <h3 className="font-heading text-2xl text-[#3E2F3F] text-center">
                  The 4 Pillars of Your Glow
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4B6B] block mb-2 text-center">
                      Step 1: Cleanse
                    </span>
                    <ProductCard product={routine.cleanse} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4B6B] block mb-2 text-center">
                      Step 2: Treat
                    </span>
                    <ProductCard product={routine.treat} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4B6B] block mb-2 text-center">
                      Step 3: Moisturize
                    </span>
                    <ProductCard product={routine.moisturize} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B4B6B] block mb-2 text-center">
                      Step 4: Protect
                    </span>
                    <ProductCard product={routine.protect} />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Bottom 3 Features Strip (Personalized Recommendations, Expert Advice, Better Results) */}
      {/* Bottom 3 Recommendation Cards Strip (Independent Cards with Hover Effects) */}
      <section className="bg-[#FFF7F7] border-t border-[#F6E0E6] py-14">
        <div className="lumea-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Card 1: Personalized Recommendations */}
            <div
              tabIndex={0}
              className="group p-7 rounded-[24px] bg-gradient-to-b from-[#FFFDFE] to-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center text-center space-y-3 cursor-default"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-base text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors font-semibold">
                Personalized Recommendations
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs mx-auto">
                Formulas selected based on your skin type, oil balance, and primary skin goals.
              </p>
            </div>

            {/* Card 2: Gentle Formulation Wisdom */}
            <div
              tabIndex={0}
              className="group p-7 rounded-[24px] bg-gradient-to-b from-[#FFFDFE] to-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center text-center space-y-3 cursor-default"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Heart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-base text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors font-semibold">
                Gentle Formulation Wisdom
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs mx-auto">
                Rooted in botanical science and barrier-kind formulation principles.
              </p>
            </div>

            {/* Card 3: Better Results */}
            <div
              tabIndex={0}
              className="group p-7 rounded-[24px] bg-gradient-to-b from-[#FFFDFE] to-white border border-[#F3DDE6] hover:border-[#6B4B6B]/40 hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center text-center space-y-3 cursor-default"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <CheckCircle2 className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-base text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors font-semibold">
                Better Results
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs mx-auto">
                Consistent daily care nurtures a calmer, smoother, more radiant complexion over time.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
