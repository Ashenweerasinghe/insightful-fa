import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

/**
 * FrameworkSection (P3-03): the four-step method — Observe, Connect, Forecast,
 * Respond — as a calm vertical numbered progression. id="framework" is the hero's
 * "See how the system works" anchor target.
 */
export function FrameworkSection() {
  return (
    <Section
      variant="editorial"
      id="framework"
      className="scroll-mt-[var(--space-2xl)]"
    >
      <Container width="default">
        <Grid variant="grid-2" className="items-start">
          <Reveal>
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              We build customized dashboards that tell you where your
              business is heading&mdash;and what to do about it.
            </Heading>
          </Reveal>
          <Reveal delay={0.08}>
            <Text size="body-lg" className="text-text-secondary">
              We build customized dashboards that show businesses where they
              are heading before month-end and what actions to take to
              course-correct.
              <br />
              <br />
              We combine financial expertise with AI-assisted analysis to
              provide practical recommendations using the systems the business
              already has.
            </Text>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
