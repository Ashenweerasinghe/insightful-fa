import { test, expect } from "@playwright/test";

// Resource article (P5-03): the page owns the single <h1> (title); MDX body
// sections render as <h2>, so heading order is h1 → h2 with no second h1.
const ARTICLE = "/resources/seeing-operational-risk-earlier";

test.describe("resource article", () => {
  test("has exactly one h1 and body headings start at h2", async ({ page }) => {
    await page.goto(ARTICLE);
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/seeing operational risk earlier/i);

    await expect(main.getByRole("heading", { level: 2 }).first()).toContainText(
      /reporting tells you what already happened/i,
    );
  });

  test("shows the byline and a machine-readable published date", async ({
    page,
  }) => {
    await page.goto(ARTICLE);
    const main = page.getByRole("main");

    await expect(main).toContainText("Chats Kamburupitiya");
    await expect(main.locator("time")).toHaveAttribute(
      "datetime",
      "2026-05-20",
    );
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(ARTICLE);
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: /signals form before outcomes/i,
      }),
    ).toBeVisible();
  });

  test("emits a canonical link and Article JSON-LD (Phase 6)", async ({
    page,
  }) => {
    await page.goto(ARTICLE);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `http://localhost:3000${ARTICLE}`,
    );
    const json = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(json).not.toBeNull();
    const data = JSON.parse(json!);
    expect(data["@type"]).toBe("Article");
  });
});
