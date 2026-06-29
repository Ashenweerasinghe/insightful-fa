import { defineConfig, devices } from "@playwright/test";

/**
 * e2e harness (DEC-028). Runs against the dev server: shell smoke + per-page
 * structure/a11y, plus cross-page routing and nav active-state (nav.spec.ts).
 * Resources (/resources) is still 404 until Phase 5.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
