# Compliance Report — channel-partner-sites

**Date:** 2026-05-23
**Tier:** 2 — Interactive
**Framework Version:** Universal Web Development Principles v2.02.01
**Auditor:** Automated audit (Claude Opus 4.7) via `/compliance`
**Previous Audit:** 2026-03-19 (regression check included)

## Classification Reference

Tier 2 confirmed by `docs/architecture/PROJECT_CLASSIFICATION.md` (2 "yes" / 10 — Third-Party Integrations + Longevity; no escalation triggers). Tier 1 + Tier 2 principles apply, plus active cross-cutting concerns.

---

## Summary

| Status | Count |
|--------|------:|
| ✅ Met | 14 |
| ⚠️ Partial | 11 |
| ❌ Not Met | 22 |
| ⬜ Not Applicable | 4 |

**Overall Compliance:** ~53% of applicable principles met or partially met (25 of 47 applicable).
**Trend vs. 2026-03-19:** Regression. Prior audit reported 63%; this audit applies v2.02 (Structural Integrity) and verified more items against actual source rather than scaffold presence. The codebase has not materially advanced since the initial commit.

---

## Critical Gaps (Fix Before Launch)

The following ❌ items must be resolved before this site collects any real partner data in production:

1. **No lock file committed** (`Dependency Hygiene`) — `npm audit` cannot run; reproducible builds are not guaranteed. See "Cross-Cutting: Dependency Management".
2. **No security headers** (`Security Headers`, `CSP`) — `apps/*/next.config.js` defines no `headers()` function. HSTS, CSP, X-Frame-Options, Referrer-Policy, X-Content-Type-Options are all absent.
3. **No CSRF protection on `/api/enroll`** — POST route accepts cross-origin JSON with no origin check, no token, no SameSite cookie. See `apps/neil-solar/app/api/enroll/route.ts:4` and `apps/rich-financial/app/api/enroll/route.ts:4`.
4. **No rate limiting or honeypot on `/api/enroll`** — partner enrollment endpoint is trivially scriptable.
5. **No real input validation** — handler only checks field presence (`route.ts:27`). Email format, domain syntax, `portalOption` enum, length caps — none validated server-side. No client-side form exists at all.
6. **Privacy policy + cookie disclosure missing on this property** — Footer links to `homewealthiq.com/privacy` and `/terms` (external). This site collects partner contact data via `/api/enroll` and has no first-party privacy notice.
7. **Deploy build config is wrong** — `.github/workflows/deploy.yml:14` sets `output-directory: "dist"` but Next.js writes `.next/`. Either deploys are silently broken, or this pipeline has never successfully shipped these apps. Investigate before launch.
8. **Fallback rendering hides config errors** — `docusignUrl = process.env.NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL || '#'` (`apps/neil-solar/app/page.tsx:111`). The hero "Become a Partner" CTA silently becomes a no-op link if env var is unset — a Structural Integrity violation. Fail loudly at build time instead.

---

## Detailed Results

### Tier 1: Security Fundamentals
- ✅ **HTTPS Everywhere** — Cloudflare Pages enforces HTTPS at the edge; no `http://` literals in source.
- ❌ **Security Headers** — No middleware, no `headers()` in `next.config.js`, no `_headers` file in `public/`. Defaults from Cloudflare give no HSTS, no CSP, no X-Frame-Options, no Referrer-Policy.
- ❌ **Input Validation** — `route.ts:27` performs presence-only checks. No schema (zod/valibot), no email regex, no `portalOption` enum guard, no length caps. The body is forwarded to a downstream API which becomes a confused-deputy risk.
- ❌ **Dependency Hygiene** — `package-lock.json` is **not committed** at any workspace level. `npm audit` errors with `ENOLOCK`. Reproducibility, vulnerability scanning, and Renovate/Dependabot all break.

### Tier 1: Design System Basics
- ✅ **Semantic Tokens** — CSS variables on `:root` describe roles (`--primary`, `--destructive`, `--muted-foreground`), not appearance. Wired through `packages/shared/tailwind.config.js`.
- ✅ **Token Hierarchy** — Primitives → semantic CSS vars → Tailwind utilities. Components reference semantic names only.
- ✅ **Consistent Spacing Scale** — Tailwind default (4px base) used throughout; no ad-hoc pixel values in className strings.
- ✅ **Typography Scale** — Uses Tailwind type ramp (`text-xs`…`text-3xl`) consistently with serif/sans font families defined in shared config.
- ❌ **Icon System** — Inline SVGs in `DemoPortalCTA.tsx:21-39, 53-55` are hand-written, not from a system (Lucide/Phosphor). They include neither `aria-label` nor `aria-hidden`.
- ⚠️ **Responsive Breakpoint Strategy** — Uses Tailwind defaults (`sm` 640 / `md` 768 / `lg` 1024) — fine. No `clamp()` fluid typography; no container queries; not documented as a strategy.

### Tier 1: Performance
- ⚠️ **Core Web Vitals Targets** — Static-ish pages on Cloudflare edge should meet LCP/INP/CLS easily; **not measured**. Three Google Fonts faces (`DM+Sans` 4 weights + `Newsreader` 4 weights) imported via `@import url(...)` at the top of `globals.css:1` is a render-blocking pattern that hurts LCP. Use `next/font` instead.
- ⚠️ **Asset Optimization** — No imagery yet (`apps/*/public/` are empty). `next/image` is imported nowhere. When marketing imagery lands this will need rework.
- ⬜ **Lazy Loading** — N/A while there are no images, but the site is currently 100% above-the-fold static; no offscreen optimization required.
- ✅ **CDN Delivery** — Cloudflare Pages.

### Tier 1: Accessibility (WCAG 2.1 AA)
- ⚠️ **Semantic HTML** — `<section>`/`<h1>`/`<h2>`/`<h3>` hierarchy is reasonable on `page.tsx`. The FAQ list (`page.tsx:434-446`) is `<div>` soup rather than `<details>`/`<summary>` or a proper accordion — not keyboard-collapsible. Pain-points list uses `<div>`s instead of `<ul>`.
- ⚠️ **Keyboard Navigation** — Only `<a>` and `<a>` exist; nothing is keyboard-broken. But also nothing is interactive — no form, no menu. Will need verification when a real form is added.
- ⚠️ **Color Contrast** — Tokens look plausible but **not measured**. The `text-muted-foreground` (`hsl(215.4 16.3% 46.9%)`) on `bg-muted/30` is borderline. Run axe-core or Lighthouse against deployed pages before launch.
- ⬜ **Alt Text** — N/A (no images).
- ❌ **Focus Indicators** — No global focus-visible styles; Tailwind preflight removes browser default outline on buttons. CTA `<a>` elements have hover but no `focus:` ring class. Add `focus-visible:ring-2 focus-visible:ring-ring` to interactive elements.
- ❌ **Reduced Motion** — `prefers-reduced-motion` is not referenced anywhere. Multiple `transition-colors` and `transition-shadow` classes will animate regardless.

### Tier 1: SEO Fundamentals
- ⚠️ **Semantic HTML for Search** — Each app has a `<title>` and meta description via Next `Metadata` (`layout.tsx:4-8`). Two distinct apps share near-identical titles though — duplicate-content risk if both deploy to the same domain.
- ❌ **Open Graph & Social Tags** — No `og:*` or `twitter:card` metadata in either `layout.tsx`. Share previews will be bare.
- ❌ **Structured Data** — No JSON-LD anywhere. As a partnership marketing site, at minimum `Organization` + `FAQPage` schemas should exist (the FAQ block on `page.tsx:436-446` is a free win).
- ❌ **Technical SEO** — `public/robots.txt`, `public/sitemap.xml`, and `<link rel="canonical">` are all missing. No `next-sitemap` or framework equivalent configured.
- ⚠️ **Performance as SEO** — See Performance section. Render-blocking Google Fonts will hurt LCP and therefore ranking.

### Tier 1: Code Quality
- ✅ **Separation of Concerns** — Pages compose shared components from `packages/shared`; API route is its own module; design tokens live in CSS and Tailwind config.
- ✅ **DRY Principle** — `Footer`, `ComplianceDisclosure`, `IntegrationOptions`, `HEIExplainer`, `DemoPortalCTA` are properly shared via the workspace package. `enroll.ts` is shared.
- ✅ **Semantic Naming** — Variables (`FUNNEL_POSITIONS`, `WHAT_THEY_GET`, `embedUrl`) describe purpose. Tokens follow the system convention.
- ✅ **Mobile-First CSS** — Tailwind defaults to mobile-first; layouts use `sm:`/`md:`/`lg:` to enhance.

### Tier 1: DevOps Basics
- ⚠️ **Automated Deployment** — `.github/workflows/deploy.yml` exists, but `output-directory: "dist"` is wrong for Next.js (`.next/`). Either this has never run successfully or it has been quietly producing empty deploys. **Verify** in the Cloudflare Pages dashboard.
- ❌ **Preview Deployments** — Workflow triggers only on push to `main`/`dev`; PRs from feature branches get no preview URL.
- ⚠️ **Environment Separation** — `dev` branch + `main` branch exist via workflow; no `.env.example` documents required env vars (`NEXT_PUBLIC_DEMO_PORTAL_URL`, `NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL`, `NEXT_PUBLIC_HOMEWEALTHIQ_API_URL`, `HOMEWEALTHIQ_API_KEY`, `NEXT_PUBLIC_BD_PARTNER_ID`).
- ⚠️ **Domain & DNS Management** — Per registry: `channel-partner-sites.pages.dev` / `dev.channel-partner-sites.pages.dev`. No custom domain documented; no DNS notes in repo.
- ✅ **Version Control** — Git, GitHub remote configured; commit messages on recent commits are descriptive (conventional-commit style).

### Tier 1: UX Fundamentals
- ✅ **Responsive Design** — Layouts use grid/flex with breakpoints throughout.
- ❌ **Error Prevention** — There is no form on this site at all. The CTA links straight to a DocuSign URL. If the design ever brings the form in-house, this needs full validation work.
- ⬜ **Loading States** — N/A — no async operations from the browser today.
- ✅ **Consistent Patterns** — Both apps use the same shared components and the same primary-button visual treatment.

---

### Tier 2: Enhanced Security
- ❌ **CSRF Protection** — `/api/enroll` POST has no origin check, no double-submit cookie, no token. Any third-party page can POST to it.
- ❌ **Rate Limiting** — No middleware, no Cloudflare WAF rule, no `@upstash/ratelimit`, nothing. A bot can flood the downstream HomeWealthIQ API through this endpoint.
- ❌ **Honeypot Fields** — No form, no honeypot. When a form is added, this is required.
- ⚠️ **Output Encoding** — React escapes by default and there is no user-provided data displayed on the page today. No `dangerouslySetInnerHTML` anywhere — good. But the API echoes the downstream API's raw error text back in `route.ts:48` (`error: result.error`), which surfaces upstream internals.
- ❌ **Content Security Policy** — Not configured. Google Fonts (`fonts.googleapis.com`) would need to be in `style-src`/`font-src` once CSP is enabled.
- ❌ **Dependency Scanning** — No Dependabot config, no Snyk, no `npm audit` step in CI. Combined with the missing lockfile, dependency vulns are completely invisible.

### Tier 2: Data Handling
- ❌ **Client-Side Validation + Server-Side Validation** — Server: presence-only. Client: nonexistent (no form).
- ✅ **Data Minimization** — Enrollment schema is reasonable (`partnerName`, `companyName`, `email`, `phone`, `domain`, `portalOption`). No over-collection.
- ✅ **Secure Transmission** — HTTPS-only; sensitive fields go in POST body, not query string.
- ❌ **Privacy Compliance** — No cookie consent. No first-party privacy policy page (Footer links to homewealthiq.com). No disclosure of what `/api/enroll` does with the data. See Cross-Cutting: Privacy.

### Tier 2: Design System Extension
- ⚠️ **Component Token Layer** — Buttons re-implement `bg-primary px-X py-Y` inline in each page rather than a shared `<Button>` component with `variant`/`size` props. Tokens exist but no component layer wraps them.
- ❌ **Interactive State Tokens** — `:focus-visible`, `:active`, `:disabled` tokens not defined. Only `hover:bg-primary/90` is consistently used.
- ❌ **Motion Design Principles** — No documented durations/easings. `transition-colors` and `transition-shadow` use Tailwind defaults with no system. No `prefers-reduced-motion` handling.
- ❌ **Form Component Library** — No form components in `packages/shared/`. When a real enrollment form is built it will need `<Input>`, `<Select>`, `<Checkbox>`, validation-state styling.
- ⚠️ **Content Design Standards** — Microcopy is consistent within a page but no documented voice/tone guide; no patterns for empty/error/success states (there are no such states yet).

### Tier 2: Frontend Architecture Basics
- ⚠️ **State Ownership** — No client state today. `process.env.NEXT_PUBLIC_*` is read at module scope in pages — fine for SSG, but undocumented as a pattern.
- ⬜ **Data Fetching Strategy** — N/A — pages are static; only the API route fetches, and it does so once per request.
- ⚠️ **Rendering Strategy Decision** — Pages are de facto SSG (no `dynamic` exports, no data fetching). Not documented as an intentional choice. An ADR for "SSG + edge runtime via Cloudflare Pages" would close this.

### Tier 2: Architecture
- ✅ **Separation of Concerns** — Pages = composition; shared components = presentation; `lib/enroll.ts` = network; API route = boundary.
- ⚠️ **Configuration Externalized** — Env vars are used. However, defaults like `'neil-okun'` (`route.ts:42`) and `'#'` for DocuSign URL hide misconfiguration. No `.env.example` to document required vars.
- ⚠️ **Error Handling Strategy** — API route returns shaped JSON errors with HTTP codes. But the page surface has no error UX (no form, no error toasts).
- ⚠️ **State Management** — N/A while purely static; should be revisited when form lands.

### Tier 2: Error & Edge Case UX
- ❌ **Empty States** — N/A today, but no patterns defined for when the inevitable application form is added.
- ❌ **Partial Failure** — N/A.
- ❌ **Timeout UX** — N/A.
- ❌ **Form Error Recovery** — N/A.
- ❌ **Offline Awareness** — Not implemented.

### Tier 2: Performance Enhancement
- ⬜ **Code Splitting** — Next.js does route-level splitting by default; no calculator-style heavy code to split.
- ⬜ **Debouncing/Throttling** — N/A (no inputs).
- ⬜ **Request Cancellation** — N/A.
- ⚠️ **Caching Strategy** — Cloudflare Pages caches static output well by default. Google Fonts via `@import url(...)` bypass `next/font` caching/preload optimizations. No `Cache-Control` headers configured for the API route.

### Tier 2: Testing
- ❌ **Form Validation Testing** — No tests exist. No `*.test.*` or `__tests__/` directory anywhere in the repo.
- ❌ **Calculator Logic Testing** — N/A (no calculator) but the principle that `enroll.ts` should have unit tests for the response-handling branches still applies.
- ❌ **Cross-Browser Testing** — Not evidenced.
- ❌ **Accessibility Testing** — No axe-core, no Playwright a11y step in CI.
- ❌ **Visual Regression Testing** — Not configured.

### Tier 2: Observability
- ❌ **Client-Side Error Capture** — No Sentry / LogRocket / equivalent. The registry says `observability: "@getdigitalos/observability"` but that package is not declared as a dependency in any `package.json` and not imported anywhere. The expected wiring is missing.
- ❌ **Source Maps in Production** — Default Next.js prod build emits no source maps; none uploaded.
- ❌ **Basic Analytics** — None. No Plausible/Fathom/GA snippet.
- ❌ **Uptime Monitoring** — None documented.

### Tier 2: Content Management
- ⬜ **CMS Evaluation** — Content is hardcoded in `page.tsx` arrays. Acceptable for two hand-built partner pages, but doesn't scale to "many partners" — flag for ADR if the partner count grows.
- ⬜ **Content Modeling** / **Editorial Preview** / **Content Versioning** — N/A at current scope.

---

### Cross-Cutting: Structural Integrity (v2.02)

- ❌ **No swallowed errors** — `enrollPartner()` (`packages/shared/lib/enroll.ts:39-45`) returns `{ success: false, error: "...502 <html>..." }` instead of throwing — the API route then forwards downstream error text to the client (`route.ts:48`). This leaks upstream details and obscures the original failure type.
- ⚠️ **No manual sync steps** — Mostly clean; partner enrollment is automated via the API.
- ❌ **Actionable error messages** — `'API configuration missing'` (`route.ts:10`), `'Enrollment failed'` (fallback at `route.ts:50`), `'#'` as a DocuSign URL — none of these tell anyone what to do.
- ✅ **CLI commands support headless execution** — N/A (no project-specific CLI).
- ❌ **Source of truth is singular** — The `bdPartnerId` default `'neil-okun'` / `'rich-keal'` is duplicated as a hardcoded fallback in two `route.ts` files and as text strings in `Footer` props in the two `page.tsx` files. A single shared config object per partner would consolidate this.

### Cross-Cutting: Privacy & Data Protection (Tier 1 + Tier 2 checklist)

- ❌ **Privacy policy** — First-party page absent. Footer links to `homewealthiq.com/privacy`, which is a separate property.
- ❌ **Cookie disclosure** — Not present. No cookies are set today, but the project will likely add analytics; better to put the mechanism in now.
- ✅ **Secure form submission** — HTTPS-only.
- ✅ **Data minimization** — Fields collected are limited and justified.
- ❌ **Cookie consent mechanism** — None (no analytics yet, but planned per registry `observability` field).
- ⚠️ **Clear consent for marketing communications** — Form is not in-house yet; will need an explicit opt-in checkbox when it is.
- ❌ **Data retention awareness** — Nothing documents how long the downstream HomeWealthIQ-OS retains the partner enrollment data.
- ⚠️ **DPA with form processor** — Downstream is HomeWealthIQ (internal Barastone system) — no third-party DPA needed, but the data flow should be documented in the privacy policy.

### Cross-Cutting: AI/LLM Integration
- ⬜ **Not applicable** — No AI features, no LLM SDK dependencies, no AI-generated user-facing content.

### Cross-Cutting: Dependency Management
- ❌ **Lock files committed** — **Major gap.** No `package-lock.json` anywhere. Reproducible builds, `npm audit`, Dependabot all blocked. `package.json` declares `"packageManager": "npm@10.0.0"` so npm is expected.
- ✅ **Reasonable dependency count** — 3 runtime deps (`next`, `react`, `react-dom`); 6 devDeps. Lean.
- ⚠️ **Licenses** — Not audited (no tooling), but the declared deps are all permissive (MIT/Apache).
- ❌ **Audit in CI** — Not configured.

### Cross-Cutting: Project Hub Registration
- ✅ **Registered in Project Hub** — `C:/dev/project-hub/registry/projects.json` lines 1428–1457.
- ✅ **Tier matches classification** — Registry `tier: 2`, classification doc Tier 2.
- ✅ **Git remote configured** — `https://github.com/GetDigitalOS/channel-partner-sites.git`.
- ✅ **Dev port assigned** — `3308` (in Barastone range).
- ✅ **Status is current** — `status: "development"` matches reality.
- ⚠️ **Stack metadata accuracy** — Registry claims `observability: "@getdigitalos/observability"`, but the package is not installed and not imported in any source file. Either install it or remove the claim.
- ✅ **`last_audited` updated** — Updated to `2026-05-23` as part of this audit.

---

## Recommendations (Prioritized)

### 🔴 Critical (Security / Compliance / Launch Blockers)
1. **Commit `package-lock.json`** at the repo root (and any per-workspace locks npm produces). Run `npm install` once and commit the result. Unblocks `npm audit` and Dependabot.
2. **Fix `output-directory` in `.github/workflows/deploy.yml:14`** — Next.js does not produce a `dist/` directory. Either configure `@cloudflare/next-on-pages` and set output accordingly, or move to `next export` + `out/`. Verify a deploy completes end-to-end.
3. **Add security headers** — Define a `headers()` function in `apps/*/next.config.js` for `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and a baseline CSP. Or use a Cloudflare `_headers` file.
4. **Harden `/api/enroll`**: schema-validate the body with `zod`; enforce `Origin`/`Referer` allowlist; rate-limit (Cloudflare WAF or `@upstash/ratelimit`); add a honeypot if the form ever moves in-house.
5. **First-party privacy policy + cookie disclosure on this domain**. Footer links should resolve within the property where data is being collected.
6. **Fail loudly when required env vars are missing** — Remove the `|| '#'` and `|| ''` fallbacks in `apps/*/app/page.tsx`. Throw at build/render time so misconfigured deploys never ship.

### 🟡 Important (Quality / Reliability)
7. **Replace `@import url('https://fonts.googleapis.com/...')` in `globals.css:1`** with `next/font/google`. Eliminates render-blocking request, preloads fonts, removes a `style-src` exception you'd otherwise need in CSP.
8. **Add OG + Twitter card metadata and JSON-LD** (`Organization`, `FAQPage` from the existing FAQ array) in each `app/layout.tsx`.
9. **Add `public/robots.txt`, `public/sitemap.xml` (or `next-sitemap`), and `<link rel="canonical">`** per app.
10. **Wire up the declared observability package** — install `@getdigitalos/observability`, instrument the API route and the client root, upload source maps. Or update the registry to reflect that observability is not yet wired.
11. **Add focus styles and reduce-motion handling globally** in `globals.css` (e.g. `*:focus-visible { @apply ring-2 ring-ring outline-none; }` and a `@media (prefers-reduced-motion: reduce)` block that zeros transitions).
12. **Stop forwarding downstream API error text to the client** (`apps/*/app/api/enroll/route.ts:48`). Log the detail server-side; return a generic actionable message to the caller.
13. **Add at least smoke tests** — a Playwright test that renders each app and asserts the H1 and the primary CTA's `href`. A unit test for `enrollPartner`'s ok/non-ok branches.
14. **Set up PR preview deployments** — extend `deploy.yml` to run on `pull_request` events.

### 🟢 Recommended (Best Practice)
15. **Promote the inline `<button>`/`<a>` styles to a `<Button>` component** in `packages/shared/components/Button.tsx` with `variant`/`size` props.
16. **Replace hand-rolled SVGs in `DemoPortalCTA.tsx`** with `lucide-react` icons and add `aria-hidden="true"` to decorative icons.
17. **Convert the FAQ `<div>` blocks to `<details>`/`<summary>`** or a proper accordion with `aria-expanded`.
18. **Add `.env.example`** documenting `NEXT_PUBLIC_DEMO_PORTAL_URL`, `NEXT_PUBLIC_DOCUSIGN_ENROLLMENT_URL`, `NEXT_PUBLIC_HOMEWEALTHIQ_API_URL`, `HOMEWEALTHIQ_API_KEY`, `NEXT_PUBLIC_BD_PARTNER_ID`.
19. **Consolidate per-partner config** (name, BD id, footer name, DocuSign URL) into a shared `partners.ts` map indexed by app, sourced from one place instead of duplicated in `page.tsx` + `route.ts`.
20. **Write an ADR** for the rendering choice (SSG + edge) and one for "two apps now, N partners later — content model strategy."

---

## Next Review

- **If gaps 1–6 are addressed within 30 days:** re-audit on **2026-06-23**.
- **Before first production launch with real partner data:** re-audit immediately prior; this report's Critical Gaps are launch blockers.
- **Routine cadence after launch:** quarterly (next: **2026-08-23**).
