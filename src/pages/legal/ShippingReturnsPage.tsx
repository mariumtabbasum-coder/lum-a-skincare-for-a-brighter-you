import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import { SEOHead } from '../../lib/seo';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="py-16 bg-[#FFF7F7]">
      <SEOHead title="Shipping & Returns" description="Luméa Skincare shipping rates, delivery timelines, and return policies." noIndex />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B4B6B] hover:text-[#3E2F3F]">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="bg-white rounded-[28px] border border-[#F6E0E6] p-8 sm:p-12 space-y-6 shadow-xs text-xs sm:text-sm text-[#3E2F3F]/80 leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-[#F6E0E6]">
            <Truck className="w-6 h-6 text-[#6B4B6B]" />
            <h1 className="font-heading text-3xl text-[#3E2F3F]">Shipping & Returns</h1>
          </div>
          
          <h2 className="font-heading text-lg text-[#3E2F3F] font-semibold">Shipping Guidelines</h2>
          <p>
            Domestic ground shipping is flat-rate $5.00 or complimentary on qualifying orders and promotions (e.g. promo code FREESHIP). Domestic orders typically arrive within 3-5 business days.
          </p>

          <h2 id="returns" className="font-heading text-lg text-[#3E2F3F] font-semibold pt-4 border-t border-[#F6E0E6]">
            30-Day Happiness Return Policy
          </h2>
          <p>
            We take great pride in our botanical formulations. If any Luméa product does not deliver the gentle glow you expected, contact customer support within 30 days of receipt for an exchange or full refund.
          </p>

          <div className="p-4 bg-[#FFF7F7] border border-[#EFC6D8] rounded-[18px] text-xs text-[#6B4B6B] space-y-2">
            <p className="font-semibold">How to initiate a return (Demo instruction):</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Visit our <Link to="/contact" className="underline font-bold">Contact Page</Link>.</li>
              <li>Select "Returns & Refunds" as your subject inquiry.</li>
              <li>Provide your mock order ID (e.g., #LUM-84920).</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
