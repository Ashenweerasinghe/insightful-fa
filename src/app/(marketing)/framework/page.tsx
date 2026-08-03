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

const ACTION_STEPS = [
  {
    step: 1,
    title: "Establish a Strong Financial Foundation",
    description:
      "Build on reliable financial information to support accurate analysis, forecasting, and better business decisions.",
  },
  {
    step: 2,
    title: "Define Revenue and Cost Drivers",
    description:
      "Identify the operational activities that drive financial performance.",
  },
  {
    step: 3,
    title: "Define Data Sources",
    description:
      "Identify the financial and operational data required to support decision-making.",
  },
  {
    step: 4,
    title: "Gather the Data",
    description:
      "Collect data from existing systems, departments, and business units.",
  },
  {
    step: 5,
    title: "Clean and Integrate the Data",
    description:
      "Standardize, validate, and integrate financial and operational data into a single reliable source.",
  },
  {
    step: 6,
    title: "Refine Financial Models and Forecasts",
    description:
      "Build on existing budgets, forecasts, and financial models\u2014or develop them where needed\u2014to project business performance throughout the reporting period.",
  },
  {
    step: 7,
    title: "Generate Business Insights",
    description:
      "Analyze each business unit to identify trends, risks, opportunities, and location-specific recommendations.",
  },
  {
    step: 8,
    title: "Develop Action Plans",
    description:
      "Convert insights into practical action plans with clear ownership and measurable outcomes.",
  },
  {
    step: 9,
    title: "Build Customized Dashboards",
    description:
      "Develop customized dashboards using existing financial and operational data to show where the business is heading, highlight emerging risks and opportunities, and recommend actions before month-end.",
  },
  {
    step: 10,
    title: "Review, Refine, and Improve",
    description:
      "Meet regularly with leadership to review results, refine recommendations, and continuously improve business performance.",
  },
] as const;

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
                The IFA Predictive Control Framework<sup>&trade;</sup> is our proprietary
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
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              The Four Layers of the IFA Predictive Control Framework&trade;
            </Heading>
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

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="md">
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              How We Turn Data Into Action
            </Heading>
            <div className="max-w-[72ch] space-y-[var(--space-md)] text-left text-text-secondary">
              {ACTION_STEPS.map((item) => (
                <Text
                  key={item.step}
                  size="body-lg"
                  className="text-text-secondary"
                >
                  <strong className="text-text-primary">
                    {item.step}. {item.title}
                  </strong>
                  <br />
                  {item.description}
                </Text>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="md">
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              Our Competitive Advantages
            </Heading>
            <ul className="max-w-[72ch] list-disc space-y-[var(--space-md)] pl-[var(--space-lg)] text-left text-text-secondary">
              {COMPETITIVE_ADVANTAGES.map((advantage) => (
                <li key={advantage}>
                  <Text size="body-lg" className="text-text-secondary">
                    {advantage}
                  </Text>
                </li>
              ))}
            </ul>
          </Stack>
        </Container>
      </Section>

    </>
  );
}
