import { lazy, Suspense, useEffect, useState } from "react";

// Two routes, no router dependency: "/" is the Workshop, "/work/:slug" is a case study.
// Each half is lazy-loaded, so case studies never download three.js.
const WorkshopRoom = lazy(() => import("./components/WorkshopRoom"));
const CaseStudy = lazy(() => import("./cases/CaseStudy"));

const caseSlug = (path: string) => path.match(/^\/work\/([\w-]+)\/?$/)?.[1] ?? null;

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    // same-origin links to "/" or "/work/..." navigate in place (engines create plain <a> tags, so this is delegated)
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !(url.pathname === "/" || caseSlug(url.pathname))) return;
      e.preventDefault();
      window.history.pushState(null, "", url.pathname + url.hash);
      setPath(url.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("popstate", onPop); document.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => { if (!caseSlug(path)) document.title = "Shazaan Raza / Workshop"; }, [path]);

  const slug = caseSlug(path);
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#EDE8DF" }} />}>
      {slug ? <CaseStudy key={slug} slug={slug} /> : <WorkshopRoom />}
    </Suspense>
  );
}
