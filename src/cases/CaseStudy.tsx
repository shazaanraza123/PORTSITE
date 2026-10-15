import { useEffect, useMemo } from "react";
import { CASES, caseBySlug, type Media, type Section } from "./cases";
import "./cases.css";

// One template for every case study, in the Workshop's language: paper, label-maker tapes, serif + mono + hand.
// Visual first: the real artifact leads, then identity, then explanation.

function Frame({ m, priority = false }: { m: Media; priority?: boolean }) {
  const cls = `cs-media cs-${m.frame ?? "plain"}${m.kind === "video" && m.vertical ? " cs-vertical" : ""}`;
  return (
    <figure className={cls}>
      <div className="cs-shell">
        {m.frame === "browser" && <div className="cs-bar" aria-hidden="true"><i /><i /><i /></div>}
        {m.kind === "img" ? (
          <img src={m.src} alt={m.alt} width={m.w} height={m.h} loading={priority ? "eager" : "lazy"} decoding="async" />
        ) : (
          <video src={m.src} aria-label={m.alt} controls muted playsInline preload="metadata" />
        )}
      </div>
      {m.cap && <figcaption>{m.cap}</figcaption>}
    </figure>
  );
}

function Block({ s, i }: { s: Section; i: number }) {
  const n = String(i + 1).padStart(2, "0");
  const head = <h2 className="cs-h"><span className="cs-n" aria-hidden="true">{n}</span>{s.h}</h2>;
  switch (s.kind) {
    case "text": return <section className="cs-sec cs-text">{head}{s.body.filter(Boolean).map((p, k) => <p key={k}>{p}</p>)}</section>;
    case "list": return <section className="cs-sec">{head}<ul className="cs-list">{s.items.map(t => <li key={t}>{t}</li>)}</ul>{s.note && <p className="cs-note">{s.note}</p>}</section>;
    case "defs": return <section className="cs-sec">{head}{s.note && <p className="cs-note cs-note--top">{s.note}</p>}<dl className="cs-defs">{s.items.map(d => <div key={d.t}><dt>{d.t}</dt><dd>{d.d}</dd></div>)}</dl></section>;
    case "steps": return (
      <section className="cs-sec">{head}
        {s.lanes.map(l => (
          <div className="cs-lane" key={l.label}>
            <p className="cs-lane-label">{l.label}</p>
            <ol className="cs-steps">{l.steps.map((t, k) => <li key={t}><span aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>{t}</li>)}</ol>
          </div>))}
        {s.note && <p className="cs-note">{s.note}</p>}
      </section>);
    case "gallery": return (
      <section className="cs-sec cs-sec--wide">{head}{s.intro && <p className="cs-intro">{s.intro}</p>}
        <div className={`cs-gallery cs-gallery--${s.layout ?? "mixed"}`}>{s.items.map(m => <Frame key={m.src} m={m} />)}</div>
      </section>);
    case "stops": return (
      <section className="cs-sec cs-sec--wide">{head}
        <div className="cs-stops">{s.stops.map((st, k) => (
          <article className="cs-stop" key={st.city + k}>
            <header><h3>{st.city}{st.upcoming && <span className="cs-stamp">upcoming</span>}</h3><p className="cs-tag">{st.tag}</p></header>
            <p>{st.body}</p>
            {st.media.length > 0 && <div className="cs-gallery cs-gallery--sheet">{st.media.map(m => <Frame key={m.src} m={m} />)}</div>}
          </article>))}
        </div>
      </section>);
    case "bars": { const max = Math.max(...s.rows.map(r => r.value));
      return (
        <section className="cs-sec">{head}{s.intro && <p className="cs-intro">{s.intro}</p>}
          <table className="cs-bars"><caption className="cs-sr">Records per domain</caption><tbody>{s.rows.map(r => (
            <tr key={r.label}><th scope="row">{r.label}</th><td><span className="cs-bar" style={{ width: `${Math.max(1.2, (r.value / max) * 100)}%` }} /></td><td className="cs-num">{r.value.toLocaleString("en-US")}</td></tr>))}
          </tbody></table>{s.note && <p className="cs-note">{s.note}</p>}
        </section>); }
    case "stats": return <section className="cs-sec">{head}<dl className="cs-stats">{s.items.map(x => <div key={x.label}><dt>{x.label}</dt><dd>{x.value}</dd></div>)}</dl>{s.note && <p className="cs-note">{s.note}</p>}</section>;
    case "compare": return (
      <section className="cs-sec">{head}<p className="cs-intro">{s.body}</p>
        <div className="cs-compare">{[s.a, s.b].map(x => <div key={x.label} className="cs-side"><p className="cs-k">{x.label}</p><p className="cs-song">{x.title}</p><p>{x.artist} <span className="cs-time">{x.time}</span></p></div>)}</div>
      </section>);
  }
}

export default function CaseStudy({ slug }: { slug: string }) {
  const cs = caseBySlug(slug);
  const idx = CASES.findIndex(x => x.slug === slug);
  const next = useMemo(() => CASES[(idx + 1) % CASES.length], [idx]);
  useEffect(() => { document.title = cs ? `${cs.n} / Shazaan Raza` : "Not found / Shazaan Raza"; }, [cs]);

  if (!cs) return (
    <main className="cs-page cs-missing"><a className="cs-tape" href="/">&larr; the workshop</a><h1>Nothing on the bench by that name.</h1><p><a href="/">Back to the workshop</a></p></main>
  );
  return (
    <main className="cs-page">
      <nav className="cs-top" aria-label="Site">
        <a className="cs-tape" href="/">&larr; the workshop</a>
        <span className="cs-who">Shazaan Raza</span>
      </nav>

      <header className="cs-hero">
        <div className="cs-id">
          <p className="cs-k">{cs.kicker}</p>
          <h1>{cs.n}</h1>
          <p className="cs-line">{cs.line}</p>
          <dl className="cs-meta">
            <div><dt>Role</dt><dd>{cs.meta.role}</dd></div>
            <div><dt>Year</dt><dd>{cs.meta.year}</dd></div>
            <div><dt>Status</dt><dd>{cs.meta.status}</dd></div>
            <div><dt>Tools</dt><dd>{cs.meta.tools}</dd></div>
          </dl>
          {(cs.links.length > 0 || cs.thinking || cs.bench) && (
            <div className="cs-links">
              {cs.links.map(l => <a key={l.href} className="cs-tape" href={l.href} target="_blank" rel="noopener">{l.label} <span aria-hidden="true">&#8599;</span></a>)}
              {cs.bench && <a className="cs-tape cs-tape--light" href={`/#b-${cs.bench}`}>On the bench</a>}
              {cs.thinking && <a className="cs-tape cs-tape--light" href={`/#t-${cs.thinking}`}>The thinking, on the wall</a>}
            </div>)}
        </div>
        <div className="cs-heroart"><Frame m={cs.hero} priority /></div>
      </header>

      <div className="cs-body">{cs.sections.map((s, i) => <Block key={s.h + i} s={s} i={i} />)}</div>

      <footer className="cs-foot">
        <p className="cs-sources">Sources: {cs.sources}</p>
        <a className="cs-next" href={`/work/${next.slug}`}><span>next</span>{next.n} <span aria-hidden="true">&rarr;</span></a>
      </footer>
    </main>
  );
}
