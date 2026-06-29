# CONVENTIONS.md

## Purpose

This file defines the coding and writing standards for the Insightful Financial Analytics website. The agent follows these automatically — they are not suggestions. They distil the engineering and editorial rules from the `docs/get-started/` specs into actionable form.

---

## Universal rules

These apply to every file in the repo regardless of language or context.

### Naming

- **Source files:** kebab-case (`framework-card.tsx`)
- **React components:** PascalCase, one component concept per file (`FrameworkCard`)
- **Functions and variables:** camelCase
- **Constants and enums:** UPPER_SNAKE_CASE
- **CSS custom properties (tokens):** semantic kebab-case (`--background-primary`, `--text-secondary`); never `--gray-1` / `--color-a`
- **CSS classes / Tailwind:** use token-backed utilities; bespoke classes are kebab-case

Match the convention already present in a file you are editing.

### Code quality

- **Single responsibility:** each component does one thing; keep components small and predictable
- **Composition over configuration:** prefer composing primitives over giant, hyper-configurable "swiss-army" components
- **Nesting:** flatten with early returns; avoid deep prop trees
- **No magic values:** all design values come from tokens; other meaningful constants are named
- **Error handling:** explicit; no swallowed errors or empty catch blocks

### Documentation

- Default to **no comments** — well-named components and tokens explain themselves
- Comment only the non-obvious *why* (a constraint, a workaround, a deliberate deviation). Do not narrate *what* the code does
- Exported utilities with non-obvious behavior get a one-line doc comment

### Git and commit discipline

- One logical change per commit; scoped, reviewable diffs
- Clear, present-tense messages describing the why (e.g. `add token-driven Button primitive`)
- **Never commit secrets** or environment files
- Update the relevant `docs/build/` files in the same change as the code they describe

### Security baseline

- No hardcoded secrets — read keys from environment variables
- Validate/sanitize any external input at the boundary
- Keep dependencies minimal and intentional; a new dependency needs a `DECISIONS.md` entry

---

## Stack-specific rules

### TypeScript

- Strict mode on. No `any` unless genuinely unavoidable — and then commented with the reason
- Explicit return types on exported functions; explicit prop interfaces for components
- Prefer interfaces for object/prop shapes

### Next.js (App Router)

- App Router only — no Pages Router
- **Server Components by default.** Add `"use client"` only for motion or genuine interactivity (mobile menu, interactive diagrams)
- Static generation for marketing pages; ISR only if a future need is recorded as a decision
- Each page exports `metadata` (title, description, openGraph, twitter); no keyword stuffing
- Keep client JS minimal; no global state store (local/URL state only — see DEC-013)

### Tailwind + tokens (Tailwind v4, CSS-first)

- **Tokens only.** No hardcoded colors, no one-off type sizes, no random shadows, and no _magic-number_ spacing like `p-[37px]`.
- **Token-referencing brackets ARE allowed and expected.** `gap-[var(--space-md)]`, `py-[var(--section-space-lg)]`, `px-[var(--space-lg)]` reference design tokens, not magic numbers, so they satisfy "tokens only." Only _literal_ values in brackets (`p-[37px]`) are banned.
- The Tailwind theme surface is the `@theme inline { … }` block in `styles/globals.css` (CSS-first — no `tailwind.config.js` theme; DEC-016 / DEC-022). It exposes the **semantic** layer only; raw `--color-*` primitives are intentionally not utilities.
- Use semantic tokens in components (`background-primary`, `text-secondary`, `border-subtle`); avoid raw primitives directly.
- **Spacing:** prefer the layout primitives (`Stack` gap, `Section` variant, `Container`, `Grid`) over raw spacing utilities. There is **no named `--spacing-*` scale — do NOT add one.** In Tailwind v4 named `--spacing-*` keys (sm/md/lg/xl/2xl…) shadow the `--container-*` t-shirt sizes used by `max-w`/`w`/`min-w` (it silently made `max-w-2xl` = 64px). For direct spacing, use `[var(--space-*)]` / `[var(--section-space-*)]`. See DEC-026.
- **Max-width** comes from the `Container` primitive (`max-w-narrow/default/wide`). The built-in `max-w-{sm…2xl}` sizes work now that the `--spacing-*` shadow is gone, but prefer `Container`.
- No inline styles for design values; token-backed Tailwind utilities only.
- Radius defaults to `radius-md` / `radius-lg`; avoid pill-shaped overload.
- **CSS authoring:** never put the sequence `*/` inside a CSS comment (e.g. writing a utility name like `max-w-` followed by `*` then `/`) — it closes the comment early and breaks the PostCSS build.

### Framer Motion

- Minimal usage: fade-up reveals, subtle atmospheric drift, soft hover only
- Use the token motion durations/easings (`--transition-*`, `--ease-soft`); slow, soft, no bounce, no large transforms
- Every animation must degrade gracefully under `prefers-reduced-motion`
- Motion is always secondary to content — never scroll-hijack or choreograph spectacle

### Data visualization (DEC-058)

- d3 is **math only** — `d3-shape`/`d3-scale` for path strings and scales. Never add `d3-selection`/`d3-axis` or a chart framework (Recharts/visx); we hand-author the SVG and apply our own tokens
- Chart data + derived geometry live in pure `src/lib/data-viz/` modules (no React, no DOM); the viz components are thin `"use client"` leaves. Keep the data-driven geometry — no hardcoded coordinate strings
- All marks are token-colored (`var(--signal-*)`, `var(--border-*)`, `var(--text-*)`); area fills are a single hue via `fillOpacity` (never a gradient). Restraint holds: no dashboard density, gridlines stay hairline, comparison series stay subordinate
- Decorative charts keep `aria-hidden` with meaning in the adjacent caption; a mark that conveys its own data (e.g. `SignalIndicator`) must be focusable with an `aria-label` and expose the value without hover
- Reveals are **opacity fades** (gated on `useReducedMotion()`, final state when reduced — mirror `Reveal`), never SVG `pathLength` draw-on: `pathLength` breaks with `vectorEffect="non-scaling-stroke"` above 1:1 scale (DEC-062). Fade faint lines via a wrapping `motion.g` so each line keeps its own `opacity`. Tooltips use the shared `VizTooltip` primitive
- Text labels are HTML overlays via the shared `VizLabel` (positioned by viewBox %), never SVG `<text>` — SVG text scales with the responsive viewBox and balloons on wide charts; HTML keeps a consistent CSS px size (DEC-061). Fixed-size labels don't shrink, so space closely-clustered labels out to avoid collisions on narrow viewports
- A chart shown on more than one page can diverge by a `variant` prop (e.g. `compact` for the homepage's calm glance, `detailed` for the Framework teaching surface) — keep one component and branch on the prop with per-variant data in `lib/data-viz`; don't fork files. "Detailed" means more meaning, not more density (DEC-060)
- Charts must carry real meaning, not decoration: don't add a mark that's identical across instances, hides its only data behind hover, or implies a trend the content doesn't have

### Brand & static assets (DEC-063)

- Externally-sourced assets follow `docs/get-started/ASSET-REQUIREMENTS.md`: logos and small marks → `public/icons/`, editorial illustrations → `public/illustrations/`; kebab-case, intent-first filenames
- The logo renders via `<Logo variant="lockup" | "mark">` (`src/components/brand/logo.tsx`). Both navbar and footer use the **lockup** = `public/icons/logo-wordmark.svg` via `next/image` (`unoptimized`); the `width`/`height` props must match the file's viewBox aspect or it distorts. The **mark** variant inlines a `<path>` with `fill="currentColor"` (geometry in `src/components/brand/logo-art.ts`) — currently unused in layout but available. Favicon = static `src/app/icon.svg` (hand-authored circular bone badge); iOS icon = `src/app/apple-icon.tsx` (`ImageResponse`, renders the mark from `logo-art.ts`)
- Local SVGs served through `next/image` need `unoptimized` (the optimizer rejects SVG unless `dangerouslyAllowSVG`, which we don't enable)
- **Asset status is tracked here, not by folders** (no `/unused` dir — "used" is a code fact that rots as a directory name). In `public/icons/`, only `logo-wordmark.svg` is rendered by the site; `logo-mark.svg`, `logo-mark-square.svg`, and the raster `logo-mark-black.png` / `logo-mark-white.png` are kept brand deliverables/fallbacks not referenced by code. `logo-art.ts` + `apple-icon.tsx` carry the mark geometry independently of the (re-cropped) lockup — regenerate only if the mark art itself changes

### Image assets (DEC-066)

Raster illustrations in `public/illustrations/*` are optimized to a lossy **WebP** before commit; SVG marks in `public/icons/*` are not (vector — DEC-063). Per-asset size/dimension targets live in `docs/get-started/ASSET-REQUIREMENTS.md`; this is the engineering procedure.

- **Run the optimizer before committing any new/changed illustration:** `npm run optimize:img -- public/illustrations/<name>.png`. It writes `<name>.webp` (a sibling — never overwrites the input), reports before/after size, and **exits non-zero if the result is over 500 KB** so it can gate. Then point the component at the `.webp` and `git rm` the source PNG. Tune `--quality` (default 75) if an asset is over budget; `--background hex|none`, `--format avif`, `--max-edge`, and `--dry-run` are available too (see the script header).
- **Format = WebP, not PNG.** A detailed engraving cannot reach <500 KB as a palette PNG without visible banding; WebP hits it cleanly. This is the committed _web_ asset — ASSET-REQUIREMENTS tells the _designer_ to deliver a high-quality PNG master and not pre-compress; converting that master to the committed WebP is this pipeline's job. The PNG master stays in design storage (recoverable from git history), not committed.
- **Budget / dimensions:** ≤ 500 KB per illustration (smaller per the ASSET-REQUIREMENTS table); longest edge ≤ 1920 px; **never upscale** a smaller source (the hero draft is 1536 and stays 1536).
- **Flatten onto the bone background — do NOT ship transparency.** A transparent source looks correct in WebP but turns the feathered vignette **black** in `next/image`'s JPEG fallback (served to clients whose `Accept` header omits `image/webp` — some in-app browsers, or opening the image URL directly). The optimizer flattens onto `#f7f2e8` (bone-100) by default (`--background`), so the asset is opaque and renders correctly in every format. The site is single-theme (always bone), so baking the bg in is identical on the page; the feather still dissolves softly (no hard rectangle). Only pass `--background none` if a future surface genuinely needs transparency AND you've configured `images.formats` so no JPEG fallback can occur. sRGB profile is kept.
- **Delivery stays `next/image`'s job:** commit one optimized WebP; `next/image` re-encodes it to optimized WebP at device widths at request time, **falling back to JPEG for clients that don't accept WebP** (hence the flatten rule above). AVIF is opt-in via `images.formats`, which we don't set. Do **not** add an `images` config or hand-generate per-width/per-format variants. Reference illustrations with `next/image` + explicit `width`/`height`; `priority` only above the fold, lazy otherwise (DEC-065).

### MDX (resources, Phase 5+)

- Structured frontmatter: `title`, `description`, `publishedAt`, `author`, `category`, `featured`, `ogImage`
- Render through the shared editorial article layout; no dense or SEO-spam formatting

### Accessibility (always)

- Semantic HTML and correct heading order
- Keyboard navigable with visible focus
- Contrast-safe (no hyper-subtle text, no tiny metadata)
- Respect `prefers-reduced-motion`; never convey meaning through motion alone

---

## Visual anti-patterns (reject and revise)

These are the most likely AI drift failures. If generated UI shows any of them, reject and simplify (source: AI Collaboration & Prompting Protocol, frontend architecture, homepage wireframe):

- **Card-grid overload** — every section becoming a grid of cards. Restore editorial rhythm and asymmetry.
- **Dashboard obsession** — charts, KPIs, trading-terminal density. The site is editorial first; keep any viz minimal.
- **Startup gradient syndrome** — bright gradients, neon accents, loud color. Use warm restrained neutrals.
- **Over-animation** — motion density, bounce, scroll choreography. Reduce and slow down.
- **Over-rounded SaaS styling** — pill buttons everywhere, generic component-library look. Reduce radius; reinforce structure.
- **Visual overcrowding** — filling every area. Whitespace is a feature; let the page breathe.
- **Everything centered** — use controlled asymmetry, not endless centered stacks.

---

## Writing conventions (copy)

All UI copy and content follows the brand voice (`docs/get-started/brand_voice_and_tone_guide_insightful_fa.md` + copy architecture):

- **Tone:** calm, intelligent, observant, strategic, human, editorial, measured
- **Prefer vocabulary:** visibility, signals, operational clarity, forecasting, awareness, operational intelligence, systems thinking, pattern recognition, leading indicators, operational pressure, margin visibility, early intervention, emerging risk
- **Avoid:** disruption, revolutionary, game-changing, growth hacking, AI-powered everything, 10x, hypergrowth, unlock massive value, best/world-class, "transform overnight", explosive growth
- **CTAs — preferred:** "Book a consultation", "Explore the framework", "See how the system works", "Talk with us", "Learn more". **Banned:** "Get started now", "Buy now", "Act fast", "Claim your demo", "Don't miss out"
- **Style:** moderate sentence length, calm rhythm, short-to-medium paragraphs, strong hierarchy; no exclamation-driven hype, fear-based urgency, or corporate jargon walls
- Every piece of copy should reinforce: see earlier, understand deeper, respond faster, operate with confidence, detect hidden risk before it surfaces in reporting
- **No em dashes (DEC-069).** Do not use em dashes (the long dash) anywhere in copy or docs. Use commas, periods, colons, semicolons, or parentheses, or restructure the sentence. If one seems genuinely necessary, raise the specific spot and reason rather than using it silently.
