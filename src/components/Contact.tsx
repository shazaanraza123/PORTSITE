import { useIntersectionReveal } from "../hooks/useIntersectionReveal";

const links = [
  {
    label: "Email",
    href: "mailto:shazaanraza123@gmail.com",
    text: "shazaanraza123@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammedraza8",
    text: "/in/muhammedraza8",
  },
  {
    label: "GitHub",
    href: "https://github.com/shazaanraza123",
    text: "shazaanraza123",
  },
  {
    label: "Portfolio",
    href: "https://shazweb.netlify.app",
    text: "shazweb.netlify.app",
  },
];

export function Contact() {
  const sectionRef = useIntersectionReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen bg-[var(--color-dark)] text-[var(--color-cream)]"
    >
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 py-24 md:px-10 lg:px-16">
        <div className="reveal grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[1.05]">
              <span className="block font-bold">LET&apos;S</span>
              <span className="block font-bold italic">WORK.</span>
            </h2>
            <p className="mt-8 max-w-md font-body text-sm font-light leading-relaxed md:text-base">
              Open to product design roles, frontend positions, and select
              freelance projects.
            </p>
          </div>

          <ul className="flex flex-col">
            {links.map((link) => (
              <li
                key={link.label}
                className="border-b border-[var(--color-cream)]/30"
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex flex-col gap-1 py-5 no-underline sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="label-accent text-[var(--color-tan)]">
                    {link.label}
                  </span>
                  <span className="font-body text-sm font-light text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-tan)]">
                    {link.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="reveal mt-16 flex flex-col gap-2 border-t border-[var(--color-cream)]/20 pt-6 text-xs font-light sm:flex-row sm:justify-between">
          <span>© 2025 Shazaan Raza</span>
          <span className="label-accent text-[var(--color-cream)]/70">
            Design & Code · Shazaan Raza
          </span>
        </footer>
      </div>
    </section>
  );
}
