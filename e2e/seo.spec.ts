import { test, expect } from "@playwright/test";

// Technical SEO surfaces (Phase 6): sitemap, robots, canonicals, JSON-LD.
// Runs against `npm run dev` where NEXT_PUBLIC_SITE_URL is unset, so metadataBase
// falls back to http://localhost:3000 — that's what every absolute URL below
// expects.
const SITE_URL = "http://localhost:3000";

const STATIC_ROUTES = [
  // Next normalizes canonical "/" to the bare origin (no trailing slash); the
  // sitemap entry matches so both surfaces agree on a single URL form.
  { path: "/", canonical: SITE_URL },
  { path: "/framework", canonical: `${SITE_URL}/framework` },
  { path: "/about", canonical: `${SITE_URL}/about` },
  { path: "/contact", canonical: `${SITE_URL}/contact` },
  { path: "/resources", canonical: `${SITE_URL}/resources` },
];

const ARTICLE_SLUGS = [
  "seeing-operational-risk-earlier",
  "the-limits-of-lagging-indicators",
  "forecasting-as-an-operating-discipline",
];

test.describe("technical SEO surfaces", () => {
  test("sitemap.xml lists every static route and every article URL", async ({
    request,
  }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    for (const { canonical } of STATIC_ROUTES) {
      expect(body).toContain(`<loc>${canonical}</loc>`);
    }
    for (const slug of ARTICLE_SLUGS) {
      expect(body).toContain(`<loc>${SITE_URL}/resources/${slug}</loc>`);
    }
  });

  test("robots.txt allows all crawlers and references the sitemap", async ({
    request,
  }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    // robots.txt directives are case-insensitive per spec; Next emits with
    // capital A ("User-Agent"). Match either form.
    expect(body).toMatch(/User-Agent:\s*\*/i);
    expect(body).toMatch(/Allow:\s*\//);
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });

  for (const { path, canonical } of STATIC_ROUTES) {
    test(`canonical link present on ${path}`, async ({ page }) => {
      await page.goto(path);
      const href = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(href).toBe(canonical);
    });
  }

  test(`canonical link present on /resources/${ARTICLE_SLUGS[0]}`, async ({
    page,
  }) => {
    const path = `/resources/${ARTICLE_SLUGS[0]}`;
    await page.goto(path);
    const href = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(href).toBe(`${SITE_URL}${path}`);
  });

  test("article JSON-LD present and parses as schema.org Article", async ({
    page,
  }) => {
    const slug = ARTICLE_SLUGS[0];
    await page.goto(`/resources/${slug}`);
    const json = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(json).not.toBeNull();
    const data = JSON.parse(json!);
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Article");
    expect(typeof data.headline).toBe("string");
    expect(data.headline.length).toBeGreaterThan(0);
    expect(data.author["@type"]).toBe("Person");
    expect(data.author.name).toBe("Chats Kamburupitiya");
    expect(data.publisher["@type"]).toBe("Organization");
    expect(data.publisher.name).toBe("Insightful Financial Analytics");
    expect(data.publisher.logo.url).toBe(`${SITE_URL}/icon`);
    expect(data.mainEntityOfPage["@id"]).toBe(`${SITE_URL}/resources/${slug}`);
    expect(data.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
