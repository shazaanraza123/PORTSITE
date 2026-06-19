import { useEffect, useRef } from "react";

export function useIntersectionReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options },
    );

    const revealTarget = (target: Element) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        target.classList.add("reveal-visible");
        observer.unobserve(target);
        return;
      }
      observer.observe(target);
    };

    const targets = el.querySelectorAll(".reveal");
    if (targets.length === 0) {
      el.classList.add("reveal");
      revealTarget(el);
    } else {
      targets.forEach(revealTarget);
    }

    return () => observer.disconnect();
  }, [options]);

  return ref;
}
