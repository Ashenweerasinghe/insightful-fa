import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

const COMPETITIVE_ADVANTAGES = [
  "Earlier visibility into where your business is heading.",
  "Customized dashboards built specifically for your business.",
  "Financial and operational data brought together in one clear view.",
  "AI-assisted analysis combined with experienced financial professionals.",
  "Practical recommendations\u2014not just reports.",
  "Works alongside your accounting firm and internal finance team.",
  "Integrates with your existing systems without disruption.",
  "Continuously improves through real-world feedback.",
] as const;

/**
 * CredibilitySection (P3-05): competitive advantages presented as a calm
 * editorial list.
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
              Our Competitive Advantages
            </Heading>
          </Reveal>
          <Reveal delay={0.08}>
            <Stack gap="lg">
              <ul className="list-disc space-y-[var(--space-xs)] pl-[var(--space-md)]">
                {COMPETITIVE_ADVANTAGES.map((advantage) => (
                  <li key={advantage}>
                    <Text size="body-lg" className="text-text-primary">
                      {advantage}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
