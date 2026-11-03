import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter, ArrowRight, Check } from 'lucide-react';
import { LumeaLogo } from './LumeaLogo';
import { validateEmail } from '../../lib/validation';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEmail(email);
    if (!result.valid) {
      setError(result.message);
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#3E2F3F] text-[#FFF7F7] pt-16 pb-10 overflow-hidden mt-20">
      {/* Delicate top wavy shape / border */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#FFF7F7] to-transparent opacity-10 pointer-events-none" />

      <div className="lumea-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 pb-12 border-b border-[#6B4B6B]/40">
          
          {/* Brand Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 space-y-4">
            <Link to="/" aria-label="Luméa Home" className="inline-block">
              <LumeaLogo variant="light" size="md" />
            </Link>
            <p className="text-xs text-[#FFF7F7]/75 leading-relaxed max-w-sm">
              Natural skincare for real people. Thoughtfully formulated with pure botanical extracts and clinical science because your skin deserves the best.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Luméa on Instagram (Placeholder link)"
                className="w-8 h-8 rounded-full bg-[#6B4B6B]/50 hover:bg-[#EFC6D8] hover:text-[#3E2F3F] flex items-center justify-center text-[#FFF7F7] transition-all duration-200 hover:scale-110 active:scale-90 hover:shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Luméa on Facebook (Placeholder link)"
                className="w-8 h-8 rounded-full bg-[#6B4B6B]/50 hover:bg-[#EFC6D8] hover:text-[#3E2F3F] flex items-center justify-center text-[#FFF7F7] transition-all duration-200 hover:scale-110 active:scale-90 hover:shadow-md"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Luméa on Pinterest (Placeholder link)"
                className="w-8 h-8 rounded-full bg-[#6B4B6B]/50 hover:bg-[#EFC6D8] hover:text-[#3E2F3F] flex items-center justify-center text-[#FFF7F7] transition-all duration-200 hover:scale-110 active:scale-90 hover:shadow-md"
              >
                <span className="font-bold text-xs">P</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Luméa on YouTube (Placeholder link)"
                className="w-8 h-8 rounded-full bg-[#6B4B6B]/50 hover:bg-[#EFC6D8] hover:text-[#3E2F3F] flex items-center justify-center text-[#FFF7F7] transition-all duration-200 hover:scale-110 active:scale-90 hover:shadow-md"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Luméa on X / Twitter (Placeholder link)"
                className="w-8 h-8 rounded-full bg-[#6B4B6B]/50 hover:bg-[#EFC6D8] hover:text-[#3E2F3F] flex items-center justify-center text-[#FFF7F7] transition-all duration-200 hover:scale-110 active:scale-90 hover:shadow-md"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-[#EFC6D8]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-[#FFF7F7]/80">
              <li>
                <Link to="/" className="hover:text-[#EFC6D8] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#EFC6D8] transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#EFC6D8] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#EFC6D8] transition-colors">Glow Journal</Link>
              </li>
              <li>
                <Link to="/skin-quiz" className="hover:text-[#EFC6D8] transition-colors">Skincare Quiz</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#EFC6D8] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-[#EFC6D8]">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs text-[#FFF7F7]/80">
              <li>
                <Link to="/contact#faq" className="hover:text-[#EFC6D8] transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-[#EFC6D8] transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/shipping-returns#returns" className="hover:text-[#EFC6D8] transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/account?tab=orders" className="hover:text-[#EFC6D8] transition-colors">Track Order</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#EFC6D8] transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Glow Club Newsletter */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 space-y-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-[#EFC6D8]">
              Join Our Glow Club
            </h3>
            <p className="text-xs text-[#FFF7F7]/75 leading-relaxed">
              Get exclusive offers, skincare rituals, and botanical tips delivered to your inbox.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 bg-[#6B4B6B]/40 border border-[#EFC6D8]/30 rounded-[14px] text-xs text-[#EFC6D8] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#EFC6D8]" />
                <span>Welcome to the Glow Club! (Demo: no email stored)</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2 pt-1">
                <div className="flex flex-col xl:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    aria-invalid={!!error}
                    aria-describedby={error ? "footer-email-error" : undefined}
                    className={`w-full min-w-0 px-4 py-2.5 bg-[#6B4B6B]/30 border ${
                      error ? 'border-red-400' : 'border-[#C39DB8]/50'
                    } rounded-full text-xs text-[#FFF7F7] placeholder-[#79566E] focus:outline-none focus:border-[#EFC6D8] transition-colors`}
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-full xl:w-auto shrink-0 px-5 py-2.5 bg-[#EFC6D8] hover:bg-white text-[#3E2F3F] font-semibold text-xs rounded-full transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && (
                  <p id="footer-email-error" className="text-[11px] text-red-300 pl-2">
                    {error}
                  </p>
                )}
              </form>
            )}

            {/* Handwritten Script Detail */}
            <div className="pt-3 flex items-center justify-end text-right">
              <span className="font-script text-2xl text-[#EFC6D8] opacity-90 select-none">
                Self care is skincare
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF7F7]/60">
          <p>© 2026 Luméa Skincare. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-[#EFC6D8] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#EFC6D8] transition-colors">Terms of Service</Link>
            <Link to="/shipping-returns" className="hover:text-[#EFC6D8] transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
