/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Global Layout Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { LumeaChatLauncher } from './components/chat/LumeaChatLauncher';
const LumeaChatPanel = lazy(() => import('./components/chat/LumeaChatPanel').then(module => ({ default: module.LumeaChatPanel })));

// Pages
import { HomePage } from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const SkinQuizPage = lazy(() => import('./pages/SkinQuizPage').then(module => ({ default: module.SkinQuizPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then(module => ({ default: module.JournalPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then(module => ({ default: module.ArticleDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then(module => ({ default: module.AccountPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// Legal Pages
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/legal/TermsPage').then(module => ({ default: module.TermsPage })));
const ShippingReturnsPage = lazy(() => import('./pages/legal/ShippingReturnsPage').then(module => ({ default: module.ShippingReturnsPage })));

/**
 * Ensures page scroll position resets to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FFF7F7] text-[#3E2F3F] selection:bg-[#EFC6D8] selection:text-[#3E2F3F] w-full overflow-x-hidden">
          {/* Header */}
          <Header />

          {/* Main Routing Body */}
          <main className="flex-1" id="main-content">
            <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductDetailPage />} />
              <Route path="/skin-quiz" element={<SkinQuizPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<ArticleDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Legal & Policy Pages */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping-returns" element={<ShippingReturnsPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
          </main>

          {/* Shared Footer (Item 10) */}
          <Footer />

          {/* Luméa AI Skin Assistant Floating Widget & Panel */}
          {isChatOpen && (
            <Suspense fallback={null}>
              <LumeaChatPanel isOpen onClose={() => setIsChatOpen(false)} />
            </Suspense>
          )}
          <LumeaChatLauncher
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen((prev) => !prev)}
          />

          {/* Global Toast Notifications */}
          <ToastContainer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
