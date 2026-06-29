import { createElement, type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type TextSize = "body-lg" | "body-md" | "body-sm";
type TextElement = "p" | "span" | "div";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  as?: TextElement;
}

const SIZE_CLASS: Record<TextSize, string> = {
  "body-lg": "t-body-lg",
  "body-md": "t-body-md",
  "body-sm": "t-body-sm",
};

export function Text({
  size = "body-md",
  as = "p",
  className,
  ...props
}: TextProps): ReactElement {
  return createElement(as, {
    className: cn(SIZE_CLASS[size], className),
    ...props,
  });
}
