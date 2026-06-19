import { useIntersectionReveal } from "../hooks/useIntersectionReveal";
import { contentsItems } from "../data/projects";

export function Contents() {
  const sectionRef = useIntersectionReveal<HTMLElement>();

  return (
    <section
      id="contents"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-10 lg:px-16"
    >
      <h2 className="reveal font-display text-[clamp(2.5rem,8vw,5rem)] font-bold text-[var(--color-dark)]">
        CONTENTS.
      </h2>

      <ul className="mt-12 flex flex-col">
        {contentsItems.map((item) => (
          <li key={item.slug} className="reveal border-b border-[var(--color-tan)]">
            <a
              href={`#project-${item.slug}`}
              className="contents-row group flex items-baseline gap-4 px-2 py-5 no-underline text-[var(--color-dark)]"
            >
              <span className="contents-number label-accent flex w-10 shrink-0 items-center gap-1.5 text-[var(--color-tan)]">
                {item.ongoing && (
                  <span
                    className="live-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d8b5a]"
                    aria-label="Ongoing project"
                  />
                )}
                {item.number}
              </span>
              <span className="contents-name font-display text-[clamp(1.1rem,3vw,1.75rem)] font-medium">
                {item.name}
              </span>
              <span className="toc-leader hidden sm:block" aria-hidden />
              <span className="contents-category label-accent shrink-0 text-[var(--color-dark)] sm:ml-auto">
                {item.category}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
