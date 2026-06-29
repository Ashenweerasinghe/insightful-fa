import Image from "next/image";
import { type ReactElement } from "react";
import { cn } from "@/lib/utils/cn";

interface HeroIllustrationProps {
  className?: string;
}

/**
 * HeroIllustration: raster image rendered into the hero's right column.
 * Decorative — meaning lives in adjacent copy, so empty alt + aria-hidden
 * on the wrapper. Loaded with priority because it sits above the fold.
 *
 * Fades in on load via the CSS `hero-image-fade` keyframe (DEC-065) — opacity
 * only, at first paint, so it stays a server component and never gates LCP on
 * hydration. The fade definition + reduced-motion handling live in globals.css.
 */
export function HeroIllustration({
  className,
}: HeroIllustrationProps): ReactElement {
  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      <Image
        src="/illustrations/hero-campfire.webp"
        alt=""
        width={1536}
        height={1024}
        priority
        sizes="(min-width: 1024px) 65vw, 100vw"
        className="hero-image-fade h-auto w-full"
      />
    </div>
  );
}
