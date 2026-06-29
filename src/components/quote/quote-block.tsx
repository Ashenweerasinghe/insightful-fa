import { type ReactElement } from "react";
import { Text } from "@/components/typography/text";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  role?: string;
}

/**
 * QuoteBlock (P3-05): an editorial pull-quote as a semantic <figure>/<blockquote>.
 * The quotation is serif for weight (the .t-heading-lg treatment on a paragraph, not
 * a heading — it is a quote, not an outline entry). No oversized decorative glyph.
 */
export function QuoteBlock({
  quote,
  attribution,
  role,
}: QuoteBlockProps): ReactElement {
  return (
    <figure className="flex flex-col gap-[var(--space-lg)]">
      <blockquote>
        <p className="t-heading-lg text-text-primary text-heading-md md:text-heading-lg">
          {quote}
        </p>
      </blockquote>
      {(attribution ?? role) ? (
        <figcaption className="flex flex-col gap-[var(--space-2xs)]">
          {attribution ? (
            <Text size="body-md" className="text-text-primary">
              {attribution}
            </Text>
          ) : null}
          {role ? (
            <Text size="body-sm" className="text-text-secondary">
              {role}
            </Text>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
