const SHOP_URL = "https://kwlstudio.shop";

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
        <p className="mt-6 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Drop-only accessories from Chicago. Two products in the works,
          nothing for sale yet. I designed the products and built the site.
        </p>
      </div>

      <section className="reveal" aria-labelledby="kwl-products">
        <p className="label-accent text-[var(--color-tan)]">Product design</p>
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
              Reversible caviar quilted leather belt with a detachable star
              buckle. Black/red and white/yellow. Smaller stars run the strap.
              The big star is the buckle.
            </p>
            <p className="mt-4 font-body text-sm font-light text-[var(--color-dark)]">
              Status IN THE WORKS. Price ???
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <img
                src="/kwl-studio/belt-drawn-black.jpg"
                alt="AI-generated black and red star belt"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
              <img
                src="/kwl-studio/belt-drawn-white.jpg"
                alt="AI-generated white and yellow star belt"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
            </div>
            <p className="mt-3 font-body text-sm font-light text-[var(--color-dark)]">
              AI generated. Real sketches later.
            </p>
          </article>

          <article className="border border-[var(--color-tan)] p-5 md:p-6">
            <p className="label-accent text-[var(--color-tan)]">DROP 002</p>
            <h4 className="mt-3 font-display text-2xl text-[var(--color-dark)]">
              PEAK WALLET 002
            </h4>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--color-dark)]">
              A cardholder shaped like a snowy blue mountain range. Stitched
              edges, layered mountain card slots, and &quot;i hate this wallet,
              its awesome&quot; on the front in lime handwriting.
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
                alt="Peak Wallet opened from the top"
                loading="lazy"
                className="block h-auto w-full border border-[var(--color-tan)]"
              />
              <img
                src="/kwl-studio/wallet-card.jpg"
                alt="Peak Wallet card slot"
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

      <section className="reveal" aria-labelledby="kwl-site">
        <p className="label-accent text-[var(--color-tan)]">Web design</p>
        <h3
          id="kwl-site"
          className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-[var(--color-dark)]"
        >
          A 2004 homepage, in a chrome window.
        </h3>
        <div className="mt-5 max-w-2xl space-y-4 font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          <p>
            Dark 2000s homepage. A Winamp skin mixed with a 2004 MySpace page,
            sitting in a chrome window.
          </p>
          <p>
            Intro plays once, with skip and replay. The main window is tabbed,
            with an LCD ticker. Studio Files opens pictures in a fake XP
            viewer. Product pages switch colorways, click to enlarge, and have
            a specs table.
          </p>
          <p>
            The chaos stays behind the product. Side collages dim, go darker on
            product pages, and those pages get no popups. A chaos switch calms
            the whole site. Phones hide the side collages. Striped &quot;shot
            needed&quot; boxes hold spots for photos that aren&apos;t ready.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <Shot
            src="/kwl-studio/intro.png"
            alt="KWL Studio intro screen with the logo and enter site"
            caption="Intro. Once per visit."
          />
          <Shot
            src="/kwl-studio/homepage.png"
            alt="KWL Studio homepage inside a chrome window, chaos turned off"
            caption="Homepage window."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Shot
              src="/kwl-studio/belt-page.png"
              alt="Star Belt 001 product page with a colorway switch and specs table"
              caption="STAR BELT 001."
            />
            <Shot
              src="/kwl-studio/wallet-page.png"
              alt="Peak Wallet 002 product page with photos and a specs table"
              caption="PEAK WALLET 002."
            />
          </div>
          <Shot
            src="/kwl-studio/studio-files.png"
            alt="Studio Files with the XP picture viewer open"
            caption="Studio Files. Click a picture and it opens in a fake XP viewer."
          />
        </div>

        <p className="mt-8 max-w-2xl font-body text-sm font-light text-[var(--color-dark)]">
          The drawings on the site are AI generated. Real sketches later.
        </p>
        <p className="mt-4 max-w-2xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
          Next.js, on Netlify. Deploys from GitHub on every push.
        </p>
      </section>
    </div>
  );
}
