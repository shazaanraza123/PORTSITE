# THE WORKSHOP: Collection Study

Handoff package for Shazaan Raza's portfolio homepage. **Status: prototype for review, not production.** If the review changes things, re-export this from the updated prototype.

> The Wall shows where ideas come from. The Bench shows what they become. The drawer holds everything else.

Read in this order:
1. `AUDIT.md`: where every project lives, where every asset came from, and what's missing or needs your call.
2. This file: what changed since Bench & Wall and how the code is organized.
3. `docs/SPEC-bench-and-wall.md`: the full spec carried over (transition math, camera poses, physics constants, typography, tokens). Still accurate except where this file says otherwise.
4. `CURSOR_PROMPT.md`: paste into Cursor once the study is approved.

## Folder

```
prototype/the-workshop-collection-study.html   the reviewed prototype, one working file
prototype/earlier/                              Bench & Wall + the three experiments, kept as they were
src/components/WorkshopRoom.tsx                 React wrapper: markup + mountWorkshop()
src/workshop/engine/mount.js                    the wiring (bench, wall, room, index, nav). Same file the prototype runs
src/workshop/engine/bench.js                    3D bench
src/workshop/engine/wall.js                     wall + drawer filing system
src/workshop/engine/room.js                     scroll transition
src/workshop/engine/sound.js                    shared AudioContext
src/workshop/data/content.js                    FEATURED (6), WALL_PROJECTS (5), DRAWER (5 folders), LINKS, caseStudy()
src/workshop/data/assets.js                     image map + wallet outline + YE record sample
src/workshop/data/wallet-outline.json           48-point top edge traced from the Peak Wallet mockup
src/workshop/data/ye-sample.json                818 real records (of 28,083) for the catalog search
src/workshop/styles/workshop.css                all styles. The collection additions are at the end
public/workshop/*.jpg                           36 web-sized images
```

Dependencies are unchanged: `three@0.128.0` pinned, React 18/19, Google Fonts (Instrument Serif, JetBrains Mono, Caveat, Courier Prime, Newsreader). JSON imports need `resolveJsonModule` in TS (Vite and Next handle the import itself).

## What changed since Bench & Wall

**Visual first.** At rest the bench shows only objects, the name tape and a one-time "pick something up" hint (it goes away on first touch or first inspect). Hovering a project object shows a small name label. Clicking brings it close and opens a reduced tag:
`OBJECT / 00n` / title / object name (italic) / role, year, status / real image plate with dots / one sentence / object controls / View project, Live, Code / See the thinking. The close is an ×. The long paragraphs are gone.

**Bench objects (featured order).**

| # | id | Project | Object | Controls |
|---|---|---|---|---|
| 001 | `board` | Instagram Moodboard | foamcore 2.05 x 1.36, top texture drawn from 4 real screens | none (plates show screens) |
| 002 | `belt` | KWL / Star Belt 001 | 2 coil bands, outer FrontSide + inner BackSide materials so lining shows | colorways black/red, white/yellow, Reverse |
| 002 | `wallet` | KWL / Peak Wallet 002 | Extrude of traced outline (0.98 wide, depth .045) + front/back ShapeGeometry faces with cropped mockup textures (repeat 1/W, 1/H) | Turn it over |
| 003 | `phone` | YZY Mobile | unchanged | Next screen |
| 004 | `disc` | Spotify Samples | unchanged record + turntable | Put it on |
| 005 | `catalog` | YE ARCHIVE | open wood box .95 x .55 x 1.2, 22 cards, brass label | live search over `ye-sample.json` (title, era, type), and a card pops per keystroke |
| 006 | `stage` | Ye Tour Media | unchanged | Stage lights |

The Spotify Map sketch moved off the bench and onto the wall. Inspect scales: catalog .82, belt .58, stage 1.15, board 1.05, wallet 1.55. On desktop the inspected object sits .45 to the right so the tag never covers it.

**Wall clusters** (desktop positions are px in a 1360 x 676 frame starting 64px below the top, scaled to the viewport; see `DEFS` in wall.js):
- Person: name, how I work, about (fold), fan page print, sticky pad, pinned refs, Rolling Stone.
- Ideas: Moodboard flow sketch (flows A and B from the README), Find similar print, Spotify Map (fold, opens 430 x 268 to the real screen + links), YZY paper phone.
- Making: Peak Wallet drawing, two Star Belt drawings, cardboard star (KWL911), sample chopper.
- Campaigns: Tampa, Arnhem, tour contact sheet (4 frames), Vultures poster (Yeezy Marketing), LA Apparel frame, Kino cover (Artist Marketing).
- Phones (< 700px): the wall becomes a scrollable two-column pile (wide items span both), and the desk + drawer stick to the bottom.

**Drawer = archive.** Front shows "archive" and the file count. Open height min(330px, 52vh). Manila tabs (role=tab) switch folders, and each card has a name, one line, a status stamp (built / in progress / needs link / private) and a repo link.

**Index.** The "Index" tape opens a plain, searchable list of everything (Bench, Wall, Drawer). Picking a row walks you there: it inspects the bench object, highlights (and unfolds) the wall item, or opens the drawer on the right folder.

**Nav.** Index, About, Resume, Contact and Sound are pinned on both halves now. Contact is a small paper card (email + resume). About walks up to the wall and unfolds the note.

## Working / placeholder / proposed

Working: everything listed above, plus all Bench & Wall interactions (carry, drop, turn, record + music, stage lights, hidden stone note, flips, folds, chopper, sticky notes, highlight, both cross-link directions, scroll transition).
Placeholder: email, resume URL, per-project case study URLs (`caseStudy()` returns the current site), your-voice wall copy, two drawer projects with no repo (see AUDIT.md).
Proposed, not built: case study pages; a growing workshop (new project = new object + new pin-up + new drawer card, all driven from content.js); persisting rearranged wall items.
