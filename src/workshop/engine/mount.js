// mount.js: wires bench, wall, room, the index and the persistent nav inside one root element.
// Used by the single-file prototype AND by <WorkshopRoom/> in React, so there is one copy of this logic.
import { Snd } from "./sound.js";
import { createBench } from "./bench.js";
import { createWall } from "./wall.js";
import { createRoom } from "./room.js";

export function mountWorkshop({ root, THREE, content, assets }) {
const { LINKS, FEATURED, FEATURED_ORDER, WALL_PROJECTS, DRAWER, caseStudy } = content;
const { ASSETS, WALLET_OUTLINE, YE_SAMPLE } = assets;
const $ = id => root.querySelector("#" + id);
// one lifetime for every listener on persistent elements, so React StrictMode's mount/unmount/mount never doubles them
const lifetime = new AbortController(); const L = { signal: lifetime.signal };

const vp = $("room-vp"), wallLayer = $("wall-layer");
let room;
const tagUI = { tag: $("a-tag"), tagK: $("a-tag-k"), tagH: $("a-tag-h"), tagObj: $("a-tag-obj"), tagMeta: $("a-tag-meta"), tagP: $("a-tag-p"), tagCtl: $("a-tag-ctl"), tagActs: $("a-tag-acts"), tagClose: $("a-tag-x"),
  plateWrap: $("a-plate-wrap"), plate: $("a-plate"), plateDots: $("a-dots"), hover: $("hover-name"), hint: $("first-hint") };

function closePanels() { $("index").hidden = true; $("n-index").setAttribute("aria-expanded", "false"); $("contact-card").hidden = true; $("n-contact").setAttribute("aria-expanded", "false"); }
const bench = createBench({
  THREE, stage: vp, holder: $("bench-gl"), ui: tagUI, assets: ASSETS, featured: FEATURED, order: FEATURED_ORDER, links: LINKS, caseStudy, Snd, signal: lifetime.signal,
  wallet: WALLET_OUTLINE, archive: YE_SAMPLE,
  isActive: () => room ? room.progress() < .3 : true,
  onPointerDown: closePanels,
  onThinking: wallId => room.goWall(() => wall.highlight(wallId)),
  onAbout: () => room.goWall(() => wall.openAbout())
});
function whenBenchSettled(fn) { const t0 = performance.now(); const w = () => { if (bench.getView() < .08 || performance.now() - t0 > 2500) fn(); else requestAnimationFrame(w); }; w(); }
const toBench = id => room.goBench(() => whenBenchSettled(() => bench.inspectById(id)));
const wall = createWall({ stage: wallLayer, board: $("wall-board"), foot: $("wall-foot"), assets: ASSETS, links: LINKS, caseStudy, wallProjects: WALL_PROJECTS, drawer: DRAWER, Snd, signal: lifetime.signal, onBench: toBench });
room = createRoom({ track: $("room"), bench, wall, wallLayer, benchUI: [...root.querySelectorAll(".bench-ui")], toggle: $("turn"), meter: $("meter") });

/* ---------- index: the plain way to everything ---------- */
const rows = [];
FEATURED_ORDER.forEach((k, i) => { const p = FEATURED[k]; rows.push({ g: "On the bench", n: p.n, s: p.meta.split("/").pop().trim(), d: p.obj, slug: p.slug, go: () => toBench(p.bench) }); });
Object.values(WALL_PROJECTS).forEach(p => rows.push({ g: "On the wall", n: p.n, s: "wall", d: p.meta, slug: p.slug, go: () => room.goWall(() => wall.highlight(p.wallId)) }));
DRAWER.forEach((f, fi) => f.items.forEach(p => { if (f.folder === "In progress" && p.n === "Kick the Can") return; rows.push({ g: "In the drawer", n: p.n, s: p.status, d: f.folder + " / " + p.line, go: () => room.goWall(() => wall.openDrawer(fi)) }); }));
function renderIndex(q) { const body = $("index-body"); body.innerHTML = ""; q = (q || "").trim().toLowerCase(); let cur = null;
  rows.filter(r => !q || (r.n + " " + r.d + " " + r.s).toLowerCase().includes(q)).forEach(r => { if (r.g !== cur) { cur = r.g; const h = document.createElement("h4"); h.textContent = cur; body.appendChild(h); }
    const b = document.createElement("button"); b.type = "button"; b.className = "irow"; b.innerHTML = "<b></b><span></span><small></small>"; b.children[0].textContent = r.n; b.children[1].textContent = r.s; b.children[2].textContent = r.d;
    b.addEventListener("click", () => { closePanels(); r.go(); });
    if (r.slug) { const wrap = document.createElement("div"); wrap.className = "irow-wrap"; const a = document.createElement("a"); a.className = "icase"; a.href = caseStudy(r.slug); a.textContent = "case study"; a.setAttribute("aria-label", r.n + " case study"); wrap.append(b, a); body.appendChild(wrap); } else body.appendChild(b); });
  if (!body.children.length) body.innerHTML = '<h4>Nothing matches.</h4>'; }
rows.push({ g: "Me", n: "About", s: "wall", d: "the folded note", go: () => room.goWall(() => wall.openAbout()) });
rows.push({ g: "Me", n: "Resume", s: "pdf", d: "opens in a new tab", go: () => window.open(LINKS.resume, "_blank", "noopener") });
rows.push({ g: "Me", n: "Contact", s: "email", d: LINKS.email, go: () => { $("contact-card").hidden = false; $("n-contact").setAttribute("aria-expanded", "true"); } });
renderIndex("");
$("index-q").addEventListener("input", e => renderIndex(e.target.value), L);
$("index-q").addEventListener("keydown", e => e.stopPropagation(), L);
$("n-index").addEventListener("click", () => { const open = $("index").hidden; closePanels(); $("index").hidden = !open; $("n-index").setAttribute("aria-expanded", open); if (open) setTimeout(() => $("index-q").focus({ preventScroll: true }), 30); }, L);
$("n-contact").addEventListener("click", () => { const open = $("contact-card").hidden; closePanels(); $("contact-card").hidden = !open; $("n-contact").setAttribute("aria-expanded", open); }, L);
$("contact-email").textContent = LINKS.email; $("contact-resume").href = LINKS.resume;
$("n-about").addEventListener("click", () => { closePanels(); room.goWall(() => wall.openAbout()); }, L);
const onEsc = e => { if (e.key === "Escape") closePanels(); }; window.addEventListener("keydown", onEsc, L);
vp.addEventListener("pointerdown", e => { if (!e.target.closest(".index,.contact-card,.top-nav")) closePanels(); }, L);
const api = { bench, wall, room, destroy() { lifetime.abort(); room.destroy(); wall.destroy(); bench.destroy(); } };
// deep links from case studies: /#b-<bench object> opens it on the bench, /#t-<wall item> walks up and highlights it
const deep = (window.location.hash || "").match(/^#(b|t)-([\w-]+)$/);
if (deep) { history.replaceState(null, "", window.location.pathname); setTimeout(() => { if (deep[1] === "b") toBench(deep[2]); else room.goWall(() => wall.highlight(deep[2])); }, 400); }
root.__workshop = api; // handle for tests and debugging
return api;
}
