import Image from "next/image";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/brand/logo-art";

const BRAND_NAME = "Insightful Financial Analytics";

type LogoProps = {
  /**
   * `lockup` — the ribbon mark plus the stacked "Insightful / Financial /
   * Analytics" wordmark, rendered from the source SVG. Use where there is room
   * for the full mark (footer).
   * `mark` — the ribbon symbol only, inlined with `currentColor` so it inherits
   * the surrounding text colour and hover/opacity. Use in tight chrome (navbar).
   */
  variant?: "lockup" | "mark";
  /** Size by height with `w-auto` (e.g. `h-[var(--space-lg)] w-auto`) to keep aspect. */
  className?: string;
  /**
   * Mark `currentColor` decorative when an ancestor already names the brand
   * (e.g. the home link's `aria-label`), to avoid a doubled screen-reader announcement.
   */
  decorative?: boolean;
};

/**
 * Brand logo (P-logo). Server component. Two surfaces consume it: the navbar
 * (`mark`) and the footer (`lockup`). The canonical SVGs live in
 * `public/icons/` (`logo-wordmark.svg`, `logo-mark.svg`); the mark geometry is
 * mirrored in `logo-art.ts` for the inline/`currentColor` path. See DECISIONS.
 */
export function Logo({
  variant = "lockup",
  className,
  decorative = false,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox={MARK_VIEWBOX}
        fill="currentColor"
        className={className}
        {...(decorative
          ? { "aria-hidden": true }
          : { role: "img", "aria-label": BRAND_NAME })}
      >
        {!decorative && <title>{BRAND_NAME}</title>}
        <path d={MARK_PATH} />
      </svg>
    );
  }

  // width/height must match logo-wordmark.svg's viewBox aspect (205.8 × 84) or
  // next/image reserves the wrong ratio and distorts the lockup. Update these two
  // numbers if the artwork is re-cropped.
  return (
    <Image
      src="/icons/logo-wordmark.svg"
      alt={decorative ? "" : BRAND_NAME}
      width={206}
      height={84}
      className={className}
      unoptimized
    />
  );
}
