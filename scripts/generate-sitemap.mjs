/**
 * Sitemap & Robots Generator Script for Luméa Skincare
 * Generates valid sitemap.xml and robots.txt from real product & article slugs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = 'https://lumea-skincare.example';

// Read PRODUCTS from src/data/products.ts
const productsContent = fs.readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf-8');
const slugMatches = [...productsContent.matchAll(/slug:\s*'([a-z0-9-]+)'/g)];
const productSlugs = Array.from(new Set(slugMatches.map(m => m[1])));

// Read ARTICLES from src/data/articles.ts
const articlesContent = fs.readFileSync(path.join(rootDir, 'src/data/articles.ts'), 'utf-8');
const articleMatches = [...articlesContent.matchAll(/slug:\s*'([a-z0-9-]+)'/g)];
const articleSlugs = Array.from(new Set(articleMatches.map(m => m[1])));

const staticRoutes = [
  '/',
  '/about',
  '/shop',
  '/account',
  '/skin-quiz',
  '/journal',
  '/contact'
];

const allUrls = [
  ...staticRoutes.map(route => ({
    loc: `${SITE_URL}${route === '/' ? '' : route}`,
    changefreq: 'weekly',
    priority: route === '/' ? '1.0' : '0.8'
  })),
  ...productSlugs.map(slug => ({
    loc: `${SITE_URL}/shop/${slug}`,
    changefreq: 'weekly',
    priority: '0.9'
  })),
  ...articleSlugs.map(slug => ({
    loc: `${SITE_URL}/journal/${slug}`,
    changefreq: 'monthly',
    priority: '0.7'
  }))
];

const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapXml.trim());
console.log(`Successfully generated public/sitemap.xml with ${allUrls.length} URLs.`);

const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(rootDir, 'public/robots.txt'), robotsTxt.trim());
console.log('Successfully generated public/robots.txt.');
