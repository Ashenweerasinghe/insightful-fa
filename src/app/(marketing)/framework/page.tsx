import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { FrameworkCard } from "@/components/cards/framework-card";
import structure2Image from "../../../../structure2.png";

export const metadata: Metadata = {
  title: "Framework",
  description:
    "A calm, systems-based framework for operational visibility: how everyday operational signals connect to financial outcomes, and how to see emerging risk earlier.",
  alternates: {
    canonical: "/framework",
  },
  openGraph: {
    title: "Framework · Insightful Financial Analytics",
    description:
      "How operational signals connect to financial outcomes, a systems-based approach to seeing risk earlier.",
    type: "website",
  },
};

const STEPS = [
  {
    step: 1,
    title: "Data Foundation",
    description: "Create clean, reliable, and standardized business data.",
  },
  {
    step: 2,
    title: "Operational Integration",
    description:
      "Connect financial information with operational drivers across the business.",
  },
  {
    step: 3,
    title: "Predictive Intelligence",
    description:
      "Use customized dashboards, AI, and financial expertise to predict business performance before month-end.",
  },
  {
    step: 4,
    title: "Continuous Improvement",
    description:
      "Create a continuous feedback loop using actual results and customer feedback to refine our models and improve forecasting accuracy over time.",
  },
] as const;

export default function FrameworkPage() {
  return (
    <>
      <Section variant="hero">
        <Container width="wide">
          <Grid variant="editorial-asymmetry" className="items-center">
            <Stack gap="lg">
              <EyebrowLabel>The framework</EyebrowLabel>
              <Heading
                level={1}
                size="display-md"
                className="text-heading-xl lg:text-display-md"
              >
                The IFA Predictive Control Framework&trade;
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                The IFA Predictive Control Framework&trade; is our proprietary
                operating model. It converts fragmented financial reporting
                into a structured, predictive control system.
                <br />
                It is built on four integrated layers:
              </Text>
            </Stack>
            <Image
              src={structure2Image}
              alt="IFA Predictive Control Framework structure"
              className="h-auto w-full"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </Grid>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="md">
            <Reveal delay={0.08}>
              <ol className="flex flex-col">
                {STEPS.map((item) => (
                  <FrameworkCard
                    key={item.step}
                    step={item.step}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </ol>
            </Reveal>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
