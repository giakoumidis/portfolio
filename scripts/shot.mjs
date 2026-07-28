// Visual QA helper: capture the running dev server at a few viewports.
// Usage: node scripts/shot.mjs [url] [outDir]
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] ?? "http://localhost:3003";
const outDir = process.argv[3] ?? "/tmp/pf";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });

// Reuse the browser already cached on this machine rather than downloading a
// version-matched one.
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/nikolaos/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto(url, { waitUntil: "networkidle" });
  // Let entrance animations, typewriters and the canvas settle.
  await page.waitForTimeout(4200);

  await page.screenshot({ path: `${outDir}/${vp.name}-hero.png` });
  await page.screenshot({
    path: `${outDir}/${vp.name}-full.png`,
    fullPage: true,
  });

  console.log(
    `${vp.name}: captured${errors.length ? ` — ${errors.length} console errors` : ""}`,
  );
  for (const e of errors.slice(0, 6)) console.log(`   ! ${e}`);
  await page.close();
}

await browser.close();
