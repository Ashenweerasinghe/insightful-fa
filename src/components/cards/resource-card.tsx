import type { ReactElement } from "react";
import Link from "next/link";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { formatPublishedDate } from "@/lib/content/format-date";
import type { ResourceCategory } from "@/types/content";

interface ResourceCardProps {
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  publishedAt: string;
}

/**
 * Editorial article preview — minimal, no thumbnails. The whole card is one
 * link; the title underlines on hover and the link carries the focus ring.
 */
export function ResourceCard({
  slug,
  title,
  description,
  category,
  publishedAt,
}: ResourceCardProps): ReactElement {
  return (
    <article>
      <Link
        href={`/resources/${slug}`}
        className="group border-border-subtle focus-visible:outline-signal-focus block border-t pt-[var(--space-lg)] focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Stack gap="sm">
          <Text as="span" size="body-sm" className="text-text-secondary">
            {category} ·{" "}
            <time dateTime={publishedAt}>
              {formatPublishedDate(publishedAt)}
            </time>
          </Text>
          <Heading
            level={3}
            size="heading-md"
            className="decoration-border-strong underline-offset-4 group-hover:underline"
          >
            {title}
          </Heading>
          <Text size="body-md" className="text-text-secondary">
            {description}
          </Text>
        </Stack>
      </Link>
    </article>
  );
}
