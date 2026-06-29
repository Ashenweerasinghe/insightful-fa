/*
 * Motion constants mirrored from the CSS motion tokens in styles/tokens.css.
 * Framer Motion needs numeric seconds and cubic-bezier arrays, so the values
 * are centralized here (token-driven) rather than scattered as magic numbers.
 * Keep these in sync with tokens.css.
 */

/** --ease-soft: cubic-bezier(0.22, 1, 0.36, 1) */
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Durations in seconds — mirror --transition-fast / medium / slow (160 / 320 / 700ms). */
export const DURATION = {
  fast: 0.16,
  medium: 0.32,
  slow: 0.7,
} as const;

/** Fade-up vertical offset in px (motion spec: 8–16px maximum). */
export const REVEAL_OFFSET = 12;
