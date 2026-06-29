import { createElement, type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type HeadingSize =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "heading-xl"
  | "heading-lg"
  | "heading-md";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level (h1–h6), kept independent of visual size for correct document order. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual type scale. */
  size?: HeadingSize;
}

const SIZE_CLASS: Record<HeadingSize, string> = {
  "display-xl": "t-display-xl",
  "display-lg": "t-display-lg",
  "display-md": "t-display-md",
  "heading-xl": "t-heading-xl",
  "heading-lg": "t-heading-lg",
  "heading-md": "t-heading-md",
};

export function Heading({
  level = 2,
  size = "heading-lg",
  className,
  ...props
}: HeadingProps): ReactElement {
  return createElement(`h${level}`, {
    className: cn(SIZE_CLASS[size], className),
    ...props,
  });
}
