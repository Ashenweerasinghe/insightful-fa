import { test, expect } from "@playwright/test";

// Cross-page navigation + nav active-state (Phase 4 — the smoke shell.spec.ts deferred).
// Default viewport is desktop, so the inline Navbar links are visible; queries are scoped
// to the banner to avoid the Footer's navigation column and the wordmark.
const PAGES = [
  {
    label: "How it works",
    path: "/framework",
    heading: /predictive control framework/i,
  },
  { label: "Why We Exist", path: "/about", heading: /why we exist/i },
  { label: "Contact", path: "/contact", heading: /contact/i },
  {
    label: "Home",
    path: "/",
    heading: /see where your business is heading/i,
  },
];

test.describe("primary navigation", () => {
  test("navigates between the core pages with no console errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    const banner = page.getByRole("banner");

    for (const target of PAGES) {
      await banner
        .getByRole("link", { name: target.label, exact: true })
        .click();
      await expect(page).toHaveURL(target.path);
      await expect(
        page.getByRole("main").getByRole("heading", { level: 1 }),
      ).toContainText(target.heading);
    }

    expect(errors).toEqual([]);
  });

  test("marks the current page with aria-current (DEC-040)", async ({
    page,
  }) => {
    await page.goto("/framework");
    const banner = page.getByRole("banner");

    await expect(
      banner.getByRole("link", { name: "How it works", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      banner.getByRole("link", { name: "Why We Exist", exact: true }),
    ).not.toHaveAttribute("aria-current", "page");
  });

  test("404 page renders inside the marketing shell (Phase 6)", async ({
    page,
  }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toContainText(/not part of the system/i);
    await expect(
      page.getByRole("main").getByRole("link", { name: "Return home" }),
    ).toHaveAttribute("href", "/");
  });
});
