// Measures hero animation frame rate to catch main-thread starvation.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3003";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/nikolaos/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const result = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const frames = [];
      let last = performance.now();
      let n = 0;
      const tick = (now) => {
        frames.push(now - last);
        last = now;
        if (++n < 120) requestAnimationFrame(tick);
        else {
          frames.sort((a, b) => a - b);
          resolve({
            median: +frames[Math.floor(frames.length / 2)].toFixed(2),
            p95: +frames[Math.floor(frames.length * 0.95)].toFixed(2),
            worst: +frames[frames.length - 1].toFixed(2),
          });
        }
      };
      requestAnimationFrame(tick);
    }),
);

console.log(
  `frame ms — median ${result.median} | p95 ${result.p95} | worst ${result.worst}`,
);

// Confirm the typewriter reaches its full string.
await page.waitForTimeout(2000);
const tagline = await page.locator("#hero p.text-magenta").first().innerText();
console.log(`tagline rendered: "${tagline.trim()}"`);

await browser.close();
