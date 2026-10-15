# Step 5: transition, interactions, navigation, performance

Run against `npm run build && npx vite preview --port 4173`, desktop (1440x900) and phone (390x844, touch, 3x) in headless Chromium with software GL. Scripts are in `docs/workshop/tests/` (`npm i playwright-core axe-core` next to them; `s5-common.js` points at the browser binary).

Software GL renders about 1 fps, so anything time-based (easing, momentum) was also checked with the renderer paused. Real devices should still get a quick hand test before merging (list at the bottom).

## Results

| Area | Check | Result |
|---|---|---|
| Transition | wall fade monotonic over 9 scroll points, wall clickable only once settled, `aria-hidden` flips at halfway, bench stops drawing on the wall and resumes on the way back, turn tape both ways | pass, desktop + phone |
| Navigation | bench "View project" → case page in place, back button, `/#b-` opens the object, `/#t-` highlights the sketch, wall and Index case links, "next", unknown slug | pass |
| Case pages | 11 pages, 0 broken images, no overflow, no console errors | pass, 1440 + 390 |
| Accessibility | axe (WCAG 2 A/AA + best practice) on bench, wall, case page | 0 issues after fixes, desktop + phone |
| Keyboard | Tab order, focus ring, Index open/search/Escape, object tag Escape, turn tape, flipping a wall card | pass |
| Reduced motion | turn tape jumps, no swing | pass |
| Touch | swipe on empty bench pans the page with momentum, objects still drag | pass |
| Memory | 18 round trips workshop ↔ case page: no GL context warnings, bench GL alive | pass (heap growth is the test harness holding logged canvases, verified by snapshot) |

## Fixed in this step
- **Phones couldn't swipe from the bench to the wall.** The 3D canvas took every touch (94% of the screen). A swipe on empty bench now scrolls the page (with momentum), so the camera rises to the wall under your finger. Picking up objects is unchanged.
- **Phone wall half-unscrollable.** Vertical swipes on pinned pieces now scroll the column. Taps and sideways nudges still work, and a swipe the browser takes over is no longer read as a tap (it used to flip cards by accident).
- **WebGL context leak.** Leaving the workshop disposed the renderer but kept its GL context; after ~16 trips to case pages Chrome started dropping contexts. Destroy now frees geometry, textures and the context.
- **Keyboard focus went into invisible things.** The closed object tag and the faded-out wall were still tabbable. They're now `visibility:hidden` / `inert` when not shown. Tab on the bench is now Index, About, Contact, the wall.
- **Escape didn't close the Index while typing in its search.** Fixed (focus returns to the Index tape).
- Object tag dialog had no name when closed (axe serious). Sticky-note textarea had no focus ring. "How I work" heading skipped a level.
- **Touch targets** (WCAG 2.2, 24px): the drawer handle and the small wall links get invisible touch area; on phones the column leaves room for each hanging "on the bench" tape; a flipped card comes to the front so its back links aren't under the next card.
- **Draw calls 428 → 206 per frame** by merging the stage crowd (90 boxes) and belt studs into one mesh each. Same random seed, same look (pixel-checked against the previous build).

## Numbers
- JS (gzip): shared 62KB, Workshop 196KB (mostly three.js), case page 14KB. Case pages never load three.js.
- Images: workshop 1.2MB, case pages 5.8MB total, lazy-loaded below the hero.
- Bench: 206 draw calls/frame including the shadow pass. Stops rendering entirely on the wall.

## Not changed, worth knowing
- `npm run lint` crashes on main too (eslint-plugin-react-hooks config), untouched.
- A long card back (the Rolling Stone clipping) runs a little past its card when flipped. Content from the approved prototype, left as is.
- The bench keeps rendering while you're on it even if nothing moves (the record and stage animate). Fine on laptops; worth watching on old phones.

## Hand test on real devices before merging
iPhone Safari and an Android Chrome: swipe bench → wall → back, drag the belt and turn it, flip a wall card, open the drawer, play the chopper, open a case page and come back, rotate the phone mid-transition.
