import { test, expect } from "@playwright/test";

// Framework page (P4-01): structure + approved-copy checks. Queries are scoped to
// <main> so the shell's FooterCTA/Footer headings are excluded.
test.describe("framework page", () => {
  test("has one h1 and the section h2s in order", async ({ page }) => {
    await page.goto("/framework");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/predictive control framework/i);

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(3);
    await expect(h2s.nth(0)).toContainText(/the four layers/i);
    await expect(h2s.nth(1)).toContainText(/how we turn data into action/i);
    await expect(h2s.nth(2)).toContainText(/competitive advantages/i);

    await expect(
      main.getByText(/establish a strong financial foundation/i),
    ).toBeVisible();
    await expect(
      main.getByText(/refine financial models and forecasts/i),
    ).toBeVisible();
    await expect(
      main.getByText(/review, refine, and improve/i),
    ).toBeVisible();
    await expect(
      main.getByText(/earlier visibility into where your business is heading/i),
    ).toBeVisible();
    await expect(
      main.getByText(/works alongside your accounting firm/i),
    ).toBeVisible();
    await expect(
      main.getByText(/continuously improves through real-world feedback/i),
    ).toBeVisible();
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/framework");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: /how we turn data into action/i,
      }),
    ).toBeVisible();
  });
});
