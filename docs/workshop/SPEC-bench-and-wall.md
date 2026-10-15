# THE WORKSHOP: The Bench & The Wall

Handoff for Shazaan Raza's portfolio homepage.
Status: **combined prototype, waiting for review.** Not production yet. If the review changes anything, re-export this package from the updated prototype before handing it to Cursor.

> The bench is what I make. The wall is how my mind works.

The rule for Cursor: **reuse this source, don't redesign it.** The engines in `src/workshop/engine/` are the exact code running in the prototype. React only mounts them.

---

## 1. What's in this folder

```
workshop-handoff/
  README.md                         this spec
  CURSOR_PROMPT.md                  paste into Cursor (Agent mode)
  prototype/
    the-workshop-bench-and-wall.html   the reviewed prototype, one working file (open it in a browser)
    originals/the-workshop-three-experiments.html   the original Bench / Machine / Wall studies, untouched
    main.vanilla.js                 how the prototype wires the engines (non-React reference)
    markup.html, build.py           how the single file was assembled (paths are relative to my workspace, reference only)
  src/
    components/WorkshopRoom.tsx     React wrapper: renders markup, mounts engines, cleans up
    workshop/engine/bench.js        THE BENCH (Three.js scene, objects, carry/inspect, camera rig)
    workshop/engine/wall.js         THE WALL (DOM board, drag swing, flips, folds, chopper, notes, drawer)
    workshop/engine/room.js         THE ROOM (scroll track -> viewpoint, crossfade, nav between the two)
    workshop/engine/sound.js        shared AudioContext
    workshop/data/content.js        project copy, links, work order
    workshop/data/assets.js         image key -> URL map
    workshop/styles/workshop.css    every token and style used
  public/workshop/*.jpg             13 images used (web-sized copies of files already in PORTSITE)
```

## 2. Dependencies and versions

| Package | Version | Why |
|---|---|---|
| three | **0.128.0** (pin it) | The engine uses r128 APIs (`renderer.outputEncoding`, `THREE.sRGBEncoding`, `texture.encoding`). See section 13 to upgrade. |
| react / react-dom | 19.x (PORTSITE already has ^19.2.6) | Only for the wrapper |
| Next.js (optional) | 14 or 15, App Router | If you move off Vite |
| Fonts | Google Fonts: Instrument Serif, JetBrains Mono 400/700, Caveat 500/700, Courier Prime 400/700, Newsreader 400 + italic | See section 6 |

No other libraries. No GSAP, no R3F, no Drei. Sound is the Web Audio API, synthesized in code (no audio files).

Font link (put in `index.html` or `app/layout.tsx`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Courier+Prime:wght@400;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap">
```

## 3. Drop-in steps

**Vite + React (the current PORTSITE repo)**
1. `npm i three@0.128.0`
2. Copy `src/workshop/` and `src/components/WorkshopRoom.tsx` into `src/`. Copy `public/workshop/` into `public/`.
3. Add the font link to `index.html`.
4. Render `<WorkshopRoom />` at the top of the homepage. Everything below it scrolls normally after the room.
5. The engines are plain JS. If TypeScript complains, add `allowJs: true` or a `declare module` shim. Don't convert them to TS logic-by-logic yet.

**Next.js App Router**
- Move `import "../workshop/styles/workshop.css"` into `app/layout.tsx` (global CSS can't be imported from a component).
- Load the room client-only: `const WorkshopRoom = dynamic(() => import("@/components/WorkshopRoom"), { ssr: false })`.
- Keep `public/workshop/` as is.

## 4. Architecture

```
WorkshopRoom (React, renders static markup once)
  createBench({ THREE, stage, holder, ui, assets, projects, links, Snd, isActive, onThinking, onAbout, onPointerDown })
    -> { setView(t), getView(), start(), stop(), resize(), inspectById(id), release(), showContact(), setSound(on), destroy() }
  createWall({ stage, board, hint, drawer, handle, assets, links, Snd, onBench })
    -> { layout(), highlight(id), openAbout(), destroy() }
  createRoom({ track, bench, wall, wallLayer, benchUI, toggle, meter })
    -> { goWall(then), goBench(then), apply(), progress(), destroy() }
```

Why imperative engines instead of React state: the bench runs a physics/render loop at 60fps and the wall runs per-item spring physics. Putting those in React state would cost performance and invite a rewrite. React owns the markup. The engines own motion.

Cross-links between the two halves:
- Bench tag button "The thinking behind it" -> `onThinking(wallId)` -> room scrolls to the wall -> `wall.highlight(wallId)` (z-raise, red outline pulse, swing).
- Wall button "finished version, on the bench" -> `onBench(benchId)` -> room scrolls to the bench -> waits until the camera settles (`getView() < .08`) -> `bench.inspectById(benchId)`.
- Bench "About" tape and business card -> room scrolls to the wall -> `wall.openAbout()` unfolds the note.

| Bench object | id | Project | Wall counterpart |
|---|---|---|---|
| Phone | `phone` | YZY Mobile | paper prototype `phone` |
| Record on turntable | `disc` | Spotify Samples | sample chopper `chop` |
| Paper sketch | `sketch` | Spotify Map | tracing paper `trace` |
| Coiled belt | `belt` | KWL Studio | cardboard star `star` |
| Stage model | `stage` | Ye Tour Media | Tampa polaroid `tampa` |

## 5. The transition (how the two become one room)

One sticky viewport (`.room-vp`, `100svh`) sits inside a tall scroll track (`.room-track`, `340vh`). Ordinary page scroll gives progress `p` from 0 to 1. Nothing hijacks the wheel. Trackpads, keyboards, scrollbars and the "look up at the wall" tape all just scroll the page.

| p range | What happens |
|---|---|
| 0.00 to 0.12 | Rest at the bench. Bench UI fully visible. |
| 0.08 to 0.30 | Bench UI (tapes, list, hint) fades out. Bench input turns off once the camera passes `viewS > .25`. |
| 0.12 to 0.72 | `bench.setView(smoothstep)`: the camera moves from the bench pose to the wall pose with a cubic ease, plus an arc that lifts it up to 1.2 units mid-move (it reads as standing up and looking up, not sliding). |
| 0.48 to 0.86 | The DOM wall layer fades in and swings into place: `perspective(1400px) translateY((1-w)*6%) rotateX((1-w)*24deg) scale(.9 + .1w)`, origin bottom center. |
| 0.86 to 1.00 | Rest at the wall. The wall becomes interactive at `w > .95`. The 3D render loop **stops** once `w > .995` (no GPU cost while you're on the wall). |

Continuity details:
- The 3D wall behind the bench has painted pin-ups (Tampa, Arnhem, Rolling Stone, the map screen, the KWL brand sheet, a paper phone, a note, a tape strip) placed roughly where the real DOM items sit. You see them arrive in 3D, then the real wall takes over.
- At the wall pose the camera looks over the bench's back edge, so the concrete becomes the wall's desk.
- The camera smooths toward its target with `1 - exp(-dt*6)` (`*30` with reduced motion), so fast scrolling still eases.

Camera poses (set in `resize()` by aspect ratio):

| Aspect | fov | Bench pos | Bench look | Wall pos | Wall look |
|---|---|---|---|---|---|
| < 0.9 (phone portrait) | 46 | (0, 12.8, 8.6) | (0, 0, .35) | (0, 2.6, 6.8) | (0, 2.4, -6.5) |
| 0.9 to 1.35 | 40 | (0, 9.6, 8.2) | (0, 0, .35) | (0, 2.4, 5.6) | (0, 2.2, -6.5) |
| > 1.35 (desktop) | 33 | (0, 7.6, 7.7) | (0, 0, .35) | (0, 2.25, 5.0) | (0, 2.05, -6.5) |

Mouse parallax at the bench: camera x ± .35, y ± .2, fading to zero as the view moves to the wall. Off with reduced motion.

**Alternative considered:** flying the 3D camera into a 3D version of the wall. Rejected: the wall needs crisp selectable text, real links, form inputs and cheap drag physics, which are all better as HTML. The 3D pin-ups + DOM crossfade keep the "same room" feeling without that cost.

## 6. Typography

| Role | Face | Where | Sizes |
|---|---|---|---|
| Display serif | Instrument Serif 400 / italic | tag titles, Work list, page header | tag h3 34px; list 22px; header clamp(30px, 4vw, 56px) |
| Utility mono | JetBrains Mono 400/700 | label-maker tapes, metadata, card texture | tapes 12px/700, letter-spacing .22em, uppercase; name tape 15px |
| Hand | Caveat 500/700 | wall notes, captions, sketches, canvas textures | 19 to 44px (name strip 44px) |
| Typewriter | Courier Prime 400/700 | wall cards (how I work, index, about content, drawer, tobench) | 11.5 to 14px |
| Body serif | Newsreader 400 | tag paragraphs, notes band | tag p 15px/1.45; notes 17px |

Canvas textures in the 3D scene (sketch, note, card, record label) are redrawn once the fonts load (`document.fonts.load(...)`), so they never bake in a fallback font.

## 7. Color tokens (from workshop.css `:root`)

`--paper #EDE8DF`, `--ink #1B1A18`, `--ink-2 #4D4943`, `--rule #B9B0A2`, `--pop #C2410C` (focus + meter dot), `--room #BDB3A4` (= 3D background and fog), `--a-tape #141312`, `--a-tape-ink #F2EFE8`, `--a-tag #F4F0E6`, `--c-wall #E9E1D3`, `--c-paper #FBF8F1`, `--c-pencil #3A3631`, `--c-tape rgba(236,226,196,.82)`, `--c-red #B3261E`.
Single theme on purpose (it's a physical room). The page always sets its own background.

## 8. Layout measurements

**Room:** track `340vh`. Viewport `100svh`, sticky top 0, overflow hidden.
**Bench UI:** top row inset 18px (plus safe area). Name tape rotated -1.2deg, typed sub-label +.6deg. Nav tapes alternate +1 / -1.4deg, gap 8px, min-height 34px. Work list: right 18px, top 70px, width min(340px, 100% - 36px), rows min 44px. Hang tag: left 18px, bottom 18px, width min(370px, 100% - 36px), padding 18/18/16/26, notched clip-path 18px, show/hide spring `cubic-bezier(.2,.9,.3,1.3)` .35s. Hint: bottom center 22px, 10.5px caps. "look up at the wall" tape: bottom-right 18px, rotated -1.5deg. Meter: left 14px, vertically centered, 110px bar, 9px dot at `--p`.

**Wall board:** a fixed design space scaled to fit. Desktop is 1360px wide (scale capped at 1.2). Phone (< 700px) is 560px wide. Usable height = `DH - 120` on desktop (desk strip is 120px; 96px on phone) and `DH * .62` on phone. Positions are fractions of [design width, usable height]:

| Item | w x h | rot | desktop [x, y] | phone [x, y] | Notes |
|---|---|---|---|---|---|
| name strip | 440x110 | -1 | .035, .05 | .04, .03 | Caveat 44 on tape + typed sub-label |
| how I work card | 270x236 | 1.2 | .04, .25 | .04, .19 | ruled index card |
| about (folded) | 170x118 -> open 310x300 | -3 | .235, .28 | .55, .21 | click/Enter unfolds |
| Spotify Map screen | 380x197 | .5 | .37, .07 | .08, .43 | under the tracing paper |
| tracing paper | 384x200 | -1.4 | .368, .066 | .078, .426 | drag aside to reveal screen |
| Tampa polaroid | 190x250 | 4 | .69, .04 | .56, .47 | flip: back note + link to stage |
| Arnhem polaroid | 170x228 | -5 | .845, .12 | .7, .6 | pin, flip |
| Rolling Stone clip | 200x238 | -3 | .63, .44 | .06, .66 | flip |
| paper YZY phone | 130x260 | -2 | .25, .5 | .38, .66 | flip -> real shop screen |
| cardboard star | 150x150 | 12 | .47, .4 | .7, .38 | single click flips -> KWL911 |
| KWL brand print | 230x130 | 2 | .38, .6 | .42, .85 | taped |
| sample chopper | 300x200 | -1 | .76, .47 | .3, .92 | canvas + 4 pads |
| pinned refs | 230x150 | -2.5 | .8, .79 | .62, .02 | taped |
| sticky pad | 200x170 | 2 | .045, .61 | .6, 1.08 | textarea + stick button |
| drawer | min(420px, 60%) | | bottom center, 22px | left, min(240px, 58%) | opens to 150px |

## 9. 3D objects (bench.js)

Units: the table top is y = 0, 1 unit ≈ 10cm. All materials are `MeshStandardMaterial` unless noted. Every mesh casts and receives shadows.

| Object | Geometry | Material | Position / rotY | Behavior |
|---|---|---|---|---|
| Table | Box 11.5 x .6 x 6.6 | procedural concrete map + bump .015, rough .96 | y -.3 | receives shadows |
| Back wall | Plane 50 x 18 | procedural plaster (repeat 4x2), rough 1 | (0, 5, -6.5) | pin-ups at z -6.47 |
| Floor | Plane 60 x 40 | #8E8477 | y -3.4 | |
| Phone | Box .82 x .075 x 1.68 | #1c1b19 r.42 m.15; screen Plane .74 x 1.6 MeshBasic (toneMapped false) | (-2.75, -, .75) / .3 | screens cycle shop/album/disco |
| Belt | 2 open Cylinders r .66/.58 h .24 (72 seg) + lips | leather: quilted map, colorways black #1b1a19, red #7d1717, white #e7e3da, yellow #cfae1c, r.62, DoubleSide | (1.95, -, 1.3) / -.5 | colorway buttons |
| Star buckle | Extruded star R .3 r .135 depth .07 bevel .014 | #121211 r.58 m.25 | on the coil | |
| Star studs (10) | Extruded star R .05 r .022 depth .012 | #111110 | around the coil | |
| Turntable | base Box 2 x .17 x 1.66 (#2e2c29), platter Cyl r .74 h .05 (#1a1918 m.35), tone arm Box .035 x .03 x 1.0 (#bdb6aa m.6) | | base (-.35, -, -1.55) | arm swings to -.55 rad when playing |
| Record | Cyl r .69 h .022 (groove texture r.32 m.25) + label Circle r .23 | | on platter, y .22 | spins 3.46 rad/s (33rpm) on platter |
| Stage model | base Box 1.75 x .14 x 1.35 (#E2DCCF), dome Sphere r .46 half (earth texture), figure, ~90 crowd boxes .018 | | (3.55, -, -1.35) / -.35 | red SpotLight 0xff3018 (0 -> 3.2 ± .4 flicker), additive haze cone |
| Sketch | 2 Planes 1.95 x 1.12 (front: drawn sketch; back: passport screen, mirrored) | r.95 / .9 | (.45, -, .55) / -.12 | double-click flips (lift .45 during flip) |
| Swatches (3) | Box .52 x .06 x .52 | concrete / rubber #1f1e1c / red quilt | stacked at (-4.05, -, -1.75) | liftable |
| Paperweight | Dodecahedron r .36 detail 1, scale (1, .6, 1.1), flatShading | #8c8478 + concrete map | (-1.0, -, 1.95) | weight 3.2, covers the note |
| Note | Plane .66 x .45, handwriting texture | | under the stone | hidden discovery |
| Card | Box 1.05 x .014 x .6, top face texture | | (3.05, -, 2.05) / .18 | opens "who made all this" |
| Pencil | hex Cyl r .034 l 1.1 + cone tip | | (-1.75, -, -.15) / .6 | hops on click |

Lights: Hemisphere (0xfff3e4, 0x5e554b, .62). Sun: Directional 0xffe6c8, 2.1 (1.5 while inspecting), pos (-7, 10, 4.5), shadow map 2048, ortho ±8 x ±7, bias -.0004, normalBias .02, PCFSoft. Fill: Directional 0xdfe6ff .28 at (6, 4, 6). Renderer: ACES filmic, exposure 1.08, sRGB output, pixel ratio ≤ 2. Fog #BDB3A4 15 to 30.

## 10. Interaction logic and animation parameters

**Bench**
- Pick: raycast all registered groups. Click = pointer up within 350ms and < 5px of movement.
- Carry: target follows the pointer on the y = 0 plane, clamped x ±5.2, z ±2.9. Follow rate `1 - exp(-dt * 14 / weight)`. Lift to ground + liftH (.6, stone .45) at rate `10 / weight`. Tilt = velocity x .07 / weight, clamped ±.45 rad, eased at dt x 10.
- Drop: gravity 24 u/s². Bounce if impact speed > 2.2 (restitution .22, plays a thump). Tilt decays `exp(-dt*8)`.
- Ground: 0 on the table, .17 on the turntable base, .22 on the platter.
- Turning: hold an object and scroll (deltaY x .004), or Q / E. A free wheel scrolls the page (that's how you walk to the wall).
- Inspect: the object flies to camera + forward 2.6 (3.4 on narrow screens), down .12, scale 1.2 to 1.7 by object. Position/rotation/scale lerp at `1 - exp(-dt*9)`. Drag rotates (dx, dy x .012 rad). Arrow keys ±.25 rad. Esc or click empty space puts it back.
- Weights: phone 1, belt 1.1, record .8, stage 1.5, sketch .6, swatches .7, note .5, stone 3.2, card .5, pencil .6.
- Record: plays when it rests within .25 of the platter center. Sound loop is 82 bpm, 4 chords (Am7, Fmaj7, G7, Em7), kick on every beat, lowpass 1600Hz. Only with sound on.

**Wall**
- Drag threshold 4px (in design units). Clamp x [-.4w, DW - .6w], y [-20, DH - 40].
- Swing: target angle = -pointer velocity (px/ms) x 16, clamped ±18deg. Spring stiffness 140, damping `exp(-dt*6)`. Flip impulse ±40, highlight impulse 90, new note 80.
- Flip: double-click / double-tap within 340ms (the star flips on a single click). CSS rotateY .6s `cubic-bezier(.3,.7,.2,1)`.
- Unfold: about note grows 170x118 -> 310x300, keyframes scale(.5,.5) -> (1,.5) -> (1,1) over .75s.
- Keyboard: every item is focusable. Enter/Space flips or unfolds. Arrow keys move it 12px.
- Chopper: a 2-bar 90 bpm loop synthesized at 22.05kHz (kick, snare, hats, 2 chords, 2 melodic blips). Three draggable markers (min gap .04) slice it into 4 pads. Pads play their slice with 5ms/20ms fades, plus a red playhead.
- Sticky notes: up to 10, saved in `localStorage["shazport-wall-notes"]` (only in that visitor's browser).
- Drawer: height 0 -> 150px, .5s.
- Highlight: red outline pulse 2.2s + swing.

## 11. Responsive behavior

- < 700px: the wall switches to the 560px design and phone positions. The desk is 96px. The drawer moves left. Hint and meter hide. Camera poses switch by aspect (section 5).
- Touch: the bench canvas uses `touch-action: none` so objects drag. On phones the "look up at the wall" tape is the main way between the two halves (the header and notes still scroll normally). Wall items drag by touch, and the background between them scrolls.
- Reduced motion: no parallax, no idle sun drift, camera and wall snap instead of tweening, no swing, no flip/unfold animation.

## 12. Status: working vs placeholder vs proposed

**Working now (in the prototype)**
- Scroll transition bench -> wall with camera arc, 3D pin-ups, DOM crossfade/swing, render pause.
- Both cross-link directions, About -> unfold, Work list -> inspect, Contact tag, Sound toggle.
- Every bench interaction: carry, drop, turn, inspect, screens, colorways, record + music, stage lights, sketch flip, stone + hidden note, card.
- Every wall interaction: drag swing, photo flips, tracing paper reveal, paper phone flip, star flip (KWL911), unfold, chopper, sticky notes, drawer, highlight.

**Placeholders (need real content)**
- `LINKS.email` = "[your email]". `LINKS.caseStudy` and `LINKS.resume` point at the current site. Each project needs its own case study route.
- Wall copy in Shaz's voice is my draft: "how I work" (5 lines), "pinned refs", photo backs, the stone note. Rewrite it in your own words.
- Images are web-sized copies. The 3D pin-ups are approximate positions, not pixel-matched to the DOM.

**Proposed, not built**
- Case study pages (one route per project), reached from the tag's "Case study".
- Optional subtle sound for the transition (a chair scrape / room tone), off by default.
- Wall items you rearranged could persist in localStorage (same pattern as the notes).
- Swapping the procedural 3D objects for modelled GLB assets later (keep the same ids and weights).

## 13. Known limits and production TODOs

- three r128 -> newer: replace `renderer.outputEncoding = sRGBEncoding` with `renderer.outputColorSpace = THREE.SRGBColorSpace`, and `texture.encoding = sRGBEncoding` with `texture.colorSpace = THREE.SRGBColorSpace`. Lights got brighter in r155 (`useLegacyLights` removed), so retune the sun (try ~2.5x) and the spot.
- The 3D bench is not screen-reader navigable. The Work list tapes are the accessible path to every project, so keep them.
- The "finished version, on the bench" tags are 28px tall. Grow them to 44px for touch in production.
- WebGL fallback shows a message. The Work list still works, but inspect needs the scene. Production should fall back to a static bench image + list.
- Performance: one 2048 shadow map, about 130 meshes. Merging the crowd boxes into one InstancedMesh is an easy win.
