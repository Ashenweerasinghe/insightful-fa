import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Accessibility gate (DEC-028): scan the shell-bearing routes for WCAG A/AA
// violations. @axe-core/playwright runs axe inside Playwright's Chromium, which
// avoids the @axe-core/cli ChromeDriver/Chrome version coupling.
const ROUTES = [
  "/",
  "/framework",
  "/about",
  "/contact",
  "/resources",
  "/resources/seeing-operational-risk-earlier",
  "/this-route-does-not-exist",
];

for (const route of ROUTES) {
  test(`no critical or serious axe violations: ${route}`, async ({ page }) => {
    await page.goto(route);
    // Drive any scroll-reveal (whileInView) animations to their resolved state so
    // axe scans the visible end state, not an opacity:0 mid-transition.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousOrWorse = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(seriousOrWorse, JSON.stringify(seriousOrWorse, null, 2)).toEqual([]);
  });
}
