// Accessibility / responsive / reduced-motion audit for the portfolio.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] ?? "http://localhost:3003";
const outDir = "/tmp/pf-qa";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/nikolaos/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-gpu"],
});

const problems = [];
const note = (m) => problems.push(m);

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

// ---------- 1. Responsive: overflow + section presence ----------
const WIDTHS = [360, 768, 1024, 1440];
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(page);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 1) note(`${width}px: horizontal overflow of ${overflow}px`);

  // The hero typewriter is the canary for viewport-margin bugs: it starts only
  // a cursor wide, so a negative horizontal inset stops it ever triggering.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(3000);
  const tagline = await page.evaluate(
    () =>
      document.querySelector("#hero p.text-magenta span[aria-hidden]")
        ?.textContent ?? "",
  );
  if (!tagline.includes("AUTONOMOUS SYSTEMS"))
    note(`${width}px: hero typewriter did not complete (got "${tagline}")`);

  const missing = await page.evaluate(() =>
    [
      "hero",
      "about",
      "experience",
      "capabilities",
      "projects",
      "arsenal",
      "research",
      "awards",
      "contact",
    ].filter((id) => !document.getElementById(id)),
  );
  if (missing.length) note(`${width}px: missing sections ${missing.join(", ")}`);
  if (errors.length) note(`${width}px: console errors -> ${errors[0]}`);

  await page.screenshot({ path: `${outDir}/w${width}-full.png`, fullPage: true });
  console.log(`checked ${width}px (overflow ${overflow}px, errors ${errors.length})`);
  await page.close();
}

// ---------- 2. Semantics + keyboard ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(page);

  const semantics = await page.evaluate(() => {
    const h1 = [...document.querySelectorAll("h1")].map((n) => n.textContent?.trim());
    const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((n) =>
      Number(n.tagName[1]),
    );
    const unlabelled = [...document.querySelectorAll("section[id]")]
      .filter((s) => !s.getAttribute("aria-labelledby") && !s.getAttribute("aria-label"))
      .map((s) => s.id);
    const danglingLabels = [...document.querySelectorAll("section[aria-labelledby]")]
      .map((s) => s.getAttribute("aria-labelledby"))
      .filter((id) => id && !document.getElementById(id));
    const blankLinks = [...document.querySelectorAll('a[target="_blank"]')].filter(
      (a) => !(a.getAttribute("rel") ?? "").includes("noopener"),
    ).length;
    const imgsNoAlt = [...document.querySelectorAll("img")].filter(
      (i) => !i.hasAttribute("alt"),
    ).length;
    return { h1, levels, unlabelled, danglingLabels, blankLinks, imgsNoAlt };
  });

  if (semantics.h1.length !== 1)
    note(`expected exactly one h1, found ${semantics.h1.length}`);
  if (semantics.unlabelled.length)
    note(`sections without accessible name: ${semantics.unlabelled.join(", ")}`);
  if (semantics.danglingLabels.length)
    note(`aria-labelledby pointing at missing ids: ${semantics.danglingLabels.join(", ")}`);
  if (semantics.blankLinks) note(`${semantics.blankLinks} target=_blank links missing rel=noopener`);
  if (semantics.imgsNoAlt) note(`${semantics.imgsNoAlt} images missing alt`);

  // Heading levels should never jump by more than one.
  for (let i = 1; i < semantics.levels.length; i++) {
    const jump = semantics.levels[i] - semantics.levels[i - 1];
    if (jump > 1) {
      note(`heading level jumps from h${semantics.levels[i - 1]} to h${semantics.levels[i]}`);
      break;
    }
  }

  // Tab through and make sure focus lands on real controls in order.
  const order = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    order.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return "(body)";
        const label = (el.textContent ?? "").trim().slice(0, 22).replace(/\s+/g, " ");
        return `${el.tagName.toLowerCase()}:${label || el.getAttribute("aria-label") || "?"}`;
      }),
    );
  }
  console.log(`tab order: ${order.slice(0, 8).join(" > ")}`);
  if (order[0] === "(body)") note("first Tab did not reach the skip link");

  console.log(`h1: ${JSON.stringify(semantics.h1)}`);
  await page.close();
}

// ---------- 3. Reduced motion ----------
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await scrollThrough(page);
  await page.waitForTimeout(800);

  const hydrationWarnings = [];
  page.on("console", (m) => {
    const t = m.text();
    if (/hydrat|didn't match|mismatch/i.test(t)) hydrationWarnings.push(t);
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  if (hydrationWarnings.length)
    note(`reduced motion: hydration mismatch -> ${hydrationWarnings[0].slice(0, 120)}`);

  const state = await page.evaluate(() => {
    const tagline = document.querySelector("p.label-mono.text-magenta");
    const counters = [...document.querySelectorAll("#about p.font-mono")].map((n) =>
      n.textContent?.trim(),
    );
    const heroOpacity = getComputedStyle(
      document.querySelector("#hero h1"),
    ).opacity;
    return {
      tagline: tagline?.textContent?.trim() ?? "",
      counters,
      heroOpacity,
    };
  });

  if (!state.tagline.includes("AUTONOMOUS SYSTEMS"))
    note(`reduced motion: tagline not fully rendered ("${state.tagline}")`);
  if (state.heroOpacity !== "1")
    note(`reduced motion: hero h1 opacity is ${state.heroOpacity}`);

  await page.screenshot({ path: `${outDir}/reduced-motion.png` });
  console.log(`reduced motion — counters: ${state.counters.join(" | ")}`);
  await page.close();
}

await browser.close();

console.log("\n=== QA RESULT ===");
if (problems.length === 0) console.log("no problems found");
else problems.forEach((p) => console.log(`  ! ${p}`));
