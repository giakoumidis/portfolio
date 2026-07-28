// Screenshot a single section by anchor id, after letting it animate in.
// Usage: node scripts/section.mjs <sectionId> [out.png] [width] [url]
import { chromium } from "playwright";

const id = process.argv[2] ?? "about";
const out = process.argv[3] ?? `/tmp/${id}.png`;
const width = Number(process.argv[4] ?? 1440);
const url = process.argv[5] ?? "http://localhost:3003";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/nikolaos/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage({ viewport: { width, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(url, { waitUntil: "networkidle" });
// Scroll through the page first so every once-only reveal has fired.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await page.locator(`#${id}`).scrollIntoViewIfNeeded();
await page.waitForTimeout(2500);
// Viewport-sized frame, so nothing is scaled down to fit a tall element.
await page.screenshot({ path: out });

console.log(`captured #${id} -> ${out}`);
for (const e of errors.slice(0, 8)) console.log(`  ! ${e}`);

await browser.close();
