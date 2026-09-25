import { useState } from "react";

const LIVE_URL = "https://spotify-samples.vercel.app";
const GITHUB_URL = "https://github.com/shazaanraza123/spotify-samples";

const FLOW = ["Now Playing", "Samples", "Compare", "Sample Chain", "Explore"];

const EXPLORE = [
  {
    title: "Hip-Hop Classics",
    body: "A shelf of records people already know, opened through the samples inside them.",
  },
  {
    title: "Soul → Rap",
    body: "A path from the source era into the songs that borrowed from it.",
  },
  {
    title: "Your Sample Trail",
    body: "A personal thread of origins a listener has already opened.",
  },
  {
    title: "Era-based discovery",
    body: "Jump decades without leaving the song that started the search.",
  },
];

const BUILT = [
  "Responsive UI",
  "Interactive navigation",
  "Simulated playback states",
  "Progress behavior",
  "Microinteractions",
  "Accessibility considerations",
];

const TESTS = [
  "Do users understand the Samples entry point?",
  "Does A/B comparison lead to more source-song discovery?",
  "Where should Samples live without interrupting normal listening?",
];

const METRICS = [
  { label: "Sample opens", note: "How often listeners enter Samples from a track." },
  { label: "A/B comparison interactions", note: "Switches between the source and the sampled song." },
  { label: "Source-song plays and saves", note: "Whether the original actually gets heard and kept." },
  { label: "Sample Chain exploration", note: "How far a listener follows one connection into the next." },
  { label: "Playlist adds after sample discovery", note: "Songs saved because of where they came from." },
];

function Ctas({ prominent = false }: { prominent?: boolean }) {
  return (
    <div className={`ss-ctas${prominent ? " ss-ctas--prominent" : ""}`}>
      <a className="ss-btn ss-btn--primary" href={LIVE_URL} target="_blank" rel="noreferrer">
        Try Live Prototype
      </a>
      <a className="ss-btn ss-btn--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
        View GitHub
      </a>
    </div>
  );
}

export function SpotifySamplesContent() {
  const [side, setSide] = useState<"original" | "sampled">("sampled");

  return (
    <div className="spotify-samples">
      <div className="ss-inner">
        <header className="ss-hero reveal">
          <p className="label-accent ss-kicker">Spotify Samples · 2026</p>
          <h3 className="ss-display font-display">Spotify Samples</h3>
          <p className="ss-headline font-display">Discover the music behind the music.</p>
          <p className="ss-meta">Product Design · UI/UX · Frontend Development</p>
          <p className="ss-meta ss-meta--tools">Figma · React · TypeScript</p>
          <Ctas prominent />
          <figure className="ss-frame">
            <figcaption className="ss-frame-bar">
              <span className="ss-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span>spotify-samples.vercel.app</span>
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Open
              </a>
            </figcaption>
            <div className="ss-frame-viewport">
              <iframe
                title="Spotify Samples live prototype preview"
                src={LIVE_URL}
                loading="lazy"
              />
            </div>
            <p className="ss-frame-note">
              Working front-end prototype. Playback and catalog states are simulated.
            </p>
          </figure>
        </header>

        <section className="ss-block reveal" aria-labelledby="ss-problem">
          <p className="label-accent ss-index">01</p>
          <h3 id="ss-problem" className="ss-heading font-display">
            Music discovery usually moves forward.
          </h3>
          <p className="ss-copy">
            Spotify is great at helping listeners figure out what to play next, but
            discovering where music came from usually means leaving the app. Samples,
            interpolations, and musical connections are a huge part of how people
            discover older music.
          </p>
        </section>

        <section className="ss-block reveal" aria-labelledby="ss-idea">
          <p className="label-accent ss-index">02</p>
          <h3 id="ss-idea" className="ss-heading font-display">
            Bring the relationship into the song.
          </h3>
          <p className="ss-copy">
            Spotify Samples puts those connections inside the listening experience.
            From the track that is already playing, a listener can open the sample,
            compare it, follow the chain, and keep exploring.
          </p>
          <ol className="ss-flow">
            {FLOW.map((step, index) => (
              <li key={step}>
                <span className="ss-flow-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="ss-flow-name">{step}</span>
                {index < FLOW.length - 1 && <span className="ss-flow-arrow" aria-hidden>→</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="ss-block ss-block--compare reveal" aria-labelledby="ss-compare">
          <p className="label-accent ss-index">03</p>
          <h3 id="ss-compare" className="ss-heading font-display">
            Hear the source, then the sample.
          </h3>
          <p className="ss-copy">
            Listeners can quickly switch between the original source and the sampled
            song to understand the connection.
          </p>
          <div className="ss-compare" data-active={side}>
            <article className={`ss-side${side === "original" ? " is-active" : ""}`}>
              <p className="label-accent">Original</p>
              <h4 className="font-display">Through the Fire</h4>
              <p className="ss-artist">Chaka Khan</p>
              <p className="ss-time">0:58</p>
              <div className="ss-bar" aria-hidden>
                <span style={{ width: "22%" }} />
              </div>
            </article>
            <div className="ss-switch">
              <button
                type="button"
                aria-pressed={side === "original"}
                onClick={() => setSide("original")}
              >
                Source
              </button>
              <button
                type="button"
                aria-pressed={side === "sampled"}
                onClick={() => setSide("sampled")}
              >
                Sample
              </button>
            </div>
            <article className={`ss-side${side === "sampled" ? " is-active" : ""}`}>
              <p className="label-accent">Sampled</p>
              <h4 className="font-display">Through the Wire</h4>
              <p className="ss-artist">Kanye West</p>
              <p className="ss-time">0:04</p>
              <div className="ss-bar" aria-hidden>
                <span style={{ width: "6%" }} />
              </div>
            </article>
          </div>
        </section>

        <section className="ss-block reveal" aria-labelledby="ss-chain">
          <p className="label-accent ss-index">04</p>
          <h3 id="ss-chain" className="ss-heading font-display">
            One sample opens the next.
          </h3>
          <p className="ss-copy">
            A sample can lead to another piece of music and build a discovery path
            through different artists and eras.
          </p>
          <ol className="ss-chain">
            <li>
              <span className="ss-chain-era">Source</span>
              <strong>Through the Fire</strong>
              <span>Chaka Khan</span>
            </li>
            <li>
              <span className="ss-chain-era">Sample</span>
              <strong>Through the Wire</strong>
              <span>Kanye West</span>
            </li>
            <li>
              <span className="ss-chain-era">Next connection</span>
              <strong>Another record</strong>
              <span>That borrows the idea</span>
            </li>
            <li>
              <span className="ss-chain-era">New era</span>
              <strong>Somewhere else</strong>
              <span>The listener would not have queued</span>
            </li>
          </ol>
        </section>

        <section className="ss-block reveal" aria-labelledby="ss-explore">
          <p className="label-accent ss-index">05</p>
          <h3 id="ss-explore" className="ss-heading font-display">
            From a utility into a place to browse.
          </h3>
          <p className="ss-copy">
            Once the connection is visible, Samples can grow past a single lookup
            into a surface for browsing origins.
          </p>
          <ul className="ss-explore">
            {EXPLORE.map((item) => (
              <li key={item.title}>
                <h4 className="font-display">{item.title}</h4>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="ss-block reveal" aria-labelledby="ss-build">
          <p className="label-accent ss-index">06</p>
          <h3 id="ss-build" className="ss-heading font-display">
            From Figma to a working product.
          </h3>
          <p className="ss-copy">
            I designed the product flow and interface in Figma, then built the
            interactive prototype in React, TypeScript, and Vite. It is a front-end
            concept with simulated listening states, not Spotify’s backend or
            production APIs.
          </p>
          <ul className="ss-built">
            {BUILT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="ss-split">
          <section className="ss-block reveal" aria-labelledby="ss-test">
            <p className="label-accent ss-index">07</p>
            <h3 id="ss-test" className="ss-heading font-display">
              What I would test
            </h3>
            <ul className="ss-questions">
              {TESTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="ss-block reveal" aria-labelledby="ss-metrics">
            <p className="label-accent ss-index">08 · Proposed</p>
            <h3 id="ss-metrics" className="ss-heading font-display">
              Proposed success metrics
            </h3>
            <p className="ss-proposed">Proposed metrics. Not measured results.</p>
            <ul className="ss-metrics">
              {METRICS.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="ss-end reveal">
          <p className="ss-end-line font-display">
            Music discovery doesn&apos;t only have to move forward. Sometimes the
            best discovery is finding where the music came from.
          </p>
          <Ctas />
        </footer>
      </div>
    </div>
  );
}
