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
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">1. Build or Refine the Budget</strong>
                <br />
                Establish realistic financial targets and performance
                expectations.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">2. Define Revenue and Cost Drivers</strong>
                <br />
                Identify the operational metrics that drive financial
                performance.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">3. Define Data Sources</strong>
                <br />
                Determine where financial and operational data will be
                collected.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">4. Gather the Data</strong>
                <br />
                Collect data from all relevant systems and business units.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">5. Clean and Integrate the Data</strong>
                <br />
                Standardize, validate, and integrate the data into a single
                reliable source.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">6. Build Periodic Financial Models</strong>
                <br />
                Develop financial models that forecast performance throughout
                the reporting period.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">7. Generate Business Unit Insights</strong>
                <br />
                Evaluate each business unit individually to identify risks,
                opportunities, and location-specific recommendations.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">8. Develop Action Plans</strong>
                <br />
                Convert insights into measurable action items assigned to the
                appropriate teams.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">9. Build and Publish Predictive Dashboards</strong>
                <br />
                Deliver customized dashboards that show where results are
                heading, highlight emerging risks and opportunities, and
                identify actions to take before the reporting period ends.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                <strong className="text-text-primary">10. Conduct Weekly Performance Reviews</strong>
                <br />
                Meet with leadership and operating managers to review results,
                discuss action items, gather feedback, and continuously improve
                forecasting accuracy.
              </Text>
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
              How We&rsquo;re Different
            </Heading>
            <ul className="max-w-[72ch] list-disc space-y-[var(--space-md)] pl-[var(--space-lg)] text-left text-text-secondary">
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We don&apos;t replace your existing systems&mdash;we integrate
                  them.
                </Text>
              </li>
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We build customized dashboards tailored to your business.
                </Text>
              </li>
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We combine AI with experienced financial professionals.
                </Text>
              </li>
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We provide actionable recommendations, not just reports.
                </Text>
              </li>
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We help leaders make better decisions before month-end.
                </Text>
              </li>
              <li>
                <Text size="body-lg" className="text-text-secondary">
                  We continuously improve forecasting accuracy through real
                  business feedback.
                </Text>
              </li>
            </ul>
          </Stack>
        </Container>
      </Section>

    </>
  );
}
