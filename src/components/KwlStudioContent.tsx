const SHOP_URL = "https://kwlstudio.shop";

const SWATCHES = [
  { name: "Black", hex: "#111111" },
  { name: "Chrome silver", hex: "#c5c5c5" },
  { name: "Toxic LCD green", hex: "#39ff14" },
  { name: "Blood red", hex: "#b11226" },
  { name: "Lime handwriting", hex: "#c6f24e" },
];

const STEPS = [
  {
    label: "Sketch",
    body: "Hand drawings first, before anything gets made.",
  },
  {
    label: "Manufacturer brief",
    body: "Materials, colorways, and how the star buckle comes off.",
  },
  {
    label: "Business plan",
    body: "How a one-run brand actually works.",
  },
  {
    label: "Campaign deck",
    body: "How the drop gets talked about.",
  },
];

function Shot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-auto w-full border border-[var(--color-tan)]"
      />
      <figcaption className="mt-3 font-body text-sm font-light text-[var(--color-dark)]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function KwlStudioContent() {
  return (
    <div id="kwl-studio-study" className="flex flex-col gap-16 md:gap-20">
      <div className="reveal">
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noreferrer"
          className="label-accent inline-flex border border-[var(--color-dark)] px-5 py-3 text-[var(--color-dark)] no-underline transition-colors hover:border-[var(--color-tan)] hover:text-[var(--color-tan)]"
        >
          Visit kwlstudio.shop
        </a>
      </div>

      <section className="reveal" aria-labelledby="kwl-what">
        <p className="label-accent text-[var(--color-tan)]">01. What it is</p>
        <h3
          id="kwl-what"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          One run. Then it&apos;s gone.
        </h3>
        <div className="mt-5 max-w-2xl space-y-4 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          <p>
            KWL is a drop-only accessories brand. Every product is a numbered
            drop that gets one limited run and never restocks.
          </p>
          <p>
            It&apos;s pre-launch right now. Two products are in development and
            nothing&apos;s for sale yet. There&apos;s already an affiliate
            partnership with Paris Saint Studio.
          </p>
        </div>
      </section>

      <section className="reveal" aria-labelledby="kwl-role">
        <p className="label-accent text-[var(--color-tan)]">02. My role</p>
        <h3
          id="kwl-role"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Everything.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Brand identity, product design, manufacturer briefs, the business
          plan, the campaign deck, and designing and building the site.
        </p>
      </section>

      <section className="reveal" aria-labelledby="kwl-brand">
        <p className="label-accent text-[var(--color-tan)]">03. The brand</p>
        <h3
          id="kwl-brand"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Lowercase, deadpan, a little contradictory.
        </h3>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="label-accent text-[var(--color-tan)]">Voice</p>
            <p className="mt-3 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
              The anchor line is printed on the wallet: &quot;i hate this
              wallet, its awesome.&quot;
            </p>
          </div>
          <div>
            <p className="label-accent text-[var(--color-tan)]">Symbols</p>
            <p className="mt-3 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
              The star is the belt buckle. The mountain is the wallet. Both
              get reused as bullets, badges, and icons.
            </p>
          </div>
          <div>
            <p className="label-accent text-[var(--color-tan)]">Naming</p>
            <p className="mt-3 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
              Every product is a numbered drop. DROP 001 is STAR BELT 001.
              DROP 002 is PEAK WALLET 002.
            </p>
          </div>
          <div>
            <p className="label-accent text-[var(--color-tan)]">
              Recurring bits
            </p>
            <p className="mt-3 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
              PARENTAL ADVISORY: NO RESTOCKS. And 1-800-KWL-STAR.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <p className="label-accent text-[var(--color-tan)]">Palette</p>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((swatch) => (
              <li key={swatch.name}>
                <div
                  className="h-16 w-full border border-[var(--color-tan)]"
                  style={{ backgroundColor: swatch.hex }}
                />
                <p className="mt-2 font-body text-sm font-light text-[var(--color-dark)]">
                  {swatch.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="reveal" aria-labelledby="kwl-products">
        <p className="label-accent text-[var(--color-tan)]">04. The products</p>
        <h3
          id="kwl-products"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Two drops. Both still cooking.
        </h3>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className="border border-[var(--color-tan)] p-5 md:p-6">
            <p className="label-accent text-[var(--color-tan)]">DROP 001</p>
            <h4 className="mt-3 font-display text-2xl text-[var(--color-dark)]">
              STAR BELT 001
            </h4>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
              A reversible caviar quilted leather belt with a detachable star
              buckle. Two colorways, black/red and white/yellow. Smaller stars
              run along the strap. The big star is the buckle.
            </p>
            <p className="mt-4 font-body text-sm font-light text-[var(--color-dark)]">
              Status IN THE WORKS. Price ???
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <figure>
                <img
                  src="/kwl-studio/belt-drawn-black.jpg"
                  alt="Hand-drawn black and red star belt, the buckle is a large star"
                  loading="lazy"
                  className="block h-auto w-full border border-[var(--color-tan)]"
                />
              </figure>
              <figure>
                <img
                  src="/kwl-studio/belt-drawn-white.jpg"
                  alt="Hand-drawn white and yellow star belt, the buckle is a large star"
                  loading="lazy"
                  className="block h-auto w-full border border-[var(--color-tan)]"
                />
              </figure>
            </div>
            <p className="mt-3 font-body text-sm font-light text-[var(--color-dark)]">
              sketch, real photos coming.
            </p>
          </article>

          <article className="border border-[var(--color-tan)] p-5 md:p-6">
            <p className="label-accent text-[var(--color-tan)]">DROP 002</p>
            <h4 className="mt-3 font-display text-2xl text-[var(--color-dark)]">
              PEAK WALLET 002
            </h4>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
              A cardholder shaped like a snowy blue mountain range, with
              stitched edges and layered mountain card slots. &quot;i hate this
              wallet, its awesome&quot; is written on the front in lime
              handwriting.
            </p>
            <p className="mt-4 font-body text-sm font-light text-[var(--color-dark)]">
              Status IN THE WORKS. Price ???
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <img
                src="/kwl-studio/wallet-front.jpg"
                alt="Peak Wallet front, a blue mountain cardholder with lime handwriting"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
              <img
                src="/kwl-studio/wallet-open.jpg"
                alt="Peak Wallet opened from the top, showing the mountain shape"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
              <img
                src="/kwl-studio/wallet-card.jpg"
                alt="Peak Wallet card slot, a layered mountain pocket"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
              <img
                src="/kwl-studio/wallet-closeup.jpg"
                alt="Close-up of the Peak Wallet mountain edge and stitching"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
            </div>
          </article>
        </div>
      </section>

      <section className="reveal" aria-labelledby="kwl-process">
        <p className="label-accent text-[var(--color-tan)]">05. Process</p>
        <h3
          id="kwl-process"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Sketch, then the paperwork.
        </h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.label} className="border border-[var(--color-tan)] p-4">
              <p className="label-accent text-[var(--color-tan)]">
                0{index + 1}
              </p>
              <p className="mt-3 font-display text-lg text-[var(--color-dark)]">
                {step.label}
              </p>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Shot
            src="/kwl-studio/wallet-drawn.jpg"
            alt="Hand-drawn sketch of the Peak Wallet mountain cardholder"
            caption="Sketch."
          />
          <Shot
            src="/kwl-studio/wallet-front.jpg"
            alt="Finished Peak Wallet sample, front view"
            caption="The product."
          />
        </div>
      </section>

      <section className="reveal" aria-labelledby="kwl-site">
        <p className="label-accent text-[var(--color-tan)]">06. The site</p>
        <h3
          id="kwl-site"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          A 2004 homepage, in a chrome window.
        </h3>
        <div className="mt-5 max-w-2xl space-y-4 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          <p>
            The site is a dark take on a 2000s homepage. Think a Winamp or
            Windows Media Player skin mixed with a 2004 MySpace page, sitting
            in a chrome window over a chaotic background.
          </p>
          <p>
            A Flash-style intro plays once per visitor, with skip and replay.
            The main window is tabbed, with an LCD ticker. Studio Files opens
            images in a fake XP picture viewer. Product pages have a colorway
            switch, click-to-enlarge, and a specs table.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <Shot
            src="/kwl-studio/intro.png"
            alt="KWL Studio intro screen, green logo, a hand-drawn belt, and enter site"
            caption="The intro. It shows once, and you can skip it or play it again."
          />
          <Shot
            src="/kwl-studio/homepage.png"
            alt="KWL Studio homepage inside a chrome window, chaos turned off"
            caption="The homepage window. Directory, spotlight, news, and the mailing list."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Shot
              src="/kwl-studio/belt-page.png"
              alt="Star Belt 001 product page with black/red and white/yellow colorways"
              caption="STAR BELT 001. Colorway switch and the specs table."
            />
            <Shot
              src="/kwl-studio/wallet-page.png"
              alt="Peak Wallet 002 product page with the mountain cardholder and specs"
              caption="PEAK WALLET 002. Same page pattern, different drop."
            />
          </div>
          <Shot
            src="/kwl-studio/studio-files.png"
            alt="Studio Files with the XP picture viewer open on a hand-drawn black and red belt"
            caption="Studio Files. Click a file and it opens in a fake XP picture viewer."
          />
        </div>

        <div className="mt-12">
          <p className="label-accent text-[var(--color-tan)]">
            Design decisions
          </p>
          <ul className="mt-4 grid gap-4">
            <li className="border border-[var(--color-tan)] p-5">
              <p className="font-display text-lg text-[var(--color-dark)]">
                Chaos stays in the background.
              </p>
              <p className="mt-2 max-w-2xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                The side collages support the brand, but they never compete
                with the product. They dim on every page, go darker on product
                pages, and product pages get no popups.
              </p>
            </li>
            <li className="border border-[var(--color-tan)] p-5">
              <p className="font-display text-lg text-[var(--color-dark)]">
                Chaos ON / OFF.
              </p>
              <p className="mt-2 max-w-2xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                A switch calms the whole site down for anyone who wants it
                quiet.
              </p>
            </li>
            <li className="border border-[var(--color-tan)] p-5">
              <p className="font-display text-lg text-[var(--color-dark)]">
                Phones stay clean.
              </p>
              <p className="mt-2 max-w-2xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                Side collages are hidden on phones, so mobile is just the
                window.
              </p>
            </li>
            <li className="border border-[var(--color-tan)] p-5">
              <p className="font-display text-lg text-[var(--color-dark)]">
                Shot needed.
              </p>
              <p className="mt-2 max-w-2xl font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
                Striped boxes mark missing photos, so the site can go up before
                every picture is ready.
              </p>
            </li>
          </ul>
        </div>

        <p className="mt-8 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Built in Next.js, hosted on Netlify, and it deploys from GitHub on
          every push.
        </p>
      </section>

      <section className="reveal" aria-labelledby="kwl-next">
        <p className="label-accent text-[var(--color-tan)]">07. What&apos;s next</p>
        <h3
          id="kwl-next"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          Photos, prices, then a real checkout.
        </h3>
        <p className="mt-5 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Real product photos, prices and drop dates, connecting the mailing
          list, and moving checkout to a proper store platform when sales
          start. This site stays the hype front door.
        </p>
      </section>
    </div>
  );
}
