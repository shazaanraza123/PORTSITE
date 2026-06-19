import type {
  Project,
  ProjectImage,
  TourStop,
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

function TourVideoFrame({ video }: { video: TourVideo }) {
  return (
    <div
      className={`tour-video-frame ${aspectClass(video.aspect ?? "4/3")}`}
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
      />
    </div>
  );
}

function TourImageFrame({ image }: { image: ProjectImage }) {
  const aspectKey = image.aspect?.replace("/", "-") ?? "4-3";

  if (!image.src) {
    return (
      <div
        className={`image-placeholder tour-image-frame tour-image-frame--${aspectKey}`}
      >
        <span>{image.placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`tour-image-frame tour-image-frame--${aspectKey}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
    </div>
  );
}

function TourReel({ stop }: { stop: TourStop }) {
  if (!stop.videos?.length) return null;

  return (
    <div className="tour-reel">
      <div className="tour-reel-header">
        <span className="label-accent text-[var(--color-tan)]">Show Reel</span>
        <h3 className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold text-[var(--color-cream)]">
          {stop.city}
        </h3>
        <p className="label-accent text-[var(--color-tan)]">{stop.descriptor}</p>
      </div>

      <div className="tour-reel-track">
        {stop.videos.map((video) => (
          <TourVideoFrame key={video.src} video={video} />
        ))}
      </div>
    </div>
  );
}

function StopMedia({ stop }: { stop: TourStop }) {
  const hasImages = stop.images.some((img) => img.src);
  if (!hasImages) return null;

  const isPosterPair =
    stop.images.length === 2 &&
    stop.images.some((img) => img.aspect === "9/16");

  return (
    <div
      className={`tour-stop-media ${isPosterPair ? "tour-stop-media--posters" : ""}`}
    >
      {stop.images.map((img) => (
        <TourImageFrame key={img.alt} image={img} />
      ))}
    </div>
  );
}

function TourStopSection({
  stop,
  index,
}: {
  stop: TourStop;
  index: number;
}) {
  const isDark = index % 2 === 1;
  const showMedia =
    stop.images.some((img) => img.src) && !stop.featured;

  return (
    <article
      className={`tour-stop ${isDark ? "tour-stop--dark" : ""} ${stop.upcoming ? "tour-stop--upcoming" : ""}`}
    >
      <div className="tour-stop-inner">
        <div className="tour-stop-copy">
          <span className="tour-stop-index label-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold">
              {stop.city}
            </h3>
            {stop.upcoming && (
              <span className="tour-stop-badge">UPCOMING</span>
            )}
          </div>
          <p className="label-accent mt-3">{stop.descriptor}</p>
          <p className="tour-stop-text mt-6 font-display text-base leading-relaxed md:text-lg">
            {stop.campaign}
          </p>
        </div>

        {showMedia && (
          <div className="tour-stop-visual">
            <div className="tour-stop-visual-inner">
              <StopMedia stop={stop} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function TourCampaignContent({ project }: { project: Project }) {
  const stops = project.tourStops ?? [];
  const featured = stops.find((stop) => stop.featured);

  return (
    <div className="tour-campaign">
      {featured && <TourReel stop={featured} />}

      <div className="tour-stops">
        {stops.map((stop, index) => (
          <TourStopSection key={stop.city} stop={stop} index={index} />
        ))}
      </div>

      {project.approach && (
        <div className="tour-approach">
          <div className="tour-approach-inner">
            <h3 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-[var(--color-cream)]">
              {project.approach.heading}
            </h3>
            <p className="font-display text-base leading-relaxed text-[var(--color-cream)] md:text-lg">
              {project.approach.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
