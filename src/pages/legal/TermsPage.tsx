import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { SEOHead } from '../../lib/seo';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 bg-[#FFF7F7]">
      <SEOHead title="Terms of Service" description="Luméa Skincare Terms and Conditions of website use." noIndex />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B4B6B] hover:text-[#3E2F3F]">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white rounded-[28px] border border-[#F6E0E6] p-8 sm:p-12 space-y-6 shadow-xs text-xs sm:text-sm text-[#3E2F3F]/80 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F6E0E6]">
            <FileText className="w-6 h-6 text-[#6B4B6B]" />
            <h1 className="font-heading text-3xl text-[#3E2F3F]">Terms of Service</h1>
          </div>
          <p className="p-3 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[14px] text-xs text-[#6B4B6B]">
            <strong>Demonstration Terms:</strong> Luméa is a portfolio demonstration concept for an upscale skincare brand.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">1. Product Information & Cosmetic Disclaimer</h2>
          <p>
            All product details, reviews, prices, and skincare quiz recommendations represent cosmetic and conceptual content. Products are not intended to diagnose, cure, mitigate, treat, or prevent any dermatological diseases.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">2. Simulation of Transactions</h2>
          <p>
            The checkout flow simulates order creation with mock confirmation IDs. No actual credit card billing occurs and no shipments are generated.
          </p>
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">3. Intellectual Property</h2>
          <p>
            Design motifs, typography, and botanical elements are demonstrated in fidelity to the Luméa brand identity guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
