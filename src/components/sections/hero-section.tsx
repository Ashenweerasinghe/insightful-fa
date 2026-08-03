import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

/**
 * HeroSection (P3-01): the page opener. Carries the single <h1>. Rendered
 * eagerly (no Reveal) because it is above the fold.
 */
export function HeroSection() {
  return (
    <Section
      variant="hero"
      className="py-[var(--section-space-sm)] md:py-[var(--section-space-md)]"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-2 md:gap-[var(--space-2xl)]">
          <Heading
            level={1}
            size="display-md"
            className="max-w-[12em] text-text-primary"
          >
            See where your business is heading&mdash;before month-end
          </Heading>
          <div className="max-w-[36rem] space-y-[var(--space-md)] text-text-secondary md:pt-[0.4rem]">
            <Text size="body-md">
              We combine your financial and operational data into customized
              dashboards, using AI-assisted analysis together with experienced
              financial professionals to provide practical recommendations that
              help you make better business decisions.
            </Text>
            <Text size="body-md">
              We work alongside your accounting firm and internal finance team,
              using the systems you already have.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
