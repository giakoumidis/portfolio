import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/home/nikolaos/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-gpu"],
});

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide", width: 1920, height: 1080 },
];

const PAGES = ["/", "/projects", "/laboratories", "/research", "/archive", "/resume"];

function summarize(el) {
  const text = (el.text || "").replace(/\s+/g, " ").trim().slice(0, 80);
  return `${el.tag}.${el.cls} "${text}" overflowX=${el.ox} overflowY=${el.oy} box=${el.w}x${el.h}`;
}

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  await page.addInitScript(() => {
    try {
      localStorage.setItem("hero-intro-seen", "1");
    } catch {}
  });

  console.log(`\n======== ${vp.name} ${vp.width}x${vp.height} ========`);

  for (const path of PAGES) {
    await page.goto(`http://localhost:3003${path}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(800);

    const overflows = await page.evaluate(() => {
      const hits = [];
      const all = document.querySelectorAll("body *");
      for (const node of all) {
        if (!(node instanceof HTMLElement)) continue;
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const rect = node.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) continue;
        const ox = node.scrollWidth - node.clientWidth;
        const oy = node.scrollHeight - node.clientHeight;
        const text = (node.innerText || node.textContent || "").trim();
        // Ignore containers that scroll on purpose
        if (style.overflowY === "auto" || style.overflowY === "scroll") continue;
        if (ox > 2 || (oy > 4 && text.length > 0 && text.length < 80 && node.children.length === 0)) {
          hits.push({
            tag: node.tagName.toLowerCase(),
            cls: (node.className && typeof node.className === "string" ? node.className : "").slice(0, 90),
            text: text.slice(0, 100),
            ox: Math.round(ox),
            oy: Math.round(oy),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          });
        }
      }
      // Also flag elements that stick out of the viewport horizontally
      const off = [];
      for (const node of all) {
        if (!(node instanceof HTMLElement)) continue;
        const rect = node.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) continue;
        if (rect.right > window.innerWidth + 2 || rect.left < -2) {
          const text = (node.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60);
          if (!text) continue;
          off.push({
            text,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            vw: window.innerWidth,
            cls: (typeof node.className === "string" ? node.className : "").slice(0, 70),
          });
        }
      }
      return { hits: hits.slice(0, 25), off: off.slice(0, 12) };
    });

    if (overflows.hits.length || overflows.off.length) {
      console.log(`-- ${path}`);
      for (const h of overflows.hits) console.log("  OVER", summarize(h));
      for (const o of overflows.off) console.log(`  OFFSCREEN "${o.text}" L${o.left} R${o.right}/${o.vw} ${o.cls}`);
    }
  }

  // Homepage gap measurement
  await page.goto("http://localhost:3003/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const gaps = await page.evaluate(() => {
    const ids = ["hero", "profile-proof", "selected-projects", "laboratories", "archive", "contact"];
    const rows = [];
    for (let i = 0; i < ids.length - 1; i++) {
      const a = document.getElementById(ids[i]);
      const b = document.getElementById(ids[i + 1]);
      if (!a || !b) continue;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      // content bottom of a vs content top of b — use last meaningful child vs first heading
      const aContent = a.querySelector("h1, h2, p, a, button") ? [...a.querySelectorAll("h1,h2,p,a,button")].at(-1) : null;
      const bHeading = b.querySelector("h2, h1");
      const ac = aContent?.getBoundingClientRect();
      const bh = bHeading?.getBoundingClientRect();
      rows.push({
        from: ids[i],
        to: ids[i + 1],
        sectionGap: Math.round(br.top - ar.bottom),
        contentToHeading: ac && bh ? Math.round(bh.top + window.scrollY - (ac.bottom + window.scrollY)) : null,
        aH: Math.round(ar.height),
        shellPad: (() => {
          const shell = b.querySelector(".section-shell");
          if (!shell) return null;
          const cs = getComputedStyle(shell);
          return { pt: cs.paddingTop, pb: cs.paddingBottom, pl: cs.paddingLeft, pr: cs.paddingRight, w: Math.round(shell.getBoundingClientRect().width) };
        })(),
      });
    }
    const hero = document.getElementById("hero");
    const heroBox = hero?.getBoundingClientRect();
    const cta = hero?.querySelector("a");
    const ctaBox = cta?.getBoundingClientRect();
    return {
      rows,
      heroH: heroBox ? Math.round(heroBox.height) : null,
      ctaBottomGap: heroBox && ctaBox ? Math.round(heroBox.bottom - ctaBox.bottom) : null,
      vw: window.innerWidth,
    };
  });
  console.log("GAPS", JSON.stringify(gaps, null, 2));

  // Search overflow
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(400);
  const input = page.locator("input[type=search]");
  if (await input.count()) {
    await input.fill("a");
    await page.waitForTimeout(300);
    const searchOverflow = await page.evaluate(() => {
      const dialog = document.querySelector("[role=dialog]");
      if (!dialog) return { error: "no dialog" };
      const badges = [...dialog.querySelectorAll("a span")].slice(0, 30).map((node) => {
        const el = node;
        const rect = el.getBoundingClientRect();
        return {
          text: (el.textContent || "").trim().slice(0, 40),
          ox: el.scrollWidth - el.clientWidth,
          oy: el.scrollHeight - el.clientHeight,
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          sw: el.scrollWidth,
          cw: el.clientWidth,
        };
      }).filter((b) => b.ox > 1 || b.oy > 2);
      return { badges };
    });
    console.log("SEARCH", JSON.stringify(searchOverflow, null, 2));
    await page.screenshot({ path: `/tmp/pf-audit/${vp.name}-search.png` });
  }

  await page.close();
}

await browser.close();
