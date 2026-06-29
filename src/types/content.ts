/** The four Resources categories defined by the sitemap & information architecture. */
export type ResourceCategory =
  | "Operational visibility"
  | "Financial systems thinking"
  | "Predictive operational intelligence"
  | "AI-assisted operational analysis";

/** Frontmatter schema for a resource article (frontend architecture spec). */
export interface ResourceFrontmatter {
  title: string;
  description: string;
  /** ISO 8601 date, e.g. "2026-05-12". */
  publishedAt: string;
  author: string;
  category: ResourceCategory;
  featured: boolean;
  /** Reserved; v1 articles inherit the shared marketing OG image (DEC-045). */
  ogImage?: string;
}

/** A resource article's frontmatter plus its derived URL slug. */
export interface Resource extends ResourceFrontmatter {
  slug: string;
}
