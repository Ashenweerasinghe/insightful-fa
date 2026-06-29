import { type HTMLAttributes, type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

export type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className, ...props }: DividerProps): ReactElement {
  return (
    <hr
      className={cn("border-border-subtle border-0 border-t", className)}
      {...props}
    />
  );
}
