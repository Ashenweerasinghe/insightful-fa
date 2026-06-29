import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type GridVariant = "grid-2" | "grid-3" | "editorial-asymmetry";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GridVariant;
}

/* Mobile-first: one column, expanding at md. The asymmetry ratio is a
   structural layout value, not a design token. */
const VARIANT_CLASS: Record<GridVariant, string> = {
  "grid-2": "grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-2",
  "grid-3": "grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3",
  "editorial-asymmetry":
    "grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-[0.8fr_1.2fr]",
};

export function Grid({
  variant = "grid-2",
  className,
  ...props
}: GridProps): ReactElement {
  return <div className={cn(VARIANT_CLASS[variant], className)} {...props} />;
}
