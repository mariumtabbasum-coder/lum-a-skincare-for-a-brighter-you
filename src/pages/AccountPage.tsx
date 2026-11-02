import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Heart, Package, Sparkles, CheckCircle2, ArrowRight, Tag, X } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { JQueryPasswordToggle } from '../components/common/jQueryPasswordToggle';
import { getWishlist } from '../lib/wishlist-store';
import { Product } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { showToast } from '../components/common/Toast';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordMatch
} from '../lib/validation';

export const AccountPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'wishlist' | 'orders'>(
    (searchParams.get('tab') as any) || 'login'
  );

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [loginTouched, setLoginTouched] = useState<Record<string, boolean>>({});
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupTouched, setSignupTouched] = useState<Record<string, boolean>>({});
  const [signupSuccessMessage, setSignupSuccessMessage] = useState('');

  const [socialNotice, setSocialNotice] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [specialOffersModalOpen, setSpecialOffersModalOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Product[]>(getWishlist());

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'wishlist' || tab === 'orders' || tab === 'signup' || tab === 'login') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  useEffect(() => {
    setWishlistItems(getWishlist());
  }, [activeTab]);

  // Sign In Field Validation
  const validateLoginField = (name: 'email' | 'password', val: string): string => {
    if (name === 'email') {
      const res = validateEmail(val);
      return res.valid ? '' : res.message;
    }
    if (name === 'password') {
      const res = validatePassword(val);
      return res.valid ? '' : res.message;
    }
    return '';
  };

  const handleLoginBlur = (field: 'email' | 'password') => {
    setLoginTouched(prev => ({ ...prev, [field]: true }));
    const val = field === 'email' ? loginEmail : loginPassword;
    const msg = validateLoginField(field, val);
    setLoginErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleLoginChange = (field: 'email' | 'password', val: string) => {
    if (field === 'email') setLoginEmail(val);
    else setLoginPassword(val);

    if (loginTouched[field] || loginErrors[field]) {
      const msg = validateLoginField(field, val);
      setLoginErrors(prev => ({ ...prev, [field]: msg }));
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginTouched({ email: true, password: true });

    const emailErr = validateLoginField('email', loginEmail);
    const passErr = validateLoginField('password', loginPassword);

    const errors: Record<string, string> = {};
    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      if (errors.email) {
        document.getElementById('login-email')?.focus();
      } else if (errors.password) {
        document.getElementById('login-password')?.focus();
      }
      return;
    }

    setLoginErrors({});
    setLoginTouched({});
    setLoginEmail('');
    setLoginPassword('');
    setLoginSuccessMessage('Sign In Successful! Welcome back to Luméa.');
    showToast({
      type: 'success',
      title: 'Sign In Successful',
      description: 'Welcome back to your Luméa account!'
    });
  };

  // Sign Up Field Validation
  const validateSignupField = (name: 'name' | 'email' | 'password' | 'confirm', val: string): string => {
    switch (name) {
      case 'name': {
        const res = validateName(val);
        return res.valid ? '' : res.message;
      }
      case 'email': {
        const res = validateEmail(val);
        return res.valid ? '' : res.message;
      }
      case 'password': {
        const res = validatePassword(val);
        return res.valid ? '' : res.message;
      }
      case 'confirm': {
        const res = validatePasswordMatch(signupPassword, val);
        return res.valid ? '' : res.message;
      }
      default:
        return '';
    }
  };

  const handleSignupBlur = (field: 'name' | 'email' | 'password' | 'confirm') => {
    setSignupTouched(prev => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'name') val = signupName;
    else if (field === 'email') val = signupEmail;
    else if (field === 'password') val = signupPassword;
    else if (field === 'confirm') val = signupConfirm;

    const msg = validateSignupField(field, val);
    setSignupErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleSignupChange = (field: 'name' | 'email' | 'password' | 'confirm', val: string) => {
    if (field === 'name') setSignupName(val);
    else if (field === 'email') setSignupEmail(val);
    else if (field === 'password') setSignupPassword(val);
    else if (field === 'confirm') setSignupConfirm(val);

    if (signupTouched[field] || signupErrors[field]) {
      const msg = validateSignupField(field, val);
      setSignupErrors(prev => ({ ...prev, [field]: msg }));
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupTouched({ name: true, email: true, password: true, confirm: true });

    const errors: Record<string, string> = {};
    const nameErr = validateSignupField('name', signupName);
    const emailErr = validateSignupField('email', signupEmail);
    const passErr = validateSignupField('password', signupPassword);
    const confirmErr = validateSignupField('confirm', signupConfirm);

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (passErr) errors.password = passErr;
    if (confirmErr) errors.confirm = confirmErr;

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      const firstKey = Object.keys(errors)[0];
      document.getElementById(`signup-${firstKey}`)?.focus();
      return;
    }

    setSignupErrors({});
    setSignupTouched({});
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirm('');
    setSignupSuccessMessage('Account Created Successfully! Welcome to Luméa.');
    showToast({
      type: 'success',
      title: 'Account Created',
      description: 'Your Luméa account has been registered successfully!'
    });
  };

  // Provider button handler (clearly non-operational with honest accessible notification)
  const handleSocialProviderClick = (provider: 'Google' | 'Apple') => {
    const msg = `${provider} Sign-In is not currently configured for this storefront demonstration.`;
    setSocialNotice(msg);
    showToast({
      type: 'info',
      title: `${provider} Sign-In Not Configured`,
      description: 'Third-party social authentication is not connected in this demonstration store.'
    });
  };

  return (
    <div className="overflow-hidden bg-[#FFF7F7]">
      <SEOHead
        title="Account & Member Sign In"
        description="Log in to your Luméa account for personalized rituals, saved wishlists, and order tracking."
        canonicalPath="/account"
        noIndex
      />

      {/* Account Hero Header (Full-Width Edge-to-Edge with Blurred Background Image & Exact Wording) */}
      <section className="relative w-full overflow-hidden border-b border-[#F3DDE6] bg-[#FFF7F7]">
        {/* Soft Botanical Background Image (Blurred for optimal contrast) */}
        <img
          src="/assets/aistudio/image_02a75a6f.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center filter blur-[5px] opacity-25 scale-105 select-none pointer-events-none"
        />
        {/* Luméa Signature Rose-Plum Gradient Overlay for crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8]/95 via-[#FFF8F9]/88 to-[#FDEEF3]/95 backdrop-blur-[1px]" />

        {/* Ambient botanical radial flourishes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#F7D3E2]/40 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#EFC6D8]/30 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-center space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EFC6D8] text-[10px] sm:text-xs font-semibold text-[#6B4B6B] tracking-normal sm:tracking-wider uppercase shadow-2xs max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D3A58] shrink-0" />
            <span className="truncate">Your Skincare Journey, Your Way</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#3E2F3F] tracking-tight leading-[1.18]">
            Account & Member Space
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#3E2F3F]/85 leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Sign in or create an account to get personalised recommendations, exclusive offers, saved wishlists, and order tracking.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium text-[#6B4B6B]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              🌸 Member-Only Botanical Perks
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              📦 Real-Time Order Tracking
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 border border-[#F3DDE6] shadow-2xs">
              ✨ Saved Routines & Wishlist
            </span>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#FFF7F7]">
        <div className="lumea-container">
          
          {/* Main Account Tabs (2x2 grid on mobile with NO scrollbar, inline on sm+) */}
          <div className="grid grid-cols-2 sm:flex sm:items-center border-b border-[#F6E0E6] mb-8 gap-2 sm:gap-6 pb-2 sm:pb-0">
            <button
              onClick={() => {
                setActiveTab('login');
                setSearchParams({ tab: 'login' });
                setSocialNotice('');
              }}
              className={`py-2.5 sm:pb-3 px-3 sm:px-1 rounded-xl sm:rounded-none text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                activeTab === 'login'
                  ? 'bg-[#F6E0E6] sm:bg-transparent text-[#6B4B6B] sm:border-b-2 sm:border-[#6B4B6B]'
                  : 'bg-white/80 sm:bg-transparent text-[#3E2F3F]/70 hover:text-[#3E2F3F]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setSearchParams({ tab: 'signup' });
                setSocialNotice('');
              }}
              className={`py-2.5 sm:pb-3 px-3 sm:px-1 rounded-xl sm:rounded-none text-xs font-semibold uppercase tracking-wider transition-all text-center ${
                activeTab === 'signup'
                  ? 'bg-[#F6E0E6] sm:bg-transparent text-[#6B4B6B] sm:border-b-2 sm:border-[#6B4B6B]'
                  : 'bg-white/80 sm:bg-transparent text-[#3E2F3F]/70 hover:text-[#3E2F3F]'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => {
                setActiveTab('wishlist');
                setSearchParams({ tab: 'wishlist' });
                setSocialNotice('');
              }}
              className={`py-2.5 sm:pb-3 px-3 sm:px-1 rounded-xl sm:rounded-none text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'wishlist'
                  ? 'bg-[#F6E0E6] sm:bg-transparent text-[#6B4B6B] sm:border-b-2 sm:border-[#6B4B6B]'
                  : 'bg-white/80 sm:bg-transparent text-[#3E2F3F]/70 hover:text-[#3E2F3F]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist ({wishlistItems.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('orders');
                setSearchParams({ tab: 'orders' });
                setSocialNotice('');
              }}
              className={`py-2.5 sm:pb-3 px-3 sm:px-1 rounded-xl sm:rounded-none text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-[#F6E0E6] sm:bg-transparent text-[#6B4B6B] sm:border-b-2 sm:border-[#6B4B6B]'
                  : 'bg-white/80 sm:bg-transparent text-[#3E2F3F]/70 hover:text-[#3E2F3F]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Orders</span>
            </button>
          </div>

          {/* VIEW: LOGIN & SIGNUP (Split Screen from Approved Design) */}
          {(activeTab === 'login' || activeTab === 'signup') && (
            <div className="bg-white rounded-[28px] border border-[#F6E0E6] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column Form */}
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div>
                  <h2 className="font-heading text-3xl text-[#3E2F3F]">
                    {activeTab === 'login' ? 'Welcome Back' : 'Join Luméa'}
                  </h2>
                  <p className="text-xs text-[#3E2F3F]/70 mt-1">
                    {activeTab === 'login'
                      ? 'Log in to your account for a better skincare experience.'
                      : 'Create a demo profile to experience curated skincare rituals.'}
                  </p>
                </div>

                {activeTab === 'login' ? (
                  /* Login Form with Exact Contact Form Validation Styling */
                  <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
                    {loginSuccessMessage && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[18px] text-xs text-emerald-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2.5 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{loginSuccessMessage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setLoginSuccessMessage('')}
                          className="text-emerald-700 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-100/60"
                          aria-label="Dismiss message"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div>
                      <label htmlFor="login-email" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Email Address *
                      </label>
                      <input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={e => handleLoginChange('email', e.target.value)}
                        onBlur={() => handleLoginBlur('email')}
                        placeholder="you@example.com"
                        aria-invalid={!!loginErrors.email}
                        aria-describedby={loginErrors.email ? 'login-email-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          loginErrors.email
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {loginErrors.email && (
                        <p id="login-email-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {loginErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="login-password" className="block text-xs font-semibold text-[#3E2F3F]">
                          Password *
                        </label>
                        <button
                          type="button"
                          onClick={() => setForgotModalOpen(true)}
                          className="text-[11px] text-[#6B4B6B] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <JQueryPasswordToggle
                        id="login-password"
                        name="password"
                        value={loginPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginChange('password', e.target.value)}
                        onBlur={() => handleLoginBlur('password')}
                        hasError={!!loginErrors.password}
                        aria-describedby={loginErrors.password ? 'login-password-error' : undefined}
                      />
                      {loginErrors.password && (
                        <p id="login-password-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#5D3A58] hover:bg-[#4A2D46] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        Login
                      </button>
                    </div>

                    {/* Social Login Provider Section */}
                    <div className="pt-4 text-center space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-[#F6E0E6]" />
                        <span className="text-[11px] text-[#C39DB8]">or continue with</span>
                        <div className="flex-1 h-px bg-[#F6E0E6]" />
                      </div>

                      {/* Professional "Continue with Google" and "Continue with Apple" Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleSocialProviderClick('Google')}
                          aria-label="Continue with Google"
                          className="px-4 py-2.5 border border-[#EFC6D8] bg-white hover:bg-[#F6E0E6]/50 rounded-full text-xs font-medium text-[#3E2F3F] transition-all duration-200 shadow-2xs hover:shadow-xs hover:border-[#6B4B6B]/40 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Continue with Google</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSocialProviderClick('Apple')}
                          aria-label="Continue with Apple"
                          className="px-4 py-2.5 border border-[#EFC6D8] bg-white hover:bg-[#F6E0E6]/50 rounded-full text-xs font-medium text-[#3E2F3F] transition-all duration-200 shadow-2xs hover:shadow-xs hover:border-[#6B4B6B]/40 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0 fill-[#3E2F3F]" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.93-.93.04-2.09.63-2.75 1.41-.58.68-1.09 1.77-.95 2.83 1.04.08 2.12-.55 2.76-1.31z" />
                          </svg>
                          <span>Continue with Apple</span>
                        </button>
                      </div>

                      {/* Accessible Notification regarding provider configuration */}
                      {socialNotice && (
                        <p role="status" aria-live="polite" className="text-[11px] text-[#6B4B6B] bg-[#FDF6F8] p-2.5 rounded-[12px] border border-[#F6E0E6] animate-in fade-in">
                          {socialNotice}
                        </p>
                      )}

                      <p className="text-xs text-[#3E2F3F]/70 pt-2">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('signup');
                            setSocialNotice('');
                          }}
                          className="text-[#6B4B6B] font-semibold hover:underline cursor-pointer"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Signup Form with Exact Contact Form Validation Styling */
                  <form onSubmit={handleSignupSubmit} noValidate className="space-y-4">
                    {signupSuccessMessage && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[18px] text-xs text-emerald-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2.5 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{signupSuccessMessage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSignupSuccessMessage('')}
                          className="text-emerald-700 hover:text-emerald-900 p-1 rounded-full hover:bg-emerald-100/60"
                          aria-label="Dismiss message"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div>
                      <label htmlFor="signup-name" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Full Name *
                      </label>
                      <input
                        id="signup-name"
                        type="text"
                        value={signupName}
                        onChange={e => handleSignupChange('name', e.target.value)}
                        onBlur={() => handleSignupBlur('name')}
                        placeholder="e.g. Maria Dupont"
                        aria-invalid={!!signupErrors.name}
                        aria-describedby={signupErrors.name ? 'signup-name-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          signupErrors.name
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {signupErrors.name && (
                        <p id="signup-name-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {signupErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="signup-email" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Email Address *
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={e => handleSignupChange('email', e.target.value)}
                        onBlur={() => handleSignupBlur('email')}
                        placeholder="you@example.com"
                        aria-invalid={!!signupErrors.email}
                        aria-describedby={signupErrors.email ? 'signup-email-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-[#FFF7F7] border ${
                          signupErrors.email
                            ? 'border-red-400 ring-1 ring-red-400/30'
                            : 'border-[#EFC6D8] hover:border-[#6B4B6B]/60 focus:border-[#6B4B6B] focus:ring-2 focus:ring-[#6B4B6B]/15'
                        } rounded-[14px] text-xs text-[#3E2F3F] transition-all duration-200 focus:outline-none hover:shadow-2xs`}
                      />
                      {signupErrors.email && (
                        <p id="signup-email-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {signupErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="signup-password" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Password * (minimum 8 characters, at least 1 letter and 1 number)
                      </label>
                      <JQueryPasswordToggle
                        id="signup-password"
                        name="password"
                        value={signupPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignupChange('password', e.target.value)}
                        onBlur={() => handleSignupBlur('password')}
                        hasError={!!signupErrors.password}
                        aria-describedby={signupErrors.password ? 'signup-password-error' : undefined}
                      />
                      {signupErrors.password && (
                        <p id="signup-password-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {signupErrors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="signup-confirm-password" className="block text-xs font-semibold text-[#3E2F3F] mb-1">
                        Confirm Password *
                      </label>
                      <JQueryPasswordToggle
                        id="signup-confirm-password"
                        name="confirmPassword"
                        value={signupConfirm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignupChange('confirm', e.target.value)}
                        onBlur={() => handleSignupBlur('confirm')}
                        hasError={!!signupErrors.confirm}
                        placeholder="Re-enter password"
                        aria-describedby={signupErrors.confirm ? 'signup-confirm-error' : undefined}
                      />
                      {signupErrors.confirm && (
                        <p id="signup-confirm-error" className="text-[11px] text-red-500 font-medium mt-1 animate-in fade-in duration-150">
                          {signupErrors.confirm}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#5D3A58] hover:bg-[#4A2D46] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        Create Account
                      </button>
                    </div>

                    <p className="text-xs text-center text-[#3E2F3F]/70 pt-2">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('login');
                          setSocialNotice('');
                        }}
                        className="text-[#6B4B6B] font-semibold hover:underline cursor-pointer"
                      >
                        Log in
                      </button>
                    </p>
                  </form>
                )}
              </div>

              {/* Right Column Illustration & Script Text with Gentle Hover Effect */}
              <div className="lg:col-span-6 bg-gradient-to-br from-[#FDF6F8] via-[#F6E0E6]/50 to-[#EFC6D8]/30 p-8 sm:p-12 flex flex-col justify-between items-center text-center relative border-t lg:border-t-0 lg:border-l border-[#F6E0E6]">
                <div className="w-full max-w-sm aspect-square rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#6B4B6B]/20 border-4 border-white my-auto group/model transition-all duration-500 ease-out">
                  <img
                    src="/assets/aistudio/image_a37dc505.png"
                    alt="Luméa botanical facial care ritual"
                    width={800}
                    height={800}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover/model:scale-[1.04]"
                  />
                </div>

                <div className="pt-6">
                  <span className="font-script text-4xl sm:text-5xl text-[#6B4B6B] select-none block">
                    Good Skin Takes Time
                  </span>
                  <p className="text-xs text-[#3E2F3F]/70 mt-1 max-w-xs mx-auto">
                    Nurture your daily ritual with patience, pure ingredients, and gentle care.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="bg-white rounded-[24px] border border-[#F6E0E6] p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-[#F6E0E6]">
                  <div>
                    <h2 className="font-heading text-2xl text-[#3E2F3F]">
                      Your Saved Wishlist
                    </h2>
                    <p className="text-xs text-[#3E2F3F]/70 mt-1">
                      {wishlistItems.length} products saved for your next botanical order.
                    </p>
                  </div>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Heart className="w-10 h-10 text-[#C39DB8] mx-auto" />
                    <h3 className="font-heading text-lg text-[#3E2F3F]">Your wishlist is currently empty</h3>
                    <p className="text-xs text-[#3E2F3F]/70">Click the heart on any product card to save it here.</p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                    {wishlistItems.map(prod => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: TRACK ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-[24px] border border-[#F6E0E6] p-8 max-w-xl mx-auto space-y-4 text-center">
              <Package className="w-12 h-12 text-[#6B4B6B] mx-auto opacity-70" />
              <h2 className="font-heading text-2xl text-[#3E2F3F]">Track Your Package</h2>
              <p className="text-xs text-[#3E2F3F]/70 leading-relaxed">
                Enter your simulated tracking code (e.g. LUM-84920) to check order progression.
              </p>
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. LUM-84920"
                  className="flex-1 px-4 py-2.5 bg-[#FFF7F7] border border-[#EFC6D8] rounded-full text-xs text-[#3E2F3F] focus:outline-none focus:border-[#6B4B6B]"
                />
                <button
                  type="button"
                  onClick={() => {
                    showToast({
                      type: 'info',
                      title: 'Shipment Status: In Transit',
                      description: 'Order #LUM-84920 is hand-packed with care and on track for on-time delivery.'
                    });
                  }}
                  className="px-6 py-2.5 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold hover:bg-[#503350] transition-colors cursor-pointer"
                >
                  Track
                </button>
              </div>
            </div>
          )}

          {/* Bottom 3 Independent Interactive Cards (Track Orders, Save Wishlist, Special Offers) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Card 1: Track Orders */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('orders');
                setSearchParams({ tab: 'orders' });
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="p-7 bg-white rounded-[24px] border border-[#F6E0E6] hover:border-[#6B4B6B]/40 hover:bg-[#FFFDFC] hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group w-full"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Package className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Track Orders
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs">
                View real-time simulated order progression and dispatch status
              </p>
            </button>

            {/* Card 2: Save Wishlist */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('wishlist');
                setSearchParams({ tab: 'wishlist' });
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="p-7 bg-white rounded-[24px] border border-[#F6E0E6] hover:border-[#6B4B6B]/40 hover:bg-[#FFFDFC] hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group w-full"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Heart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Wishlist
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs">
                Curate and save your favorite clean formulas for future rituals
              </p>
            </button>

            {/* Card 3: Special Offers */}
            <button
              type="button"
              onClick={() => setSpecialOffersModalOpen(true)}
              className="p-7 bg-white rounded-[24px] border border-[#F6E0E6] hover:border-[#6B4B6B]/40 hover:bg-[#FFFDFC] hover:shadow-xl hover:shadow-[#6B4B6B]/10 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] focus-visible:ring-offset-2 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group w-full"
            >
              <div className="w-13 h-13 rounded-full bg-[#F6E0E6] group-hover:bg-[#5D3A58] text-[#5D3A58] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-2xs group-hover:shadow-md">
                <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-[#3E2F3F] group-hover:text-[#5D3A58] transition-colors">
                Special Offers
              </h3>
              <p className="text-xs text-[#3E2F3F]/75 leading-relaxed max-w-xs">
                Member access to seasonal promotional codes and botanical gifts
              </p>
            </button>
          </div>

        </div>
      </section>

      {/* Special Offers Modal */}
      {specialOffersModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2F3F]/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 space-y-5 shadow-2xl border border-[#EFC6D8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F6E0E6]">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#6B4B6B]" />
                <h3 className="font-heading text-xl text-[#3E2F3F]">Member Special Offers</h3>
              </div>
              <button
                onClick={() => setSpecialOffersModalOpen(false)}
                className="p-1 text-[#6B4B6B] hover:text-[#3E2F3F] rounded-full hover:bg-[#F6E0E6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
              Use any of these active coupon codes at checkout to enjoy botanical savings on your routine:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[16px] flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-[#6B4B6B] block">GLOW10</span>
                  <span className="text-[11px] text-[#3E2F3F]/70">10% off entire botanical order</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#6B4B6B] bg-[#F6E0E6] px-2 py-0.5 rounded-full">Active</span>
              </div>

              <div className="p-3 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[16px] flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-[#6B4B6B] block">LUMEA20</span>
                  <span className="text-[11px] text-[#3E2F3F]/70">20% off seasonal skincare sets</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#6B4B6B] bg-[#F6E0E6] px-2 py-0.5 rounded-full">Active</span>
              </div>

              <div className="p-3 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[16px] flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-[#6B4B6B] block">FREESHIP</span>
                  <span className="text-[11px] text-[#3E2F3F]/70">Complimentary carbon-neutral shipping</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#6B4B6B] bg-[#F6E0E6] px-2 py-0.5 rounded-full">Active</span>
              </div>
            </div>

            <button
              onClick={() => setSpecialOffersModalOpen(false)}
              className="w-full py-3 bg-[#6B4B6B] hover:bg-[#503350] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2F3F]/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm bg-white rounded-[24px] p-6 space-y-4 shadow-xl border border-[#EFC6D8]">
            <h3 className="font-heading text-xl text-[#3E2F3F]">Password Reset Notice</h3>
            <p className="text-xs text-[#3E2F3F]/80 leading-relaxed">
              This application is a frontend demonstration showcase. No live password storage or email dispatch backend is connected.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold hover:bg-[#503350] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
