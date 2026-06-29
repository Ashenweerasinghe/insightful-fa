# TASKS.md

## Purpose

This is the working task queue for the Insightful Financial Analytics website. It defines what needs to happen, in what order, and the state of each task — specific enough that a fresh agent session can pick up the next step without guessing.

Tasks are grouped by build phase. Phases are completed in order; within a phase, tasks are ordered by dependency. IDs are stable — do not renumber.

## Task states

- `not started`
- `in progress`
- `done`
- `blocked` — include reason
- `deferred` — intentionally moved out of current scope

---

## Phase 0 — Project scaffold & tooling

### P0-01: Initialize Next.js App Router + TypeScript project

- **Status:** done
- **Depends on:** none
- **Description:** Scaffold a Next.js (App Router) app with TypeScript in strict mode, sources under `/src`. No starter boilerplate UI — strip the default template page. Set up the `app/(marketing)` route group with a placeholder `page.tsx` and `layout.tsx`.
- **Exit criteria:** `npm run dev` serves a blank/placeholder marketing page; `npm run build` succeeds; `tsconfig` has `"strict": true`. Verify per TESTING.md → "Phase 0 scaffold".

### P0-02: Install and configure Tailwind CSS

- **Status:** done
- **Depends on:** P0-01
- **Description:** Add Tailwind, PostCSS, and `globals.css`. No token values yet — just the working pipeline. Content globs cover `/src`.
- **Exit criteria:** A Tailwind utility class applied in the placeholder page renders correctly in the browser. Build still passes.

### P0-03: Configure ESLint + Prettier

- **Status:** done
- **Depends on:** P0-01
- **Description:** ESLint (Next + TypeScript config) and Prettier with agreed formatting. Add `lint` and `format` npm scripts.
- **Exit criteria:** `npm run lint` passes on the scaffold; Prettier formats consistently.

### P0-04: Wire fonts (Newsreader, Public Sans, IBM Plex Mono)

- **Status:** done
- **Depends on:** P0-02
- **Description:** Load the three brand fonts via `next/font` and expose them as CSS variables (`--font-serif`, `--font-sans`, `--font-mono`) on `<html>`/`<body>`. Source: design token spec → "Font family tokens".
- **Exit criteria:** Each font renders on the placeholder page; no layout shift; variables resolve in devtools.

### P0-05: Base marketing layout + globals

- **Status:** done
- **Depends on:** P0-02, P0-04
- **Description:** Establish `app/layout.tsx` (html lang, metadata defaults, font variables, body background) and `app/(marketing)/layout.tsx`. Set the warm off-white background and base text color from tokens (added in P1-01).
- **Exit criteria:** Page shows the editorial background + base typography; metadata defaults present; build/lint pass.

---

## Phase 1 — Design tokens & primitives

### P1-01: Define CSS-variable tokens (`styles/tokens.css`)

- **Status:** done
- **Depends on:** P0-05
- **Description:** Transcribe the full token set from `docs/get-started/design_token_theming_system_insightful_fa.md` into `:root` CSS variables — raw primitives (bone/ink/olive/amber/rust/forest/warning), semantic tokens (background/text/border/surface/signal), typography scale, line-height, tracking, spacing, section spacing, containers, grid gaps, radius, shadow, motion (duration + easing), z-index, texture. Organize by category.
- **Exit criteria:** All documented tokens exist as variables with the exact spec values; no missing or duplicated values. Verify per TESTING.md → "Token compliance".

### P1-02: Extend Tailwind theme to consume tokens

- **Status:** done
- **Depends on:** P1-01
- **Description:** Map semantic tokens into the Tailwind theme so utilities read from CSS variables and there is a single source of truth.
- **Note (DEC-016):** Tailwind v4 is CSS-first — do this via the `@theme` directive in CSS (`styles/globals.css` / `tokens.css`), not a `tailwind.config.js` theme.extend. Phase 0 already wired the `font-*` utilities this way; P1-02 extends the same pattern to colors, spacing, radius, shadow.
- **Exit criteria:** Token-based utilities (e.g. `bg-background-primary`, `text-text-secondary`) work; arbitrary values are unnecessary for normal styling.

### P1-03: Typography utilities + text primitives

- **Status:** done
- **Depends on:** P1-02
- **Description:** Centralize typography in `styles/typography.css` and build `Heading` (display/heading scales), `Text` (body scales), `EyebrowLabel` (mono, uppercase, wide tracking), `MetaText`. No scattered font styling elsewhere.
- **Exit criteria:** Each component renders at the correct scale/leading/tracking from tokens; a sample of all scales reviewed in the browser.

### P1-04: Layout primitives

- **Status:** done
- **Depends on:** P1-02
- **Description:** Build `Container` (narrow 720 / default 1200 / wide 1440), `Section` (hero / editorial / transitional / cta spacing variants), `Stack` (token spacing), `Grid` (grid-2 / grid-3 / editorial-asymmetry), `Divider`. Source: component inventory.
- **Exit criteria:** A demo page composes them with correct margins, section rhythm, and responsive behavior; spacing values come only from tokens.

### P1-05: Button + CTAGroup

- **Status:** done
- **Depends on:** P1-03
- **Description:** `Button` (primary / secondary / text) and `CTAGroup`. Quietly premium, restrained hover (soft transition, no scale/glow), token radius and height.
- **Exit criteria:** All variants render; hover/focus states are subtle and keyboard-accessible; reduced-motion respected.

---

## Phase 2 — Navigation & layout shell

### P2-01: Navbar

- **Status:** done
- **Depends on:** P1-05
- **Description:** Minimal, calm top navigation: Home, Framework, About, Resources, Contact. No mega-menus, no aggressive sticky CTA. Source: sitemap + component inventory (Navbar).
- **Exit criteria:** Renders across breakpoints; links route correctly; calm hover; accessible landmarks.

### P2-02: MobileMenu

- **Status:** done
- **Depends on:** P2-01
- **Description:** Slide-over mobile menu — spacious, minimal link count, calm typography. Client component.
- **Exit criteria:** Opens/closes accessibly (focus trap, ESC, aria), generous tap targets, reduced-motion respected.

### P2-03: Footer + FooterCTA

- **Status:** done
- **Depends on:** P1-04
- **Description:** Four-column footer (Brand / Navigation / Resources / Legal) per sitemap, plus the `FooterCTA` conversation invitation. Calm, minimal — no giant sitemap clutter.
- **Exit criteria:** Footer renders responsively; FooterCTA reads as a thoughtful invitation, not a funnel.

### P2-04: Marketing layout composition + reveal-motion baseline

- **Status:** done
- **Depends on:** P2-01, P2-03
- **Description:** Compose Navbar + content + Footer in the marketing layout. Add a shared, restrained reveal primitive (fade-up on scroll) in `components/motion`, honoring `prefers-reduced-motion`. Source: motion spec + frontend architecture (motion architecture).
- **Exit criteria:** Pages share the shell; fade-up reveal is subtle and slow; disabling motion removes animation cleanly.

---

## Phase 3 — Homepage

### P3-01: HeroSection

- **Status:** done
- **Depends on:** P2-04
- **Description:** Two-column hero (~45% content / ~55% illustration), content order: eyebrow → editorial headline → supporting paragraph → primary + secondary CTA. Use approved headline/CTA language from the copy architecture. Add a `HeroIllustration` placeholder wrapper preserving negative space.
- **Exit criteria:** Matches hero anatomy + spacing; headline uses Newsreader at display scale; CTAs use approved language; stacks correctly on mobile (illustration below content).

### P3-02: ProblemSection

- **Status:** done
- **Depends on:** P3-01
- **Description:** Editorial two-column problem section: label → headline → narrative → key visibility points, with subtle diagrammatic/environmental support (not a dashboard). Copy themes from copy architecture (lagging indicators, hidden operational risk).
- **Exit criteria:** Reads as calm recognition (not fear); restrained visual support; whitespace rhythm preserved.

### P3-03: FrameworkSection + FrameworkCard

- **Status:** done
- **Depends on:** P3-01
- **Description:** Introduce the four-step framework — Observe → Connect → Forecast → Respond — using lightweight, structured `FrameworkCard`s (signal marker / step number, title, supporting copy). No card-grid overload, no heavy shadows/gradients.
- **Exit criteria:** Four steps render with calm progression; cards are editorial and token-styled; subtle hover only.

### P3-04: OutcomesSection + OutcomeCard + signal viz

- **Status:** done
- **Depends on:** P3-01
- **Description:** Translate the framework into outcomes via `OutcomeCard`s, with restrained `SignalIndicator` / `ForecastLine` visuals. Subtle, analytical — never trading-terminal or KPI overload.
- **Exit criteria:** Outcomes read as practical value; any viz is minimal, token-colored, readable, and accessible.

### P3-05: CredibilitySection + QuoteBlock

- **Status:** done
- **Depends on:** P3-01
- **Description:** Humanizing philosophy/founder-perspective section with `QuoteBlock`, editorial asymmetry, increased whitespace (emotional decompression). Tone: thoughtful, human, experienced.
- **Exit criteria:** Section reads calm and human; layout uses controlled asymmetry; spacing increased vs. prior sections.

### P3-06: Homepage assembly + metadata

- **Status:** done — code + automated gate green (lint/tsc/build/format), axe clean, objective visual checks pass at 1440/375, owner visual sign-off received 2026-05-26. Lighthouse baseline still to be recorded.
- **Depends on:** P3-02, P3-03, P3-04, P3-05
- **Description:** Compose Hero → Problem → Framework → Outcomes → Credibility → FooterCTA in `app/(marketing)/page.tsx` with strong vertical rhythm. Add page `metadata` (title, description, openGraph, twitter).
- **Exit criteria:** Full homepage flows with calm pacing; Lighthouse + axe pass per TESTING.md → "Homepage"; metadata present.

---

## Phase 4 — Core pages

### P4-01: Framework page

- **Status:** done (owner visual sign-off 2026-05-26; committed) — `src/app/(marketing)/framework/page.tsx`: thesis hero (`ForecastLine`) → four-step `FrameworkCard` system (Observe→Connect→Forecast→Respond) → "why reporting reacts" (`SignalTimeline`) → philosophy `QuoteBlock`. One `<h1>`, two section `<h2>`s, metadata via root template. Reuses primitives/composites only. lint/tsc/build/format green; `e2e/framework.spec.ts` + axe pass; no mobile overflow, h1 48→64px.
- **Depends on:** P3-06
- **Description:** `/framework` — the "how we think" page: systems thinking, why reporting is reactive, how operational signals connect to financial outcomes. Strategic, educational, calm. Source: sitemap (Framework page architecture).
- **Exit criteria:** Page renders with editorial hierarchy; reuses primitives/sections; metadata present; tests pass.

### P4-02: About page

- **Status:** done (owner visual sign-off 2026-05-26; committed) — `src/app/(marketing)/about/page.tsx`: philosophy hero → perspective (editorial-asymmetry) → four hairline pillars (h3, not boxed cards) → experience → working-style list. Thoughtful/human, no resume-dumping; one `<h1>`, four `<h2>`s. Reuses primitives only. lint/tsc/build/format green; `e2e/about.spec.ts` + axe pass; no mobile overflow.
- **Depends on:** P3-06
- **Description:** `/about` — philosophy, perspective, experience, working style, CTA. Thoughtful and human; not resume-driven or self-promotional.
- **Exit criteria:** Page renders; tone matches brand voice; reuses primitives; tests pass.

### P4-03: Contact page

- **Status:** done (owner visual sign-off 2026-05-26; committed) — `src/app/(marketing)/contact/page.tsx`: calm invitation hero → "what a conversation looks like" + topics + **mailto** mechanism (primary "Book a consultation" + direct address link; placeholder `hello@insightfulfa.com`, DEC-039). No form back-end. The shell FooterCTA is suppressed here only (DEC-038). One `<h1>`, one `<h2>`. lint/tsc/build/format green; `e2e/contact.spec.ts` (mailto + suppression) + axe pass; no mobile overflow.
- **Depends on:** P3-06
- **Description:** `/contact` — low-pressure conversation entry point. Calm, consultative; no multi-field funnel or aggressive capture. (Form wiring/back-end is out of v1 scope — static or mailto/placeholder per a recorded decision.)
- **Exit criteria:** Page renders calm and high-trust; CTA language approved; tests pass.

---

## Phase 5 — Resources / MDX

### P5-01: MDX content pipeline + frontmatter schema

- **Status:** done (pending owner visual sign-off) — `@next/mdx` (DEC-042): `next.config.ts` wraps `createMDX` with `remarkPlugins: ["remark-frontmatter"]` (string form for Turbopack) + `pageExtensions`; `src/mdx-components.tsx` maps MDX → token primitives (h1/h2→Heading, p→Text body-lg, lists, blockquote, hr→Divider, code/pre); `src/types/content.ts` (frontmatter schema + 4-category union); `src/lib/content/resources.ts` (fs + `gray-matter`, boundary validation, newest-first) + `format-date.ts`; `.article-body` reading rhythm in `typography.css`. 3 sample articles authored.
- **Depends on:** P3-06
- **Description:** Configure MDX rendering for `content/resources`, with the frontmatter schema from the frontend architecture spec (title, description, publishedAt, author, category, featured, ogImage).
- **Exit criteria:** A sample MDX article renders through the editorial layout with valid frontmatter; build passes. ✓ — articles prerender static SSG; build warning-free.

### P5-02: ResourceCard + Resources index

- **Status:** done (pending owner visual sign-off) — `src/components/cards/resource-card.tsx` (editorial, no thumbnails, whole-card link, hairline border, title-underline hover, focus ring) + `src/app/(marketing)/resources/page.tsx`: hero → inline featured lead (eyebrow label + whole-block link, h2 with `group-hover` title-underline — matches `ResourceCard`, no CTA button; DEC-064) → `grid-2` of `ResourceCard`s (h3) on a lifted section → calm empty-state. Featured-lead + restrained list per DEC-043; no filtering/pagination. Shell FooterCTA closes the page (no page CTA). Reveal below-fold only.
- **Depends on:** P5-01
- **Description:** `/resources` index listing articles via `ResourceCard` (editorial, minimal — no thumbnail-heavy blog-template look). Categories from sitemap.
- **Exit criteria:** Index lists sample content with calm editorial cards; routes to articles; tests pass. ✓ — `/resources` prerenders static; `e2e/resources.spec.ts` + axe pass.

### P5-03: Article layout

- **Status:** done (pending owner visual sign-off) — `src/app/(marketing)/resources/[slug]/page.tsx`: `dynamicParams=false` + `generateStaticParams` + `generateMetadata` (inherits shared OG, DEC-045); narrow (720px) reading layout, single `<h1>` (title, display ramp) + category eyebrow + byline/date in `text-secondary` (not MetaText, DEC-031); MDX body via dynamic `import()` inside `.article-body`, **not** wrapped in Reveal (DEC-027); `notFound()` for unknown slugs. Verified: body headings start at h2; h1 64→48px, body h2 48→40px (h1>h2 at both breakpoints); body 18px/1.7 primary ink.
- **Depends on:** P5-01
- **Description:** Long-form reading layout: narrow container, typography rhythm, editorial spacing, optional illustration integration. No dense article or SEO-spam formatting.
- **Exit criteria:** A sample article reads spaciously with strong hierarchy; accessible heading order; tests pass. ✓ — `e2e/article.spec.ts` (one h1, h2 body order, byline/date, reduced-motion) + axe pass.

---

## Phase 6 — Pre-launch hardening & technical SEO

### P6-01: app/sitemap.ts

- **Status:** done (pending owner visual sign-off) — `src/app/sitemap.ts`: 5 static routes (home → `${SITE_URL}` with no trailing slash to match the canonical link tag; framework / about / contact / resources at lifecycle-appropriate `changeFrequency` / `priority` per DEC-047) + 3 article entries from `getAllResources()` (article `lastModified = new Date(publishedAt)`). `MetadataRoute.Sitemap` typed; static SSG; `/sitemap.xml` listed `○ (Static)` in build output.
- **Depends on:** P5-01
- **Description:** App Router sitemap emitted statically; reuses the resources content helper rather than re-reading MDX.
- **Exit criteria:** `/sitemap.xml` served with `application/xml`, contains every static route + every article URL. ✓ — verified by `e2e/seo.spec.ts`.

### P6-02: app/robots.ts

- **Status:** done (pending owner visual sign-off) — `src/app/robots.ts`: single `User-Agent: *` / `Allow: /`, absolute `Sitemap:` line; no per-bot rules, no `/_next/` disallow (DEC-048). `MetadataRoute.Robots` typed; static.
- **Depends on:** P6-01
- **Description:** Marketing-site-appropriate robots.txt — open allow + pointer to the absolute sitemap.
- **Exit criteria:** `/robots.txt` served with `text/plain`, contains User-Agent, Allow, and Sitemap directives. ✓ — verified by `e2e/seo.spec.ts`.

### P6-03: app/icon.tsx + app/apple-icon.tsx

- **Status:** done (pending owner visual sign-off) — `src/app/icon.tsx` (32×32) + `src/app/apple-icon.tsx` (180×180): `ImageResponse`-based "i" monogram (ink dot + ink stem on bone), no font fetch (geometry only). Token hexes inlined as in DEC-036 / `opengraph-image.tsx`. `size` / `contentType` exports per Next 16 convention; both prerendered static. `<link rel="icon" sizes="32x32" type="image/png">` + `<link rel="apple-touch-icon" sizes="180x180">` emitted in every `<head>`. No `public/favicon.ico` (would shadow). Reversible when owner provides a logo asset (DEC-049). **Superseded (DEC-063, P7-14):** the owner supplied a logo — `icon.tsx` is deleted, the favicon is now a static `src/app/icon.svg` (real mark on bone), and `apple-icon.tsx` renders the real mark.
- **Depends on:** none
- **Description:** Site-wide favicon + apple touch icon; token-driven, no external dep.
- **Exit criteria:** Both routes render as static PNGs; head links present; visible in a browser tab. ✓ — head links inspected; tab favicon pending owner spot-check.

### P6-04: app/not-found.tsx + MarketingShell

- **Status:** done (pending owner visual sign-off) — `src/components/layout/marketing-shell.tsx` extracted from `(marketing)/layout.tsx` (skip link + Navbar + `<main id="main">` + FooterCTASlot/FooterCTA + Footer). `src/app/(marketing)/layout.tsx` now thin-wraps `MarketingShell`. `src/app/not-found.tsx` (root) uses `MarketingShell` + a calm hero (eyebrow "404 — Not found", h1 "This page is not part of the system.", supporting body, `Return home` / `Explore the resources` CTAs) — unmatched URLs inherit the same navigation as every other page (DEC-050). Status code 404 honored; FooterCTA visible (only `/contact` suppresses, DEC-038); title template yields `Page not found · Insightful Financial Analytics`. 1280px: h1 64px, CTAs in a row; 375px: h1 48px, CTAs stack vertically — no horizontal overflow either viewport.
- **Depends on:** P2-04
- **Description:** Editorial 404 inside the shell. Reuses primitives only; approved vocabulary; calm, no hype.
- **Exit criteria:** Unmatched URL renders inside Navbar + Footer with the correct h1 and CTAs; status 404; axe clean. ✓ — `e2e/nav.spec.ts` (`404 page renders inside the marketing shell (Phase 6)`) + `e2e/a11y.spec.ts` (route added to ROUTES) all green.

### P6-05: Per-article JSON-LD + canonical

- **Status:** done (pending owner visual sign-off) — `src/app/(marketing)/resources/[slug]/page.tsx`: `generateMetadata` now exports `alternates.canonical = \`/resources/${slug}\`` (resolved against `metadataBase`, DEC-036); the page renders a `<script type="application/ld+json">` Article (DEC-051) before the first `<Section>` with `@context`, `@type: "Article"`, headline, description, datePublished (from `publishedAt`), author (`Person`), publisher (`Organization`, name + logo URL → `/icon`), `mainEntityOfPage` canonical. `image` omitted (Article doesn't require it; `/opengraph-image` is hash-routed at build, revisit if Rich Results validator flags). Standard `dangerouslySetInnerHTML` + `JSON.stringify` pattern.
- **Depends on:** P5-03, P6-03
- **Description:** Search-engine-ready structured data for evergreen essays; explicit canonical per article.
- **Exit criteria:** JSON-LD parses as schema.org Article; canonical link href matches absolute URL. ✓ — `e2e/seo.spec.ts` + `e2e/article.spec.ts` extension green.

### P6-06: Per-route canonical alternates

- **Status:** done (pending owner visual sign-off) — Added `alternates: { canonical: "<path>" }` to the `metadata` block on `(marketing)/page.tsx` (`/`), `framework/page.tsx`, `about/page.tsx`, `contact/page.tsx`, `resources/page.tsx`. Per-route Twitter fields **not** added — root layout's `twitter.card` + per-page `openGraph.{title,description}` produce correct Twitter cards via documented fallback (DEC-052). Homepage `title.absolute` kept intentionally (the brand-statement page title).
- **Depends on:** none
- **Description:** Belt-and-suspenders canonical declaration per page. Survives query-string crawls; explicit to anyone reading the page source.
- **Exit criteria:** `<link rel="canonical">` present in `<head>` on all 5 static pages with the expected absolute href. ✓ — `e2e/seo.spec.ts` per-route assertions green.

### P6-07: .env.example + .gitignore exception

- **Status:** done — `.env.example` at repo root with `NEXT_PUBLIC_SITE_URL=https://insightfulfa.com` (and a one-line explanation of what reads it). `.gitignore` keeps its blanket `.env*` rule and adds `!.env.example` immediately after so the example is tracked; `git status` shows `.env.example` as visible to git (DEC-053). Adds `/lighthouse/` to `.gitignore` (Phase 6's HTML reports are environmental snapshots, not source).
- **Depends on:** none
- **Description:** Documented production env var + tracked example for fresh clones and Vercel.
- **Exit criteria:** `.env.example` is tracked; baseline domain is recorded. ✓

### P6-08: Lighthouse baseline

- **Status:** done (pending owner visual sign-off) — `lighthouse` (^12.8.2) added as a devDep (DEC-046) + `npm run lighthouse` helper script. Baseline recorded against `npm start` (production) for all 8 routes: uniformly **Perf 95 / A11y 100 / SEO 100 / BP 100** — clears Perf ≥ 90 / A11y ≥ 95 / SEO ≥ 95 with room. HTML reports under `lighthouse/` (gitignored); numeric tuples in PROGRESS.md. Rerun procedure documented in PROGRESS (kill `npm start` before any `npm test` run to avoid Playwright's `reuseExistingServer` corruption).
- **Depends on:** P6-01..P6-07
- **Description:** First real Lighthouse baseline — closes a carryover open since Phase 3.
- **Exit criteria:** Numeric scores recorded in PROGRESS.md, all routes ≥ thresholds. ✓

### P6-09: Playwright extensions

- **Status:** done (pending owner visual sign-off) — New `e2e/seo.spec.ts` (sitemap.xml served + every URL present; robots.txt served + open allow + Sitemap line, case-insensitive on `User-Agent`; per-route canonical link href; per-article Article JSON-LD parses and matches expected shape including `/icon` publisher logo). `e2e/nav.spec.ts` adds a 404-in-shell test (status 404, banner + contentinfo visible, h1 matches, `Return home` link). `e2e/a11y.spec.ts` adds `/this-route-does-not-exist` to ROUTES (no critical/serious axe). `e2e/article.spec.ts` adds a canonical + JSON-LD smoke assertion. Total: **39 tests**, all green against `npm run dev`.
- **Depends on:** P6-01..P6-06
- **Description:** Verification harness for the new SEO surfaces and the 404 page.
- **Exit criteria:** All new + existing tests green. ✓

---

## Phase 7 — Visual assets & optimization

### P7-01: Image asset optimization pipeline

- **Status:** done (2026-05-30, DEC-066) — `hero-campfire.png` (3.8 MB) → `hero-campfire.webp` (**259 KB**, q75, 1536×1024, **flattened onto bone `#f7f2e8`**; 93% cut). Reusable `scripts/optimize-illustration.mjs` + `npm run optimize:img` (sharp, declared devDep; writes a sibling WebP, exits non-zero over 500 KB); convention in CONVENTIONS.md → "Image assets (DEC-066)". `next.config.ts` untouched (next/image delivers optimized WebP, JPEG fallback for non-WebP clients). Gate green: lint / tsc / build / format:check; e2e 37 pass (the 2 failures are the pre-existing Hero-V2 copy mismatch in `home.spec`/`nav.spec`, unrelated); Lighthouse `/` Perf 92–95 (median 93) ≥ 90. PNG removed from the tree (recoverable from git `250cb35`). **Flatten fix:** the initial transparent WebP rendered black-edged in next/image's JPEG fallback (non-WebP clients); flattening onto the bone page bg fixes it in every format and is smaller — verified on `insightful-fa.vercel.app`.
- **Depends on:** P3-01
- **Description:** The current hero raster (`public/illustrations/hero-campfire.png`, 1536×1024 RGBA, ~3.8 MB) ships unoptimized. Establish a repeatable convention for content imagery: source-size cap (~1920px max edge), lossy compression via a standard tool (squoosh, `sharp` CLI, or similar), optional pre-generation of WebP/AVIF when `next/image` runtime conversion is insufficient, and a short documented note in CONVENTIONS.md so any new `/public/illustrations/*` asset goes through the same treatment before commit. Applies to the hero asset and any additional images added subsequently.
- **Exit criteria:** Hero PNG (and any siblings present) shrunk to a reasonable source size (target <500 KB without visible degradation); convention captured in CONVENTIONS.md; homepage Lighthouse Perf still ≥ 90 (re-baseline if it shifts).

### P7-02: Interactive ForecastLine — cursor rule + tooltip

- **Status:** done
- **Depends on:** P7-01
- **Description:** Upgrade `src/components/data-viz/forecast-line.tsx` from a static SVG to a `"use client"` interactive component. On `onMouseMove`, a vertical cursor rule tracks the pointer's X position across the viewBox; a dot slides along the Bezier curve to the corresponding Y value (cursor math via `SVGPathElement.getPointAtLength()` lookup table populated in `useEffect` on mount). A Framer Motion `AnimatePresence`/`motion.div` tooltip fades in showing either the current signal level as a percentage of threshold, or "Signal detected" when the cursor crosses x≈252 (the threshold-crossing point). `onMouseLeave` dismisses the overlay. Under `prefers-reduced-motion` (via `useReducedMotion`), the tooltip appears and disappears instantly. All colors via CSS tokens. Keep `aria-hidden="true"` on the wrapper — meaning lives in the adjacent caption. Add `"use client"` directive to this component only; surrounding sections stay server-rendered.
- **Exit criteria:** Cursor rule tracks mouse in real time; dot follows the curve correctly; "Signal detected" label appears at/past the threshold; reduced-motion makes tooltip instant (no animation); lint/tsc/build pass; visual editorial review confirms calm, non-dashboard feel.

### P7-03: Interactive SignalTimeline — dot and connector hover tooltips

- **Status:** done
- **Depends on:** P7-01
- **Description:** Upgrade `src/components/data-viz/signal-timeline.tsx` to a `"use client"` interactive component. Add three hover targets via transparent SVG hit areas: (1) amber signal dot at (96, 40) → tooltip "Early signal detected · Week 3"; (2) rust impact dot at (288, 56) → tooltip "Financial impact visible · 12 wk later"; (3) transparent rect covering the dashed connector → tooltip "~12-week lead time". `useState` for `activeTarget`; `AnimatePresence`/`motion.div` using `DURATION.fast` + `EASE_SOFT` from `src/lib/motion/tokens.ts`. Under `prefers-reduced-motion`, tooltips appear instantly. Keep `aria-hidden="true"` on the wrapper.
- **Exit criteria:** All three hover targets reveal distinct, correctly positioned tooltips; tooltips dismiss cleanly; reduced-motion respected; lint/tsc/build pass; visual editorial review — tooltips feel informational, not playful.

### P7-04: SignalIndicator — inline interactive metric accent

- **Status:** done
- **Depends on:** P7-02, P7-03
- **Description:** Build `src/components/data-viz/signal-indicator.tsx` — a `"use client"` component. A 24×24 SVG mark (circle ring + center dot) using `currentColor` (color injected via inline style from the `variant` prop). On hover, a Framer Motion tooltip reveals a `metricValue` string + a small trend arrow SVG + a brief `metricLabel` string. `variant` prop: `"signal"` (amber, `--signal-focus`) | `"warning"` (rust, `--signal-warning`) | `"positive"` (green, `--signal-success`). Optional `trend` prop: `"up"` | `"down"` | `"flat"`. Under `prefers-reduced-motion`, tooltip appears instantly. `aria-hidden="true"` on the SVG mark; tooltip text is supplementary.
- **Exit criteria:** All three variants render with correct color; hover reveals tooltip with metric + arrow + label; dismiss on mouse-leave; reduced-motion respected; lint/tsc/build pass.

### P7-05: Homepage integration — interactive viz wired into OutcomesSection and ProblemSection

- **Status:** done
- **Depends on:** P7-02, P7-03, P7-04
- **Description:** The in-place upgrades to `ForecastLine` and `SignalTimeline` automatically appear on the homepage and Framework page (no section file changes needed for these). Update `OutcomeCard` to accept optional `metric` and `metricLabel` props and render a `SignalIndicator variant="signal"` when provided. Update `OutcomesSection` to pass illustrative metric data to each card. Verify server/client boundary: `"use client"` is confined to the three viz component files; `OutcomesSection`, `ProblemSection`, and `OutcomeCard` remain server-renderable. Re-run Lighthouse on `/` and confirm Perf ≥ 90.
- **Exit criteria:** Interactive ForecastLine and SignalTimeline appear on homepage; OutcomeCards each carry a SignalIndicator with metric data; server/client boundary verified; lint/tsc/build pass; Lighthouse Perf ≥ 90 on `/`; visual editorial review confirms no dashboard feel.

> **Note (2026-05-29):** P7-02–P7-05 were subsequently enriched under P7-06–P7-10 (DEC-058) after the owner judged the result too sparse. The `getPointAtLength()` cursor math, the hardcoded SVG coordinates, and the per-component tooltip duplication described above were all replaced. The task blocks below are the current implementation.

### P7-06: d3 helpers + pure `src/lib/data-viz/` module

- **Status:** done
- **Depends on:** P7-05
- **Description:** Add `d3-shape` + `d3-scale` (+ `@types/*` devDeps) as pure, tree-shakeable math helpers (DEC-058). Create a server-safe `src/lib/data-viz/` module: `geometry.ts` (`makeScales`, `linePath`, `areaPath`, `nearestByX` wrapping d3), `types.ts` (`Pt`, `Scales`, `SignalVariant`, `SignalTrend`), and per-chart data modules (`forecast-data.ts`, `timeline-data.ts`, `indicator-data.ts`) that hold the chart data and compute derived geometry at module load. No React, no DOM, no `"use client"` — safe to import anywhere.
- **Exit criteria:** `npx tsc --noEmit` passes; modules are pure (no DOM/React imports); d3 imported only from the submodule packages (never the `d3` meta-package).

### P7-07: Shared `VizTooltip` primitive

- **Status:** done
- **Depends on:** P7-06
- **Description:** Create `src/components/data-viz/viz-tooltip.tsx` — a `"use client"` primitive owning the `AnimatePresence` + `motion.div` + panel chrome + `prefers-reduced-motion` degradation once, so the three viz components stop repeating it. Props: `open`, `motionKey`, `style`, `className`, `children`. Must isolate the caller's static anchor `transform` onto an inner element (Framer Motion drives `transform` for the `y` fade and would otherwise clobber it — this was a latent flip/offset bug).
- **Exit criteria:** All three viz components consume `VizTooltip`; tooltip flip/offset renders correctly (verified — left-flip no longer overflows); reduced-motion makes it instant; lint/tsc/build pass.

### P7-08: ForecastLine enrichment

- **Status:** done
- **Depends on:** P7-06, P7-07
- **Description:** Rebuild `forecast-line.tsx` data-driven from `forecast-data.ts`: translucent single-hue area fill, hairline gridlines, a faint subordinate reporting-lag comparison line, visible data points, mono x-axis week labels + a "Risk threshold" label, and a `pathLength` stroke draw-on reveal (in-view, reduced-motion-safe per the `Reveal` pattern). Replace the `getPointAtLength` lookup with `nearestByX` (cursor snaps to a real data point). Keep the crossing emphasis and `aria-hidden` wrapper.
- **Exit criteria:** Curve crosses the threshold near the original beat; reporting-lag line is clearly subordinate; labels don't collide at mobile widths; cursor + flipped tooltip work; reduced motion renders fully drawn; lint/tsc/build pass; editorial review — calm, not a dashboard.

### P7-09: SignalTimeline enrichment

- **Status:** done
- **Depends on:** P7-06, P7-07
- **Description:** Rebuild `signal-timeline.tsx` data-driven from `timeline-data.ts`: a faint magnitude track (line + low-opacity area) building across the span, two emphasized event dots (amber signal, rust impact) sitting on the track, an always-visible measured lead-time **brace** with a "~12 weeks" annotation, and a mono week axis. Axis + track draw on in view; brace/dots fade in. Three hover hit areas still drive one tooltip via `VizTooltip`. Keep `aria-hidden` wrapper.
- **Exit criteria:** Lead time legible at rest (brace); event hover tooltips work; reduced motion renders fully drawn; labels fit at mobile widths; lint/tsc/build pass; editorial review — informational, not a terminal.

### P7-10: SignalIndicator enrichment + accessibility

- **Status:** done
- **Depends on:** P7-06, P7-07
- **Description:** Add an inline always-present micro-trend sparkline (from `indicator-data.ts`, `currentColor`) beside the ring+dot. **Fix the a11y gap:** the metric previously mounted only on mouse hover. Make the mark focusable (`tabIndex=0`, `role="img"`, `aria-label` carrying value + label + trend), open the tooltip on `onFocus`/`onBlur` as well as hover, with a visible `--signal-focus` focus ring matching the Button pattern. Decorative SVGs and the visual tooltip stay `aria-hidden` to avoid double announcement.
- **Exit criteria:** Sparkline renders per trend; metric reachable by keyboard + screen reader (axe scan on `/` clean); tooltip on hover and focus; reduced motion instant; lint/tsc/build pass.
- **Update (2026-05-29):** the OutcomeCard use of this component was **removed** under P7-12 (design review); `SignalIndicator` + `indicator-data.ts` deleted.

### P7-11: Per-page chart variants (compact / detailed)

- **Status:** done
- **Depends on:** P7-08, P7-09
- **Description:** Add a `variant: "compact" | "detailed"` prop to `ForecastLine` and `SignalTimeline` (default `compact`). Homepage keeps `compact`; the Framework page passes `detailed`. ForecastLine detailed: framework-phase labels (Observe → Connect → Forecast → Respond) along the axis + a faint "window to act" band (`PHASE_MARKERS`, `LEAD_BAND` in `forecast-data.ts`). SignalTimeline detailed: several disconnected systems' tracks converging into one financial impact + an "across systems" label (`SYSTEM_TRACKS`, `SYSTEMS_LABEL` in `timeline-data.ts`), replacing the single magnitude track. One component each — branch on the prop, no forked files.
- **Exit criteria:** Homepage charts unchanged; Framework charts visibly richer + on-message; labels fit at mobile widths; still editorial (no dashboard density); lint/tsc/build pass; axe clean.

### P7-12: Remove OutcomeCard SignalIndicator (design review)

- **Status:** done
- **Depends on:** P7-10
- **Description:** Per the design review, remove the `SignalIndicator` (dot + micro-trend sparkline) from `OutcomeCard` — identical on all four cards, its only differentiating content hidden behind a touch-inaccessible hover, and a sparkline implies a trend the qualitative outcomes lack. Cards revert to a calm statement under the amber dash. Delete `signal-indicator.tsx`, `indicator-data.ts`, and the `SignalVariant`/`SignalTrend` types; drop the `metric`/`metricLabel` props from `OutcomeCard`/`OutcomesSection`. Reverses the card use in P7-04/P7-05/P7-10. See DEC-060.
- **Exit criteria:** No `SignalIndicator` in the tree; cards read as calm editorial statements; nothing else imports the deleted modules; lint/tsc/build pass; axe clean.

### P7-13: Chart labels as HTML overlays (consistent type size)

- **Status:** done
- **Depends on:** P7-11
- **Description:** SVG `<text>` scales with the viewBox, so chart labels rendered much larger on the wide Framework hero than on the homepage. Add `src/components/data-viz/viz-label.tsx` (`VizLabel`) — an HTML overlay `<span>` positioned by viewBox percentage (same technique as `VizTooltip`), at real CSS px (`text-meta-sm`). Convert every label in `ForecastLine` and `SignalTimeline` (axis/phase labels, "Risk threshold", "window to act", week labels, brace "~12 weeks", "across systems") from SVG `<text>` to `VizLabel`; remove all SVG `<text>`. Spread the ForecastLine phase markers evenly so the fixed-size labels don't collide on narrow viewports.
- **Exit criteria:** Labels are a consistent CSS px on all pages/viewports (no scaling with chart width); no SVG `<text>` remains in the charts; no label collisions down to ~270px chart width; lint/tsc/build/format pass.

### P7-14: Real brand logo — navbar / footer / favicon / app icon

- **Status:** done (pending owner sign-off on the navbar treatment) — Owner-supplied logo (ribbon mark + 3-line stacked "Insightful / Financial / Analytics" wordmark). Assets in `public/icons/` (`logo-wordmark.svg`, `logo-wordmark-inverse.svg`, `logo-mark.svg` — square `getBBox` crop of the mark); new `src/components/brand/logo.tsx` (`<Logo variant>`) + generated `logo-art.ts`. **Navbar** = full lockup via `next/image` (`h-[var(--space-xl)]` = 48 px, decorative; home link keeps `aria-label`), bar padding `--space-xs` so it fills the bar (~65 px). **Footer** = full lockup via `next/image` (`unoptimized`, `h-[var(--space-3xl)]`, `self-start` so the box matches the artwork ~178 px, not the stretched flex column ~428 px). After an owner re-crop of `logo-wordmark.svg` (viewBox 205.8×84), the `<Logo>` `next/image` dims were synced to 206×84 to avoid distortion. **Favicon** = circular bone badge `src/app/icon.svg` (replaces the bone square, archived as `public/icons/logo-mark-square.svg`); `logo-wordmark-inverse.svg` removed (unused — single bone theme). DEC-063. Static `src/app/icon.svg` (mark on bone) replaces the deleted `icon.tsx`; `apple-icon.tsx` renders the real mark via `ImageResponse`. DEC-063; closes the DEC-049 carryover.
- **Depends on:** P2-01, P2-03, P6-03 (supersedes the P6-03 placeholder icon)
- **Description:** Wire the real brand logo into the navbar, footer, browser favicon, and iOS app icon, per ASSET-REQUIREMENTS (logos → `public/icons/`).
- **Exit criteria:** Logo visible in navbar + footer; `/icon.svg` + `/apple-icon` return 200 and draw the real mark; no `icon.tsx`/`icon.svg` conflict; lint/tsc/build pass. ✓ — lint 0, build green (both icons static, TS clean), routes 200, navbar/footer verified in preview (desktop + mobile). Navbar shows the full lockup (owner-confirmed); footer box stretch fixed.

---

## Phase 8: Copy revision (hybrid direction)

Adopts the owner's hybrid copy revision (DEC-067, DEC-068). Source of truth for exact strings: `docs/build/copy-revision-comparison.md`. Style: no em dashes (DEC-069). All tasks depend on P8-01; P8-10 is the closing gate. Implementation runs in a fresh thread.

### P8-01: Decisions, conventions, and docs

- **Status:** done (2026-06-07)
- **Depends on:** none
- **Description:** Log DEC-067 to DEC-070 in DECISIONS.md; add the no-em-dash rule to CONVENTIONS.md (Writing conventions); update the copy spec at `docs/build/copy-revision-comparison.md` to the owner's final hybrid wording; open Phase 8 in PROGRESS/TASKS.
- **Exit criteria:** DEC-067 to DEC-070 present and accepted; CONVENTIONS forbids em dashes; comparison doc reflects the final decisions; PROGRESS shows Phase 8 opened. Done.

### P8-02: Homepage section copy

- **Status:** done (2026-06-07) — hero body, problem h2/intro/four pains, framework h2 "The IFA Predictive Control Framework™", four outcomes, and the footer-CTA h2 applied; homepage metadata em dashes swept. Gate green; copy-asserting e2e updated under P8-10. DEC-071.
- **Depends on:** P8-01
- **Description:** Apply the approved copy to the homepage sections, using the exact strings in the comparison doc. Hero (`hero-section.tsx`): keep the eyebrow "Operational intelligence" and h1 "See the bear?", replace the body. Problem (`problem-section.tsx`): new h2, new intro, replace the five `VISIBILITY_POINTS` with the four concrete pains. Framework (`framework-section.tsx`): change the h2 to "The IFA Predictive Control Framework™", keep the Observe/Connect/Forecast/Respond steps. Outcomes (`outcomes-section.tsx`): replace the four `OUTCOMES`. Footer CTA (`footer-cta.tsx`): new h2. No em dashes.
- **Exit criteria:** each section renders the new copy; the ™ glyph displays correctly; no horizontal overflow at 375/1440; lint/tsc/build/format green. Verify per TESTING.md. (Copy-asserting e2e specs are updated in P8-10.)

### P8-03: "How we're different" section (new)

- **Status:** done (2026-06-07) — new heading-less `differentiators-section.tsx` (eyebrow + three contrast lines as a hairline list, bone-100 plane + top hairline) inserted between Outcomes and Credibility; no new h2, so the homepage stays at three. Reuses primitives only; axe clean. DEC-072.
- **Depends on:** P8-01
- **Description:** New `src/components/sections/differentiators-section.tsx` (eyebrow "How we're different" plus the three contrast lines from the comparison doc), inserted into `app/(marketing)/page.tsx` between OutcomesSection and CredibilitySection. Editorial and hairline, reusing Section/Container/Stack plus Reveal; no card-grid.
- **Exit criteria:** renders in the correct position; reuses primitives only; axe clean; gate green.

### P8-04: Framework page + FrameworkCard "in practice" lines

- **Status:** done (2026-06-07) — optional `inPractice?` prop on `FrameworkCard` (renders a `body-sm` "In practice:" line); the four deliverables added to the Framework-page `STEPS`; the name introduced in the "How it works" body intro (not a heading). Homepage `FrameworkSection` omits the prop, so it is unchanged; `framework.spec` stays green. DEC-073.
- **Depends on:** P8-01
- **Description:** In `app/(marketing)/framework/page.tsx`, introduce the framework by name. Add an optional `inPractice` prop to `src/components/cards/framework-card.tsx` and render a calm "In practice:" line under each of the four steps with the concrete deliverables (clean & standardize data / redesign & integrate processes / build dashboards with leading indicators, margin and cash-flow signals, early risk alerts / continuous adaptive control). The homepage `FrameworkSection` does not pass `inPractice`, so it is unchanged.
- **Exit criteria:** each of the four steps shows its in-practice line on the Framework page; homepage framework section unchanged; gate green; `e2e/framework.spec.ts` updated if it asserts copy.

### P8-05: About page copy

- **Status:** done (2026-06-07) — h1 → "Clarity comes from seeing how a business actually works."; "Stop reacting to the past. Start controlling the future." added as a non-heading hero subhead; the "no rip-and-replace, no disruption" reassurance added to Working style; About em dashes swept. No new h2; `about.spec` stays green. DEC-074 (subhead pattern).
- **Depends on:** P8-01
- **Description:** In `about/page.tsx`, set the hero h1 to "Clarity comes from seeing how a business actually works.", add "Stop reacting to the past. Start controlling the future." as a section subhead, and add the "We work inside the systems you already use: no rip-and-replace, no disruption to how your team operates." reassurance line (Working style or Experience). Keep the rest; do not add formal Vision/Mission blocks.
- **Exit criteria:** one h1; renders; gate green; `e2e/about.spec.ts` updated if needed.

### P8-06: Contact page copy

- **Status:** done (2026-06-07) — hero leads with the two diagnostic questions (h1 + non-heading lead); no-funnel body and mailto kept; inbox set to `connect@insightfulfa.com` (DEC-076); contact em dashes swept; no lead magnet / SMS / emoji. FooterCTA still suppressed here (DEC-038); `contact.spec` updated and green. DEC-074.
- **Depends on:** P8-01
- **Description:** In `contact/page.tsx`, open with the two diagnostic questions ("When do you usually find out you've missed your numbers? And how much time does that leave you to act on it?"); keep the calm no-funnel stance and the mailto mechanism (DEC-039). Do not add a lead magnet, SMS-consent language, or emojis.
- **Exit criteria:** renders; mailto intact; FooterCTA still suppressed here (DEC-038); gate green; `e2e/contact.spec.ts` green.

### P8-07: Footer social links

- **Status:** done (2026-06-07) — five social links (Instagram, LinkedIn, Facebook, YouTube, X) in the footer Brand column as inline CC0 Simple Icons glyphs (no dependency), each with an `aria-label` and `rel="noopener noreferrer"`; brand-tagline em dash fixed in the footer and the matching root-layout metadata. Inbox confirmed as `connect@` (DEC-076). axe clean. DEC-075.
- **Depends on:** P8-01
- **Description:** Add social links to `src/components/layout/footer.tsx` (Instagram, LinkedIn, Facebook, YouTube, X) using the URLs in the comparison doc, with accessible labels and restrained token-styled inline-SVG icons (no new dependency), `target="_blank"` plus `rel="noopener noreferrer"`. Confirm or replace the contact inbox placeholder (DEC-039 / DEC-070).
- **Exit criteria:** links render and open the correct URLs; accessible names present; axe clean; gate green.

### P8-08: Resources in the top nav (decision: keep)

- **Status:** done (2026-06-07) — resolution: Resources kept in the primary nav and footer (DEC-067 default; content exists). No code change.
- **Depends on:** P8-01
- **Description:** Per the DEC-067 default, keep Resources in the primary nav and footer (content exists). No code change required unless the owner later opts to hide it from the top nav (then remove it from `NAV_ITEMS` in `navigation/nav-items.ts` while keeping the footer link and route live).
- **Exit criteria:** nav unchanged; resolution recorded.

### P8-09: Terms and Privacy pages (deferred)

- **Status:** deferred (DEC-030 keeps Privacy/Terms out of v1 scope; owner deferred them this pass)
- **Depends on:** P8-01
- **Description:** If activated: add `/terms` and `/privacy` routes from Chats's provided copy (em-dash-free), wire the footer Legal column, and confirm the effective date and the real contact email. Supersedes DEC-030 when done.
- **Exit criteria:** pages render; footer Legal links resolve; gate green.

### P8-10: Verification and sign-off

- **Status:** done — automated gate green; pending owner visual sign-off (2026-06-07). Copy-asserting e2e updated (`home`, `nav`, `contact`); `framework`/`about`/`resources`/`article`/`seo` stay green. Gate: `npm run lint` (0), `npx tsc --noEmit` (0), `npm run build` (warning-free, articles still SSG), `npm run format:check` (clean), Playwright **39/39** (includes axe a11y), Lighthouse `/` **Perf 100**. Visual: all five pages + footer verified against a fresh production server at desktop, mobile, and reduced-motion; `™` renders, the Differentiators block sits between Outcomes and Credibility, the `#framework` anchor and CTAs resolve, the contact mailto opens `connect@insightfulfa.com`, and the five footer social links render as correct brand glyphs. Em-dash sweep across all visible site copy confirmed by re-grep (only code comments remain). DEC-077.
- **Depends on:** P8-02, P8-03, P8-04, P8-05, P8-06, P8-07
- **Description:** Update the e2e specs that assert copy (`home.spec`, `nav.spec`, `framework.spec`, and any others that check section text) to the new copy. Run the full gate (lint, tsc, build, format), the Playwright suite, axe, and a Lighthouse spot-check on `/`. Preview all five pages at desktop, mobile, and reduced-motion; confirm CTAs, the mailto, the `#framework` anchor, and the social links resolve.
- **Exit criteria:** gate green; e2e all pass; axe clean; Lighthouse `/` Perf >= 90; owner visual sign-off.

---

## Future work

Deferred beyond the current build — acknowledged to prevent scope creep, not yet committed:

- The planned docs 12–15 (SEO & Semantic Strategy, Content Strategy & Editorial Framework, Resource/Blog Architecture, Conversion Strategy & CTA System) — see the documentation roadmap
- Future pages: Industries, Case Studies, Framework Deep Dives, Services, Operational Assessments
- Dark mode / theme variants (token architecture already allows for this)
- Interactive framework diagrams or assessment tooling
