# CLAUDE.md

Control file for Claude Code working on the **Insightful Financial Analytics** website. Read this first, follow it every session.

## What this project is

Insightful Financial Analytics is a premium, editorial **marketing website** for an operational-intelligence and financial-visibility consultancy. The site's job is to establish positioning, carry a calm strategic narrative, and invite low-pressure conversation — communicating that the company helps businesses *see operational and financial risk earlier*. It is **content-first and narrative-first**, not an application, dashboard, or sales funnel.

The repo currently contains the foundational design + messaging specs in `docs/get-started/`. The frontend application has **not been built yet** — Phase 0 (scaffold) is the next step.

**This is a standalone marketing site** (Next.js App Router) intended to grow into a thought-leadership / resources engine over time.

## Session startup — do this first, every time

Before writing or modifying any code:

1. Read `docs/build/PROGRESS.md` — current phase, what's done, what's next
2. Read `docs/build/TASKS.md` — the work queue and task states
3. Read `docs/build/DECISIONS.md` — locked decisions you must not silently reverse
4. Read `docs/build/TESTING.md` — how each task is verified before it counts as done
5. Read `docs/build/CONVENTIONS.md` — coding + writing standards
6. Read the relevant spec(s) in `docs/get-started/` for the task at hand (see table below)
7. Confirm to the user in 1–2 sentences: what's complete, and what we're doing today

Do not assume you know the current state from conversation history alone. The repo docs are the truth.

## During the session — after every completed step

1. Update `docs/build/PROGRESS.md` — check off the step, record the test result
2. Update `docs/build/DECISIONS.md` — log any non-trivial implementation choice with reasoning
3. Update `docs/build/TASKS.md` — change the task status
4. Tell the user, in one sentence, what was completed and what's next

Never defer updates to the end of the session. Update immediately after each step.

## Environment — always apply

- **OS:** macOS / Linux (Unix-like)
- **Terminal:** bash / zsh — all terminal commands must be POSIX-compatible
- **Runtime:** Node.js 20+ (LTS), npm
- **Deploy target:** Vercel

## Tech stack

- **Framework:** Next.js (App Router); React Server Components by default
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS driven by CSS-variable design tokens
- **Motion:** Framer Motion — minimal; reveal / atmosphere / subtle hover only
- **Content:** MDX for resource articles (Phase 5+)
- **Primitives:** shadcn/ui allowed only as a heavily-customized, token-driven base — never default shadcn aesthetics
- **State:** local component / URL state only; no global store until genuinely needed

Full rationale lives in `docs/build/DECISIONS.md` and `docs/get-started/frontend_technical_architecture_insightful_fa.md`.

## Architecture

Editorial, server-first marketing site organized into three component layers:

- **Primitives** — Container, Section, Stack, Grid, Heading, Text, EyebrowLabel, Button, Divider (token-aware, minimal, highly reusable)
- **Composite** — FrameworkCard, OutcomeCard, QuoteBlock, ResourceCard, MetricCard, SignalIndicator, CTAGroup
- **Sections** — HeroSection, ProblemSection, FrameworkSection, OutcomesSection, CredibilitySection, FooterCTA

Initial site = 5 pages: Home, Framework, About, Resources, Contact.

## Project structure (planned — see frontend architecture spec)

```txt
/src
  /app/(marketing)/{about,framework,resources,contact}   + page.tsx, layout.tsx
  /components/{layout,navigation,sections,cards,typography,motion,illustration,data-viz,cta,ui}
  /lib/{utils,tokens,motion,content}
  /styles/{globals.css,typography.css,tokens.css}
  /content/{resources,framework}
  /types
  /hooks
/public/{illustrations,textures,icons,og}
```

## Hard rules

- **Never edit the specs in `docs/get-started/`.** They are the read-only source of truth. If something must change, log a `proposed` decision in `docs/build/DECISIONS.md` instead of editing the spec.
- **Tokens before improvisation.** No hardcoded colors, arbitrary spacing, one-off type sizes, or random shadows. Everything derives from the token system (`docs/get-started/design_token_theming_system_insightful_fa.md`).
- **Editorial restraint is a feature.** No generic SaaS gradients, card-grid overload, dashboard density, crypto-fintech styling, over-rounded pills, or over-animation. When in doubt, add whitespace — not elements.
- **Server-first.** Default to Server Components; add `"use client"` only for motion or genuine interactivity.
- **Accessibility is non-negotiable.** Semantic HTML, keyboard navigation, visible focus, contrast safety, and `prefers-reduced-motion` support.
- **A task is not done until** its test (per `docs/build/TESTING.md`) passes and the docs are updated.
- **No secrets in the repo.** Read any keys from environment variables.

## Build order

- **Phase 0 — Scaffold:** Next.js + TS (strict) + Tailwind, token wiring, fonts, lint/format, base layout
- **Phase 1 — Tokens & primitives:** CSS variables + Tailwind theme; typography utilities; primitive components
- **Phase 2 — Shell:** Navbar, MobileMenu, Footer/FooterCTA, container/section rhythm, reveal-motion baseline
- **Phase 3 — Homepage:** Hero → Problem → Framework → Outcomes → Credibility → CTA
- **Phase 4 — Core pages:** Framework, About, Contact
- **Phase 5 — Resources:** MDX pipeline + ResourceCard + editorial article layout

Each phase is verified per `docs/build/TESTING.md` before the next begins.

## What this project does NOT do (v1)

- No dark mode / multi-theme (single curated theme; tokens are structured to allow it later)
- No CMS, auth, accounts, or backend application logic
- No dense dashboards, live data feeds, or trading-terminal visuals
- No aggressive lead-capture funnels, interrupting modals, or newsletter pop-ups
- No global state libraries (Redux, etc.)

## Key specs to reference (read-only)

| Spec | Use it for |
|---|---|
| `docs/get-started/website_copy_architecture_insightful_fa.md` | Positioning, narrative flow, headline & CTA language |
| `docs/get-started/brand_voice_and_tone_guide_insightful_fa.md` | Copy tone, preferred/avoid vocabulary |
| `docs/get-started/sitemap_information_architecture_insightful_fa.md` | Pages, nav, footer, URLs |
| `docs/get-started/homepage_wireframe_layout_anatomy_insightful_fa.md` | Homepage section anatomy + pacing |
| `docs/get-started/frontend_technical_architecture_insightful_fa.md` | Stack, rendering, folder structure |
| `docs/get-started/design_token_theming_system_insightful_fa.md` | Tokens (color, type, spacing, motion) |
| `docs/get-started/component_inventory_system_insightful_fa.md` | Component catalog + structure |
| `docs/get-started/ui_ux_design_system_insightful_fa.md` | Visual system |
| `docs/get-started/motion_interaction_spec_insightful_fa.md` | Motion rules |
| `docs/get-started/illustration_art_direction_spec_insightful_fa.md` | Illustration direction |
| `docs/get-started/ai_collaboration_and_prompting_protocol_insightful_fa.md` | Multi-agent workflow + anti-drift review |
| `docs/get-started/insightful_financial_analytics_documentation_roadmap.md` | Documentation roadmap + phases |
