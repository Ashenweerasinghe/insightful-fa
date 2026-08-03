import { test, expect } from "@playwright/test";

// Why We Exist page (P4-02): structure + approved-copy checks, scoped to <main>.
test.describe("why we exist page", () => {
  test("has one h1 and the section h2s in order", async ({ page }) => {
    await page.goto("/about");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(/why we exist/i);

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(4);
    await expect(h2s.nth(0)).toContainText(/vision/i);
    await expect(h2s.nth(1)).toContainText(/mission/i);
    await expect(h2s.nth(2)).toContainText(/stop reacting to the past/i);
    await expect(h2s.nth(3)).toContainText(/what our approach delivers/i);

    await expect(
      main.getByText(/maximize the value of their resources/i),
    ).toBeVisible();
    await expect(
      main.getByText(/without the stress of financial uncertainty/i),
    ).toBeVisible();
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 2, name: /vision/i }),
    ).toBeVisible();
  });
});
