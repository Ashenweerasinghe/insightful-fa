import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { FrameworkCard } from "@/components/cards/framework-card";
import { ForecastLine } from "@/components/data-viz/forecast-line";
import { SignalTimeline } from "@/components/data-viz/signal-timeline";
import { QuoteBlock } from "@/components/quote/quote-block";

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
    title: "Observe",
    description:
      "Identify operational signals and hidden variability across the systems, workflows, and teams where performance is actually shaped.",
    inPractice: "Clean and standardize the data the whole view depends on.",
  },
  {
    step: 2,
    title: "Connect",
    description:
      "Map the relationships between operational activity and the financial outcomes it eventually produces.",
    inPractice:
      "Map how work flows across teams: ownership, margin accountability, hand-offs.",
  },
  {
    step: 3,
    title: "Forecast",
    description:
      "Detect emerging pressure areas and leading indicators before they compound into financial impact.",
    inPractice:
      "Build dashboards with leading indicators, margin and cash-flow signals, early risk alerts.",
  },
  {
    step: 4,
    title: "Respond",
    description:
      "Create calmer, more informed operational decisions, earlier in the timeline, while there is still room to act.",
    inPractice:
      "Track results against expectations and adapt as reality comes in.",
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
                size="display-lg"
                className="text-display-md lg:text-display-lg"
              >
                Financial outcomes are downstream reflections of operational
                systems.
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                Most reporting explains results after they have already formed.
                We work earlier, with the operational signals, patterns, and
                variability that shape financial outcomes long before they
                surface in the numbers.
              </Text>
            </Stack>
            <ForecastLine variant="detailed" />
          </Grid>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="2xl">
            <Reveal>
              <Stack gap="md">
                <EyebrowLabel>How it works</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  A system for seeing operational risk earlier.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  The IFA Predictive Control Framework™ is less a methodology
                  than a way of looking. It moves attention upstream, from
                  financial results to the operational conditions that produce
                  them, in four connected movements.
                </Text>
              </Stack>
            </Reveal>
            <Reveal delay={0.08}>
              <ol className="flex flex-col">
                {STEPS.map((item) => (
                  <FrameworkCard
                    key={item.step}
                    step={item.step}
                    title={item.title}
                    description={item.description}
                    inPractice={item.inPractice}
                  />
                ))}
              </ol>
            </Reveal>
          </Stack>
        </Container>
      </Section>

      <Section
        variant="editorial"
        className="border-border-subtle bg-background-secondary border-t"
      >
        <Container width="default">
          <Grid variant="grid-2" className="items-center">
            <Reveal>
              <Stack gap="md">
                <EyebrowLabel>Why reporting reacts</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Complex systems rarely fail all at once.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  Operational issues usually develop gradually, across
                  disconnected systems, workflows, and teams, long before their
                  financial impact becomes obvious. Traditional reporting
                  explains those outcomes after they occur. The earlier signals
                  usually exist; most organizations simply lack visibility into
                  them.
                </Text>
              </Stack>
            </Reveal>
            <Reveal delay={0.08}>
              <Stack gap="sm">
                <SignalTimeline variant="detailed" />
                <Text size="body-sm" className="text-text-secondary">
                  Lead time is the gap between an early operational signal and
                  its later financial impact: the window earlier visibility
                  opens.
                </Text>
              </Stack>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="narrow">
          <Reveal>
            <Stack gap="lg">
              <EyebrowLabel>Our perspective</EyebrowLabel>
              <QuoteBlock quote="Operational visibility requires understanding how businesses actually work, not just what the numbers report." />
            </Stack>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
