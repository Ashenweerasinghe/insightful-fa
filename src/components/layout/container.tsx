import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerWidth = "narrow" | "default" | "wide";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  narrow: "max-w-narrow",
  default: "max-w-default",
  wide: "max-w-wide",
};

export function Container({
  width = "default",
  className,
  ...props
}: ContainerProps): ReactElement {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-lg)]",
        WIDTH_CLASS[width],
        className,
      )}
      {...props}
    />
  );
}
