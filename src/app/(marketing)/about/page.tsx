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
      <Section variant="transitional">
        <Container width="default">
          <Stack gap="xl" className="max-w-[72ch]">
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
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Grid variant="grid-2" className="items-start gap-[var(--space-2xl)]">
            <Stack gap="md">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Text as="span" size="body-sm" className="text-signal-focus font-semibold uppercase">
                  About IFA
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
                    Most businesses only see the full financial picture after
                    the period ends &mdash; when the opportunity to act has
                    already passed.
                  </Text>
                </li>
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">🎯</span>
                  <Text size="body-lg" className="text-text-secondary">
                    That&rsquo;s where{" "}
                    <strong className="text-signal-focus font-semibold">
                      IFA
                    </strong>{" "}
                    changes the game.
                  </Text>
                </li>
                <li className="flex gap-[var(--space-sm)]">
                  <span className="mt-1 shrink-0 text-signal-focus">📊</span>
                  <Text size="body-lg" className="text-text-secondary">
                    We give business leaders clear visibility into where the
                    company is heading before month-end. Using deep financial
                    analytics expertise, supported by AI, we create customized
                    dashboards that turn existing data into clear, actionable
                    insights &mdash; helping leaders correct course before
                    it&rsquo;s too late.
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
                  🔮 Anticipate What&rsquo;s Next
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  See where results are heading with predictive forecasting and
                  scenario analysis.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  🧭 Align Your Strategy
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Connect financial insights to operational drivers and
                  business priorities.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  📈 Optimize Performance
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Identify risks and opportunities early and take action that
                  drives improvement.
                </Text>
              </Stack>
              <Stack gap="sm">
                <Text size="body-lg" className="text-text-primary font-semibold">
                  🏆 Outperform the Competition
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Make faster, smarter decisions that create a lasting
                  competitive advantage.
                </Text>
              </Stack>
            </Grid>
            <Stack gap="sm">
              <Text size="body-lg" className="text-text-primary font-semibold">
                🛠️ No System Replacement. No Operational Disruption.
              </Text>
              <Text size="body-lg" className="text-text-primary font-semibold">
                💡 Just earlier visibility, better decisions, and stronger
                financial control.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
