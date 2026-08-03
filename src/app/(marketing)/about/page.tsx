import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import aboutIfaImage from "../../../../about-ifa-predictive-insights.png";

export const metadata: Metadata = {
  title: "Why We Exist",
  description:
    "Why Insightful Financial Analytics exists: helping business leaders gain clarity, confidence, and stronger decisions without the stress of financial uncertainty.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Why We Exist · Insightful Financial Analytics",
    description:
      "Helping organizations maximize the value of their resources and create lasting value for the people and communities they serve.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Section variant="transitional">
        <Container width="default">
          <Stack gap="xl" className="mx-auto max-w-[72ch]">
            {/* Visually hidden: the page title is removed from view per design,
                but kept for the document outline, SEO, and screen readers. */}
            <Heading level={1} size="display-md" className="sr-only">
              Why We Exist
            </Heading>

            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Vision
              </Heading>
              <Text size="body-lg" className="text-text-secondary max-w-[64ch]">
                To help organizations maximize the value of their resources so
                they can create lasting value for their employees, customers,
                stakeholders, and the communities they serve.
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
              <Text size="body-lg" className="text-text-secondary max-w-[64ch]">
                To give every business leader the clarity and confidence to make
                better decisions without the stress of financial uncertainty.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Grid variant="grid-2" className="items-start gap-[var(--space-2xl)]">
            <Stack gap="md">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Text
                  as="span"
                  size="body-sm"
                  className="text-signal-focus font-semibold uppercase"
                >
                  Why We Exist
                </Text>
                <span className="h-px w-16 bg-signal-focus" />
              </div>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Stop Reacting to the Past.
                <br />
                Start Controlling the Future.
              </Heading>
              <ul className="max-w-[72ch] space-y-[var(--space-md)] text-left text-text-secondary">
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">⏳</span>
                  <Text size="body-lg" className="text-text-secondary">
                    Most businesses only understand their financial performance
                    after the reporting period has ended&mdash;when the
                    opportunity to influence the outcome has already passed.
                  </Text>
                </li>
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">🎯</span>
                  <Text size="body-lg" className="text-text-secondary">
                    That&rsquo;s where{" "}
                    <strong className="text-signal-focus font-semibold">
                      IFA
                    </strong>{" "}
                    is different.
                  </Text>
                </li>
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">📊</span>
                  <Text size="body-lg" className="text-text-secondary">
                    We help business leaders understand where their business is
                    heading before month-end by combining financial and
                    operational data, customized dashboards, AI-assisted
                    analysis, and experienced financial professionals.
                  </Text>
                </li>
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">🤝</span>
                  <Text size="body-lg" className="text-text-secondary">
                    We work collaboratively with your internal finance team and
                    trusted accounting firms to build on a strong financial
                    foundation. Where additional accounting expertise is needed,
                    our network of trusted accounting partners can provide the
                    support required to ensure reliable financial information and
                    stronger business decisions.
                  </Text>
                </li>
              </ul>
            </Stack>

            <Image
              src={aboutIfaImage}
              alt="Predictive insights dashboard showing forecasts, risk alerts, and recommended actions"
              className="h-auto w-full rounded-md shadow-medium lg:mt-[var(--space-3xl)]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Grid>
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
                  🏗️ Establish a Strong Financial Foundation
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Create accurate accounting, reliable financial information,
                  and data you can trust.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  🔮 Predict What&rsquo;s Next
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Use customized dashboards and AI-assisted analysis to identify
                  risks and opportunities before month-end.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  📈 Improve Business Performance
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Turn financial insights into practical actions that improve
                  profitability, cash flow, and operational performance.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  🏆 Make Better Business Decisions
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Give leadership the confidence to make faster, smarter
                  decisions based on reliable financial and operational
                  information.
                </Text>
              </Stack>
            </Grid>
            <Stack gap="sm">
              <Text size="body-lg" className="text-text-primary font-semibold">
                🛠️ No System Replacement. No Operational Disruption.
              </Text>
              <Text size="body-lg" className="text-text-primary font-semibold">
                💡 We work with your existing systems to deliver stronger
                accounting, customized dashboards, and better business
                decisions.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
