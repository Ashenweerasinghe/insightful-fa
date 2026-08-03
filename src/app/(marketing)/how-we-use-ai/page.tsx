import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export const metadata: Metadata = {
  title: "How We Use AI",
  description:
    "AI is a powerful tool — but not the decision-maker. IFA pairs AI-assisted analysis with experienced financial professionals to turn data into meaningful business recommendations.",
  alternates: {
    canonical: "/how-we-use-ai",
  },
  openGraph: {
    title: "How We Use AI · Insightful Financial Analytics",
    description:
      "The best of both worlds: AI-assisted analysis combined with human financial expertise for better business decisions.",
    type: "website",
  },
};

/** Paired capabilities — AI handles scale and pattern detection; experienced
 *  financial professionals apply judgment and context. Rendered as two
 *  parallel columns. */
const AI_ASSISTED = [
  "Organizes large volumes of data",
  "Identifies patterns and trends",
  "Detects risks and anomalies",
  "Connects financial and operational data",
  "Accelerates analysis",
  "Supports better decision-making",
] as const;

const FINANCIAL_EXPERTISE = [
  "Applies business judgment",
  "Understands business context",
  "Prioritizes what matters most",
  "Recommends practical actions",
  "Validates every recommendation",
  "Delivers meaningful business insight",
] as const;

export default function HowWeUseAiPage() {
  return (
    <>
      <Section variant="transitional">
        <Container width="default">
          <Stack gap="xl" className="mx-auto max-w-[72ch]">
            <Heading
              level={1}
              size="display-md"
              className="text-heading-xl lg:text-display-md"
            >
              The Best of Both Worlds
            </Heading>

            <Stack gap="md">
              <Text size="body-lg" className="text-text-secondary">
                AI is a powerful tool&mdash;but it is not the decision-maker.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                At IFA, we use AI to process and organize large volumes of
                financial and operational data, helping us identify patterns,
                risks, and opportunities more efficiently.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                Our experienced financial professionals then apply industry
                knowledge, business judgment, and practical experience to
                transform those insights into meaningful recommendations that
                support better business decisions.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Grid variant="grid-2" className="items-start gap-[var(--space-2xl)]">
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-lg"
                className="text-heading-md lg:text-heading-lg"
              >
                AI-Assisted Analysis
              </Heading>
              <ul className="space-y-[var(--space-sm)]">
                {AI_ASSISTED.map((item) => (
                  <li key={item} className="flex gap-[var(--space-sm)]">
                    <span
                      aria-hidden="true"
                      className="text-signal-focus mt-1 shrink-0"
                    >
                      &#9679;
                    </span>
                    <Text size="body-lg" className="text-text-secondary">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>

            <Stack gap="md">
              <Heading
                level={2}
                size="heading-lg"
                className="text-heading-md lg:text-heading-lg"
              >
                Financial Expertise
              </Heading>
              <ul className="space-y-[var(--space-sm)]">
                {FINANCIAL_EXPERTISE.map((item) => (
                  <li key={item} className="flex gap-[var(--space-sm)]">
                    <span
                      aria-hidden="true"
                      className="text-signal-focus mt-1 shrink-0"
                    >
                      &#9679;
                    </span>
                    <Text size="body-lg" className="text-text-secondary">
                      {item}
                    </Text>
                  </li>
                ))}
              </ul>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="xl" className="mx-auto max-w-[72ch] text-center">
            <div className="flex items-center justify-center gap-[var(--space-sm)]">
              <Text
                as="span"
                size="body-sm"
                className="text-signal-focus font-semibold uppercase"
              >
                The Result
              </Text>
            </div>

            <Stack gap="sm">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Customized Dashboards
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                Know where your business is heading before month-end.
              </Text>
            </Stack>

            <span
              aria-hidden="true"
              className="text-signal-focus mx-auto text-heading-lg"
            >
              &darr;
            </span>

            <Stack gap="sm">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Better Business Decisions
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                Earlier visibility. Greater financial control. More confident
                leadership.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
