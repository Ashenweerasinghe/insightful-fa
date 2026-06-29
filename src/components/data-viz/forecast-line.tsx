"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { DURATION, EASE_SOFT } from "@/lib/motion/tokens";
import { VizTooltip } from "./viz-tooltip";
import { VizLabel } from "./viz-label";
import { nearestByX } from "@/lib/data-viz/geometry";
import {
  FORECAST_VIEWBOX,
  SIGNAL_POINTS,
  SIGNAL_LINE_D,
  SIGNAL_AREA_D,
  LAG_LINE_D,
  BASELINE_Y,
  THRESHOLD_Y,
  CROSSING,
  CROSSING_WEEK,
  GRIDLINE_YS,
  X_LABELS,
  PHASE_MARKERS,
  LEAD_BAND,
  PLOT_X,
  PLOT_TOP,
  type ForecastSample,
} from "@/lib/data-viz/forecast-data";

interface ForecastLineProps {
  /** "detailed" (Framework page) adds framework-phase labels + a window-to-act band. */
  variant?: "compact" | "detailed";
  className?: string;
}

/**
 * ForecastLine (P7-02 / enriched P7-08): an operational signal rising toward a
 * risk threshold, caught at the crossing. Geometry is data-driven (d3-shape /
 * d3-scale via lib/data-viz) — area fill, hairline gridlines, a faint
 * reporting-lag comparison line, data points, and mono axis labels. The signal
 * stroke draws on in view; on hover a vertical cursor rule snaps to the nearest
 * data point and a tooltip reveals the signal level (or "Signal detected" past
 * the crossing). The "detailed" variant (Framework page) labels the four
 * framework phases (Observe → Connect → Forecast → Respond) along the axis and
 * shades the window to act. Decorative — meaning lives in the adjacent caption
 * (aria-hidden); under prefers-reduced-motion the chart renders fully drawn and
 * the tooltip is instant.
 */
export function ForecastLine({
  variant = "compact",
  className,
}: ForecastLineProps) {
  const detailed = variant === "detailed";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState<ForecastSample | null>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    // Map client X → SVG viewBox X, clamp to the plot, snap to nearest sample.
    const svgX = ((e.clientX - rect.left) / rect.width) * FORECAST_VIEWBOX.w;
    const clampedX = Math.max(PLOT_X.min, Math.min(PLOT_X.max, svgX));
    setDot(nearestByX(SIGNAL_POINTS, clampedX));
  }, []);

  const handleMouseLeave = useCallback(() => setDot(null), []);

  const isDetected = dot !== null && dot.week >= CROSSING_WEEK;
  const dotXPct = dot ? (dot.x / FORECAST_VIEWBOX.w) * 100 : 0;
  const dotYPct = dot ? (dot.y / FORECAST_VIEWBOX.h) * 100 : 0;
  // Flip the tooltip to left-anchor when the cursor is in the right portion.
  const tooltipTransform =
    dotXPct > 65 ? "translate(-100%, -140%)" : "translate(-8px, -140%)";

  // Reveal: the signal line fades in once in view; static under reduced motion.
  // Opacity, not SVG pathLength — pathLength draw-on is incompatible with
  // vectorEffect="non-scaling-stroke" at non-1:1 render scales (the normalized
  // dash math breaks when the SVG is scaled up). See DEC-061.
  const lineReveal = prefersReduced
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: { duration: DURATION.slow, ease: EASE_SOFT },
      };
  // Data points + crossing marker fade in just after the line draws.
  const markersReveal = prefersReduced
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: {
          duration: DURATION.medium,
          ease: EASE_SOFT,
          delay: DURATION.slow * 0.6,
        },
      };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full cursor-crosshair select-none", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${FORECAST_VIEWBOX.w} ${FORECAST_VIEWBOX.h}`}
        fill="none"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* window-to-act band (detailed) — first observation → threshold crossing */}
        {detailed && (
          <rect
            x={LEAD_BAND.x1}
            y={PLOT_TOP}
            width={LEAD_BAND.x2 - LEAD_BAND.x1}
            height={BASELINE_Y - PLOT_TOP}
            fill="var(--text-primary)"
            fillOpacity={0.03}
          />
        )}

        {/* hairline gridlines */}
        <g
          stroke="var(--border-subtle)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        >
          {GRIDLINE_YS.map((gy) => (
            <line key={gy} x1={PLOT_X.min} y1={gy} x2={PLOT_X.max} y2={gy} />
          ))}
        </g>

        {/* translucent single-hue area under the signal */}
        <path d={SIGNAL_AREA_D} fill="var(--signal-focus)" fillOpacity={0.1} />

        {/* faint baseline */}
        <line
          x1={PLOT_X.min}
          y1={BASELINE_Y}
          x2={PLOT_X.max}
          y2={BASELINE_Y}
          stroke="var(--border-subtle)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* risk threshold */}
        <line
          x1={PLOT_X.min}
          y1={THRESHOLD_Y}
          x2={PLOT_X.max}
          y2={THRESHOLD_Y}
          stroke="var(--border-strong)"
          strokeWidth={1}
          strokeDasharray="3 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* lagging financial-reporting view — subordinate comparison */}
        <path
          d={LAG_LINE_D}
          stroke="var(--text-muted)"
          strokeWidth={1}
          strokeDasharray="2 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.5}
          vectorEffect="non-scaling-stroke"
        />

        {/* operational signal trending toward the threshold */}
        <motion.path
          d={SIGNAL_LINE_D}
          stroke="var(--signal-focus)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          {...lineReveal}
        />

        {/* data points + the crossing emphasis */}
        <motion.g {...markersReveal}>
          {SIGNAL_POINTS.map((p) => (
            <circle
              key={p.week}
              cx={p.x}
              cy={p.y}
              r={2.5}
              fill="var(--signal-focus)"
            />
          ))}
          <circle
            cx={CROSSING.x}
            cy={CROSSING.y}
            r={12}
            stroke="var(--signal-focus)"
            strokeWidth={1}
            fill="none"
            opacity={0.4}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={CROSSING.x}
            cy={CROSSING.y}
            r={4.5}
            fill="var(--signal-focus)"
          />
        </motion.g>

        {/* interactive cursor rule + tracking dot */}
        {dot && (
          <>
            <line
              x1={dot.x}
              y1={PLOT_TOP}
              x2={dot.x}
              y2={BASELINE_Y}
              stroke="var(--border-strong)"
              strokeWidth={1}
              strokeDasharray="2 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.35}
            />
            <circle cx={dot.x} cy={dot.y} r={3.5} fill="var(--signal-focus)" />
          </>
        )}
      </svg>

      {/* Overlay labels — HTML (consistent CSS px), not SVG <text> which scales
          with the chart width. Positioned by viewBox %; baseline at yPct. */}
      {(detailed ? PHASE_MARKERS : X_LABELS).map((l) => (
        <VizLabel
          key={l.label}
          xPct={(l.x / FORECAST_VIEWBOX.w) * 100}
          yPct={((FORECAST_VIEWBOX.h - 6) / FORECAST_VIEWBOX.h) * 100}
          anchor="middle"
        >
          {l.label}
        </VizLabel>
      ))}
      <VizLabel
        xPct={(PLOT_X.min / FORECAST_VIEWBOX.w) * 100}
        yPct={((THRESHOLD_Y - 6) / FORECAST_VIEWBOX.h) * 100}
        anchor="start"
        tone="secondary"
      >
        Risk threshold
      </VizLabel>
      {detailed && (
        <VizLabel
          xPct={((LEAD_BAND.x1 + LEAD_BAND.x2) / 2 / FORECAST_VIEWBOX.w) * 100}
          yPct={((PLOT_TOP + 4) / FORECAST_VIEWBOX.h) * 100}
          anchor="middle"
        >
          window to act
        </VizLabel>
      )}

      <VizTooltip
        open={!!dot}
        motionKey={isDetected ? "detected" : "rising"}
        style={{
          left: `${dotXPct}%`,
          top: `${dotYPct}%`,
          transform: tooltipTransform,
        }}
      >
        <span className="text-text-secondary text-meta-sm font-mono whitespace-nowrap">
          {isDetected ? "Signal detected" : `Signal · ${dot?.percent ?? 0}%`}
        </span>
      </VizTooltip>
    </div>
  );
}
