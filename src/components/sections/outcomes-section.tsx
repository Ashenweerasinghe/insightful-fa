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
  "See margin pressure forming before it reaches the P&L.",
  "Give leadership one clear view across operations.",
  "Spend less time explaining results and more time shaping them.",
  "Forecast with more confidence, less guesswork.",
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
                <EyebrowLabel>What changes</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Earlier visibility changes how businesses operate.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  Visibility is not just informational. It changes outcomes.
                </Text>
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
