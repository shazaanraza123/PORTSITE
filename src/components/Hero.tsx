import { MarqueeStrip } from "./MarqueeStrip";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col justify-between px-6 pb-0 pt-[calc(var(--nav-height)+3rem)] md:px-10 lg:px-16"
    >
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="font-display leading-[0.95] text-[var(--color-dark)]">
          <span className="block text-[clamp(3.5rem,12vw,7.5rem)] font-bold">
            WORK.
          </span>
          <span className="mt-2 block text-[clamp(1.75rem,5vw,3rem)] italic text-[var(--color-tan)]">
            by Shazaan Raza
          </span>
        </h1>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          <p className="label-accent text-[var(--color-dark)]">
            Product Designer & Developer
          </p>
          <p className="font-body text-sm font-light text-[var(--color-dark)] md:text-right">
            Chicago, IL · 2025 · 7 Projects
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <hr className="border-[var(--color-tan)]" />
        <MarqueeStrip />
      </div>
    </section>
  );
}
