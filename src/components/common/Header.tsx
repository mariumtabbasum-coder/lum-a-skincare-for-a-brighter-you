import React, { lazy, Suspense, useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { LumeaLogo } from './LumeaLogo';
const SearchOverlay = lazy(() => import('./SearchOverlay').then(module => ({ default: module.SearchOverlay })));
const CartDrawer = lazy(() => import('./CartDrawer').then(module => ({ default: module.CartDrawer })));
import { getCartState, CART_UPDATED_EVENT, CartState } from '../../lib/cart-store';
import { getWishlist, WISHLIST_UPDATED_EVENT } from '../../lib/wishlist-store';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartState, setCartState] = useState<CartState>(getCartState());
  const [wishlistCount, setWishlistCount] = useState(getWishlist().length);

  // Sync cart and wishlist stores
  useEffect(() => {
    const handleCartUpdate = () => setCartState(getCartState());
    const handleWishlistUpdate = () => setWishlistCount(getWishlist().length);

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('storage', handleWishlistUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('storage', handleWishlistUpdate);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/journal' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7F7]/95 backdrop-blur-md border-b border-[#F6E0E6] shadow-2xs transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[66px] sm:h-[80px] md:h-[86px]">
            
            {/* Brand Logo (Always Left aligned on all viewports) */}
            <div className="flex-shrink-0 flex items-center py-1">
              <Link
                to="/"
                aria-label="Luméa Home"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B] rounded-lg py-1 flex items-center shrink-0"
              >
                <LumeaLogo size="md" />
              </Link>
            </div>

            {/* Center Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9" aria-label="Main Navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `text-[13px] font-medium transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-[#6B4B6B] font-semibold after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#6B4B6B] after:rounded-full'
                        : 'text-[#3E2F3F]/80 hover:text-[#6B4B6B]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Skin Quiz Navigation Action */}
              <Link
                to="/skin-quiz"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F6E0E6] hover:bg-[#EFC6D8] text-[#6B4B6B] hover:text-[#503350] rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-2xs hover:shadow-md hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6B4B6B] transition-transform duration-300 group-hover:rotate-12" />
                <span>Skin Quiz</span>
              </Link>
            </nav>

            {/* Right Action Icons & Mobile/Tablet Hamburger Menu — Aligned to Right on all viewports */}
            <div className="flex items-center gap-0 sm:gap-1.5 md:gap-2 shrink-0">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search products and articles"
                className="inline-flex items-center justify-center min-w-12 min-h-12 p-2.5 text-[#3E2F3F]/80 hover:text-[#6B4B6B] hover:bg-[#F6E0E6]/70 rounded-full transition-all duration-200 hover:scale-105 active:scale-90"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
              </button>

              {/* Account Link (Visible on sm+ screens, in mobile menu on smaller) */}
              <Link
                to="/account"
                aria-label="Customer Account"
                className="hidden sm:inline-flex items-center justify-center min-w-12 min-h-12 p-2 text-[#3E2F3F]/80 hover:text-[#6B4B6B] hover:bg-[#F6E0E6]/70 rounded-full transition-all duration-200 hover:scale-105 active:scale-90"
              >
                <User className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
              </Link>

              {/* Wishlist Link */}
              <Link
                to="/account?tab=wishlist"
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="inline-flex items-center justify-center min-w-12 min-h-12 p-2.5 text-[#3E2F3F]/80 hover:text-[#6B4B6B] hover:bg-[#F6E0E6]/70 rounded-full transition-all duration-200 hover:scale-105 active:scale-90 relative"
              >
                <Heart
                  className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-200 ${
                    wishlistCount > 0 ? 'fill-[#EFC6D8] text-[#6B4B6B]' : ''
                  }`}
                  strokeWidth={1.5}
                />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 bg-[#6B4B6B] text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping bag (${cartState.itemCount} items)`}
                className="inline-flex items-center justify-center min-w-12 min-h-12 p-2.5 text-[#3E2F3F]/80 hover:text-[#6B4B6B] hover:bg-[#F6E0E6]/70 rounded-full transition-all duration-200 hover:scale-105 active:scale-90 relative"
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                {cartState.itemCount > 0 && (
                  <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 bg-[#6B4B6B] text-white text-[8px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartState.itemCount}
                  </span>
                )}
              </button>

              {/* Mobile/Tablet Menu Hamburger Button — Distinct, on the FAR RIGHT */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
                className="lg:hidden inline-flex items-center justify-center min-w-12 min-h-12 p-2 text-[#6B4B6B] hover:text-[#3E2F3F] hover:bg-[#F6E0E6]/70 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4B6B]"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Overlay Backdrop */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[66px] sm:top-[80px] bg-[#3E2F3F]/30 backdrop-blur-xs z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative z-40 lg:hidden border-t border-[#F6E0E6] bg-[#FFF7F7] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
              <nav className="flex flex-col space-y-2.5" aria-label="Mobile Navigation">
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors ${
                        isActive ? 'bg-[#F6E0E6] text-[#6B4B6B] font-semibold' : 'text-[#3E2F3F] hover:bg-[#F6E0E6]/40'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <NavLink
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `text-sm font-medium py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between ${isActive ? 'bg-[#F6E0E6] text-[#6B4B6B] font-semibold' : 'text-[#3E2F3F] hover:bg-[#F6E0E6]/40'}`}
                >
                  <span>My Account</span>
                  <User className="w-4 h-4 text-[#6B4B6B]" />
                </NavLink>

                <Link
                  to="/skin-quiz"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#6B4B6B] hover:bg-[#583C58] text-white rounded-full text-xs font-semibold uppercase tracking-wider mt-3 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Take Skin Quiz</span>
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>

      {/* Spacer to prevent page content from jumping or being obscured beneath the fixed header */}
      <div className="h-[66px] sm:h-[80px] md:h-[86px] w-full shrink-0" aria-hidden="true" />

      {/* Global Modals */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchOverlay isOpen onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
      {isCartOpen && (
        <Suspense fallback={null}>
          <CartDrawer isOpen onClose={() => setIsCartOpen(false)} cartState={cartState} />
        </Suspense>
      )}
    </>
  );
};
