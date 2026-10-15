// bench.js: THE BENCH (collection study). A Three.js workbench of finished work.
// Visual first: objects at rest, a name on hover, an object-specific inspection on click, the full story on demand.
// createBench(opts) mounts into opts.holder; the room drives setView(t) 0 = bench .. 1 = wall.
export function createBench(opts) {
const T = opts.THREE || window.THREE;
const { stage, holder, ui, assets: IMG, featured: FEATURED, order: ORDER, links, caseStudy, Snd, wallet: WALLET, archive: YE } = opts;
const onThinking = opts.onThinking || (() => {}), onAbout = opts.onAbout || (() => {});
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const api = { setView() {}, start() {}, stop() {}, resize() {}, inspectById() {}, release() {}, showContact() {}, setSound() {}, destroy() {}, getView: () => 0, ok: false };
function fallback() { holder.innerHTML = '<div class="a-fallback">This bench needs WebGL, which this browser has switched off. The Index tape above still reaches every project.</div>'; }
if (!T) { fallback(); return api; }
let renderer;
try { renderer = new T.WebGLRenderer({ antialias: true }); } catch (e) { fallback(); return api; }
api.ok = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
holder.appendChild(renderer.domElement);
const cv = renderer.domElement;
const scene = new T.Scene(); scene.background = new T.Color('#BDB3A4'); scene.fog = new T.Fog('#BDB3A4', 15, 30);
const camera = new T.PerspectiveCamera(34, 1, .1, 80);
const pose = { bench: { pos: new T.Vector3(), look: new T.Vector3(0, 0, .35) }, wall: { pos: new T.Vector3(), look: new T.Vector3() } };
let viewT = 0, viewS = 0, soundOn = false, mouse = { x: 0, y: 0 };

/* ---------- textures ---------- */
const maxAniso = renderer.capabilities.getMaxAnisotropy();
function ctex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); draw(x, w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = maxAniso; t.userData = { c, draw }; return t; }
function redraw(t) { const c = t.userData.c; t.userData.draw(c.getContext('2d'), c.width, c.height); t.needsUpdate = true; }
function itex(src) { const t = new T.TextureLoader().load(src); t.encoding = T.sRGBEncoding; t.anisotropy = maxAniso; return t; }
function speck(x, w, h, n, cols, smax) { for (let i = 0; i < n; i++) { x.fillStyle = cols[(Math.random() * cols.length) | 0]; const s = Math.random() * (smax || 2) + .4; x.fillRect(Math.random() * w, Math.random() * h, s, s); } }
function blotch(x, w, h, n, col) { for (let i = 0; i < n; i++) { const cx = Math.random() * w, cy = Math.random() * h, r = Math.random() * w * .18 + w * .03; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); } }
const concreteTex = ctex(1024, 1024, (x, w, h) => { x.fillStyle = '#ABA295'; x.fillRect(0, 0, w, h); blotch(x, w, h, 40, 'rgba(255,250,240,.10)'); blotch(x, w, h, 40, 'rgba(60,52,44,.08)'); speck(x, w, h, 26000, ['rgba(70,62,54,.35)', 'rgba(240,234,224,.4)', 'rgba(120,110,98,.5)'], 2.2);
  x.strokeStyle = 'rgba(60,52,44,.25)'; x.lineWidth = 1; for (let k = 0; k < 3; k++) { x.beginPath(); let px = Math.random() * w, py = Math.random() * h; x.moveTo(px, py); for (let i = 0; i < 30; i++) { px += Math.random() * 24 - 8; py += Math.random() * 14 - 7; x.lineTo(px, py); } x.stroke(); }
  for (let i = 0; i < 120; i++) { x.fillStyle = 'rgba(50,44,38,.45)'; x.beginPath(); x.arc(Math.random() * w, Math.random() * h, Math.random() * 2.4 + .6, 0, 7); x.fill(); } });
concreteTex.wrapS = concreteTex.wrapT = T.RepeatWrapping;
const plasterTex = ctex(512, 512, (x, w, h) => { x.fillStyle = '#CFC5B6'; x.fillRect(0, 0, w, h); blotch(x, w, h, 30, 'rgba(255,252,245,.12)'); blotch(x, w, h, 24, 'rgba(90,80,68,.06)'); speck(x, w, h, 6000, ['rgba(255,255,255,.25)', 'rgba(90,80,70,.12)'], 1.4); });
plasterTex.wrapS = plasterTex.wrapT = T.RepeatWrapping; plasterTex.repeat.set(4, 2);
const quiltTex = ctex(256, 256, (x, w, h) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 2; for (let i = -w; i < w * 2; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + h, h); x.stroke(); x.beginPath(); x.moveTo(i, h); x.lineTo(i + h, 0); x.stroke(); } speck(x, w, h, 1500, ['rgba(0,0,0,.08)', 'rgba(255,255,255,.4)'], 1.2); });
quiltTex.wrapS = quiltTex.wrapT = T.RepeatWrapping; quiltTex.repeat.set(8, 1);
const woodTex = ctex(256, 256, (x, w, h) => { x.fillStyle = '#3b2e24'; x.fillRect(0, 0, w, h); for (let i = 0; i < 90; i++) { x.strokeStyle = `rgba(${Math.random() < .5 ? '20,14,10' : '90,70,52'},${Math.random() * .25 + .05})`; x.lineWidth = Math.random() * 2 + .4; x.beginPath(); const y = Math.random() * h; x.moveTo(0, y); for (let k = 0; k <= w; k += 16) x.lineTo(k, y + Math.sin(k * .03 + i) * 3); x.stroke(); } });
function hand(x, txt, px, py, size, col, rot) { x.save(); x.translate(px, py); x.rotate(rot || 0); x.fillStyle = col || '#2f2b26'; x.font = `600 ${size}px Caveat, "Comic Sans MS", cursive`; String(txt).split('\n').forEach((l, i) => x.fillText(l, 0, i * size * 1.02)); x.restore(); }
const imgCache = {};
function loadImg(key, cb) { if (imgCache[key]) { if (imgCache[key].complete) cb(); else imgCache[key].addEventListener('load', cb); return imgCache[key]; } const im = new Image(); im.onload = cb; im.src = IMG[key]; imgCache[key] = im; return im; }

/* ---------- room ---------- */
const table = new T.Mesh(new T.BoxGeometry(11.5, .6, 6.6), new T.MeshStandardMaterial({ map: concreteTex, bumpMap: concreteTex, bumpScale: .015, roughness: .96, metalness: 0 }));
table.position.y = -.3; table.receiveShadow = true; scene.add(table);
const wall = new T.Mesh(new T.PlaneGeometry(50, 18), new T.MeshStandardMaterial({ map: plasterTex, roughness: 1 })); wall.position.set(0, 5, -6.5); wall.receiveShadow = true; scene.add(wall);
const floor = new T.Mesh(new T.PlaneGeometry(60, 40), new T.MeshStandardMaterial({ color: '#8E8477', roughness: 1 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -3.4; scene.add(floor);
scene.add(new T.HemisphereLight(0xfff3e4, 0x5e554b, .62));
const sun = new T.DirectionalLight(0xffe6c8, 2.1); sun.position.set(-7, 10, 4.5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 7, bottom: -7, near: 1, far: 32 }); sun.shadow.bias = -.0004; sun.shadow.normalBias = .02; scene.add(sun);
const fill = new T.DirectionalLight(0xdfe6ff, .28); fill.position.set(6, 4, 6); scene.add(fill);

/* ---------- pin-ups on the 3D wall: a preview of THE WALL that the DOM wall crossfades over ---------- */
[
  { img: 'ig-similar', x: -1.05, y: 3.35, w: .55, h: 1.15, r: -.05, frame: true },
  { img: 'wallet-drawn', x: .55, y: 4.25, w: 1.0, h: .74, r: .03, frame: true },
  { img: 'belt-black', x: .45, y: 3.15, w: 1.15, h: .44, r: -.03, frame: true },
  { img: 'tampa', x: 3.0, y: 4.1, w: .66, h: .88, r: -.07, frame: true },
  { img: 'arnhem', x: 4.1, y: 3.95, w: .6, h: .8, r: .09, frame: true },
  { img: 'chicago', x: 3.2, y: 2.75, w: 1.3, h: .62, r: -.01, frame: true },
  { img: 'rs', x: 2.9, y: 1.55, w: .62, h: .74, r: .05, frame: true },
  { img: 'yz-listen', x: 4.15, y: 1.55, w: .48, h: .82, r: -.04, frame: true },
  { paper: true, x: -2.0, y: 4.0, w: 1.2, h: .78, r: .02 },
  { paper: true, x: -4.6, y: 3.0, w: 1.0, h: .9, r: -.02 },
  { tape: true, x: -3.9, y: 4.55, w: 2.0, h: .38, r: .026 }
].forEach(p => {
  const g = new T.Group();
  if (p.frame) { const f = new T.Mesh(new T.PlaneGeometry(p.w + .08, p.h + .16), new T.MeshStandardMaterial({ color: '#F6F2EA', roughness: .95 })); f.position.y = -.035; g.add(f); }
  const m = p.img ? new T.MeshStandardMaterial({ map: itex(IMG[p.img]), roughness: .9 }) : new T.MeshStandardMaterial({ color: p.tape ? '#E6DAB8' : '#F3EFE6', roughness: .95 });
  const pl = new T.Mesh(new T.PlaneGeometry(p.w, p.h), m); pl.position.z = .004; g.add(pl);
  g.position.set(p.x, p.y, -6.47); g.rotation.z = p.r; g.traverse(o => { if (o.isMesh) o.receiveShadow = true; }); scene.add(g);
});

/* ---------- helpers ---------- */
const items = [];
function mat(c, r, m) { return new T.MeshStandardMaterial({ color: c, roughness: r == null ? .85 : r, metalness: m || 0 }); }
function starShape(R, r) { const s = new T.Shape(); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 - Math.PI / 2, rr = i % 2 ? r : R; i ? s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } s.closePath(); return s; }
function starGeo(R, r, d, bev) { const g = new T.ExtrudeGeometry(starShape(R, r), { depth: d, bevelEnabled: !!bev, bevelThickness: bev || 0, bevelSize: bev || 0, bevelSegments: 2 }); g.translate(0, 0, -d / 2); return g; }
function reg(g, o) {
  const it = Object.assign({ g, x: g.position.x, z: g.position.z, y: o.stackY || 0, vy: 0, rotY: g.rotation.y, tiltX: 0, tiltZ: 0, flip: 0, flipT: 0, held: false, weight: 1, liftH: .6, stackY: 0, inspectScale: 1.2, flat: true, userQ: new T.Quaternion() }, o);
  g.userData.item = it; g.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); g.rotation.order = 'YZX'; scene.add(g); items.push(it); return it;
}

/* ---------- 01 INSTAGRAM MOODBOARD: a foamcore proof board with real prints of the running prototype ---------- */
const BW = 2.05, BH = 1.36;
const boardTex = ctex(1200, 796, (x, w, h) => { x.fillStyle = '#F4F1EA'; x.fillRect(0, 0, w, h); speck(x, w, h, 4000, ['rgba(0,0,0,.04)', 'rgba(255,255,255,.6)'], 1.2);
  const prints = ['ig-feed', 'ig-board', 'ig-similar', 'ig-ideas'];
  prints.forEach((k, i) => { const im = imgCache[k]; const pw = 210, ph = 455, px = 70 + i * 275, py = 150 + (i % 2) * 22, rot = [-.035, .02, -.015, .03][i];
    x.save(); x.translate(px + pw / 2, py + ph / 2); x.rotate(rot); x.fillStyle = 'rgba(40,30,20,.18)'; x.fillRect(-pw / 2 + 5, -ph / 2 + 7, pw, ph); x.fillStyle = '#fff'; x.fillRect(-pw / 2 - 6, -ph / 2 - 6, pw + 12, ph + 12);
    if (im && im.complete && im.naturalWidth) x.drawImage(im, -pw / 2, -ph / 2, pw, ph); else { x.fillStyle = '#111'; x.fillRect(-pw / 2, -ph / 2, pw, ph); }
    x.fillStyle = 'rgba(236,226,196,.85)'; x.fillRect(-36, -ph / 2 - 18, 72, 22); x.restore(); });
  x.strokeStyle = '#B3261E'; x.lineWidth = 3; x.setLineDash([8, 8]); x.beginPath(); x.moveTo(285, 690); x.quadraticCurveTo(420, 750, 555, 690); x.stroke(); x.beginPath(); x.moveTo(835, 690); x.quadraticCurveTo(970, 750, 1105, 690); x.stroke(); x.setLineDash([]);
  hand(x, 'moodboard / flows A + B', 60, 95, 64, '#2f2b26', -.01); hand(x, 'A: find more of it', 230, 770, 34, '#B3261E'); hand(x, 'B: make my own', 800, 770, 34, '#B3261E'); });
['ig-feed', 'ig-board', 'ig-similar', 'ig-ideas'].forEach(k => loadImg(k, () => redraw(boardTex)));
const boardG = new T.Group();
const boardMesh = new T.Mesh(new T.BoxGeometry(BW, .05, BH), [mat('#f1eee6', .95), mat('#f1eee6', .95), new T.MeshStandardMaterial({ map: boardTex, roughness: .92 }), mat('#e6e1d6', .95), mat('#f1eee6', .95), mat('#f1eee6', .95)]);
boardMesh.position.y = .025; boardG.add(boardMesh); boardG.position.set(.25, 0, .5); boardG.rotation.y = -.08;
reg(boardG, { id: 'board', proj: 'moodboard', weight: .8, inspectScale: 1.05 });

/* ---------- 02 KWL STUDIO: Star Belt 001 (reversible) ----------
   One continuous strap wound into a loose coil (Archimedean spiral), built as three smooth surfaces:
   the face (quilted, colorway A), the lining (colorway B, shows on the inside of every turn), and painted edges.
   Hardware follows the drawing: star studs along the face, a star buckle at the outer end, two keeper loops behind it. */
const COLORWAYS = { 'black / red': ['#1b1a19', '#8a1a1a'], 'white / yellow': ['#e7e3da', '#d4ad1c'] };
let cw = 'black / red', reversed = false;
const beltTex = ctex(512, 128, (x, w, h) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h);
  x.strokeStyle = 'rgba(0,0,0,.28)'; x.lineWidth = 2; for (let i = -h; i < w + h; i += 32) { x.beginPath(); x.moveTo(i, 14); x.lineTo(i + (h - 28), h - 14); x.stroke(); x.beginPath(); x.moveTo(i, h - 14); x.lineTo(i + (h - 28), 14); x.stroke(); }
  x.strokeStyle = 'rgba(0,0,0,.55)'; x.lineWidth = 2.2; x.setLineDash([7, 5]); [9, h - 9].forEach(y => { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }); x.setLineDash([]);
  speck(x, w, h, 2400, ['rgba(0,0,0,.07)', 'rgba(255,255,255,.35)'], 1.1); });
beltTex.wrapS = T.RepeatWrapping;
const liningTex = ctex(256, 64, (x, w, h) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); speck(x, w, h, 1800, ['rgba(0,0,0,.08)', 'rgba(255,255,255,.4)'], 1.2); x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1.6; x.setLineDash([6, 5]); [6, h - 6].forEach(y => { x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); }); });
liningTex.wrapS = T.RepeatWrapping;
const faceM = new T.MeshStandardMaterial({ map: beltTex, bumpMap: beltTex, bumpScale: .004, roughness: .72 });
const liningM = new T.MeshStandardMaterial({ map: liningTex, roughness: .72 });
const edgeM = mat('#0d0c0b', .45, .05);
function setColorway() { const [a, b] = COLORWAYS[cw]; faceM.color.set(reversed ? b : a); liningM.color.set(reversed ? a : b); }
setColorway();
const SW = .24, ST = .022, R0 = .44, R1 = .67, TURNS = 1.6, NS = 260;
const spiral = []; { let acc = 0; for (let i = 0; i <= NS; i++) { const th = i / NS * TURNS * Math.PI * 2, r = R0 + (R1 - R0) * i / NS; const c = new T.Vector3(Math.cos(th) * r, 0, Math.sin(th) * r);
  if (i) acc += c.distanceTo(spiral[i - 1].c); const n = new T.Vector3(Math.cos(th), 0, Math.sin(th)); spiral.push({ c, n, s: acc, th }); } }
const beltLen = spiral[NS].s;
function strapSurface(off, v0, v1, flip, uScale) { const pos = [], uv = [], idx = [];
  spiral.forEach(({ c, n, s }) => { const b = c.clone().addScaledVector(n, off); pos.push(b.x, v0, b.z, b.x, v1, b.z); uv.push(s * uScale, 0, s * uScale, 1); });
  for (let i = 0; i < NS; i++) { const a = i * 2, b = a + 1, c2 = a + 2, d = a + 3; if (flip) idx.push(a, c2, b, b, c2, d); else idx.push(a, b, c2, b, d, c2); }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g; }
function strapEdge(y) { const pos = [], idx = []; spiral.forEach(({ c, n }) => { const o = c.clone().addScaledVector(n, ST / 2), i2 = c.clone().addScaledVector(n, -ST / 2); pos.push(o.x, y, o.z, i2.x, y, i2.z); });
  for (let i = 0; i < NS; i++) { const a = i * 2; if (y > 0) idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); else idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g; }
const beltG = new T.Group();
const strap = new T.Group(); strap.position.y = .002;
strap.add(new T.Mesh(strapSurface(ST / 2, 0, SW, false, 1.9), faceM));
strap.add(new T.Mesh(strapSurface(-ST / 2, 0, SW, true, 3.2), liningM));
strap.add(new T.Mesh(strapEdge(SW), edgeM)); strap.add(new T.Mesh(strapEdge(0), edgeM));
// rounded tip at the inner end (with three punched holes), squared cap at the buckle end
const tipC = spiral[0]; const beltTip = new T.Mesh(new T.CylinderGeometry(SW / 2, SW / 2, ST, 24, 1, false, 0, Math.PI), edgeM);
beltTip.position.set(tipC.c.x, SW / 2, tipC.c.z); beltTip.rotation.set(0, -tipC.th, Math.PI / 2); beltTip.rotateX(Math.PI / 2); strap.add(beltTip);
const holeM = mat('#050505', .9); for (let k = 1; k <= 3; k++) { const sp = spiral[Math.round(k * 9)]; const h = new T.Mesh(new T.CircleGeometry(.014, 12), holeM); const p = sp.c.clone().addScaledVector(sp.n, ST / 2 + .0015); h.position.set(p.x, SW / 2, p.z); h.lookAt(p.x + sp.n.x, SW / 2, p.z + sp.n.z); strap.add(h); }
beltG.add(strap);
// star studs along the face, from the drawing: evenly spaced, skipping the tip and the buckle end
const studG = starGeo(.046, .02, .012, .003), studM = mat('#0f0f0e', .48, .35);
for (let s = .38; s < beltLen - .5; s += .2) { const sp = spiral.find(q => q.s >= s); const p = sp.c.clone().addScaledVector(sp.n, ST / 2 + .007); const st = new T.Mesh(studG, studM); st.position.set(p.x, SW / 2, p.z); st.lookAt(p.x + sp.n.x * 2, SW / 2, p.z + sp.n.z * 2); beltG.add(st); }
// hardware at the outer end: two keeper loops, then the detachable star buckle
const end = spiral[NS]; const tangent = end.c.clone().sub(spiral[NS - 1].c).normalize();
function frameAt(sp, off) { const g = new T.Group(); const t = spiral[Math.min(NS, sp + 1)].c.clone().sub(spiral[Math.max(0, sp - 1)].c).normalize(); const n = spiral[sp].n;
  g.position.copy(spiral[sp].c).addScaledVector(n, off); g.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(n, new T.Vector3(0, 1, 0), t)); return g; }
const keeperM = mat('#121211', .5, .4);
[NS - 10, NS - 22].forEach(i => { const k = frameAt(i, 0); const kw = .03, kd = .045;
  [[ST + 2 * kw, kw, kd, 0, SW + kw / 2], [ST + 2 * kw, kw, kd, 0, -kw / 2], [kw, SW + 2 * kw, kd, ST / 2 + kw / 2, SW / 2], [kw, SW + 2 * kw, kd, -ST / 2 - kw / 2, SW / 2]].forEach(([w, h, d, x, y]) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), keeperM); m.position.set(x, y, 0); k.add(m); }); beltG.add(k); });
const buckleG = frameAt(NS, ST / 2 + .045);
const buckle = new T.Mesh(starGeo(.3, .135, .06, .016), mat('#121211', .46, .45)); buckle.rotation.y = Math.PI / 2; buckle.position.y = SW / 2; buckleG.add(buckle);
const bar = new T.Mesh(new T.BoxGeometry(.05, SW * .8, .05), mat('#0c0c0b', .5, .5)); bar.position.set(-.035, SW / 2, 0); buckleG.add(bar);
beltG.add(buckleG);
beltG.position.set(1.85, 0, 1.35); beltG.rotation.y = -.5;
reg(beltG, { id: 'belt', proj: 'kwl', objLabel: 'Star Belt 001', weight: 1.1, flat: false, inspectScale: .5, inspectEuler: [-.6, 2.2, 0], wall: 'beltsketch', plates: ['belt-black', 'belt-white'] });

/* ---------- 02 KWL STUDIO: Peak Wallet 002, outline traced from the real product mockup ---------- */
const WW = .98, WH = WW / WALLET.aspect, WD = .045;
const wShape = new T.Shape(); wShape.moveTo(0, 0); wShape.lineTo(WW, 0); WALLET.top.slice().reverse().forEach(([u, v]) => wShape.lineTo(u * WW, v * WH)); wShape.closePath();
const wBody = new T.ExtrudeGeometry(wShape, { depth: WD, bevelEnabled: true, bevelThickness: .006, bevelSize: .005, bevelSegments: 2 }); wBody.translate(-WW / 2, -WH / 2, -WD / 2);
function faceTex(key) { const t = itex(IMG[key]); t.repeat.set(1 / WW, 1 / WH); return t; }
const wFaceG = new T.ShapeGeometry(wShape); wFaceG.translate(-WW / 2, -WH / 2, 0);
// ShapeGeometry UVs are shape coordinates (0..WW, 0..WH) before translate, so repeat 1/WW, 1/WH maps the cropped mockup exactly
const walletInner = new T.Group();
walletInner.add(new T.Mesh(wBody, mat('#141c2b', .42, .05))); // painted edge
const wFrontTex = faceTex('wallet-tex'), wBackTex = faceTex('wallet-tex-back');
const wFront = new T.Mesh(wFaceG, new T.MeshStandardMaterial({ map: wFrontTex, bumpMap: wFrontTex, bumpScale: .003, roughness: .7 })); wFront.position.z = WD / 2 + .008; walletInner.add(wFront);
const wBack = new T.Mesh(wFaceG, new T.MeshStandardMaterial({ map: wBackTex, bumpMap: wBackTex, bumpScale: .003, roughness: .7 })); wBack.rotation.y = Math.PI; wBack.scale.x = -1; wBack.position.z = -WD / 2 - .008; walletInner.add(wBack);
walletInner.rotation.x = -Math.PI / 2; walletInner.position.y = WD / 2 + .008;
const walletG = new T.Group(); walletG.add(walletInner); walletG.position.set(3.05, 0, .5); walletG.rotation.y = .32;
const wallet = reg(walletG, { id: 'wallet', proj: 'kwl', objLabel: 'Peak Wallet 002', weight: .7, inspectScale: 1.55, wall: 'walletsketch', plates: ['wallet-front', 'wallet-open'] });

/* ---------- 03 YZY MOBILE: phone ---------- */
const screens = [itex(IMG.shop), itex(IMG.album), itex(IMG.disco)]; let scrI = 0;
const phoneG = new T.Group();
const phoneShape = new T.Shape(); { const w = .82, h = 1.68, r = .12; phoneShape.moveTo(-w / 2 + r, -h / 2); phoneShape.lineTo(w / 2 - r, -h / 2); phoneShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r); phoneShape.lineTo(w / 2, h / 2 - r); phoneShape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2); phoneShape.lineTo(-w / 2 + r, h / 2); phoneShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r); phoneShape.lineTo(-w / 2, -h / 2 + r); phoneShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2); }
const pbGeo = new T.ExtrudeGeometry(phoneShape, { depth: .062, bevelEnabled: true, bevelThickness: .007, bevelSize: .007, bevelSegments: 3, curveSegments: 10 }); pbGeo.rotateX(-Math.PI / 2); pbGeo.translate(0, .007, 0);
const pb = new T.Mesh(pbGeo, [mat('#121211', .3, .1), mat('#3a3934', .32, .7)]); phoneG.add(pb); // glass front, titanium-ish band
[[.03, .23], [.03, .1], [-.03, .3]].forEach(([dx, z], i) => { const btn = new T.Mesh(new T.BoxGeometry(.012, .028, i === 2 ? .2 : .12), mat('#3a3934', .32, .7)); btn.position.set(dx > 0 ? .418 : -.418, .038, -z); phoneG.add(btn); });
const scrMat = new T.MeshBasicMaterial({ map: screens[0], toneMapped: false, color: '#e8e8e8' });
const scr = new T.Mesh(new T.PlaneGeometry(.74, 1.6), scrMat); scr.rotation.x = -Math.PI / 2; scr.position.y = .0765; phoneG.add(scr);
const glass = new T.Mesh(new T.PlaneGeometry(.78, 1.64), new T.MeshStandardMaterial({ color: '#ffffff', roughness: .08, metalness: 0, transparent: true, opacity: .07, depthWrite: false })); glass.rotation.x = -Math.PI / 2; glass.position.y = .0772; phoneG.add(glass);
phoneG.position.set(-2.45, 0, 1.2); phoneG.rotation.y = .3;
reg(phoneG, { id: 'phone', proj: 'yzy', weight: 1 });

/* ---------- 04 SPOTIFY SAMPLES: turntable + record ---------- */
const TB = { x: -.55, z: -1.6 }, P = { x: TB.x - .28, z: TB.z + .02 };
const ttBase = new T.Mesh(new T.BoxGeometry(2, .17, 1.66), mat('#2e2c29', .8)); ttBase.position.set(TB.x, .085, TB.z); ttBase.castShadow = ttBase.receiveShadow = true; scene.add(ttBase);
const platter = new T.Mesh(new T.CylinderGeometry(.74, .74, .05, 64), mat('#1a1918', .5, .35)); platter.position.set(P.x, .195, P.z); platter.castShadow = platter.receiveShadow = true; scene.add(platter);
const armPivot = new T.Group(); armPivot.position.set(TB.x + .72, .2, TB.z - .6); scene.add(armPivot);
const armPost = new T.Mesh(new T.CylinderGeometry(.06, .07, .12, 20), mat('#4a4741', .4, .5)); armPost.position.y = .06; armPivot.add(armPost);
const arm = new T.Mesh(new T.BoxGeometry(.035, .03, 1.0), mat('#bdb6aa', .35, .6)); arm.position.set(0, .13, .5); armPivot.add(arm);
const head = new T.Mesh(new T.BoxGeometry(.08, .04, .14), mat('#151514', .5)); head.position.set(0, .12, 1.0); armPivot.add(head);
armPivot.traverse(m => { if (m.isMesh) m.castShadow = true; });
let armA = 0;
const grooveTex = ctex(512, 512, (x, w, h) => { x.fillStyle = '#121212'; x.fillRect(0, 0, w, h); for (let r = 40; r < 256; r += 1.6) { x.strokeStyle = `rgba(255,255,255,${.025 + Math.random() * .04})`; x.beginPath(); x.arc(256, 256, r, 0, 7); x.stroke(); } });
const labelTex = ctex(256, 256, (x) => { x.fillStyle = '#CFC6B4'; x.beginPath(); x.arc(128, 128, 128, 0, 7); x.fill(); x.fillStyle = '#1d1b18'; x.textAlign = 'center'; x.font = '700 26px "JetBrains Mono", monospace'; x.fillText('SAMPLES', 128, 96); x.font = '400 15px "JetBrains Mono", monospace'; x.fillText('side a / 33', 128, 190); x.fillText('s. raza', 128, 212); x.beginPath(); x.arc(128, 128, 7, 0, 7); x.fill(); });
const discG = new T.Group();
const disc = new T.Mesh(new T.CylinderGeometry(.69, .69, .022, 72), [mat('#111', .4, .2), new T.MeshStandardMaterial({ map: grooveTex, roughness: .32, metalness: .25 }), mat('#111', .4, .2)]); disc.position.y = .011; discG.add(disc);
const lab = new T.Mesh(new T.CircleGeometry(.23, 48), new T.MeshStandardMaterial({ map: labelTex, roughness: .85 })); lab.rotation.x = -Math.PI / 2; lab.position.y = .0225; discG.add(lab);
discG.position.set(P.x, 0, P.z);
const rec = reg(discG, { id: 'disc', proj: 'samples', weight: .8, stackY: .22 });

/* ---------- 05 YE ARCHIVE: a card catalog with real records ---------- */
const woodM = new T.MeshStandardMaterial({ map: woodTex, roughness: .78, color: '#ffffff' });
const catG = new T.Group(); const CW = .95, CD = 1.2, CHh = .55, th = .04;
[[CW, th, CD, 0, th / 2, 0], [th, CHh, CD, -CW / 2 + th / 2, CHh / 2, 0], [th, CHh, CD, CW / 2 - th / 2, CHh / 2, 0], [CW, CHh, th, 0, CHh / 2, -CD / 2 + th / 2], [CW, .34, th, 0, .17, CD / 2 - th / 2]].forEach(([w, h, d, x, y, z]) => { const m = new T.Mesh(new T.BoxGeometry(w, h, d), woodM); m.position.set(x, y, z); catG.add(m); });
const cardM = mat('#efe8d8', .95), tabM = mat('#c9b48e', .9); const catCards = [];
for (let i = 0; i < 22; i++) { const c = new T.Mesh(new T.BoxGeometry(.84, .44, .008), cardM); const z = -CD / 2 + .1 + i * .046; c.position.set(0, .25, z); c.rotation.x = -.1 + Math.sin(i * 1.7) * .05; c.userData = { baseY: .25, pop: 0 }; catG.add(c); catCards.push(c);
  if (i % 4 === 1) { const t = new T.Mesh(new T.BoxGeometry(.14, .05, .008), tabM); t.position.set(-.3 + (i % 3) * .3, .245, 0); c.add(t); } }
const plateTex = ctex(400, 120, (x, w, h) => { x.fillStyle = '#E9E2D2'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a7a5c'; x.lineWidth = 6; x.strokeRect(3, 3, w - 6, h - 6); x.fillStyle = '#1d1b18'; x.textAlign = 'center'; x.font = '700 40px "JetBrains Mono", monospace'; x.fillText('YE ARCHIVE', w / 2, 58); x.font = '400 22px "JetBrains Mono", monospace'; x.fillText((YE.total || 0).toLocaleString('en-US') + ' records', w / 2, 94); });
const plate = new T.Mesh(new T.PlaneGeometry(.46, .14), new T.MeshStandardMaterial({ map: plateTex, roughness: .6, metalness: .1 })); plate.position.set(0, .21, CD / 2 + .004); catG.add(plate);
const brassM = mat('#a8884f', .35, .85);
[[.5, .016, 0, .287], [.5, .016, 0, .133], [.016, .17, -.242, .21], [.016, .17, .242, .21]].forEach(([w, h, x, y]) => { const f = new T.Mesh(new T.BoxGeometry(w, h, .012), brassM); f.position.set(x, y, CD / 2 + .004); catG.add(f); });
const pull = new T.Mesh(new T.TorusGeometry(.07, .012, 10, 24, Math.PI), brassM); pull.rotation.z = Math.PI; pull.position.set(0, .085, CD / 2 + .01); catG.add(pull);
catG.position.set(-4.15, 0, .55); catG.rotation.y = .28;
reg(catG, { id: 'catalog', proj: 'archive', weight: 1.6, flat: false, inspectScale: .82 });
function popCard() { const c = catCards[(Math.random() * catCards.length) | 0]; c.userData.pop = 1; }

/* ---------- 06 YE TOUR MEDIA: stage model ---------- */
const earthTex = ctex(512, 256, (x, w, h) => { x.fillStyle = '#1d2a3c'; x.fillRect(0, 0, w, h); blotch(x, w, h, 26, 'rgba(70,92,70,.55)'); blotch(x, w, h, 16, 'rgba(120,108,84,.45)'); for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(235,238,240,.18)'; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, Math.random() * 40 + 10, Math.random() * 6 + 2, 0, 0, 7); x.fill(); } });
const stageG = new T.Group();
const sBase = new T.Mesh(new T.BoxGeometry(1.75, .14, 1.35), mat('#E2DCCF', .95)); sBase.position.y = .07; stageG.add(sBase);
const dome = new T.Mesh(new T.SphereGeometry(.46, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), new T.MeshStandardMaterial({ map: earthTex, roughness: .75 })); dome.position.y = .14; stageG.add(dome);
const fig = new T.Mesh(new T.CylinderGeometry(.018, .022, .13, 10), mat('#0d0d0c', .8)); fig.position.y = .14 + .46 + .065; stageG.add(fig);
const figH = new T.Mesh(new T.SphereGeometry(.022, 12, 8), mat('#0d0d0c', .8)); figH.position.y = .14 + .46 + .145; stageG.add(figH);
const crowdM = mat('#3a3631', .9); for (let i = 0; i < 90; i++) { const a = Math.random() * Math.PI * 2, r = .56 + Math.random() * .24; const px = Math.cos(a) * r, pz = Math.sin(a) * r * .85; if (Math.abs(px) > .84 || Math.abs(pz) > .64) continue; const c = new T.Mesh(new T.BoxGeometry(.018, .035, .018), crowdM); c.position.set(px, .157, pz); stageG.add(c); }
const stageLight = new T.SpotLight(0xff3018, 0, 4, .6, .6, 1.2); stageLight.position.set(.2, 1.6, .4); stageLight.target = dome; stageG.add(stageLight);
const haze = new T.Mesh(new T.ConeGeometry(.7, 1.4, 32, 1, true), new T.MeshBasicMaterial({ color: 0xff3a20, transparent: true, opacity: 0, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending })); haze.position.set(.1, .9, .2); stageG.add(haze);
stageG.position.set(3.55, 0, -1.4); stageG.rotation.y = -.35;
reg(stageG, { id: 'stage', proj: 'tour', weight: 1.5, flat: false, inspectScale: 1.15 });
haze.castShadow = false; let lightsOn = false, lightsV = 0;

/* ---------- not projects: swatches, paperweight + hidden note, card, pencil ---------- */
const swDefs = [{ n: 'Cast concrete', d: 'The bench, the dome, the floor.', m: new T.MeshStandardMaterial({ map: concreteTex, roughness: .95 }) }, { n: 'Matte rubber', d: 'Sole material test. No shine, ever.', m: mat('#1f1e1c', 1) }, { n: 'Quilted caviar leather', d: 'Star Belt 001 sample.', m: new T.MeshStandardMaterial({ color: '#8a1a1a', map: quiltTex, roughness: .6 }) }];
swDefs.forEach((d, i) => { const g = new T.Group(); const b = new T.Mesh(new T.BoxGeometry(.52, .06, .52), d.m); b.position.y = .03; g.add(b); g.position.set(-3.95 + i * .04, 0, -1.85 + i * .03); g.rotation.y = i * .35 - .2; reg(g, { id: 'sw' + i, weight: .7, stackY: i * .06, sw: d }); });
const noteTex = ctex(512, 350, (x, w, h) => { x.fillStyle = '#F6F1E4'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(0,0,0,.08)'; x.beginPath(); x.moveTo(w / 2, 0); x.lineTo(w / 2, h); x.stroke(); hand(x, 'you moved the heavy thing.\nmost people don’t.\ni keep the good stuff\nunder heavy things. - s', 28, 70, 40, '#2f2b26', -.03); });
const noteG = new T.Group(); const nm = new T.Mesh(new T.PlaneGeometry(.66, .45), new T.MeshStandardMaterial({ map: noteTex, roughness: .95 })); nm.rotation.x = -Math.PI / 2; nm.position.y = .002; noteG.add(nm);
noteG.position.set(-1.05, 0, 2.05); noteG.rotation.y = .25;
reg(noteG, { id: 'note', weight: .5, inspectScale: 1.6 });
const stoneG = new T.Group(); const stoneM = new T.Mesh(new T.DodecahedronGeometry(.36, 1), new T.MeshStandardMaterial({ color: '#8c8478', roughness: .98, flatShading: true, map: concreteTex })); stoneM.scale.set(1, .6, 1.1); stoneM.position.y = .2; stoneG.add(stoneM);
stoneG.position.set(-1.0, 0, 2.05);
reg(stoneG, { id: 'stone', weight: 3.2, liftH: .45, flat: false });
const cardTex = ctex(700, 400, (x) => { x.fillStyle = '#F4F0E6'; x.fillRect(0, 0, 700, 400); x.fillStyle = '#1B1A18'; x.font = '700 44px "JetBrains Mono", monospace'; x.fillText('SHAZAAN RAZA', 40, 90); x.font = '400 22px "JetBrains Mono", monospace'; x.fillText('product design', 40, 170); x.fillText('creative technology', 40, 204); x.fillText('front-end development', 40, 238); x.fillStyle = '#4D4943'; x.fillText('chicago, il', 40, 350); x.fillStyle = '#C2410C'; x.fillRect(612, 330, 28, 28); });
const cardG = new T.Group(); const cm = new T.Mesh(new T.BoxGeometry(1.05, .014, .6), [mat('#eee', .9), mat('#eee', .9), new T.MeshStandardMaterial({ map: cardTex, roughness: .9 }), mat('#e9e4da', .9), mat('#eee', .9), mat('#eee', .9)]); cm.position.y = .007; cardG.add(cm);
cardG.position.set(4.25, 0, 2.15); cardG.rotation.y = .18;
reg(cardG, { id: 'card', weight: .5, inspectScale: 1.7 });
const penG = new T.Group(); const pen = new T.Mesh(new T.CylinderGeometry(.034, .034, 1.1, 6), mat('#2a2926', .7)); pen.rotation.z = Math.PI / 2; pen.position.y = .034; penG.add(pen);
const tip = new T.Mesh(new T.ConeGeometry(.034, .14, 6), mat('#c9b48e', .8)); tip.rotation.z = -Math.PI / 2; tip.position.set(.62, .034, 0); penG.add(tip);
penG.position.set(-1.7, 0, -.05); penG.rotation.y = .6;
reg(penG, { id: 'pencil', weight: .6, flat: false });

if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('40px Caveat'), document.fonts.load('700 40px "JetBrains Mono"')]).then(() => [noteTex, cardTex, labelTex, plateTex, boardTex].forEach(redraw)).catch(() => {});
function groundAt(x, z) { if (Math.hypot(x - P.x, z - P.z) < .74) return .22; if (Math.abs(x - TB.x) < 1 && Math.abs(z - TB.z) < .83) return .17; return 0; }

/* ---------- sound ---------- */
let music = null;
function thump(w) { if (!soundOn) return; const ac = Snd.ctx(); if (!ac) return; const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(140 / w, t); o.frequency.exponentialRampToValueAtTime(48, t + .12); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.35, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + .18); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .2); }
function startMusic() { if (music || !soundOn) return; const ac = Snd.ctx(); if (!ac) return; const out = ac.createGain(); out.gain.value = .0001; out.gain.exponentialRampToValueAtTime(.5, ac.currentTime + .6); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1600; lp.connect(out).connect(ac.destination);
  const chords = [[57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62]]; const spb = 60 / 82; let next = ac.currentTime + .05, beat = 0;
  const tick = () => { while (next < ac.currentTime + .2) { const ch = chords[Math.floor(beat / 4) % 4];
      if (beat % 4 === 0) ch.forEach(n => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'triangle'; o.frequency.value = 440 * Math.pow(2, (n - 69) / 12); g.gain.setValueAtTime(.0001, next); g.gain.exponentialRampToValueAtTime(.05, next + .08); g.gain.exponentialRampToValueAtTime(.0001, next + spb * 4); o.connect(g).connect(lp); o.start(next); o.stop(next + spb * 4 + .05); });
      const k = ac.createOscillator(), kg = ac.createGain(); k.frequency.setValueAtTime(110, next); k.frequency.exponentialRampToValueAtTime(40, next + .1); kg.gain.setValueAtTime(beat % 2 ? .12 : .3, next); kg.gain.exponentialRampToValueAtTime(.0001, next + .16); k.connect(kg).connect(lp); k.start(next); k.stop(next + .18);
      next += spb; beat++; } };
  const id = setInterval(tick, 60); tick(); music = { stop() { clearInterval(id); try { out.gain.cancelScheduledValues(ac.currentTime); out.gain.setValueAtTime(out.gain.value, ac.currentTime); out.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .4); } catch (e) {} setTimeout(() => out.disconnect(), 600); } }; }
function stopMusic() { if (music) { music.stop(); music = null; } }
api.setSound = on => { soundOn = on; if (!on) stopMusic(); };

/* ---------- inspection tag: identity first, explanation on demand ---------- */
let inspected = null;
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
function btn(label, fn, cls) { const b = el('button', cls || '', label); b.type = 'button'; b.addEventListener('click', fn); return b; }
function ext(label, href) { const a = el('a', 'ext', label + ' <span aria-hidden="true">&#8599;</span>'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; return a; }
function setPlates(keys, portrait) { ui.plate.innerHTML = ''; ui.plateDots.innerHTML = ''; ui.plateWrap.hidden = !keys || !keys.length; if (!keys || !keys.length) return;
  ui.plateWrap.classList.toggle('portrait', !!portrait);
  const img = el('img'); img.alt = ''; img.src = IMG[keys[0]]; ui.plate.appendChild(img);
  keys.forEach((k, i) => { const d = btn('', () => { img.src = IMG[k]; [...ui.plateDots.children].forEach((x, j) => x.setAttribute('aria-pressed', j === i)); }, 'dot'); d.setAttribute('aria-label', 'Image ' + (i + 1)); d.setAttribute('aria-pressed', i === 0); ui.plateDots.appendChild(d); });
  if (keys.length < 2) ui.plateDots.innerHTML = ''; }
function openTag(c) { ui.tagK.textContent = c.k || ''; ui.tagH.textContent = c.h || ''; ui.tagObj.textContent = c.obj || ''; ui.tagMeta.textContent = c.meta || ''; ui.tagP.textContent = c.line || '';
  ui.tagObj.hidden = !c.obj; ui.tagMeta.hidden = !c.meta; ui.tagP.hidden = !c.line;
  setPlates(c.plates, c.portrait); ui.tagCtl.innerHTML = ''; (c.ctl || []).forEach(x => ui.tagCtl.appendChild(x)); ui.tagCtl.hidden = !(c.ctl && c.ctl.length);
  ui.tagActs.innerHTML = ''; (c.acts || []).forEach(x => ui.tagActs.appendChild(x)); ui.tag.hidden = false; if (ui.hint) ui.hint.classList.add('gone'); }
function closeTag() { ui.tag.hidden = true; }
ui.tagClose.addEventListener('click', () => { if (inspected) release(); else closeTag(); }, { signal: opts.signal });
function controls(it) {
  if (it.id === 'phone') return [btn('Next screen', () => { scrI = (scrI + 1) % screens.length; scrMat.map = screens[scrI]; scrMat.needsUpdate = true; })];
  if (it.id === 'belt') { const out = Object.entries(COLORWAYS).map(([n, [a, b]]) => { const s = btn('', () => { cw = n; setColorway(); out.forEach(x => x.setAttribute('aria-pressed', x.dataset.c === cw)); }, 'sw'); s.dataset.c = n; s.style.background = `linear-gradient(135deg, ${a} 50%, ${b} 50%)`; s.setAttribute('aria-label', n); s.setAttribute('aria-pressed', n === cw); return s; });
    return [...out, btn('Reverse it', () => { reversed = !reversed; setColorway(); it.angPop = 1; })]; }
  if (it.id === 'wallet') return [btn('Turn it over', () => { it.localQ = (it.localQ || new T.Quaternion()).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 0, 1), Math.PI)); })];
  if (it.id === 'disc') return [btn('Put it on', () => release(P.x, P.z))];
  if (it.id === 'stage') return [btn(lightsOn ? 'Lights off' : 'Stage lights', e => { lightsOn = !lightsOn; e.currentTarget.textContent = lightsOn ? 'Lights off' : 'Stage lights'; })];
  if (it.id === 'catalog') { const wrap = el('div', 'ye-search'); const lab = el('label', '', 'Search ' + YE.sample.length + ' of ' + YE.total.toLocaleString('en-US') + ' records'); lab.htmlFor = 'ye-q'; const inp = el('input'); inp.id = 'ye-q'; inp.type = 'search'; inp.placeholder = 'yeezus, donda, glow in the dark...'; inp.autocomplete = 'off'; const ul = el('ul'); ul.setAttribute('aria-live', 'polite');
    const run = () => { const q = inp.value.trim().toLowerCase(); ul.innerHTML = ''; if (!q) return; popCard(); const hits = YE.sample.filter(r => (r.t + ' ' + r.e + ' ' + r.ty).toLowerCase().includes(q)).slice(0, 6);
      if (!hits.length) { ul.appendChild(el('li', 'none', 'Nothing in this sample. The full archive has more.')); return; }
      hits.forEach(r => { const li = el('li'); li.append(el('b', '', ''), el('span', '', '')); li.firstChild.textContent = r.t; li.lastChild.textContent = [r.y, r.d, r.ty].filter(Boolean).join(' / '); ul.appendChild(li); }); };
    inp.addEventListener('input', run); inp.addEventListener('keydown', e => e.stopPropagation()); wrap.append(lab, inp, ul); setTimeout(() => inp.focus({ preventScroll: true }), 350); return [wrap]; }
  return [];
}
function describe(it) {
  const pr = it.proj && FEATURED[it.proj];
  if (pr) { const n = ORDER.indexOf(it.proj) + 1; const acts = [ext('View project', caseStudy(pr.slug))]; if (pr.live) acts.push(ext('Live', pr.live)); if (pr.code) acts.push(ext('Code', pr.code));
    acts.push(btn('See the thinking <span aria-hidden="true">&#8593;</span>', () => { const w = it.wall || pr.wall; release(); onThinking(w); }, 'thinking'));
    return openTag({ k: 'OBJECT / 00' + n, h: pr.n, obj: it.objLabel || pr.obj, meta: pr.meta, line: pr.line, plates: it.plates || pr.plates, portrait: it.plates ? false : pr.portrait, ctl: controls(it), acts }); }
  if (it.id === 'card') return openTag({ k: 'who made all this', h: 'Shazaan Raza', meta: 'Product design / creative technology / front-end', line: 'The finished work is on this bench. How I think is on the wall behind it.', acts: [btn('Look at the wall <span aria-hidden="true">&#8593;</span>', () => { release(); onAbout(); }, 'thinking'), ext('Resume', links.resume)] });
  if (it.id === 'note') return openTag({ k: 'found under the stone', h: 'A note', line: '“you moved the heavy thing. most people don’t. i keep the good stuff under heavy things.”' });
  if (it.sw) return openTag({ k: 'material swatch', h: it.sw.n, line: it.sw.d });
}
api.showContact = () => openTag({ k: 'contact', h: 'Say hi', line: links.email, acts: [ext('Resume', links.resume)] });
const up = new T.Vector3(0, 1, 0), toCam = new T.Vector3(), tmpV = new T.Vector3();
function inspect(it) { if (!it) return; if (inspected && inspected !== it) release(); inspected = it; it.held = false; it.inspecting = true; it.saved = { x: it.x, z: it.z }; it.userQ.identity(); it.localQ = null; hideHover(); describe(it); }
function release(nx, nz) { const it = inspected; if (!it) return; inspected = null; it.inspecting = false; it.returning = true; if (nx != null) { it.x = nx; it.z = nz; } else { it.x = it.saved.x; it.z = it.saved.z; } it.stackY = 0; closeTag(); }
function click(it) { if (it.id === 'stone' || it.id === 'pencil') { it.vy = 3.2; thump(it.weight); return; } inspect(it); }
api.inspectById = id => inspect(items.find(i => i.id === id));
api.release = () => { if (inspected) release(); else closeTag(); };
const onKey = e => { if (viewS > .3 || !opts.isActive()) return; if (e.target && e.target.closest && e.target.closest('input,textarea')) return;
  if (e.key === 'Escape') { if (inspected) release(); else closeTag(); }
  if (inspected && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) { e.preventDefault(); const q = new T.Quaternion(); if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') q.setFromAxisAngle(up, e.key === 'ArrowLeft' ? -.25 : .25); else q.setFromAxisAngle(new T.Vector3(1, 0, 0), e.key === 'ArrowUp' ? -.25 : .25); inspected.userQ.premultiply(q); }
  if (held && (e.key === 'q' || e.key === 'e')) held.rotY += e.key === 'q' ? -.3 : .3; };
window.addEventListener('keydown', onKey, { signal: opts.signal });

/* ---------- hover name (identity second) ---------- */
function hideHover() { if (ui.hover) ui.hover.hidden = true; }
function showHover(it, e) { const pr = it && it.proj && FEATURED[it.proj]; if (!pr || !ui.hover) { hideHover(); return; } const r = stage.getBoundingClientRect();
  ui.hover.innerHTML = ''; const b = el('b'); b.textContent = pr.n; const s = el('span'); s.textContent = it.objLabel || pr.obj; ui.hover.append(b, s); ui.hover.hidden = false;
  ui.hover.style.transform = `translate(${Math.min(e.clientX - r.left + 16, r.width - 220)}px, ${e.clientY - r.top + 18}px)`; }

/* ---------- picking + carrying ---------- */
const ray = new T.Raycaster(), ndc = new T.Vector2(), plane = new T.Plane(new T.Vector3(0, 1, 0), 0), hp = new T.Vector3();
let held = null, down = null, hoverIt = null, touched = false;
function setNdc(e) { const r = cv.getBoundingClientRect(); ndc.x = (e.clientX - r.left) / r.width * 2 - 1; ndc.y = -(e.clientY - r.top) / r.height * 2 + 1; mouse.x = ndc.x; mouse.y = ndc.y; }
function pick() { ray.setFromCamera(ndc, camera); const hits = ray.intersectObjects(items.map(i => i.g), true); for (const h of hits) { let o = h.object; while (o && !o.userData.item) o = o.parent; if (o) return o.userData.item; } return null; }
function planeHit() { ray.setFromCamera(ndc, camera); return ray.ray.intersectPlane(plane, hp) ? hp : null; }
cv.addEventListener('pointerdown', e => { if (viewS > .25) return; setNdc(e); if (!touched) { touched = true; if (ui.hint) ui.hint.classList.add('gone'); } opts.onPointerDown && opts.onPointerDown(); hideHover(); const it = pick(); down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false, it, lx: e.clientX, ly: e.clientY };
  if (inspected) { if (it === inspected) { cv.setPointerCapture(e.pointerId); down.rot = true; } return; }
  if (!it) return; cv.setPointerCapture(e.pointerId); held = it; it.held = true; it.stackY = 0; it.tx = it.x; it.tz = it.z; const p = planeHit(); it.grab = p ? { x: p.x - it.x, z: p.z - it.z } : { x: 0, z: 0 }; });
cv.addEventListener('pointermove', e => { setNdc(e);
  if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) down.moved = true;
  if (down && down.rot && inspected) { const dx = e.clientX - down.lx, dy = e.clientY - down.ly; down.lx = e.clientX; down.ly = e.clientY; inspected.userQ.premultiply(new T.Quaternion().setFromAxisAngle(up, dx * .012)).premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1, 0, 0), dy * .012)); return; }
  if (held) { const p = planeHit(); if (p) { held.tx = Math.max(-5.2, Math.min(5.2, p.x - held.grab.x)); held.tz = Math.max(-2.9, Math.min(2.9, p.z - held.grab.z)); } cv.style.cursor = 'grabbing'; }
  else if (!inspected && e.pointerType === 'mouse' && viewS < .25) { hoverIt = pick(); cv.style.cursor = hoverIt ? 'grab' : 'default'; if (hoverIt) showHover(hoverIt, e); else hideHover(); } });
cv.addEventListener('pointerleave', hideHover);
function up_() { if (held) { const it = held; held = null; it.held = false; if (down && !down.moved && performance.now() - down.t < 350) click(it); } else if (inspected && down && !down.moved && !down.rot) release(); down = null; }
cv.addEventListener('pointerup', up_); cv.addEventListener('pointercancel', up_);
cv.addEventListener('wheel', e => { if (!held) return; e.preventDefault(); held.rotY += e.deltaY * .004; }, { passive: false });

/* ---------- loop ---------- */
let W = 1, H = 1, running = false, raf = 0, last = performance.now();
function resize() { const r = stage.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height); renderer.setSize(W, H, false); camera.aspect = W / H;
  const a = W / H;
  if (a < .9) { camera.fov = 46; pose.bench.pos.set(0, 12.8, 8.6); pose.wall.pos.set(0, 2.6, 6.8); pose.wall.look.set(0, 2.4, -6.5); }
  else if (a < 1.35) { camera.fov = 40; pose.bench.pos.set(0, 9.6, 8.2); pose.wall.pos.set(0, 2.4, 5.6); pose.wall.look.set(0, 2.2, -6.5); }
  else { camera.fov = 33; pose.bench.pos.set(0, 7.6, 7.7); pose.wall.pos.set(0, 2.25, 5.0); pose.wall.look.set(0, 2.05, -6.5); }
  camera.updateProjectionMatrix(); applyCamera(); }
const camLook = new T.Vector3();
function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function applyCamera() { const k = ease(viewS);
  camera.position.lerpVectors(pose.bench.pos, pose.wall.pos, k); camera.position.y += Math.sin(k * Math.PI) * 1.2;
  camLook.lerpVectors(pose.bench.look, pose.wall.look, k);
  if (!RM && !held && !inspected) { const par = 1 - k; camera.position.x += mouse.x * .35 * par; camera.position.y += mouse.y * .2 * par; }
  camera.lookAt(camLook); }
const eq = new T.Euler(0, 0, 0, 'YZX'), tq = new T.Quaternion(), camDir = new T.Vector3();
function step(dt, t) {
  viewS += (viewT - viewS) * (1 - Math.exp(-dt * (RM ? 30 : 6)));
  if (viewT > .2 && inspected) release(); // heading to the wall (target, not the lagging camera)
  applyCamera();
  for (const it of items) { const g = it.g;
    if (it.inspecting) { camera.getWorldDirection(camDir); const target = tmpV.copy(camera.position).addScaledVector(camDir, W < 700 ? 3.4 : 2.6); target.y -= .12; if (W >= 700) target.addScaledVector(new T.Vector3(1, 0, 0), .45);
      g.position.lerp(target, 1 - Math.exp(-dt * 9)); toCam.copy(camera.position).sub(g.position).normalize();
      if (it.flat) tq.setFromUnitVectors(up, toCam); else tq.setFromEuler(new T.Euler(...(it.inspectEuler || [.42, 0, 0])));
      if (it.localQ) tq.multiply(it.localQ); tq.premultiply(it.userQ); g.quaternion.slerp(tq, 1 - Math.exp(-dt * 9)); const s = it.inspectScale; g.scale.lerp(tmpV.set(s, s, s), 1 - Math.exp(-dt * 9)); continue; }
    g.scale.lerp(tmpV.set(1, 1, 1), 1 - Math.exp(-dt * 9));
    const ground = Math.max(groundAt(it.x, it.z), it.stackY);
    if (it.returning) { g.position.lerp(tmpV.set(it.x, Math.max(g.position.y, ground), it.z), 1 - Math.exp(-dt * 8)); if (g.position.distanceTo(tmpV) < .05) { it.returning = false; it.y = g.position.y; it.vy = 0; } }
    else if (it.held) { const f = 1 - Math.exp(-dt * 14 / it.weight); const ox = it.x, oz = it.z; if (it.tx != null) { it.x += (it.tx - it.x) * f; it.z += (it.tz - it.z) * f; } const vx = (it.x - ox) / dt, vz = (it.z - oz) / dt;
      it.y += (ground + it.liftH - it.y) * (1 - Math.exp(-dt * 10 / it.weight)); it.vy = 0;
      it.tiltX += (Math.max(-.45, Math.min(.45, vz * .07 / it.weight)) - it.tiltX) * Math.min(1, dt * 10); it.tiltZ += (Math.max(-.45, Math.min(.45, -vx * .07 / it.weight)) - it.tiltZ) * Math.min(1, dt * 10); }
    else { it.vy -= 24 * dt; it.y += it.vy * dt; if (it.y <= ground) { if (it.vy < -2.2) { it.vy *= -.22; thump(it.weight); } else it.vy = 0; it.y = ground; } it.tiltX *= Math.exp(-dt * 8); it.tiltZ *= Math.exp(-dt * 8); }
    if (!it.returning) g.position.set(it.x, it.y, it.z);
    eq.set(it.tiltX, it.rotY, it.tiltZ); tq.setFromEuler(eq); g.quaternion.slerp(tq, it.returning ? 1 - Math.exp(-dt * 8) : 1); }
  for (const c of catCards) { c.userData.pop *= Math.exp(-dt * 3); c.position.y = c.userData.baseY + c.userData.pop * .2; }
  const onPlatter = !rec.held && !rec.inspecting && !rec.returning && Math.hypot(rec.x - P.x, rec.z - P.z) < .25 && rec.y > .15;
  if (onPlatter) { rec.x += (P.x - rec.x) * dt * 6; rec.z += (P.z - rec.z) * dt * 6; rec.rotY += dt * 3.46; }
  armA += ((onPlatter ? -.55 : 0) - armA) * (1 - Math.exp(-dt * 3)); armPivot.rotation.y = armA;
  if (onPlatter && soundOn && Math.abs(armA + .55) < .08) startMusic(); if (!onPlatter || !soundOn) stopMusic();
  lightsV += ((lightsOn ? 1 : 0) - lightsV) * (1 - Math.exp(-dt * 4)); stageLight.intensity = lightsV * (3.2 + Math.sin(t * 9) * .4); haze.material.opacity = lightsV * .16;
  sun.intensity = inspected ? 1.5 : 2.1;
  cv.style.pointerEvents = viewS > .25 ? 'none' : 'auto';
  renderer.render(scene, camera); }
function loop(now) { const dt = Math.min(.033, (now - last) / 1000); last = now; step(dt, now / 1000); if (running) raf = requestAnimationFrame(loop); }
api.start = () => { if (running) return; viewS = viewT; /* resume from where the room actually is */ running = true; last = performance.now(); raf = requestAnimationFrame(loop); };
api.stop = () => { running = false; cancelAnimationFrame(raf); };
api.resize = resize;
api.setView = t => { viewT = Math.max(0, Math.min(1, t)); };
api.getView = () => viewS;
const ro = new ResizeObserver(resize); ro.observe(stage);
resize();
api.destroy = () => { api.stop(); stopMusic(); window.removeEventListener('keydown', onKey); ro.disconnect(); renderer.dispose(); if (cv.parentNode) cv.parentNode.removeChild(cv); };
return api;
}
