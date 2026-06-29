import { test, expect } from "@playwright/test";

// Resources index (P5-02): structure + featured lead + card links. Queries are
// scoped to <main> so the shell's FooterCTA/Footer headings are excluded.
test.describe("resources index", () => {
  test("has one h1, a featured lead (h2), and article cards (h3) that link out", async ({
    page,
  }) => {
    await page.goto("/resources");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(
      /operational visibility and financial systems/i,
    );

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(1);
    await expect(h2s).toContainText(/seeing operational risk earlier/i);

    // The two non-featured articles render as h3 cards that link to their routes.
    await expect(main.getByRole("heading", { level: 3 })).toHaveCount(2);
    await expect(
      main.getByRole("link", { name: /the limits of lagging indicators/i }),
    ).toHaveAttribute("href", "/resources/the-limits-of-lagging-indicators");
  });

  test("content is visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/resources");
    const main = page.getByRole("main");

    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      main.getByRole("link", { name: /the limits of lagging indicators/i }),
    ).toBeVisible();
  });
});
