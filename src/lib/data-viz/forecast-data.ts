/*
 * ForecastLine data + derived geometry (P7-08). Pure module — computed once at
 * load. The component imports the ready-made path strings and scaled samples and
 * only owns interaction + the draw-on animation.
 *
 * Story: an operational signal rises over ~16 weeks and crosses the risk
 * threshold around week 12 (caught early), while the lagging financial-reporting
 * view barely moves until much later.
 */

import { makeScales, linePath, areaPath } from "./geometry";
import type { Pt } from "./types";

/** SVG viewBox for the chart. */
export const FORECAST_VIEWBOX = { w: 360, h: 200 } as const;

/** Plot insets within the viewBox (SVG coordinate space). */
const PLOT = { left: 24, right: 336, top: 26, bottom: 170 } as const;

/** Risk threshold, in signal-% units (the dashed line sits at 100%). */
const THRESHOLD = 100;
/** Signal domain max — headroom above the threshold so the peak isn't clipped. */
const VALUE_MAX = 130;
/** Observation window, in weeks. */
const WEEK_MAX = 16;
/** The week the signal first reaches the threshold (the "caught early" beat). */
export const CROSSING_WEEK = 12;

const WEEKS = [0, 2, 4, 6, 8, 10, 12, 14, 16];
/** Operational signal as a % of the risk threshold, crossing 100 at week 12. */
const SIGNAL = [10, 18, 28, 40, 55, 74, 100, 116, 128];
/** The lagging financial-reporting view — stays low until the impact is underway. */
const REPORTING_LAG = [6, 7, 9, 11, 14, 18, 24, 32, 46];

const { x, y } = makeScales({
  xDomain: [0, WEEK_MAX],
  yDomain: [0, VALUE_MAX],
  xRange: [PLOT.left, PLOT.right],
  yRange: [PLOT.bottom, PLOT.top],
});

/** A scaled signal sample, carrying the data needed by the cursor tooltip. */
export interface ForecastSample extends Pt {
  week: number;
  /** Signal level as a % of the risk threshold (threshold = 100). */
  percent: number;
}

/** Scaled signal samples — drive the line, the data-point dots, and the cursor. */
export const SIGNAL_POINTS: ForecastSample[] = WEEKS.map((week, i) => ({
  x: x(week),
  y: y(SIGNAL[i]),
  week,
  percent: SIGNAL[i],
}));

/** Scaled reporting-lag samples — the faint, subordinate comparison line. */
const LAG_POINTS: Pt[] = WEEKS.map((week, i) => ({
  x: x(week),
  y: y(REPORTING_LAG[i]),
}));

export const SIGNAL_LINE_D = linePath(SIGNAL_POINTS);
export const SIGNAL_AREA_D = areaPath(SIGNAL_POINTS, y(0));
export const LAG_LINE_D = linePath(LAG_POINTS);

/** Baseline (value 0) and risk-threshold y positions. */
export const BASELINE_Y = y(0);
export const THRESHOLD_Y = y(THRESHOLD);

/** The crossing marker — where the signal meets the threshold (on the curve). */
export const CROSSING: Pt = { x: x(CROSSING_WEEK), y: y(THRESHOLD) };

/** Hairline gridline y positions at quartile signal levels. */
export const GRIDLINE_YS = [25, 50, 75].map((v) => y(v));

/** Sparse mono x-axis labels — kept minimal to avoid clutter. */
export const X_LABELS: ReadonlyArray<{ x: number; label: string }> = [
  0, 8, 16,
].map((week) => ({ x: x(week), label: `Wk ${week}` }));

/** Clamp bounds for the interactive cursor (the plot's horizontal extent). */
export const PLOT_X = { min: PLOT.left, max: PLOT.right } as const;

/** Plot top inset — the cursor rule spans from here to the baseline. */
export const PLOT_TOP = PLOT.top;

// ---------- Detailed variant (Framework page) ----------
// The four framework steps mapped onto the curve, and the window earlier
// visibility opens between first observation and the threshold crossing.

/**
 * Framework-phase markers: { Observe, Connect, Forecast, Respond } along the
 * x-axis. Spread evenly (not clustered at the crossing) so the now-fixed-size
 * HTML labels don't collide on narrow viewports.
 */
export const PHASE_MARKERS: ReadonlyArray<{ x: number; label: string }> = [
  { x: x(2), label: "Observe" },
  { x: x(7), label: "Connect" },
  { x: x(11), label: "Forecast" },
  { x: x(15), label: "Respond" },
];

/** "Window to act" band — first observation → threshold crossing. */
export const LEAD_BAND = { x1: x(2), x2: x(CROSSING_WEEK) } as const;
