"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { DURATION, EASE_SOFT } from "@/lib/motion/tokens";
import { VizTooltip } from "./viz-tooltip";
import { VizLabel } from "./viz-label";
import {
  TIMELINE_VIEWBOX,
  AXIS_Y,
  AXIS_X,
  MAG_LINE_D,
  MAG_AREA_D,
  SYSTEM_TRACKS,
  SYSTEMS_LABEL,
  SIGNAL_DOT,
  IMPACT_DOT,
  BRACE,
  WEEK_TICKS,
  TICK_Y,
  LABEL_Y,
  HIT,
  TOOLTIPS,
  type TimelineTarget,
} from "@/lib/data-viz/timeline-data";

interface SignalTimelineProps {
  /** "detailed" (Framework page) shows several systems converging into one impact. */
  variant?: "compact" | "detailed";
  className?: string;
}

/**
 * SignalTimeline (P7-03 / enriched P7-09 / per-page variants P7-11): an early
 * operational signal preceding its financial impact by a measured lead time.
 * Geometry is data-driven — a faint magnitude track shows pressure building, a
 * brace makes the ~12-week lead time legible at rest, and a mono week axis grounds
 * it. The "detailed" variant (Framework page) instead shows several disconnected
 * systems' signals converging into a single financial impact. The track(s) draw on
 * in view; hovering each event or the span reveals a tooltip. Decorative
 * (aria-hidden) — meaning lives in the adjacent caption; reduced motion renders it
 * fully drawn with instant tooltips.
 */
export function SignalTimeline({
  variant = "compact",
  className,
}: SignalTimelineProps) {
  const detailed = variant === "detailed";
  const [activeTarget, setActiveTarget] = useState<TimelineTarget | null>(null);
  const prefersReduced = useReducedMotion();

  const show = (t: TimelineTarget) => () => setActiveTarget(t);
  const hide = () => setActiveTarget(null);

  const tip = activeTarget ? TOOLTIPS[activeTarget] : null;

  // Reveal: the track(s) fade in once in view; static under reduced motion.
  // Opacity (on a wrapping group, so per-line opacity is preserved), not SVG
  // pathLength — pathLength draw-on breaks with vectorEffect="non-scaling-stroke"
  // at non-1:1 render scales. See DEC-061.
  const lineReveal = prefersReduced
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: { duration: DURATION.slow, ease: EASE_SOFT },
      };
  const reveal = prefersReduced
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "0px 0px -10% 0px" },
        transition: {
          duration: DURATION.medium,
          ease: EASE_SOFT,
          delay: DURATION.slow * 0.5,
        },
      };

  return (
    <div
      className={cn("relative w-full select-none", className)}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${TIMELINE_VIEWBOX.w} ${TIMELINE_VIEWBOX.h}`}
        fill="none"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* magnitude track(s) — one building signal (compact) or several
            disconnected systems converging into one impact (detailed). Wrapped
            in a group that fades in, so each line keeps its own opacity. */}
        <motion.g {...lineReveal}>
          {detailed ? (
            SYSTEM_TRACKS.map((d, i) => (
              <path
                key={d}
                d={d}
                stroke={i === 0 ? "var(--signal-focus)" : "var(--text-muted)"}
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={i === 0 ? 0.55 : 0.4}
                vectorEffect="non-scaling-stroke"
              />
            ))
          ) : (
            <>
              <path
                d={MAG_AREA_D}
                fill="var(--signal-focus)"
                fillOpacity={0.06}
              />
              <path
                d={MAG_LINE_D}
                stroke="var(--signal-focus)"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}
        </motion.g>

        {/* timeline axis (static — structural) */}
        <line
          x1={AXIS_X.min}
          y1={AXIS_Y}
          x2={AXIS_X.max}
          y2={AXIS_Y}
          stroke="var(--border-default)"
          strokeWidth={1.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* week ticks + labels */}
        <g
          stroke="var(--text-muted)"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.4}
          vectorEffect="non-scaling-stroke"
        >
          {WEEK_TICKS.map((t) => (
            <line
              key={t.label}
              x1={t.x}
              y1={TICK_Y.top}
              x2={t.x}
              y2={TICK_Y.bottom}
            />
          ))}
        </g>

        {/* measured lead-time brace + always-visible annotation */}
        <motion.g {...reveal}>
          <g
            stroke="var(--border-strong)"
            strokeWidth={1}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          >
            <line x1={BRACE.x1} y1={BRACE.topY} x2={BRACE.x2} y2={BRACE.topY} />
            <line
              x1={BRACE.x1}
              y1={BRACE.topY}
              x2={BRACE.x1}
              y2={BRACE.tickY}
            />
            <line
              x1={BRACE.x2}
              y1={BRACE.topY}
              x2={BRACE.x2}
              y2={BRACE.tickY}
            />
          </g>
        </motion.g>

        {/* event markers — focal points on the magnitude curve */}
        <motion.g {...reveal}>
          {/* early operational signal */}
          <line
            x1={SIGNAL_DOT.x}
            y1={SIGNAL_DOT.y}
            x2={SIGNAL_DOT.x}
            y2={AXIS_Y}
            stroke="var(--border-default)"
            strokeWidth={1}
            opacity={0.4}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={SIGNAL_DOT.x}
            cy={SIGNAL_DOT.y}
            r={8}
            stroke="var(--signal-focus)"
            strokeWidth={1}
            opacity={0.3}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={SIGNAL_DOT.x}
            cy={SIGNAL_DOT.y}
            r={4.5}
            fill="var(--signal-focus)"
          />

          {/* later financial impact */}
          <line
            x1={IMPACT_DOT.x}
            y1={IMPACT_DOT.y}
            x2={IMPACT_DOT.x}
            y2={AXIS_Y}
            stroke="var(--border-default)"
            strokeWidth={1}
            opacity={0.4}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={IMPACT_DOT.x}
            cy={IMPACT_DOT.y}
            r={8}
            stroke="var(--signal-warning)"
            strokeWidth={1}
            opacity={0.3}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={IMPACT_DOT.x}
            cy={IMPACT_DOT.y}
            r={4.5}
            fill="var(--signal-warning)"
          />
        </motion.g>

        {/* transparent hover hit areas — larger than the visible marks */}
        <rect
          x={HIT.span.x}
          y={HIT.span.y}
          width={HIT.span.width}
          height={HIT.span.height}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={show("span")}
          onMouseLeave={hide}
        />
        <circle
          cx={HIT.signal.cx}
          cy={HIT.signal.cy}
          r={HIT.signal.r}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={show("signal")}
          onMouseLeave={hide}
        />
        <circle
          cx={HIT.impact.cx}
          cy={HIT.impact.cy}
          r={HIT.impact.r}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={show("impact")}
          onMouseLeave={hide}
        />
      </svg>

      {/* Overlay labels — HTML (consistent CSS px), not SVG <text> which scales
          with the chart width. Positioned by viewBox %; baseline at yPct. */}
      {WEEK_TICKS.map((t) => (
        <VizLabel
          key={t.label}
          xPct={(t.x / TIMELINE_VIEWBOX.w) * 100}
          yPct={(LABEL_Y / TIMELINE_VIEWBOX.h) * 100}
          anchor="middle"
        >
          {t.label}
        </VizLabel>
      ))}
      <VizLabel
        xPct={(BRACE.labelX / TIMELINE_VIEWBOX.w) * 100}
        yPct={(BRACE.labelY / TIMELINE_VIEWBOX.h) * 100}
        anchor="middle"
        tone="secondary"
      >
        {BRACE.label}
      </VizLabel>
      {detailed && (
        <VizLabel
          xPct={(SYSTEMS_LABEL.x / TIMELINE_VIEWBOX.w) * 100}
          yPct={(SYSTEMS_LABEL.y / TIMELINE_VIEWBOX.h) * 100}
          anchor="start"
        >
          {SYSTEMS_LABEL.text}
        </VizLabel>
      )}

      <VizTooltip
        open={!!tip}
        motionKey={activeTarget ?? ""}
        style={
          tip
            ? {
                left: `${tip.xPct}%`,
                top: `${tip.yPct}%`,
                transform: tip.flipLeft
                  ? "translate(-100%, -140%)"
                  : "translate(-8px, -140%)",
              }
            : undefined
        }
      >
        <span className="text-text-primary text-meta-sm font-mono whitespace-nowrap">
          {tip?.text}
        </span>
        <span className="text-text-muted text-meta-sm font-mono whitespace-nowrap">
          {tip?.subtext}
        </span>
      </VizTooltip>
    </div>
  );
}
