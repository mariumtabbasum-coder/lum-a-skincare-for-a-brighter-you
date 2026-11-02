import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { SEOHead } from '../../lib/seo';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16 bg-[#FFF7F7]">
      <SEOHead title="Privacy Policy" description="Luméa Skincare Privacy Policy and data handling practices." noIndex />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B4B6B] hover:text-[#3E2F3F]">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white rounded-[28px] border border-[#F6E0E6] p-8 sm:p-12 space-y-6 shadow-xs text-xs sm:text-sm text-[#3E2F3F]/80 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F6E0E6]">
            <Shield className="w-6 h-6 text-[#6B4B6B]" />
            <h1 className="font-heading text-3xl text-[#3E2F3F]">Privacy Policy</h1>
          </div>
          <p className="p-3 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[14px] text-xs text-[#6B4B6B]">
            <strong>Notice:</strong> This website is an interactive frontend demonstration. No personal data, passwords, or payment cards are stored on any backend server.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">1. Information We Collect (Demo Context)</h2>
          <p>
            Any information submitted through demo forms (such as contact messages, newsletter inputs, or simulated checkout orders) remains strictly in your browser session or local storage for demonstration purposes only.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">2. Local Storage Usage</h2>
          <p>
            We use your browser's local storage solely to retain your active shopping cart items and wishlist preferences across browser reloads. You can clear this anytime by emptying your cart or resetting browser storage.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">3. Third-Party Integrations</h2>
          <p>
            Social login and payment brand buttons shown on this website are illustrative demo controls and do not transmit data to external third parties.
          </p>
        </div>
      </div>
    </div>
  );
};
