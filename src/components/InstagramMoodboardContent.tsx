const PROTOTYPE_URL = "https://quick-flurry-e5w05nm.vercel.app";
const CODE_URL = "https://github.com/shazaanraza123/IGMOODBOARDMOCKUP";

const SHOTS = [
  {
    src: "/instagram-moodboard/feed.png",
    label: "Feed",
    body: "The feed is where a save starts. Every post can be kept, noted, and sent to a moodboard.",
  },
  {
    src: "/instagram-moodboard/find-similar.png",
    label: "Find similar",
    body: "Results are labeled Exact match, Similar product, or Inspiration, based on the details you picked.",
  },
  {
    src: "/instagram-moodboard/ideas.png",
    label: "Idea directions",
    body: "Develop an idea turns the posts you chose into directions you can edit and save to a brief.",
  },
];

export function InstagramMoodboardContent() {
  return (
    <div id="instagram-moodboard-study" className="flex flex-col gap-16 md:gap-20">
      <div className="reveal">
        <p className="font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
          Independent concept. Not affiliated with Instagram or Meta.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={PROTOTYPE_URL}
            target="_blank"
            rel="noreferrer"
            className="label-accent inline-flex border border-[var(--color-dark)] px-5 py-3 text-[var(--color-dark)] no-underline transition-colors hover:border-[var(--color-tan)] hover:text-[var(--color-tan)]"
          >
            Try the prototype
          </a>
          <a
            href={CODE_URL}
            target="_blank"
            rel="noreferrer"
            className="label-accent inline-flex border border-[var(--color-tan)] px-5 py-3 text-[var(--color-dark)] no-underline transition-colors hover:border-[var(--color-dark)] hover:text-[var(--color-tan)]"
          >
            View code
          </a>
        </div>
        <figure className="mx-auto mt-10 w-full max-w-[400px]">
          <img
            src="/instagram-moodboard/walkthrough.gif"
            alt="Walkthrough of saving a post, finding similar boots, and generating idea directions"
            className="block h-auto w-full border border-[var(--color-tan)]"
            width={400}
            height={804}
          />
        </figure>
      </div>

      <section className="reveal" aria-labelledby="ig-overview">
        <p className="label-accent text-[var(--color-tan)]">01 — Overview</p>
        <h3
          id="ig-overview"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Saved is where inspiration gets lost.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Instagram&apos;s Saved tab is where inspiration gets lost. Moodboard
          turns Saved into a workspace for finding more of what you like, and
          for making something of your own.
        </p>
      </section>

      <section className="reveal" aria-labelledby="ig-flows">
        <p className="label-accent text-[var(--color-tan)]">02 — Two flows</p>
        <h3
          id="ig-flows"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Find more, or make something.
        </h3>
        <div className="mt-8 grid gap-8 border-t border-[var(--color-tan)] md:grid-cols-2">
          <div className="border-b border-[var(--color-tan)] py-6 md:border-b-0 md:pr-8">
            <p className="label-accent text-[var(--color-tan)]">Flow A</p>
            <p className="mt-3 font-display text-xl text-[var(--color-dark)]">
              I like this. Help me find more of it.
            </p>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
              Save a post from the feed, keep a note on it, and pick the
              details you want more of.
            </p>
          </div>
          <div className="py-6 md:border-l md:border-[var(--color-tan)] md:pl-8">
            <p className="label-accent text-[var(--color-tan)]">Flow B</p>
            <p className="mt-3 font-display text-xl text-[var(--color-dark)]">
              This inspires me. Help me make something of my own.
            </p>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
              Group a creator board, generate directions from only those posts,
              and save one to a brief.
            </p>
          </div>
        </div>
      </section>

      <section className="reveal" aria-labelledby="ig-screens">
        <p className="label-accent text-[var(--color-tan)]">03 — Prototype</p>
        <h3
          id="ig-screens"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Three screens from the working prototype.
        </h3>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {SHOTS.map((shot) => (
            <li key={shot.label}>
              <div className="overflow-hidden border border-[var(--color-tan)] bg-[#0c0c0c]">
                <img
                  src={shot.src}
                  alt={shot.label}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </div>
              <h4 className="mt-4 font-display text-xl text-[var(--color-dark)]">
                {shot.label}
              </h4>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                {shot.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal" aria-labelledby="ig-labels">
        <p className="label-accent text-[var(--color-tan)]">04 — Result labels</p>
        <h3
          id="ig-labels"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Exact match is rare on purpose.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Find similar uses three labels. Exact match shows only when a product
          is tagged, it has every detail you picked, and it is the same kind of
          post. Similar product is tagged but misses something. Inspiration has
          no product tag, so it is a reference rather than a shop result.
        </p>
      </section>

      <section className="reveal" aria-labelledby="ig-simulated">
        <p className="label-accent text-[var(--color-tan)]">05 — What&apos;s simulated</p>
        <h3
          id="ig-simulated"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Help you can skip.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Find similar and Develop an idea are optional. You can save, note,
          and rearrange a board without generating anything. Similarity scores
          shared attributes, and directions come from templates filled with the
          posts you picked. Neither one calls the network.
        </p>
        <p className="mt-6 font-body text-sm font-light text-[var(--color-dark)]">
          Independent concept. Not affiliated with Instagram or Meta.
        </p>
      </section>
    </div>
  );
}
