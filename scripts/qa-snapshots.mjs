/**
 * One-off responsive QA harness. Hits a running dev/prod server and
 * screenshots every (route × viewport) combo into `qa/`. Reports horizontal
 * overflow, console errors, and network failures inline.
 *
 *   QA_BASE_URL=http://localhost:3000 node scripts/qa-snapshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = process.env.QA_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = "qa";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "framework", path: "/framework" },
  { name: "about", path: "/about" },
  { name: "resources", path: "/resources" },
  { name: "article", path: "/resources/seeing-operational-risk-earlier" },
  { name: "contact", path: "/contact" },
];

// width × height. Names match common device classes; "wide-tall" repros the
// user-reported 1974×1564 button-wrap.
const VIEWPORTS = [
  { name: "phone-small", w: 375, h: 667 },
  { name: "phone-std", w: 390, h: 844 },
  { name: "tablet-portrait", w: 768, h: 1024 },
  { name: "laptop", w: 1280, h: 800 },
  { name: "desktop", w: 1440, h: 900 },
  { name: "wide-monitor", w: 1920, h: 1080 },
  { name: "wide-tall", w: 1974, h: 1564 },
];

const issues = [];

async function snapshot() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const netFails = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("requestfailed", (r) =>
      netFails.push(`${r.url()} (${r.failure()?.errorText})`),
    );

    for (const route of ROUTES) {
      consoleErrors.length = 0;
      netFails.length = 0;

      const url = `${BASE_URL}${route.path}`;
      const label = `[${vp.name} ${vp.w}px] ${route.name}`;
      try {
        await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 30_000,
        });
        await page.waitForTimeout(400); // settle initial paint

        // Scroll through the full page to trigger every IntersectionObserver-
        // based Reveal (motion.div opacity:0 → 1). Without this, full-page
        // screenshots show below-the-fold reveal-wrapped content as blank.
        await page.evaluate(async () => {
          const step = Math.round(window.innerHeight * 0.6);
          const total = document.documentElement.scrollHeight;
          for (let y = 0; y < total; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, total);
          await new Promise((r) => setTimeout(r, 200));
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 200));
        });

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement.scrollWidth;
          const win = window.innerWidth;
          return doc > win ? { doc, win, diff: doc - win } : null;
        });

        await page.screenshot({
          path: join(OUT_DIR, `${vp.name}__${route.name}.png`),
          fullPage: true,
        });

        if (overflow) {
          issues.push(
            `${label}: horizontal overflow ${overflow.diff}px (doc ${overflow.doc} vs viewport ${overflow.win})`,
          );
        }
        const fatal = consoleErrors.filter(
          (e) => !/Failed to load resource.*404/.test(e),
        );
        if (fatal.length) {
          issues.push(
            `${label}: ${fatal.length} console error(s) — ${fatal[0].slice(0, 200)}`,
          );
        }
        const realNetFails = netFails.filter(
          (e) =>
            !/_next\/static\/.*\.hot-update/.test(e) &&
            // Next.js dev-tools overlay loads Geist for its own UI from
            // /__nextjs_font/; in-flight requests get ERR_ABORTED when the
            // harness navigates to the next viewport. Dev-only endpoint —
            // does not exist in production.
            !/__nextjs_font\//.test(e),
        );
        if (realNetFails.length) {
          issues.push(
            `${label}: ${realNetFails.length} network failure(s) — ${realNetFails[0].slice(0, 200)}`,
          );
        }
      } catch (err) {
        issues.push(`${label}: navigation failed — ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
}

await snapshot();

console.log(`\n=== QA RESULTS ===`);
console.log(`base: ${BASE_URL}`);
console.log(
  `combos: ${ROUTES.length} routes × ${VIEWPORTS.length} viewports = ${ROUTES.length * VIEWPORTS.length}`,
);
console.log(`screenshots: ./${OUT_DIR}/<viewport>__<route>.png`);
console.log(`issues: ${issues.length}`);
for (const i of issues) console.log(`  - ${i}`);
if (issues.length === 0) console.log(`  (none)`);
