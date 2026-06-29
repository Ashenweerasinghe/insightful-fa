/*
 * SignalTimeline data + derived geometry (P7-09). Pure module.
 *
 * Story: an early operational signal (week 3) precedes its financial impact
 * (week 15) by ~12 weeks. A faint magnitude track shows the pressure building
 * across that span; a measured brace makes the lead time legible at rest.
 */

import { curveMonotoneX } from "d3-shape";
import { makeScales, linePath, areaPath } from "./geometry";
import type { Pt } from "./types";

/** SVG viewBox for the chart. */
export const TIMELINE_VIEWBOX = { w: 360, h: 120 } as const;

const PLOT = { left: 24, right: 336 } as const;
const WEEK_MAX = 16;

/** The timeline axis (baseline) y. */
export const AXIS_Y = 92;
export const AXIS_X = { min: PLOT.left, max: PLOT.right } as const;

/** Event weeks: the early signal and the later financial impact. */
const SIGNAL_WEEK = 3;
const IMPACT_WEEK = 15;
/** Lead time between them, surfaced in the brace annotation. */
const LEAD_WEEKS = IMPACT_WEEK - SIGNAL_WEEK;

// Magnitude track — operational pressure building over time. Weeks 3 and 15 are
// real samples so the event dots sit exactly on the curve.
const WEEKS = [0, 3, 5, 7, 9, 11, 13, 15, 16];
const MAGNITUDE = [12, 20, 28, 38, 50, 62, 75, 86, 90];

const { x, y } = makeScales({
  xDomain: [0, WEEK_MAX],
  yDomain: [0, 100],
  xRange: [PLOT.left, PLOT.right],
  yRange: [AXIS_Y - 6, 40], // bottom just above the axis, top with headroom
});

const MAG_POINTS: Pt[] = WEEKS.map((week, i) => ({
  x: x(week),
  y: y(MAGNITUDE[i]),
}));

export const MAG_LINE_D = linePath(MAG_POINTS, curveMonotoneX);
export const MAG_AREA_D = areaPath(MAG_POINTS, AXIS_Y, curveMonotoneX);

/** The two emphasized event markers — focal points on the magnitude curve. */
export const SIGNAL_DOT: Pt = {
  x: x(SIGNAL_WEEK),
  y: y(MAGNITUDE[WEEKS.indexOf(SIGNAL_WEEK)]),
};
export const IMPACT_DOT: Pt = {
  x: x(IMPACT_WEEK),
  y: y(MAGNITUDE[WEEKS.indexOf(IMPACT_WEEK)]),
};

/** Measured lead-time brace spanning signal → impact, with its annotation. */
export const BRACE = {
  x1: SIGNAL_DOT.x,
  x2: IMPACT_DOT.x,
  topY: 26,
  tickY: 33,
  labelX: (SIGNAL_DOT.x + IMPACT_DOT.x) / 2,
  labelY: 18,
  label: `~${LEAD_WEEKS} weeks`,
} as const;

/** Sparse mono week labels + tick marks along the axis. */
export const WEEK_TICKS: ReadonlyArray<{ x: number; label: string }> = [
  0, 8, 16,
].map((week) => ({ x: x(week), label: `Wk ${week}` }));
export const TICK_Y = { top: AXIS_Y, bottom: AXIS_Y + 4 } as const;
export const LABEL_Y = AXIS_Y + 18;

/** Transparent hover hit areas (larger than the visible marks). */
export const HIT = {
  signal: { cx: SIGNAL_DOT.x, cy: SIGNAL_DOT.y, r: 16 },
  impact: { cx: IMPACT_DOT.x, cy: IMPACT_DOT.y, r: 16 },
  span: {
    x: BRACE.x1,
    y: BRACE.labelY - 4,
    width: BRACE.x2 - BRACE.x1,
    height: 28,
  },
} as const;

export type TimelineTarget = "signal" | "span" | "impact";

interface TooltipConfig {
  xPct: number;
  yPct: number;
  text: string;
  subtext: string;
  flipLeft?: boolean;
}

const pctX = (svgX: number) => (svgX / TIMELINE_VIEWBOX.w) * 100;
const pctY = (svgY: number) => (svgY / TIMELINE_VIEWBOX.h) * 100;

/** Tooltip content + position (% of viewBox) for each hover target. */
export const TOOLTIPS: Record<TimelineTarget, TooltipConfig> = {
  signal: {
    xPct: pctX(SIGNAL_DOT.x),
    yPct: pctY(SIGNAL_DOT.y),
    text: "Early signal detected",
    subtext: `Week ${SIGNAL_WEEK}`,
  },
  span: {
    xPct: pctX(BRACE.labelX),
    yPct: pctY(BRACE.topY),
    text: `~${LEAD_WEEKS}-week lead time`,
    subtext: "Signal precedes impact",
  },
  impact: {
    xPct: pctX(IMPACT_DOT.x),
    yPct: pctY(IMPACT_DOT.y),
    text: "Financial impact visible",
    subtext: `Week ${IMPACT_WEEK}`,
    flipLeft: true,
  },
};

// ---------- Detailed variant (Framework page) ----------
// Disconnected systems' operational signals develop gradually at different times
// and converge into a single financial impact — the section's "complex systems
// rarely fail all at once" claim. Each track ends at the impact point; the first
// carries the early-signal dot.

const SYSTEM_SERIES = [
  { weeks: [3, 7, 11, 15], mags: [20, 38, 60, 86] },
  { weeks: [5, 9, 12, 15], mags: [10, 28, 52, 86] },
  { weeks: [8, 11, 13, 15], mags: [8, 26, 50, 86] },
];

/** Per-system magnitude tracks (detailed variant), all converging to the impact. */
export const SYSTEM_TRACKS: string[] = SYSTEM_SERIES.map((s) =>
  linePath(
    s.weeks.map((w, i) => ({ x: x(w), y: y(s.mags[i]) })),
    curveMonotoneX,
  ),
);

/** Top-left annotation for the converging tracks (detailed variant). */
export const SYSTEMS_LABEL = {
  x: AXIS_X.min,
  y: 16,
  text: "across systems",
} as const;
