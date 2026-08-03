import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { FrameworkCard } from "@/components/cards/framework-card";

const LAYERS = [
  {
    step: 1,
    title: "Data Foundation",
    description:
      "Build a strong financial foundation with clean, reliable, and standardized financial and operational data.",
  },
  {
    step: 2,
    title: "Operational Integration",
    description:
      "Connect financial information with the operational drivers that influence business performance.",
  },
  {
    step: 3,
    title: "Predictive Intelligence",
    description:
      "Transform financial and operational data into customized dashboards using AI-assisted analysis and experienced financial professionals to understand where the business is heading before month-end.",
  },
  {
    step: 4,
    title: "Continuous Improvement",
    description:
      "Create a continuous feedback loop that turns insights into actions and continuously improves business performance over time.",
  },
] as const;

/**
 * OutcomesSection (P3-04): expands the predictive control framework into its
 * four operating layers.
 */
export function OutcomesSection() {
  return (
    <Section
      variant="editorial"
      className="border-border-subtle bg-background-secondary border-t"
    >
      <Container width="default">
        <Stack gap="xl">
          <Reveal>
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              The Four Layers of the IFA Predictive Control Framework&trade;
            </Heading>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="flex flex-col">
              {LAYERS.map((layer) => (
                <FrameworkCard
                  key={layer.step}
                  step={layer.step}
                  title={layer.title}
                  description={layer.description}
                />
              ))}
            </ol>
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
