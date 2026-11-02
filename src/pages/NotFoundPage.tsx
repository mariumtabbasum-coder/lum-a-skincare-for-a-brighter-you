import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Home, ShoppingBag } from 'lucide-react';
import { SEOHead } from '../lib/seo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#FFF7F7]">
      <SEOHead
        title="Page Not Found (404)"
        description="The requested page could not be found on Luméa Skincare."
        noIndex
      />

      <div className="max-w-md w-full text-center bg-white border border-[#EFC6D8] rounded-[28px] p-8 sm:p-12 shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F6E0E6] flex items-center justify-center text-[#6B4B6B] mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C39DB8]">
            404 Error
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-[#3E2F3F]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#3E2F3F]/75 leading-relaxed">
            The ritual or product page you were seeking appears to have blossomed elsewhere or retired from our shelf.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6B4B6B] hover:bg-[#583c58] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#F6E0E6] text-[#6B4B6B] border border-[#EFC6D8] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
