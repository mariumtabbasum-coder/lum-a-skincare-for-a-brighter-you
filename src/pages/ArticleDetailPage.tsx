import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, BookOpen, Check } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import { getArticleBySlug, ARTICLES } from '../data/articles';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = window.location.href;
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        // fallback to execCommand below
      }
    }
    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        success = true;
      } catch {
        success = false;
      }
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  if (!article) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-4">
        <SEOHead title="Article Not Found" description="The requested Luméa journal article could not be located." noIndex />
        <h1 className="font-heading text-3xl text-[#3E2F3F]">Article Not Found</h1>
        <p className="text-xs text-[#3E2F3F]/70">This article might have been moved or archived.</p>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4B6B] text-white rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Glow Journal
        </Link>
      </div>
    );
  }

  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.summary,
    'image': article.image,
    'datePublished': '2024-04-18',
    'author': {
      '@type': 'Organization',
      'name': 'Luméa Skincare'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Luméa Skincare'
    }
  };

  return (
    <div className="overflow-hidden">
      <SEOHead
        title={article.title}
        description={article.summary}
        canonicalPath={`/journal/${article.slug}`}
        ogType="article"
        ogImage={article.image}
        jsonLd={articleJsonLd}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#F6E0E6] py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B4B6B] hover:text-[#3E2F3F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Glow Journal</span>
          </Link>
        </div>
      </div>

      {/* Article Header & Main Image */}
      <article className="py-12 bg-[#FFF7F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4 text-center sm:text-left">
            <span className="px-3.5 py-1 bg-[#F6E0E6] text-[#6B4B6B] rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
              {article.category}
            </span>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#3E2F3F] leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#C39DB8] pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
              <span>•</span>
              <span>By Luméa Editorial Team</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] rounded-[28px] overflow-hidden shadow-md border-2 border-[#EFC6D8]">
            <picture className="w-full h-full block">
              <source
                srcSet={article.image?.replace(/\.(png|jpe?g)$/i, '.webp')}
                type="image/webp"
              />
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </picture>
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-[24px] border border-[#F6E0E6] p-8 sm:p-12 space-y-6 text-sm sm:text-base text-[#3E2F3F]/85 leading-relaxed shadow-xs">
            <p className="text-base sm:text-lg font-medium text-[#3E2F3F] leading-relaxed italic border-l-4 border-[#6B4B6B] pl-4 py-1">
              {article.summary}
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="pt-6 border-t border-[#F6E0E6] flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-[#9E6B89] font-medium">
                Share this ritual wisdom:
              </span>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-emerald-600/25 scale-[1.02]'
                      : 'bg-[#F6E0E6] hover:bg-[#EFC6D8] text-[#5D3A58]'
                  }`}
                  aria-label={copied ? 'Link copied to clipboard' : 'Copy article link'}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                {/* Floating Feedback Toast Notification */}
                {copied && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="absolute bottom-full mb-2.5 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 bg-[#3E2F3F] text-white text-xs font-medium rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200 z-30 pointer-events-none"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    <span>Link copied to clipboard!</span>
                    <div className="absolute top-full right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#3E2F3F]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="pt-10 space-y-6">
            <h2 className="font-heading text-2xl text-[#3E2F3F]">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.id}
                  to={`/journal/${rel.slug}`}
                  className="bg-white p-5 rounded-[20px] border border-[#F6E0E6] hover:border-[#EFC6D8] transition-all hover:shadow-sm flex items-center gap-4 group"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-20 h-20 rounded-[14px] object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#C39DB8] uppercase font-semibold block mb-1">{rel.category}</span>
                    <p className="font-heading text-sm text-[#3E2F3F] group-hover:text-[#6B4B6B] transition-colors line-clamp-2">
                      {rel.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};
