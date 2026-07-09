import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { ContactForm } from "@/components/contact/contact-form";

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

export default function ContactPage() {
  return (
    <>
      <Section variant="hero">
        <Container width="wide">
          <Stack gap="xl">
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              Contact
            </Heading>
            <Grid variant="grid-2" className="items-start gap-[var(--space-2xl)]">
              <Stack gap="lg">
                <Heading
                  level={2}
                  size="heading-xl"
                  className="text-heading-lg lg:text-heading-xl"
                >
                  Let&rsquo;s Start with Two Quick Questions
                </Heading>
                <Text size="body-lg" className="text-text-secondary">
                  When do you usually find out that you&rsquo;ve missed your
                  projections?
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  And when you do, how much time do you have left to
                  course-correct?
                </Text>
                <Text size="body-lg" className="text-text-secondary">
                  We help you spot issues earlier and turn your financials into
                  a real-time navigation tool for smarter, faster decisions.
                </Text>
                <Heading
                  level={3}
                  size="heading-md"
                  className="text-heading-md"
                >
                  Get Your Free Predictive Finance Blueprint
                </Heading>
                <ul className="list-disc space-y-[var(--space-xs)] pl-[var(--space-lg)] text-text-secondary">
                  <li>Fix messy data</li>
                  <li>Track performance as it happens</li>
                  <li>Know where you&rsquo;ll land before month-end</li>
                </ul>
              </Stack>

              <Stack gap="md" className="border-border-subtle border-t pt-[var(--space-lg)] md:border-t-0 md:border-l md:pl-[var(--space-2xl)] md:pt-0">
                <ContactForm />
              </Stack>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
