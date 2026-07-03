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
  fit?: "cover" | "contain";
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
  videos?: TourVideo[];
}

export interface TourVideo {
  src: string;
  alt: string;
  poster?: string;
  aspect?: "16/9" | "4/3" | "9/16";
  fit?: "cover" | "contain";
  objectPosition?: string;
  zoom?: number;
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
      "UI design and feature planning for the YZY mobile app. Built prototypes in Swift and Figma for product pitches, keeping everything aligned with Yeezy's look.",
    images: [
      {
        src: "/projects/yzy-mobile/hero-device.png",
        alt: "YZY app device mockup, Play tab tracklist",
        placeholder: "[Image: YZY app device mockup]",
        aspect: "3/4",
      },
      {
        src: "/projects/yzy-mobile/shop.png",
        alt: "Shop screen, product grid on SPLY tab",
        placeholder: "[Image: Shop screen]",
        aspect: "9/16",
      },
      {
        src: "/projects/yzy-mobile/album-tracklist.png",
        alt: "Music player, Vultures 1 album tracklist",
        placeholder: "[Image: Album tracklist]",
        aspect: "9/16",
      },
      {
        src: "/projects/yzy-mobile/discography.png",
        alt: "Discography grid, album catalog on SNDS tab",
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
      "Full brand build for KWL Studio, a Chicago streetwear label. Logo, merch graphics, lookbook, and Shopify store from scratch.",
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
    year: "2025, Ongoing",
    role: "Tour Media Coordinator & Campaign Designer",
    tools: "CapCut · Adobe Premiere · Photoshop · Instagram · TikTok · X · Facebook",
    context: "Ye World Tour, multi city rollout",
    overview:
      "Ran media marketing for Ye's world tour across SoFi, Mexico City, Istanbul, Arnhem, and more. Currently helping with upcoming dates in Albania, Spain, and Portugal. Managed fan pages on Instagram, TikTok, X, and Facebook, made promos and hype videos, and shot content on the ground at shows.",
    images: [],
    layout: "tour-campaign",
    ongoing: true,
    tourStops: [
      {
        city: "Istanbul, Türkiye",
        descriptor: "RECORD BREAKING STADIUM · LARGEST SHOW OF ALL TIME",
        campaign:
          "Led media for the Istanbul show, the biggest stadium performance on the tour. Promos, fan page pushes, and on site content all week.",
        featured: true,
        videos: [
          {
            src: "/projects/ye-tour/turkey-show-1.mp4",
            alt: "Istanbul show, crowd and stage production",
            poster: "/projects/ye-tour/turkey-stadium.jpeg",
            aspect: "4/3",
          },
          {
            src: "/projects/ye-tour/turkey-show-2.mp4",
            alt: "Istanbul show, live performance footage",
            poster: "/projects/ye-tour/turkey-stadium.jpeg",
            aspect: "4/3",
          },
          {
            src: "/projects/ye-tour/turkey-show-3.mp4",
            alt: "Istanbul show, wide shot",
            poster: "/projects/ye-tour/turkey-promo.jpeg",
            aspect: "16/9",
          },
        ],
        images: [
          {
            src: "/projects/ye-tour/turkey-stadium.jpeg",
            alt: "Istanbul stadium performance, record breaking show",
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
          "Planned the social rollout for SoFi. Told curation pages what to post and when, built pre show momentum with promo assets and BTS content.",
        images: [
          {
            src: "/projects/ye-tour/sofi-stage.jpeg",
            alt: "SoFi Stadium stage setup and suspended projection",
            placeholder: "[Image: SoFi stage]",
            aspect: "3/4",
          },
          {
            src: "/projects/ye-tour/sofi-assets-grid.jpeg",
            alt: "SoFi campaign promo assets and production BTS",
            placeholder: "[Image: SoFi assets]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Los Angeles, CA",
        descriptor: "CRYPTO ARENA · DON LA",
        campaign:
          "On site at Crypto Arena for Don LA. BTS content, hype edits, and live updates across fan pages.",
        videos: [
          {
            src: "/projects/ye-tour/don-la-reel.mp4",
            alt: "Crypto Arena Don LA show footage",
            poster: "/projects/ye-tour/don-la-bts-1.jpeg",
            aspect: "4/3",
            fit: "contain",
          },
        ],
        images: [
          {
            src: "/projects/ye-tour/don-la-bts-1.jpeg",
            alt: "Crypto Arena on site show production BTS",
            placeholder: "[Image: Don LA BTS]",
            aspect: "3/4",
            fit: "contain",
          },
        ],
      },
      {
        city: "Chicago, IL",
        descriptor: "SOLDIER FIELD · MIDWEST STOP",
        campaign:
          "Promo visuals for Soldier Field. Coordinated fan page posts on Instagram and TikTok and supported media production during show week.",
        images: [
          {
            src: "/projects/ye-tour/chicago-promo.png",
            alt: "Chicago Soldier Field tour promo visual",
            placeholder: "[Image: Chicago promo]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Tampa, FL",
        descriptor: "RAYMOND JAMES STADIUM · FLORIDA DATE",
        campaign:
          "Tampa campaign with event graphics, social promos, and fan page pushes. Hype content for Instagram and TikTok ahead of the show.",
        videos: [
          {
            src: "/projects/ye-tour/tampa-show-reel.mp4",
            alt: "Tampa show day hype reel",
            poster: "/projects/ye-tour/tampa-promo.png",
            aspect: "4/3",
            fit: "contain",
          },
        ],
        images: [
          {
            src: "/projects/ye-tour/tampa-promo.png",
            alt: "Tampa Raymond James Stadium promo visual",
            placeholder: "[Image: Tampa promo]",
            aspect: "3/4",
          },
          {
            src: "/projects/ye-tour/tampa-bts.png",
            alt: "Tampa show day promo and production visual",
            placeholder: "[Image: Tampa BTS]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Mexico City, Mexico",
        descriptor: "INTERNATIONAL TOUR STOP · LATAM ROLLOUT",
        campaign:
          "Promo assets and hype content for Mexico City at Monumental Plaza de Toros. Event graphics, merch presale stuff, and fan page coordination before doors.",
        images: [
          {
            src: "/projects/ye-tour/mexico-promo.jpg",
            alt: "Mexico City official event promo graphic",
            placeholder: "[Image: Mexico promo]",
            aspect: "3/4",
            fit: "contain",
          },
          {
            src: "/projects/ye-tour/mexico-stadium.jpg",
            alt: "Mexico City live stadium performance",
            placeholder: "[Image: Mexico stadium]",
            aspect: "3/4",
            fit: "contain",
          },
        ],
      },
      {
        city: "Arnhem, Netherlands",
        descriptor: "GELREDOME · EUROPEAN TOUR",
        campaign:
          "Promos, hype edits, and live content coordination for GelreDome. At the show shooting updates and working with the team on the ground.",
        videos: [
          {
            src: "/projects/ye-tour/arnhem-show-reel.mp4",
            alt: "Arnhem GelreDome live show footage",
            poster: "/projects/ye-tour/arnhem-promo-crowd.jpeg",
            aspect: "16/9",
            fit: "contain",
          },
        ],
        images: [
          {
            src: "/projects/ye-tour/arnhem-promo-dates.jpeg",
            alt: "Arnhem sold out show promo with dates",
            placeholder: "[Image: Arnhem promo]",
            aspect: "3/4",
          },
          {
            src: "/projects/ye-tour/arnhem-promo-crowd.jpeg",
            alt: "Arnhem stadium crowd promo visual",
            placeholder: "[Image: Arnhem crowd]",
            aspect: "3/4",
          },
        ],
      },
      {
        city: "Albania, Spain & Portugal",
        descriptor: "UPCOMING DATES · IN PRODUCTION",
        campaign:
          "Planning media for upcoming dates in Albania, Spain, and Portugal. Promo assets and rollout plans still in progress.",
        images: [],
        upcoming: true,
      },
    ],
    approach: {
      heading: "HOW IT RUNS.",
      body: "Each show gets its own plan. Content for each platform, fan page pushes, promos to build hype before doors. On show day it's live coverage and staying locked in with the team.",
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
    context: "Yeezy, Vultures album and clothing",
    overview:
      "Marketing for the Vultures album rollout and Yeezy clothing line. Listening party graphics, hype videos, and social strategy for events in Chicago, New York, and more. Street marketing, event promos, BTS content. For clothing, SPLY campaigns, launch visuals, and content for drops on Instagram and TikTok.",
    images: [],
    layout: "yeezy-marketing",
    marketingCampaigns: [
      {
        name: "Vultures",
        descriptor: "ALBUM MARKETING · LISTENING PARTIES · SOCIAL ROLLOUT",
        campaign:
          "Full marketing for the Vultures album. Listening party graphics, event promos, BTS content, and street level ¥$ activations. Visuals and videos for United Center Chicago, UBS Arena New York, and other dates. Planned and pushed content on Instagram, TikTok, and X ahead of each drop.",
        theme: "vultures",
        featured: true,
        images: [],
        mediaItems: [
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/globe.png",
            alt: "Vultures global campaign graphic",
            aspect: "1/1",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/vultures/bg-reel.mp4",
            alt: "Vultures campaign atmospheric reel",
            poster: "/projects/yeezy-marketing/vultures/globe.png",
            aspect: "16/9",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/united-center.jpg",
            alt: "Vultures United Center Chicago listening party promo",
            aspect: "16/9",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/vultures/promo-reel.mp4",
            alt: "Vultures campaign promotional video",
            poster: "/projects/yeezy-marketing/vultures/spotlight.png",
            aspect: "16/9",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/listening-party.jpg",
            alt: "Vultures New York listening experience promo",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/bts-ice-sculpture.jpg",
            alt: "Vultures listening party BTS with ice sculpture",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/listening-moment.jpg",
            alt: "Vultures listening party live moment",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/street-marketing.jpg",
            alt: "Vultures ¥$ street stencil marketing",
            aspect: "3/4",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/vultures/spotlight.png",
            alt: "Vultures spotlight campaign graphic",
            aspect: "1/1",
          },
        ],
      },
      {
        name: "Yeezy Clothing",
        descriptor: "APPAREL MARKETING · SPLY · PRODUCT LAUNCHES",
        campaign:
          "Marketing and content for Yeezy clothing. Product launch graphics, SPLY campaign visuals, and social content for apparel drops. Promo videos and static assets for Yeezy Pods and seasonal collections on Instagram and TikTok.",
        theme: "clothing",
        images: [],
        mediaItems: [
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/sply-grid.jpg",
            alt: "Yeezy clothing SPLY product grid campaign",
            aspect: "1/1",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-1.mp4",
            alt: "Yeezy clothing SPLY campaign reel",
            poster: "/projects/yeezy-marketing/clothing/sply-grid.jpg",
            aspect: "9/16",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/yeezy-pods.jpg",
            alt: "Yeezy Pods celebrity placement marketing",
            aspect: "9/16",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-2.mp4",
            alt: "Yeezy clothing product launch reel",
            poster: "/projects/yeezy-marketing/clothing/yeezy-pods.jpg",
            aspect: "9/16",
          },
          {
            type: "video",
            src: "/projects/yeezy-marketing/clothing/reel-3.mp4",
            alt: "Yeezy clothing seasonal collection reel",
            poster: "/projects/yeezy-marketing/clothing/crest-logo.jpg",
            aspect: "9/16",
          },
          {
            type: "image",
            src: "/projects/yeezy-marketing/clothing/crest-logo.jpg",
            alt: "Yeezy clothing crest logo campaign",
            aspect: "1/1",
          },
        ],
      },
    ],
    approach: {
      heading: "HOW IT LOOKS.",
      body: "Raw and high contrast, everything should feel like it belongs to the Vultures world. Listening parties get their own visual identity. Clothing gets clean product shots. Both run through the same social rollout.",
    },
  },
  {
    id: 5,
    slug: "la-apparel",
    number: "05",
    title: ["LA Apparel", "Campaign."],
    contentsName: "LA Apparel Campaign",
    category: "Brand Marketing",
    year: "2023 to 2024",
    role: "Visual Brand Designer & Content Strategist",
    tools: "Figma · Photoshop · Illustrator · CapCut · Premiere",
    context: "Los Angeles Apparel brand partnership",
    overview:
      "Visual content and marketing assets for Los Angeles Apparel. Graphics, promos, and short form video for Instagram and TikTok that fit their minimal California look.",
    images: [],
    layout: "la-apparel",
    laApparelMedia: {
      wides: [
        {
          src: "/projects/la-apparel/campaign-1.mp4",
          alt: "LA Apparel campaign film 1",
          aspect: "16/9",
        },
        {
          src: "/projects/la-apparel/campaign-2.mp4",
          alt: "LA Apparel campaign film 2",
          aspect: "16/9",
        },
      ],
      reels: [
        {
          src: "/projects/la-apparel/story-1.mp4",
          alt: "LA Apparel Instagram story reel 1",
          aspect: "9/16",
        },
        {
          src: "/projects/la-apparel/story-2.mp4",
          alt: "LA Apparel Instagram story reel 2",
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
    year: "2022 to Present",
    role: "Creator, Designer, Strategist",
    tools: "CapCut · Premiere · Photoshop · Figma · Instagram · TikTok",
    context: "Personal brand, @Yelova911 and @kanyewestlover911",
    overview:
      "Three years building in public. Grew @Yelova911 and @kanyewestlover911 into pages with millions of followers, got featured in Rolling Stone, ran content for KWL Studio, and made short form edits that actually hit. Every post was just me figuring out what works at scale.",
    stats: [
      { value: "3M+", label: "Combined reach across platforms" },
      { value: "20 to 30M+", label: "Views per Ye tour show" },
      { value: "50+", label: "Brands and creators worked with" },
      { value: "4+", label: "Years creating consistently" },
    ],
    images: [],
    layout: "creative-journey",
    creativeJourneyMedia: {
      press: {
        src: "/projects/creative-journey/rolling-stone-feature.jpeg",
        alt: "Rolling Stone feature on @kanyewestlover911",
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
          alt: "TikTok profile @kanyewestlover911 with 1.8M followers",
          highlight: "1.8M followers · 54.4M likes",
        },
        {
          platform: "instagram",
          handle: "@yelova911",
          src: "/projects/creative-journey/instagram-profile.jpeg",
          alt: "Instagram profile @yelova911 with 427K followers",
          highlight: "427K followers · 1,068 posts",
        },
      ],
      hashtag: {
        src: "/projects/creative-journey/hashtag-impact.jpeg",
        alt: "#kanyewestlover911 with 51.7K posts on TikTok",
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
    year: "2025, Ongoing",
    role: "Marketing Strategist & Content Director",
    tools: "CapCut · Premiere · Photoshop · TikTok · Instagram · X",
    context: "Client work with 3 artists",
    overview:
      "Running marketing and content for @mysp8c, @kinoftw, and @oodaredevil. TikTok and Instagram strategy, promo graphics, hype edits, and rollout planning tailored to each artist's sound and how they want to grow.",
    images: [],
    layout: "artist-marketing",
    ongoing: true,
    artists: [
      {
        handle: "@mysp8c",
        descriptor: "SPOTIFY · TIKTOK · INSTAGRAM",
        campaign:
          "Growing his socials off the music he already has on Spotify. Short form edits and clips for TikTok and Instagram that turn streams into real followers.",
        videos: [
          {
            src: "/projects/artist-marketing/mysp8c/reel-2.mp4",
            alt: "@mysp8c short form hype clip",
            aspect: "4/3",
            objectPosition: "54% center",
            zoom: 1.05,
          },
        ],
        images: [],
      },
      {
        handle: "@kinoftw",
        descriptor: "TIKTOK · INSTAGRAM · VISUALS",
        campaign:
          "Building out his look and content so it feels consistent on TikTok and Instagram. Cover art, promo graphics, and hype edits that match how his music actually sounds.",
        videos: [
          {
            src: "/projects/artist-marketing/kino/reel.mp4",
            alt: "@kinoftw campaign hype reel",
            aspect: "4/3",
          },
        ],
        images: [],
      },
      {
        handle: "@oodaredevil",
        descriptor: "TIKTOK · HYPE EDITS · ROLLOUT",
        campaign:
          "Running his rollout on short form platforms. Fast edits that grab attention and send people to the music.",
        videos: [
          {
            src: "/projects/artist-marketing/oodaredevil/reel.mp4",
            alt: "@oodaredevil hype video edit",
            aspect: "4/3",
          },
        ],
        images: [],
      },
    ],
    approach: {
      heading: "HOW I WORK.",
      body: "I start by getting the artist's sound and what they're going for visually. Then it's content, platform strategy, graphics, and edits that actually work online. Main goal is turning good music into stuff people want to share.",
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
