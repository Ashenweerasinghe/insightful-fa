import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import dashboard1Image from "../../../../dashboard1.png";
import aboutBeginningImage from "../../../../about begining.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "The philosophy behind Insightful Financial Analytics: systems thinking, earlier operational visibility, and calm strategic clarity over reactive reporting.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About · Insightful Financial Analytics",
    description:
      "Why we believe clarity comes from seeing how a business actually works: systems thinking over reactive reporting.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Section variant="hero" className="py-[var(--section-space-md)]">
        <Container width="default">
          <Stack gap="xl">
            <Stack gap="sm">
              <EyebrowLabel>About</EyebrowLabel>
              <Heading
                level={1}
                size="heading-xl"
                className="whitespace-nowrap text-heading-lg lg:text-heading-xl"
              >
                Stop Reacting to the Past. Start Controlling the Future
              </Heading>
            </Stack>

            <Grid variant="editorial-asymmetry" className="items-start gap-[var(--space-2xl)]">
              <div className="max-w-[64ch] space-y-[var(--space-md)] text-left">
                <Text size="body-lg" className="text-text-secondary">
                  At the end of the day, every business aims to increase
                  profitability—but most only receive their financial
                  information at the end of the period, when it&rsquo;s too late
                  to act. That&rsquo;s where we come in.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  We give businesses clear visibility into where they are
                  heading before the period ends. We combine AI with human
                  financial expertise to deliver customized, actionable
                  insights, so leaders can correct courses before it&rsquo;s too
                  late.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  All of this is done using your existing systems—with no
                  disruption to your current operations.
                </Text>
              </div>

              <Image
                src={dashboard1Image}
                alt="Dashboard view showing financial visibility and operational signals"
                className="h-auto w-full lg:mt-[var(--space-3xl)]"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </Grid>
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
              src={aboutBeginningImage}
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
