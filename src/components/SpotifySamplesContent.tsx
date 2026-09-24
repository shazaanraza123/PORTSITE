import type { Project } from "../data/projects";

interface SpotifySamplesContentProps {
  project: Project;
}

export function SpotifySamplesContent({ project }: SpotifySamplesContentProps) {
  return (
    <div className="bg-[#0b0b0b] text-white">
      <div className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="label-accent text-[#1ed760]">THE IDEA</p>
              <h3 className="mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95]">
                Discover the music behind the music.
              </h3>
              <p className="mt-7 max-w-xl font-body text-base font-light leading-relaxed text-white/70 md:text-lg">
                Spotify is great at showing what to play next. Samples creates another path for discovery by showing where a song came from and where that sound went next.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://spotify-samples.vercel.app" target="_blank" rel="noreferrer" className="rounded-full bg-[#1ed760] px-6 py-3 text-sm font-medium text-black no-underline transition-transform hover:-translate-y-0.5">
                  TRY LIVE PROTOTYPE ↗
                </a>
                <a href="https://github.com/shazaanraza123/spotify-samples" target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3 text-sm text-white no-underline transition-colors hover:border-white">
                  VIEW GITHUB ↗
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212] p-3 shadow-2xl">
              <iframe
                src="https://spotify-samples.vercel.app"
                title="Spotify Samples interactive prototype"
                className="h-[720px] w-full rounded-[1.4rem] border-0 bg-black"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-24 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
            {[
              ["01", "Compare", "Switch between the original source and sampled track to hear the relationship."],
              ["02", "Follow", "Move through a sample chain to see how music connects across artists and eras."],
              ["03", "Discover", "Turn sample history into another way to find songs worth saving and exploring."],
            ].map(([number, title, body]) => (
              <div key={number} className="bg-[#111] p-8">
                <span className="label-accent text-[#1ed760]">{number}</span>
                <h4 className="mt-5 font-display text-3xl font-semibold">{title}</h4>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/60">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid gap-12 border-t border-white/15 pt-16 lg:grid-cols-2">
            <div>
              <p className="label-accent text-[#1ed760]">PROBLEM</p>
              <h3 className="mt-4 font-display text-4xl font-semibold">Discovery usually moves forward.</h3>
            </div>
            <p className="text-base font-light leading-relaxed text-white/65 md:text-lg">
              Music apps are built around recommendations, playlists, and what to hear next. But a huge part of discovering music is understanding its history. Samples brings that context into the listening experience instead of making people leave the app to search for it.
            </p>
          </div>

          <div className="mt-24">
            <p className="label-accent text-[#1ed760]">CORE FLOW</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-display text-[clamp(1.4rem,3vw,2.4rem)]">
              <span>Now Playing</span><span className="text-[#1ed760]">→</span>
              <span>Samples</span><span className="text-[#1ed760]">→</span>
              <span>Compare</span><span className="text-[#1ed760]">→</span>
              <span>Sample Chain</span><span className="text-[#1ed760]">→</span>
              <span>Explore</span>
            </div>
          </div>

          <div className="mt-24 grid gap-12 border-y border-white/15 py-16 lg:grid-cols-2">
            <div>
              <p className="label-accent text-[#1ed760]">HERO INTERACTION</p>
              <h3 className="mt-4 font-display text-4xl font-semibold">A/B sample comparison.</h3>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/65">
                The main interaction lets a listener move between the original source and the sampled song without losing context. The prototype uses Through the Fire by Chaka Khan and Through the Wire by Kanye West to show the idea.
              </p>
            </div>
            <div>
              <p className="label-accent text-[#1ed760]">FROM UTILITY → DISCOVERY</p>
              <h3 className="mt-4 font-display text-4xl font-semibold">The sample is only the start.</h3>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/65">
                Sample Chain expands one connection into a path through music history, while Explore Samples turns those relationships into a repeatable discovery surface.
              </p>
            </div>
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="label-accent text-[#1ed760]">BUILDING IT</p>
              <h3 className="mt-4 font-display text-4xl font-semibold">Figma → React + TypeScript.</h3>
              <p className="mt-5 text-base font-light leading-relaxed text-white/65">
                I started with the product flow and interface in Figma, then rebuilt it as an interactive Vite app. Navigation, playback states, progress behavior, responsive layouts, accessibility, and microinteractions were implemented in the working prototype.
              </p>
            </div>
            <div>
              <p className="label-accent text-[#1ed760]">WHAT I’D TEST</p>
              <h3 className="mt-4 font-display text-4xl font-semibold">Does context create discovery?</h3>
              <p className="mt-5 text-base font-light leading-relaxed text-white/65">
                Next I would test whether listeners understand the Samples entry point, whether A/B comparison increases source-song discovery, and which placement gets used naturally without interrupting listening.
              </p>
            </div>
          </div>

          <div className="mt-24 rounded-2xl border border-white/10 bg-[#111] p-8 md:p-12">
            <p className="label-accent text-[#1ed760]">PROPOSED SUCCESS METRICS</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Sample opens", "A/B interactions", "Source song plays + saves", "Sample chain exploration"].map((metric) => (
                <div key={metric} className="border-t border-white/20 pt-4 text-sm text-white/70">{metric}</div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-24 max-w-4xl text-center font-display text-[clamp(2rem,5vw,4rem)] italic leading-tight text-white/90">
            “Music discovery doesn’t only have to move forward. Sometimes the best discovery is finding where the music came from.”
          </p>
        </div>
      </div>
    </div>
  );
}
