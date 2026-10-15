// wall.js: THE WALL (collection study). Where ideas come from: sketches, prints, references, memories, experiments.
// Plain DOM + CSS 3D on a fixed design board scaled to fit. Returns { layout, highlight, openAbout, openDrawer, destroy }.
export function createWall(opts) {
const { stage, board, foot, assets: IMG, links, caseStudy, wallProjects: WP, drawer: DRAWER, Snd } = opts;
const onBench = opts.onBench || (() => {});
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
let scale = 1, DW = 1360, DH = 800, mob = false;
const FRAME_W = 1360, FRAME_H = 676, TOP = 64; // desktop positions are px inside a 1360x676 frame, below the nav strip

/* ---------- drawings ---------- */
const phoneSVG = `<svg viewBox="0 0 130 260" width="100%" height="100%" aria-hidden="true" style="display:block">
<g fill="none" stroke="#3A3631" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="10" width="106" height="226" rx="14"/><path d="M52 20h26"/>
<rect x="22" y="56" width="40" height="52"/><rect x="68" y="56" width="40" height="52"/><rect x="22" y="116" width="40" height="52"/><rect x="68" y="116" width="40" height="52"/>
<path d="M22 56l40 52M62 56l-40 52M68 56l40 52M108 56l-40 52" stroke-width=".8" opacity=".5"/><path d="M22 212h86"/></g>
<g font-family="Caveat, cursive" fill="#3A3631"><text x="22" y="46" font-size="20">YZY</text><text x="96" y="46" font-size="14">cart</text>
<text x="18" y="228" font-size="11">YZY</text><text x="40" y="228" font-size="11">SNDS</text><text x="68" y="228" font-size="11" fill="#B3261E">SPLY</text><text x="96" y="228" font-size="11">HQ</text><text x="20" y="190" font-size="15">paper v1, 2024</text></g></svg>`;
const box = (x, y, t) => `<rect x="${x}" y="${y}" width="118" height="30" rx="3"/><text x="${x + 8}" y="${y + 21}" font-size="17" stroke="none" fill="#3A3631">${t}</text>`;
const arrow = (x1, y, x2) => `<path d="M${x1} ${y}H${x2 - 4}M${x2 - 10} ${y - 5}L${x2 - 3} ${y}L${x2 - 10} ${y + 5}"/>`;
const flowSVG = `<svg viewBox="0 0 560 330" width="100%" height="100%" aria-hidden="true" style="display:block"><g fill="none" stroke="#3A3631" stroke-width="1.5" font-family="Caveat, cursive">
<text x="12" y="34" font-size="30" stroke="none" fill="#3A3631">moodboard, two flows</text>
<text x="12" y="92" font-size="20" stroke="none" fill="#B3261E">A</text>${box(34, 72, 'i like this')}${arrow(152, 87, 172)}${box(172, 72, 'save + note')}${arrow(290, 87, 310)}${box(310, 72, 'pick details')}${arrow(428, 87, 440)}<text x="444" y="93" font-size="19" stroke="none" fill="#3A3631">find similar</text>
<text x="12" y="182" font-size="20" stroke="none" fill="#B3261E">B</text>${box(34, 162, 'inspires me')}${arrow(152, 177, 172)}${box(172, 162, 'creator board')}${arrow(290, 177, 310)}${box(310, 162, '3 directions')}${arrow(428, 177, 440)}<text x="444" y="183" font-size="19" stroke="none" fill="#3A3631">brief</text>
<path d="M60 230c80 30 220 34 380 6" stroke="#B3261E" stroke-dasharray="4 6"/><text x="100" y="282" font-size="19" stroke="none" fill="#7a7368">ai is optional. you can just save + note.</text></g></svg>`;
const traceSVG = `<svg viewBox="0 0 300 220" width="100%" height="100%" aria-hidden="true" style="display:block"><g fill="none" stroke="#3A3631" stroke-width="1.5" opacity=".85">
<path d="M30 60c20-20 70-25 95-10s20 45-5 55-55 5-75-10-30-25-15-35z"/><path d="M170 45c15-12 40-10 48 2s-5 22-20 24-35-12-28-26z"/><path d="M180 95c18-4 35 8 34 30s-14 45-28 44-22-28-20-48 2-24 14-26z"/><path d="M60 62 Q140 25 196 50" stroke="#B3261E" stroke-dasharray="4 6"/></g>
<g fill="#B3261E"><circle cx="60" cy="62" r="4"/><circle cx="196" cy="50" r="4"/></g><text x="16" y="200" font-family="Caveat, cursive" font-size="26" fill="#3A3631">spotify map</text></svg>`;
const starPath = 'M50 2 L61.8 35.1 L97.6 35.1 L68.6 55.9 L79.4 90.4 L50 70 L20.6 90.4 L31.4 55.9 L2.4 35.1 L38.2 35.1 Z';
const starFront = `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" style="display:block;filter:drop-shadow(0 6px 8px rgba(40,30,20,.25))"><defs><pattern id="corr" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#B8976A"/><path d="M0 3h6" stroke="#a3845a" stroke-width="1.2"/></pattern></defs><path d="${starPath}" fill="url(#corr)" stroke="#8a6d45" stroke-width="1.4"/><circle cx="50" cy="52" r="3" fill="#6b5333"/></svg>`;
const starBack = `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" style="display:block;filter:drop-shadow(0 6px 8px rgba(40,30,20,.25))"><path d="${starPath}" fill="#A88A60" stroke="#8a6d45" stroke-width="1.4"/><g font-family="Caveat, cursive" fill="#1d1a16" text-anchor="middle"><text x="50" y="52" font-size="17" font-weight="700">KWL911</text><text x="50" y="66" font-size="9">drop 001 / star buckle</text></g></svg>`;
const tb = (id, label) => `<button type="button" class="tobench" data-bench="${id}"><span aria-hidden="true">&#8595;</span> ${label || 'on the bench'}</button>`;
const ext = (label, href) => `<a class="ext" href="${href}" target="_blank" rel="noopener">${label} <span aria-hidden="true">&#8599;</span></a>`;
const cs = slug => `<a class="ext cslink" href="${caseStudy(slug)}">case study <span aria-hidden="true">&#8594;</span></a>`;
const print = (img, alt, cls) => `<div class="${cls || 'print'} shadowy"><img data-img="${img}" alt="${alt}"></div>`;

// p = desktop [x, y] in the 1360x676 frame. flip: back side. fold: opens in place. bench: related finished object.
const DEFS = [
 // the person
 { id: 'name', w: 420, h: 104, r: -1, p: [20, 0], label: 'Name', html: `<div class="namecard"><span class="strip">shazaan raza</span><br><span class="sub">product design / creative tech / front-end</span></div>` },
 { id: 'how', w: 240, h: 178, r: 1.2, p: [30, 122], label: 'How I work', html: `<div class="idx shadowy"><h3>HOW I WORK</h3><p class="ln">1. pin the references first.</p><p class="ln">2. sketch it on paper.</p><p class="ln">3. build it the same week.</p><p class="ln">4. matte, never glossy.</p></div>` },
 { id: 'about', w: 150, h: 104, ow: 310, oh: 300, r: -3, p: [288, 150], fold: true, label: 'Folded note, about me. Press Enter to unfold.', cover: `<span>about me</span><small>(unfold)</small>`, body: `<h4>hi, i'm shaz.</h4><p>I design products and then build them. Figma to React, Swift when it needs to be in your hand.</p><p>Worked on the YZY app and media for Ye's world tour. Run KWL Studio, a drop-only accessories label in Chicago. CS at Illinois Tech, class of 2026.</p><p><a href="${links.resume}" target="_blank" rel="noopener">resume</a> / ${links.email}</p>` },
 { id: 'profile', w: 118, h: 150, r: 3, p: [300, 290], flip: true, label: 'The Creative Journey: fan page print. Double-click to flip.', html: `<figure class="pol shadowy" style="margin:0"><img data-img="ig-profile" alt="@yelova911 Instagram profile"><figcaption style="font-size:17px">fan page</figcaption></figure><span class="tape t1"></span>`, back: `<div class="noteback"><b>@yelova911</b>three years building in public.${cs('creative-journey')}</div>` },
 { id: 'pad', w: 185, h: 160, r: 2, p: [30, 330], label: 'Sticky note pad', html: `<div class="sticky shadowy"><label for="wall-note-in" style="display:block">leave me a note</label><textarea id="wall-note-in" maxlength="80"></textarea><button type="button" class="stick">stick it on the wall</button></div>` },
 { id: 'refs', w: 215, h: 150, r: -2.5, p: [235, 470], label: 'References I keep pinned', html: `<div class="refs shadowy"><span class="hand" style="font-size:22px">pinned refs</span><ul><li>yeezy studio, calabasas</li><li>vogue editorial</li><li>bianca censori furniture</li><li>cindyly.design</li></ul></div><span class="tape t1"></span>` },
 { id: 'rs', w: 132, h: 160, r: -3, p: [40, 512], flip: true, bench: 'catalog', label: 'Rolling Stone clipping. Double-click to flip.', html: `<div class="clip shadowy"><img data-img="rs" alt="Rolling Stone article about the kanyewestlover911 fan account"></div><span class="tape t1"></span>`, back: `<div class="noteback"><b>dec 2022</b>rolling stone wrote about the fan page.${tb('catalog', 'YE ARCHIVE, on the bench')}</div>` },
 // ideas
 { id: 'igflow', w: 280, h: 166, r: -1.5, p: [478, 8], bench: 'board', label: 'Instagram Moodboard flow sketch', html: `<div class="pp shadowy">${flowSVG}</div><span class="tape t1"></span>${tb('board')}` },
 { id: 'igprint', w: 112, h: 236, r: -3, p: [482, 205], label: 'Print of the Find similar screen', html: print('ig-similar', 'Instagram Moodboard, Find similar screen', 'print tall') + `<span class="tape t1"></span><span class="cap hand">find similar</span>` },
 { id: 'map', w: 150, h: 110, ow: 430, oh: 268, r: 2, p: [612, 215], fold: true, label: 'Spotify Map, folded. Press Enter to open.', cover: traceSVG, body: `<div class="mapopen"><img data-img="world" alt="Spotify Map world view"><div class="row"><span class="hand" style="font-size:24px">spotify map</span><span class="mono">${WP.map.meta}</span></div><div class="row">${cs('spotify-map')}${ext('Code', WP.map.code)}</div></div>` },
 { id: 'phone', w: 110, h: 220, r: -2, p: [626, 360], flip: true, bench: 'phone', label: 'Paper prototype of YZY Mobile. Double-click to flip.', html: `<div class="pp shadowy">${phoneSVG}</div><span class="tape t1"></span>${tb('phone')}`, back: `<div style="position:absolute;inset:0;background:#111;padding:5px"><img data-img="shop" alt="YZY Mobile shop screen" style="width:100%;height:100%;object-fit:cover;display:block"></div>`, backPlain: true },
 // making: KWL + Samples
 { id: 'walletsketch', w: 214, h: 160, r: 2, p: [785, 0], flip: true, bench: 'wallet', label: 'Peak Wallet 002 sketch. Double-click to flip.', html: print('wallet-drawn', 'Peak Wallet 002 drawing') + `<span class="tape t1"></span>${tb('wallet')}`, back: `<div class="noteback"><b>peak wallet 002</b>card holder, mountain top edge. &ldquo;i hate this wallet, its awesome.&rdquo;</div>` },
 { id: 'beltsketch', w: 262, h: 100, r: -2, p: [772, 186], flip: true, bench: 'belt', label: 'Star Belt 001 sketch, black and red. Double-click to flip.', html: print('belt-black', 'Star Belt 001 drawing, black with red lining') + `<span class="tape t1"></span>${tb('belt')}`, back: `<div class="noteback"><b>star belt 001</b>reversible. black / red, white / yellow. detachable star buckle.</div>` },
 { id: 'beltsketch2', w: 248, h: 94, r: 1.5, p: [785, 300], label: 'Star Belt 001 sketch, white and yellow', html: print('belt-white', 'Star Belt 001 drawing, white with yellow lining') + `<span class="tape t1"></span>` },
 { id: 'star', w: 100, h: 100, r: 12, p: [958, 380], flip: true, tap: 'flip', label: 'Cardboard star. Click to flip.', html: starFront, back: starBack, backPlain: true },
 { id: 'chop', w: 290, h: 196, r: -1, p: [748, 478], bench: 'disc', label: 'Sample chopper', html: `<div class="chop shadowy"><div class="hand" style="font-size:20px;line-height:1">sample chopper, paper proto</div><canvas class="c-wave" aria-label="Waveform. Click to move the nearest slice marker."></canvas><div class="pads"><button type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button></div><div class="row"><span>pads play sound</span>${tb('disc', 'the record')}</div></div>` },
 // campaigns
 { id: 'tampa', w: 140, h: 188, r: 4, p: [1068, 0], flip: true, label: 'Tampa promo photo. Double-click to flip.', html: `<figure class="pol shadowy" style="margin:0"><img data-img="tampa" alt="Ye live in Tampa promo"><figcaption>tampa</figcaption></figure><span class="tape t1"></span>`, back: `<div class="noteback"><b>tampa, june 2026</b>one of the tour promos i made.${cs('ye-tour')}</div>` },
 { id: 'arnhem', w: 128, h: 172, r: -5, p: [1214, 22], flip: true, label: 'Arnhem promo photo. Double-click to flip.', html: `<figure class="pol shadowy" style="margin:0"><img data-img="arnhem" alt="Ye live in Arnhem promo"><figcaption>arnhem</figcaption></figure><span class="pin"></span>`, back: `<div class="noteback"><b>gelredome</b>arnhem. promo + content.</div>` },
 { id: 'contact', w: 285, h: 140, r: -1, p: [1062, 222], bench: 'stage', label: 'Ye tour contact sheet', html: `<div class="contact shadowy"><div class="frames">${['mexico', 'sofi', 'chicago', 'turkey'].map(k => `<img data-img="${k}" alt="Ye tour frame: ${k}">`).join('')}</div><div class="crow"><span>YE TOUR 2025-26</span><span>04 FRAMES</span></div></div>${tb('stage', 'the stage model')}` },
 { id: 'yzposter', w: 104, h: 178, r: 2, p: [1072, 392], flip: true, label: 'Yeezy Marketing: Vultures listening experience poster. Double-click to flip.', html: print('yz-listen', 'Vultures listening experience poster, New York') + `<span class="tape t1"></span>`, back: `<div class="noteback" style="font-size:18px"><b>yeezy marketing</b>vultures listening experience, new york.${cs('yeezy-marketing')}</div>` },
 { id: 'laprint', w: 168, h: 104, r: -2, p: [1192, 386], flip: true, label: 'LA Apparel campaign frame. Double-click to flip.', html: print('la-1', 'LA Apparel campaign frame') + `<span class="tape t1"></span>`, back: `<div class="noteback" style="font-size:18px"><b>la apparel</b>graphics, promos, short form.${cs('la-apparel')}</div>` },
 { id: 'kino', w: 100, h: 126, r: 3, p: [1214, 512], flip: true, label: 'Artist Marketing: Kino cover. Double-click to flip.', html: print('kino', 'Kino single cover') + `<span class="pin"></span>`, back: `<div class="noteback" style="font-size:16px"><b>artist marketing</b>@kinoftw, @mysp8c, @oodaredevil.${cs('artist-marketing')}</div>` }
];

const LABELS = [{ t: 'where ideas start', p: [484, -42], r: -2 }, { t: 'making it real', p: [792, -42], r: 1.5 }, { t: 'out in the world', p: [1072, -42], r: -1 }];
const labelEls = LABELS.map(l => { const e = document.createElement('div'); e.className = 'wlabel'; e.setAttribute('role', 'heading'); e.setAttribute('aria-level', '2'); e.textContent = l.t; e.style.transform = `rotate(${l.r}deg)`; board.appendChild(e); return e; });
const items = []; let z = 10;
function build(d) { const it = Object.assign({ x: 0, y: 0, ang: 0, angV: 0, swingT: 0, open: false, flipped: false, lastTap: 0 }, d);
  const e = document.createElement('div'); e.className = 'it' + (d.flip ? ' flippable' : '') + (d.fold ? ' foldable' : ''); e.tabIndex = 0; e.setAttribute('role', 'group'); e.setAttribute('aria-label', d.label || d.id); e.dataset.id = d.id;
  if (d.flip) { const f = document.createElement('div'); f.className = 'flip'; const fr = document.createElement('div'); fr.className = 'side front'; fr.innerHTML = d.html; const bk = document.createElement('div'); bk.className = 'side back'; bk.innerHTML = d.back; if (d.backPlain) { bk.style.background = 'transparent'; bk.style.padding = '0'; } f.append(fr, bk); e.append(f); }
  else if (d.fold) e.innerHTML = `<div class="fold shadowy"><div class="cover">${d.cover}</div><div class="creases"></div><div class="content">${d.body}</div></div>`;
  else e.innerHTML = d.html;
  e.querySelectorAll('img[data-img]').forEach(i => { i.src = IMG[i.dataset.img]; i.draggable = false; });
  e.querySelectorAll('.tobench').forEach(b => b.addEventListener('click', ev => { ev.stopPropagation(); onBench(b.dataset.bench); }));
  it.el = e; board.appendChild(e); items.push(it); bind(it); return it; }
function place(it) { const w = it.open ? it.ow : it.w, h = it.open ? it.oh : it.h; Object.assign(it.el.style, { left: it.x + 'px', top: it.y + 'px', width: w + 'px', height: h + 'px', transform: `rotate(${it.r + it.ang}deg)` }); }

/* ---------- layout: hand-placed collage on desktop, a loose two-column pile on phones ---------- */
let spacer = stage.querySelector('.wall-spacer'); if (!spacer) { spacer = document.createElement('div'); spacer.className = 'wall-spacer'; stage.insertBefore(spacer, foot); }
function layout() { const W = stage.offsetWidth, H = stage.offsetHeight; if (!W) return; mob = W < 700; stage.classList.toggle('scrolly', mob);
  if (!mob) { DW = 1360; scale = Math.min(W / DW, H / 860, 1.2); DH = H / scale; const sy = (DH - 120 / scale - TOP - 8) / FRAME_H; // the desk is 120 screen px, not board units
    items.forEach(it => { if (!it.userMoved && it.p) { it.x = it.p[0] * Math.max(1, (W / scale) / FRAME_W); it.y = TOP + it.p[1] * Math.max(.72, Math.min(1.25, sy)); } place(it); });
    const sx = Math.max(1, (W / scale) / FRAME_W), syc = Math.max(.72, Math.min(1.25, sy));
    labelEls.forEach((e, i) => { e.hidden = false; e.style.left = LABELS[i].p[0] * sx + 'px'; e.style.top = TOP + LABELS[i].p[1] * syc + 'px'; });
    spacer.style.height = '0px'; }
  // a piece with an 'on the bench' tape hanging under it needs room for it, or the next card covers the tape
  else { const gapOf = it => it.el.querySelector(':scope > .tobench') ? 54 : 34; DW = 560; scale = W / DW; const cols = [230, 230], colW = 270; let maxY = 0; labelEls.forEach(e => { e.hidden = true; });
    items.forEach((it, i) => { if (!it.p) { place(it); return; } if (!it.userMoved) { const jit = ((i * 37) % 17) - 8;
        if (it.w > 262) { const y = Math.max(cols[0], cols[1]); it.x = (DW - it.w) / 2 + jit; it.y = y; cols[0] = cols[1] = y + it.h + gapOf(it); }
        else { const c = cols[0] <= cols[1] ? 0 : 1; it.x = 10 + c * (colW + 10) + (colW - it.w) / 2 + jit; it.y = cols[c]; cols[c] += it.h + gapOf(it); } }
      maxY = Math.max(maxY, it.y + it.h); place(it); });
    DH = Math.max(H / scale, maxY + 220); spacer.style.height = (DH * scale) + 'px'; }
  board.style.width = DW + 'px'; board.style.height = DH + 'px'; board.style.transform = `scale(${scale})`; board.style.setProperty('--s', scale); drawWave(); }

/* ---------- swing physics ---------- */
let anim = 0, lastT = performance.now();
function wake() { if (!anim) { lastT = performance.now(); anim = requestAnimationFrame(tick); } }
function tick(now) { const dt = Math.min(.033, (now - lastT) / 1000); lastT = now; let busy = false;
  for (const it of items) { if (RM) { it.ang = 0; continue; } it.angV += (it.swingT - it.ang) * 140 * dt; it.angV *= Math.exp(-dt * 6); it.ang += it.angV * dt; if (Math.abs(it.ang - it.swingT) > .05 || Math.abs(it.angV) > .05 || it.drag) busy = true; place(it); }
  anim = busy ? requestAnimationFrame(tick) : 0; }
function toggleFlip(it) { it.flipped = !it.flipped; if (it.flipped) it.el.style.zIndex = ++z; /* a flipped card comes to the front, like picking it up */ it.el.classList.toggle('flipped', it.flipped); it.angV += it.flipped ? 40 : -40; wake(); }
function toggleOpen(it, force) { it.open = force != null ? force : !it.open; const f = it.el.querySelector('.fold'); f.classList.toggle('open', it.open); if (it.open) { f.classList.remove('unfold'); void f.offsetWidth; f.classList.add('unfold'); it.el.style.zIndex = ++z; } place(it); }
function bind(it) { const e = it.el;
  e.addEventListener('pointerdown', ev => { if (ev.target.closest('a,button,textarea,canvas,input,label')) return; ev.preventDefault(); e.setPointerCapture(ev.pointerId);
    it.drag = { sx: ev.clientX, sy: ev.clientY, ox: it.x, oy: it.y, lx: ev.clientX, lt: performance.now(), moved: false }; e.style.zIndex = ++z; e.classList.add('held'); wake(); });
  e.addEventListener('pointermove', ev => { const d = it.drag; if (!d) return; const dx = (ev.clientX - d.sx) / scale, dy = (ev.clientY - d.sy) / scale; if (Math.hypot(dx, dy) > 4) d.moved = true;
    it.x = Math.max(-it.w * .4, Math.min(DW - it.w * .6, d.ox + dx)); it.y = Math.max(-20, Math.min(DH - 40, d.oy + dy)); it.userMoved = true;
    const now = performance.now(), vx = (ev.clientX - d.lx) / Math.max(8, now - d.lt); it.swingT = Math.max(-18, Math.min(18, -vx * 16)); d.lx = ev.clientX; d.lt = now; place(it); });
  const up = () => { const d = it.drag; if (!d) return; it.drag = null; e.classList.remove('held'); it.swingT = 0; wake();
    if (!d.moved) { const now = performance.now(); if (it.fold) toggleOpen(it); else if (it.tap === 'flip') toggleFlip(it); else if (it.flip && now - it.lastTap < 340) { toggleFlip(it); it.lastTap = 0; return; } it.lastTap = now; } };
  // a cancelled pointer means the browser took the gesture (a scroll on phones): drop it, never treat it as a tap
  const cancel = () => { if (!it.drag) return; it.drag = null; e.classList.remove('held'); it.swingT = 0; wake(); };
  e.addEventListener('pointerup', up); e.addEventListener('pointercancel', cancel);
  e.addEventListener('dblclick', ev => { if (it.flip && !it.tap && ev.pointerType !== 'touch') { /* handled by double-tap logic */ } });
  e.addEventListener('keydown', ev => { if (ev.target !== e) return; if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (it.fold) toggleOpen(it); else if (it.flip) toggleFlip(it); }
    const mv = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[ev.key]; if (mv) { ev.preventDefault(); it.x += mv[0]; it.y += mv[1]; it.userMoved = true; it.angV += mv[0] * 3; wake(); place(it); } }); }
DEFS.forEach(d => build(Object.assign({}, d)));
const byId = id => items.find(i => i.id === id);

/* ---------- the drawer: a filing system for everything else ---------- */
const drawerEl = foot.querySelector('.drawer'), handle = drawerEl.querySelector('.handle'), tabs = drawerEl.querySelector('.folders'), bodyEl = drawerEl.querySelector('.folder-body');
const total = DRAWER.reduce((n, f) => n + f.items.length, 0); drawerEl.querySelector('.count').textContent = total + ' files';
DRAWER.forEach((f, i) => { const t = document.createElement('button'); t.type = 'button'; t.className = 'ftab'; t.setAttribute('role', 'tab'); t.id = 'ftab-' + i; t.setAttribute('aria-controls', 'fbody'); t.setAttribute('aria-selected', i === 0); t.style.setProperty('--i', i); t.textContent = f.folder; t.addEventListener('click', () => showFolder(i)); tabs.appendChild(t); });
function showFolder(i) { [...tabs.children].forEach((t, j) => t.setAttribute('aria-selected', j === i)); bodyEl.innerHTML = ''; bodyEl.setAttribute('aria-labelledby', 'ftab-' + i);
  DRAWER[i].items.forEach((p, k) => { const c = document.createElement('article'); c.className = 'fcard'; c.style.setProperty('--r', (((k * 7) % 5) - 2) * .6 + 'deg');
    const st = p.status.replace(' ', '-'); c.innerHTML = `<b></b><p></p><div class="frow"><span class="stamp ${st}"></span>${p.href ? `<a href="${p.href}" target="_blank" rel="noopener">repo <span aria-hidden="true">&#8599;</span></a>` : ''}</div>`;
    c.querySelector('b').textContent = p.n; c.querySelector('p').textContent = p.line; c.querySelector('.stamp').textContent = p.status; bodyEl.appendChild(c); }); }
showFolder(0);
function setDrawer(o) { drawerEl.classList.toggle('open', o); handle.setAttribute('aria-expanded', o); handle.setAttribute('aria-label', o ? 'Close the archive drawer' : 'Open the archive drawer'); }
handle.addEventListener('click', () => setDrawer(!drawerEl.classList.contains('open')), { signal: opts.signal });

/* ---------- sticky notes, saved only in the visitor's browser ---------- */
const KEY = 'shazport-wall-notes';
function loadNotes() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
function saveNotes(n) { try { localStorage.setItem(KEY, JSON.stringify(n.slice(-10))); } catch (e) {} }
let notes = loadNotes();
function noteItem(n) { const it = build({ id: 'note', w: 170, h: 130, r: n.r, label: 'Your sticky note', html: `<div class="left-note shadowy" style="width:100%;height:100%"></div>` }); it.el.querySelector('.left-note').textContent = n.t; it.x = n.x; it.y = n.y; it.userMoved = true; place(it); return it; }
notes.forEach(noteItem);
board.querySelector('.stick').addEventListener('click', () => { const ta = board.querySelector('#wall-note-in'); const t = ta.value.trim(); if (!t) return; const pad = byId('pad');
  const n = { t, x: pad.x + pad.w + 20 + Math.random() * 60, y: Math.max(20, pad.y - 40 + Math.random() * 60), r: Math.random() * 8 - 4 }; notes.push(n); saveNotes(notes); const it = noteItem(n); it.el.style.zIndex = ++z; it.angV = 80; wake(); ta.value = ''; });

/* ---------- sample chopper ---------- */
const SR = 22050, SPB = 60 / 90, BEATS = 8, N = Math.floor(SR * SPB * BEATS); const data = new Float32Array(N);
(function synth() { let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const chords = [[220, 261.63, 329.63], [196, 246.94, 293.66]];
  for (let i = 0; i < N; i++) { const t = i / SR, beat = t / SPB, ch = chords[beat < 4 ? 0 : 1]; let v = 0; ch.forEach(f => { v += Math.sin(2 * Math.PI * f * t) * .06; }); const local = beat % 4; v *= Math.min(1, local * 4) * Math.min(1, (4 - local) * 3); data[i] = v; }
  const add = (start, len, fn) => { const s = Math.floor(start * SR); for (let k = 0; k < len * SR && s + k < N; k++) data[s + k] += fn(k / SR); };
  for (let b = 0; b < BEATS; b++) { if (b % 2 === 0) add(b * SPB, .3, t => { const f = 50 + 90 * Math.exp(-t * 30); return Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 9) * .8; });
    if (b % 2 === 1) add(b * SPB, .25, t => rnd() * Math.exp(-t * 20) * .32 + Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 30) * .2);
    for (let h = 0; h < 2; h++) add((b + h * .5) * SPB, .06, t => rnd() * Math.exp(-t * 70) * .1); }
  add(2.5 * SPB, .5, t => Math.sin(2 * Math.PI * (523 + Math.sin(t * 30) * 8) * t) * Math.exp(-t * 4) * .18); add(6.5 * SPB, .5, t => Math.sin(2 * Math.PI * (587 + Math.sin(t * 30) * 8) * t) * Math.exp(-t * 4) * .18);
  let m = 0; for (let i = 0; i < N; i++) m = Math.max(m, Math.abs(data[i])); for (let i = 0; i < N; i++) data[i] *= .9 / m; })();
const wave = board.querySelector('.c-wave'), wx = wave.getContext('2d'); let marks = [.25, .5, .75], playing = null, buf = null;
function drawWave() { const w = Math.max(10, wave.clientWidth), h = 84; wave.width = w * 2; wave.height = h * 2; wx.setTransform(2, 0, 0, 2, 0, 0); wx.clearRect(0, 0, w, h);
  wx.strokeStyle = 'rgba(58,54,49,.15)'; wx.beginPath(); wx.moveTo(0, h / 2); wx.lineTo(w, h / 2); wx.stroke();
  const per = Math.floor(N / w); wx.strokeStyle = '#3A3631'; wx.lineWidth = 1; wx.beginPath(); for (let x = 0; x < w; x++) { let mx = 0; for (let k = 0; k < per; k += 4) mx = Math.max(mx, Math.abs(data[x * per + k] || 0)); const wob = Math.sin(x * .7) * .6; wx.moveTo(x + .5, h / 2 - mx * h * .45 + wob); wx.lineTo(x + .5, h / 2 + mx * h * .45 + wob); } wx.stroke();
  const edges = [0, ...marks, 1]; for (let i = 0; i < 4; i++) { if (playing && playing.i === i) { const p = Math.min(1, (performance.now() - playing.t0) / 1000 / playing.dur); wx.fillStyle = 'rgba(179,38,30,.12)'; wx.fillRect(edges[i] * w, 0, (edges[i + 1] - edges[i]) * w, h); wx.fillStyle = '#B3261E'; wx.fillRect((edges[i] + (edges[i + 1] - edges[i]) * p) * w, 0, 1.5, h); }
    wx.fillStyle = '#3A3631'; wx.font = '16px Caveat, cursive'; wx.fillText(String(i + 1), edges[i] * w + 4, 14); }
  marks.forEach(m => { wx.strokeStyle = '#B3261E'; wx.lineWidth = 1.6; wx.beginPath(); wx.moveTo(m * w, 0); wx.lineTo(m * w + 1, h); wx.stroke(); wx.fillStyle = '#B3261E'; wx.beginPath(); wx.moveTo(m * w - 5, 0); wx.lineTo(m * w + 5, 0); wx.lineTo(m * w, 7); wx.fill(); }); }
let markDrag = -1;
function markAt(ev) { const r = wave.getBoundingClientRect(); return Math.max(.02, Math.min(.98, (ev.clientX - r.left) / r.width)); }
wave.addEventListener('pointerdown', ev => { ev.stopPropagation(); wave.setPointerCapture(ev.pointerId); const x = markAt(ev); let bi = 0, bd = 9; marks.forEach((m, i) => { if (Math.abs(m - x) < bd) { bd = Math.abs(m - x); bi = i; } }); markDrag = bi; moveMark(x); });
wave.addEventListener('pointermove', ev => { if (markDrag >= 0) moveMark(markAt(ev)); });
wave.addEventListener('pointerup', () => { markDrag = -1; });
function moveMark(x) { const lo = markDrag > 0 ? marks[markDrag - 1] + .04 : .04, hi = markDrag < 2 ? marks[markDrag + 1] - .04 : .96; marks[markDrag] = Math.max(lo, Math.min(hi, x)); drawWave(); }
const pads = [...board.querySelectorAll('.pads button')];
function playSlice(i) { const ac = Snd.ctx(); if (!ac) return; if (!buf) { buf = ac.createBuffer(1, N, SR); buf.getChannelData(0).set(data); }
  const edges = [0, ...marks, 1], st = edges[i] * N / SR, dur = (edges[i + 1] - edges[i]) * N / SR; const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = buf; s.connect(g).connect(ac.destination); const t = ac.currentTime; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.9, t + .005); g.gain.setValueAtTime(.9, t + dur - .02); g.gain.linearRampToValueAtTime(0, t + dur); s.start(t, st, dur);
  playing = { i, t0: performance.now(), dur }; pads[i].classList.add('hit'); setTimeout(() => pads[i].classList.remove('hit'), Math.min(400, dur * 1000));
  const a = () => { drawWave(); if (playing && performance.now() - playing.t0 < dur * 1000) requestAnimationFrame(a); else { playing = null; drawWave(); } }; a(); }
pads.forEach((b, i) => b.addEventListener('click', () => playSlice(i)));
if (document.fonts && document.fonts.load) document.fonts.load('16px Caveat').then(drawWave).catch(() => {});

/* ---------- public api ---------- */
function scrollTo(it) { if (mob) stage.scrollTo({ top: Math.max(0, it.y * scale - 120), behavior: RM ? 'auto' : 'smooth' }); }
function highlight(id) { const it = byId(id); if (!it) return; if (it.fold && !it.open) toggleOpen(it, true); it.el.style.zIndex = ++z; it.el.classList.remove('glow'); void it.el.offsetWidth; it.el.classList.add('glow'); it.angV += 90; wake(); scrollTo(it); setTimeout(() => it.el.classList.remove('glow'), 2200); }
function openAbout() { highlight('about'); }
function openDrawer(folderIdx) { setDrawer(true); if (folderIdx != null) showFolder(folderIdx); if (mob) stage.scrollTo({ top: stage.scrollHeight, behavior: RM ? 'auto' : 'smooth' }); }
const ro = new ResizeObserver(layout); ro.observe(stage);
layout();
function destroy() { ro.disconnect(); cancelAnimationFrame(anim); board.innerHTML = ''; tabs.innerHTML = ''; bodyEl.innerHTML = ''; }
return { layout, highlight, openAbout, openDrawer, destroy, ids: () => items.map(i => i.id) };
}
