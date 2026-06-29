# TESTING.md

## Purpose

This file defines how each task is verified before being marked complete in `PROGRESS.md`. Consult it before marking any step done.

A step is only complete when:

1. The code is written
2. The verification described here has been run
3. The actual result matches the expected result
4. The result has been recorded in `PROGRESS.md`

Do not mark a step complete based on code review alone.

Because this is an editorial marketing site, verification combines automated checks (build, typecheck, lint, Lighthouse, axe) with a short **visual/editorial review** against the specs. Prefer commands the agent can run; when a check is visual, describe exactly what to look for.

### Standard automated gate (applies to every code task once the app exists)

**How to verify:**

```bash
npm run lint        # ESLint
npx tsc --noEmit    # strict type check
npm run build       # production build
```

**Expected output:** All three exit 0; no type errors; no new lint errors.
**Failure indicators:** Type errors, lint failures, or a build that fails / emits new warnings.

**Note (stale `.next` types):** after deleting a route/page, `npx tsc --noEmit` may report a stale `.next/types` validator error that still references the removed file. Clear it with `rm -rf .next` and re-run `npm run build` (which regenerates the route types), then re-run `tsc`.

### Editorial review checklist (applies to every visual task)

Run this quick read against the rendered page before marking a UI task done (source: AI Collaboration & Prompting Protocol → review checklist):

- Calm, spacious, typography-led — not dense or noisy
- No generic SaaS gradients, card-grid overload, dashboard density, crypto-fintech styling, over-rounded pills, or over-animation
- Spacing/colors/type come from tokens (no hardcoded values)
- Motion is subtle and respects `prefers-reduced-motion`
- Semantic HTML, keyboard navigable, visible focus, sufficient contrast
- Responsive: editorial rhythm and readable typography preserved on mobile

---

## Phase 0 scaffold (P0-01 → P0-05)

**How to verify:**

```bash
npm run dev     # then open the local URL
npm run build
npm run lint
```

**Expected output:** Dev server serves the placeholder marketing page; the three brand fonts render with no layout shift; the editorial off-white background and base text color are present; build and lint pass.
**Failure indicators:** Default Next.js starter template still showing; fonts falling back to system defaults; FOUT/CLS on load; build or lint errors.

---

## Token compliance (P1-01, P1-02)

**How to verify:** Inspect `styles/tokens.css` against `docs/get-started/design_token_theming_system_insightful_fa.md`. In the browser devtools, confirm `:root` exposes every documented variable; apply a few token-based Tailwind utilities and confirm they resolve to the spec values.

**Expected output:** Every documented token (color primitives + semantic, typography scale, leading, tracking, spacing, section spacing, containers, grid gaps, radius, shadow, motion durations/easing, z-index, texture) exists with the exact spec value. Token-based utilities (e.g. `bg-background-primary`, `text-text-secondary`) work without arbitrary values.
**Failure indicators:** Missing/renamed/duplicated tokens; mismatched values; components needing arbitrary Tailwind values for normal styling.

---

## Primitives & components (P1-03 → P1-05, and all `components/`)

**How to verify:** Render the component(s) on a scratch/demo route covering each variant and state (default, hover, focus, disabled where relevant). Run the editorial review checklist + standard automated gate. Run an accessibility pass:

```bash
# with the dev server running, against the relevant route
npx @axe-core/cli http://localhost:3000/<route>
```

**Expected output:** Each variant renders at the correct token-driven scale/spacing; hover/focus states are subtle and keyboard-reachable; axe reports no critical/serious violations.
**Failure indicators:** Drift from tokens; loud hover (scale/glow); missing focus styles; axe violations; motion that ignores reduced-motion.

---

## Homepage (P3-01 → P3-06) and pages (P4, P5)

**How to verify:** Open the page and walk it top to bottom against the relevant spec (homepage wireframe / sitemap / copy architecture). Run the editorial review checklist. Then run Lighthouse and axe:

```bash
npx lighthouse http://localhost:3000/<route> --only-categories=performance,accessibility,seo,best-practices --view
npx @axe-core/cli http://localhost:3000/<route>
```

**Expected output:**
- Section order and pacing match the spec (e.g. homepage: Hero → Problem → Framework → Outcomes → Credibility → CTA)
- Copy uses approved language; CTAs use approved phrasing (no banned sales/hype terms)
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (targets, not yet baselined)
- axe: no critical/serious violations
- Page `metadata` (title, description, openGraph, twitter) present

**Failure indicators:** Wrong section order or cramped pacing; banned vocabulary in copy; Lighthouse/axe below targets; missing metadata; layout breaks or compressed typography on mobile.

---

## End-to-end smoke (introduced in Phase 2+)

**How to verify (Playwright, once configured):**

```bash
npx playwright test
```

**Expected output:** Navigation between the five pages works; mobile menu opens/closes and traps focus; no console errors.
**Failure indicators:** Broken routes; focus escaping the mobile menu; runtime console errors.

---

## Known gaps (honest status)

- **No application code exists yet**, so the commands above are the intended gates — they become runnable starting with P0-01. Until then, "verification" for the docs/scaffold tasks is structural review.
- **Lighthouse/axe thresholds are targets, not yet baselined.** Record the first real scores in `PROGRESS.md` once the homepage exists, then treat regressions against those numbers.
- **Playwright/Lighthouse tooling (P-test setup) is itself a Phase 0/2 task** — note in `PROGRESS.md` when each is wired so later tasks can rely on it.
- Visual-regression tooling (Chromatic/Percy) is optional and deferred; not required to mark tasks done.
