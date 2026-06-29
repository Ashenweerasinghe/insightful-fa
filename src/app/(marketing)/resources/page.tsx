import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { ResourceCard } from "@/components/cards/resource-card";
import { getAllResources } from "@/lib/content/resources";
import { formatPublishedDate } from "@/lib/content/format-date";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Essays on operational visibility, financial systems thinking, and forecasting, practical perspectives on seeing operational and financial risk earlier.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resources · Insightful Financial Analytics",
    description:
      "Writing on operational visibility, leading indicators, and forecasting.",
    type: "website",
  },
};

export default function ResourcesPage() {
  const resources = getAllResources();
  const featured =
    resources.find((resource) => resource.featured) ?? resources[0];
  const rest = resources.filter((resource) => resource.slug !== featured?.slug);

  return (
    <>
      <Section variant="hero" className="py-[var(--section-space-md)]">
        <Container width="default">
          <Stack gap="lg">
            <EyebrowLabel>Resources</EyebrowLabel>
            <Heading
              level={1}
              size="display-lg"
              className="text-display-md lg:text-display-lg"
            >
              Writing on operational visibility and financial systems.
            </Heading>
            <Text size="body-lg" className="text-text-secondary">
              Essays on systems thinking, leading indicators, and forecasting,
              practical perspectives on seeing operational and financial risk
              earlier.
            </Text>
          </Stack>
        </Container>
      </Section>

      {resources.length === 0 ? (
        <Section variant="editorial">
          <Container width="narrow">
            <Text size="body-lg" className="text-text-secondary">
              New writing is on the way.
            </Text>
          </Container>
        </Section>
      ) : (
        <>
          {featured && (
            <Section
              variant="editorial"
              className="border-border-subtle bg-background-secondary border-t"
            >
              <Container width="default">
                <Stack gap="xl">
                  <Reveal>
                    <EyebrowLabel>Featured</EyebrowLabel>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <article>
                      <Link
                        href={`/resources/${featured.slug}`}
                        className="group focus-visible:outline-signal-focus block focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <Stack gap="sm">
                          <Text
                            as="span"
                            size="body-sm"
                            className="text-text-secondary"
                          >
                            {featured.category} ·{" "}
                            <time dateTime={featured.publishedAt}>
                              {formatPublishedDate(featured.publishedAt)}
                            </time>
                          </Text>
                          <Heading
                            level={2}
                            size="heading-xl"
                            className="text-heading-lg lg:text-heading-xl decoration-border-strong underline-offset-4 group-hover:underline"
                          >
                            {featured.title}
                          </Heading>
                          <Text size="body-lg" className="text-text-secondary">
                            {featured.description}
                          </Text>
                        </Stack>
                      </Link>
                    </article>
                  </Reveal>
                </Stack>
              </Container>
            </Section>
          )}

          {rest.length > 0 && (
            <Section
              variant="editorial"
              className="border-border-subtle border-t"
            >
              <Container width="default">
                <Stack gap="xl">
                  <Reveal>
                    <EyebrowLabel>More writing</EyebrowLabel>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <Grid variant="grid-2">
                      {rest.map((resource) => (
                        <ResourceCard
                          key={resource.slug}
                          slug={resource.slug}
                          title={resource.title}
                          description={resource.description}
                          category={resource.category}
                          publishedAt={resource.publishedAt}
                        />
                      ))}
                    </Grid>
                  </Reveal>
                </Stack>
              </Container>
            </Section>
          )}
        </>
      )}
    </>
  );
}
