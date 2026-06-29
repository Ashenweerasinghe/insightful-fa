import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Text } from "@/components/typography/text";

const DIFFERENTIATORS = [
  "We don’t replace your systems. We work inside them.",
  "We don’t hand you another static spreadsheet or historical report. We build predictive visibility into what’s ahead.",
  "We pair AI with experienced financial judgment. Fast, and always accountable.",
];

/**
 * DifferentiatorsSection (P8-03): a calm "How we're different" contrast block.
 * Heading-less by design (mirrors CredibilitySection) so the homepage keeps three
 * <h2>s; the three lines read as an editorial hairline list, never a card grid.
 */
export function DifferentiatorsSection() {
  return (
    <Section variant="editorial" className="border-border-subtle border-t">
      <Container width="default">
        <Reveal>
          <Stack gap="lg">
            <EyebrowLabel>How we&rsquo;re different</EyebrowLabel>
            <ul className="flex flex-col">
              {DIFFERENTIATORS.map((line) => (
                <li
                  key={line}
                  className="border-border-subtle border-t py-[var(--space-lg)] first:border-t-0 first:pt-0"
                >
                  <Text size="body-lg">{line}</Text>
                </li>
              ))}
            </ul>
          </Stack>
        </Reveal>
      </Container>
    </Section>
  );
}
