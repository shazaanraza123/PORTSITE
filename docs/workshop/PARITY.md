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

# Step 1: object realism (separate commit)
- **Star Belt 001:** was two concentric open cylinders plus a box. Now one continuous strap wound in a 1.6-turn Archimedean spiral (r .44 to .67, 260 samples). Three smooth surfaces: quilted face (colorway A, diamond quilting + dashed stitching on both edges, light bump), lining (colorway B, stitched edges), painted edges. A rounded tip with three punched holes at the inner end. Star studs every 0.2 units along the face. Two keeper loops and the star buckle (with its bar) at the outer end, as in the drawing. Reverse swaps face and lining. Inspect pose `[-.6, 2.2, 0]` at scale .5 turns the buckle to the viewer, like a product shot.
- **Peak Wallet 002:** painted edge (darker, slightly glossy), leather grain via bump from its own texture. "Turn it over" now flips in the wallet's own frame (it used to spin edge-on).
- **Phone:** rounded-rect slab (r .12) with bevel, glass front, metal band, side buttons, faint glass sheen over the screen.
- **YE ARCHIVE catalog:** brass label frame and a brass drawer pull.
- Engine: optional per-item `inspectEuler` and a local flip quaternion. Nothing else changed.

# Step 2: wall composition (separate commit)
- Cleared the pile-up at center-right. The cardboard star (now 100px) rests on the end of its own belt drawing. The chopper moved down 30, the contact sheet down 10, and the campaign prints spread right. Overlaps over 12% between unrelated items: 3 → 0 at 1440x880 and 1280x720 (measured).
- Pencilled headings over the three right-hand groups ("where ideas start", "making it real", "out in the world"). Real headings (`role=heading`, level 2) for screen readers, hidden on phones where the pile reads in order.
- The board fits by height as well as width (`scale = min(W/1360, H/860, 1.2)`), and the desk is reserved in screen pixels. Nothing slides under the desk at 1280x720 any more (the Rolling Stone clipping did).
- "fan page" caption fits its print. On phones the pile starts lower so the pinned nav doesn't cover it.
- Known, left for step 3: the nav tapes cover two of the headings at the top right.

# Step 3: less navigation and instruction clutter (separate commit)
- Pinned tapes: 5 → 3 (Index, About, Contact). Resume moved into the Contact card, the About note and the Index (new "Me" group: About, Resume, Contact). Sound moved into the record's own controls (Sound on/off, `aria-pressed`). It only ever affected the record and drop thumps; the chopper pads play on press as before.
- On the wall the tapes sit on the desk edge to the left of the drawer (desktop), so they no longer cover the pinned work or the headings. The drawer centers in the space between the tapes and the turn tape. Phones: tapes bottom-left on the bench, top on the wall.
- The turn tape reads "the wall ↑" / "↓ the bench" (its `aria-label` is still a full sentence). The bench/wall rail lost its words and got slimmer. The first-touch hint is quieter.
- The wall's "on the bench" links show on hover or keyboard focus for mouse users (and while an item is highlighted). They stay always visible on touch screens. Every link is still a focusable button in the DOM.
- Measured: nothing on the wall sits under the tapes at 1440x880, 1024x768 or 390x844. Visible bench-links at rest on desktop: 7 → 2 (the two inside content).
- Also fixed: the pinned refs list ran past its card (it did in the approved prototype too).

# Step 4: case-study pages (separate commit)
- 11 pages at `/work/<slug>`: the six bench projects, Spotify Map, and the four wall campaigns (Yeezy marketing, LA Apparel, artist marketing, creative journey). One template (`src/cases/CaseStudy.tsx`) in the Workshop's language: the real artifact leads, then role/year/status/tools, then sections.
- Content comes from `src/data/projects` (the copy that was already on shazport) and the real screenshots, drawings, flyers and clips in `public/cases/` (60 optimized JPEGs). Each page ends with a plain "Sources" line. Nothing invented: no metrics, no shipped status that isn't true, product mockups labelled as mockups. Nothing from the 2021 KW deck.
- Spotify Map has a Code link only. The old live URL wasn't verified, so it's left off.
- Routing: tiny path router in `App.tsx`, no new dependency. Same-origin links are intercepted, so "View project" on the bench, "case study" in the Index and on the wall, and "next" all navigate in place. Back returns to the workshop. Unknown slugs get a plain not-found page.
- Links back in: "On the bench" (`/#b-<id>`) opens that object, "The thinking, on the wall" (`/#t-<id>`) walks up and highlights the sketch.
- Code split: case pages don't load three.js (CaseStudy chunk about 44KB, WorkshopRoom about 755KB).
- Checked: all 11 pages 200, 0 broken images, no horizontal overflow, no console errors at 1440 and 390 wide. Flow test passes (bench → case in place, back, both deep links, wall and index case links, next, unknown slug).
