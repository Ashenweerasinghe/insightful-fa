import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type SectionVariant = "hero" | "editorial" | "transitional" | "cta";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
}

const VARIANT_CLASS: Record<SectionVariant, string> = {
  hero: "py-[var(--section-space-lg)]",
  editorial: "py-[var(--section-space-md)]",
  transitional: "py-[var(--section-space-sm)]",
  cta: "py-[var(--section-space-lg)]",
};

export function Section({
  variant = "editorial",
  className,
  ...props
}: SectionProps): ReactElement {
  return (
    <section className={cn(VARIANT_CLASS[variant], className)} {...props} />
  );
}
