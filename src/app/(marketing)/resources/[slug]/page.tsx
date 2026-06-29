import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { EyebrowLabel } from "@/components/typography/eyebrow-label";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getResourceBySlug, getResourceSlugs } from "@/lib/content/resources";
import { formatPublishedDate } from "@/lib/content/format-date";

export const dynamicParams = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams(): { slug: string }[] {
  return getResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.description,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      title: `${resource.title} · Insightful Financial Analytics`,
      description: resource.description,
      type: "article",
      publishedTime: resource.publishedAt,
      authors: [resource.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const { default: Post } = (await import(
    `@/content/resources/${slug}.mdx`
  )) as { default: ComponentType };

  const canonical = `${SITE_URL}/resources/${resource.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.description,
    datePublished: resource.publishedAt,
    author: { "@type": "Person", name: resource.author },
    publisher: {
      "@type": "Organization",
      name: "Insightful Financial Analytics",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section variant="hero">
        <Container width="narrow">
          <Stack gap="lg">
            <Stack gap="sm">
              <EyebrowLabel>{resource.category}</EyebrowLabel>
              <Heading
                level={1}
                size="display-lg"
                className="text-display-md lg:text-display-lg"
              >
                {resource.title}
              </Heading>
            </Stack>
            <Text size="body-md" className="text-text-secondary">
              {resource.author} ·{" "}
              <time dateTime={resource.publishedAt}>
                {formatPublishedDate(resource.publishedAt)}
              </time>
            </Text>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="narrow">
          <div className="article-body">
            <Post />
          </div>
        </Container>
      </Section>
    </>
  );
}
