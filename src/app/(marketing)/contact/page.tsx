import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/cta/cta-group";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a calm, low-pressure conversation about operational visibility, forecasting, and where operational and financial risk may be forming.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact · Insightful Financial Analytics",
    description:
      "A calm, low-pressure conversation about operational visibility and earlier financial risk awareness.",
    type: "website",
  },
};

// Contact inbox set to connect@ (DEC-070; resolves the DEC-039 hello@ placeholder).
const CONTACT_EMAIL = "connect@insightfulfa.com";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Operational visibility: a conversation",
)}`;

const TOPICS = [
  "Where operational signals may already exist",
  "How earlier forecasting could surface emerging risk",
  "Where hidden margin pressure tends to form",
];

export default function ContactPage() {
  return (
    <>
      <Section variant="hero">
        <Container width="narrow">
          <Stack gap="lg">
            <EyebrowLabel>Contact</EyebrowLabel>
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              When do you usually find out you&rsquo;ve missed your numbers?
            </Heading>
            <Text size="body-lg" className="text-text-primary font-medium">
              And how much time does that leave you to act on it?
            </Text>
            <Text size="body-lg" className="text-text-secondary">
              We help organizations create earlier visibility into operational
              and financial risk. There is no funnel here and nothing to sign up
              for, just a thoughtful conversation about what your operations may
              already be signaling.
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="narrow">
          <Reveal>
            <Stack gap="xl">
              <Stack gap="md">
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  What a conversation looks like.
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  Tell us a little about your business, and we&rsquo;ll explore
                  where hidden operational signals may already exist. Early
                  conversations are exploratory and unhurried, a chance to think
                  together about what earlier visibility could look like.
                </Text>
              </Stack>

              <ul className="flex flex-col">
                {TOPICS.map((topic) => (
                  <li
                    key={topic}
                    className="border-border-subtle border-t py-[var(--space-sm)] first:border-t-0 first:pt-0"
                  >
                    <Text
                      as="span"
                      size="body-md"
                      className="text-text-secondary"
                    >
                      {topic}
                    </Text>
                  </li>
                ))}
              </ul>

              <Stack gap="sm">
                <CTAGroup>
                  <Button href={MAILTO}>Book a consultation</Button>
                  <Button variant="secondary" href="/framework">
                    Explore the framework
                  </Button>
                </CTAGroup>
                <Stack gap="2xs">
                  <Text size="body-sm" className="text-text-secondary">
                    Prefer email? Reach us directly at
                  </Text>
                  <Button variant="text" href={MAILTO} className="self-start">
                    {CONTACT_EMAIL}
                  </Button>
                </Stack>
                <Text size="body-sm" className="text-text-secondary">
                  We typically reply within one business day. No pressure, no
                  funnel.
                </Text>
              </Stack>
            </Stack>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
