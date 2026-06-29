import { createElement, type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type EyebrowElement = "p" | "span" | "div";

export interface EyebrowLabelProps extends HTMLAttributes<HTMLElement> {
  as?: EyebrowElement;
}

export function EyebrowLabel({
  as = "p",
  className,
  ...props
}: EyebrowLabelProps): ReactElement {
  return createElement(as, {
    className: cn("t-eyebrow", className),
    ...props,
  });
}
