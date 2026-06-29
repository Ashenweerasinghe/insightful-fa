import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { SignalTimeline } from "@/components/data-viz/signal-timeline";

const VISIBILITY_POINTS = [
  "Labor quietly creeping above plan",
  "Inventory building without visibility",
  "Marketing spend with no clear return",
  "Revenue underperforming expectations",
];

/**
 * ProblemSection (P3-02): calm recognition of what traditional reporting misses —
 * the lead time between an early operational signal and its later financial impact.
 * Editorial two-column; a quiet SignalTimeline supports (never a dashboard).
 */
export function ProblemSection() {
  return (
    <Section
      variant="editorial"
      className="border-border-subtle bg-background-secondary border-t"
    >
      <Container width="default">
        <Grid variant="grid-2" className="items-center">
          <Reveal>
            <Stack gap="md">
              <EyebrowLabel>What reporting misses</EyebrowLabel>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                By the time it reaches your financials, you&rsquo;re explaining
                the problem, not managing it.
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                Most operational issues build gradually across disconnected
                systems, workflows, and teams, long before their financial
                impact is obvious. Traditional reporting explains what already
                happened. That&rsquo;s not control, that&rsquo;s post-mortem. We
                change that.
              </Text>
              <ul className="flex flex-col">
                {VISIBILITY_POINTS.map((point) => (
                  <li
                    key={point}
                    className="border-border-subtle border-t py-[var(--space-sm)] first:border-t-0 first:pt-0"
                  >
                    <Text
                      as="span"
                      size="body-md"
                      className="text-text-secondary"
                    >
                      {point}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <Stack gap="sm">
              <SignalTimeline />
              <Text size="body-sm" className="text-text-secondary">
                An operational signal often appears well before the same problem
                surfaces in financial reporting.
              </Text>
            </Stack>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
