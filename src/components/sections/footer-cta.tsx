import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/cta/cta-group";

/**
 * FooterCTA (P2-03): a calm, low-pressure conversation invitation that closes
 * every marketing page above the footer. Approved CTA language only — strategic
 * and high-trust, never a funnel.
 */
export function FooterCTA() {
  return (
    <Section
      variant="cta"
      className="border-border-subtle bg-background-secondary border-t"
    >
      <Container width="narrow">
        <Stack gap="lg" className="items-start">
          <Stack gap="md">
            <Heading level={2} size="heading-lg">
              See it before it reaches the numbers.
            </Heading>
            <Text size="body-lg" className="text-text-secondary">
              We help organizations create earlier visibility into operational
              and financial risk.
            </Text>
          </Stack>
          <CTAGroup>
            <Button href="/contact">Book a consultation</Button>
            <Button variant="secondary" href="/framework">
              Explore the framework
            </Button>
          </CTAGroup>
        </Stack>
      </Container>
    </Section>
  );
}
