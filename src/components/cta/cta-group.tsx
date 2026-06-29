import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

export type CTAGroupProps = HTMLAttributes<HTMLDivElement>;

/** Groups a primary + secondary CTA: stacked on mobile, inline from sm up. */
export function CTAGroup({ className, ...props }: CTAGroupProps): ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-sm)] sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
      {...props}
    />
  );
}
