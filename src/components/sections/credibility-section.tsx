import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

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
            <Heading
              level={2}
              size="heading-xl"
              className="text-center text-heading-lg lg:text-heading-xl"
            >
              How We&rsquo;re Different
            </Heading>
          </Reveal>
          <Reveal delay={0.08}>
            <Stack gap="lg">
              <ul className="list-disc space-y-[var(--space-xs)] pl-[var(--space-md)]">
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We don&apos;t replace your existing systems&mdash;we integrate
                    them.
                  </Text>
                </li>
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We build customized dashboards tailored to your business.
                  </Text>
                </li>
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We combine AI with experienced financial professionals.
                  </Text>
                </li>
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We provide actionable recommendations, not just reports.
                  </Text>
                </li>
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We help leaders make better decisions before month-end.
                  </Text>
                </li>
                <li>
                  <Text size="body-lg" className="text-text-primary">
                    We continuously improve forecasting accuracy through real
                    business feedback.
                  </Text>
                </li>
              </ul>
            </Stack>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
