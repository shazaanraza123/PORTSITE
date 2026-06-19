import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const onEnter = () => cursor.classList.add("cursor-hover");
    const onLeave = () => cursor.classList.remove("cursor-hover");

    document.addEventListener("mousemove", onMove);

    const interactiveSelector =
      'a, button, [role="button"], .contents-row, .nav-link, input, textarea, select';

    const bindInteractive = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    bindInteractive();

    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
      cursor.remove();
    };
  }, []);
}
