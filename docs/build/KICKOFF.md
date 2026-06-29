# KICKOFF.md — Insightful Financial Analytics

Copy and paste the prompt below as your first message when starting a new agent session.

---

## Prompt

I'm continuing work on the **Insightful Financial Analytics** website — a calm, editorial marketing site (Next.js App Router + TypeScript + Tailwind). The foundational specs are complete and the project memory system is in place; the frontend has not been scaffolded yet, so we're starting at **Phase 0 (scaffold)**.

Before doing anything else, read these files in this order:

1. `CLAUDE.md` (or `AGENTS.md` if you are not Claude Code) — project rules and session protocol
2. `docs/build/PROGRESS.md` — current build state
3. `docs/build/TASKS.md` — work queue and task states
4. `docs/build/DECISIONS.md` — decisions already made
5. `docs/build/TESTING.md` — verification criteria
6. `docs/build/CONVENTIONS.md` — coding + writing standards

Then read the relevant spec(s) in `docs/get-started/` for the task at hand (e.g. the design token spec before token work, the homepage wireframe before building homepage sections).

After reading, confirm to me:

- What has been completed so far
- What we're building in the current phase
- The first task you'll work on (with its ID)
- Any constraints or decisions you need to flag before starting

Do not write any code until you have confirmed this.

---

## Environment

- **OS:** macOS / Linux (Unix-like)
- **Terminal:** bash / zsh — POSIX-compatible commands only
- **Runtime:** Node.js 20+ (LTS), npm
- **Deploy target:** Vercel

---

## Session protocol — enforce throughout every session

- **After every completed step:** update `docs/build/PROGRESS.md` (checklist + test result) and `docs/build/TASKS.md` (status); add a `docs/build/DECISIONS.md` entry if any non-trivial choice was made
- **Before marking any step complete:** run the verification from `docs/build/TESTING.md` and record the result in `PROGRESS.md`
- **Never defer updates** — update immediately after each step, not at the end
- **Never edit `docs/get-started/`** — it is read-only; log proposed changes in `DECISIONS.md`

---

## Current phase context

**Phase 0 — Scaffold & tooling.** Stand up Next.js (App Router) + strict TypeScript under `/src`, install and configure Tailwind, set up ESLint + Prettier, wire the three brand fonts (Newsreader / Public Sans / IBM Plex Mono), and establish the base marketing layout. The first task is **P0-01** (initialize the Next.js + TypeScript project). Tokens and components come in Phase 1 — do not start building sections before the token system exists (P1-01/P1-02).

Keep everything calm, editorial, token-driven, and server-first. Avoid generic SaaS / dashboard / crypto-fintech drift (see the anti-patterns in `CONVENTIONS.md`).

---

## Key files to reference

| File | Purpose |
|------|---------|
| `CLAUDE.md` / `AGENTS.md` | Session protocol, rules, stack, build order |
| `docs/build/PROGRESS.md` | Current state + phase checklist |
| `docs/build/TASKS.md` | Task queue with IDs and exit criteria |
| `docs/build/DECISIONS.md` | Locked decisions (stack, scope, theming) |
| `docs/build/TESTING.md` | How to verify each task |
| `docs/build/CONVENTIONS.md` | Coding + writing standards, anti-patterns |
| `docs/get-started/frontend_technical_architecture_insightful_fa.md` | Stack, rendering, folder structure |
| `docs/get-started/design_token_theming_system_insightful_fa.md` | Token values |
| `docs/get-started/homepage_wireframe_layout_anatomy_insightful_fa.md` | Homepage section anatomy |
| `docs/get-started/component_inventory_system_insightful_fa.md` | Component catalog |
| `docs/get-started/website_copy_architecture_insightful_fa.md` | Copy, headlines, CTA language |
