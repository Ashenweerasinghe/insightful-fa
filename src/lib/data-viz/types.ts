/*
 * Shared types for the data-viz layer. Pure — no React, no DOM.
 * The geometry helpers and the per-chart data modules build on these,
 * and the client viz components consume the derived geometry.
 */

import type { ScaleLinear } from "d3-scale";

/** A point in SVG viewBox coordinate space. */
export interface Pt {
  x: number;
  y: number;
}

/** Linear scales mapping data space → SVG viewBox space (y range is inverted). */
export interface Scales {
  x: ScaleLinear<number, number>;
  y: ScaleLinear<number, number>;
}
