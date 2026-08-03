import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import structure2Image from "../../../structure2.png";

/**
 * FrameworkSection (P3-03): introduces the proprietary predictive control
 * methodology on the homepage.
 */
export function FrameworkSection() {
  return (
    <Section
      variant="editorial"
      id="framework"
      className="scroll-mt-[var(--space-2xl)]"
    >
      <Container width="wide">
        <Grid variant="editorial-asymmetry" className="items-center">
          <Reveal>
            <Stack gap="md">
              <EyebrowLabel>The framework</EyebrowLabel>
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                The IFA Predictive Control Framework&trade;
              </Heading>
              <div className="space-y-[var(--space-sm)] text-text-secondary">
                <Text size="body-md">
                  <strong className="text-text-primary">
                    The IFA Predictive Control Framework<sup>&trade;</sup> is
                    our proprietary methodology.
                  </strong>
                </Text>
                <Text size="body-md">
                  <strong className="text-text-primary">
                    It combines financial and non-financial data, customized
                    dashboards, AI-assisted analysis, and continuous improvement
                    into a structured system that helps businesses understand
                    where they are heading before month-end.
                  </strong>
                </Text>
              </div>
            </Stack>
          </Reveal>
          <Reveal delay={0.08}>
            <Image
              src={structure2Image}
              alt="IFA Predictive Control Framework structure"
              className="h-auto w-full"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
