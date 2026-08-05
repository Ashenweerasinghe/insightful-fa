import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

/**
 * SeeAheadSection: the "See where your business is heading" narrative, moved
 * out of the hero to sit between the ExplainSection and the FrameworkSection.
 * Editorial two-column: heading on the left, supporting copy on the right.
 */
export function SeeAheadSection() {
  return (
    <Section variant="editorial" className="border-border-subtle border-t">
      <Container width="wide">
        <Grid variant="grid-2" className="items-start">
          <Reveal>
            <Stack gap="md">
              <EyebrowLabel>What we do</EyebrowLabel>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl text-text-primary"
              >
                See where your business is heading&mdash;before month-end
              </Heading>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="max-w-[36rem] space-y-[var(--space-md)] text-text-secondary">
              <Text size="body-md">
                We combine your financial and operational data into customized
                dashboards, using AI-assisted analysis together with experienced
                financial professionals to provide practical recommendations
                that help you make better business decisions.
              </Text>
              <Text size="body-md">
                We work alongside your accounting firm and internal finance
                team, using the systems you already have.
              </Text>
            </div>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
