import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type StackGap =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

const GAP_CLASS: Record<StackGap, string> = {
  "2xs": "gap-[var(--space-2xs)]",
  xs: "gap-[var(--space-xs)]",
  sm: "gap-[var(--space-sm)]",
  md: "gap-[var(--space-md)]",
  lg: "gap-[var(--space-lg)]",
  xl: "gap-[var(--space-xl)]",
  "2xl": "gap-[var(--space-2xl)]",
  "3xl": "gap-[var(--space-3xl)]",
  "4xl": "gap-[var(--space-4xl)]",
  "5xl": "gap-[var(--space-5xl)]",
};

export function Stack({
  gap = "md",
  className,
  ...props
}: StackProps): ReactElement {
  return (
    <div
      className={cn("flex flex-col", GAP_CLASS[gap], className)}
      {...props}
    />
  );
}
