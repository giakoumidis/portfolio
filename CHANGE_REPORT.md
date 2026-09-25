# Portfolio Change Report

**Date:** 14 September 2026  
**Status:** Implemented locally; not committed

## Summary

This work restored a clean Next.js 16 and React 19 validation baseline while preserving the portfolio's existing animations and interaction design. It also brought the browser QA suite in line with the current homepage structure.

## Changes Made

### Hero introduction

**File:** `src/components/hero/HeroIntroSequence.tsx`

- Replaced render-time ref access with memoized hero lines.
- Removed effect-driven `started` and `finished` state where those values can be derived.
- Preserved the typewriter sequence and reduced-motion behavior.
- Ensured `onComplete` fires after the final line so the positioning copy and hero actions are revealed.

### Portfolio search

**File:** `src/components/nav/SearchPanel.tsx`

- Moved invalid-category correction into the query update event.
- Removed synchronous state changes from an effect.
- Preserved category reset behavior when a query no longer matches the selected facet.

### Animated counters

**File:** `src/components/ui/StatCounter.tsx`

- Removed synchronous state updates from the reduced-motion effect.
- Derived the displayed value for reduced-motion users.
- Kept the count-up animation for standard motion preferences.

### Typewriter component

**File:** `src/components/ui/Typewriter.tsx`

- Split conditional rendering from the active typewriter sequence.
- Replaced completion state with a ref to prevent duplicate callbacks.
- Preserved reset-on-disable behavior through child unmounting and remounting.
- Preserved delayed typing, cursor behavior, completion pauses, and reduced-motion output.

### Background music player

**File:** `src/components/ui/BackgroundMusic.tsx`

- Introduced React 19 effect events for long-lived media and YouTube callbacks.
- Removed stale-closure dependency warnings without repeatedly registering listeners or rebuilding the player.
- Replaced the mobile YouTube thumbnail `<img>` with Next.js `Image`.

### Image configuration

**File:** `next.config.ts`

- Added a narrowly scoped remote image pattern for YouTube thumbnails from `i.ytimg.com/vi/**`.

### Browser QA

**File:** `scripts/qa.mjs`

- Updated section assertions for the current homepage: Profile, Portfolio Map, Selected Projects, Credibility, and Contact.
- Replaced the stale hero color-class selector with a structural selector.
- Replaced a fixed animation delay with a bounded completion wait.
- Added a regression check ensuring hero follow-up content becomes visible.
- Updated reduced-motion counter selectors.
- Made the script return a failing exit code when it finds problems.

## Verification

All checks passed:

| Check | Result |
| --- | --- |
| `npm run lint` | Passed with zero warnings or errors |
| `npm run typecheck` | Passed |
| `npm run validate:content` | Passed: 15 projects, 3 infrastructure entries, 20 research outputs, and 69 taxonomy terms |
| `npm run build` | Passed; 31 pages generated successfully |
| `npm run qa -- http://127.0.0.1:3003` | Passed at 360px, 768px, 1024px, and 1440px |
| Reduced-motion QA | Passed |
| Console and overflow checks | No errors or horizontal overflow |

## Current Development Server

The development server is running at:

- Local: `http://localhost:3003`
- LAN: `http://192.168.1.179:3003`

Port 3000 was already occupied, so Next.js selected port 3003.

## Repository State

The changes are present in the working tree and have not been committed. No unrelated files were changed.
