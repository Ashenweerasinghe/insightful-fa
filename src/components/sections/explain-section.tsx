import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import search2Image from "../../../search2.png";

export function ExplainSection() {
  return (
    <Section variant="editorial" className="border-border-subtle border-t">
      <Container width="default">
        <Grid variant="grid-2" className="items-center">
          <Reveal>
            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                By the time it shows up in your financials. you&rsquo;re no
                longer managing it, you&rsquo;re explaining it.
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                That&rsquo;s not control.
                <br />
                That&rsquo;s post-mortem.
                <br />
                <br />
                We change that.
              </Text>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <Image
              src={search2Image}
              alt="Operational risk review"
              className="h-auto w-full"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}