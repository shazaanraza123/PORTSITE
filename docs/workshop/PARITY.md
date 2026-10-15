# Step 0: parity with the approved Collection Study

Source of truth: `docs/workshop/reference/the-workshop-collection-study.html` (the approved prototype, unchanged).

## What was ported
- `src/workshop/engine/{bench,wall,room,sound,mount}.js`, `src/workshop/data/*`, `src/workshop/styles/workshop.css`, `src/components/WorkshopRoom.tsx`, `public/workshop/*.jpg`. Copied from the handoff.
- `three@0.128.0` pinned exact.
- Homepage = `<WorkshopRoom/>`. The old single-page site moved to `src/LegacyApp.tsx` (kept, not rendered). Its content components are untouched.
- The homepage no longer loads Tailwind or `index.css`. The prototype never had them, and Tailwind preflight (list styles, borders) plus the old `body { cursor: none }` changed its look. `src/workshop/styles/base.css` reproduces the prototype's base reset. `index.html` adds the workshop fonts and `viewport-fit=cover`.

## Changes vs the approved source (all behavior-preserving)
| File | Lines | Why |
|---|---|---|
| mount.js | 13 | Every listener on a persistent element uses one `AbortController` lifetime, so React StrictMode's mount/unmount/mount can't double them (a doubled handler makes Index and the drawer open and close on one click). Also exposes `root.__workshop` for tests. |
| bench.js, wall.js | 3 | Same lifetime signal on the tag close, keydown and drawer handle. |
| bench.js | 2 | **Race fix, present in the prototype too.** After a jump from the wall to a bench object (e.g. wallet sketch → "on the bench"), the object could open and then close itself, because the bench is paused while you're on the wall and its camera value goes stale. Now: close-on-leave checks the camera *target*, and the bench resyncs its camera value when it resumes. Reproduced on the unmodified prototype in a headless run. |

## How parity was checked (headless Chromium, software WebGL, Math.random seeded identically)
- **DOM geometry:** every wall item (24) + 6 UI anchors (nav, name, turn tape, meter, hint, canvas), measured at 1440x880, 1024x768, 390x844 → **0 differences**.
- **Source:** engines/styles/data/markup/assets byte-identical except the lines above. Asset set and bytes identical (36 files).
- **3D at rest:** 3% of pixels differ, all on object edges (sub-pixel) plus the hover label. Mid-transition frames can't be compared frame-exactly here: both builds run at 1.3 fps on software GL, and the camera eases per frame. Same code path either way.
- **Flows:** index → archive → search, index → belt → see the thinking → wall, drawer, map unfold, wall sketch → wallet on the bench, mobile wall and drawer. All pass on the port with no console errors.

## Known pre-existing issue
`npm run lint` crashes on `main` too: `reactHooks.configs.flat` is undefined with the installed `eslint-plugin-react-hooks@5`. Not touched in this step.
