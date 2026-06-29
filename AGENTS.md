# AGENTS.md

## Purpose

This file governs how any coding agent or human operates in this repository. It is the behavioral contract for the repo — the platform-agnostic baseline. `CLAUDE.md` carries Claude Code–specific extensions; where both apply, this file is the baseline and `CLAUDE.md` adds detail. Read it first, follow it always.

This project is built with multi-agent AI assistance (Claude Code, Codex, Cursor, Windsurf). Role conventions (architecture / implementation / review) live in `docs/get-started/ai_collaboration_and_prompting_protocol_insightful_fa.md`.

## Read order for new sessions

Before doing anything in a fresh session, read these in order:

1. `AGENTS.md` (this file) — or `CLAUDE.md` if you are Claude Code
2. `docs/build/PROGRESS.md` — current build state
3. `docs/build/TASKS.md` — work queue and task states
4. `docs/build/DECISIONS.md` — decisions already made
5. `docs/build/TESTING.md` — verification criteria
6. `docs/build/CONVENTIONS.md` — coding + writing standards

Then read the relevant specs in `docs/get-started/` for the task at hand. Do not rely on prior-session memory over the repo docs — the repo docs are the latest operational truth.

## Source-of-truth order

When documents disagree, use this order — but an `accepted` entry in `docs/build/DECISIONS.md` supersedes any spec point it explicitly addresses:

1. `docs/get-started/website_copy_architecture_insightful_fa.md` — positioning & messaging intent
2. `docs/get-started/sitemap_information_architecture_insightful_fa.md` — structure & IA
3. `docs/get-started/frontend_technical_architecture_insightful_fa.md` — stack, rendering, structure
4. `docs/get-started/design_token_theming_system_insightful_fa.md` + `ui_ux_design_system_insightful_fa.md` — visual system
5. `docs/get-started/component_inventory_system_insightful_fa.md` + `homepage_wireframe_layout_anatomy_insightful_fa.md` — composition
6. `docs/get-started/motion_interaction_spec_insightful_fa.md`, `brand_voice_and_tone_guide_insightful_fa.md`, `illustration_art_direction_spec_insightful_fa.md`
7. `docs/build/DECISIONS.md` — accepted decisions (supersede the above where explicit)

## Project identity

Insightful Financial Analytics — a calm, editorial marketing website for an operational-intelligence and financial-visibility consultancy. Content-first and narrative-first; helps businesses see operational and financial risk earlier. It is **not** an app, a dashboard product, or a conversion funnel. Currently spec-only; the frontend is not yet scaffolded.

## Immutable constraints

These are not suggestions. Do not violate them.

- The specs in `docs/get-started/` are **read-only**. Never edit them — log proposed changes in `docs/build/DECISIONS.md`.
- **Token-driven styling only** — no hardcoded colors, arbitrary spacing, or one-off type. Source: the design token spec.
- **Editorial restraint** — calm, spacious, typography-led. No SaaS / dashboard / crypto-fintech drift, no card-grid overload, no over-animation, no over-rounded pills.
- **Server-first** — React Server Components by default; client components only for motion or interactivity.
- **Single theme** in v1 (no dark mode).
- **Accessibility required** — semantic HTML, keyboard navigation, visible focus, contrast safety, reduced-motion support.
- **No backend / application scope** in v1 — this is a marketing site.

## Architecture expectations

Build toward (unless an accepted decision says otherwise):

- Next.js App Router with static generation for marketing pages
- The three-layer component model: primitives → composite → sections
- Centralized tokens (CSS variables + Tailwind theme extensions)
- Minimal client JS, minimal state

Do not casually introduce:

- Global state libraries (Redux / Zustand) — use local or URL state
- Alternative CSS frameworks or CSS-in-JS runtimes
- Heavy animation systems or scroll-hijack choreography
- Charting/dashboard libraries beyond the lightweight bespoke visuals the specs describe

## Stack discipline

Refer to `docs/build/DECISIONS.md` for the chosen stack. Do not introduce alternative frameworks, styling systems, or libraries without first recording a decision entry. The default expectation for this repo is:

- Framework: Next.js (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS + CSS variables
- Motion: Framer Motion (minimal)
- Content: MDX
- Lint / format: ESLint + Prettier
- Test: Playwright + Lighthouse / axe
- Host: Vercel

## Workflow rules

### Plan before building

For any task larger than a small isolated fix:

1. Reread the relevant docs if context may be stale
2. Write a short, concrete, ordered plan
3. Work in small, reviewable increments (5–30 minutes each)

### Keep docs current

The files in `docs/build/` are the live operational memory of this repo. If code changes but the docs are stale, the task is not complete.

### Decision handling

If a choice is ambiguous, do not guess silently. Record it in `docs/build/DECISIONS.md` as `proposed`, flag it in your output, and proceed only if the docs support a safe path forward.

### Stop conditions

If you hit a real blocker, do not power through with assumptions. Instead:

- State the blocker clearly in your output
- Add a `proposed` decision entry in `docs/build/DECISIONS.md`
- Adjust `docs/build/TASKS.md` or `docs/build/PROGRESS.md` if delivery order changes

## Doc update rules

- **After each completed task:** update `PROGRESS.md` (checklist + test result) and `TASKS.md` (status)
- **On any non-trivial choice:** add a `DECISIONS.md` entry
- **When test strategy changes:** update `TESTING.md`
- **When a convention emerges or changes:** update `CONVENTIONS.md`

## Code standards

See `docs/build/CONVENTIONS.md` for the full standard. In short: small token-driven components, semantic HTML, strict TypeScript, Tailwind tokens-only, restrained motion, and copy that follows the brand voice.

## What "done" means

A task is done when:

- The code works and renders the intended editorial result
- The test from `TESTING.md` passes and the result is recorded in `PROGRESS.md`
- Failure, edge, responsive, and reduced-motion paths were considered
- Tokens and conventions are respected (no visual drift)
- Relevant docs are updated
- The resulting diff is scoped and reviewable

A task is not complete if the relevant docs are stale.
