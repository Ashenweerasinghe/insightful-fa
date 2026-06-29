import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface VizLabelProps {
  /** Position as a percentage of the chart box — maps 1:1 to the SVG viewBox. */
  xPct: number;
  yPct: number;
  /** Horizontal anchor relative to (xPct, yPct), mirroring SVG text-anchor. */
  anchor?: "start" | "middle" | "end";
  /** Colour tone. */
  tone?: "muted" | "secondary";
  children: ReactNode;
}

const ANCHOR_TX = {
  start: "0%",
  middle: "-50%",
  end: "-100%",
} as const;

/**
 * VizLabel (P7-13): an HTML overlay label for the data-viz charts. Rendered as
 * positioned text in real CSS pixels rather than SVG <text>, so the type size is
 * consistent across pages and viewports regardless of how wide the chart draws
 * (SVG <text> scales with the viewBox; CSS px does not). The chart wrapper is
 * `relative` and its box equals the SVG box, so percentage coordinates map 1:1 to
 * the viewBox. The `-100%` Y shift puts the text baseline at `yPct`, matching the
 * SVG text it replaces. Decorative — the chart wrapper is already aria-hidden.
 */
export function VizLabel({
  xPct,
  yPct,
  anchor = "middle",
  tone = "muted",
  children,
}: VizLabelProps) {
  return (
    <span
      className={cn(
        "text-meta-sm pointer-events-none absolute font-mono whitespace-nowrap",
        tone === "secondary" ? "text-text-secondary" : "text-text-muted",
      )}
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `translate(${ANCHOR_TX[anchor]}, -100%)`,
      }}
    >
      {children}
    </span>
  );
}
