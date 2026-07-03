import type {
  ArtistSubsection,
  Project,
  ProjectImage,
  TourVideo,
} from "../data/projects";

function aspectClass(aspect?: ProjectImage["aspect"]) {
  switch (aspect) {
    case "16/9":
      return "aspect-[16/9]";
    case "4/3":
      return "aspect-[4/3]";
    case "1/1":
      return "aspect-square";
    case "3/4":
      return "aspect-[3/4]";
    case "9/16":
      return "aspect-[9/16]";
    default:
      return "aspect-[4/3]";
  }
}

function fitClass(fit?: "cover" | "contain") {
  return fit === "contain" ? "artist-showcase-frame--contain" : "";
}

function ArtistVideoFrame({ video }: { video: TourVideo }) {
  return (
    <div
      className={`artist-showcase-frame ${fitClass(video.fit)} ${aspectClass(video.aspect ?? "4/3")}`}
    >
      <video
        src={video.src}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.alt}
        style={{
          objectPosition: video.objectPosition ?? "center",
          transform: video.zoom ? `scale(${video.zoom})` : undefined,
        }}
      />
    </div>
  );
}

function ArtistImageFrame({ image }: { image: ProjectImage }) {
  const aspectKey = image.aspect?.replace("/", "-") ?? "4-3";

  if (!image.src) {
    return (
      <div
        className={`image-placeholder artist-showcase-frame artist-showcase-frame--image artist-showcase-frame--${aspectKey}`}
      >
        <span>{image.placeholder}</span>
      </div>
    );
  }

  return (
    <div
      className={`artist-showcase-frame artist-showcase-frame--image ${fitClass(image.fit)} artist-showcase-frame--${aspectKey}`}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
    </div>
  );
}

function ArtistShowcase({ artist }: { artist: ArtistSubsection }) {
  const images = artist.images.filter((img) => img.src);
  const videos = artist.videos ?? [];

  if (!images.length && !videos.length) return null;

  return (
    <div className="artist-showcase">
      <div className="artist-showcase-track">
        {videos.map((video) => (
          <ArtistVideoFrame key={video.src} video={video} />
        ))}
        {images.map((img) => (
          <ArtistImageFrame key={img.src} image={img} />
        ))}
      </div>
    </div>
  );
}

function ArtistBlock({
  artist,
  index,
}: {
  artist: ArtistSubsection;
  index: number;
}) {
  const isDark = index % 2 === 1;

  return (
    <article
      className={`artist-block ${isDark ? "artist-block--dark" : ""}`}
    >
      <div className="artist-block-inner">
        <span className="artist-block-index label-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="artist-block-handle font-display text-[clamp(2rem,5vw,3.25rem)] font-bold">
          {artist.handle}
        </h3>
        <p className="label-accent mt-3">{artist.descriptor}</p>
        <p className="artist-block-text mt-6 font-display text-base leading-relaxed md:text-lg">
          {artist.campaign}
        </p>
      </div>

      <ArtistShowcase artist={artist} />
    </article>
  );
}

export function ArtistMarketingContent({ project }: { project: Project }) {
  if (!project.artists || !project.approach) return null;

  return (
    <div className="artist-campaign">
      <div className="artist-blocks">
        {project.artists.map((artist, index) => (
          <ArtistBlock key={artist.handle} artist={artist} index={index} />
        ))}
      </div>

      <div className="artist-approach">
        <div className="artist-approach-inner">
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
