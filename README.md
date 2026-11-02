# Luméa — Skincare for a Brighter You

> **"Pure Care for Naturally Radiant Skin"**  
> Complete, verified, high-fidelity frontend web application for Luméa Skincare, built strictly in fidelity to the final approved design board.

---

## 1. Project Overview & Brand System

Luméa is an upscale, botanical-inspired skincare brand blending cold-stabilized active botanicals with clinical dermatology.

### Design Tokens & Visual Hierarchy
* **Color Palette (Source of Truth)**:
  * **Blush Pink**: `#EFC6D8` (Soft card borders, badges, warm accents)
  * **Soft Pink**: `#F6E0E6` (Pill backgrounds, hover states, badges)
  * **Mauve**: `#C39DB8` (Dividers, secondary subtext, icons)
  * **Plum**: `#6B4B6B` (Primary brand accent, buttons, headings, logo)
  * **Deep Aubergine**: `#3E2F3F` (Primary readable typography, footer background)
  * **White Pink**: `#FFF7F7` (Base page surface, card canvas)
* **Typography**:
  * **Headings**: `Playfair Display` (Classic editorial serif)
  * **Body, UI, & Navigation**: `Montserrat` (Clean geometric sans-serif)
  * **Handwritten Accents**: `Alex Brush` ("Real skin. Real people. Real care.", "Good Skin Takes Time", "Self care is skincare")
* **Cohesive Radius Scale**:
  * `--radius-sm`: `8px`
  * `--radius-md`: `14px`
  * `--radius-lg`: `20px`
  * `--radius-xl`: `28px`
  * `--radius-pill`: `9999px`
* **Card & Container Styling**:
  * All product, blog, and category cards feature rounded outer corners with strict `overflow: hidden` to ensure images respect the radius.
  * Subtle hover lift transitions (`hover:-translate-y-1 hover:shadow-md`) and gentle inner image zoom (`group-hover:scale-105 duration-500`).

---

## 2. Technology Stack & Architectural Roles

Each technology in the stack was selected and implemented with zero conflict:

| Technology | Role & Purpose in Luméa |
| :--- | :--- |
| **React 19 & TypeScript** | Component hierarchy, client-side routing, shared state, interactive islands (Skincare Quiz, Cart Drawer, Shop Filtering). |
| **Vite 8** | Modern, lightning-fast bundler with `@tailwindcss/vite` integration. |
| **Tailwind CSS v4** | Design token-driven utility classes wired to custom CSS variables (`tokens.css`). |
| **Custom CSS** | Root tokens, radius scale, pastel scrollbars, typography smoothing, and `prefers-reduced-motion` overrides. |
| **react-router-dom** | Clean URL routing (`/`, `/about`, `/shop`, `/shop/:slug`, `/skin-quiz`, `/journal`, `/journal/:slug`, `/cart`, `/checkout`, `/account`, `/contact`, `/privacy`, `/terms`, `/shipping-returns`, `*`). |
| **react-helmet-async** | Manages document title, meta descriptions, canonical URLs, Open Graph / Twitter cards, and structured JSON-LD per route. |
| **GSAP (GreenSock)** | Hero entrance animation (`power2.out`) and subtle floating botanical particles (`.botanical-drift`), fully respecting `prefers-reduced-motion`. |
| **jQuery 3.7 (Selective)** | Integrated via scoped React `useRef` hooks with explicit event cleanup for: (1) The FAQ Accordion on `/contact` with smooth `.slideToggle()`, and (2) The Password Visibility Toggle on `/account`. Never conflicts with React's Virtual DOM. |
| **Bootstrap 5 (Scoped Grid)** | Scoped grid flexbox layout classes (`bootstrap-grid.min.css`) imported without reboot/preflight styles to prevent theme or reset conflicts with Tailwind. |
| **XML Sitemap & Robots** | `scripts/generate-sitemap.mjs` automatically generates a valid `sitemap.xml` (36 real routes, products, and articles) and `robots.txt` upon build. |
| **canvas-confetti** | Lightweight celebratory particle bursts upon completing the Skincare Quiz and placing a demo checkout order. |

---

## 3. Route Map (All 9 Board Mockups + Legal + 404)

1. **Home Page (`/`)** — *Mockup 1*:
   * Hero with Playfair headline, trust strip (4 items), Bestsellers row (4 cards), The Power of Nature split feature, and brand statement community newsletter banner.
2. **About / Our Philosophy (`/about`)** — *Mockup 2*:
   * Hero with vertical "Natural / Thoughtful / Effective" pill stack, "Our Journey" vertical timeline (2018, 2020, 2023), "Our Values" 4 rounded cards, and "Kind to your skin. Kind to the planet." editorial banner.
3. **Shop / Products (`/shop`)** — *Mockup 3*:
   * Full collection banner, 2-column layout with left filter panel (Category, Skin Type, Concern, Price range $15–$100, Clear Filters), mobile filter drawer, sort toolbar, 3-column product grid with 24 products, pagination (`1 2 3 >`), and empty state.
4. **Product Detail (`/shop/:slug`)** — *Mockup 4*:
   * Breadcrumbs, 4-thumbnail vertical strip + main rounded container, ratings, benefit badges, quantity stepper, full-width "Add to Cart", wishlist toggle, accessible tablist (Description, Ingredients, How to Use, Reviews), and working "You may also like" carousel.
5. **Skincare Quiz (`/skin-quiz`)** — *Mockup 5*:
   * 5-step interactive questionnaire with progress bar, single-select cards, validation, back/next navigation, and deterministic 4-step routine recommendation (Cleanse, Treat, Moisturize, Protect) with full bundle add-to-cart.
6. **Glow Journal / Blog (`/journal`)** — *Mockup 6*:
   * Search input + category chips (All, Skincare, Ingredients, Lifestyle, Beauty), featured article card ("The Ultimate Guide to Your Skin Type"), and editorial grid.
7. **Article Reader (`/journal/:slug`)**:
   * Complete editorial reader with formatted reading time, publish date, share link, and related articles.
8. **Cart & Checkout (`/cart` & `/checkout`)** — *Mockup 7*:
   * Cart page with item stepper, line item removal, discount codes (`GLOW10`, `LUMEA20`, `FREESHIP`), and demo shipping calculations.
   * Checkout with contact & address inputs, strict validation, order review, and demo order confirmation screen with order ID generation.
9. **Account / Login (`/account`)** — *Mockup 8*:
   * Split-screen layout with tabs for Login and Sign up, jQuery password visibility toggle, demo modal for forgot password, and wishlist manager.
10. **Contact / Customer Care (`/contact`)** — *Mockup 9*:
    * Documented placeholder contact atelier details, "Send Us a Message" form with strict validation, and jQuery-powered FAQ accordion.
11. **Shared Footer (Item 10)**:
    * Present on all routes in deep plum/aubergine with wave styling, logo, navigation links, Glow Club newsletter, and copyright.
12. **Legal & Policy Pages (`/privacy`, `/terms`, `/shipping-returns`)**:
    * Zero dead links across the application.
13. **Branded 404 (`*`)**:
    * Custom not-found experience with links returning to Home or Shop.

---

## 4. Shared Data & Stores

* **Products Catalog (`src/data/products.ts`)**:
  * 24 typed products with strictly numeric prices, unique IDs, categories, skin types, concerns, and real image assets.
* **Articles Catalog (`src/data/articles.ts`)**:
  * 6 typed articles covering skincare fundamentals, ingredient science, and mindful rituals.
* **Shared Cart Store (`src/lib/cart-store.ts`)**:
  * Versioned localStorage key (`lumea_cart_v1`).
  * Price re-validation: Recalculates prices dynamically from `PRODUCTS` rather than trusting stored values.
  * Cross-tab synchronization via `window.addEventListener('storage', ...)`.
* **Shared Wishlist Store (`src/lib/wishlist-store.ts`)**:
  * Versioned localStorage key (`lumea_wishlist_v1`) synced across header, cards, detail pages, and account dashboard.

---

## 5. Strict Form Validation Module (`src/lib/validation.ts`)

Exported pure validation functions applied uniformly:
* **`validateName`**:
  * Uses Unicode property escape regex: `/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u`
  * Strictly rejects numbers and whitespace-only entries.
  * Correctly supports international names (e.g., *Jean-Luc*, *O'Brien*, *María José*, *Zoë*, *محمد علي*).
* **`validateEmail`**:
  * Strictly enforces valid domain, valid TLD (2+ characters), no boundary dots, and no whitespace.
* **`validatePassword`**:
  * Minimum 8 characters, at least 1 letter, and at least 1 number.
* **`validatePhone`**:
  * Allows international prefix `+`, spaces, brackets, and hyphens with 7–15 digits; rejects invalid letters.
* **`validateRequired`, `validateSelect`, `validateTextarea`, `validateCoupon`**.

---

## 6. Honest SEO & Client-Rendered Architecture Notice

* **SEO Strengths**:
  * Every route dynamically sets document title, meta description, canonical URL, Open Graph, and Twitter metadata via `react-helmet-async`.
  * `sitemap.xml` is generated from real product and article slugs.
  * JSON-LD schemas (`Product`, `Article`, `BeautySalon`) are output without fabricated medical claims.
* **Client-Rendered SPA Limitation (vs. Astro SSG)**:
  * In this React SPA setup on Vite, initial HTML contains the root `#root` div while route pages hydrate client-side. Web crawlers that do not execute JavaScript may receive only the base HTML metadata until rendered.
  * *Future Recommendation*: For maximum indexation efficiency in production environments supporting Node/Edge runtimes, enabling Astro SSG or React Prerendering (e.g. Vite SSG / Next.js) will pre-bake static HTML for all product and article pages at build time.

---

## 7. Verification & Audit Report (Candid Disclosures)

* **Build & Compilation**:
  * `npm run build` executed and passed (`Build succeeded - the applet is compiled`).
  * TypeScript typecheck (`tsc --noEmit`) executed and passed with 0 errors.
  * Dev server running stably on port 3000 (`HTTP 200 OK`).
* **Interactive Features Verified**:
  * Header cart counter dynamically increments and opens sliding `CartDrawer`.
  * Search overlay successfully filters both products and articles.
  * Shop filters (Category, Skin Type, Concern, Price Slider, Sorting, Pagination) verified and combinable.
  * Product detail thumbnail selector switches main view.
  * Skincare Quiz calculates recommendations deterministically and allows full-routine bundle add-to-cart.
  * Contact and Newsletter forms block invalid submissions and reject numbers in names.
  * jQuery Accordion and jQuery Password Toggle initialize with scoped refs and clean up event listeners without error.
* **Honest Disclosures & Placeholders**:
  * **No Real Authentication**: Sign-in and registration are client-side demonstrations. Passwords are never stored or sent to a server.
  * **No Real Payment / Orders**: Checkout simulates order generation with mock ID numbers. No real credit cards are processed.
  * **Contact Details**: The address, phone number, and email `hello@lumea.example` are documented placeholders.
  * **Marketing Claims**: Statements such as "100% Natural Ingredients" and "Dermatologist Approved" reflect the reference design board copy and are demo concepts.
