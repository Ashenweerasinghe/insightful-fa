# PROGRESS.md

## Purpose

This file is the current-state snapshot for the Insightful Financial Analytics website. A new human or agent should be able to read it and understand where things stand in under a minute. It is a dashboard, not a history log.

---

## Project snapshot

- **Project:** Insightful Financial Analytics — editorial marketing website
- **Current phase:** Phase 8 — Copy revision (hybrid direction) (**code complete; automated gate green; pending owner visual sign-off**). Phases 0–7 complete; Phase 8 applies the owner's hybrid copy across all five pages plus footer social links.
- **Current objective:** Phase 6 deliverables done — `sitemap.xml`, `robots.txt`, dynamic favicon + apple-icon, editorial 404, per-article Article JSON-LD, per-route canonical alternates, `.env.example`, and a recorded Lighthouse baseline. Remaining launch tasks are owner-supplied: real contact inbox (DEC-039) and `NEXT_PUBLIC_SITE_URL` in Vercel production env.
- **Overall status:** P6-01 → P6-09 complete (pending owner visual sign-off). New surfaces: `src/app/sitemap.ts` (8 URLs — 5 static pages + 3 articles, lastmod = article `publishedAt`), `src/app/robots.ts` (open allow + absolute sitemap reference), `src/app/icon.tsx` + `src/app/apple-icon.tsx` (ImageResponse-driven "i" monogram, geometry-only, no font fetch — DEC-049), `src/app/not-found.tsx` (editorial 404 inside the shell via the new `MarketingShell` component — DEC-050), per-article `@type: Article` JSON-LD + `alternates.canonical` in [`/resources/[slug]`](src/app/(marketing)/resources/[slug]/page.tsx) (DEC-051), per-route `alternates.canonical` on the five static pages (DEC-052), `.env.example` with `NEXT_PUBLIC_SITE_URL=https://insightfulfa.com` (DEC-053, `.gitignore` exception added). `MarketingShell` extracted to [src/components/layout/marketing-shell.tsx](src/components/layout/marketing-shell.tsx) and consumed by both the (marketing) layout and the root `not-found.tsx` so unmatched URLs inherit Navbar + Footer. Full automated gate green — `npm run lint` (0), `npx tsc --noEmit` (0), `npm run build` (sitemap/robots/icon/apple-icon/_not-found all listed as static, articles still SSG, warning-free), `npm run format:check`. e2e green (**39 tests**): prior 27 + new `seo.spec.ts` (sitemap/robots/canonical/JSON-LD) + nav 404-in-shell + a11y on `/this-route-does-not-exist` + article canonical/JSON-LD assertions; no critical/serious axe across all 7 audited routes including the 404. Lighthouse recorded against `npm start` for all 8 routes — uniformly **Perf 95 / A11y 100 / SEO 100 / BP 100** (clears Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 with room).
- **Previous phase (Phase 5):** Resources / MDX complete and committed (visual sign-off 2026-05-26) — `/resources` index + `/resources/[slug]` article layout via `@next/mdx` + `remark-frontmatter` + `gray-matter` (DEC-042); 3 sample articles, named byline (DEC-044); articles inherit the shared OG (DEC-045).
- **Test gotcha (still relevant):** Playwright `reuseExistingServer` will silently test a stale build if a `next start`/`next dev` is already on port 3000 — verify against a fresh `next dev` (check `netstat` first); `rm -rf .next` / `rm -rf test-results` between `next build` and `playwright test` on this OneDrive checkout (EPERM).
- **A11y note (DEC-031, signed off):** Phase 1's small-text neutrals failed WCAG AA on the bone bg. Darkened `--color-olive-500` (text-secondary) → `#676b67` (≈4.86:1) and used `text-secondary` for the footer copyright; `text-muted` unchanged (unused for small essential text in Phase 2).
- **Hero image load-fade (DEC-065, accepted — owner sign-off 2026-05-30):** the hero illustration now fades in (opacity-only) via a CSS `hero-image-fade` keyframe in `globals.css` (`--transition-slow` / `--ease-soft`); `HeroIllustration` stays a server component so the LCP element is not hydration-gated, and reduced-motion removes it. Establishes the cross-page image-motion principle — fade-up for grouped below-fold images (inherited from their section `Reveal`), opacity-only for solo / above-the-fold / hero-scale images. Pending Lighthouse re-check on `/` (Perf ≥ 90) + owner visual sign-off.
- **Last updated:** 2026-06-07

---

## Phase checklist

### Phase 0 — Scaffold & tooling
- [x] P0-01 Initialize Next.js App Router + TypeScript (strict)
- [x] P0-02 Install & configure Tailwind CSS
- [x] P0-03 Configure ESLint + Prettier
- [x] P0-04 Wire fonts (Newsreader, Public Sans, IBM Plex Mono)
- [x] P0-05 Base marketing layout + globals

### Phase 1 — Tokens & primitives
- [x] P1-01 Define CSS-variable tokens
- [x] P1-02 Extend Tailwind theme to consume tokens
- [x] P1-03 Typography utilities + text primitives
- [x] P1-04 Layout primitives (Container/Section/Stack/Grid/Divider)
- [x] P1-05 Button + CTAGroup

### Phase 2 — Navigation & layout shell
- [x] P2-01 Navbar
- [x] P2-02 MobileMenu
- [x] P2-03 Footer + FooterCTA
- [x] P2-04 Marketing layout composition + reveal-motion baseline

### Phase 3 — Homepage
- [x] P3-01 HeroSection
- [x] P3-02 ProblemSection
- [x] P3-03 FrameworkSection + FrameworkCard
- [x] P3-04 OutcomesSection + OutcomeCard + signal viz
- [x] P3-05 CredibilitySection + QuoteBlock
- [x] P3-06 Homepage assembly + metadata (Lighthouse baseline still to be recorded)

### Phase 4 — Core pages
- [x] P4-01 Framework page
- [x] P4-02 About page
- [x] P4-03 Contact page (mailto mechanism; FooterCTA suppressed here)

### Phase 5 — Resources / MDX
- [x] P5-01 MDX pipeline + frontmatter schema
- [x] P5-02 ResourceCard + Resources index
- [x] P5-03 Article layout

### Phase 6 — Pre-launch hardening & technical SEO
- [x] P6-01 `app/sitemap.ts` (8 URLs, static)
- [x] P6-02 `app/robots.ts` (open allow + absolute sitemap)
- [x] P6-03 `app/icon.tsx` + `app/apple-icon.tsx` (ImageResponse, geometry-only)
- [x] P6-04 `app/not-found.tsx` + `MarketingShell` extraction
- [x] P6-05 Per-article JSON-LD (`@type: Article`) + `alternates.canonical`
- [x] P6-06 Per-route `alternates.canonical` on the 5 static pages
- [x] P6-07 `.env.example` + `.gitignore` exception (`!.env.example`)
- [x] P6-08 Lighthouse baseline recorded
- [x] P6-09 Playwright extensions (new `e2e/seo.spec.ts`; nav/a11y/article extensions)

### Phase 7 — Visual assets, optimization & interactive data viz
- [x] P7-01 Image asset optimization pipeline (hero PNG → WebP, 3.8 MB → 466 KB; reusable script; DEC-066)
- [x] P7-02 Interactive ForecastLine — cursor rule + tooltip
- [x] P7-03 Interactive SignalTimeline — dot and connector hover tooltips
- [x] P7-04 SignalIndicator — inline interactive metric accent (new component)
- [x] P7-05 Homepage integration — interactive viz wired into OutcomesSection + OutcomeCard
- [x] P7-06 d3 deps + pure `src/lib/data-viz/` geometry & data modules (DEC-058)
- [x] P7-07 Shared `VizTooltip` primitive + refactor all three viz onto it
- [x] P7-08 ForecastLine enrichment (area fill, gridlines, lag line, data points, mono labels, draw-on; data-driven cursor)
- [x] P7-09 SignalTimeline enrichment (magnitude track, lead-time brace + always-visible annotation, week axis)
- [x] P7-10 SignalIndicator enrichment (micro-trend sparkline) + a11y (focusable, `aria-label`, focus tooltip) — _superseded by P7-12_
- [x] P7-11 Per-page chart variants — compact (home) / detailed (Framework)
- [x] P7-12 Remove OutcomeCard SignalIndicator (design review; supersedes the card use in P7-04/P7-05/P7-10)
- [x] P7-13 Chart labels → HTML overlays (`VizLabel`) for consistent type size across pages/viewports

### Phase 8: Copy revision (hybrid direction)
- [x] P8-01 Decisions + conventions + comparison-doc update (DEC-067 to DEC-070; no em dashes)
- [x] P8-02 Homepage section copy
- [x] P8-03 "How we're different" section (new)
- [x] P8-04 Framework page + FrameworkCard "in practice" lines
- [x] P8-05 About page copy
- [x] P8-06 Contact page copy
- [x] P8-07 Footer social links
- [x] P8-08 Resources in top nav (keep; no code change)
- [ ] P8-09 Terms + Privacy pages (deferred, DEC-030)
- [x] P8-10 Verification + sign-off (automated gate green; owner visual sign-off pending)

---

## What is in progress

**Phase 8 (copy revision), implemented 2026-06-07 — code complete, pending owner visual sign-off:** Owner reviewed a friend's (Chats's) alternative copy draft and chose a hybrid direction, captured in [docs/build/copy-revision-comparison.md](docs/build/copy-revision-comparison.md). P8-02 → P8-08 + P8-10 are done (DEC-071 to DEC-077); P8-09 (Terms/Privacy) stays deferred (DEC-030). Applied verbatim from the comparison doc: homepage hero body, the Problem h2/intro and four concrete pains, the framework h2 "The IFA Predictive Control Framework™", the four outcomes, and the footer-CTA h2 "See it before it reaches the numbers." (DEC-071); a new heading-less `DifferentiatorsSection` ("How we're different", three contrast lines) between Outcomes and Credibility (DEC-072); an optional `inPractice` prop on `FrameworkCard` with the four deliverables, and the framework name introduced in the Framework-page body (DEC-073); the About h1 trimmed plus a "Stop reacting to the past..." subhead and a "no rip-and-replace" reassurance line; the Contact hero leading with the two diagnostic questions, keeping the no-funnel mailto, with the inbox set to **connect@insightfulfa.com** (DEC-074, DEC-076); five footer social links as inline CC0 Simple Icons glyphs, no dependency (DEC-075). **Em dashes swept from all visible site copy** (revised pages, the 404, the OG image, Resources, and the three MDX articles), code comments deferred — re-grep confirms only comments remain (DEC-077). Resources stays in the top nav (DEC-067 default). **Gate:** lint 0, tsc 0, build warning-free (articles still SSG), format clean, Playwright **39/39** (incl. axe), Lighthouse `/` **Perf 100**; all five pages + footer visually verified (desktop / mobile / reduced-motion). Owner visual sign-off is the only open item.

**Phase 7 — interactive data viz complete (P7-02 → P7-05, 2026-05-29):** `ForecastLine` and `SignalTimeline` upgraded from static SVGs to `"use client"` interactive components with pointer tracking, Framer Motion tooltips, and `prefers-reduced-motion` degradation. New `SignalIndicator` component added (`src/components/data-viz/signal-indicator.tsx`). `OutcomeCard` extended with optional `metric`/`metricLabel` props; `OutcomesSection` updated to pass illustrative metric data to each card. Server/client boundary confined to the three viz files — sections remain server-rendered. `ASSET-REQUIREMENTS.md` created as an illustrator/designer delivery brief (now at [`docs/get-started/ASSET-REQUIREMENTS.md`](docs/get-started/ASSET-REQUIREMENTS.md), relocated per DEC-059). DEC-056 and DEC-057 logged. P7-01 (image optimization) remains not started.

**Phase 7 — data-viz enrichment (P7-06 → P7-10, 2026-05-29):** the three charts were judged too sparse and rebuilt richer, still editorial (no dashboard density). Added `d3-shape` + `d3-scale` as pure math helpers (DEC-058) and a server-safe `src/lib/data-viz/` module (`geometry.ts` + per-chart data); the components stay `"use client"` leaves and `/` + `/framework` still prerender static. New shared `VizTooltip` primitive dedupes the tooltip/motion block across all three. ForecastLine: area fill, hairline gridlines, faint reporting-lag comparison line, data points, mono week + "Risk threshold" labels, stroke draw-on, data-driven cursor (no more `getPointAtLength`). SignalTimeline: magnitude track, always-visible "~12 weeks" lead-time brace, week axis. SignalIndicator: inline micro-trend sparkline + **a11y fix** (focusable `role="img"` + `aria-label` + focus-triggered tooltip — metric is now exposed to keyboard/SR users, not hover-only). Fixed a latent tooltip-flip bug (Framer Motion `transform` clobbered the static anchor transform). Gate: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run format:check` all pass; Playwright axe scans on `/` and `/framework` clean. DEC-058 + DEC-059 logged.

**Phase 7 — design-review follow-up (P7-11 → P7-12, 2026-05-29, DEC-060):** (1) Removed the `SignalIndicator` from `OutcomeCard` — it was identical on all four cards, hid its only differentiating content behind a touch-inaccessible hover, and a sparkline implied a trend the qualitative outcomes don't have. Cards revert to a calm statement under the amber dash; deleted `signal-indicator.tsx` + `indicator-data.ts` + the `SignalVariant`/`SignalTrend` types (reverses the card use in P7-04/P7-05/P7-10). (2) Added a `variant` prop so the charts differ per page: homepage stays `compact`; the Framework page uses `detailed` — ForecastLine labels the Observe→Connect→Forecast→Respond phases + a "window to act" band, and SignalTimeline shows several disconnected systems converging into one impact ("across systems"). Verified on `/` and `/framework`, desktop + mobile; lint/tsc/build/format clean; e2e 37 pass (the 2 failures are the pre-existing Hero-V2 copy mismatch in `home.spec`/`nav.spec`, unrelated). `SignalIndicator` is dropped from the implemented component set (diverges from the `component_inventory` spec — logged in DEC-060, not edited).

**Phase 7 — consistent chart type (P7-13, 2026-05-29, DEC-061):** chart labels were SVG `<text>` (which scales with the viewBox), so they rendered ~2× larger on the wide Framework hero than on the homepage. Converted every chart label to an HTML overlay `<span>` (new `VizLabel`, same percentage positioning as `VizTooltip`) → real CSS px, a flat 11px on every page/viewport (verified: 11px at both 388px and 797px chart widths; no SVG `<text>` remains). Spread the ForecastLine phase markers (weeks 2/7/11/15) so the now-fixed-size labels don't collide on mobile. Verified desktop + mobile on `/` and `/framework`; gate clean.

**Phase 7 — chart reveal fix (DEC-062, 2026-05-29):** the line reveals used Framer Motion `pathLength` (draw-on), which breaks with `vectorEffect="non-scaling-stroke"` above 1:1 scale — on the wide Framework page the timeline tracks/axis rendered incompletely (didn't reach the impact dot). Replaced `pathLength` with an opacity fade (faint lines fade via a wrapping `motion.g` to preserve per-line opacity; axis is now static). Verified at desktop scale: tracks reach the impact dot (x≈316.5), axis spans full width (x2=336), `stroke-dasharray: none`. Gate clean.

**Brand logo wired in (DEC-063, 2026-05-29):** owner supplied the real logo (ribbon **mark** + 3-line stacked "Insightful / Financial / Analytics" **wordmark**). Placed in `public/icons/` (`logo-wordmark.svg`, `logo-wordmark-inverse.svg`, `logo-mark.svg` — a square `getBBox` crop of the mark); new `src/components/brand/logo.tsx` (`<Logo variant="lockup" | "mark">`) + generated `logo-art.ts` (mark geometry). **Navbar** shows the **full lockup** via `next/image` at `h-[var(--space-xl)]` (48 px) with bar padding `--space-xs` (8 px) so it fills the bar (~65 px tall) — wordmark legible on desktop + mobile (owner reviewed a mark-only nav first, then chose to keep the wordmark; the `mark` variant stays in `<Logo>`). **Footer** shows the full lockup via `next/image` at `h-[var(--space-3xl)]` (96 px), with `self-start` so its box matches the artwork (~178 px) instead of stretching to the flex-column width (~428 px — the `Stack` defaults to `align-items: stretch`). Owner then re-cropped `logo-wordmark.svg` tight (viewBox → 205.8×84); `<Logo>`'s `next/image` `width`/`height` synced to 206×84 (else the optimizer distorts it). Favicon is now a **circular bone badge** (`src/app/icon.svg`, ~1.6 KB) replacing the bone square (archived as `logo-mark-square.svg`); `logo-wordmark-inverse.svg` **removed** (unused — single bone theme, OG image is light-bg text). All via DEC-063. **Favicon** is now static [`src/app/icon.svg`](src/app/icon.svg) (mark on bone) replacing the deleted `icon.tsx`; [`apple-icon.tsx`](src/app/apple-icon.tsx) renders the real mark via `ImageResponse`. Closes the DEC-049 carryover. Verified: `npm run lint` (0), `npm run build` green (`/icon.svg` + `/apple-icon` both static, no conflict, TS clean), all icon/asset routes 200, navbar + footer render, `/apple-icon` PNG draws the mark.

**Resources featured-lead consistency (post-Phase 5 refinement, P5-02, 2026-05-30, DEC-064):** the `/resources` featured lead now matches the `ResourceCard` interaction — the whole block is one `<Link>` (clickable, pointer, focus-ring) carrying the card's `group-hover` title-underline, and "Featured" is an `EyebrowLabel` section label (mono/uppercase, like "More writing") above a bare `{category} · {date}` line. Removed the "Read article" `Button`; **no card outlines** (rejected as conflicting with DEC-043's restrained list + the "no card-grid overload" rule — the whole-block click + hover-underline carry the affordance). One file ([`resources/page.tsx`](src/app/(marketing)/resources/page.tsx)); `Button` import dropped, `next/link` added; featured keeps its larger `heading-xl` scale. Title stays the single `<main>` h2 and the eyebrow a `<p>`, so `e2e/resources.spec.ts` stays green (2/2). Gate: `npm run lint` (0), `npx tsc --noEmit` (0), `npm run format` clean; preview-inspect confirmed the eyebrow's computed mono/uppercase styles equal "More writing", the title hover classes, no border on the lead, pointer cursor, and the featured link target returns 200. **Spacing + plane follow-up (same day, two rounds):** trimmed the intro hero padding 180→128 (`py-[var(--section-space-md)]`) to kill ~308px of dead air (now 256px to the featured), and reworked the section backgrounds so the page **alternates bone-100 → bone-50 → bone-100 → bone-50** (hero / featured / more-writing / footer-cta) — featured lifted to bone-50, "More writing" flipped to bone-100 — so every `border-t` hairline lands on a tone change instead of dividing two identical bone-50 fills (owner rejected the same-color hairline that round 1's all-bone-50 stack produced). Verified by preview-inspect (plane order alternates; hero padding 128/128). (Visual screenshot pending — the preview image-capture path hung transiently this session; structural snapshot + computed-style inspection substitute.)

**Hero V2 iteration (post-Phase 6, P3-01 revisit) — proposed, pending owner visual sign-off:**

- Placeholder `HeroIllustration` SVG swapped for a candidate woodcut-style raster ([`public/illustrations/hero-campfire.webp`](public/illustrations/hero-campfire.webp), 1536×1024 with feathered alpha so it blends into `--background-primary` without a hard rectangle; optimized from the original 3.8 MB PNG under P7-01 / DEC-066). Rendered via `next/image` (priority, decorative). See DEC-054.
- Hero copy retargeted to anchor the illustration: h1 "See the bear?" + subhead "Most businesses don't. …" See DEC-055.
- Hero layout tuned to compensate for the short headline: section vertical padding `--section-space-lg` → `--section-space-md` (180px → 128px); column ratio inlined to 0.7fr/1.3fr (~35/65) instead of the shared `editorial-asymmetry` 0.8fr/1.2fr — the Grid primitive is unchanged so the 5 other sections that consume it (framework/about×2/credibility/outcomes) keep their original proportions. `HeroIllustration` `sizes` updated to match (`65vw` desktop). Implementation detail of DEC-054.
- **Button + CTAGroup responsive fix.** Owner reported button text wrapping to two lines inside each button at 1974×1564. Root cause: `Button` had no `whitespace-nowrap` so text wrapped when the flex parent shrank, and `CTAGroup` had no `flex-wrap` so it shrank items instead of wrapping rows. Added `whitespace-nowrap` to the Button base + `sm:flex-wrap` to CTAGroup. Affects every CTA on the site, not just the hero.
- **Cross-viewport QA harness** at [scripts/qa-snapshots.mjs](scripts/qa-snapshots.mjs) (full-page screenshots across 6 routes × 7 viewports = 42 combos, programmatic overflow + console + network checks; scrolls each page to trigger IntersectionObserver-based `Reveal` animations before snapshot) + a port-detector at [scripts/find-dev-server.mjs](scripts/find-dev-server.mjs). `qa/` is gitignored. Manual reusable QA — not part of the e2e suite. Clean baseline: **42 combos, 0 issues** (no horizontal overflow, no console errors, no network failures).
- **Geist 404 investigation closed.** Initial sweep surfaced `__nextjs_font/geist-latin.woff2` "failures" on 3 phone-small routes. Root cause: Next.js dev tools overlay loads Geist for its own UI (route info indicator, error overlay) via the `/__nextjs_font/` endpoint, which exists only in dev. The "failures" were `ERR_ABORTED` — in-flight requests aborted when the harness navigated between viewports. The endpoint itself returns 200 with valid font data when not interrupted. **Dev-only artifact; will not appear in production** (`/__nextjs_font/` is not emitted in `next build`). Harness filter added so future sweeps don't surface this false positive.
- **Repo cleanup.** Deleted stale `public/illustrations/hero-campfire-old.png` (3.7 MB unreferenced leftover from the hero image swap). Audited for create-next-app stragglers — none found: no default `public/favicon.ico` (DEC-049 absent-by-design), no `public/next.svg` / `vercel.svg` / `globe.svg` / `file.svg` / `window.svg`, no root `app/page.tsx` or `app/globals.css` (DEC-018), no Geist or other Vercel-default fonts in our font stack (DEC-005, DEC-020). Source code grep for "geist" returns zero matches.
- **P7-01 done (DEC-066):** the hero source is now [`hero-campfire.webp`](public/illustrations/hero-campfire.webp) — 3.8 MB PNG → **259 KB WebP** (q75, 1536×1024, **flattened onto bone `#f7f2e8`**; 93% cut). New reusable optimizer [`scripts/optimize-illustration.mjs`](scripts/optimize-illustration.mjs) + `npm run optimize:img` (sharp; writes a sibling WebP, exits non-zero over 500 KB); convention in CONVENTIONS.md; `sharp` declared as a devDep. PNG removed from the tree (recoverable from git `250cb35`). next/image delivers optimized WebP (or a JPEG fallback for non-WebP clients — which is why the source is flattened, not transparent; no `images` config added).
- **P7-01 follow-up (DEC-066, flatten fix):** the first cut shipped a _transparent_ WebP (466 KB), which `next/image` renders **black-edged** when it serves its JPEG fallback to clients that don't accept WebP (some in-app browsers / opening the image URL directly) — JPEG has no alpha. Re-encoded **flattened onto bone** (opaque): identical on the always-bone page, correct in every format, and smaller (259 KB). Verified on the live deploy (`insightful-fa.vercel.app`): webp for Safari, and the JPEG fallback now has bone corners, not black. (Separately: the apex `insightfulfa.com` still serves an old WordPress "coming soon" page — DNS not yet repointed to Vercel; that was the _other_ black image the owner saw.)
- Verification: `npx tsc --noEmit` and `npm run lint` pass; `npm run build` blocked locally by the documented OneDrive EPERM on `.next/static/*` (the dev server holds it open) — re-run after killing the dev server before commit.

Otherwise Phase 6 remains complete pending owner visual sign-off (404 page + favicon in a browser tab). Remaining launch tasks are owner-supplied — real contact inbox and Vercel production env var.

---

## Lighthouse baseline (Phase 6)

Recorded 2026-05-27 against `npm run build` + `npm start` (Chrome headless via the `lighthouse` devDep, DEC-046). HTML reports under `lighthouse/` (gitignored); numeric tuples below. Targets: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 — every route clears with room.

| Route | Perf | A11y | SEO | BP |
|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 |
| `/framework` | 95 | 100 | 100 | 100 |
| `/about` | 95 | 100 | 100 | 100 |
| `/contact` | 95 | 100 | 100 | 100 |
| `/resources` | 95 | 100 | 100 | 100 |
| `/resources/seeing-operational-risk-earlier` | 95 | 100 | 100 | 100 |
| `/resources/the-limits-of-lagging-indicators` | 95 | 100 | 100 | 100 |
| `/resources/forecasting-as-an-operating-discipline` | 95 | 100 | 100 | 100 |

Rerun: `rm -rf .next && npm run build && npm start &` (background), then loop `npm run lighthouse -- http://localhost:3000<route> lighthouse/<name>` per route, then kill `npm start` before any `npm test` run (Playwright's `reuseExistingServer` would otherwise silently test the production build).

**P7-01 re-measure (2026-05-30, DEC-066):** after the hero WebP optimization, `/` re-measured **Perf 92 / 93 / 95** across three `npm start` runs (median **93**), **A11y 100 / SEO 100 / BP 100** — clears Perf ≥ 90. The LCP element is the subhead paragraph (not the hero image), so the optimization is LCP-neutral; the variance vs the 2026-05-27 `/` row is run-to-run noise on a loaded dev box. Other routes unchanged.

---

## Immediate next actions

1. Owner visual review of the **hero V2** iteration (image + new h1/subhead) in the browser — sign off or redirect (DEC-054, DEC-055). Re-run `npm run build` after killing the dev server so the full automated gate is green before commit.
2. Owner visual review: 404 page (`/this-route-does-not-exist`) + favicon at browser-tab scale + Lighthouse report spot-check, then commit Phase 6 to `main`.
3. **Done — P7-01 (DEC-066):** hero shrunk 3.8 MB → 466 KB WebP; reusable `scripts/optimize-illustration.mjs` + `npm run optimize:img`; convention in CONVENTIONS.md. Any new `/public/illustrations/*` must pass through the optimizer before commit.
4. Done (DEC-076): the contact inbox is set to `connect@insightfulfa.com` (resolves the DEC-039 placeholder). Confirm this mailbox is live before launch.
5. Launch step: set `NEXT_PUBLIC_SITE_URL=https://insightfulfa.com` in the Vercel project (production env). Local `.env.local` optional for dev testing.
6. **Done (DEC-063):** real logo wired into navbar (**full lockup**, reduced bar padding so it fills the bar), footer (lockup, `self-start` box fix), favicon (`icon.svg`), and apple-icon — closes the DEC-049 carryover. Owner reviewed and chose the wordmark in the nav.
7. Future content: the 4th category (AI-assisted operational analysis) has no sample article yet — add when the content grows.
8. Deferred (TASKS "Future work"): SEO/content-strategy/blog-architecture docs; future pages (Industries, Case Studies, etc.); dark mode. Begin only with a fresh scope decision.

---

## Current blockers

None blocking. All Phase 6 deliverables shipped and gated; Phase 6 is awaiting owner visual sign-off before commit.

---

## Risks to watch

- **Visual drift toward generic SaaS / dashboard aesthetics** — the most likely failure mode for AI-assisted work. Mitigation: enforce the anti-pattern checklist in CONVENTIONS.md and the AI Collaboration spec on every section.
- **Token bypass** (hardcoded colors / arbitrary spacing creeping in). Mitigation: complete P1-01/P1-02 before any section work so tokens are always available.
- **Scope creep** beyond the five v1 pages. Mitigation: DEC-014 fixes v1 scope; new pages require a decision entry.

---

## Success definition for current phase (Phase 6)

Phase 6 target:

- `sitemap.xml` lists every static route + every article URL (article `lastmod` = `publishedAt`); served statically (DEC-047) ✓
- `robots.txt` allows all crawlers and references the absolute sitemap URL; no `/_next/` disallow (DEC-048) ✓
- Dynamic favicon + apple-icon emit from token hexes via `ImageResponse`; no font fetch (DEC-049) ✓
- Editorial 404 (`This page is not part of the system.`) renders inside Navbar + Footer via the extracted `MarketingShell`; lives at root `app/not-found.tsx` so unmatched URLs inherit it (DEC-050) ✓
- Per-article `@type: Article` JSON-LD (headline, description, datePublished, author Person, publisher Organization with `/icon` logo, `mainEntityOfPage` canonical) + `alternates.canonical` in `generateMetadata` (DEC-051) ✓
- Per-route `alternates.canonical` on `/`, `/framework`, `/about`, `/contact`, `/resources`; Twitter inherits from OG via documented fallback (DEC-052) ✓
- `.env.example` tracked, `!.env.example` exception in `.gitignore`, `NEXT_PUBLIC_SITE_URL=https://insightfulfa.com` documented (DEC-053) ✓
- lint / tsc / build / format:check pass; sitemap, robots, icon, apple-icon, `_not-found` all listed as static; articles still SSG; e2e 39/39 ✓
- Lighthouse baseline recorded for all 8 routes — uniformly **95 / 100 / 100 / 100** (DEC-046, all targets cleared) ✓
- Editorial "look" sign-off (owner) — ⏳ pending: 404 page + favicon-tab visual review before commit
