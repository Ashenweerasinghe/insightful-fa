import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/cta/cta-group";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for is not here. Return home or explore the writing in resources.",
};

export default function NotFound() {
  return (
    <MarketingShell>
      <Section variant="hero">
        <Container width="narrow">
          <Stack gap="lg">
            <EyebrowLabel>404 · Not found</EyebrowLabel>
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              This page is not part of the system.
            </Heading>
            <Text size="body-lg" className="text-text-secondary">
              The link may have moved or the address may be incomplete. The home
              page and the writing in resources are the calmest places to pick
              up the thread.
            </Text>
            <CTAGroup>
              <Button href="/">Return home</Button>
              <Button variant="secondary" href="/resources">
                Explore the resources
              </Button>
            </CTAGroup>
          </Stack>
        </Container>
      </Section>
    </MarketingShell>
  );
}
