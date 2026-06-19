import type {
  CampaignMediaItem,
  MarketingCampaign,
  Project,
} from "../data/projects";

type RowKind = "wide" | "portrait" | "reel" | "square";

function rowKind(aspect?: CampaignMediaItem["aspect"]): RowKind {
  switch (aspect) {
    case "16/9":
    case "4/3":
      return "wide";
    case "9/16":
      return "reel";
    case "3/4":
      return "portrait";
    default:
      return "square";
  }
}

function groupIntoRows(items: CampaignMediaItem[]) {
  const rows: { kind: RowKind; items: CampaignMediaItem[] }[] = [];
  let batch: CampaignMediaItem[] = [];
  let batchKind: RowKind | null = null;

  const flush = () => {
    if (!batch.length) return;
    rows.push({ kind: batchKind!, items: batch });
    batch = [];
    batchKind = null;
  };

  for (const item of items) {
    const kind = rowKind(item.aspect);

    if (kind === "wide") {
      flush();
      rows.push({ kind: "wide", items: [item] });
      continue;
    }

    if (batchKind === null || batchKind === kind) {
      batchKind = kind;
      batch.push(item);
    } else {
      flush();
      batchKind = kind;
      batch.push(item);
    }
  }

  flush();
  return rows;
}

function cellClass(kind: RowKind) {
  return `yeezy-media-cell yeezy-media-cell--${kind}`;
}

function MediaCell({ item, kind }: { item: CampaignMediaItem; kind: RowKind }) {
  return (
    <figure className={cellClass(kind)}>
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
        />
      ) : item.src ? (
        <img src={item.src} alt={item.alt} loading="lazy" />
      ) : (
        <div className="image-placeholder yeezy-media-placeholder">
          <span>{item.placeholder ?? item.alt}</span>
        </div>
      )}
    </figure>
  );
}

function CampaignBlock({ campaign }: { campaign: MarketingCampaign }) {
  const isVultures = campaign.theme === "vultures";
  const rows = groupIntoRows(campaign.mediaItems ?? []);

  return (
    <article
      className={`yeezy-campaign ${isVultures ? "yeezy-campaign--vultures" : "yeezy-campaign--clothing"}`}
    >
      <div className="yeezy-campaign-header">
        <h3 className="yeezy-campaign-title font-display text-[clamp(2rem,5vw,3.5rem)] font-bold">
          {campaign.name}
        </h3>
        <p className="label-accent mt-3">{campaign.descriptor}</p>
        <p className="yeezy-campaign-text mt-6 font-display text-base leading-relaxed md:text-lg">
          {campaign.campaign}
        </p>
      </div>

      {rows.length > 0 && (
        <div className="yeezy-media-block">
          <div className="yeezy-rows">
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.kind}-${rowIndex}`}
                className={`yeezy-row yeezy-row--${row.kind}`}
              >
                {row.items.map((item) => (
                  <MediaCell
                    key={`${item.type}-${item.src}`}
                    item={item}
                    kind={row.kind}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export function YeezyMarketingContent({ project }: { project: Project }) {
  const campaigns = project.marketingCampaigns ?? [];

  return (
    <div className="yeezy-marketing">
      <div className="yeezy-grain" aria-hidden="true" />

      <div className="yeezy-marketing-inner">
        {campaigns.map((campaign) => (
          <CampaignBlock key={campaign.name} campaign={campaign} />
        ))}

        {project.approach && (
          <div className="yeezy-approach">
            <h3 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--color-cream)]">
              {project.approach.heading}
            </h3>
            <p className="mt-6 max-w-2xl font-display text-base leading-relaxed text-[var(--color-cream)]/85 md:text-lg">
              {project.approach.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
