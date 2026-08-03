import { test, expect } from "@playwright/test";

// Homepage structure + approved-copy checks (P3). Queries are scoped to <main>
// so the shell's FooterCTA/Footer headings and links are excluded.
test.describe("homepage", () => {
  test("has exactly one h1 and the section headlines in order", async ({
    page,
  }) => {
    await page.goto("/");
    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(
      /see where your business is heading.before month-end/i,
    );

    const h2s = main.getByRole("heading", { level: 2 });
    await expect(h2s).toHaveCount(4);
    await expect(h2s.nth(0)).toContainText(
      /what you don.t see is already costing you/i,
    );
    await expect(h2s.nth(1)).toContainText(
      /by the time it shows up in your financials/i,
    );
    await expect(h2s.nth(2)).toContainText(/predictive control framework/i);
    await expect(h2s.nth(3)).toContainText(/the four layers/i);

    await expect(
      main.getByText(/our proprietary methodology/i),
    ).toBeVisible();
    await expect(
      main.getByText(/financial and non-financial data/i),
    ).toBeVisible();
    await expect(
      main.getByText(
        /operational drivers that influence business performance/i,
      ),
    ).toBeVisible();
    await expect(
      main.getByText(/turns insights into actions/i),
    ).toBeVisible();
  });

  test("hero uses approved dashboard and finance-team language", async ({
    page,
  }) => {
    await page.goto("/");
    const main = page.getByRole("main");

    await expect(
      main.getByText(
        /financial and operational data into customized dashboards/i,
      ),
    ).toBeVisible();
    await expect(
      main.getByText(/accounting firm and internal finance team/i),
    ).toBeVisible();
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
