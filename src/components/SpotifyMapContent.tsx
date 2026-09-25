const LIVE_URL =
  "https://spotify-samples-8gia-e0j3hj9id-shazaanraza123s-projects.vercel.app/";

const SCREENS = [
  {
    label: "01 World Map",
    title: "World Map",
    body: "Explore music cities around the world.",
    src: "/spotify-map/world-map.png",
  },
  {
    label: "02 Chicago City View",
    title: "Chicago City View",
    body: "Zoom into a city to see trending music, local scenes, neighborhoods, and emerging sounds.",
    src: "/spotify-map/chicago-city.png",
  },
  {
    label: "03 Chicago Drill Scene",
    title: "Scene View",
    body: "Dive deeper into a scene such as Chicago Drill and explore defining tracks, artists, origins, and influence.",
    src: "/spotify-map/drill-scene.png",
  },
  {
    label: "04 Teleport",
    title: "Teleport",
    body: "Jump to a random city and discover a music culture outside your usual listening.",
    src: "/spotify-map/teleport.png",
  },
  {
    label: "05 Your Music Map",
    title: "Your Music Map",
    body: "Visualize where your own listening comes from geographically.",
    src: "/spotify-map/your-music-map.png",
  },
  {
    label: "06 Spotify Passport",
    title: "Spotify Passport",
    body: "Collect cities and scenes you've explored and track your journey through music.",
    src: "/spotify-map/passport.png",
  },
];

const PRINCIPLES = [
  "Geography as discovery",
  "Local culture over generic popularity",
  "Exploration over recommendation",
  "Make music discovery feel spatial",
];

const INTERACTIONS = [
  "Interactive city markers",
  "Local / Global discovery",
  "City and scene navigation",
  "Teleport",
  "Animated geographic routes",
  "Dynamic destination content",
  "Personalized music geography",
  "Spotify Passport",
  "Responsive interface",
];

export function SpotifyMapContent() {
  return (
    <div id="spotify-map-study" className="flex flex-col gap-16 md:gap-20">
      <p className="reveal font-display text-[clamp(1.5rem,3vw,2.25rem)] italic leading-snug text-[var(--color-tan)]">
        Hear what the world is listening to.
      </p>

      <section className="reveal" aria-labelledby="map-overview">
        <p className="label-accent text-[var(--color-tan)]">01 — Overview</p>
        <h3
          id="map-overview"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Discover music through place.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Spotify Map explores a different way to discover music: through place
          and culture rather than playlists and algorithms.
        </p>
        <p className="mt-4 max-w-2xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)] md:text-base">
          Spotify Map is an independent product concept that reimagines music
          discovery through geography. Users can explore what different cities
          are listening to, discover local music scenes, teleport to music
          cultures around the world, visualize their own listening geography,
          and collect discoveries through a Spotify Passport.
        </p>
      </section>

      <section className="reveal" aria-labelledby="map-idea">
        <p className="label-accent text-[var(--color-tan)]">02 — The Idea</p>
        <h3
          id="map-idea"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Scenes belong to cities.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Music scenes are deeply connected to cities. Chicago Drill, UK
          Garage, Afrobeats, Amapiano, City Pop, and other sounds developed
          within specific places and communities.
        </p>
        <p className="mt-8 border-l border-[var(--color-tan)] pl-5 font-display text-[clamp(1.35rem,3vw,2rem)] italic leading-snug text-[var(--color-dark)]">
          What if discovering music felt like exploring the world?
        </p>
      </section>

      <section className="reveal" aria-labelledby="map-experience">
        <p className="label-accent text-[var(--color-tan)]">03 — Core Experience</p>
        <h3
          id="map-experience"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Six ways to move through the map.
        </h3>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SCREENS.map((screen) => (
            <li key={screen.label}>
              <div className="overflow-hidden border border-[var(--color-tan)] bg-[#0c0c0c]">
                <img
                  src={screen.src}
                  alt={screen.label}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </div>
              <h4 className="mt-4 font-display text-xl text-[var(--color-dark)]">
                {screen.title}
              </h4>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                {screen.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal" aria-labelledby="map-principles">
        <p className="label-accent text-[var(--color-tan)]">04 — Product Principles</p>
        <h3
          id="map-principles"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          How the product should feel.
        </h3>
        <ul className="mt-8 grid gap-0 border-t border-[var(--color-tan)] sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <li
              key={principle}
              className="border-b border-[var(--color-tan)] py-4 font-display text-lg text-[var(--color-dark)] sm:px-4 sm:first:pl-0"
            >
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal" aria-labelledby="map-design">
        <p className="label-accent text-[var(--color-tan)]">05 — Design</p>
        <h3
          id="map-design"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          The map stays in front.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          The interface uses a dark map-first visual system, restrained
          Spotify-green accents, editorial typography, geographic visualization,
          and minimal UI so the map remains the focus.
        </p>
      </section>

      <section className="reveal" aria-labelledby="map-prototype">
        <p className="label-accent text-[var(--color-tan)]">06 — Interactive Prototype</p>
        <h3
          id="map-prototype"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          From the design to a working prototype.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          I translated the product design into a working React + TypeScript
          prototype.
        </p>
        <ul className="mt-8 grid gap-0 border-t border-[var(--color-tan)] sm:grid-cols-2 lg:grid-cols-3">
          {INTERACTIONS.map((item) => (
            <li
              key={item}
              className="border-b border-[var(--color-tan)] py-3 font-body text-sm font-light text-[var(--color-dark)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="label-accent mt-8 text-[var(--color-dark)]">
          React · TypeScript · Vite · CSS · Figma · Vercel
        </p>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noreferrer"
          className="label-accent mt-8 inline-flex border border-[var(--color-dark)] px-5 py-3 text-[var(--color-dark)] no-underline transition-colors hover:border-[var(--color-tan)] hover:text-[var(--color-tan)]"
        >
          Launch Live Prototype →
        </a>
        <p className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
          Independent product concept. Not affiliated with Spotify. Listening
          and trending data shown in the prototype is mock data.
        </p>
      </section>
    </div>
  );
}
