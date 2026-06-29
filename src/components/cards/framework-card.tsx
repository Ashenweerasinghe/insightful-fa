import { type ReactElement } from "react";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

interface FrameworkCardProps {
  step: number;
  title: string;
  description: string;
  /** Optional concrete deliverable, shown as an "In practice:" line under the
   * step. Used on the Framework page; the homepage FrameworkSection omits it. */
  inPractice?: string;
}

/**
 * FrameworkCard (P3-03): one step in the vertical framework progression. Renders
 * as an <li> with a mono step number + amber signal marker, separated from the
 * previous step by a hairline rule. Editorial — no surface fill, no shadow.
 */
export function FrameworkCard({
  step,
  title,
  description,
  inPractice,
}: FrameworkCardProps): ReactElement {
  return (
    <li className="group border-border-subtle grid grid-cols-1 gap-[var(--space-sm)] border-t py-[var(--space-xl)] first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr] sm:gap-[var(--space-2xl)]">
      <div className="flex items-center gap-[var(--space-sm)]">
        <span
          aria-hidden="true"
          className="bg-signal-focus h-[var(--space-xs)] w-[var(--space-xs)] rounded-full"
        />
        <span className="text-meta-lg text-text-secondary group-hover:text-text-primary font-mono tracking-[var(--tracking-wide)] transition-colors duration-[var(--transition-fast)] ease-[var(--ease-soft)] motion-reduce:transition-none">
          {String(step).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-col gap-[var(--space-xs)]">
        <Heading level={3} size="heading-md">
          {title}
        </Heading>
        <Text size="body-md" className="text-text-secondary">
          {description}
        </Text>
        {inPractice ? (
          <Text size="body-sm" className="text-text-secondary">
            <span className="text-text-primary font-medium">In practice:</span>{" "}
            {inPractice}
          </Text>
        ) : null}
      </div>
    </li>
  );
}
