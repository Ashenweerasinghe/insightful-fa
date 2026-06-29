import { type ReactElement } from "react";
import { Text } from "@/components/typography/text";

interface OutcomeCardProps {
  statement: string;
}

/**
 * OutcomeCard (P3-04): one practical outcome of earlier visibility, as a single
 * approved statement under a small amber signal marker. A hairline-bordered editorial
 * tile — never a shadowed surface or a KPI stat. Subtle border-only hover.
 */
export function OutcomeCard({ statement }: OutcomeCardProps): ReactElement {
  return (
    <li className="border-border-subtle hover:border-border-default flex flex-col gap-[var(--space-md)] rounded-lg border p-[var(--space-xl)] transition-colors duration-[var(--transition-fast)] ease-[var(--ease-soft)] motion-reduce:transition-none">
      <span
        aria-hidden="true"
        className="bg-signal-focus h-[var(--space-2xs)] w-[var(--space-md)] rounded-full"
      />
      <Text size="body-lg" className="text-text-primary">
        {statement}
      </Text>
    </li>
  );
}
