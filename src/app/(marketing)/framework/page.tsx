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
import predictiveInsightsImage from "../../../../predictive-insights-actionable-results.png";
import aboutOffersImage from "../../../../about-offers.png";

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
            <div className="max-w-[72ch] space-y-[var(--space-md)] text-left text-text-secondary">
              <Text size="body-lg" className="text-text-secondary">
                We don&apos;t replace your existing systems&mdash;we integrate
                them.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                We build customized dashboards tailored to your business.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                We combine AI with experienced financial professionals.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                We provide actionable recommendations, not just reports.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                We help leaders make better decisions before month-end.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                We continuously improve forecasting accuracy through real
                business feedback.
              </Text>
            </div>
          </Stack>
        </Container>
      </Section>

      <Section variant="transitional">
        <Container width="default">
          <Grid variant="grid-2" className="items-start">
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Vision
              </Heading>
              <Text size="body-lg" className="text-text-secondary max-w-[64ch]">
                To give organizations the clarity and control to see financial
                outcomes earlier, act with confidence, and shape a stronger
                future.
              </Text>
            </Stack>

            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Mission
              </Heading>
              <div className="max-w-[64ch]">
                <Text size="body-lg" className="text-text-secondary">
                  We transform complex financial and operational data into
                  clear, forward-looking intelligence that helps leaders:
                </Text>
                <ul className="mt-[var(--space-sm)] list-disc space-y-[var(--space-xs)] pl-[var(--space-md)] text-text-secondary">
                  <li>Detect risks before they become problems</li>
                  <li>Take action before performance falls behind</li>
                  <li>Allocate capital with greater confidence</li>
                  <li>Protect margins, profitability, and cash flow</li>
                  <li>Make faster, smarter business decisions</li>
                </ul>
              </div>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Section variant="hero" className="py-[var(--section-space-md)]">
        <Container width="default">
          <Stack gap="xl">
            <Stack gap="sm">
              <EyebrowLabel>About</EyebrowLabel>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Stop Reacting to the Past.
                <br />
                Start Controlling the Future.
              </Heading>
            </Stack>

            <Grid variant="editorial-asymmetry" className="items-start gap-[var(--space-2xl)]">
              <div className="max-w-[64ch] space-y-[var(--space-md)] text-left">
                <Text size="body-lg" className="text-text-secondary">
                  Most businesses only see the full financial picture after the
                  period ends &mdash; when the opportunity to act has already
                  passed.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  That&rsquo;s where{" "}
                  <strong className="text-signal-success font-semibold">
                    IFA
                  </strong>{" "}
                  changes the game.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  We give business leaders clear visibility into where the
                  company is heading before month-end. Using deep financial
                  analytics expertise, supported by AI, we create customized
                  dashboards that turn existing data into clear, actionable
                  insights &mdash; helping leaders correct course before
                  it&rsquo;s too late.
                </Text>
              </div>

              <Image
                src={predictiveInsightsImage}
                alt="Dashboard view showing financial visibility and operational signals"
                className="h-auto w-full lg:mt-[var(--space-3xl)]"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="lg">
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              What Our Approach Delivers
            </Heading>
            <Grid variant="grid-2" className="items-start gap-[var(--space-xl)]">
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  Anticipate What&rsquo;s Next
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  See where results are heading with predictive forecasting and
                  scenario analysis.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  Align Your Strategy
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Connect financial insights to operational drivers and
                  business priorities.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  Optimize Performance
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Identify risks and opportunities early and take action that
                  drives improvement.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  Outperform the Competition
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Make faster, smarter decisions that create a lasting
                  competitive advantage.
                </Text>
              </Stack>
            </Grid>
            <Stack gap="sm">
              <Text size="body-lg" className="text-text-primary font-semibold">
                No System Replacement. No Operational Disruption.
              </Text>
              <Text size="body-lg" className="text-text-primary font-semibold">
                Just earlier visibility, better decisions, and stronger
                financial control.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section variant="transitional">
        <Container width="default">
          <Grid variant="grid-2" className="items-start">
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Vision
              </Heading>
              <Text size="body-lg" className="text-text-secondary max-w-[64ch]">
                To help organizations operate with clarity and control by
                predicting financial outcomes early and enabling confident,
                data-driven decisions.
              </Text>
            </Stack>

            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Mission
              </Heading>
              <div className="max-w-[64ch]">
                <Text size="body-lg" className="text-text-secondary">
                  We simplify, structure, and integrate finance so leaders can:
                </Text>
                <ul className="mt-[var(--space-sm)] list-disc space-y-[var(--space-xs)] pl-[var(--space-md)] text-text-secondary">
                  <li>Detect risks early</li>
                  <li>Act before issues escalate</li>
                  <li>Allocate capital with confidence</li>
                  <li>Protect margins and cash flow</li>
                  <li>Make forward-looking business decisions</li>
                </ul>
              </div>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Grid variant="grid-2" className="items-start gap-[var(--space-2xl)]">
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                What Our Company Offers
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
                  <strong className="text-text-primary">9. Build and Publish Dashboards</strong>
                  <br />
                  Deliver customized dashboards that provide real-time visibility
                  into financial and operational performance.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  <strong className="text-text-primary">10. Weekly Performance Reviews</strong>
                  <br />
                  Meet with leadership and operating managers to review results,
                  discuss action items, gather feedback, and continuously improve
                  forecasting accuracy.
                </Text>
              </div>
            </Stack>

            <Image
              src={aboutOffersImage}
              alt="Illustration representing the start of the financial visibility engagement"
              className="sticky top-[var(--space-2xl)] h-auto w-full"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Grid>
        </Container>
      </Section>
    </>
  );
}
