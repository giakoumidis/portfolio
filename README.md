# Nikolaos Giakoumidis — Portfolio

A single-page portfolio for a robotics, AI, and autonomous systems engineer, built around a
**synthwave / mission-control** aesthetic: neon on near-black, an animated outrun grid horizon
with LiDAR-style point-cloud returns, CRT scanlines, glitch typography, real project photography
in a duotone HUD dress, and scroll-driven reveals.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Animation | Framer Motion + a hand-rolled 2D canvas for the hero grid |
| Fonts | Chakra Petch (display), JetBrains Mono (telemetry), Inter (body) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run qa         # accessibility / responsive / reduced-motion audit (dev server must be running)
npm run shot       # screenshot desktop + mobile into /tmp/pf
npm run perf       # measure hero frame timing
```

The QA scripts drive a local Chromium through Playwright. They expect a running dev server and
accept the URL as the first argument, e.g. `npm run qa -- http://localhost:3003`. If Playwright
cannot find a browser, set `CHROME_PATH` to a Chromium binary.

## Editing content

**All copy lives in `src/content/` as typed data — you should never need to touch JSX to update
the site.**

| File | Contents |
| --- | --- |
| `profile.ts` | Name, tagline, location, email, summary, social links, headline stats |
| `experience.ts` | Roles (reverse chronological) and education |
| `capabilities.ts` | The six capability domains |
| `stack.ts` | Tooling, grouped into three families |
| `publications.ts` | 30 publications, featured subset, patent, citation total |
| `awards.ts` | Awards and certifications |
| `posts.ts` | Selected LinkedIn posts (excerpt + outbound link), newest first |

Types for all of the above are in `src/lib/types.ts`. `src/lib/sections.ts` is the single source of
truth for section ids, ordering, and numbering — the navigation rail derives itself from it.

Projects can carry archive photographs via the optional `images` field (`ProjectImage[]`):
`src`, `alt`, a short telemetry-style `caption`, and an optional `orientation` hint. Source
photos live in `content-inbox/projects/`; web-ready exports go to `public/images/` at ~1600px
wide (use `sharp`, already a dependency). Photos render through the `RoboPhoto` duotone frame
and stack as rows in the project card's media column.

The downloadable CV is `public/cv.pdf`.

> The phone number on the CV is deliberately **not** in `src/content/`. It stays only inside the
> PDF, so it is not scrapable from the page source.

## Design system

Tokens and utilities are defined once in `src/app/globals.css`:

- **Colors** — `bg`, `bg-raised`, `panel`, `grid-dim`, `grid`, `cyan`, `magenta`, `violet`, `amber`,
  `text`, `text-dim`. Neon is only ever used for strokes, glows, and text — never as a large fill.
- **Utilities** — `label-mono` (the mono kicker style), `glow-*` (layered neon text shadow),
  `panel-glow-*` (layered neon box shadow), `section-shell` (shared section rhythm, including the
  right-hand gutter that keeps content clear of the fixed nav rail).

Reusable primitives live in `src/components/ui/`: `HudCard` (panel with corner brackets),
`NeonButton`, `SectionHeading`, `GlitchText`, `Typewriter`, `StatCounter`, `Reveal`, `Scanlines`,
`RoboPhoto` (real photograph in a cyan/magenta duotone HUD frame — hover restores true colour),
and `NodeGraph` (the decorative ROS-style computation graph in the Profile section, with packets
pulsing along its edges via CSS `offset-path`; pulses hide under reduced motion).

The hero canvas (`GridHorizon`) also renders a LiDAR layer: normalised point-cloud returns ride
the same depth field as the grid — cyan ground returns, magenta obstacle clusters — and a scan
wavefront sweeps outward, flashing returns as it passes their depth band. The hero's `CAM_02`
panel and the photos across Profile and Projects are real archive frames from the NYUAD CTP
labs and IRML (flight cage, KUKA teleoperation, HTS enclosure, eye-gaze wheelchair, motion-capture
teleoperation, android hardware).

`Reveal` is the one entrance animation used site-wide, so everything shares a single motion
signature. Stagger siblings by passing `delay={i * 0.08}`.

### Motion and accessibility notes

- Every animation honours `prefers-reduced-motion`. Motion is suppressed by collapsing durations,
  **not** by changing initial/target states — branching those on the media query produces a
  hydration mismatch, because it resolves to `false` during SSR.
- The hero canvas pauses via `IntersectionObserver` once it scrolls offscreen, and fakes bloom with
  a wide translucent stroke under a thin bright one. Canvas `shadowBlur` looks slightly better but
  costs roughly 10x per stroke, and with ~50 lines per frame it starved the main thread.
- Neon is reserved for display type and short mono labels; body copy uses `text` / `text-dim`, which
  clear WCAG AA against the background.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the final domain (it drives `metadataBase`, the canonical URL,
`sitemap.xml`, and `robots.txt`), then deploy to any Node or edge host. The default in
`src/lib/site.ts` is a placeholder.
