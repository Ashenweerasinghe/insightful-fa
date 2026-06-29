# ASSET-REQUIREMENTS.md

## Purpose

This is the production delivery brief for the illustrator and brand designer working on
Insightful Financial Analytics. It lists every externally-sourced visual asset the website
needs, with format requirements, sizing, colour rules, naming conventions, and delivery
instructions.

This document covers only files that come from **outside** the codebase — commissioned
illustrations, icons, and the logo/wordmark. It does not describe code components.

For the full style and creative brief, read the art direction spec first:
`docs/get-started/illustration_art_direction_spec_insightful_fa.md`

---

## Brand colour palette

All illustrations and marks must stay within this palette. No additional colours.

| Role             | Hex       | Use                                              |
|------------------|-----------|--------------------------------------------------|
| Off-white / bone | #F7F2E8   | Background, negative space, paper tone           |
| Deep charcoal    | #1F2522   | Primary ink, line work, outlines                 |
| Amber            | #B87937   | Signal accent, warning markers, focal point      |
| Rust             | #D9793F   | Secondary signal, impact indicators              |
| Olive / muted    | #676B67   | Secondary tone, subtle environmental detail      |
| Forest green     | #314438   | Deep environmental tone (use sparingly)          |

Illustrations are primarily monochrome charcoal on bone. Amber and rust appear only as
deliberate accent signals — not as background fills or dominant tones.

---

## Global format rules

### SVG (strongly preferred for icons, motifs, and simple marks)

- Include a `viewBox` attribute; omit `width` and `height` so the site controls sizing
- Recommended viewBox for icons: `0 0 24 24`
- Use `currentColor` for all stroke and fill values — the site injects colour via CSS
- No hardcoded hex values anywhere in the file
- No `style="..."` attributes or embedded `<style>` blocks
- No embedded fonts — convert any letterforms to paths
- No invisible objects, clipping masks, or empty groups left over from the artboard
- Clean, minimal paths — no redundant nodes, no rasterised traces
- Deliver as `.svg`; also supply the source file (`.ai`, `.afdesign`, `.fig`)

### PNG (for editorial illustrations only, when SVG is not feasible)

- **Transparent background** (RGBA, not white-filled — the site blends images into the
  bone background; a hard white rectangle will look wrong)
- **Minimum dimensions:** 1920 px on the longest edge (2× retina at typical display widths)
- **Target source file size:** see per-asset table below — these are targets for the file
  you deliver; the site converts to WebP/AVIF at delivery via `next/image`, so send the
  highest-quality PNG and do not pre-compress to WebP
- **Colour profile:** sRGB
- Supply the source file alongside the PNG export

### Naming conventions

All asset files use lowercase kebab-case with a descriptive, intent-first slug.

```
hero-campfire.png           ✓
problem-terrain-pressure.png ✓
framework-observe-motif.svg ✓
icon-signal-alert.svg       ✓

image1.png                  ✗  (not descriptive)
Illustration Final v3.png   ✗  (spaces, mixed case)
asset.svg                   ✗  (too generic)
```

---

## Editorial illustrations

These are the larger, narrative-driven visuals. All follow the engraved monochrome
editorial style described in the art direction spec.

### Hero illustration

| Field         | Value |
|---------------|-------|
| **Status**    | Draft exists — `public/illustrations/hero-campfire.png` (1536×1024, ~3.8 MB, currently unoptimised — P7-01 tracks the fix) |
| **Subject**   | Campers around a campfire in a forest clearing at dusk; a large bear emerges from the trees behind them, unnoticed. The bear represents hidden operational risk approaching before it becomes visible. |
| **Format**    | PNG (RGBA) |
| **Dimensions** | Minimum 1920 px on the longest edge for any revised version; current draft is 1536×1024 |
| **File size target** | < 500 KB (source PNG before `next/image` processing) |
| **Colour**    | Monochrome charcoal line work on transparent/bone; campfire glow in amber only (used sparingly as a focal accent, not a dominant fill) |
| **Placement** | Right column of the homepage hero section (~55–65 % of desktop viewport width) |
| **Delivery note** | Supply as RGBA PNG with soft alpha feathering at the edges so the image dissolves into the background naturally. No hard crop rectangle. |
| **Filename**  | `hero-campfire.png` |

---

### Bear callback motif

| Field         | Value |
|---------------|-------|
| **Status**    | Not yet commissioned |
| **Subject**   | A restrained, smaller-scale callback to the bear metaphor — a partial silhouette, a distant bear presence in terrain, or an environmental hint. The goal is subconscious reinforcement of the hero metaphor, not a repeated illustration. If it reads as a repeat of the hero scene, it is too prominent. |
| **Format**    | PNG (RGBA) or SVG if the motif can be expressed as clean paths |
| **Dimensions (if PNG)** | 800×600 px minimum at 2×; keep the composition tight |
| **File size target** | < 200 KB |
| **Colour**    | Monochrome charcoal; no amber accent |
| **Placement** | One appearance somewhere on the homepage (not the footer). Candidate: a subtle background element in the Problem or Credibility section. Final placement decided at implementation. |
| **Delivery note** | Deliberately understated. Less is more. |
| **Filename**  | `bear-callback.png` or `bear-callback.svg` |

---

### Problem section illustration

| Field         | Value |
|---------------|-------|
| **Status**    | Not yet commissioned |
| **Subject**   | Environmental and atmospheric — hidden pressure or terrain themes. Good concepts: topographic contour lines revealing a hidden pressure zone; cracks forming beneath a calm surface; a distant storm building just beyond a visible horizon. Quiet tension, not drama. |
| **Format**    | PNG (RGBA) or SVG |
| **Dimensions (if PNG)** | 1200×800 px minimum at 2× |
| **File size target** | < 400 KB |
| **Colour**    | Monochrome charcoal; amber accent only if a specific signal marker is needed |
| **Placement** | Right column of the Problem section on the homepage (~50 % of desktop width, grid-2 layout) |
| **Delivery note** | Should feel environmental and calm, not alarming. The copy carries the tension; the illustration reinforces atmosphere. |
| **Filename**  | `problem-terrain-pressure.png` or `problem-terrain-pressure.svg` |

---

### Framework card motifs (×4)

| Field         | Value |
|---------------|-------|
| **Status**    | Not yet commissioned |
| **Subject**   | Four small engraved inline motifs — one per framework step. Each is a compact symbolic mark, not a scene. Concepts: **Observe** — a lookout point or elevated scanning position; **Connect** — intersecting pathways or converging lines; **Forecast** — a branching path or horizon with multiple routes; **Respond** — a directional arrow or decisive pathway marker. All four must feel like a coherent visual family — same line weight, same rendering density, same style. |
| **Format**    | SVG strongly preferred (renders crisply at small display sizes). PNG only if the linework cannot be faithfully represented as paths. |
| **Dimensions (SVG)** | `viewBox="0 0 48 48"` recommended |
| **Dimensions (PNG fallback)** | 192×192 px minimum (4× the 48 px display size) |
| **Colour (SVG)** | Use `currentColor` on all paths — the site injects amber or charcoal depending on context |
| **Colour (PNG fallback)** | Render in charcoal (#1F2522) on a transparent background |
| **Placement** | Inline, in each FrameworkCard at approximately 32–48 px display size |
| **Filenames** | `framework-observe-motif.svg`, `framework-connect-motif.svg`, `framework-forecast-motif.svg`, `framework-respond-motif.svg` |

---

### Credibility section illustration (optional)

| Field         | Value |
|---------------|-------|
| **Status**    | Not yet commissioned; optional atmospheric support |
| **Subject**   | Contemplative, humanising — a single observer in a large environment, a quiet lookout, or a serene terrain moment. Should feel like wisdom and perspective, not action. If it reads as a portrait or identifiable person, revise toward a more environmental or symbolic treatment. |
| **Format**    | PNG (RGBA) or SVG |
| **Dimensions (if PNG)** | 800×600 px minimum |
| **File size target** | < 300 KB |
| **Colour**    | Monochrome charcoal; no accent colours |
| **Placement** | Credibility / Philosophy section — editorial asymmetry column or background element. Final placement decided at implementation. |
| **Delivery note** | Optional — the section works without it. Only commission if the copy alone does not carry the section visually. |
| **Filename**  | `credibility-observer.png` or `credibility-observer.svg` |

---

### Transitional / divider illustrations (×2–3, optional)

| Field         | Value |
|---------------|-------|
| **Status**    | Not yet commissioned; optional atmospheric pacing |
| **Subject**   | Minimal horizontal motifs used as visual breathing space between major homepage sections. A thin topographic contour band, a sparse terrain horizon line, a minimal signal-path motif. Should feel like atmosphere, not decoration — nearly invisible at first glance. |
| **Format**    | SVG strongly preferred (scales to full width without quality loss) |
| **Dimensions (SVG)** | Wide and shallow viewBox, e.g. `0 0 1200 48` |
| **Dimensions (PNG fallback)** | 2400×96 px minimum at 2× |
| **Colour (SVG)** | Use `currentColor`; the site controls rendering colour |
| **Colour (PNG fallback)** | Charcoal (#1F2522) on transparent background |
| **Delivery note** | Extremely restrained. If the divider competes visually with surrounding content, it is too prominent. |
| **Filenames** | `divider-terrain-01.svg`, `divider-terrain-02.svg`, etc. |

---

## Icons and small marks

These are functional UI marks produced as clean SVG. They do not require an illustrator —
a designer with clean SVG skills can produce them.

All icons must follow the SVG global rules above: `viewBox="0 0 24 24"`, `currentColor`,
no hardcoded colours, clean paths.

---

### Terrain / topographic marks

| Field     | Value |
|-----------|-------|
| **Purpose** | A small set of recurring topographic-line motifs used as a subtle visual system across the site — in section backgrounds, as environmental texture, or alongside copy |
| **Count** | 3–5 variations (tight contour, wide contour, pressure-zone variant) |
| **Complexity** | Simple — 1–3 path elements per mark |
| **Filenames** | `icon-terrain-tight.svg`, `icon-terrain-wide.svg`, `icon-terrain-pressure.svg` |

### Directional arrows

| Field     | Value |
|-----------|-------|
| **Purpose** | Editorial directional marks — lead-time spans, pathway indicators, forward-progress cues. Not generic UI chevrons; these should feel consistent with the engraved line language |
| **Count** | 3 variants: right, down, diagonal-forward |
| **Style** | Single-stroke, open arrowhead |
| **Filenames** | `icon-arrow-right.svg`, `icon-arrow-down.svg`, `icon-arrow-diagonal.svg` |

### Warning / alert indicators

| Field     | Value |
|-----------|-------|
| **Purpose** | Amber and rust signal markers used inline as data-viz accents in the `SignalIndicator` component and other areas |
| **Count** | 3 variants: dot/circle, filled dot, exclamation marker |
| **Style** | Minimal geometric — 1–2 path elements. The SVG must use `currentColor` so the component applies the colour class |
| **Filenames** | `icon-signal-circle.svg`, `icon-signal-dot.svg`, `icon-signal-alert.svg` |

### Observation symbols

| Field     | Value |
|-----------|-------|
| **Purpose** | Environmental scanning and lookout motifs used as small editorial accents |
| **Count** | 2–3 variants: horizon scan, observation point, distance marker |
| **Style** | Minimal, consistent with the terrain mark style |
| **Filenames** | `icon-observe-horizon.svg`, `icon-observe-point.svg`, `icon-observe-distance.svg` |

---

## Logo / wordmark

| Field     | Value |
|-----------|-------|
| **Status** | Owner to supply. The current site uses a code-generated geometric "i" monogram as a reversible placeholder (DEC-049). |
| **Required files** | `logo-wordmark.svg` — full horizontal wordmark (logotype + mark if any); `logo-mark.svg` — symbol only, for favicon and small-scale use; `logo-wordmark-inverse.svg` — light version for dark backgrounds (if needed) |
| **Format** | SVG only. The site renders icons via `next/image` and ImageResponse and can rasterise at any size from SVG. |
| **Requirements** | Use `currentColor` on all strokes/fills — or explicitly use charcoal #1F2522 for the default and bone #F7F2E8 for the inverse; no embedded fonts (all letterforms as paths); clean artboard (no invisible objects, no stray masks); the mark must be legible at 32×32 px (favicon scale) |
| **Delivery note** | When the logo is delivered, the dev swaps `src/app/icon.tsx` and `src/app/apple-icon.tsx` with the real mark. The placeholder is intentionally reversible (DEC-049). |

---

## Delivery checklist

Before sending any file, verify:

- [ ] Filename is lowercase kebab-case and describes the content
- [ ] **SVG:** `viewBox` present; no hardcoded hex colours; no embedded fonts; no `<style>` blocks; `currentColor` on all strokes/fills; no invisible objects or stray artboard elements
- [ ] **PNG:** RGBA (transparent background); minimum dimensions met; sRGB colour profile; source file included
- [ ] Colours match the brand palette table above — no additional colours introduced
- [ ] For icon/mark sets: all items in the set use consistent line weight and rendering density
- [ ] File size is within the per-asset target range
- [ ] Source file (`.ai`, `.afdesign`, `.fig`) included alongside the export

**Delivery paths:**
- Large illustrations (PNG or complex SVG scenes) → `public/illustrations/`
- Small marks and icon SVGs → `public/icons/`

**Questions?** Review the full art direction brief at:
`docs/get-started/illustration_art_direction_spec_insightful_fa.md`
