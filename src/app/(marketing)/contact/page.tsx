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
      <Section variant="hero" className="relative overflow-hidden py-[var(--section-space-md)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_12%_100%,rgba(184,121,55,0.12),transparent_28%),linear-gradient(180deg,transparent,rgba(184,121,55,0.08))]"
        />
        <Container width="wide">
          <Grid
            variant="grid-2"
            className="relative items-start gap-[var(--space-3xl)] lg:grid-cols-[0.95fr_1.05fr]"
          >
            <Stack gap="lg" className="max-w-[46rem]">
              <Stack gap="sm">
                <Heading
                  level={1}
                  size="display-md"
                  className="text-heading-xl lg:text-display-md"
                >
                  Contact
                </Heading>
                <span className="block h-px w-16 bg-signal-focus" />
                <Heading
                  level={2}
                  size="heading-xl"
                  className="max-w-[12ch] text-heading-md lg:text-heading-lg"
                >
                  Let&rsquo;s Start with Two Quick Questions
                </Heading>
              </Stack>

              <Stack gap="md">
                <div className="flex items-start gap-[var(--space-md)]">
                  <span className="border-signal-focus/40 text-signal-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background-secondary">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <Text size="body-sm" className="max-w-[38ch] text-text-primary">
                    When do you usually find out that you&rsquo;ve missed your
                    projections?
                  </Text>
                </div>
                <div className="flex items-start gap-[var(--space-md)]">
                  <span className="border-signal-focus/40 text-signal-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background-secondary">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    >
                      <rect x="5" y="5" width="14" height="14" rx="2" />
                      <path d="M8 3v4M16 3v4M5 10h14" />
                    </svg>
                  </span>
                  <Text size="body-sm" className="max-w-[38ch] text-text-primary">
                    And when you do, how much time do you have left to
                    course-correct?
                  </Text>
                </div>
              </Stack>

              <Text size="body-sm" className="max-w-[56ch] text-text-secondary">
                We help you spot issues earlier and turn your financials into a
                real-time navigation tool for smarter, faster decisions.
              </Text>

              <Stack
                gap="sm"
                className="border-signal-focus/40 bg-background-elevated max-w-[38rem] rounded-md border p-[var(--space-lg)] shadow-soft"
              >
                <Heading level={3} size="heading-md" className="text-body-lg">
                  Get Your Free Predictive Finance Blueprint
                </Heading>
                <ul className="space-y-[var(--space-xs)] text-body-sm text-text-secondary">
                  <li className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-signal-focus inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-focus/50">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="m4 8 2.5 2.5L12 5" />
                      </svg>
                    </span>
                    Fix messy data
                  </li>
                  <li className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-signal-focus inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-focus/50">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="m4 8 2.5 2.5L12 5" />
                      </svg>
                    </span>
                    Track performance as it happens
                  </li>
                  <li className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-signal-focus inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-signal-focus/50">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="m4 8 2.5 2.5L12 5" />
                      </svg>
                    </span>
                    Know where you&rsquo;ll land before month-end
                  </li>
                </ul>
              </Stack>

              <div
                aria-hidden="true"
                className="hidden h-16 w-full max-w-[38rem] items-end gap-2 opacity-30 md:flex"
              >
                {[18, 28, 40, 56, 72].map((height) => (
                  <span
                    key={height}
                    className="block w-3 rounded-t-sm bg-signal-focus/50"
                    style={{ height }}
                  />
                ))}
              </div>
            </Stack>

            <ContactForm />
          </Grid>
        </Container>
      </Section>
    </>
  );
}
