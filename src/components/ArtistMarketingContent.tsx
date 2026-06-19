import type { Project, ProjectImage } from "../data/projects";

function ImageFrame({ image }: { image: ProjectImage }) {
  // TODO: Replace placeholder with actual project image
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        className="aspect-[4/3] h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="image-placeholder aspect-[4/3] w-full">
      <span>{image.placeholder}</span>
    </div>
  );
}

export function ArtistMarketingContent({ project }: { project: Project }) {
  if (!project.artists || !project.approach) return null;

  return (
    <div className="reveal">
      {project.artists.map((artist) => (
        <article
          key={artist.handle}
          className="border-b border-[var(--color-tan)] py-12 first:pt-0 md:py-16"
        >
          <h3 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-[var(--color-dark)]">
            {artist.handle}
          </h3>
          <p className="label-accent mt-3 text-[var(--color-tan)]">
            {artist.descriptor}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {artist.images.map((img) => (
              <ImageFrame key={img.alt} image={img} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl font-display text-base leading-relaxed text-[var(--color-dark)] md:text-lg">
            {artist.campaign}
          </p>
        </article>
      ))}

      <div className="-mx-6 bg-[var(--color-dark)] px-6 py-16 md:-mx-10 md:px-10 md:py-20 lg:-mx-16 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <h3 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-[var(--color-cream)]">
            {project.approach.heading}
          </h3>
          <p className="font-display text-base leading-relaxed text-[var(--color-cream)] md:text-lg">
            {project.approach.body}
          </p>
        </div>
      </div>
    </div>
  );
}
