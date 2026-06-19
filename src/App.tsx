import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Contents } from "./components/Contents";
import { ProjectSection } from "./components/ProjectSection";
import { Contact } from "./components/Contact";
import { projects } from "./data/projects";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useCustomCursor } from "./hooks/useCustomCursor";

function App() {
  const scrollProgress = useScrollProgress();
  useCustomCursor();

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />
      <Nav />
      <main>
        <Hero />
        <Contents />
        {projects.map((project, index) => (
          <ProjectSection
            key={project.slug}
            project={project}
            nextHref={
              index < projects.length - 1
                ? `#project-${projects[index + 1].slug}`
                : "#contact"
            }
          />
        ))}
        <Contact />
      </main>
    </>
  );
}

export default App;
