import { test, expect } from "@playwright/test";

// Framework page (P4-01): structure + approved-copy checks. Queries are scoped to
// <main> so the shell's FooterCTA/Footer headings are excluded.
test.describe("framework page", () => {
  test("has one h1 and the section h2s in order", async ({ page }) => {
    await page.goto("/framework");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(
      /downstream reflections of operational systems/i,
    );

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(2);
    await expect(h2s.nth(0)).toContainText(/seeing operational risk earlier/i);
    await expect(h2s.nth(1)).toContainText(/rarely fail all at once/i);
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/framework");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 2, name: /rarely fail all at once/i }),
    ).toBeVisible();
  });
});
