export type ProjectLayout =
  | "hero-3col"
  | "2col-full"
  | "full-2col"
  | "mosaic"
  | "full-3col"
  | "hero-2col"
  | "stats-2x2"
  | "artist-marketing"
  | "mobile-showcase"
  | "tour-campaign"
  | "yeezy-marketing"
  | "la-apparel"
  | "creative-journey"
  | "kwl-studio";

export interface ProjectImage {
  src: string;
  alt: string;
  placeholder: string;
  type?: "image" | "video";
  aspect?: "16/9" | "4/3" | "1/1" | "3/4" | "9/16";
  span?: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ArtistSubsection {
  handle: string;
  descriptor: string;
  campaign: string;
  images: ProjectImage[];
}

export interface TourVideo {
  src: string;
  alt: string;
  poster?: string;
  aspect?: "16/9" | "4/3" | "9/16";
}

export interface TourStop {
  city: string;
  descriptor: string;
  campaign: string;
  images: ProjectImage[];
  videos?: TourVideo[];
  upcoming?: boolean;
  featured?: boolean;
}

export type CampaignMediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      placeholder?: string;
      aspect?: ProjectImage["aspect"];
    }
  | {
      type: "video";
      src: string;
      alt: string;
      poster?: string;
      aspect?: TourVideo["aspect"];
    };

export interface MarketingCampaign {
  name: string;
  descriptor: string;
  campaign: string;
  images: ProjectImage[];
  videos?: TourVideo[];
  mediaItems?: CampaignMediaItem[];
  theme?: "vultures" | "clothing";
  featured?: boolean;
}

export interface LaApparelMedia {
  reels: TourVideo[];
  wides: TourVideo[];
}

export interface CreativeJourneyMedia {
  press: {
    src: string;
    alt: string;
    outlet: string;
    headline: string;
    date: string;
  };
  socials: Array<{
    platform: "tiktok" | "instagram";
    handle: string;
    src: string;
    alt: string;
    highlight: string;
  }>;
  hashtag: {
    src: string;
    alt: string;
    tag: string;
    posts: string;
  };
}

export interface KwlStudioMedia {
  stock: { src: string; alt: string };
  storefront: { src: string; alt: string };
  brand: { src: string; alt: string };
  reel: TourVideo;
}

export interface Project {
  id: number;
  slug: string;
  number: string;
  title: string[];
  contentsName?: string;
  contentsCategory?: string;
  category: string;
  year: string;
  role: string;
  tools: string;
  context: string;
  overview: string;
  images: ProjectImage[];
  layout: ProjectLayout;
  stats?: ProjectStat[];
  artists?: ArtistSubsection[];
  tourStops?: TourStop[];
  marketingCampaigns?: MarketingCampaign[];
  laApparelMedia?: LaApparelMedia;
  kwlStudioMedia?: KwlStudioMedia;
  creativeJourneyMedia?: CreativeJourneyMedia;
  approach?: { heading: string; body: string };
  ongoing?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "yzy-mobile",
    number: "01",
    title: ["YZY Mobile", "App Prototype."],
    category: "Product Design",
    year: "2024",
    role: "UI Designer & Prototyper",
    tools: "Figma · Swift · Frontend Frameworks",
    context: "Yeezy (Internal)",
    overview:
      "Frontend UI design and feature planning for the official YZY mobile app. Built interactive prototypes in Swift and Figma to support executive product pitches, ensuring full aesthetic alignment with Yeezy's brand language.",
    images: [
      {
        src: "/projects/yzy-mobile/hero-device.png",
        alt: "YZY app device mockup — Play tab tracklist",
        placeholder: "[Image: YZY app device mockup]",
        aspect: "3/4",
      },
      {
        src: "/projects/yzy-mobile/shop.png",
        alt: "Shop screen — product grid on SPLY tab",
        placeholder: "[Image: Shop screen]",
        aspect: "9/16",
      },
      {
        src: "/projects/yzy-mobile/album-tracklist.png",
        alt: "Music player — Vultures 1 album tracklist",
        placeholder: "[Image: Album tracklist]",
        aspect: "9/16",
      },
      {
        src: "/projects/yzy-mobile/discography.png",
        alt: "Discography grid — album catalog on SNDS tab",
        placeholder: "[Image: Discography grid]",
        aspect: "9/16",
      },
    ],
    layout: "mobile-showcase",
  },
  {
    id: 2,
    slug: "kwl-studio",
    number: "02",
    title: ["KWL", "Studio."],
    category: "Brand Identity",
    year: "2023",
    role: "Creative Director & Designer",
    tools: "Figma · Adobe Illustrator · Photoshop · Shopify",
    context: "Self-directed streetwear label",
    overview:
      "End-to-end brand identity, merch design, and e-commerce buildout for KWL Studio, a Chicago streetwear label. Full creative pipeline from concept to sale — logo system, apparel graphics, lookbook, and Shopify storefront.",
    images: [],
    layout: "kwl-studio",
    kwlStudioMedia: {
      stock: {
        src: "/projects/kwl-studio/stock.png",
        alt: "KWL Studio apparel stock imagery",
      },
      storefront: {
        src: "/projects/kwl-studio/storefront.png",
        alt: "KWL Studio Shopify storefront",
      },
      brand: {
        src: "/projects/kwl-studio/brand.png",
        alt: "KWL Studio logo system on black",
      },
      reel: {
        src: "/projects/kwl-studio/star-reel.mp4",
        alt: "KWL Studio brand reel",
        aspect: "16/9",
      },
    },
  },
  {
    id: 3,
    slug: "ye-tour",
    number: "03",
    title: ["Ye Tour", "Media Campaign."],
    contentsName: "Ye Tour Media Campaign",
    category: "Campaign Strategy",
    year: "2025 — Ongoing",
    role: "Tour Media Coordinator & Campaign Designer",
    tools: "CapCut · Adobe Premiere · Photoshop · Instagram · TikTok · X · Facebook",
    context: "Ye World Tour — Multi-City Campaign",
    overview:
      "Planned and executed the media marketing strategy for Ye's world tour across multiple continents — from SoFi Stadium in Los Angeles and Mexico City to the record-breaking Istanbul performance (the largest stadium show of all time) and GelreDome in Arnhem. Currently supporting upcoming dates in Albania, Spain, and Portugal. Owned cross-platform social strategy: curating fan pages and content accounts on Instagram, TikTok, X, and Facebook; designing promotional visuals and hype videos; and coordinating on-site content production at live shows — producing real-time updates, meeting with the team, and capturing show-day content.",
    images: [],
    layout: "tour-campaign",
    ongoing: true,
    tourStops: [
      {
        city: "Istanbul, Turkey",
        descriptor: "RECORD-BREAKING STADIUM · LARGEST PERFORMANCE OF ALL TIME",
        campaign:
          "Led the full media rollout for the Istanbul date — the biggest stadium performance in history. Designed and distributed promotional visuals, coordinated multi-platform fan page pushes, and produced on-site content throughout show week to maximize global reach.",
        featured: true,
        videos: [
          {
            src: "/projects/ye-tour/turkey-show-1.mp4",
            alt: "Istanbul show — crowd and stage production",
            poster: "/projects/ye-tour/turkey-stadium.jpeg",
            aspect: "4/3",
          },
          {
            src: "/projects/ye-tour/turkey-show-2.mp4",
            alt: "Istanbul show — live performance footage",
            poster: "/projects/ye-tour/turkey-stadium.jpeg",
            aspect: "4/3",
          },
          {
            src: "/projects/ye-tour/turkey-show-3.mp4",
            alt: "Istanbul show — cinematic wide shot",
            poster: "/projects/ye-tour/turkey-promo.jpeg",
            aspect: "16/9",
          },
        ],
        images: [
          {
            src: "/projects/ye-tour/turkey-stadium.jpeg",
            alt: "Istanbul stadium performance — record-breaking show",
            placeholder: "[Image: Istanbul stadium]",
            aspect: "4/3",
          },
          {
            src: "/projects/ye-tour/turkey-promo.jpeg",
            alt: "Turkey show promotional visual",
            placeholder: "[Image: Turkey promo]",
            aspect: "16/9",
          },
        ],
      },
      {
        city: "Los Angeles, CA",
        descriptor: "SOFI STADIUM · US KICKOFF",
        campaign:
          "Planned the social media strategy and content calendar for the SoFi Stadium date. Managed and instructed curation pages across platforms on what to push, when to push it, and how to build pre-show momentum — including celestial promo asset systems and behind-the-scenes production content.",
        images: [
          {
            src: "/projects/ye-tour/sofi-stage.jpeg",
            alt: "SoFi Stadium — stage setup and suspended projection",
            placeholder: "[Image: SoFi stage]",
            aspect: "3/4",
          },
          {
            src: "/projects/ye-tour/sofi-assets-grid.jpeg",
            alt: "SoFi campaign — promo assets and production BTS",
            placeholder: "[Image: SoFi assets]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Mexico City, Mexico",
        descriptor: "INTERNATIONAL TOUR STOP · LATAM ROLLOUT",
        campaign:
          "Developed platform-native promo assets and coordinated cross-channel hype content for the Mexico City show at Monumental Plaza de Toros. Designed event graphics, merch pre-sale materials, and worked with fan pages to drive engagement ahead of doors opening.",
        images: [
          {
            src: "/projects/ye-tour/mexico-promo.jpg",
            alt: "Mexico City — official event promo graphic",
            placeholder: "[Image: Mexico promo]",
            aspect: "9/16",
          },
          {
            src: "/projects/ye-tour/mexico-stadium.jpg",
            alt: "Mexico City — live stadium performance",
            placeholder: "[Image: Mexico stadium]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Arnhem, Netherlands",
        descriptor: "GELREDOME · EUROPEAN TOUR",
        campaign:
          "Supported the European leg with promotional graphics, hype video edits, and real-time content coordination for GelreDome Stadium. Attended the show to produce live updates and collaborate with the team on the ground.",
        images: [
          {
            src: "/projects/ye-tour/arnhem-promo-dates.jpeg",
            alt: "Arnhem — sold out show promo with dates",
            placeholder: "[Image: Arnhem promo]",
            aspect: "3/4",
          },
          {
            src: "/projects/ye-tour/arnhem-promo-crowd.jpeg",
            alt: "Arnhem — stadium crowd promo visual",
            placeholder: "[Image: Arnhem crowd]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Albania, Spain & Portugal",
        descriptor: "UPCOMING DATES · IN PRODUCTION",
        campaign:
          "Currently helping plan the media strategy for upcoming tour dates across Albania, Spain, and Portugal — building promo assets, content systems, and rollout plans for shows still in the works.",
        images: [],
        upcoming: true,
      },
    ],
    approach: {
      heading: "THE APPROACH.",
      body: "Every show gets its own rollout plan — platform-native content, coordinated fan page pushes, and promo assets built to drive hype before doors open. On the ground, it's real-time coverage and tight coordination with the team to keep the moment moving across every channel.",
    },
  },
  {
    id: 4,
    slug: "yeezy-marketing",
    number: "04",
    title: ["Yeezy Marketing", "Campaign."],
    contentsName: "Yeezy Marketing Campaign",
    category: "Brand Marketing",
    year: "2024",
    role: "Marketing Designer & Content Strategist",
    tools: "Photoshop · Illustrator · CapCut · Premiere · Instagram · TikTok · X",
    context: "Yeezy — Vultures Album & Clothing",
    overview:
      "Led marketing for Yeezy's Vultures album rollout and Yeezy clothing line — spanning listening party activations, promotional graphics, hype videos, and cross-platform social strategy. Worked on Vultures listening experiences in Chicago, New York, and beyond: creating event graphics, producing video content, coordinating with the team to push assets across social media, and supporting guerrilla-style street marketing. For Yeezy clothing, developed SPLY product campaigns, launch visuals, and content designed to drive apparel drops across digital channels.",
    images: [],
    layout: "yeezy-marketing",
    marketingCampaigns: [
      {
        name: "Vultures",
        descriptor: "ALBUM MARKETING · LISTENING PARTIES · SOCIAL ROLLOUT",
        campaign:
          "Full marketing support for the Vultures album — from listening party graphics and event promos to BTS content and street-level ¥$ activations. Created visuals and videos for listening experiences at United Center Chicago, UBS Arena New York, and other dates. Worked with the team to plan and push content across Instagram, TikTok, and X, building hype ahead of each drop.",
        theme: "vultures",
        featured: true,
        images: [],
        mediaItems: [
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/globe.png",
            alt: "Vultures — global campaign graphic",
            aspect: "1/1",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/vultures/bg-reel.mp4",
            alt: "Vultures campaign — atmospheric reel",
            poster: "/projects/yeezy-marketing/vultures/globe.png",
            aspect: "16/9",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/united-center.jpg",
            alt: "Vultures — United Center Chicago listening party promo",
            aspect: "16/9",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/vultures/promo-reel.mp4",
            alt: "Vultures campaign — promotional video",
            poster: "/projects/yeezy-marketing/vultures/spotlight.png",
            aspect: "16/9",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/listening-party.jpg",
            alt: "Vultures — New York listening experience promo",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/bts-ice-sculpture.jpg",
            alt: "Vultures listening party — BTS with ice sculpture",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/listening-moment.jpg",
            alt: "Vultures listening party — live moment",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/street-marketing.jpg",
            alt: "Vultures — ¥$ street stencil marketing",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/spotlight.png",
            alt: "Vultures — spotlight campaign graphic",
            aspect: "1/1",
          },
        ],
      },
      {
        name: "Yeezy Clothing",
        descriptor: "APPAREL MARKETING · SPLY · PRODUCT LAUNCHES",
        campaign:
          "Marketing and content for the Yeezy clothing line — product launch graphics, SPLY campaign visuals, and social content designed to drive apparel drops. Produced promo videos and static assets highlighting key pieces including Yeezy Pods and seasonal collections, optimized for platform-native rollout across Instagram and TikTok.",
        theme: "clothing",
        images: [],
        mediaItems: [
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/sply-grid.jpg",
            alt: "Yeezy clothing — SPLY product grid campaign",
            aspect: "1/1",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-1.mp4",
            alt: "Yeezy clothing — SPLY campaign reel",
            poster: "/projects/yeezy-marketing/clothing/sply-grid.jpg",
            aspect: "9/16",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/yeezy-pods.jpg",
            alt: "Yeezy Pods — celebrity placement marketing",
            aspect: "9/16",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-2.mp4",
            alt: "Yeezy clothing — product launch reel",
            poster: "/projects/yeezy-marketing/clothing/yeezy-pods.jpg",
            aspect: "9/16",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-3.mp4",
            alt: "Yeezy clothing — seasonal collection reel",
            poster: "/projects/yeezy-marketing/clothing/crest-logo.jpg",
            aspect: "9/16",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/crest-logo.jpg",
            alt: "Yeezy clothing — crest logo campaign",
            aspect: "1/1",
          },
        ],
      },
    ],
    approach: {
      heading: "THE APPROACH.",
      body: "Raw, high-contrast, platform-native — every asset built to feel like it belongs to the Vultures world. Listening parties get their own visual identity. Clothing gets clean product storytelling. Both push through the same coordinated social rollout.",
    },
  },
  {
    id: 5,
    slug: "la-apparel",
    number: "05",
    title: ["LA Apparel", "Campaign."],
    contentsName: "LA Apparel Campaign",
    category: "Brand Marketing",
    year: "2023–2024",
    role: "Visual Brand Designer & Content Strategist",
    tools: "Figma · Photoshop · Illustrator · CapCut · Premiere",
    context: "Los Angeles Apparel — Brand Partnership",
    overview:
      "Developed visual brand content and marketing campaign assets for Los Angeles Apparel. Designed platform-native content systems across Instagram and TikTok, creating on-brand graphics, promotional assets, and short-form video content aligned with LA Apparel's aesthetic — minimal, California, quality-forward.",
    images: [],
    layout: "la-apparel",
    laApparelMedia: {
      wides: [
        {
          src: "/projects/la-apparel/campaign-1.mp4",
          alt: "LA Apparel — campaign film 1",
          aspect: "16/9",
        },
        {
          src: "/projects/la-apparel/campaign-2.mp4",
          alt: "LA Apparel — campaign film 2",
          aspect: "16/9",
        },
      ],
      reels: [
        {
          src: "/projects/la-apparel/story-1.mp4",
          alt: "LA Apparel — Instagram story reel 1",
          aspect: "9/16",
        },
        {
          src: "/projects/la-apparel/story-2.mp4",
          alt: "LA Apparel — Instagram story reel 2",
          aspect: "9/16",
        },
      ],
    },
  },
  {
    id: 6,
    slug: "creative-journey",
    number: "06",
    title: ["The Creative", "Journey."],
    contentsName: "The Creative Journey",
    category: "Content Creation",
    year: "2022–Present",
    role: "Creator, Designer, Strategist",
    tools: "CapCut · Premiere · Photoshop · Figma · Instagram · TikTok",
    context: "Personal Brand — @Yelova911 & @kanyewestlover911",
    overview:
      "Three years of building creative work in public. From launching @Yelova911 and @kanyewestlover911 into multi-million-follower culture pages — featured by Rolling Stone — to running KWL Studio's content and producing viral short-form edits. Every post, edit, and campaign was a self-directed experiment in what resonates at scale.",
    stats: [
      { value: "3M+", label: "Combined Reach Across Platforms" },
      { value: "20–30M+", label: "Views Generated Per Ye Tour Show" },
      { value: "50+", label: "Brands and Creators Collaborated With" },
      { value: "4+", label: "Years Creating Consistently" },
    ],
    images: [],
    layout: "creative-journey",
    creativeJourneyMedia: {
      press: {
        src: "/projects/creative-journey/rolling-stone-feature.jpeg",
        alt: "Rolling Stone feature — Why Kanye West's Biggest Stan Account Is Still Going Strong",
        outlet: "Rolling Stone",
        headline:
          "Why Kanye West's Biggest Stan Account Is Still Going Strong",
        date: "December 14, 2022",
      },
      socials: [
        {
          platform: "tiktok",
          handle: "@kanyewestlover911",
          src: "/projects/creative-journey/tiktok-profile.jpeg",
          alt: "TikTok profile — @kanyewestlover911 with 1.8M followers",
          highlight: "1.8M followers · 54.4M likes",
        },
        {
          platform: "instagram",
          handle: "@yelova911",
          src: "/projects/creative-journey/instagram-profile.jpeg",
          alt: "Instagram profile — @yelova911 with 427K followers",
          highlight: "427K followers · 1,068 posts",
        },
      ],
      hashtag: {
        src: "/projects/creative-journey/hashtag-impact.jpeg",
        alt: "#kanyewestlover911 — 51.7K posts on TikTok",
        tag: "#kanyewestlover911",
        posts: "51.7K",
      },
    },
  },
  {
    id: 7,
    slug: "artist-marketing",
    number: "07",
    title: ["Artist", "Marketing."],
    contentsName: "Artist Marketing Campaign",
    category: "Campaign Development",
    year: "2025 — Ongoing",
    role: "Marketing Strategist & Content Director",
    tools: "CapCut · Premiere · Photoshop · TikTok · Instagram · X",
    context: "Active Client Work — 3 Emerging Artists",
    overview:
      "Currently developing and executing full marketing and content campaigns for three emerging artists — @mysp8c, @kinoftw, and @talinwya. Work spans viral TikTok strategy, Instagram content systems, promotional graphics, hype video edits, and platform-specific rollout planning. Each artist gets a tailored campaign built around their sound, aesthetic, and audience growth goals.",
    images: [],
    layout: "artist-marketing",
    ongoing: true,
    artists: [
      {
        handle: "@mysp8c",
        descriptor: "INDEPENDENT ARTIST · SPOTIFY · EMERGING",
        campaign:
          "Building platform presence and viral content strategy around existing Spotify catalog. Focus on short-form video content to convert streams into an engaged social following.",
        images: [
          {
            src: "",
            alt: "@mysp8c content asset",
            placeholder: "[Image: @mysp8c content asset]",
            aspect: "4/3",
          },
          {
            src: "",
            alt: "Campaign graphic for mysp8c",
            placeholder: "[Image: Campaign graphic for mysp8c]",
            aspect: "4/3",
          },
        ],
      },
      {
        handle: "@kinoftw",
        descriptor: "EMERGING ARTIST · CONTENT · BRAND",
        campaign:
          "Developing visual identity and content system to establish a consistent and recognizable presence across TikTok and Instagram.",
        images: [
          {
            src: "",
            alt: "@kinoftw content asset",
            placeholder: "[Image: @kinoftw content asset]",
            aspect: "4/3",
          },
          {
            src: "",
            alt: "Campaign graphic for kinoftw",
            placeholder: "[Image: Campaign graphic for kinoftw]",
            aspect: "4/3",
          },
        ],
      },
      {
        handle: "@talinwya",
        descriptor: "EMERGING ARTIST · MUSIC · SOCIAL",
        campaign:
          "Platform rollout strategy and promotional content designed to grow audience and drive discovery across short-form video platforms.",
        images: [
          {
            src: "",
            alt: "@talinwya content asset",
            placeholder: "[Image: @talinwya content asset]",
            aspect: "4/3",
          },
          {
            src: "",
            alt: "Campaign graphic for talinwya",
            placeholder: "[Image: Campaign graphic for talinwya]",
            aspect: "4/3",
          },
        ],
      },
    ],
    approach: {
      heading: "THE PROCESS.",
      body: "Every campaign starts with understanding the artist's sound and visual world. From there — content systems, platform strategy, graphic assets, and video edits built to travel. The goal is always the same: turn great music into moments people share.",
    },
  },
];

export const contentsItems = projects.map((p) => ({
  number: p.number,
  name: p.contentsName ?? p.title.join(" ").replace(/\.$/, ""),
  category: p.contentsCategory ?? p.category,
  slug: p.slug,
  ongoing: p.ongoing ?? false,
}));

export const PROJECT_COUNT = projects.length;
