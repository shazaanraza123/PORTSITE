// room.js: THE ROOM. One sticky viewport inside a tall scroll track.
// Scroll progress p (0..1) through the track drives the viewpoint:
//   p 0.00-0.12  rest on the bench
//   p 0.12-0.72  camera stands up and tilts toward the wall (bench.setView)
//   p 0.48-0.86  the interactive DOM wall fades and swings into place over the 3D pin-ups
//   p 0.86-1.00  rest on the wall
// Nothing hijacks the scroll: it is ordinary page scrolling, so trackpads, keyboards and scrollbars all work.
export function createRoom(opts) {
  const { track, bench, wall, wallLayer, benchUI, toggle, meter } = opts;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  let p = 0, onWall = false, raf = 0;
  function progress() { const r = track.getBoundingClientRect(); const total = r.height - window.innerHeight; return total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0; }
  function apply() {
    p = progress();
    const cam = smooth(.12, .72, p), wf = smooth(.48, .86, p);
    bench.setView(cam);
    if (cam > .25 && bench.release) bench.release(); // never leave a bench tag floating over the wall
    // the wall swings up from a tilted plane, like the camera arriving in front of it
    const tilt = (1 - wf) * 24, lift = (1 - wf) * 6;
    wallLayer.style.opacity = wf.toFixed(3);
    wallLayer.style.transform = RM ? 'none' : `perspective(1400px) translateY(${lift}%) rotateX(${tilt}deg) scale(${(.9 + wf * .1).toFixed(3)})`;
    wallLayer.style.pointerEvents = wf > .95 ? 'auto' : 'none';
    wallLayer.setAttribute('aria-hidden', wf > .5 ? 'false' : 'true');
    wallLayer.inert = wf <= .5; // keyboard focus can't wander into the wall while you're at the bench
    benchUI.forEach(el => { el.style.opacity = (1 - smooth(.08, .3, p)).toFixed(3); el.style.pointerEvents = p < .2 ? 'auto' : 'none'; el.inert = p >= .2; });
    const nowWall = p > .6;
    if (nowWall !== onWall) { onWall = nowWall; toggle.innerHTML = onWall ? '&#8595; the bench' : 'the wall &#8593;'; wallLayer.parentElement.classList.toggle('on-wall', onWall); toggle.setAttribute('aria-label', onWall ? 'Go back to the bench' : 'Look up at the wall'); }
    if (meter) meter.style.setProperty('--p', p.toFixed(3));
    // stop rendering the 3D scene once the wall fully covers it
    if (wf > .995) bench.stop(); else bench.start();
  }
  function onScroll() { if (!raf) raf = requestAnimationFrame(() => { raf = 0; apply(); }); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  function go(target, then) {
    const r = track.getBoundingClientRect(); const total = r.height - window.innerHeight; const top = window.scrollY + r.top + total * target;
    window.scrollTo({ top, behavior: RM ? 'auto' : 'smooth' });
    if (then) { const start = performance.now(); const wait = () => { if (Math.abs(progress() - target) < .01 || performance.now() - start > 2200) then(); else requestAnimationFrame(wait); }; requestAnimationFrame(wait); }
  }
  const onToggle = () => go(onWall ? 0 : 1);
  toggle.addEventListener('click', onToggle);
  apply();
  function destroy() { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); toggle.removeEventListener('click', onToggle); bench.stop(); }
  return { goWall: then => go(1, then), goBench: then => go(0, then), apply, progress: () => p, destroy };
}
