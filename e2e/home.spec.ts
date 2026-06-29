import { test, expect } from "@playwright/test";

// Homepage structure + approved-copy/anchor checks (P3). Queries are scoped to
// <main> so the shell's FooterCTA/Footer headings and links are excluded.
test.describe("homepage", () => {
  test("has exactly one h1 and the section headlines in order", async ({
    page,
  }) => {
    await page.goto("/");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/see the bear/i);

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(3);
    await expect(h2s.nth(0)).toContainText(
      /explaining the problem, not managing it/i,
    );
    await expect(h2s.nth(1)).toContainText(/predictive control framework/i);
    await expect(h2s.nth(2)).toContainText(/changes how businesses operate/i);

    // Differentiators block (P8-03) renders between Outcomes and Credibility.
    await expect(
      main.getByText(/pair AI with experienced financial judgment/i),
    ).toBeVisible();
  });

  test("hero CTAs use approved language and targets", async ({ page }) => {
    await page.goto("/");
    const main = page.getByRole("main");

    await expect(
      main.getByRole("link", { name: /book a consultation/i }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      main.getByRole("link", { name: /see how the system works/i }),
    ).toHaveAttribute("href", "#framework");
    await expect(page.locator("#framework")).toBeVisible();
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    // A below-the-fold revealed block resolves to visible (no stuck opacity:0).
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: /predictive control framework/i,
      }),
    ).toBeVisible();
  });
});
