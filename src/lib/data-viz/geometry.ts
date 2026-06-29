/*
 * Pure geometry helpers for the data-viz layer (P7-06, DEC-058).
 *
 * Thin, token-agnostic wrappers around d3-shape / d3-scale used to derive SVG
 * path strings and scales from data arrays. These are MATH helpers only —
 * `line()`/`area()` return a `d` string and `scaleLinear()` maps numbers, so
 * nothing here touches the DOM. Safe to import from Server Components and during
 * `next build`. We deliberately avoid d3-selection / d3-axis (DOM-bound) so the
 * rendering and styling stay hand-authored and fully token-driven.
 */

import { scaleLinear } from "d3-scale";
import { line, area, curveNatural, type CurveFactory } from "d3-shape";
import type { Pt, Scales } from "./types";

interface ScaleOptions {
  xDomain: [number, number];
  yDomain: [number, number];
  xRange: [number, number];
  /** Typically [bottom, top] so a larger value sits higher in the viewBox. */
  yRange: [number, number];
}

/** Build linear x/y scales from data space to SVG viewBox space. */
export function makeScales(opts: ScaleOptions): Scales {
  return {
    x: scaleLinear().domain(opts.xDomain).range(opts.xRange),
    y: scaleLinear().domain(opts.yDomain).range(opts.yRange),
  };
}

/** SVG path `d` for a line through the (already-scaled) points. */
export function linePath(
  pts: Pt[],
  curve: CurveFactory = curveNatural,
): string {
  const generator = line<Pt>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curve);
  return generator(pts) ?? "";
}

/** SVG path `d` for the area between the points and a flat baseline y. */
export function areaPath(
  pts: Pt[],
  baselineY: number,
  curve: CurveFactory = curveNatural,
): string {
  const generator = area<Pt>()
    .x((d) => d.x)
    .y0(baselineY)
    .y1((d) => d.y)
    .curve(curve);
  return generator(pts) ?? "";
}

/**
 * The point whose x is closest to targetX. Replaces the old
 * SVGPathElement.getPointAtLength() lookup table — no DOM measurement, so the
 * cursor snaps to a real data point. Generic so callers keep their richer
 * sample type. Assumes `pts` is non-empty.
 */
export function nearestByX<T extends Pt>(pts: T[], targetX: number): T {
  let nearest = pts[0];
  let min = Infinity;
  for (const pt of pts) {
    const dist = Math.abs(pt.x - targetX);
    if (dist < min) {
      min = dist;
      nearest = pt;
    }
  }
  return nearest;
}
