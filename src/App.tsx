/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Global Layout Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { LumeaChatLauncher } from './components/chat/LumeaChatLauncher';
import { LumeaChatPanel } from './components/chat/LumeaChatPanel';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SkinQuizPage } from './pages/SkinQuizPage';
import { JournalPage } from './pages/JournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Legal Pages
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { ShippingReturnsPage } from './pages/legal/ShippingReturnsPage';

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
          </main>

          {/* Shared Footer (Item 10) */}
          <Footer />

          {/* Luméa AI Skin Assistant Floating Widget & Panel */}
          <LumeaChatPanel
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
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
