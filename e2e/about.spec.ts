import { test, expect } from "@playwright/test";

// About page (P4-02): structure + approved-copy checks, scoped to <main>.
test.describe("about page", () => {
  test("has one h1 and the section h2s in order", async ({ page }) => {
    await page.goto("/about");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/how a business actually works/i);

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(4);
    await expect(h2s.nth(0)).toContainText(/systems, not snapshots/i);
    await expect(h2s.nth(1)).toContainText(/four commitments/i);
    await expect(h2s.nth(3)).toContainText(/calm, consultative/i);
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 2, name: /systems, not snapshots/i }),
    ).toBeVisible();
  });
});
