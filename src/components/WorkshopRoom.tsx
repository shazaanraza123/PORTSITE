"use client";
// WorkshopRoom.tsx: renders the Workshop markup once and hands it to mountWorkshop(), the exact wiring the prototype runs.
// Do not port the engines into React state. React owns markup, the engines own motion.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mountWorkshop } from "../workshop/engine/mount.js";
import * as content from "../workshop/data/content.js";
import { ASSETS, WALLET_OUTLINE, YE_SAMPLE } from "../workshop/data/assets.js";
// Vite: keep this import. Next.js App Router: move it to app/layout.tsx.
import "../workshop/styles/workshop.css";

export default function WorkshopRoom() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const ws = mountWorkshop({ root: root.current, THREE, content, assets: { ASSETS, WALLET_OUTLINE, YE_SAMPLE } });
    return () => ws.destroy();
  }, []);

  return (
    <div ref={root}>
      <section className="room-track" id="room" aria-label="The workshop">
        <div className="room-vp" id="room-vp">
          <div className="gl" id="bench-gl" />

          {/* BENCH UI (fades on the wall) */}
          <div className="a-name bench-ui"><span className="dymo">Shazaan Raza</span><span className="typed">product design / creative technology / front-end</span></div>
          <div className="hover-name" id="hover-name" hidden />
          <div className="first-hint bench-ui" id="first-hint">pick something up</div>
          <div className="tag" id="a-tag" hidden role="dialog" aria-live="polite" aria-labelledby="a-tag-h">
            <button className="tclose" id="a-tag-x" type="button" aria-label="Put it back">&times;</button>
            <div className="k" id="a-tag-k" />
            <h3 id="a-tag-h" />
            <p className="obj" id="a-tag-obj" />
            <p className="meta" id="a-tag-meta" />
            <div className="plate-wrap" id="a-plate-wrap" hidden><div className="plate" id="a-plate" /><div className="dots" id="a-dots" /></div>
            <p className="line" id="a-tag-p" />
            <div className="ctl" id="a-tag-ctl" />
            <div className="acts" id="a-tag-acts" />
          </div>

          {/* WALL */}
          <div className="wall-layer" id="wall-layer" aria-hidden="true">
            <div className="board" id="wall-board" />
            <div className="sun" aria-hidden="true" />
            <div className="wall-foot" id="wall-foot">
              <div className="desk" aria-hidden="true" />
              <div className="drawer" id="c-drawer">
                <div className="box"><div className="folders" role="tablist" aria-label="Archive folders" /><div className="folder-body" id="fbody" role="tabpanel" /></div>
                <div className="front"><span className="label">archive</span><button className="handle" type="button" aria-expanded="false" aria-label="Open the archive drawer" /><span className="count" /></div>
              </div>
            </div>
          </div>

          {/* PERSISTENT */}
          <nav className="top-nav" aria-label="Site">
            <button className="dymo" id="n-index" aria-expanded="false">Index</button>
            <button className="dymo" id="n-about">About</button>
            <a className="dymo" id="n-resume" href="#" target="_blank" rel="noopener">Resume</a>
            <button className="dymo" id="n-contact" aria-expanded="false">Contact</button>
            <button className="dymo" id="n-sound" aria-pressed="false">Sound off</button>
          </nav>
          <div className="index" id="index" hidden role="dialog" aria-label="Project index">
            <div className="ihead"><b>Everything, plainly</b><label htmlFor="index-q" style={{ position: "absolute", left: -9999 }}>Search projects</label><input id="index-q" type="search" placeholder="search projects" autoComplete="off" /></div>
            <div className="ibody" id="index-body" />
          </div>
          <div className="contact-card" id="contact-card" hidden><b>say hi</b><span className="em" id="contact-email" /><a id="contact-resume" href="#" target="_blank" rel="noopener">resume &#8599;</a></div>
          <div className="meter" id="meter" aria-hidden="true"><span>bench</span><div className="bar" /><span>wall</span></div>
          <button className="dymo turn" id="turn" aria-label="Look up at the wall">look up at the wall</button>
        </div>
      </section>
    </div>
  );
}
