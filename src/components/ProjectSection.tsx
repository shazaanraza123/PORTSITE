import type { Project } from "../data/projects";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";
import { ProjectImageGrid } from "./ProjectImageGrid";
import { StatsCallouts } from "./StatsCallouts";
import { ArtistMarketingContent } from "./ArtistMarketingContent";
import { TourCampaignContent } from "./TourCampaignContent";
import { YeezyMarketingContent } from "./YeezyMarketingContent";
import { LaApparelContent } from "./LaApparelContent";
import { CreativeJourneyContent } from "./CreativeJourneyContent";
import { KwlStudioContent } from "./KwlStudioContent";

interface ProjectSectionProps {
  project: Project;
  nextHref?: string;
}

export function ProjectSection({ project, nextHref }: ProjectSectionProps) {
  const sectionRef = useIntersectionReveal<HTMLElement>();
  const [line1, line2] = project.title;

  return (
    <section
      id={`project-${project.slug}`}
      ref={sectionRef}
      className="border-t border-[var(--color-tan)]"
    >
      <div className="bg-[var(--color-cream)] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="reveal flex flex-wrap items-center justify-between gap-2 border border-[var(--color-tan)] px-4 py-2">
          <span className="label-accent text-[var(--color-tan)]">
            {project.number}
          </span>
          <span className="label-accent text-[var(--color-dark)]">
            {project.category}
          </span>
          <span className="label-accent flex items-center gap-2 text-[var(--color-dark)]">
            {project.year}
            {project.ongoing && (
              <span className="rounded-full bg-[var(--color-tan)] px-2.5 py-0.5 text-[10px] tracking-[0.12em] text-[var(--color-cream)]">
                ONGOING
              </span>
            )}
          </span>
        </div>

        <h2 className="reveal mt-10 font-display leading-[1.05] text-[var(--color-dark)]">
          <span className="block text-[clamp(2.25rem,7vw,5rem)] font-bold">
            {line1}
          </span>
          {line2 && (
            <span className="mt-1 block text-[clamp(2rem,6vw,4.5rem)] italic text-[var(--color-tan)]">
              {line2}
            </span>
          )}
        </h2>

        <div className="reveal mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-accent mb-4 text-[var(--color-tan)]">
              Overview
            </p>
            <p className="font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
              {project.overview}
            </p>
          </div>
          <dl className="grid gap-4 text-sm">
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-[var(--color-tan)] pb-3">
              <dt className="label-accent text-[var(--color-tan)]">Role</dt>
              <dd className="font-body font-light">{project.role}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-[var(--color-tan)] pb-3">
              <dt className="label-accent text-[var(--color-tan)]">Tools</dt>
              <dd className="font-body font-light">{project.tools}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-[var(--color-tan)] pb-3">
              <dt className="label-accent text-[var(--color-tan)]">Year</dt>
              <dd className="font-body font-light">{project.year}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-4 pb-3">
              <dt className="label-accent text-[var(--color-tan)]">Context</dt>
              <dd className="font-body font-light">{project.context}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        className={`${project.layout === "artist-marketing" || project.layout === "tour-campaign" || project.layout === "yeezy-marketing" || project.layout === "mobile-showcase" || project.layout === "la-apparel" || project.layout === "creative-journey" || project.layout === "kwl-studio" ? "" : "reveal bg-[var(--color-cream)]"} ${project.layout === "artist-marketing" || project.layout === "tour-campaign" || project.layout === "yeezy-marketing" || project.layout === "mobile-showcase" || project.layout === "la-apparel" || project.layout === "creative-journey" || project.layout === "kwl-studio" ? "pb-0" : "pb-16 lg:pb-24"}`}
      >
        {project.layout === "artist-marketing" ? (
          <div className="px-6 md:px-10 lg:px-16">
            <ArtistMarketingContent project={project} />
          </div>
        ) : project.layout === "tour-campaign" ? (
          <TourCampaignContent project={project} />
        ) : project.layout === "yeezy-marketing" ? (
          <YeezyMarketingContent project={project} />
        ) : project.layout === "la-apparel" ? (
          <LaApparelContent project={project} />
        ) : project.layout === "creative-journey" ? (
          <CreativeJourneyContent project={project} />
        ) : project.layout === "kwl-studio" ? (
          <KwlStudioContent project={project} />
        ) : (
          <div className="px-6 md:px-10 lg:px-16">
            {project.stats && <StatsCallouts stats={project.stats} />}
            <ProjectImageGrid project={project} />
          </div>
        )}
      </div>

      {nextHref && (
        <div className="clear-both border-t border-[var(--color-tan)] px-6 py-8 md:px-10 lg:px-16">
          <a
            href={nextHref}
            className="label-accent float-right text-[var(--color-dark)] no-underline transition-colors hover:text-[var(--color-tan)]"
          >
            NEXT PROJECT →
          </a>
        </div>
      )}
    </section>
  );
}
