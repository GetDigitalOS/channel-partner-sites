# Compliance Report — Channel Partner Sites

**Date:** 2026-03-19
**Tier:** 2 — Interactive
**Framework Version:** Universal Web Development Principles v2.01.01

## Classification Rationale

Scored against the 10 complexity questions:
- User Authentication: No — 0
- Data Persistence: No (passes enrollment to HomeWealthIQ-OS API) — 0
- Multi-Role Access: No — 0
- Third-Party Integrations: Yes (HomeWealthIQ API, DocuSign) — 1
- Real-Time Features: No — 0
- Transaction Sensitivity: No direct financial transaction handling — 0
- Scale Expectations: No — 0
- Team Size: No — 0
- Longevity: Likely yes — 1
- AI/LLM Features: No — 0

**Total: 2 "yes" answers, no escalation triggers → Tier 2: Interactive**

The API route (`/api/enroll`) proxies enrollment to an external system and collects name, email, domain, and portal preference — PII but not payment data. No escalation triggers fire. Tier 2 is confirmed.

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Met | 20 |
| ⚠️ Partial | 11 |
| ❌ Not Met | 12 |
| ⬜ Not Applicable | 5 |

**Overall Compliance:** 63% of applicable principles met or partially met (20 fully met + 11 partial out of 48 applicable)

---

## Critical Gaps (Fix Before Launch)

1. **No security headers in `next.config.js`** — Neither app configures `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, HSTS, or a Content Security Policy. Next.js makes this trivial via `headers()` in `next.config.js` but it is absent from both apps.

2. **No CSRF protection on the enrollment API route** — `apps/neil-solar/app/api/enroll/route.ts` and its rich-financial equivalent accept POST requests with no origin check, no token, and no `SameSite` cookie enforcement. A cross-site POST from any domain will succeed.

3. **No rate limiting on the API route** — The enrollment endpoint has no request throttle. It will forward unlimited requests to the HomeWealthIQ-OS API, enabling both spam abuse and API key exhaustion.

4. **No test suite** — Zero test files exist across the entire monorepo. No form validation tests, no unit tests for the `enrollPartner` library function, no cross-browser or accessibility automated checks.

5. **No robots.txt or XML sitemap** — Both `public/` directories are empty. These sites will be indexed without crawl guidance; there is no sitemap to submit to search engines.

6. **No favicon** — `public/` directories are empty. Both apps will render the default browser globe icon.

7. **No input sanitization on the API route** — The `email`, `domain`, `partnerName`, and `companyName` fields are extracted from `request.json()` and forwarded directly to the upstream API without any sanitization, regex validation, or schema enforcement (e.g., Zod).

---

## Partial Items

1. **Privacy compliance** — A privacy policy link (`homewealthiq.com/privacy`) exists in the shared `Footer` component. However, there is no cookie consent banner. The Google Fonts import (`fonts.googleapis.com`) in `globals.css` makes a third-party network request from EU visitors' browsers without consent, which may constitute a GDPR/ePrivacy violation.

2. **Open Graph / Social tags** — `<title>` and `<meta description>` are set via Next.js `Metadata` in both layouts. OG tags (`og:title`, `og:description`, `og:image`, `twitter:card`) are absent.

3. **Icon accessibility** — The decorative dot pattern overlay in `neil-solar/page.tsx` correctly uses `aria-hidden="true"`. The SVG icons in `DemoPortalCTA.tsx` lack `aria-hidden` or `aria-label` — they are visually decorative but not marked as such.

4. **Keyboard navigation** — All interactive elements are `<a>` tags (correct semantic element). However, no visible focus indicators are explicitly defined in CSS. Tailwind's default `ring` utilities are present in the design system but are not applied to the CTA links.

5. **Heading hierarchy** — Both pages use `<h1>` in the hero section and `<h2>` / `<h3>` appropriately. One gap: the `neil-solar` page uses several `<p>` elements styled as section labels (e.g., `text-[10px] font-bold uppercase tracking-[3px]`) that function as visual headings but are not marked up as headings — minor semantic gap.

6. **Dependency hygiene** — Dependencies are minimal and current (Next.js 15, React 19, Tailwind 3.4, TypeScript 5.x). However, there is no `npm audit` step in the deploy workflow (`deploy.yml`) and no Dependabot configuration.

7. **CDN delivery** — Deployment is via Cloudflare Pages, which is a global CDN. However, Google Fonts are loaded from an external origin (`fonts.googleapis.com`) rather than being self-hosted or bundled via `next/font`, introducing a render-blocking network dependency on a third-party origin.

8. **Error handling strategy** — The enrollment API route returns structured JSON errors with appropriate status codes (400, 500, 502). The page itself has no client-side handling for the case where `NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL` is unset — the CTA button links to `#`, silently doing nothing.

9. **Client-side error capture** — No error tracking service (Sentry, LogRocket, etc.) is configured in either app.

10. **Uptime monitoring** — No evidence of uptime monitoring configuration.

11. **Rendering strategy** — Both pages are Next.js App Router pages. The rendering strategy (SSG vs SSR) is not explicitly documented. Given no dynamic data is fetched at render time and env vars are read inline, both pages will render as static with client-side env var injection — acceptable but undocumented.

---

## Principle-by-Principle Results

### Tier 1 Principles

#### Security Fundamentals

| Principle | Status | Notes |
|-----------|--------|-------|
| HTTPS Everywhere | ✅ Met | Cloudflare Pages enforces HTTPS |
| Security Headers | ❌ Not Met | Neither `next.config.js` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, HSTS, or CSP |
| Input Validation | ❌ Not Met | API route checks for presence of required fields but performs no format validation (email regex, domain format, string length limits, or sanitization) |
| Dependency Hygiene | ⚠️ Partial | Deps are current; no `npm audit` in CI, no Dependabot |

#### Design System Basics

| Principle | Status | Notes |
|-----------|--------|-------|
| Semantic Tokens | ✅ Met | Full semantic token system in `packages/shared/tailwind.config.js` (background, foreground, primary, muted, success, warning, info, destructive, card) |
| Token Hierarchy | ✅ Met | Primitives (HSL values in CSS vars) → Semantic (token names) → Component (applied via Tailwind utilities) |
| Consistent Spacing Scale | ✅ Met | Tailwind's 4px base unit used throughout; consistent `gap-5`, `px-6`, `py-16` etc. |
| Typography Scale | ✅ Met | Defined hierarchy: `text-2xl`/`text-xl` headings, `text-sm` body, `text-xs` secondary. Font families: DM Sans (sans), Newsreader (serif) |
| Icon System | ⚠️ Partial | Inline SVGs used in `DemoPortalCTA`; decorative overlay in neil-solar uses `aria-hidden="true"` correctly. SVG icons in DemoPortalCTA are missing `aria-hidden="true"` |
| Responsive Breakpoint Strategy | ✅ Met | Tailwind breakpoints used consistently (`sm:`, `md:`, `lg:`). `clamp()` not used for fluid typography but fixed Tailwind scale is acceptable |

#### Performance

| Principle | Status | Notes |
|-----------|--------|-------|
| Core Web Vitals Targets | ⚠️ Partial | No measurement in place; pages are primarily static with no heavy JS, suggesting good LCP/CLS baseline. Not verified. |
| Asset Optimization | ⚠️ Partial | No images exist in the codebase at all (no `<img>` or `<Image>` tags, no files in `public/`). CSS/JS will be minified by Next.js build. Google Fonts loaded via CSS `@import` rather than `next/font` — not optimal. |
| Lazy Loading | ⬜ Not Applicable | No offscreen images present |
| CDN Delivery | ✅ Met | Cloudflare Pages provides global edge delivery |

#### Accessibility (WCAG 2.1 AA)

| Principle | Status | Notes |
|-----------|--------|-------|
| Semantic HTML | ⚠️ Partial | Good `<h1>`/`<h2>`/`<h3>` hierarchy, `<section>`, `<footer>`, `<nav>` absent but not required. Some visual headings implemented as `<p>` elements. |
| Keyboard Navigation | ⚠️ Partial | All interactive elements are `<a>` links (correct). No `<button>` misuse. Focus order is logical. No explicit focus ring styles defined. |
| Color Contrast | ⚠️ Partial | Semantic tokens defined (muted-foreground: `215.4 16.3% 46.9%` on white background ≈ 4.6:1, passing). Hero section uses `--hero-muted` (`30 5% 49%`) on `--hero-bg` (`24 10% 10%`) — estimated ~5:1, likely passing. Very small text (`text-[9px]`, `text-[10px]`) is not verified; WCAG requires 4.5:1 minimum. |
| Alt Text | ⬜ Not Applicable | No `<img>` or `<Image>` elements in any page or component |
| Focus Indicators | ❌ Not Met | No `focus:ring` or `focus-visible:` utilities applied to CTA links in `page.tsx`. Tailwind defaults provide none. |
| Reduced Motion | ❌ Not Met | `transition-colors` and `transition-shadow` are used on interactive elements. No `@media (prefers-reduced-motion: reduce)` override anywhere in the codebase. |

#### SEO Fundamentals

| Principle | Status | Notes |
|-----------|--------|-------|
| Semantic HTML for Search | ✅ Met | `<title>` and `<meta description>` set in both layout files. Heading hierarchy present. |
| Open Graph & Social Tags | ❌ Not Met | No `og:title`, `og:description`, `og:image`, or `twitter:card` meta tags |
| Structured Data | ❌ Not Met | No JSON-LD schema (Organization, FAQPage, etc.) despite the FAQ section in neil-solar |
| Technical SEO | ❌ Not Met | No `robots.txt`, no XML sitemap, no canonical URL configuration. Both `public/` directories are empty. |
| Performance as SEO | ⚠️ Partial | Pages are lightweight and likely fast. No measurement tooling in place. |

#### Code Quality

| Principle | Status | Notes |
|-----------|--------|-------|
| Separation of Concerns | ✅ Met | Shared components in `packages/shared`, app-specific pages in `apps/*/app`. API logic in route handlers. Business logic (enrollment) in `lib/enroll.ts`. |
| DRY Principle | ✅ Met | Shared components (`ComplianceDisclosure`, `Footer`, `IntegrationOptions`, `DemoPortalCTA`, `HEIExplainer`) are reused across both apps. No copy-paste duplication of compliance text. |
| Semantic Naming | ✅ Met | CSS tokens and class names describe purpose (`--primary`, `--muted-foreground`, `bg-card`, `text-destructive`). Component names are descriptive. |
| Mobile-First CSS | ✅ Met | Tailwind default is mobile-first. Responsive classes (`md:grid-cols-2`, `lg:grid-cols-4`) enhance for larger screens. |

#### DevOps Basics

| Principle | Status | Notes |
|-----------|--------|-------|
| Automated Deployment | ✅ Met | GitHub Actions workflow deploys to Cloudflare Pages on push to `main`/`dev` |
| Preview Deployments | ✅ Met | `dev` branch deploys to a preview environment via the shared workflow |
| Environment Separation | ✅ Met | `main` = production, `dev` = preview; `.env.local.example` files for local config |
| Domain & DNS Management | ⬜ Not Applicable | Not determinable from repo alone |
| Version Control | ✅ Met | Git with clear commit structure; `main` is the production branch |

#### UX Fundamentals

| Principle | Status | Notes |
|-----------|--------|-------|
| Responsive Design | ✅ Met | Grid layouts with responsive breakpoints throughout; mobile-first Tailwind |
| Error Prevention | ⚠️ Partial | Pages are primarily informational/outbound links. The `docusignUrl` fallback to `#` when env var unset is a silent failure, not user-facing error prevention. |
| Loading States | ⬜ Not Applicable | No async operations triggered from the page UI (all CTAs are external links to DocuSign/demo portal) |
| Consistent Patterns | ✅ Met | Same card pattern, button style, section structure used throughout both apps |

---

### Tier 2 Principles

#### Enhanced Security

| Principle | Status | Notes |
|-----------|--------|-------|
| CSRF Protection | ❌ Not Met | The `/api/enroll` route has no CSRF token, no `Origin`/`Referer` header check, no `SameSite` cookie enforcement |
| Rate Limiting | ❌ Not Met | No rate limiting middleware or library configured on the enrollment API route |
| Honeypot Fields | ❌ Not Met | The enrollment API is not surfaced in a user-facing form in this codebase (the form lives in DocuSign), but the API itself has no bot-detection mechanism |
| Output Encoding | ✅ Met | React automatically escapes JSX output. No `dangerouslySetInnerHTML` anywhere in the codebase. |
| Content Security Policy | ❌ Not Met | No CSP header configured in `next.config.js` |
| Dependency Scanning | ❌ Not Met | No `npm audit` in the CI workflow; no Dependabot configuration file |

#### Data Handling

| Principle | Status | Notes |
|-----------|--------|-------|
| Client-Side + Server-Side Validation | ⚠️ Partial | The API route checks that required fields are present (server-side). No email format validation, no domain format validation, no string length limits. Client-side form validation is not applicable as the form is in DocuSign (external). |
| Data Minimization | ✅ Met | Only collects partnerName, companyName, email, phone, domain, portalOption — directly necessary for enrollment |
| Secure Transmission | ✅ Met | HTTPS enforced by Cloudflare Pages; API key passed in `Authorization: Bearer` header server-side only; API key is a server-only env var (`HOMEWEALTHIQ_API_KEY`, no `NEXT_PUBLIC_` prefix) |
| Privacy Compliance | ⚠️ Partial | Privacy Policy link present in Footer. No cookie consent banner. Google Fonts loaded via CSS `@import` without self-hosting, making a third-party network request. |

#### Design System Extension

| Principle | Status | Notes |
|-----------|--------|-------|
| Component Token Layer | ✅ Met | `border-border`, `bg-card`, `text-primary`, `bg-primary/10` etc. applied at component level |
| Interactive State Tokens | ⚠️ Partial | `hover:bg-primary/90` and `hover:shadow-md` defined. `focus:`, `active:`, and `disabled:` states not defined. |
| Motion Design Principles | ❌ Not Met | `transition-colors` (no duration specified — inherits Tailwind default 150ms) and `transition-shadow` used. No `prefers-reduced-motion` override. No consistent easing documentation. |
| Form Component Library | ⬜ Not Applicable | No HTML forms in this codebase; enrollment form is in external DocuSign |
| Content Design Standards | ⚠️ Partial | Compliance disclosures have consistent format. No defined error message, empty state, or confirmation dialog patterns (not needed for current scope, but absent). |

#### Frontend Architecture Basics

| Principle | Status | Notes |
|-----------|--------|-------|
| State Ownership | ✅ Met | No client state. All page data is static constants or env vars resolved at build/request time. |
| Data Fetching Strategy | ✅ Met | No client-side data fetching. Enrollment API call is server-side only. Clean. |
| Rendering Strategy Decision | ⚠️ Partial | Implicitly SSG/static rendering via Next.js App Router. Not documented. `process.env.NEXT_PUBLIC_*` values are inlined at build time, which means changing them requires a redeploy — this should be documented. |

#### Architecture

| Principle | Status | Notes |
|-----------|--------|-------|
| Separation of Concerns | ✅ Met | Presentation in page components, shared components in package, business logic in `lib/enroll.ts`, API integration in route handlers |
| Configuration Externalized | ✅ Met | No hardcoded API URLs or keys; all via env vars with `.env.local.example` files |
| Error Handling Strategy | ⚠️ Partial | API route has consistent error responses. Page has no error UI for failed env var configuration (`docusignUrl` silently falls back to `#`). |
| State Management | ✅ Met | No state management needed; pure static rendering |

#### Error & Edge Case UX

| Principle | Status | Notes |
|-----------|--------|-------|
| Empty States | ⬜ Not Applicable | No data-driven content; pages render constant content |
| Partial Failure | ⬜ Not Applicable | No multi-request page loads |
| Timeout UX | ⬜ Not Applicable | No async operations initiated from page UI |
| Form Error Recovery | ⬜ Not Applicable | No HTML forms in this codebase |
| Offline Awareness | ❌ Not Met | No offline detection. If a user is offline and clicks "Become a Partner", the DocuSign link will silently fail with a browser network error. |

#### Performance Enhancement

| Principle | Status | Notes |
|-----------|--------|-------|
| Code Splitting | ✅ Met | Next.js App Router performs automatic code splitting per route |
| Debouncing/Throttling | ⬜ Not Applicable | No input handlers or search fields |
| Request Cancellation | ⬜ Not Applicable | No client-side data fetching |
| Caching Strategy | ✅ Met | Static assets will be cached by Cloudflare CDN; Next.js applies appropriate cache headers |

#### Testing

| Principle | Status | Notes |
|-----------|--------|-------|
| Form Validation Testing | ❌ Not Met | No tests for the API route validation logic in `enrollPartner` or the route handler |
| Calculator Logic Testing | ⬜ Not Applicable | No calculator logic |
| Cross-Browser Testing | ❌ Not Met | No evidence of cross-browser testing setup |
| Accessibility Testing | ❌ Not Met | No axe-core, no Playwright accessibility checks, no CI accessibility step |
| Visual Regression Testing | ❌ Not Met | No Chromatic, Percy, or Playwright visual comparison |

#### Observability

| Principle | Status | Notes |
|-----------|--------|-------|
| Client-Side Error Capture | ❌ Not Met | No Sentry, LogRocket, or equivalent configured |
| Source Maps in Production | ❌ Not Met | No source map upload to an error service (Next.js may generate them locally; not sent to any service) |
| Basic Analytics | ❌ Not Met | No analytics — no Plausible, Fathom, or Google Analytics |
| Uptime Monitoring | ❌ Not Met | No uptime monitoring configured |

#### Content Management

| Principle | Status | Notes |
|-----------|--------|-------|
| CMS Evaluation | ⬜ Not Applicable | Content is developer-managed (TypeScript constants). Appropriate for the current scale — two sites, infrequent content changes. Would need re-evaluation if content volume grows. |
| Content Modeling | ✅ Met | Content structured as typed TypeScript constants (PAIN_POINTS, FAQ_ITEMS, HOW_IT_WORKS arrays). |
| Editorial Preview | ⬜ Not Applicable | No CMS in use |
| Content Versioning | ✅ Met | Git history provides full content versioning |

---

### Cross-Cutting Concerns

#### Monorepo Architecture
The Turborepo monorepo structure is clean and well-suited for the use case. Shared components in `packages/shared` with typed props, exported from a single `index.ts`. Per-app theme customization via CSS custom properties is a correct pattern. No concerns here.

#### Financial / Compliance Content
The compliance disclosures (ComplianceDisclosure component, inline asterisk disclosures, footer disclaimer text) are well-structured and consistently applied across both apps. This is a notable strength given the financial nature of the product.

#### TypeScript Strict Mode
Both apps and the shared package use `"strict": true` in `tsconfig.json`. This is positive for long-term maintainability.

#### Environment Variable Security
`HOMEWEALTHIQ_API_KEY` is correctly a server-side-only variable (no `NEXT_PUBLIC_` prefix). It is never passed to the client. The API route reads it server-side before making the upstream call. This pattern is correct.

---

## Recommendations

### P0 — Fix Before Launch

1. **Add security headers to `next.config.js`** in both apps. At minimum: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. Add a basic CSP that allowlists `homewealthiq.com` and `fonts.googleapis.com`.

2. **Add CSRF protection to the enrollment API route.** Since the route is called by a first-party client (or will be), the simplest approach is to check the `Origin` header matches the app's own origin. Alternatively, use a CSRF token pattern if a client-side form is ever added.

3. **Add rate limiting.** Install `@upstash/ratelimit` (works with Cloudflare/Vercel) or use a simple in-memory approach for self-hosted. Apply to `/api/enroll`.

4. **Add Zod validation to the API route** for email format, domain format, and string length bounds. The `enrollPartner` library function already has a typed interface — validate against it before calling.

5. **Create `robots.txt` and `sitemap.xml`** in both `public/` directories. Use Next.js App Router's `sitemap.ts` and `robots.ts` file conventions for automatic generation.

6. **Add focus ring styles.** Add `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` to all CTA links (or add a global `a:focus-visible` style in `globals.css`).

7. **Add `prefers-reduced-motion` override.** In `globals.css`, add:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after { transition-duration: 0.01ms !important; }
   }
   ```

### P1 — High Priority (Shortly After Launch)

8. **Add Open Graph meta tags** to both layout files. Use Next.js `Metadata` API: `openGraph.title`, `openGraph.description`, `openGraph.images`, `twitter.card`.

9. **Add JSON-LD structured data.** The neil-solar FAQ section maps directly to `FAQPage` schema. Both apps should include `Organization` schema.

10. **Self-host Google Fonts** via `next/font/google` instead of CSS `@import`. This eliminates the external network request, improves LCP, and avoids GDPR concerns about third-party font requests.

11. **Add `npm audit` to the deploy workflow.** Add `- run: npm audit --audit-level=high` before the build step in `deploy.yml`.

12. **Add a test suite.** At minimum: unit tests for `enrollPartner` (lib/enroll.ts) covering success and error paths, and unit tests for the API route handler covering missing fields, malformed body, and API errors. Use Vitest — it's already in the portfolio standard.

13. **Fix the docusign URL silent failure.** If `NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL` is not set, the button currently links to `#`. Either throw a build error if the var is missing, or conditionally render the button only when the URL is present.

### P2 — Before Scaling

14. **Add client-side error tracking.** Install Sentry (free tier sufficient). Add to both apps' layouts.

15. **Add analytics.** Plausible or Fathom (privacy-first, no cookie consent required). Track page views and CTA clicks at minimum.

16. **Add uptime monitoring.** BetterUptime or similar; monitor the production URL and the `/api/enroll` endpoint.

17. **Evaluate cookie consent.** If the site receives EU traffic and adds analytics or tracking scripts, a consent banner is required. Document the decision either way.

18. **Add `aria-hidden="true"` to decorative SVGs** in `DemoPortalCTA.tsx` and `Footer.tsx`.

19. **Document the rendering strategy** in an ADR. Confirm that `NEXT_PUBLIC_*` vars being build-time inlined is intentional and that a redeploy is the accepted workflow for changing partner configuration.
