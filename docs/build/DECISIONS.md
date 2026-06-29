# DECISIONS.md

## Purpose

This file records every non-trivial technical and product decision made on the Insightful Financial Analytics website. It is the institutional memory — the answer to "why did we do it this way?"

When a choice is ambiguous, record it here as `proposed` before proceeding. When confirmed, set the status to `accepted`. When later replaced, mark it `superseded` and reference the replacement. Do not delete superseded decisions.

The decisions below are pre-populated from the foundational specs in `docs/get-started/` and are `accepted` as the project's starting baseline.

## Decision format

### DEC-NNN: Short title

- **Status:** proposed | accepted | superseded
- **Date:** YYYY-MM-DD
- **Context:** Why the decision was needed.
- **Options considered:** A / B / C with brief tradeoffs.
- **Chosen:** The selected option.
- **Reasoning:** Why it was selected.
- **Superseded by:** DEC-NNN (if applicable)

---

## Decisions

### DEC-001: Framework — Next.js (App Router)

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Need a framework for a content-first, SEO-sensitive, server-rendered editorial marketing site.
- **Options considered:** 1) Next.js App Router — server-first, strong SEO/perf defaults. 2) Astro — great for static content but smaller React ecosystem fit. 3) Plain Vite + React SPA — weak SEO, more setup.
- **Chosen:** Next.js App Router.
- **Reasoning:** Server-first rendering, static generation, strong SEO and TypeScript support, and the largest ecosystem for AI-assisted implementation. Matches the frontend architecture spec.

### DEC-002: Language — TypeScript (strict)

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Need predictable, maintainable, AI-readable code with clear contracts.
- **Options considered:** 1) TypeScript strict. 2) TypeScript loose. 3) JavaScript.
- **Chosen:** TypeScript with `strict: true`.
- **Reasoning:** Predictability and clear interfaces matter more than short-term speed; `any` abuse and loose typing are explicitly disallowed by the architecture spec.

### DEC-003: Styling — Tailwind CSS driven by CSS-variable tokens

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The visual identity must come from a token system, not ad-hoc utilities, to prevent drift.
- **Options considered:** 1) Tailwind + CSS variables. 2) CSS-in-JS (runtime). 3) Plain CSS Modules.
- **Chosen:** Tailwind as the utility/layout/spacing/responsive system, with all design values sourced from CSS variables and surfaced through Tailwind theme extensions.
- **Reasoning:** Gives a single source of truth (tokens) while keeping fast, composable styling. Runtime CSS-in-JS is avoided for performance and server-first rendering.

### DEC-004: Motion — Framer Motion, minimal usage

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The brand requires calm, restrained, atmospheric motion — never spectacle.
- **Options considered:** 1) Framer Motion limited to reveal/atmosphere/hover. 2) Large animation system / scroll choreography. 3) CSS-only transitions.
- **Chosen:** Framer Motion, restricted to fade-up reveals, subtle atmospheric drift, and soft hover; CSS transitions where sufficient.
- **Reasoning:** Motion must stay secondary to content. No bounce, no dramatic transforms, no scroll hijacking. `prefers-reduced-motion` must degrade gracefully.

### DEC-005: Typeface system — Newsreader / Public Sans / IBM Plex Mono

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Typography is the primary visual system; fonts must be centralized and consistent.
- **Chosen:** Newsreader (headlines/serif), Public Sans (body/sans), IBM Plex Mono (metadata/eyebrow labels), loaded via `next/font` and exposed as `--font-serif` / `--font-sans` / `--font-mono`.
- **Reasoning:** Specified by the design token and UI/UX specs; editorial serif headlines + clean sans body + mono metadata create the intended editorial intelligence feel.

### DEC-006: Rendering — server-first, static generation for marketing pages

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The site is editorial/marketing, not an application.
- **Options considered:** 1) Static generation + RSC by default. 2) Client-heavy SPA. 3) SSR-on-request everywhere.
- **Chosen:** React Server Components by default; static generation for all core marketing pages; client components only for motion/interactivity; ISR only if future dynamic content requires it.
- **Reasoning:** Best performance, caching, SEO, and deployment simplicity; minimizes client JS.

### DEC-007: Component primitives — shadcn/ui allowed only as a heavily-customized base

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** A primitive layer can speed development, but the site must not look like a default shadcn build.
- **Chosen:** shadcn/ui is optional; if used, primitives must be heavily restyled to be token-driven, editorial, and typography-aware. Default shadcn aesthetics, over-rounded corners, and generic gray enterprise styling are rejected.
- **Reasoning:** Keeps optional velocity without importing generic SaaS appearance. The architecture spec permits this only under heavy customization.

### DEC-008: Theming — single curated theme in v1 (no dark mode)

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Premature theme flexibility risks inconsistency and complexity.
- **Chosen:** Ship a single, editorially controlled theme. Structure tokens (semantic layer) so future dark mode / variants are possible without restructuring.
- **Reasoning:** The token spec explicitly recommends avoiding premature dark/light complexity while keeping the architecture future-ready.

### DEC-009: Content — MDX for resource articles

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The Resources section is the long-term content/SEO engine and needs structured, long-form-ready content.
- **Chosen:** MDX with structured frontmatter (title, description, publishedAt, author, category, featured, ogImage) and shared editorial layout templates.
- **Reasoning:** Specified by the frontend architecture spec; balances authoring flexibility with editorial consistency.

### DEC-010: Hosting — Vercel

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Need a deployment target optimized for Next.js.
- **Chosen:** Vercel.
- **Reasoning:** Native Next.js optimization, image optimization, edge support, and strong preview workflow. Recommended by the architecture spec.

### DEC-011: `docs/get-started/` specs are the read-only source of truth

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Multiple AI agents and humans will work on the repo; the design intent must remain stable.
- **Chosen:** Treat all `docs/get-started/` documents as read-only inputs. Any needed change is logged here as a `proposed` decision rather than edited into the spec.
- **Reasoning:** Prevents silent drift of the canonical design/messaging intent and keeps a clear audit trail.

### DEC-012: Multi-agent role split (architecture / implementation / review)

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The project uses multiple AI agents (Claude Code, Codex, Cursor, Windsurf), which can produce conflicting directions.
- **Chosen:** Adopt the role split from the AI Collaboration & Prompting Protocol — one agent owns architecture, one owns implementation, one owns review/anti-drift. `AGENTS.md` is the universal contract; `CLAUDE.md` carries Claude-specific extensions.
- **Reasoning:** Avoids competing redesigns and styling divergence across agents.

### DEC-013: State management — local / URL state only (no global store)

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** A marketing site rarely needs global client state, and global stores add complexity and client JS.
- **Chosen:** Use local component state and URL state; do not introduce Redux/Zustand/etc. until genuinely necessary (recorded as a new decision).
- **Reasoning:** Keeps the client lightweight and server-first, per the architecture spec.

### DEC-014: Initial site scope — five pages

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** The IA must stay calm and curated, not a bloated sitemap.
- **Chosen:** v1 ships Home, Framework, About, Resources, Contact. Future pages (Industries, Case Studies, Framework Deep Dives, Services, Operational Assessments) are deferred until the content ecosystem matures.
- **Reasoning:** Matches the sitemap spec's "avoid premature page proliferation" guidance.

### DEC-015: Project memory system — code-project-bootstrap, Standard tier

- **Status:** accepted
- **Date:** 2026-05-25
- **Context:** Stateless AI agents lose context between sessions; the repo needs a durable operating system for AI-assisted development.
- **Options considered:** 1) Standard tier (control files + TASKS/DECISIONS/PROGRESS/TESTING/CONVENTIONS/KICKOFF). 2) Lightweight tier (too thin for a multi-phase, multi-agent build). 3) Full tier (adds SESSIONS/HANDOFF/ISSUES/ROADMAP — more overhead than currently needed).
- **Chosen:** Standard tier, with both `CLAUDE.md` and `AGENTS.md` at the repo root (multi-agent project) and the operating docs under `docs/build/`.
- **Reasoning:** Right-sized for the current phase; ROADMAP-style phasing already lives in TASKS/PROGRESS and the documentation roadmap. SESSIONS/HANDOFF/ISSUES can be added later if institutional memory needs grow.

### DEC-016: Tailwind CSS v4 (CSS-first) instead of v3

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** Phase 0 (P0-02) installs Tailwind. The architecture spec and TASKS P0-02/P1-02 describe a v3-era setup ("content globs cover `/src`", "`tailwind.config.js` theme extend"). The current Tailwind release is v4, which is CSS-first.
- **Options considered:** 1) Tailwind v4 — CSS-first (`@tailwindcss/postcss`, `@import "tailwindcss"`, `@theme`, automatic content detection); the create-next-app default for Next 16. 2) Tailwind v3 — JS config (`tailwind.config.js` theme.extend) with explicit content globs; matches the spec wording.
- **Chosen:** Tailwind v4 (confirmed with the project owner).
- **Reasoning:** Latest stable, faster, and the create-next-app default. DEC-003's intent (design values sourced from CSS variables) is preserved, but the surface is the `@theme` directive rather than `tailwind.config.js`. Implications: P0-02's "content globs cover `/src`" does not apply (v4 auto-detects content); P1-01/P1-02 wire tokens via `@theme` in CSS, not `tailwind.config.js` theme.extend. This supersedes the v3-specific wording in the read-only specs, logged here per DEC-011.

### DEC-017: Toolchain baseline — Next.js 16 / React 19 / TypeScript 5

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The scaffold needs a pinned framework/runtime baseline.
- **Chosen:** Next.js 16.2.6 (App Router, Turbopack default), React 19.2.4, TypeScript 5 (strict), Node 20+ — as produced by `create-next-app@latest`.
- **Reasoning:** Latest stable line; satisfies DEC-001/DEC-002. Turbopack is Next 16's default bundler (production build verified clean). The architecture spec's "React 18+" is satisfied by React 19.

### DEC-018: Global stylesheet location — `src/styles/globals.css`

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** create-next-app places globals at `src/app/globals.css`; the frontend architecture spec specifies `/src/styles/globals.css`.
- **Chosen:** Keep the global stylesheet at `src/styles/globals.css`, imported in `src/app/layout.tsx` via `@/styles/globals.css`.
- **Reasoning:** Matches the planned `/src/styles` structure where `tokens.css` and `typography.css` will live in later phases; avoids future churn.

### DEC-019: Phase 0 base styling — minimal token subset, provisional sans body

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P0-05 needs the warm off-white background and base typography, but the full token set is owned by P1-01 and P0-02 says "no token values yet".
- **Chosen:** In Phase 0, `globals.css` defines only the brand font variables and two semantic colors (`--background-primary: #F7F2E8`, `--text-primary: #1F2522`) plus a base `body` rule (`font-family: var(--font-sans)`, `line-height: 1.7`). The default body font is Public Sans (sans), provisional pending the P1-03 type scale.
- **Reasoning:** Renders the editorial background using semantic CSS variables (no hardcoded values in components) while leaving the full primitives → semantic → component token system to P1-01. Sans body is a reasonable editorial default; display/heading serif assignment is formalized with the type scale in P1-03.

### DEC-020: Font loading — next/font/google with `@theme` variable mapping

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P0-04 requires loading Newsreader / Public Sans / IBM Plex Mono and exposing them as `--font-serif` / `--font-sans` / `--font-mono` with no layout shift.
- **Chosen:** Load all three via `next/font/google` (`subsets: ["latin"]`, `display: "swap"`); Newsreader and Public Sans as variable fonts (no explicit weight), IBM Plex Mono at weights 400/500 (static). next/font assigns neutral source variables (`--font-newsreader`, `--font-public-sans`, `--font-ibm-plex-mono`) on `<html>`; `globals.css` maps them to the semantic `--font-serif`/`--font-sans`/`--font-mono` in `:root` and surfaces them as Tailwind `font-*` utilities via `@theme inline`.
- **Reasoning:** next/font self-hosts the fonts and generates size-adjusted fallbacks that prevent CLS. The `:root` mapping guarantees the `--font-*` variables resolve in devtools (the P0-04 exit criterion) while `@theme inline` drives the `font-serif`/`font-sans`/`font-mono` utilities. Weights are kept minimal; the full weight set is revisited with the type scale (P1-03).

### DEC-021: Canonical spacing scale — design token spec wins over the UI/UX example

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** Two specs define spacing differently. `design_token_theming_system_insightful_fa.md` defines a **10-step** scale (`--space-2xs:4px … --space-md:24px, --space-lg:32px, --space-xl:48px, --space-2xl:64px, --space-3xl:96px, --space-4xl:128px, --space-5xl:180px`). `ui_ux_design_system_insightful_fa.md` shows a condensed **8-step** *example* with different values (`--space-md:32px, --space-lg:64px, --space-xl:96px, --space-2xl:128px, --space-3xl:180px`). P1-01 must transcribe exactly one of them.
- **Options considered:** 1) Design token spec's 10-step scale. 2) UI/UX spec's 8-step scale.
- **Chosen:** The design token spec's 10-step scale.
- **Reasoning:** TASKS P1-01 names `design_token_theming_system_insightful_fa.md` as the source ("transcribe the full token set from…"), and CLAUDE.md's spec table assigns all token values to that document. The UI/UX spacing block is an illustrative implementation example, not canonical. The UI/UX `--bg` / `--ink` / `--accent-soft` variable *names* are likewise illustrative; canonical semantic names come from the token spec and already match Phase 0's `--background-primary` / `--text-primary`. `--accent-soft` is **not** introduced. No spec files were edited (per DEC-011).

### DEC-022: Tailwind v4 token surface via a single `@theme inline` block

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P1-02 must surface semantic tokens as Tailwind utilities while keeping `tokens.css` the single source of truth (DEC-003 / DEC-016).
- **Chosen:** Map tokens into Tailwind namespaces inside one `@theme inline { … }` block in `globals.css`, each key referencing the `tokens.css` variable (e.g. `--color-text-secondary: var(--text-secondary)`, `--spacing-md: var(--space-md)`, `--radius-md: var(--radius-md)`). `inline` makes utilities embed `var(--token)` and stops Tailwind emitting a duplicate theme variable — the same mechanism Phase 0 used for fonts (DEC-020).
- **Reasoning / implications:** (1) Single source of truth preserved — editing `tokens.css` updates every utility. (2) Only the **semantic** layer is surfaced; raw primitives (`--color-bone-100`, …) are intentionally not Tailwind utilities so components can't bypass semantics (CONVENTIONS). (3) Semantic names already carry a domain prefix, so color utilities read `text-text-secondary`, `bg-background-primary`, `border-border-subtle` — the doubling is expected and matches the TASKS/TESTING exit criteria verbatim. (4) Section spacing is exposed as named spacing keys (`py-section-lg`, …). (5) Tailwind's default palette/scales remain available; anti-drift is enforced by convention + review, not by stripping defaults.
- **Update:** the `--spacing-*` / section-spacing and `--leading-*` / `--tracking-*` portions of this mapping were **reverted by DEC-026** — the named `--spacing-*` keys shadowed Tailwind's `--container-*` (max-w/w/min-w) t-shirt scale. Colors, container widths, radius, shadow, and the type scale remain surfaced via `@theme`.

### DEC-023: Enforce LF line endings via `.gitattributes`

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The repo has `core.autocrlf=true` and no `.gitattributes`, so a Windows checkout produces a CRLF working tree while Prettier is configured for `endOfLine: lf` (its default). `npm run format:check` therefore reported *every* file as unformatted (line endings only) even though the index stores LF — making the Phase 1 verification gate unreliable on Windows.
- **Options considered:** 1) Add `.gitattributes` with `* text=auto eol=lf` (force LF working trees everywhere). 2) Set Prettier `endOfLine: "auto"` (tolerate each file's existing EOL). 3) Run `prettier --write` each session (transient; recurs on the next checkout).
- **Chosen:** Option 1 — `.gitattributes` with `* text=auto eol=lf`.
- **Reasoning:** Standard, durable fix that keeps the repo LF-canonical and yields LF working trees on every platform, so Prettier and `format:check` agree permanently. The index already stored LF, so no content renormalization was required (only EOL-dirtied working copies, reverted). Option 2 masks the inconsistency; option 3 is not durable. No application code changed.

### DEC-024: Button — ink-fill / hairline / link variants, link-polymorphic, CSS-only

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P1-05 needs a quietly-premium `Button` + `CTAGroup`. The visual treatment was confirmed with the project owner.
- **Chosen:** Three variants — **primary** = solid deep-ink fill (`--background-dark`) with `--text-inverse` label; **secondary** = transparent with a `--border-default` hairline + `--text-primary` (hover → `--border-strong` + faint `--surface-card`); **text** = unfilled `--text-primary` link with hover underline + subtle opacity. Box from component tokens (`--button-height` 48px, `--button-padding-x` 24px, `rounded-md`), medium weight. Renders `<a>` when `href` is set, else `<button type="button">` — a Server Component (no client JS); hover/focus are pure CSS. Hover uses `--transition-fast` + `--ease-soft`, opacity/border shifts only (no scale/glow/lift), removed under `prefers-reduced-motion` (`motion-reduce:transition-none`). Visible keyboard focus ring in `--signal-focus`.
- **Reasoning:** Accent amber stays reserved for signals (not spent on the primary button), matching the editorial restraint in the specs. Link-polymorphism keeps marketing CTAs semantic (`<a>` for navigation) with no client JS. Reduced-motion handling + a visible focus ring satisfy the accessibility rules.

### DEC-025: Class composition — dependency-free `cn`, no `cva` / `clsx` / `tailwind-merge`

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The primitives need a class-name joiner and variant selection. The common React + Tailwind stack reaches for `clsx` + `tailwind-merge` (and sometimes `cva`).
- **Chosen:** A tiny dependency-free `cn()` in `src/lib/utils/cn.ts` (joins truthy values, flattens arrays) plus plain typed `Record<Variant, string>` maps inside each component.
- **Reasoning:** Keeps the dependency surface minimal (CONVENTIONS: a new dependency needs its own decision). Phase 1 variants are controlled and don't pass conflicting Tailwind utilities, so `tailwind-merge` conflict-resolution isn't needed yet. If a future component must merge consumer-supplied colliding utilities, revisit with a dedicated decision.

### DEC-026: Spacing tokens via `[var(--space-*)]`, not a named `--spacing-*` scale (fixes max-w regression)

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** DEC-022 registered the spacing scale as named keys in Tailwind's `--spacing-*` namespace (`--spacing-md`, `--spacing-2xl`, …) so primitives could use `gap-md` / `px-lg` / `py-section-lg`. This shipped in PR #3. On `main` the homepage then rendered with every word on its own line — `max-w-2xl` computed to **64px**.
- **Root cause:** In Tailwind v4 the t-shirt sizes for `max-w` / `w` / `min-w` come from the `--container-*` scale (`max-w-2xl` → `var(--container-2xl)` = 42rem). Defining same-named keys in `--spacing-*` shadows them: Tailwind generated `.max-w-2xl { max-width: var(--space-2xl) }` (64px), silently breaking every `max-w-{xs..5xl}` / `w-*` / `min-w-*` t-shirt utility. Confirmed via Context7 and by inspecting the generated CSS. (Our `max-w-narrow/default/wide` were unaffected — those names don't collide.)
- **Chosen:** Do **not** register a named `--spacing-*` scale. Keep `--space-*` / `--section-space-*` in `tokens.css` and have the primitives consume them via Tailwind's CSS-variable value syntax — `gap-[var(--space-md)]`, `px-[var(--space-lg)]`, `py-[var(--section-space-lg)]`. Also removed the unused `--leading-*` / `--tracking-*` `@theme` mappings (they shadowed `leading-tight` / `tracking-wide` and were only consumed as raw vars by the `.t-*` typography classes). Kept the non-colliding mappings: semantic colors, `--container-narrow/default/wide`, `--radius-*` (intentional design radius, used by Button), `--shadow-*`, and the prefixed type scale (`text-display-xl` … `text-meta-sm`).
- **Reasoning:** Restores Tailwind's built-in sizing utilities while keeping spacing fully token-driven — `[var(--token)]` references a token, not a magic number, so CONVENTIONS' "no arbitrary/magic values" intent holds. Amends the spacing portion of DEC-022. Verified: `max-w-2xl` → `var(--container-2xl)` (672px), `main` renders as a 672px column, full gate green.

### DEC-027: Motion library — Framer Motion (`motion` 12.40.0), client-only, minimal

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P2-04 needs the fade-up reveal and the mobile-menu slide; DEC-004 chose Framer Motion (and allows CSS where sufficient). The project owner chose to install it now rather than a CSS-only IntersectionObserver.
- **Chosen:** Add `motion` (the current Framer Motion package) pinned at `12.40.0`. Imported only from `motion/react` inside the two client components (`reveal.tsx`, `mobile-menu.tsx`) — `motion.div` / `AnimatePresence` / `useReducedMotion`. Timings/easing come from `src/lib/motion/tokens.ts`, which mirrors the CSS motion tokens (`--transition-*`, `--ease-soft`); fade-up offset 12px (motion spec 8–16px). Reduced motion: the reveal renders a plain visible div; the menu drops its slide transform.
- **Reasoning:** Honors DEC-004 with minimal, restrained usage and no atmospheric/scroll choreography. Kept off the server tree (server-first, DEC-006). React 19 / Next 16 App Router usage confirmed via Context7. Note: `motion.div` SSRs its `initial` (opacity:0) inline, so reveal content is hidden until JS hydrates — acceptable for now; a no-JS fallback can be revisited later.

### DEC-028: e2e + a11y harness — Playwright + `@axe-core/playwright` (focused Phase 2 smoke)

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** TESTING.md flags an e2e smoke as a Phase 2+ task ("set up or defer"); the owner chose to wire it now. The standalone `@axe-core/cli` is blocked on this machine (ChromeDriver 149 vs system Chrome 148 → "session not created").
- **Chosen:** Add `@playwright/test` (1.60.0) + `@axe-core/playwright` (4.11.3), `playwright.config.ts` (chromium, `reuseExistingServer`, dev `webServer`), and an `npm test` script. `e2e/shell.spec.ts` = home renders in the shell + no console errors + mobile-menu open/focus-trap/ESC/aria; `e2e/a11y.spec.ts` = axe (WCAG 2 A/AA) on `/` and `/preview`, asserting no critical/serious violations. axe runs inside Playwright's Chromium (avoids the cli's Chrome/driver coupling); the a11y test scrolls + settles first so scroll-reveals are scanned in their resolved state.
- **Reasoning:** Locks the highest-risk Phase 2 behavior (the focus trap) and a real a11y gate with one command, reusing the installed browser. Full five-page routing is deferred to Phase 4 (only Home exists). Wiring noted in PROGRESS per TESTING.md.

### DEC-029: Navigation shell composition

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P2-04 composes the marketing shell; nav labels/links are shared across the Navbar, the MobileMenu, and the footer.
- **Chosen:** `FooterCTA` + `Footer` live in `src/app/(marketing)/layout.tsx` (Navbar → `<main id="main">` → FooterCTA → Footer) behind a skip link to `#main`. Nav items are a single source in `components/navigation/nav-items.ts`. The header is calm-sticky (`sticky top-0`, bone bg, hairline bottom border, no scroll transform). Navbar/Footer/FooterCTA stay server components; only MobileMenu and Reveal are client (no `usePathname` active-state, which would force a client Navbar).
- **Reasoning:** Gives every marketing page a consistent editorial close. Phase 3's homepage will rely on this shell FooterCTA rather than adding its own closing CTA (avoids double-CTA); per-page suppression (e.g., Contact) is a later concern. Nav links target real future routes — `/framework`, `/about`, `/resources`, `/contact` 404 until their phases (expected in Phase 2).

### DEC-030: Footer Legal column — defer Privacy/Terms

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The sitemap footer lists a Legal column with Privacy policy, Terms, and Contact information. Privacy/Terms pages are outside the v1 five-page scope (DEC-014).
- **Chosen:** Ship the Legal column with "Contact information" → `/contact` only; omit Privacy/Terms until those pages exist (no dead links / clean e2e). Logged per DEC-011 rather than editing the spec.
- **Reasoning:** Keeps the footer honest and the smoke green. Privacy/Terms can be added (with a scope decision) when those pages are built.

### DEC-031: Accessibility — darken `text-secondary` for WCAG AA on bone

- **Status:** accepted (visual sign-off received 2026-05-26)
- **Date:** 2026-05-26
- **Context:** First real use of the Phase 1 neutral text tokens on `background-primary` (#f7f2e8) failed WCAG AA contrast for small text (axe, serious): `text-secondary` olive-500 `#6d716d` ≈ 4.45:1 (nav/footer links, eyebrows at 12–15px) and `text-muted` olive-400 `#848883` = 3.22:1 (copyright meta, 12px). AA requires 4.5:1 for small text. These colors are baked into the Phase 1 `.t-eyebrow` / `.t-meta` classes.
- **Chosen:** Darken the raw primitive `--color-olive-500` (→ `#676b67`, ≈ 4.86:1) so `text-secondary` clears AA everywhere it is used (eyebrows, links, secondary body). Render the de-emphasized footer copyright with `text-secondary` instead of the lighter `text-muted`. `--color-olive-400` (text-muted) is left unchanged and is not used for small essential text in Phase 2; MetaText's default muted color remains a known AA risk for small meta to revisit when it appears (Phase 5 dates, etc.).
- **Reasoning:** Accessibility is non-negotiable; this is a minimal, near-imperceptible darkening that preserves the muted-neutral character while satisfying AA (verified: axe clean on `/` and `/preview`). Deviates from the token spec's exact hex; logged per DEC-011 and flagged for the owner's visual sign-off — they may prefer different shades or restricting muted to large text.

### DEC-032: Homepage composition + section background rhythm

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P3 builds the homepage (Hero → Problem → Framework → Outcomes → Credibility) inside the shell `<main>`. The page must not add its own `<main>` (the layout owns `<main id="main">`; the Phase 0 placeholder wrongly nested one) or a closing CTA (the shell's FooterCTA closes every page — DEC-029). Sections needed a calm visual separation, but `--background-secondary` (bone-50 `#fbf7ef`) is *lighter* than the body `--background-primary` (bone-100 `#f7f2e8`), so it cannot act as a strong contrast band.
- **Chosen:** `page.tsx` returns a fragment of five `<Section>` components (no `<main>`). Each section mirrors the `FooterCTA` pattern (Section + Container + Stack/Grid). Background rhythm: only **two** sections (Problem, Outcomes) lift to `bg-background-secondary` with a hairline `border-t border-border-subtle`; Hero, Framework, Credibility stay on the bone body. The hairline border does the separating work, not color contrast.
- **Reasoning:** Restores a single, correct `<main>` landmark (verified: one `<main>` on the page) and avoids a double CTA. The two-lift-with-hairline rhythm reads editorial, not striped, given the tiny bone-50/bone-100 delta (verified computed backgrounds). Reveal wraps below-the-fold blocks only (stagger 0/0.08/0.16s); the Hero is never wrapped (DEC-027 SSR-opacity caveat / LCP).

### DEC-033: Responsive heading ramps via token font-size utilities

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The Phase 1 type scale is fixed-size (no clamp): `display-lg` is 64px and `heading-xl` 48px at every breakpoint. P3 is the first heavy use of display/heading sizes; at 375px these overflow on long words, and the hero `<h1>` ended up the same size as section `<h2>`s on small screens (weak hierarchy).
- **Options considered:** 1) Add responsive font-size ramps per heading using the existing token font-size utilities. 2) Add `clamp()` to the global `.t-*` typography classes. 3) Leave fixed sizes.
- **Chosen:** Option 1 — mobile-first ramps using token utilities: hero `<h1>` `text-display-md lg:text-display-lg` (48→64), section `<h2>` `text-heading-lg lg:text-heading-xl` (40→48). The `<h1>` stays one step larger than `<h2>` at every breakpoint.
- **Reasoning:** Token utilities are not magic values, so "tokens only" holds. Localized to Phase 3 — it leaves the signed-off Phase 2 shell's typography (and the global type scale) untouched, avoiding regressions. Verified: no horizontal overflow at 375px; h1>h2 at 375/1440.

### DEC-034: Framework section — vertical numbered progression

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The wireframe allows the four-step framework (Observe → Connect → Forecast → Respond) as either a horizontal progression or a vertical editorial progression. The owner chose the layout.
- **Chosen:** A vertical numbered progression — an `<ol>` of `FrameworkCard` `<li>`s, each with a mono step number + amber signal marker and a hairline rule between steps. No surface fill, no shadow.
- **Reasoning:** Owner preference; reads most editorial with the most whitespace and avoids a 4-across "feature wall" (PROGRESS.md's top drift risk).

### DEC-035: Signal visualization as inline-marker SVGs; SignalIndicator/MetricCard deferred; OutcomeCard single-statement API

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P3-04 calls for a restrained "SignalIndicator / ForecastLine" visualization; the component inventory also lists `MetricCard` and `SignalIndicator`. The approved Outcomes copy is qualitative one-liners with no numbers.
- **Chosen:** Three small, static, strokes-only SVG components (`ForecastLine` — signal crossing a dashed threshold; `SignalTimeline` — early signal vs later impact; `HeroIllustration` — abstract contour/signal motif), token-colored, `aria-hidden` with meaning in adjacent captions. Markers are inlined, so a **standalone `SignalIndicator` is not built**. **`MetricCard` is deferred** (no numeric metrics; a stat tile would invite the SaaS stat-wall the specs forbid). `OutcomeCard` takes a single `statement` prop (not title+description) to match the approved one-liners rather than inventing supporting prose.
- **Reasoning:** Honors editorial restraint and "build only what the task requires." Inventing metrics or descriptions would be off-brief. Verified: 3 SVGs render and scale to their columns; no dashboard density.

### DEC-036: OG image via `opengraph-image` ImageResponse; root `metadataBase` added

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P3-06 needs Open Graph/Twitter images; `public/` has no asset and the owner chose to generate a token OG image. Satori (next/og) runs outside the DOM and cannot read CSS variables or Tailwind utilities, and a relative OG image URL warns without `metadataBase`.
- **Chosen:** A file-based `src/app/(marketing)/opengraph-image.tsx` using `ImageResponse` (1200×630, bone background, ink serif wordmark, amber rule), which auto-emits `og:image` + `twitter:image`. **Literal token hex values** (`#f7f2e8`/`#1f2522`/`#676b67`/`#b87937`) are used inside Satori — a scoped exception to "tokens only." Newsreader is fetched as a TTF/OTF (an old UA makes Google include it; woff2 is skipped) with a 3s timeout + graceful fallback to a default serif so the build never hangs/fails offline. Added `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")` to the root layout.
- **Reasoning:** The file convention wires both OG and Twitter images with no committed binary. The hex exception is unavoidable (Satori ≠ DOM) and contained to one file. Verified: `/opengraph-image-*` prerenders static; build is warning-free (metadataBase set).

### DEC-037: Homepage copy — locked approved directions + minimal drafted connective copy; `/preview` a11y route trimmed

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The copy architecture offers several approved headline "directions" per section plus verbatim supporting paragraphs / framework steps / outcome statements, but leaves the section eyebrow labels and the Credibility body with no verbatim text. The owner chose "lock picks + draft gaps."
- **Chosen:** One approved headline direction locked per section; verbatim approved body/steps/outcomes used as-is; only the small connective copy drafted in brand voice — the five section eyebrows, two short viz captions, and one Credibility connective line (the philosophy quote itself is an approved example line, framed by the "Our perspective" eyebrow with no invented founder name). No banned vocabulary; CTAs from the approved list ("Book a consultation" → /contact, "See how the system works" → on-page `#framework`). Separately, trimmed the removed `/preview` route from `e2e/a11y.spec.ts` `ROUTES` (it was scanning a 404) and added `e2e/home.spec.ts` (one `<h1>`, section order, CTA targets, reduced-motion visibility).
- **Reasoning:** Keeps all marketing copy either verbatim-approved or minimal brand-voice connective text, per the owner's instruction and the brand voice guide. The e2e additions lock the P3 structural invariants; the `/preview` trim keeps the a11y gate meaningful. All final copy is in the plan/PR for sign-off.

### DEC-038: Suppress the shell FooterCTA on `/contact` via a client `FooterCTASlot`

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** DEC-029 puts a single FooterCTA ("Build earlier operational visibility." → "Book a consultation"/`/contact`) in the marketing layout so it closes every page, and deferred per-page suppression to "later." On `/contact` itself that invitation is circular. App Router server layouts cannot read the pathname, so varying it needs either a client gate or a route-group restructure (owner decision, Phase 4).
- **Options considered:** 1) A tiny `"use client"` gate that reads `usePathname()` and is passed the server FooterCTA as `children`. 2) Move FooterCTA out of the shell and into each page (reverses DEC-029; easy to forget on new pages). 3) Route groups with per-group layouts (awkward here because FooterCTA sits *outside* `<main>`, so the shell `<main>`/`<Footer>` boundary would have to be duplicated across groups). 4) Keep it everywhere (circular).
- **Chosen:** Option 1 — `src/components/sections/footer-cta-slot.tsx`: `usePathname() === "/contact" ? null : <>{children}</>`. The layout renders `<FooterCTASlot><FooterCTA/></FooterCTASlot>`.
- **Reasoning:** Minimal and reversible; the layout and FooterCTA stay server components (the server-rendered FooterCTA is handed in as `children`), and `usePathname()` resolves during SSR so there is no hydration flash on `/contact`. No route restructure, no duplicated shell.

### DEC-039: Contact mechanism — email/mailto invitation, no form back-end in v1

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** P4-03 needs a low-pressure way to start a conversation; a form back-end is out of v1 scope and the brand forbids aggressive lead capture / multi-field funnels.
- **Options considered:** 1) A calm invitation + direct `mailto:` button + a "what to expect" note (no form). 2) A static, non-functional form UI wired later (risks a visibly broken form). 3) A functional form via a third-party service now (expands scope; needs an account/endpoint).
- **Chosen:** Option 1 (owner's call). A single `CONTACT_EMAIL` constant holds a clearly-marked placeholder (`hello@insightfulfa.com`) for the owner to confirm/replace; the address is both a primary `Button href="mailto:…"` ("Book a consultation") and a visible mailto link.
- **Reasoning:** Most editorial and lowest-pressure, fully functional with no back-end, and trivially swappable when the real address/endpoint exists. No funnel, consistent with the brand voice guide.

### DEC-040: Navbar active-state highlighting via client `NavLinks` + `MobileMenu`

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** DEC-029 kept the Navbar a pure server component and explicitly skipped `usePathname` active-state. With the core pages landing, the owner now wants current-page orientation in the nav (Phase 4 decision).
- **Options considered:** 1) Extract just the desktop link list into a small `"use client"` `NavLinks` (Navbar shell stays server) + add the same logic to the already-client MobileMenu. 2) Make the whole Navbar a client component. 3) Keep no active-state.
- **Chosen:** Option 1. `src/components/navigation/nav-links.tsx` (client) + a shared `isNavItemActive(pathname, href)` helper in `nav-items.ts` (exact match, plus `startsWith("href/")` for future nested routes). Active link gets `aria-current="page"` + a calm color shift (`text-text-secondary` → `text-text-primary`); MobileMenu mirrors it. Navbar and Footer stay server components. Partially revisits DEC-029.
- **Reasoning:** Confines client JS to the link list, preserves the server Navbar shell, gives an accessible (`aria-current`) and visually restrained orientation cue, and keeps one source of truth for the match logic shared by both navs.

### DEC-041: Framework/About/Contact inherit the shared marketing OG image

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The marketing-group `opengraph-image.tsx` (DEC-036) applies to all routes in the group, so new pages inherit the homepage OG image unless a per-route `opengraph-image` is added. Phase 4 must decide per page.
- **Options considered:** 1) Inherit the shared group OG image for all three pages. 2) Author a distinct per-route OG image for each page.
- **Chosen:** Option 1 — inherit; no per-route OG images in Phase 4. Each page still exports `openGraph.{title,description}` (and `title`/`description` for the page `<title>`/meta).
- **Reasoning:** Consistent brand image across the site, no extra Satori/font surface to maintain, lower risk. Per-route OG images can be added later if a page needs a distinct share card.

### DEC-042: MDX pipeline — `@next/mdx` + `remark-frontmatter` + `gray-matter`

- **Status:** accepted (owner chose the tooling 2026-05-26)
- **Date:** 2026-05-26
- **Context:** P5-01 needs an MDX content pipeline for `content/resources`. DEC-009 locked "MDX + structured frontmatter" but named no tool; the frontend architecture spec mandates MDX/YAML frontmatter without specifying an implementation. The stack is Next 16.2.6 (Turbopack default) / React 19, server-first and fully static.
- **Options considered:** 1) `@next/mdx` — Next's first-party integration; `mdx-components.tsx` maps MDX → primitives; needs `remark-frontmatter` to strip YAML + `gray-matter` to read it for listing/metadata. 2) `next-mdx-remote/rsc` — server `compileMDX` with built-in `parseFrontmatter`; no config changes, but a third-party (Hashicorp) render path with a slower cadence. 3) Velite — build-time Zod-validated content layer; best typing but heavier/newer than a 3-article site needs.
- **Chosen:** Option 1, `@next/mdx` (confirmed with the owner).
- **Reasoning / implementation:** Lowest long-term maintenance risk (first-party) and the `mdx-components.tsx` file convention is purpose-built for mapping MDX onto our token-driven primitives. Verified against the Next 16.2.2 docs (Context7): under Turbopack, remark/rehype plugins must be passed as **string module names** (functions can't serialize to the Rust compiler), so `next.config.ts` uses `createMDX({ options: { remarkPlugins: ["remark-frontmatter"] } })` + `pageExtensions: ["ts","tsx","md","mdx"]` — no webpack fallback needed. `remark-frontmatter` strips the YAML block from the rendered body; `gray-matter` reads it in `src/lib/content/resources.ts` (fs-based) for the index, `generateStaticParams`, and `generateMetadata`. Articles render via `await import(\`@/content/resources/${slug}.mdx\`)` (literal-prefixed template) with `dynamicParams = false`. Result: `/resources/[slug]` prerenders as static SSG; no client MDX runtime. New deps: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-frontmatter`, `gray-matter`.

### DEC-043: Resources IA — featured lead + restrained list, no filtering in v1

- **Status:** accepted (owner chose 2026-05-26)
- **Date:** 2026-05-26
- **Context:** P5-02 builds the `/resources` index. The sitemap fixes four content categories (Operational visibility / Financial systems thinking / Predictive operational intelligence / AI-assisted operational analysis) and warns against blog-template / content-farm aesthetics.
- **Chosen:** One calm featured lead (the most-recent `featured: true`, falling back to the most-recent overall) rendered as an inline editorial block, then the remaining articles as a restrained `grid-2` of `ResourceCard`s on a `border-t border-border-subtle bg-background-secondary` lifted section. No filtering, tag pages, category pages, or pagination in v1; categories appear as meta only. A calm one-line empty-state ("New writing is on the way.") when there is no content.
- **Reasoning:** Matches the sitemap's "calm, editorial, not a content farm" guidance and the owner's call. The `featured` frontmatter flag drives the lead; `ResourceCard` stays single-purpose (the featured lead is composed inline from primitives rather than adding a card variant). Filtering/pagination can be added when the content volume warrants it.

### DEC-044: Article byline — named author "Chats Kamburupitiya"

- **Status:** accepted (owner supplied the name 2026-05-26)
- **Date:** 2026-05-26
- **Context:** DEC-037 deliberately avoided inventing a founder/person name, allowing a named author only if the owner supplies a real one. P5 articles carry an `author` frontmatter field.
- **Chosen:** Use "Chats Kamburupitiya" (owner-supplied) verbatim as the `author` on every sample article; rendered in the byline with `text-secondary` (not `MetaText`/`text-muted`).
- **Reasoning:** Consistent with DEC-037 now that a real name exists. No invented person; the byline is a single source in each article's frontmatter and trivially editable.

### DEC-045: Article OG images inherit the shared marketing OG

- **Status:** accepted
- **Date:** 2026-05-26
- **Context:** The marketing-group `opengraph-image.tsx` (DEC-036) applies to all routes in the group; DEC-041 had Phase-4 pages inherit it. Articles have an `ogImage` frontmatter field, so Phase 5 must decide per-article vs inherit.
- **Options considered:** 1) Inherit the shared group OG image for all articles. 2) A per-article dynamic `opengraph-image` reading frontmatter.
- **Chosen:** Option 1 — inherit; no per-article OG in v1. Each article still exports `openGraph.{title,description,type:"article",publishedTime,authors}` via `generateMetadata`. The `ogImage` field stays in the schema (per the spec) but is reserved/unused.
- **Reasoning:** Consistent brand share card, no extra Satori/font surface to maintain, lower risk — the same rationale as DEC-041. Per-article OG can be added later if a flagship article needs a distinct card (the `ogImage` field is already there to drive it).

### DEC-046: Install `lighthouse` as a devDep + `npm run lighthouse` helper

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** P3 / P5 deferred a numeric perf / SEO baseline because `lighthouse` was not installed. Phase 6 needs first real numbers for `/`, `/framework`, `/about`, `/contact`, `/resources`, and all three articles before launch.
- **Options considered:** 1) Install `lighthouse` (Google's CLI) as a devDep + add a single helper script. 2) PageSpeed Insights API (no install but rate-limited and not callable against `localhost`). 3) Lighthouse CI (`@lhci/cli` — heavier, expects a config + assertions file).
- **Chosen:** Option 1. Added `lighthouse@^12.8.2` to `devDependencies`. New `npm run lighthouse` is a helper that takes URL + output path positionally (per-route invocation lives in the documented procedure, not in `package.json`).
- **Reasoning / outcome:** First-party Google tooling, runs against any URL, headless Chrome supplied. Procedure documented in PROGRESS: `rm -rf .next && npm run build && npm start &` (background) → per-route `npm run lighthouse -- http://localhost:3000<route> lighthouse/<name>` → kill `npm start` before any `npm test` (Playwright's `reuseExistingServer: true` would otherwise silently test the production build). HTML reports under `lighthouse/` are gitignored — only the numeric tuple lands in PROGRESS. Recorded baseline: every one of the 8 routes scores **Perf 95 / A11y 100 / SEO 100 / BP 100**, clearing all targets with room.

### DEC-047: Sitemap priority + changeFrequency scheme

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** `src/app/sitemap.ts` emits one URL per page. `priority` and `changeFrequency` are largely advisory (engines mostly ignore them) but the chosen values should be defensible.
- **Chosen:** Home 1.0 / monthly · Framework 0.8 / monthly · Resources 0.7 / weekly · About 0.6 / yearly · Contact 0.6 / yearly · articles 0.6 / yearly. Article `lastModified = new Date(publishedAt)`; static pages use build time. The home `<loc>` is `${SITE_URL}` with **no trailing slash**, matching the canonical link Next emits for `path: "/"` — one source of truth.
- **Reasoning:** Honest priorities — home > positioning page > active editorial surface > info pages. Articles are evergreen essays, so `yearly` reflects reality; if an article is updated we'd revise frontmatter `publishedAt` or add a `dateModified` field then (not in scope now — consistent with DEC-045's reserved-field stance). Aligning home `<loc>` to the canonical avoids a cosmetic mismatch between sitemap and `<link rel="canonical">`.

### DEC-048: Robots policy — single open allow + absolute sitemap

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** `src/app/robots.ts` is a marketing-site robots.txt: no `/api`, no preview/staging routes in the repo, no admin surfaces.
- **Chosen:** `User-Agent: *` + `Allow: /` + `Sitemap: ${SITE_URL}/sitemap.xml`. No per-bot rules; explicitly **no** `disallow: /_next/`. No `host` directive (deprecated; most engines ignore it).
- **Reasoning:** Disallowing `/_next/` would block crawlers from fetching the chunks and images needed for Core Web Vitals lab equivalence, which would hurt our Perf scoring in third-party audits. The minimal open-allow keeps the surface tiny and easy to reason about.

### DEC-049: App icon mark — geometric "i" monogram, no font fetch

- **Status:** superseded
- **Date:** 2026-05-27
- **Context:** Phase 6 needs a favicon + apple touch icon. No logo asset exists; the owner will provide one later. The existing `(marketing)/opengraph-image.tsx` (DEC-036) sets the ImageResponse-with-Satori pattern but fetches Newsreader from Google Fonts (with a timeout fallback).
- **Options considered:** 1) Two-shape "i" monogram (ink circle dot + ink rect stem) on bone — geometry only, no font fetch. 2) Lowercase "i" rendered with Newsreader via the same Google Fonts fetch as OG. 3) A single signal-indicator dot. 4) A static `public/favicon.ico` (bypasses ImageResponse entirely).
- **Chosen:** Option 1. `src/app/icon.tsx` (32×32, dot 5×5 + stem 4×14, 3 px gap) and `src/app/apple-icon.tsx` (180×180, dot 28×28 + stem 22×78, 18 px gap). Token hexes inlined (Satori cannot read CSS variables — same scoped exception as DEC-036). No `public/favicon.ico` — it would shadow `app/icon.tsx` (file-convention precedence), and the `public/` directory does not exist yet.
- **Reasoning:** Reads as the brand initial AND visually echoes the "signal indicator above a leading-indicator line" motif at favicon scale (where a wordmark is illegible). Zero network dep — the icon never needs to time-out and fall back. Reversible: when the owner provides a logo, swap the two files (or keep ImageResponse and replace the geometry with the logo's SVG paths). `<link rel="icon" sizes="32x32" type="image/png">` + `<link rel="apple-touch-icon" sizes="180x180">` confirmed in every `<head>`.
- **Superseded by:** DEC-063 — the owner supplied a real logo; `icon.tsx` was replaced by a static `icon.svg` and `apple-icon.tsx` now renders the real mark.

### DEC-050: Editorial 404 at root `app/not-found.tsx` + extracted MarketingShell

- **Status:** accepted (corrects an earlier planning assumption)
- **Date:** 2026-05-27
- **Context:** Phase 6 wants a calm editorial 404 inside the Navbar + Footer shell. The original plan placed the file at `src/app/(marketing)/not-found.tsx` on the assumption that the route group's layout would wrap it. Reality: `(marketing)/not-found.tsx` only catches `notFound()` calls **from within** the (marketing) segment — for URLs that match nothing at any segment (`/this-route-does-not-exist`), Next 16 walks up to the **root** and uses `app/not-found.tsx`. With no root not-found.tsx, Next falls back to its bare default — confirmed by a failing Playwright test (`banner not found`).
- **Options considered:** 1) Keep `(marketing)/not-found.tsx` only — accept that unmatched URLs get Next's default 404 (rejected: wrong UX). 2) Duplicate the shell inline inside `app/not-found.tsx` (works but invites drift). 3) Extract a shared `MarketingShell` component and have both the (marketing) layout and the root `not-found.tsx` consume it.
- **Chosen:** Option 3. New `src/components/layout/marketing-shell.tsx` (skip link + Navbar + `<main id="main">` + FooterCTASlot/FooterCTA + Footer); `src/app/(marketing)/layout.tsx` becomes a thin wrapper around `MarketingShell`; `src/app/not-found.tsx` (root) renders `MarketingShell` + the 404 hero. The earlier `(marketing)/not-found.tsx` was removed.
- **Reasoning:** Single source of truth for the shell, zero behavior change for existing routes (verified by the unchanged 27 tests + the new 39-test green run), and unmatched URLs now inherit the same navigation as every other page. If a non-marketing route group is added later it will need its own `not-found.tsx`, but that's a problem for that future group.

### DEC-051: Per-article JSON-LD as `@type: Article` (not NewsArticle)

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** Phase 6 adds structured data to `/resources/[slug]` so the Resources surface gets a rich-result signal. schema.org offers `Article` (broad, evergreen) and `NewsArticle` (stricter — implies journalism + a news-org publisher).
- **Chosen:** `@type: Article`. Shape: `@context`, `@type`, `headline`, `description`, `datePublished` (from `publishedAt`), `author` (`Person`, name = `resource.author`), `publisher` (`Organization`, name = "Insightful Financial Analytics", logo URL = `${SITE_URL}/icon`), `mainEntityOfPage` (`WebPage` `@id` = canonical). Rendered via a `<script type="application/ld+json">` before the first `<Section>`, with `dangerouslySetInnerHTML` + single-line `JSON.stringify` (the Google-blessed pattern). Combined with `alternates: { canonical: \`/resources/${slug}\` }` in `generateMetadata`.
- **Omissions and why:** `image` omitted in v1 — Article doesn't require it and the `/opengraph-image` route is hash-routed at build (`/opengraph-image-pwu6ef.png`), so a hand-written URL would 404. If the Rich Results validator asks for it later, point at the actual hashed URL emitted by Next. `dateModified` omitted — we don't track it in frontmatter (consistent with DEC-045's "reserved" stance).
- **Reasoning:** These are evergreen essays on operational frameworks, not journalism with editorial-record dates. Article is the safe, broad default; NewsArticle would obligate us to invent news-org publisher context. The publisher Organization + `/icon` logo is included even though optional for Article — stable shape if we ever migrate to NewsArticle.

### DEC-052: Per-route `alternates.canonical` on all 5 static pages; no per-route Twitter fields

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** `metadataBase` (DEC-036) already gives every page a sensible default canonical. But per-page `alternates.canonical` is explicit, survives query-string crawls (`?utm=...`), and shows in page source.
- **Chosen:** Added `alternates: { canonical: "<path>" }` to the `metadata` block of `/`, `/framework`, `/about`, `/contact`, `/resources` (article canonicals via DEC-051). **No** per-route `twitter.title` / `twitter.description` — root layout's `twitter: { card: "summary_large_image" }` + each page's `openGraph.{title,description}` already produces correct Twitter cards via Twitter's documented OG-fallback.
- **Notes:** Homepage `metadata.title.absolute` ("Insightful Financial Analytics — See operational risk earlier") is kept intentionally — it bypasses the root `title.template` to render the brand statement verbatim. Don't "fix" it. Next normalizes `canonical: "/"` to `${SITE_URL}` (no trailing slash); the sitemap home entry matches (DEC-047) so both surfaces agree.

### DEC-053: `.env.example` tracked with production domain documented

- **Status:** accepted
- **Date:** 2026-05-27
- **Context:** No `.env.example` existed; `metadataBase` falls back to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` is unset, which would emit the wrong absolute URLs in a Vercel deploy that forgot to set the env var. `.gitignore`'s blanket `.env*` rule (line 40) would silently exclude any `.env.example` we tried to add.
- **Chosen:** Created `.env.example` at repo root with `NEXT_PUBLIC_SITE_URL=https://insightfulfa.com` and a comment explaining what consumes it (metadataBase, sitemap absolute URLs, robots Sitemap line, JSON-LD canonical / publisher logo). Added `!.env.example` exception immediately after the `.env*` rule in `.gitignore`; verified `git status` shows the file as visible. Domain confirmed in the Phase 6 scoping decision. Also added `/lighthouse/` to `.gitignore` (DEC-046 reports are environmental snapshots, not source).
- **Reasoning:** A fresh clone or a Vercel project setup needs ONE answer to "what's the production domain" — `.env.example` is that answer. Runtime still reads `NEXT_PUBLIC_SITE_URL` so Vercel project envs win over the documented default. Setting it in the Vercel project's production environment remains an owner launch step (tracked in PROGRESS "Immediate next actions").

### DEC-054: Hero illustration — candidate raster (campfire scene) swapped in for the placeholder SVG

- **Status:** proposed
- **Date:** 2026-05-28
- **Context:** The Phase 3 hero used a token-driven placeholder SVG ("layered operational contours with a single amber signal") that its own JSDoc flagged as a stand-in for "a future commissioned illustration." The owner introduced a candidate woodcut-style raster (campfire scene + bear in the background) which lines up directly with the on-brief metaphor from `illustration_art_direction_spec_insightful_fa.md` ("campers around a campfire with bear emerging unnoticed" — the bear represents hidden operational risk).
- **Options considered:** 1) Keep placeholder until commissioned art is delivered. 2) Swap to the candidate raster permanently. 3) Add as a toggleable variant behind a flag for A/B comparison.
- **Chosen:** Option 2 (proposed). `src/components/illustration/hero-illustration.tsx` rewritten to render `<Image>` from `next/image` (priority, decorative `alt=""`, wrapper `aria-hidden`, `sizes="(min-width: 1024px) 55vw, 100vw"`, `width={1536}` `height={1024}` matching the actual PNG). Source asset at `public/illustrations/hero-campfire.png` (1536×1024 RGBA with feathered alpha edges so the raster blends organically into `--background-primary` with no hard rectangle).
- **Reasoning:** Subject is bullseye on-spec for the hero metaphor and the engraved/monochrome execution matches the prescribed art-direction style (modern engraved editorial, monochrome, warm bone palette). A first iteration used a CSS `mask-image: radial-gradient(...)` on top of a hard-edged crop; replaced when the owner supplied a PNG with native alpha feathering (cleaner, no double-fade). Source PNG is 3.8 MB unoptimized — tracked under P7-01. Status remains `proposed` until owner visual sign-off; reversible via `git checkout` of `hero-illustration.tsx` + deletion of the PNG (placeholder SVG returns via git history).

### DEC-055: Hero copy — image-anchored question + answer

- **Status:** proposed
- **Date:** 2026-05-28
- **Context:** DEC-037 locked the Phase 3 hero h1/subhead from the approved copy directions ("Most financial problems begin long before they appear in reporting." + the "detect operational patterns…" paragraph). With the new illustration (DEC-054), the owner chose a copy iteration that anchors directly to the bear-as-hidden-risk metaphor.
- **Chosen:** h1 → "See the bear?" Subhead → "Most businesses don't. Insightful Financial Analytics helps businesses detect operational patterns, inefficiencies, and emerging risks early, giving you the visibility needed to make better, more informed decisions." Renders through the existing `Heading` (display ramp, `text-display-md lg:text-display-lg`) + `Text size="body-lg"` `text-text-secondary`; no token deviation, no banned vocabulary.
- **Reasoning:** A three-word interrogative headline makes the bear metaphor explicit and turns the illustration from decoration into the copy's first beat, then the subhead answers ("Most businesses don't.") before pivoting to the value proposition. Supports the brand voice's "see earlier" thesis. Status `proposed` pending owner visual sign-off; reversible by reverting `hero-section.tsx`. Side effect to watch on review: the short headline at `display-lg` (~64px on desktop) creates noticeably more vertical breathing room in the hero column than the previous long-form headline — may need a sizing or spacing tune if the column reads top-heavy or empty.

### DEC-056: Interactive viz — `"use client"` at component level, no external charting library

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** P7-02 and P7-03 add `onMouseMove`/`onMouseLeave` interactivity to `ForecastLine` and `SignalTimeline`. The surrounding sections (`OutcomesSection`, `ProblemSection`) are Server Components. The question is where to place the `"use client"` boundary and whether to introduce a charting library.
- **Options considered:** (1) `"use client"` on the viz component files themselves — boundary at the smallest possible unit, sections stay server. (2) `"use client"` on the section components — simpler but converts two full sections to client JS. (3) Introduce Recharts or D3 for the interactive charts. (4) Custom SVG + React hooks only, no library.
- **Chosen:** Options 1 + 4. `"use client"` added directly to `forecast-line.tsx`, `signal-timeline.tsx`, and `signal-indicator.tsx`. Cursor math for `ForecastLine` uses a `useEffect`-populated lookup table via `SVGPathElement.getPointAtLength()` — the Bezier path is static and known, so no library is needed. Tooltip fade uses Framer Motion (`AnimatePresence`/`motion.div`), already a project dependency.
- **Reasoning:** Matches the existing pattern (`Reveal`, `NavLinks`, `MobileMenu`, `FooterCTASlot` are all leaf-level client components used inside server sections). Minimises the client JS surface. No charting library dependency: D3 is ~80 KB and Recharts is heavier than the task warrants; for 2–3 restrained charts on a marketing site, custom SVG + React is the correct call. All colors remain CSS-token-driven; `prefers-reduced-motion` is handled via `useReducedMotion()` from `motion/react`.
- **Amended by DEC-058 (2026-05-29):** the "no charting library" clause is refined — `d3-shape`/`d3-scale` are adopted as pure math helpers (not a charting framework), and the `getPointAtLength()` lookup is replaced by data-driven geometry. The `"use client"`-at-leaf boundary established here stands unchanged.

### DEC-057: `ASSET-REQUIREMENTS.md` as a standalone delivery brief in `docs/build/`

- **Status:** superseded by DEC-059 (2026-05-29) — the file was relocated to `docs/get-started/`
- **Date:** 2026-05-29
- **Context:** The project needs a document the illustrator/designer can be handed directly covering format, dimensions, naming, and delivery specs. The options were to embed this in CONVENTIONS.md, append it to the illustration art direction spec in `docs/get-started/`, or create a standalone file.
- **Options considered:** (1) Standalone `docs/build/ASSET-REQUIREMENTS.md`. (2) A section in CONVENTIONS.md — audience mismatch; CONVENTIONS is a developer coding guide. (3) Append to `docs/get-started/illustration_art_direction_spec_insightful_fa.md` — violates DEC-011 (specs are read-only source of truth).
- **Chosen:** Option 1.
- **Reasoning:** Clear audience separation: the art direction spec is the style/creative brief; `ASSET-REQUIREMENTS.md` is the production brief (what to deliver, format, size, naming). The file lives in `docs/build/` alongside the other project-management documents and cross-references the art direction spec for style guidance. DEC-011 is not violated.

### DEC-058: Data-viz enrichment — adopt `d3-shape`/`d3-scale` as math helpers (amends DEC-056)

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** The owner judged the Phase 7 viz (P7-02→P7-05) "too sparse and too simple" — each chart was one line plus a couple of dots built from hardcoded coordinate strings. The ask: add substantially more visual detail without a heavy dependency, while holding the brand's editorial-restraint bar (no dashboard density).
- **Options considered:** (1) Pure hand-authored SVG, no new deps. (2) `d3-shape` + `d3-scale` as pure math helpers, still hand-authoring the SVG. (3) A chart component framework (Recharts/visx). (4) Full `d3`.
- **Chosen:** Option 2. Added `d3-shape` + `d3-scale` (+ `@types/*` devDeps) — pure, tree-shakeable functions that return SVG path `d` strings and numeric scales. We keep authoring our own SVG and applying our own tokens; d3 only does geometry. Chart data + derived geometry live in a new pure, server-safe `src/lib/data-viz/` module; the three viz components stay `"use client"` leaves. A shared `VizTooltip` primitive (`src/components/data-viz/viz-tooltip.tsx`) dedupes the AnimatePresence/motion/reduced-motion/panel block previously copied across all three.
- **Reasoning:** Not a charting framework — no `d3-selection`/`d3-axis`/Recharts, so the rendering and editorial look stay fully under our control and avoid the dashboard aesthetic the brand forbids. SSR-safe (verified: `/` and `/framework` still prerender static after the change). ~6–9 KB added only to client chunks that import them. Also fixes the prior magic-number geometry and the brittle `getPointAtLength()` DOM-measurement lookup (cursor now snaps to a real data point via `nearestByX`). **Amends DEC-056's "no charting library" clause** (the boundary placement in DEC-056 is unchanged). Enrichments delivered: ForecastLine gained an area fill, hairline gridlines, a faint reporting-lag comparison line, data points, mono axis labels, and a draw-on reveal; SignalTimeline gained a magnitude track, an always-visible measured lead-time brace, and a week axis; SignalIndicator gained an inline micro-trend sparkline. **A11y contract change:** `SignalIndicator` moves from purely decorative to a focusable, labeled supplementary mark (`role="img"` + `aria-label`, `tabIndex=0`, tooltip on focus as well as hover) so keyboard/screen-reader users get the metric unconditionally — previously the metric mounted only on mouse hover. Found and fixed a latent tooltip bug shared with the original: Framer Motion drives `transform` for the `y` fade, clobbering the static anchor transform, so the tooltip flip/offset never applied — `VizTooltip` now isolates the anchor transform on a static inner element.

### DEC-059: `ASSET-REQUIREMENTS.md` relocated to `docs/get-started/` (supersedes DEC-057)

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** DEC-057 placed `ASSET-REQUIREMENTS.md` in `docs/build/`. The owner subsequently moved it to `docs/get-started/`, next to the illustration art-direction spec it extends.
- **Chosen:** Keep `ASSET-REQUIREMENTS.md` at `docs/get-started/ASSET-REQUIREMENTS.md`. DEC-057 is marked superseded (its "lives in `docs/build/`" rationale no longer holds) rather than edited, preserving the audit trail.
- **Reasoning:** The brief is now colocated with the read-only creative spec it references, so an illustrator/designer finds both in one place. It remains a separate file (DEC-011 — specs are read-only — is still honored; this is a sibling project doc, not an edit to a spec). Stale `docs/build/ASSET-REQUIREMENTS.md` references were repointed (PROGRESS.md).

### DEC-060: Remove the OutcomeCard SignalIndicator; per-page chart variants

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** A design review of the Phase 7 viz surfaced two issues. (1) The `SignalIndicator` (dot + micro-trend sparkline) on every OutcomeCard was identical on all four cards, so the visible mark encoded nothing; its only differentiating content (the metric) was hidden behind a hover that is undiscoverable and absent on touch; and a sparkline implies a time-trend that the qualitative outcomes ("Full view", "Reduced", "Stronger") don't have — even contradicting "Reduce…". (2) The homepage and Framework page rendered identical `ForecastLine`/`SignalTimeline` charts.
- **Chosen:**
  - **(a) Remove the SignalIndicator from `OutcomeCard` entirely.** Cards revert to a calm statement under the amber dash. Deleted the now-unused `src/components/data-viz/signal-indicator.tsx` and `src/lib/data-viz/indicator-data.ts`, and the `SignalVariant`/`SignalTrend` types. Reverses the card portion of P7-04 / P7-05 / P7-10.
  - **(b) Add a `variant: "compact" | "detailed"` prop** to `ForecastLine` and `SignalTimeline`. Homepage uses `compact` (default — unchanged); the Framework page passes `detailed`. ForecastLine detailed labels the four framework phases (Observe → Connect → Forecast → Respond) along the axis and shades a "window to act"; SignalTimeline detailed shows several disconnected systems' signals converging into one financial impact ("across systems"). Per-variant data lives in the existing `lib/data-viz` modules; rendering branches on the prop (one component each, no forked files).
- **Reasoning:** The card mark was decoration that hid its only real content and implied a trend that didn't exist — it cut against the brand's editorial-restraint / "show real signal" ethos, so removal (whitespace over elements) is the on-brand call. Per-page divergence matches the pages' different jobs — homepage is a calm glance, the Framework page is a teaching surface — and ties each detailed chart to its section's content (the framework steps; "complex systems rarely fail all at once"). Still no dashboard density; detailed ≠ dense. `SignalIndicator` is therefore removed from the implemented component set; the read-only `component_inventory_system` spec still lists it as planned — logged here as an intentional divergence per DEC-011 rather than editing the spec.

### DEC-061: Chart labels as HTML overlays (consistent type size)

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** Chart labels were SVG `<text>` inside the `viewBox` SVG, which is `w-full`. SVG text scales with the viewBox, so the same `text-meta-sm` label rendered ~11px on a narrow chart but ~21–24px on the wider Framework hero (chart ~800px at desktop) — inconsistent across pages/viewports and competing with body copy. `vectorEffect="non-scaling-stroke"` pins stroke widths, but SVG has no equivalent for font-size.
- **Chosen:** Render every chart label as an HTML overlay `<span>` positioned over the SVG — new `src/components/data-viz/viz-label.tsx` (`VizLabel`), using the same percentage-of-viewBox positioning the tooltips already use (the chart wrapper is `relative` and its box equals the SVG box). Labels now use real CSS px (`text-meta-sm`, 11px), consistent everywhere regardless of chart width. Removed all SVG `<text>` from both charts. Repositioned the ForecastLine framework-phase markers to spread evenly across the axis (weeks 2/7/11/15 instead of clustered 2/6/9/12) so the now-fixed-size labels don't collide on narrow viewports.
- **Reasoning:** Matches the existing `VizTooltip` overlay pattern and unifies all chart text at 11px. Tradeoff: fixed-px labels no longer shrink with the chart, so closely-spaced labels can collide on narrow screens — handled by spreading the phase markers; verified clean from ~270px chart width up to ~800px. The `-100%` Y transform on `VizLabel` places the text baseline at the target coordinate, matching the SVG `<text>` it replaced.

### DEC-062: Chart line reveals via opacity fade, not SVG `pathLength`

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** The chart line reveals (P7-08/P7-09) used Framer Motion `pathLength` (a stroke-dashoffset "draw-on"). Combined with `vectorEffect="non-scaling-stroke"`, the normalized dash math breaks when the SVG renders above 1:1 scale — on the wide Framework page the timeline tracks and axis rendered incompletely (stuck at computed `stroke-dasharray: 0px 1px`), not reaching the impact dot; mobile (~1:1) was unaffected.
- **Chosen:** Replace the `pathLength` draw-on with an **opacity fade-in**. Faint lines that carry their own `opacity` (the magnitude track, the system tracks) fade via a wrapping `motion.g` — group opacity multiplies, preserving each line's opacity; the forecast signal line (full opacity) fades directly. The timeline axis is now static. `vectorEffect="non-scaling-stroke"` is kept on all strokes.
- **Reasoning:** Opacity reveals are scale-independent (the dots/brace already used them with no issue) and match the brand's `Reveal` fade language. Keeping `non-scaling-stroke` preserves consistent hairline widths — the same consistency goal as DEC-061; the alternative (dropping `non-scaling-stroke` so `pathLength` works) would make stroke widths scale ~2× on desktop. The draw-on flourish is traded for a calm fade. Verified at desktop scale: track right edges reach the impact dot (x≈316.5) and the axis spans the full width (x2=336), with `stroke-dasharray: none`.

### DEC-063: Real brand logo wired into navbar / footer / favicon / app icon

- **Status:** accepted
- **Date:** 2026-05-29
- **Context:** The owner supplied the real logo (delivered as `ifa_logo_final_black.svg` + `ifa_logo_final_white.svg`): a ribbon **mark** plus a three-line stacked **wordmark** "Insightful / Financial / Analytics", `viewBox 0 0 262.33 141.77`, fill `#231f20` (an Illustrator export with a `<style>`/`.cls-1` block). This closes the DEC-049 carryover (placeholder "i" icon) and replaces the serif **text** wordmark in the navbar (P2-01) and footer (P2-03).
- **Options considered:** (a) *Render* — inline SVG via `currentColor` vs `next/image` vs a `dangerouslyAllowSVG` optimizer config; (b) *Navbar* — full stacked lockup vs mark-only vs mark + serif text; (c) *Favicon* — static `app/icon.svg` vs keep dynamic `icon.tsx`; (d) *Apple icon* — static PNG export vs keep the ImageResponse pattern.
- **Chosen:**
  - **Assets → `public/icons/`** per ASSET-REQUIREMENTS "delivery paths": `logo-wordmark.svg` (lockup, charcoal), `logo-wordmark-inverse.svg` (white — stored for future dark contexts, unused in v1), `logo-mark.svg` (mark cropped to a square `viewBox="16.44 22.48 96 96"` via `getBBox`).
  - **New `src/components/brand/`** — `logo.tsx` (`<Logo variant="lockup" | "mark">`) + `logo-art.ts` (the mark's `MARK_VIEWBOX`/`MARK_PATH`, derived from the lockup; the full lockup renders from the SVG file, so only the mark is inlined).
  - **Navbar = full lockup** via `next/image` at `h-[var(--space-2xl)]` (64 px), with the bar's vertical padding reduced from `--space-sm` to `--space-2xs` (16 → 4 px) so the lockup fills the bar (≈73 px tall); the home link keeps `aria-label="Insightful Financial Analytics"` and the lockup is decorative. *(Owner reviewed a mark-only nav first and chose to keep the wordmark — the reduced padding makes the 3-line wordmark legible at 64 px, verified desktop + mobile. The `mark` variant stays in `<Logo>` for future compact use.)*
  - **Footer = full lockup** via `next/image` (`unoptimized`) at `h-[var(--space-3xl)]` (96 px), where the wordmark is legible; `alt` carries the brand name. Carries `self-start` so it sizes to the artwork's aspect (~178 px) rather than stretching to the flex-column width — the `Stack` container defaults to `align-items: stretch`, which otherwise blew the `w-auto` image out to the full 1.6fr column (~428 px).
  - **Favicon:** static **`src/app/icon.svg`** (mark on the bone field) replaces the dynamic **`src/app/icon.tsx`** (deleted — both implement the `icon` convention and cannot coexist).
  - **Apple icon:** `src/app/apple-icon.tsx` keeps the `ImageResponse` pattern but renders the real mark inline (`<svg><path>`) on bone with iOS safe-area padding.
- **Reasoning:** Inline `currentColor` keeps the navbar mark token-consistent and hoverable with zero extra wiring; `next/image unoptimized` renders the path-heavy lockup straight from the file (single source of truth) and sidesteps the image optimizer's SVG restriction **without** globally enabling `dangerouslyAllowSVG`. A static SVG favicon is crisp at any tab scale; the Apple convention rejects a static `.svg`, so that icon stays code-generated (charcoal inlined — Satori cannot read CSS variables, same scoped exception as DEC-036/DEC-049). The delivered SVGs keep their `<style>`/hex because they render through `<img>`/`next/image`, where the internal style is document-scoped — the spec's "no `<style>` / `currentColor`" hygiene applies to inlined marks, not file-served ones. Verified: `npm run lint` (0), `npm run build` green (`/icon.svg` + `/apple-icon` both static, no conflict, TS clean), all icon/asset routes 200, navbar + footer render, and the `/apple-icon` PNG draws the mark.
- **Spacing follow-up (2026-05-30):** the owner re-cropped `logo-wordmark.svg` tight (viewBox → `0 0 205.8 84`, aspect 2.45). Two consequences: (1) the `<Logo>` `next/image` `width`/`height` **must track the viewBox** (updated 262×142 → 206×84) or the optimizer reserves the wrong ratio and distorts the lockup; (2) breathing room is added in **CSS, never baked into the asset** — the navbar bar padding (`py`) is the margin (currently `--space-xs`), keeping the file tight so the footer box stays artwork-sized and the favicon mark stays edge-tight. A padded viewBox would re-bloat every other placement. *(The standalone mark assets — `logo-mark.svg`, `logo-art.ts`, `apple-icon.tsx` — remain on the original coordinate space; they render correctly and are independent of the re-cropped lockup. Regenerate only if their art changes.)*
- **Final sizing + favicon (2026-05-30):** navbar lockup finalized at `h-[var(--space-xl)]` (48 px) in a ~65 px bar (`py` = `--space-xs`, 8 px breathing room) — owner-approved; the tight crop makes the wordmark legible at 48 px. Favicon swapped to a **circular bone badge** (`src/app/icon.svg` = full-bleed `#fbf7ef` circle + charcoal mark, ~1.6 KB) replacing the bone *square*; the square version is archived at `public/icons/logo-mark-square.svg`. The **apple-icon stays a full-bleed bone square** (iOS masks corners itself — a floating circle would expose them). `logo-wordmark-inverse.svg` was **removed**: no surface uses it (single bone theme; the OG image is light-bg serif *text*, not the logo) — re-export a cropped inverse only if a dark surface (dark mode / dark section / dark social card) is ever added.
- **Supersedes:** DEC-049

### DEC-064: Resources featured lead — whole-block link + eyebrow label (removes "Read article")

- **Status:** accepted (owner chose "no boxes" 2026-05-30)
- **Date:** 2026-05-30
- **Context:** On `/resources` the featured lead (DEC-043, composed inline) and the `ResourceCard`s below it had inconsistent interaction. Each card is a single `<Link>` whose title underlines on `group-hover`; the featured block was static text with a separate `Button variant="text"` "Read article" CTA — no whole-block click, no title hover. "Featured" was also bundled into the meta line (`Featured · {category} · {date}`) rather than presented like the "More writing" section label. The owner asked to make the two consistent and weighed adding card outlines.
- **Chosen:** Make the featured lead behave like a larger `ResourceCard`, with **no card borders/boxes**: (1) wrap meta → title → description in one `<Link className="group … block">` (whole block clickable, pointer, keyboard-focusable with the same `focus-visible:outline-signal-focus` ring); (2) move the card's title underline onto the featured `<Heading>` (`decoration-border-strong underline-offset-4 group-hover:underline`), keeping its larger `heading-xl` scale; (3) render "Featured" as an `<EyebrowLabel>` section label above the article (mono/uppercase, mirroring "More writing"), leaving `{category} · {date}` as the only line above the title; (4) delete the "Read article" `Button`. The featured `<Link>` omits the card's `border-t pt-[var(--space-lg)]` — it is the lead, not a list row.
- **Reasoning:** The owner's goal — "make it obvious these are separate, clickable articles" — is met by the whole-block click + title hover-underline the cards already use, so explicit outlines were rejected as conflicting with DEC-043's "calm, restrained list, not a content farm" and the "no card-grid overload" hard rule. Stays composed inline from primitives (no new card variant), so DEC-043 still holds. Single file changed (`resources/page.tsx`): `Button` import dropped, `next/link` added. The featured title stays the single `<main>` `<h2>` and the eyebrow a `<p>`, so `e2e/resources.spec.ts` (asserts exactly one `<main>` h2) stays green. Verified: lint/tsc/format clean, `e2e/resources.spec.ts` 2/2; preview-inspect confirmed the featured title's hover classes, the eyebrow's computed mono/uppercase styles matching "More writing" exactly, no border/outline on the lead, pointer cursor, and the link target (`/resources/seeing-operational-risk-earlier`) returning 200.
- **Plane + spacing follow-up (2026-05-30, two rounds):** owner flagged ~308px of dead air between the intro and the featured block — stacked `hero` (180px bottom) + `editorial` (128px top) padding with no boundary, since both sat on `--background-primary` (bone-100). **Round 1:** lifted the featured `Section` onto `border-t border-border-subtle bg-background-secondary` (bone-50) and trimmed the intro `hero` padding 180→128 via `className="py-[var(--section-space-md)]"` — the same override the homepage hero uses (DEC-054; note `cn` is clsx-lite, **not** `tailwind-merge`, but a same-property `py` override still resolves — homepage-proven and verified). **Round 2:** round 1 left featured + "More writing" + the shell `FooterCTA` all on bone-50 with **same-color hairlines** between them, which the owner disliked; so "More writing" was flipped back to bone-100 (dropped its `bg-background-secondary`, kept `border-t`). The page now **alternates planes top-to-bottom — bone-100 → bone-50 → bone-100 → bone-50** (hero / featured / more-writing / footer-cta), so every `border-t` hairline sits on a real tone change and none divides two identical fills. Result: intro→featured gap 256px (from 308) with a tone + hairline boundary. Verified via preview-inspect: plane order `[bone-100, bone-50, bone-100, bone-50]`, `alternates: true`; hairlines `rgba(31,37,34,0.1)`; hero padding 128/128. (Featured kept at `editorial` 128px top — tune later if desired.)
- **Amends:** DEC-043 (interaction + label of the featured lead; the inline-primitives / restrained-list shape is unchanged)

### DEC-065: Hero image load-fade (opacity-only, CSS keyframe) + cross-page image-motion principle

- **Status:** accepted (owner visual sign-off 2026-05-30)
- **Date:** 2026-05-30
- **Context:** The hero illustration appeared abruptly on load while every section below it fades up via `Reveal`, an inconsistency the owner asked to fix. The hero is deliberately not wrapped in `Reveal` (DEC-027/032: Reveal SSRs `opacity:0` until hydration, and the hero image is the LCP element loaded with `priority`), so it needed its own entrance. The owner also asked for the generalizable rule for future images.
- **Options considered (mechanism):** 1) Wrap the hero in the existing `Reveal` — rejected; reintroduces the hydration-gated `opacity:0` + LCP problem DEC-027/032 exist to avoid. 2) JS `onLoad`-gated fade (client component) — looks correct at any image weight but gates the LCP element's visibility on hydration and needs a no-JS fallback. 3) CSS `@keyframes` opacity fade.
- **Options considered (style):** opacity-only vs. fade-up (the 12px drift the sections use).
- **Chosen:** Option 3 (CSS keyframe) + **opacity-only**. `hero-image-in` keyframe + `.hero-image-fade` class in `globals.css` (`animation: hero-image-in var(--transition-slow) var(--ease-soft) both`), applied to the `<Image>` in `hero-illustration.tsx`. `prefers-reduced-motion: reduce` removes the animation (opacity defaults to 1).
- **Reasoning (mechanism):** A CSS keyframe runs at first paint — never gated on hydration, so it does not delay the LCP element the way a JS/Framer-Motion fade would; `animation-fill-mode: both` holds the end state visible even with JS disabled; and `HeroIllustration` stays a server component (no `"use client"`). Consistent with DEC-062, which already chose opacity fades (not transforms) for the chart reveals. Uses the existing `--transition-slow` (700ms) / `--ease-soft` tokens — a touch slower than the section reveals (320ms) because the hero is the single focal entrance, not one of many.
- **Reasoning (style — and the general principle):** Opacity-only because the hero image animates *alone* beside copy that renders instantly; an upward drift would read as a layout-shift asymmetry, and a 12px transform on a hero-scale raster pushes against "no large transforms" (CONVENTIONS). The generalizable rule for future images: **fade-up when the image rises into view as part of a group (i.e., it lives inside a section's `Reveal` and moves with its heading/copy — the common, no-extra-code case); opacity-only when it animates alone or is hero-scale/above-the-fold.** Deciding factors are the *trigger* (load vs. scroll-into-view) and whether it moves *solo or with a group* — not literally "hero vs. not-hero." Below-the-fold supporting images (e.g. future Resources card thumbnails, should DEC-043's no-thumbnail stance ever change) therefore need no bespoke animation — they inherit their section's fade-up — but must carry explicit `width`/`height` (lazy-loaded, not `priority`) to avoid CLS.
- **Verification:** Re-run Lighthouse on `/` to confirm Performance stays ≥ 90 (the fade is LCP-neutral in theory; measured to confirm). Status stays `proposed` until owner visual sign-off; reversible by removing the one class + the `globals.css` block.

### DEC-066: Illustration optimization — lossy WebP via a sharp pipeline script; sharp as a devDep

- **Status:** accepted
- **Date:** 2026-05-30
- **Context:** The hero illustration `public/illustrations/hero-campfire.png` (DEC-054) shipped at 3.8 MB unoptimized — 1536×1024 RGBA with a feathered-alpha vignette and entropy ≈ 7.80/8 (dense engraving + sky/firelight gradients). P7-01 must shrink it to <500 KB without visible degradation, set a repeatable convention for `public/illustrations/*`, and keep homepage Lighthouse Perf ≥ 90. `next/image` already re-encodes to an optimized WebP at delivery (AVIF is opt-in via `images.formats`, which we don't set), so the committed source size is a repo-hygiene / optimizer-input concern, not the bytes users download.
- **Options considered:**
  1. Optimized lossy PNG in place — keeps `.png`, no code change. Rejected: PNG's only lossy lever is ≤256-colour palette quantization; measured, it bands in the gradients and still can't reach <500 KB on this content.
  2. **Lossy WebP source** — one-line `src` change; native alpha. Measured: hits the budget cleanly at quality 75 / alphaQuality 80 = **466 KB** with the feather intact (alpha PSNR ≈ 54). **Chosen** (owner-confirmed).
  3. Downscale + PNG — rejected: the draft is already 1536 (under the 1920 spec floor); downscaling further would lose retina sharpness the engraving needs at ~65vw, and it still bands.
  4. AVIF source — smallest (q55 ≈ 256 KB) and slightly sharper, but AVIF-source → AVIF-delivery is a same-codec re-encode, slower to build, and a less conventional source; kept only as a fallback rung (`--format avif`).
- **Measured (1536×1024 hero):** WebP floors ~566 KB at quality 68 with lossless alpha — the smooth alpha plane dominates. Dropping alphaQuality 100 → 80 (feather still alpha-PSNR ≈ 54, visually lossless) brings quality 75 to **466 KB**. WebP colour PSNR is flat (~22.7) from q68–q80 because the loss is grain-smoothing, not detail loss — confirmed visually against the master (bear-fur and foliage crops show no perceptible degradation). Final params: **quality 75, alphaQuality 80, effort 6, smartSubsample** → 476,986 B.
- **Chosen:** Commit `public/illustrations/hero-campfire.webp` (q75 a80, 466 KB) as the web asset; `git rm` the 3.8 MB PNG (master recoverable via `git show 250cb35:public/illustrations/hero-campfire.png`, kept in design storage). Repoint the one `next/image` `src` in `hero-illustration.tsx` to `.webp`. Add `scripts/optimize-illustration.mjs` (sharp; `<input>` + `--format/--quality/--alpha-quality/--effort/--max-edge/--out/--max-bytes/--dry-run`; writes a sibling, never overwrites, reports before/after, exits non-zero over the 500 KB budget) + an `optimize:img` npm script. Declare `sharp@^0.34.5` in `devDependencies` (already present transitively via Next 16) so the script's `import` is a documented contract. Document the convention in CONVENTIONS.md. `next.config.ts` is untouched — Next's defaults already emit optimized WebP (verified: `/_next/image` returns `image/webp`).
- **Reasoning:** WebP is the only format meeting <500 KB _without visible degradation_ on this high-entropy RGBA engraving, with a one-line change and native alpha that preserves the feathered vignette. The double-lossy cost (WebP source → `next/image` WebP re-encode) is negligible for a decorative (`alt=""` / `aria-hidden`) hero: the source is encoded high; the smaller responsive variants are dominated by the downscale; and `next/image` can't upscale past the 1536 source, so the full-width variant ≈ the source. Same-codec WebP→WebP generation loss at q75 is below perceptual threshold at hero scale. The ASSET-REQUIREMENTS "deliver a PNG master, don't pre-compress to WebP" line is _designer-delivery_ guidance — the lossless PNG remains the master; converting it to the committed WebP is this pipeline's job, so no spec is edited (DEC-011 honoured). sharp is already built with libwebp 1.6.0 and is require-able today.
- **Scope / status:** The optimization convention, the script, and the sharp devDep are firm (`accepted`). The specific hero _asset_ still rides on DEC-054 / DEC-055 (proposed, pending owner visual sign-off); if the campfire hero is replaced, only the asset + `src` change again — the pipeline is image-agnostic. Git history is not rewritten (the 3.8 MB blob remains in history; a `git filter-repo` purge, if ever wanted, is a separate owner-approved task). Completes the optimization deferred in DEC-054.
- **Follow-up (2026-05-30) — flatten onto bone, drop the alpha channel (reverses the "preserve alpha" choice above):** Testing the live Vercel deploy (`insightful-fa.vercel.app`) revealed the transparent WebP renders with a **black** feathered vignette for any client whose request `Accept` header omits `image/webp` — `next/image` then serves its **JPEG fallback**, and JPEG has no alpha, so the transparent edge composites onto black. Reproduced directly: `/_next/image?...` returns `image/webp` for normal mobile Safari but `image/jpeg` with `[0,0,0]` corners for `Accept: */*`, no-Accept, and png-only clients (in-app webviews, or opening the image URL directly — the likeliest way the owner hit it). Options weighed: (a) **flatten the source onto the bone page bg** and drop alpha; (b) set `images: { formats: ["image/webp"] }` to suppress the JPEG fallback — rejected: per the Next docs the optimizer still falls back to the *source format* when no configured format matches `Accept`, so a transparent-but-non-webp client would still get a transparent→black render, and it adds config we'd otherwise avoid; (c) `unoptimized` on the hero — rejected: throws away responsive resizing for the LCP image. **Chosen (a):** the optimizer now `flatten({ background: "#f7f2e8" })` (bone-100 = `--background-primary`, the hero `Section`'s actual bg per DEC-032) by default, with a `--background none` escape hatch. Identical on the always-bone single-theme page (the feather still dissolves into bone — no hard rectangle), correct in **every** format/client, and **smaller** (the alpha plane was the size driver): **q75 → 264,758 B (259 KB)**, down from the 466 KB transparent version, 93% under the original PNG. Verified: committed WebP corners = `247,242,232` (bone ✓, opaque), and a simulated JPEG re-encode keeps bone corners (no black). The `alphaQuality` param is retained but only bites under `--background none`. `hero-illustration.tsx` is unchanged (still `.webp`, decorative, `priority`). **Note:** this is independent of the separate owner-side issue that the apex domain `insightfulfa.com` still serves an old WordPress "coming soon" page (nginx, not Vercel) — the correct deploy is `insightful-fa.vercel.app` until DNS is repointed.

### DEC-067: Adopt the Phase 8 hybrid copy revision (supersedes the locked homepage copy)

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** A friend's (Chats's) alternative copy draft (`website content.docx`) prompted a full review of the live site copy. Chats's draft pulled toward a direct-response, predictive-finance funnel; the owner reviewed honest feedback, chose a hybrid direction, and edited it into the three-way comparison at `docs/build/copy-revision-comparison.md`.
- **Options considered:** 1) Keep the locked DEC-037 editorial copy unchanged. 2) Adopt Chats's direct-response / predictive draft wholesale (funnel, lead magnet, fear hook). 3) Hybrid: keep the calm editorial voice and conversation-first conversion, but adopt Chats's concreteness, the bear hook, and a more buyable framework.
- **Chosen:** Option 3, the hybrid, per the owner-edited comparison doc.
- **Reasoning:** Concrete, recognizable buyer pains and the bear hook strengthen recall without abandoning the premium editorial positioning; conversion stays a conversation (no funnel, no lead magnet, no emojis). The new copy supersedes the locked homepage directions in DEC-037 for the affected sections and updates the hero subhead in DEC-055. The source of truth for the exact strings is `docs/build/copy-revision-comparison.md`. Keeps DEC-039 (mailto) and DEC-014 (five-page scope).
- **Supersedes:** DEC-037 (affected sections); updates DEC-055 (hero subhead)

### DEC-068: Name the framework "The IFA Predictive Control Framework™"; allow explicit predictive / dashboards language

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** Chats's draft named the methodology "The IFA Predictive Control Framework™" and foregrounds predictive dashboards. The foundational copy/voice specs deliberately promised "earlier visibility, not perfect prediction", and the homepage framework headline was "Operational visibility requires more than dashboards", steering away from a dashboard-vendor read.
- **Options considered:** 1) Keep "earlier visibility, not prediction" and name the framework around visibility (e.g., "Operational Visibility Framework"), avoiding "predictive" / "dashboards". 2) Adopt "The IFA Predictive Control Framework™" as a trademarked, ownable name and use "predictive" and "dashboards" explicitly.
- **Chosen:** Option 2 (owner's call).
- **Reasoning:** The owner wants an ownable, trademarked framework and the stronger forward-looking promise. Recorded tradeoff (flagged in review, accepted by the owner): this is a deliberate shift away from the specs' visibility-not-prediction lean; the framework name becomes the most-repeated phrase on the site, so the predictive claim is now carried consistently and should be defensible. The CONVENTIONS "Dashboard obsession" anti-pattern still governs (it bans dashboard visual density, not the word "dashboard"). Concrete framework deliverables (clean & standardize data, redesign & integrate processes, build dashboards, continuous adaptive control) nest under the Observe → Connect → Forecast → Respond spine on the Framework page.

### DEC-069: Writing style: no em dashes anywhere

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** Owner style preference surfaced during the copy revision: em dashes read as AI-generated and not the owner's voice.
- **Chosen:** Do not use em dashes (the long dash) anywhere in site copy, documentation, or code comments. Use commas, periods, colons, semicolons, parentheses, or restructure. If an em dash genuinely seems necessary, raise the specific spot and reason rather than using it silently.
- **Reasoning:** Owner readability / voice preference. Recorded in CONVENTIONS.md (Writing conventions) so it governs all future copy and docs.

### DEC-070: Footer social links; confirm the real contact inbox

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** The site links no social profiles; Chats supplied real profile URLs (Instagram, LinkedIn, Facebook, YouTube, X). The contact address is still the DEC-039 placeholder (`hello@insightfulfa.com`), while Chats's legal copy uses `connect@insightfulfa.com`.
- **Chosen:** Add the five social links to the footer (token-styled, accessible, `rel="noopener noreferrer"`). Confirm and set the real contact inbox before launch (resolve the `hello@` vs `connect@` mismatch).
- **Reasoning:** Real, low-cost reach / credibility win; the email confirmation closes the DEC-039 placeholder carryover. Terms / Privacy pages (Chats's copy is available) remain deferred under DEC-030 unless the owner activates them.

### DEC-071: Homepage hybrid copy applied (hero, problem, framework, outcomes, footer CTA)

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** P8-02 applies the owner's hybrid copy (DEC-067) to the homepage sections, using the exact "Recommended (final)" strings from `docs/build/copy-revision-comparison.md`.
- **Chosen:** Hero keeps the eyebrow "Operational intelligence" and h1 "See the bear?"; the body is rewritten to pay off the bear metaphor. ProblemSection gets a new h2 ("...you're explaining the problem, not managing it."), a new intro ("...that's not control, that's post-mortem. We change that."), and `VISIBILITY_POINTS` replaced with four concrete operator pains (const name kept). FrameworkSection h2 → "The IFA Predictive Control Framework™" (the Observe/Connect/Forecast/Respond spine is unchanged). OutcomesSection gets four new outcome statements (eyebrow/h2/body/caption kept). FooterCTA h2 → "See it before it reaches the numbers." (body + CTAs kept).
- **Reasoning:** Concrete, recognizable copy per DEC-067 / DEC-068; structure, primitives, and CTA targets are unchanged so the section rhythm and the e2e structural invariants hold. Supersedes the locked homepage copy in DEC-037 for these sections and the DEC-055 hero body.

### DEC-072: Differentiators section is a heading-less editorial hairline block

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** P8-03 adds a "How we're different" contrast block (three lines) between OutcomesSection and CredibilitySection. `e2e/home.spec.ts` asserts the homepage has exactly three `<h2>`s.
- **Options considered:** 1) Give the block an `<h2>` headline. 2) Heading-less (eyebrow + content), mirroring CredibilitySection.
- **Chosen:** Option 2. `src/components/sections/differentiators-section.tsx`: `Section` (editorial, default bone-100 plane + a top hairline) + `Container` + `Reveal` + `Stack`, with an `EyebrowLabel` "How we're different" and a `<ul>` of three `Text` lines separated by hairlines. No `<h2>`; no card grid.
- **Reasoning:** The comparison doc specifies an eyebrow + three lines with no headline; heading-less matches that, keeps the calm register, preserves the homepage's three-`<h2>` structure, and reuses primitives only. Plane: leaving it on bone-100 with a top hairline puts the boundary from the lifted bone-50 OutcomesSection on a tone change (DEC-032 / DEC-064 rhythm).

### DEC-073: FrameworkCard `inPractice` prop; framework name introduced in body

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** P8-04 adds the concrete "In practice:" deliverables under each Framework-page step and introduces the trademarked name, without changing the page's heading structure (`e2e/framework.spec.ts` asserts two `<h2>`s and specific h2 text).
- **Chosen:** Added an optional `inPractice?: string` prop to `FrameworkCard`, rendered as a restrained `body-sm` line ("In practice:" label + deliverable) under the description. The Framework-page `STEPS` carry the four deliverables (clean & standardize data / map work flows / build dashboards / track & adapt); the homepage `FrameworkSection` omits the prop, so it is unchanged. The name is introduced in the "How it works" intro body ("The IFA Predictive Control Framework™ is less a methodology..."), not in a heading.
- **Reasoning:** Reconciles the elegant Observe/Connect/Forecast/Respond spine with Chats's concrete, buyable deliverables (DEC-068) by nesting the deliverables beneath the spine. Keeping the name in body copy (not a heading) preserves the Framework page's h1/h2 structure and the e2e assertions.

### DEC-074: Contact hero leads with the two diagnostic questions

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** P8-06 opens the Contact page with Chats's two diagnostic questions while keeping a single `<h1>` and the calm no-funnel stance.
- **Chosen:** The h1 is the first question ("When do you usually find out you've missed your numbers?"); the second question ("And how much time does that leave you to act on it?") renders directly below as a prominent non-heading lead (`Text`, primary ink, medium weight); the existing no-funnel body and the "What a conversation looks like" h2 are kept. The mailto mechanism (DEC-039) is unchanged.
- **Reasoning:** Both questions appear verbatim and lead the page (the strongest device in Chats's contact draft) while keeping one h1 and conversation-first conversion. No lead magnet, SMS consent, or emojis (rejected per the brand's no-funnel position). The same non-heading "strong subhead" pattern carries the About slogan.

### DEC-075: Footer social links via inlined Simple Icons glyphs (no dependency)

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** P8-07 / DEC-070 adds the five social profiles to the footer.
- **Chosen:** A `SOCIAL_LINKS` const in `footer.tsx` renders a row of icon links in the Brand column (under the tagline), keeping the four-column grid. Each is an `<a target="_blank" rel="noopener noreferrer" aria-label="{name}">` wrapping an inline `<svg aria-hidden="true" fill="currentColor">` brand glyph (24×24 Simple Icons path, CC0), with the same secondary→primary hover color shift as the footer links. No icon-library dependency. URLs are constructed from the IDs Chats supplied: Instagram `instagram.com/insightful_fa/`, LinkedIn company `96658611`, Facebook profile `61572975083032`, YouTube `@insightfulfa`, X `Insightfulfa`.
- **Reasoning:** Inlined CC0 paths avoid a new dependency (CONVENTIONS) and keep the icons token-colored and accessible (icon-only links carry `aria-label`; the SVG is `aria-hidden` and `focusable="false"`, axe clean). The LinkedIn/Facebook ID→URL forms are standard but should be confirmed by the owner before launch.

### DEC-076: Contact inbox set to connect@insightfulfa.com

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** DEC-039 shipped a placeholder `hello@insightfulfa.com`; DEC-070 flagged the `hello@` vs `connect@` mismatch (Chats's copy uses `connect@`) to confirm before launch. The owner confirmed `connect@` this session.
- **Chosen:** `CONTACT_EMAIL = "connect@insightfulfa.com"` in `contact/page.tsx` (drives both the mailto and the visible address); the contact e2e assertion updated to match. No other source referenced the old address.
- **Reasoning:** Resolves the DEC-039 placeholder carryover with the owner's confirmed inbox; reverses the "placeholder" status of DEC-039's address.

### DEC-077: Em-dash sweep across all visible site copy (code comments deferred)

- **Status:** accepted
- **Date:** 2026-06-07
- **Context:** DEC-069 bans em dashes "anywhere in site copy, documentation, or code comments." The existing site had em dashes in visible copy on every page (including "Keep" sections such as Credibility, plus page metadata) and in ~40 code comments. The owner chose to sweep all visible site copy this pass and defer code comments.
- **Chosen:** Removed em dashes from every user-visible string across the site, replacing each with a comma, colon, period, or parentheses (page titles use the middot the root `title.template` already uses), wording otherwise unchanged. Files beyond the P8-02..P8-07 scope were also swept: the 404 page, the OG image `alt`, the Resources index/article metadata, and the three MDX articles. Code comments are unchanged this pass (a separate cleanup).
- **Reasoning:** Honors DEC-069 for everything a reader sees, in a reviewable scope. Verified by re-grepping `—` across `src/` (only code comments remain). The article/SEO e2e assert JSON-LD shape and article headings, not the MDX descriptions, so the description edits are safe.
