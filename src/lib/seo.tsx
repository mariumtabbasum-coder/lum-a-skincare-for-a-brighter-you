import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'Luméa — Skincare for a Brighter You';
const DEFAULT_DESCRIPTION = 'Clean, botanical skincare crafted for your natural glow. Discover thoughtfully formulated serums, creams, and personalized skincare routines.';
const SITE_URL = 'https://lumea-skincare.example';
const DEFAULT_OG_IMAGE = '/assets/aistudio/home-hero-model-portrait.png';

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
  noIndex = false
}) => {
  const fullTitle = title ? `${title} | Luméa Skincare` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  // Base Organization / WebSite Schema
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    'name': 'Luméa Skincare',
    'description': DEFAULT_DESCRIPTION,
    'url': SITE_URL,
    'logo': `${SITE_URL}/assets/lumea-logo.svg`,
    'priceRange': '$$'
  };

  const schemaToRender = jsonLd || defaultSchema;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content="Luméa Skincare" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToRender)}
      </script>
    </Helmet>
  );
};
