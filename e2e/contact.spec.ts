import { test, expect } from "@playwright/test";

// Contact page (P4-03): structure, mailto mechanism (DEC-039), and the route-specific
// FooterCTA suppression (DEC-038). Queries are scoped to <main> where relevant.
test.describe("contact page", () => {
  test("has one h1 and a single section h2", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/missed your numbers/i);

    await expect(main.getByRole("heading", { level: 2 })).toHaveCount(1);
  });

  test("primary CTA and direct link both use mailto", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    await expect(
      main.getByRole("link", { name: /book a consultation/i }),
    ).toHaveAttribute("href", /^mailto:/);
    await expect(
      main.getByRole("link", { name: /connect@insightfulfa\.com/i }),
    ).toHaveAttribute("href", /^mailto:/);
  });

  test("shell FooterCTA is suppressed on /contact but present on /framework (DEC-038)", async ({
    page,
  }) => {
    const cta = page.getByRole("heading", {
      name: /see it before it reaches the numbers/i,
    });

    await page.goto("/contact");
    await expect(cta).toHaveCount(0);

    await page.goto("/framework");
    await expect(cta).toHaveCount(1);
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");

    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toBeVisible();
  });
});
