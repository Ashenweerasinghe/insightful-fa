"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE_SOFT, REVEAL_OFFSET } from "@/lib/motion/tokens";

interface RevealProps {
  children: ReactNode;
  /** Optional stagger delay in seconds (motion spec: 40–100ms). */
  delay?: number;
  className?: string;
}

/**
 * Reveal (P2-04): a restrained fade-up that plays once as the element scrolls
 * into view, using the shared motion tokens. Under prefers-reduced-motion the
 * content renders immediately with no transform — motion is removed cleanly.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: REVEAL_OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: DURATION.medium, ease: EASE_SOFT, delay }}
    >
      {children}
    </motion.div>
  );
}
