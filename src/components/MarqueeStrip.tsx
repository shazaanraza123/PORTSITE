const MARQUEE_TEXT =
  "DESIGN — BRANDING — CAMPAIGNS — PRODUCT — CODE — STRATEGY — ";

export function MarqueeStrip() {
  const repeated = MARQUEE_TEXT.repeat(4);

  return (
    <div className="overflow-hidden border-t border-[var(--color-tan)] py-3">
      <div className="marquee-track">
        <span className="label-accent whitespace-nowrap px-4 text-[var(--color-tan)]">
          {repeated}
        </span>
        <span
          className="label-accent whitespace-nowrap px-4 text-[var(--color-tan)]"
          aria-hidden
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
