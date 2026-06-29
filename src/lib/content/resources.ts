import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Resource,
  ResourceCategory,
  ResourceFrontmatter,
} from "@/types/content";

const RESOURCES_DIR = path.join(process.cwd(), "src", "content", "resources");

const CATEGORIES: readonly ResourceCategory[] = [
  "Operational visibility",
  "Financial systems thinking",
  "Predictive operational intelligence",
  "AI-assisted operational analysis",
];

/** Validate frontmatter at the content boundary; fail loudly with the filename. */
function parseFrontmatter(
  data: Record<string, unknown>,
  file: string,
): ResourceFrontmatter {
  const { title, description, author, category, featured, ogImage } = data;

  if (typeof title !== "string" || title.length === 0)
    throw new Error(`Resource "${file}": missing string \`title\`.`);
  if (typeof description !== "string" || description.length === 0)
    throw new Error(`Resource "${file}": missing string \`description\`.`);
  if (typeof author !== "string" || author.length === 0)
    throw new Error(`Resource "${file}": missing string \`author\`.`);
  if (typeof featured !== "boolean")
    throw new Error(`Resource "${file}": \`featured\` must be a boolean.`);
  if (
    typeof category !== "string" ||
    !CATEGORIES.includes(category as ResourceCategory)
  )
    throw new Error(
      `Resource "${file}": \`category\` must be one of ${CATEGORIES.join(", ")}.`,
    );

  // YAML parses an unquoted ISO date into a Date; normalize back to YYYY-MM-DD.
  const rawDate = data.publishedAt;
  let publishedAt: string;
  if (rawDate instanceof Date) publishedAt = rawDate.toISOString().slice(0, 10);
  else if (typeof rawDate === "string" && rawDate.length > 0)
    publishedAt = rawDate;
  else throw new Error(`Resource "${file}": missing \`publishedAt\` date.`);

  return {
    title,
    description,
    publishedAt,
    author,
    category: category as ResourceCategory,
    featured,
    ogImage: typeof ogImage === "string" ? ogImage : undefined,
  };
}

/** All resource articles, newest first. */
export function getAllResources(): Resource[] {
  if (!fs.existsSync(RESOURCES_DIR)) return [];

  return fs
    .readdirSync(RESOURCES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(RESOURCES_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        ...parseFrontmatter(data as Record<string, unknown>, file),
        slug: file.replace(/\.mdx$/, ""),
      };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getResourceSlugs(): string[] {
  return getAllResources().map((resource) => resource.slug);
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return getAllResources().find((resource) => resource.slug === slug);
}
