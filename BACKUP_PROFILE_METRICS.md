# Backup: homepage Profile metrics dashboard

**Captured:** 24 September 2026  
**Status:** Snapshot taken before the dashboard was removed from the homepage Profile section.  
**Reason:** The six-cell scoreboard was judged visual noise. The figures themselves stay valid and are still defined in content and in `public/llms.txt`.

## Where it rendered

The live dashboard was the right column of the homepage Profile section (`#profile-proof`), component `src/components/sections/ProfileProof.tsx`. On desktop it sat beside the role, bio, collaboration line, and “Experience & background” link. The KUKA photograph stayed in the left column, under that copy. On small screens the grid stacked under the photograph.

An unmounted copy of the same grid still exists in `src/components/sections/About.tsx`. That component is not imported by any page.

The `/profile` route does not render this grid.

## What was on screen

A 2×3 grid of equal tiles (`grid-cols-2`, 1px `border-grid-dim` gaps, `bg-bg-raised` cells). Each tile used `StatCounter`: cyan figure, dim prefix/suffix, all-caps mono label.

| Display | Value | Prefix | Suffix | Label |
| --- | --- | --- | --- | --- |
| 15+ | 15 | — | + | Years in robotics & research engineering |
| 100+ | 100 | — | + | Research and technical users supported |
| US$9M+ | 9 | US$ | M+ | Research assets stewarded across shared platforms |
| 3 | 3 | — | — | Major shared research platforms |
| 30+ | 30 | — | + | Publications |
| 4 | 4 | — | — | First-prize awards |

Source array: `profile.stats` in `src/content/profile.ts`. Type: `Stat` / `Profile.stats` in `src/lib/types.ts`.

## How to read the figures

These definitions are the ones already written for downstream use. Keep them if the tiles are restored.

- **100+** is faculty, researchers, students, and technical staff supported across shared facilities. It is a user community, not a direct-report headcount.
- **US$9M+** is research assets stewarded across shared platforms. It is distinct from procurement (about US$800K average annual, peak years approaching US$3M) and from commercial revenue.
- **3** is the three shared research platforms (Kinesis, photonics, high-throughput screening). The laboratories section already shows them.
- **30+** publications and **4** first-prize awards are repeated on the homepage credibility strip (publications, citations, first-prize count).
- **15+ years** is also the opening clause of the Profile blurb in `src/content/homepage.ts`.

`scripts/qa.mjs` reads `#profile-proof p.font-mono` under reduced motion and logs the counter text. It does not fail when that list is empty.

## Markup that was removed

Desktop layout wrapper was `grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16`. The left child held the copy and the photograph. The right child was:

```tsx
<Reveal delay={0.16}>
  <div className="grid grid-cols-2 gap-px border border-grid-dim bg-grid-dim">
    {profile.stats.map((stat) => (
      <div key={stat.label} className="bg-bg-raised">
        <StatCounter
          value={stat.value}
          label={stat.label}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </div>
    ))}
  </div>
</Reveal>
```

`StatCounter` (`src/components/ui/StatCounter.tsx`) renders the verified value immediately:

```tsx
<div className="px-5 py-6">
  <p className="font-mono text-3xl font-bold tracking-tight">
    {prefix && <span className="text-text-dim">{prefix}</span>}
    <span className="glow-cyan">{value}</span>
    {suffix && <span className="text-text-dim">{suffix}</span>}
  </p>
  <p className="label-mono mt-2 text-text-dim">{label}</p>
</div>
```

## Restore

1. Put the grid markup back as the second column of the `lg:grid-cols-[1.1fr_1fr]` wrapper in `ProfileProof.tsx`.
2. Re-import `StatCounter`.
3. Keep `profile.stats` as the data source. Do not invent new figures.
4. `About.tsx` already contains the same grid if a second copy is needed; it is not on a route.
