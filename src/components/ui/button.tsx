import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** When provided, the button renders as an anchor (a calm CTA link). */
  href?: string;
}

/* Shared box + restrained interaction: soft fast color transition, visible
   focus ring, no scale/glow; transitions drop under prefers-reduced-motion. */
const BASE =
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-sans font-medium transition duration-[var(--transition-fast)] ease-[var(--ease-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "h-[var(--button-height)] bg-background-dark px-[var(--button-padding-x)] text-body-md text-text-inverse hover:opacity-90",
  secondary:
    "h-[var(--button-height)] border border-border-default bg-transparent px-[var(--button-padding-x)] text-body-md text-text-primary hover:border-border-strong hover:bg-surface-card",
  text: "text-body-md text-text-primary underline-offset-4 hover:underline hover:opacity-70",
};

export function Button({
  variant = "primary",
  href,
  className,
  ...rest
}: ButtonProps): ReactElement {
  const classes = cn(BASE, VARIANT_CLASS[variant], className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return <button type="button" className={classes} {...rest} />;
}
