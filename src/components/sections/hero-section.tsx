import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/cta/cta-group";
import { HeroIllustration } from "@/components/illustration/hero-illustration";

/**
 * HeroSection (P3-01): the page opener. Carries the single <h1>. Rendered eagerly
 * (no Reveal) because it is above the fold — Reveal SSRs opacity:0 until hydration.
 * Content-first DOM order so the illustration stacks below the copy on mobile.
 *
 * Layout overrides vs. the shared primitives (hero V2, see DEC-054):
 *   - Section padding tightened from --section-space-lg (180px) to --section-space-md
 *     (128px) so the short interrogative h1 doesn't float in a sea of cream.
 *   - Inline grid at 0.7fr/1.3fr (~35/65) instead of the shared editorial-asymmetry
 *     0.8fr/1.2fr (40/60) — the hero gives more room to the feature illustration
 *     than the body sections that use the primitive.
 */
export function HeroSection() {
  return (
    <Section variant="hero" className="py-[var(--section-space-md)]">
      <Container width="wide">
        <div className="grid grid-cols-1 items-center gap-[var(--space-xl)] md:grid-cols-[0.7fr_1.3fr]">
          <Stack gap="lg">
            <EyebrowLabel>Operational intelligence</EyebrowLabel>
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              See the bear?
            </Heading>
            <Text size="body-lg" className="text-text-secondary">
              Most businesses don&rsquo;t, until it&rsquo;s already in the
              numbers. The risks that cost you most grow quietly, deep in the
              operations your reporting can&rsquo;t see. Insightful Financial
              Analytics helps you spot them while there&rsquo;s still time to
              act.
            </Text>
            <CTAGroup>
              <Button href="/contact">Book a consultation</Button>
              <Button variant="secondary" href="#framework">
                See how the system works
              </Button>
            </CTAGroup>
          </Stack>
          <HeroIllustration />
        </div>
      </Container>
    </Section>
  );
}
