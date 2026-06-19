import type { Project } from "../data/projects";
import { StatsCallouts } from "./StatsCallouts";

function SocialCard({
  platform,
  handle,
  highlight,
  src,
  alt,
}: {
  platform: "tiktok" | "instagram";
  handle: string;
  highlight: string;
  src: string;
  alt: string;
}) {
  const label = platform === "tiktok" ? "TikTok" : "Instagram";

  return (
    <figure className="cj-social-card">
      <div className="cj-social-frame">
        <span className="cj-social-badge label-accent">{label}</span>
        <div className="cj-social-inner">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <figcaption className="cj-social-caption">
        <span className="cj-social-handle">{handle}</span>
        <span className="cj-social-stat">{highlight}</span>
      </figcaption>
    </figure>
  );
}

export function CreativeJourneyContent({ project }: { project: Project }) {
  const media = project.creativeJourneyMedia;
  if (!media) return null;

  return (
    <div className="creative-journey">
      {project.stats && project.stats.length > 0 && (
        <div className="cj-stats">
          <StatsCallouts stats={project.stats} />
        </div>
      )}

      <article className="cj-press">
        <div className="cj-press-header">
          <span className="label-accent cj-eyebrow">Featured In</span>
          <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-tight">
            {media.press.headline}
          </h3>
          <p className="cj-press-meta">
            <span>{media.press.outlet}</span>
            <span aria-hidden="true">·</span>
            <span>{media.press.date}</span>
          </p>
        </div>

        <figure className="cj-press-frame">
          <div className="cj-press-glow" aria-hidden="true" />
          <img
            src={media.press.src}
            alt={media.press.alt}
            loading="lazy"
          />
        </figure>
      </article>

      <section className="cj-social">
        <div className="cj-section-head">
          <span className="label-accent">Built In Public</span>
          <p className="cj-section-sub font-display text-lg italic text-[var(--color-cream)]/90">
            Two pages. Millions watching.
          </p>
        </div>

        <div className="cj-social-grid">
          {media.socials.map((profile) => (
            <SocialCard
              key={profile.platform}
              platform={profile.platform}
              handle={profile.handle}
              highlight={profile.highlight}
              src={profile.src}
              alt={profile.alt}
            />
          ))}
        </div>
      </section>

      <section className="cj-impact">
        <div className="cj-impact-lead">
          <span className="cj-impact-number font-display">
            {media.hashtag.posts}
          </span>
          <div className="cj-impact-copy">
            <p className="label-accent">Community Scale</p>
            <p className="font-display text-xl font-bold md:text-2xl">
              {media.hashtag.tag}
            </p>
            <p className="cj-impact-text">
              One hashtag — proof the audience wasn&apos;t passive, it was
              building with us.
            </p>
          </div>
        </div>

        <figure className="cj-impact-frame">
          <img
            src={media.hashtag.src}
            alt={media.hashtag.alt}
            loading="lazy"
          />
        </figure>
      </section>
    </div>
  );
}
