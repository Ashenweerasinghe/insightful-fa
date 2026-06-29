import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { FrameworkCard } from "@/components/cards/framework-card";

const STEPS = [
  {
    step: 1,
    title: "Observe",
    description: "Identify operational signals and hidden variability.",
  },
  {
    step: 2,
    title: "Connect",
    description:
      "Map relationships between operational activity and financial outcomes.",
  },
  {
    step: 3,
    title: "Forecast",
    description: "Detect emerging pressure areas before they compound.",
  },
  {
    step: 4,
    title: "Respond",
    description: "Create calmer and more informed operational decision-making.",
  },
];

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
        <Stack gap="2xl">
          <Reveal>
            <Stack gap="md">
              <EyebrowLabel>The framework</EyebrowLabel>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                The IFA Predictive Control Framework™
              </Heading>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="flex flex-col">
              {STEPS.map((s) => (
                <FrameworkCard key={s.step} {...s} />
              ))}
            </ol>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
