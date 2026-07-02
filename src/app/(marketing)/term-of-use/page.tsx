import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export const metadata: Metadata = {
  title: "Term of use",
  description:
    "Terms & Conditions and Privacy Policy for Insightful Financial Analytics.",
  alternates: {
    canonical: "/term-of-use",
  },
};

interface TermSection {
  title: string;
  body: readonly string[];
  bullets?: readonly string[];
  extraTitle?: string;
  extraBullets?: readonly string[];
  bodyTail?: string | readonly string[];
}

const termsSections: readonly TermSection[] = [
  {
    title: "1. Use of Our Website",
    body: [
      "You agree to use this website for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit the use of this site by any third party.",
    ],
  },
  {
    title: "2. Services",
    body: [
      "Insightful FA provides information, analytics, consultations, and related services as described on our website and landing pages.",
      "All services are subject to availability and may be modified, updated, or discontinued at any time without prior notice.",
    ],
  },
  {
    title: "3. Information Accuracy",
    body: [
      "While we strive to ensure that all information on this website is accurate and up to date, we make no warranties or representations regarding the completeness, accuracy, or reliability of any content.",
    ],
  },
  {
    title: "4. User Submissions",
    body: [
      "By submitting your information through our forms (including name, email address, and phone number), you confirm that:",
    ],
    bullets: [
      "The information you provide is accurate and truthful",
      "You are authorized to provide such information",
    ],
  },
  {
    title: "5. Email & SMS Communications (IMPORTANT)",
    body: [
      "By submitting a form on our website or funnel, you consent to receive email and SMS communications from Insightful FA related to:",
    ],
    bullets: ["Services", "Appointments", "Updates", "Follow-ups"],
    extraTitle: "Additional terms:",
    extraBullets: [
      "Message and data rates may apply",
      "Message frequency may vary",
      "You may opt out of SMS at any time by replying STOP",
      "For assistance, reply HELP or contact us directly",
    ],
    bodyTail:
      "We do not sell or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "6. Privacy",
    body: [
      "Your use of this website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
    ],
  },
  {
    title: "7. Intellectual Property",
    body: [
      "All content on this website, including but not limited to text, graphics, logos, systems, frameworks, dashboards, and designs, is the property of Insightful FA unless otherwise stated.",
      "This content may not be reproduced, distributed, modified, or used without prior written permission.",
    ],
  },
  {
    title: "8. Limitation of Liability & No Professional Advice",
    body: [
      "Insightful FA provides data analysis, financial insights, predictive analytics, and operational guidance for informational and business support purposes only.",
      "Nothing provided through our website, communications, dashboards, or consultations constitutes legal, tax, investment, or other regulated professional advice.",
      "All decisions made based on our services, insights, or recommendations are the sole responsibility of the user or client.",
      "To the fullest extent permitted by law, Insightful FA disclaims all liability for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with:",
    ],
    bullets: [
      "Your use of our website or services",
      "Reliance on any information, insights, or recommendations provided",
      "Any business, financial, or operational decisions made based on our outputs",
    ],
    bodyTail: [
      "We make no guarantees regarding specific outcomes, results, or performance improvements.",
      "Insightful FA shall not be held responsible for any losses, damages, or adverse outcomes resulting from actions taken or not taken based on our services.",
    ],
  },
  {
    title: "9. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party sites.",
    ],
  },
  {
    title: "10. Changes to These Terms",
    body: [
      "We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page.",
    ],
  },
  {
    title: "11. Contact Us",
    body: [
      "If you have any questions about these Terms & Conditions, you may contact us at:",
      "Email: Connect@insightfulfa.com",
      "Website: https://insightfulfa.com",
    ],
  },
];

const privacySections: readonly TermSection[] = [
  {
    title: "1. How We Use Your Information",
    body: ["We use your information to:"],
    bullets: [
      "Send appointment confirmations",
      "Send appointment reminders",
      "Follow up regarding appointments (rescheduling, updates, feedback)",
      "Provide information about our services",
      "Improve our services and user experience",
    ],
  },
  {
    title: "2. Communication Consent",
    body: [
      "By providing your contact information, you consent to receiving email and SMS communications as described in our Terms & Conditions.",
      "You may opt out at any time:",
    ],
    bullets: ["SMS: Reply STOP", "Email: Use the unsubscribe link or contact us directly"],
  },
  {
    title: "3. Data Protection",
    body: [
      "We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "4. Sharing of Information",
    body: [
      "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      "We may only share information if required by law or to protect our legal rights.",
    ],
  },
  {
    title: "5. Limitation of Responsibility",
    body: [
      "While we take appropriate steps to protect your information, Insightful FA is not responsible for unauthorized access, data breaches, or external security failures beyond our control.",
    ],
  },
  {
    title: "6. Updates to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Updates will be posted on this page with the effective date.",
    ],
  },
  {
    title: "7. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy, you may contact us at:",
      "Email: Connect@insightfulfa.com",
      "Website: https://insightfulfa.com",
    ],
  },
];

function renderParagraphs(lines: readonly string[]) {
  return lines.map((line) => (
    <Text key={line} size="body-md" className="text-text-secondary">
      {line}
    </Text>
  ));
}

function renderBullets(items: readonly string[]) {
  return (
    <ul className="list-disc space-y-[var(--space-xs)] pl-[var(--space-lg)] text-text-secondary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function TermOfUsePage() {
  return (
    <Section variant="hero">
      <Container width="default">
        <Stack gap="2xl">
          <Stack gap="sm">
            <Heading level={1} size="display-lg" className="text-display-md lg:text-display-lg">
              Terms &amp; Conditions
            </Heading>
            <Text size="body-sm" className="text-text-secondary">
              Effective Date: April 2026
            </Text>
            <Text size="body-md" className="text-text-secondary">
              Welcome to Insightful Financial Analytics (&ldquo;Insightful FA,&rdquo;
              &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). By accessing or using our website
              (https://insightfulfa.com), submitting forms, or using our services,
              you agree to comply with and be bound by the following Terms &amp;
              Conditions. Please read them carefully.
            </Text>
          </Stack>

          <Stack gap="xl">
            {termsSections.map((section) => (
              <Stack key={section.title} gap="sm">
                <Heading level={2} size="heading-xl" className="text-heading-lg lg:text-heading-xl">
                  {section.title}
                </Heading>
                {renderParagraphs(section.body)}
                {section.bullets ? renderBullets(section.bullets) : null}
                {section.extraTitle ? (
                  <Text size="body-md" className="text-text-secondary">
                    {section.extraTitle}
                  </Text>
                ) : null}
                {section.extraBullets ? renderBullets(section.extraBullets) : null}
                {section.bodyTail ? (
                  <>
                    {Array.isArray(section.bodyTail)
                      ? renderParagraphs(section.bodyTail)
                      : (
                        <Text size="body-md" className="text-text-secondary">
                          {section.bodyTail}
                        </Text>
                      )}
                  </>
                ) : null}
              </Stack>
            ))}

            <Stack gap="sm">
              <Heading level={2} size="heading-xl" className="text-heading-lg lg:text-heading-xl">
                Privacy Policy
              </Heading>
              <Text size="body-md" className="text-text-secondary">
                At Insightful Financial Analytics, we take your privacy seriously.
              </Text>
              <Text size="body-md" className="text-text-secondary">
                The personal information you provide, such as your name, phone
                number, and email address, is used only for the purposes you
                consent to.
              </Text>
            </Stack>

            {privacySections.map((section) => (
              <Stack key={section.title} gap="sm">
                <Heading level={3} size="heading-md" className="text-heading-md">
                  {section.title}
                </Heading>
                {renderParagraphs(section.body)}
                {section.bullets ? renderBullets(section.bullets) : null}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}