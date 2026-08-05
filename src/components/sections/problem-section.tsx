import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

/**
 * ProblemSection (P3-02): calm recognition of what traditional reporting misses —
 * the lead time between an early operational signal and its later financial impact.
 * Editorial two-column; a quiet SignalTimeline supports (never a dashboard).
 */
export function ProblemSection() {
  return (
    <Section
      variant="editorial"
      className="border-border-subtle bg-background-secondary border-t"
    >
      <Container width="default">
        <Grid variant="grid-2" className="items-center">
          <Reveal>
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                What you don&rsquo;t see is already costing you.
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                &#10060; Labor slowly creeping above plan
                <br />
                &#10060; Inventory building without visibility
                <br />
                &#10060; Marketing spends with unclear return
                <br />
                &#10060; Revenue underperforming expectations
              </Text>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <Image
              src="/illustrations/problem-operational-signal.png"
              alt="An operational signal often appears well before the same problem surfaces in financial reporting."
              width={1536}
              height={1024}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
