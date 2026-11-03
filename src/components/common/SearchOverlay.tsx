import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../../data/products';
import { ARTICLES, Article } from '../../data/articles';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matchedProducts: Product[] = trimmed
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.concerns.some(c => c.toLowerCase().includes(trimmed))
      ).slice(0, 4)
    : [];

  const matchedArticles: Article[] = trimmed
    ? ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(trimmed) ||
          a.summary.toLowerCase().includes(trimmed) ||
          a.category.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#3E2F3F]/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className="w-full max-w-2xl bg-[#FFF7F7] border border-[#EFC6D8] rounded-[24px] shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F6E0E6]">
          <h2 id="search-modal-title" className="font-heading text-xl text-[#3E2F3F]">
            Search Luméa
          </h2>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-[#6B4B6B] hover:text-[#3E2F3F] hover:bg-[#F6E0E6] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#79566E]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search serums, moisturizers, skin concerns, or journal..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFC6D8] rounded-[16px] text-[#3E2F3F] placeholder-[#79566E] focus:outline-none focus:border-[#6B4B6B] text-sm"
          />
        </div>

        {/* Search Results */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-6">
          {trimmed && matchedProducts.length === 0 && matchedArticles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#3E2F3F] font-medium">No results found for "{query}"</p>
              <p className="text-xs text-[#6B4B6B] mt-1">Try searching for "serum", "cleanse", "dry skin", or "glow".</p>
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#6B4B6B] uppercase block mb-3">
                Products ({matchedProducts.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/shop/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 bg-white rounded-[14px] border border-[#F6E0E6] hover:border-[#6B4B6B] hover:shadow-sm transition-all group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-[10px]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#3E2F3F] truncate group-hover:text-[#6B4B6B]">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-[#79566E] capitalize">{p.category}</p>
                      <p className="text-xs font-semibold text-[#6B4B6B]">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedArticles.length > 0 && (
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#6B4B6B] uppercase block mb-3">
                Journal Articles ({matchedArticles.length})
              </span>
              <div className="space-y-2">
                {matchedArticles.map(a => (
                  <Link
                    key={a.id}
                    to={`/journal/${a.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 bg-white rounded-[14px] border border-[#F6E0E6] hover:border-[#6B4B6B] transition-all group"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#3E2F3F] group-hover:text-[#6B4B6B]">
                        {a.title}
                      </p>
                      <p className="text-[11px] text-[#79566E]">{a.category} • {a.readingTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#79566E] group-hover:text-[#6B4B6B] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!trimmed && (
            <div className="py-4 text-center">
              <span className="text-xs text-[#79566E]">Popular searches:</span>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Radiant Serum', 'Hydrating Moisturizer', 'Skin Quiz', 'Gentle Cleanser', 'SPF 50'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-white hover:bg-[#F6E0E6] border border-[#EFC6D8] rounded-full text-xs text-[#6B4B6B] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
