import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import bearImage from "../../../Bear Image.png";

/**
 * HeroSection (P3-01): the page opener. Carries the single <h1>. Rendered
 * eagerly (no Reveal) because it is above the fold. On desktop the illustration
 * sits on the left and the narrative on the right; on mobile the heading leads.
 */
export function HeroSection() {
  return (
    <Section
      variant="hero"
      className="py-[var(--section-space-sm)] md:py-[var(--section-space-md)]"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-2 md:gap-[var(--space-2xl)]">
          <div className="space-y-[var(--space-md)] md:order-2">
            <Heading level={1} size="display-md" className="text-text-primary">
              See the Bear?
            </Heading>
            <Text size="body-lg" className="text-text-secondary">
              Most businesses don&rsquo;t&hellip; Until it&rsquo;s too late.
            </Text>
            <Text size="body-lg" className="text-text-primary">
              So WHO/WHAT IS THIS BEAR?
            </Text>
            <div className="space-y-[var(--space-sm)] text-text-secondary">
              <Text size="body-lg">
                It&rsquo;s the{" "}
                <strong className="text-text-primary">Month-End Report.</strong>
              </Text>
              <Text size="body-lg">
                The one that tells you that you missed your targets &mdash;
              </Text>
              <Text size="body-lg">
                &#10060; Revenue dropped,
                <br />
                &#10060; Costs increased,
                <br />
                &#10060; Profits didn&rsquo;t land.
              </Text>
              <Text size="body-lg">
                And then comes the hard part. You&rsquo;re responsible for the
                numbers.
              </Text>
              <Text size="body-lg">Now you have to explain why you missed them.</Text>
            </div>
          </div>
          <div className="flex items-start justify-center md:order-1 md:justify-start">
            <Image
              src={bearImage}
              alt="A bear looming over scattered financial reports"
              priority
              className="h-auto w-full"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
