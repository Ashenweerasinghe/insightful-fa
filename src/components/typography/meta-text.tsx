import { createElement, type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type MetaSize = "meta-lg" | "meta-md" | "meta-sm";
type MetaElement = "span" | "p" | "div";

export interface MetaTextProps extends HTMLAttributes<HTMLElement> {
  size?: MetaSize;
  as?: MetaElement;
}

const SIZE_CLASS: Record<MetaSize, string> = {
  "meta-lg": "t-meta-lg",
  "meta-md": "t-meta-md",
  "meta-sm": "t-meta-sm",
};

export function MetaText({
  size = "meta-md",
  as = "span",
  className,
  ...props
}: MetaTextProps): ReactElement {
  return createElement(as, {
    className: cn(SIZE_CLASS[size], className),
    ...props,
  });
}
