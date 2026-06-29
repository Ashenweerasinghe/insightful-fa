import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

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

const PILLARS = [
  {
    title: "Earlier visibility",
    description:
      "We focus on surfacing operational and financial risk before it becomes obvious, while there is still room to respond.",
  },
  {
    title: "Operational intelligence",
    description:
      "We work to understand the operational systems behind financial performance, not just the results they eventually report.",
  },
  {
    title: "Calm strategic clarity",
    description:
      "We help organizations move from reactive to proactive, with structured visibility rather than more noise.",
  },
  {
    title: "Human-centered sophistication",
    description:
      "We use intelligent systems in service of human judgment: thoughtful, responsible, and never hype-driven.",
  },
] as const;

const PRINCIPLES = [
  "We start by listening, then map before we measure.",
  "We favor clarity over noise, and signals over dashboards.",
  "We treat visibility as an ongoing practice, not a one-time report.",
];

export default function AboutPage() {
  return (
    <>
      <Section variant="hero">
        <Container width="default">
          <Stack gap="lg">
            <EyebrowLabel>About</EyebrowLabel>
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              Clarity comes from seeing how a business actually works.
            </Heading>
            <Text size="body-lg" className="text-text-primary font-medium">
              Stop reacting to the past. Start controlling the future.
            </Text>
            <Text size="body-lg" className="text-text-secondary">
              Insightful Financial Analytics is built on a simple conviction:
              financial performance is the visible result of operational
              systems. When those systems are easier to see, decisions become
              calmer, earlier, and better informed.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Reveal>
            <Grid variant="editorial-asymmetry">
              <EyebrowLabel>Perspective</EyebrowLabel>
              <Stack gap="md">
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  We think in systems, not snapshots.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  A financial statement is a snapshot, a single frame of a
                  system that is always moving. We pay attention to the
                  movement: the operational complexity, the relationships
                  between teams and workflows, and the leading indicators that
                  shape outcomes long before they are reported.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  Bridging operations and finance is rarely about more data. It
                  is about seeing the right signals, in relation to one another,
                  early enough to matter.
                </Text>
              </Stack>
            </Grid>
          </Reveal>
        </Container>
      </Section>

      <Section
        variant="editorial"
        className="border-border-subtle bg-background-secondary border-t"
      >
        <Container width="default">
          <Stack gap="2xl">
            <Reveal>
              <Stack gap="md">
                <EyebrowLabel>What guides the work</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Four commitments behind every engagement.
                </Heading>
              </Stack>
            </Reveal>
            <Reveal delay={0.08}>
              <Grid variant="grid-2">
                {PILLARS.map((pillar) => (
                  <Stack
                    key={pillar.title}
                    gap="xs"
                    className="border-border-subtle border-t pt-[var(--space-lg)]"
                  >
                    <Heading level={3} size="heading-md">
                      {pillar.title}
                    </Heading>
                    <Text size="body-md" className="text-text-secondary">
                      {pillar.description}
                    </Text>
                  </Stack>
                ))}
              </Grid>
            </Reveal>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Reveal>
            <Grid variant="editorial-asymmetry">
              <EyebrowLabel>Experience</EyebrowLabel>
              <Stack gap="md">
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Grounded in how operations actually run.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  Our perspective comes from close work with the operational and
                  financial systems that run real businesses: the workflows,
                  hand-offs, and data that rarely appear in a single report.
                  That grounding is what lets us connect operational reality to
                  financial outcomes, rather than treating them as separate
                  conversations.
                </Text>
              </Stack>
            </Grid>
          </Reveal>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="narrow">
          <Reveal>
            <Stack gap="lg">
              <Stack gap="md">
                <EyebrowLabel>Working style</EyebrowLabel>
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Calm, consultative, and close to the work.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  We work as a thoughtful partner rather than a vendor:
                  measured, observant, and steady. The aim is durable clarity,
                  not a flurry of activity.
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  We work inside the systems you already use: no
                  rip-and-replace, no disruption to how your team operates.
                </Text>
              </Stack>
              <ul className="flex flex-col">
                {PRINCIPLES.map((principle) => (
                  <li
                    key={principle}
                    className="border-border-subtle border-t py-[var(--space-sm)] first:border-t-0 first:pt-0"
                  >
                    <Text
                      as="span"
                      size="body-md"
                      className="text-text-secondary"
                    >
                      {principle}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
