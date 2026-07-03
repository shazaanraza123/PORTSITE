import { useEffect, useState } from "react";
import { projects } from "../data/projects";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header
      className="fixed top-[2px] left-0 right-0 z-[9998] border-b border-[var(--color-tan)] bg-[var(--color-cream)]"
      style={{ height: "var(--nav-height)" }}
    >
      <nav className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a
          href="#hero"
          className="label-accent text-[var(--color-dark)] no-underline"
        >
          SHAZAAN RAZA · WORK
        </a>

        <button
          type="button"
          className="label-accent flex flex-col gap-1.5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block h-px w-5 bg-[var(--color-dark)] transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-[var(--color-dark)] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-[var(--color-dark)] transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>

        <ul
          className={`label-accent absolute right-0 top-[var(--nav-height)] flex flex-col gap-4 border-b border-[var(--color-tan)] bg-[var(--color-cream)] p-6 md:static md:flex-row md:items-center md:gap-6 md:border-0 md:p-0 ${menuOpen ? "flex" : "hidden md:flex"}`}
        >
          {projects.map((p) => (
            <li key={p.slug}>
              <a
                href={`#project-${p.slug}`}
                className="nav-link text-[var(--color-dark)]"
                onClick={() => setMenuOpen(false)}
              >
                {p.number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
