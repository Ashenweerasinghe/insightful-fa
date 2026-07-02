import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { ForecastLine } from "@/components/data-viz/forecast-line";
import { OutcomeCard } from "@/components/cards/outcome-card";

const OUTCOMES: string[] = [
  "1. Data Foundation",
  "2. Operational Integration",
  "3. Predictive Intelligence",
  "4. Continuous Improvement",
];

/**
 * OutcomesSection (P3-04): translates the framework into practical value. An
 * asymmetric intro pairs the headline with the interactive ForecastLine signal; four
 * approved outcomes follow as calm, hairline-bordered editorial cards.
 */
export function OutcomesSection() {
  return (
    <Section
      variant="editorial"
      className="border-border-subtle bg-background-secondary border-t"
    >
      <Container width="default">
        <Stack gap="2xl">
          <Grid variant="editorial-asymmetry" className="items-center">
            <Reveal>
              <Stack gap="md">
                <EyebrowLabel>What we do</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  The IFA Predictive Control Framework&trade;
                </Heading>
              </Stack>
            </Reveal>
            <Reveal delay={0.08}>
              <Stack gap="sm">
                <ForecastLine />
                <Text size="body-sm" className="text-text-secondary">
                  A rising operational signal, caught before it crosses into
                  financial risk.
                </Text>
              </Stack>
            </Reveal>
          </Grid>
          <Reveal delay={0.16}>
            <ul className="grid grid-cols-1 gap-[var(--space-xl)] sm:grid-cols-2">
              {OUTCOMES.map((statement) => (
                <OutcomeCard key={statement} statement={statement} />
              ))}
            </ul>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
