import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Text } from "@/components/typography/text";
import { QuoteBlock } from "@/components/quote/quote-block";

/**
 * CredibilitySection (P3-05): a humanizing philosophy statement. Editorial asymmetry
 * with a sparse left column for emotional decompression; the perspective is framed
 * by the eyebrow rather than a claimed founder name.
 */
export function CredibilitySection() {
  return (
    <Section variant="editorial">
      <Container width="default">
        <Grid variant="editorial-asymmetry" className="items-start">
          <Reveal>
            <EyebrowLabel>Our perspective</EyebrowLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <Stack gap="lg">
              <QuoteBlock quote="The earlier signals usually exist. Most organizations simply lack visibility into them." />
              <Text size="body-lg" className="text-text-secondary">
                Our perspective comes from working inside real operational
                environments, where financial and operational systems meet.
              </Text>
            </Stack>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
