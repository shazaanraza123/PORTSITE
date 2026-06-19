import type { Project, TourVideo } from "../data/projects";

function StoryReel({ video, index }: { video: TourVideo; index: number }) {
  return (
    <figure className="la-reel">
      <div className="la-reel-notch" aria-hidden="true" />
      <video
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.alt}
      />
      <figcaption className="la-reel-caption label-accent">
        {String(index + 1).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}

function CampaignFilm({ video, index }: { video: TourVideo; index: number }) {
  return (
    <figure className="la-wide">
      <video
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.alt}
      />
      <figcaption className="la-wide-caption label-accent">
        Film {String(index + 1).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}

export function LaApparelContent({ project }: { project: Project }) {
  const media = project.laApparelMedia;
  if (!media) return null;

  const { reels, wides } = media;

  return (
    <div className="la-apparel">
      <div className="la-apparel-inner">
        <header className="la-apparel-intro">
          <p className="label-accent la-apparel-eyebrow">Dual-format rollout</p>
          <p className="la-apparel-tagline font-display text-lg leading-relaxed md:text-xl">
            Stories for scroll. Cinema for the feed.
          </p>
        </header>

        <div className="la-apparel-split">
          <section className="la-apparel-channel la-apparel-channel--stories">
            <div className="la-channel-head">
              <span className="label-accent">Stories</span>
              <span className="la-channel-meta">9:16 · IG · TikTok</span>
            </div>
            <div className="la-reel-stack">
              {reels.map((video, index) => (
                <StoryReel key={video.src} video={video} index={index} />
              ))}
            </div>
          </section>

          <div className="la-apparel-divider" aria-hidden="true">
            <span />
          </div>

          <section className="la-apparel-channel la-apparel-channel--campaign">
            <div className="la-channel-head">
              <span className="label-accent">Campaign</span>
              <span className="la-channel-meta">16:9 · Feed · Paid</span>
            </div>
            <div className="la-wide-stack">
              {wides.map((video, index) => (
                <CampaignFilm key={video.src} video={video} index={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
