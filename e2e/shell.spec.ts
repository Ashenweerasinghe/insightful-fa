import { test, expect } from "@playwright/test";

test.describe("marketing shell smoke", () => {
  test("home renders within the shell, no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/Insightful Financial Analytics/);
    await expect(page.getByRole("banner")).toBeVisible(); // <header> Navbar
    await expect(page.getByRole("contentinfo")).toBeVisible(); // <footer>
    expect(errors).toEqual([]);
  });

  test("mobile menu opens, traps focus, and closes on Escape", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /open navigation menu/i });
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /site navigation/i });
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Focus moves to the first focusable in the panel (the close button).
    const closeButton = page.getByRole("button", {
      name: /close navigation menu/i,
    });
    await expect(closeButton).toBeFocused();

    // Focus trap: Shift+Tab from the first focusable wraps to the last nav link.
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("link").last()).toBeFocused();

    // Escape closes the menu and returns focus to the trigger.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  // Cross-page navigation + nav active-state are covered in nav.spec.ts (Phase 4).
  // Resources (/resources) still 404s until Phase 5.
});
