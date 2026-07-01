import type { Project } from "../data/projects";

export function KwlStudioContent({ project }: { project: Project }) {
  const media = project.kwlStudioMedia;
  if (!media) return null;

  return (
    <div className="kwl-studio">
      <div className="kwl-studio-inner">
        <header className="kwl-studio-intro">
          <p className="label-accent kwl-studio-eyebrow">Chicago streetwear</p>
          <p className="kwl-studio-tagline font-display text-lg leading-relaxed md:text-xl">
            From stock to storefront — the full pipeline.
          </p>
        </header>

        <div className="kwl-studio-pair">
          <figure className="kwl-studio-frame kwl-studio-frame--stock">
            <span className="kwl-studio-label label-accent">01 · Stock</span>
            <div className="kwl-studio-frame-media">
              <img src={media.stock.src} alt={media.stock.alt} loading="lazy" />
            </div>
          </figure>

          <figure className="kwl-studio-frame kwl-studio-frame--store">
            <span className="kwl-studio-label label-accent">02 · Store</span>
            <div className="kwl-studio-frame-media">
              <img
                src={media.storefront.src}
                alt={media.storefront.alt}
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <figure className="kwl-studio-brand">
          <span className="kwl-studio-label label-accent">03 · Identity</span>
          <div className="kwl-studio-brand-panel">
            <img src={media.brand.src} alt={media.brand.alt} loading="lazy" />
          </div>
        </figure>

        <figure className="kwl-studio-reel">
          <div className="kwl-studio-reel-head">
            <span className="label-accent">04 · Brand reel</span>
            <span className="kwl-studio-reel-meta">Loop · Muted</span>
          </div>
          <div className="kwl-studio-reel-screen">
            <video
              src={media.reel.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.reel.alt}
            />
          </div>
        </figure>
      </div>
    </div>
  );
}
