"use client";

import { type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { DURATION, EASE_SOFT } from "@/lib/motion/tokens";

interface VizTooltipProps {
  /** Render the tooltip when true; AnimatePresence handles enter/exit. */
  open: boolean;
  /** Forces a fresh enter/exit cycle when the logical target changes. */
  motionKey?: string | number;
  /** Absolute-position style the caller computes (left/top/transform). */
  style?: CSSProperties;
  /** Anchor-variant utilities (e.g. "bottom-full right-0 mb-[var(--space-2xs)]"). */
  className?: string;
  children: ReactNode;
}

/**
 * VizTooltip (P7-07): the shared overlay panel for the data-viz components.
 * It owns the AnimatePresence + motion config and the prefers-reduced-motion
 * degradation in one place — under reduced motion the tooltip appears and
 * disappears instantly. The panel chrome (surface / border / spacing tokens)
 * is defined here once so the three charts no longer repeat it.
 */
export function VizTooltip({
  open,
  motionKey,
  style,
  className,
  children,
}: VizTooltipProps) {
  const prefersReduced = useReducedMotion();
  // Framer Motion drives `transform` for the y fade, so a static anchor
  // transform (e.g. the left-flip / vertical offset) can't live on the same
  // element — it gets clobbered. Keep left/top on the animated element and put
  // the caller's anchor transform on a static inner wrapper.
  const { transform, ...position } = style ?? {};

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={motionKey}
          initial={{
            opacity: prefersReduced ? 1 : 0,
            y: prefersReduced ? 0 : -4,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : -4 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: DURATION.fast, ease: EASE_SOFT }
          }
          className={cn("pointer-events-none absolute z-10", className)}
          style={position}
        >
          <div style={transform ? { transform } : undefined}>
            <div className="bg-surface-overlay border-border-subtle flex flex-col gap-[2px] rounded border px-[var(--space-sm)] py-[var(--space-2xs)]">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
