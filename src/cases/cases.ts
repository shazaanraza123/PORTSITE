// cases.ts: content for every case-study page.
// Rule: only real facts. Sources are named per case. Campaign copy, roles and tour stops are read straight from
// src/data/projects.ts (the existing site) so the two never drift. Anything not verified is left out, not guessed.
import { projects } from "../data/projects";
import sizes from "./img-sizes.json";

const GH = "https://github.com/shazaanraza123/";
const SZ = sizes as Record<string, number[]>;

export type Media =
  | { kind: "img"; src: string; alt: string; cap?: string; frame?: "phone" | "browser" | "print" | "plain"; w?: number; h?: number }
  | { kind: "video"; src: string; alt: string; cap?: string; frame?: "phone" | "plain"; vertical?: boolean };
export type Section =
  | { kind: "text"; h: string; body: string[] }
  | { kind: "list"; h: string; items: string[]; note?: string }
  | { kind: "steps"; h: string; lanes: { label: string; steps: string[] }[]; note?: string }
  | { kind: "defs"; h: string; items: { t: string; d: string }[]; note?: string }
  | { kind: "gallery"; h: string; intro?: string; items: Media[]; layout?: "phones" | "wide" | "mixed" }
  | { kind: "stops"; h: string; stops: { city: string; tag: string; body: string; media: Media[]; upcoming?: boolean }[] }
  | { kind: "bars"; h: string; intro?: string; rows: { label: string; value: number }[]; note?: string }
  | { kind: "stats"; h: string; items: { value: string; label: string }[]; note?: string }
  | { kind: "compare"; h: string; body: string; a: { label: string; title: string; artist: string; time: string }; b: { label: string; title: string; artist: string; time: string } };
export type Case = {
  slug: string; n: string; kicker: string; line: string;
  meta: { role: string; year: string; status: string; tools: string };
  links: { label: string; href: string }[];
  hero: Media; sections: Section[];
  thinking?: string; bench?: string; sources: string;
};

/* helpers */
const c = (key: string) => `/cases/${key}.jpg`;
const img = (key: string, alt: string, cap?: string, frame?: "phone" | "browser" | "print" | "plain"): Media =>
  ({ kind: "img", src: c(key), alt, cap, frame, w: SZ[key]?.[0], h: SZ[key]?.[1] });
const fromProjects = (p: string) => p.replace(/^\/projects\//, "").replace(/\.(png|jpe?g)$/i, "");
const vid = (src: string, alt: string, cap?: string, vertical = true): Media => ({ kind: "video", src, alt, cap, vertical, frame: vertical ? "phone" : "plain" });
const P = Object.fromEntries(projects.map(p => [p.slug, p]));

/* ---------------- 001 INSTAGRAM MOODBOARD (source: IGMOODBOARDMOCKUP README + the running app) ---------------- */
const moodboard: Case = {
  slug: "instagram-moodboard", n: "Instagram Moodboard", kicker: "Object / 001",
  line: "Instagram's Saved tab is where inspiration gets lost. Moodboard turns Saved into a workspace for finding more of what you like, and for making something of your own.",
  meta: { role: "Product design + front-end", year: "2026", status: "Independent concept, working prototype", tools: "React 18, TypeScript (strict), Vite, React Router, Zustand, Framer Motion, Vitest" },
  links: [{ label: "Code", href: GH + "IGMOODBOARDMOCKUP" }],
  hero: img("moodboard/board", "Moodboard: the Boot research board with notes and a shortlist", "Boot research board. Notes live on the post they belong to.", "phone"),
  bench: "board", thinking: "igflow",
  sources: "IGMOODBOARDMOCKUP README, screens captured from the running prototype.",
  sections: [
    { kind: "steps", h: "Two flows", lanes: [
      { label: "A. I like this. Help me find more of it.", steps: ["Save a post from the feed", "Keep a note on it", "Pick the details you want more of", "Find similar"] },
      { label: "B. This inspires me. Help me make something of my own.", steps: ["Group a creator board", "Generate directions from only those posts", "Save one to a brief"] } ] },
    { kind: "gallery", h: "The screens", layout: "phones", items: [
      img("moodboard/feed", "Feed with a saved post", "Feed. Save a post like you already do.", "phone"),
      img("moodboard/saved", "Saved tab with Moodboards next to All posts and Collections", "Saved. Moodboards sit next to All posts and Collections, no new tab.", "phone"),
      img("moodboard/similar", "Find similar: pick details, see exact matches, similar products and inspiration", "Find similar. You pick what caught your eye.", "phone"),
      img("moodboard/ideas", "Develop an idea from 5 references: carousel, reel or campaign", "Develop an idea. Directions come only from the posts you picked.", "phone") ] },
    { kind: "defs", h: "Design decisions", items: [
      { t: "Exact match is rare on purpose", d: "Find similar uses three labels. Exact match only shows when a product is tagged, has every detail you picked, and is the same kind of post. Similar product is tagged but misses something. Inspiration has no product tag, so it's a reference, not a shop result." },
      { t: "Notes belong to the post", d: "A note belongs to that post on that board. Saving doesn't force you to pick a moodboard, and taking a post off a board doesn't unsave it." },
      { t: "Moodboards live in Saved", d: "No new tab. Profile in the tab bar opens Saved." },
      { t: "AI is optional", d: "Find similar and Develop an idea are help you can skip. You can save, note and rearrange a board without generating anything." } ] },
    { kind: "list", h: "What's simulated", items: [
      "Similarity scores shared attributes. An embedding model can replace it through SimilarityProvider.",
      "Directions come from templates filled with the posts you picked. A grounded LLM can replace it through IdeaProvider.",
      "Neither one calls the network. State persists in localStorage." ],
      note: "Independent concept by Shazaan Raza. Not affiliated with or endorsed by Instagram or Meta." }
  ]
};

/* ---------------- 002 KWL STUDIO (sources: KWLSTUDIO repo + images, existing site, Shaz's notes) ---------------- */
const kwlP = P["kwl-studio"];
const kwl: Case = {
  slug: "kwl-studio", n: "KWL Studio", kicker: "Object / 002",
  line: "Drop-only accessories from Chicago. A reversible star belt, a mountain card wallet, and the brand and store around them.",
  meta: { role: "Founder: creative direction, product design, brand, store", year: "2023 to now", status: "Drop 001 developed", tools: kwlP?.tools?.replace(/ · /g, ", ") + ", Next.js" },
  links: [{ label: "Live", href: "https://kwlstudio.shop" }, { label: "Code", href: GH + "KWLSTUDIO" }],
  hero: img("kwl/belt-black", "Star Belt 001 drawing: black quilted strap, red lining, star studs and a star buckle", "Star Belt 001, black / red.", "print"),
  bench: "belt", thinking: "beltsketch",
  sources: "KWLSTUDIO repo (README + product images), existing site copy, Shaz's notes on Drop 001.",
  sections: [
    { kind: "text", h: "Star Belt 001", body: [
      "A reversible caviar quilted leather belt with a detachable star buckle. Star studs run the length of the strap.",
      "Two colorways from the drawings: black with red lining, and white with yellow lining.",
      "For the drop I produced a full manufacturer brief, a business plan and a campaign deck." ] },
    { kind: "gallery", h: "Belt drawings and colorways", layout: "wide", items: [
      img("kwl/belt-white", "Star Belt 001 drawing, white with yellow lining", "White / yellow.", "print"),
      img("kwl/stock", "Star Belt 001 colorway lineup render: black, red, white and yellow", "Colorway lineup.", "plain") ] },
    { kind: "text", h: "Peak Wallet 002", body: [
      "A card holder whose top edge is a mountain range. The pocket is a second ridge. Written on the front: “i hate this wallet, its awesome.”" ] },
    { kind: "gallery", h: "From drawing to mockup", intro: "Product mockups, not production photos.", layout: "mixed", items: [
      img("kwl/wallet-drawn", "Peak Wallet 002 drawing", "The drawing.", "print"),
      img("kwl/wallet-front", "Peak Wallet 002 front mockup", "Front.", "plain"),
      img("kwl/wallet-back", "Peak Wallet 002 back mockup", "Back.", "plain"),
      img("kwl/wallet-card", "Peak Wallet 002 with a card in the pocket", "With a card.", "plain"),
      img("kwl/wallet-open", "Peak Wallet 002 opened", "Open.", "plain"),
      img("kwl/wallet-closeup", "Peak Wallet 002 edge detail", "Edge detail.", "plain") ] },
    { kind: "text", h: "The brand and the drop page", body: [
      kwlP?.overview ?? "",
      "The Drop 001 page is a minimal Yeezy-style site: white field, black star, scroll to notify. A spinning black star with KWL STUDIO / DROP 001 / 001 / 100, then email and number capture." ] },
    { kind: "gallery", h: "Brand", layout: "wide", items: [
      img("kwl/brand", "KWL Studio logo system on black", "Logo system.", "plain"),
      img("kwl/storefront", "KWL Studio storefront", "Storefront.", "browser"),
      vid("/projects/kwl-studio/star-reel.mp4", "KWL Studio brand reel", "Brand reel.", false) ] }
  ]
};

/* ---------------- 003 YZY MOBILE (source: existing site) ---------------- */
const yzyP = P["yzy-mobile"];
const yzy: Case = {
  slug: "yzy-mobile", n: "YZY Mobile", kicker: "Object / 003",
  line: "One app for the Yeezy world: shop the drop, play the album, browse the catalog.",
  meta: { role: yzyP?.role ?? "UI Designer & Prototyper", year: yzyP?.year ?? "2024", status: "Internal prototype", tools: "Figma, Swift" },
  links: [],
  hero: img("yzy/hero", "YZY app on a phone, tracklist screen", undefined, "plain"),
  bench: "phone", thinking: "phone",
  sources: "Existing site copy and screens.",
  sections: [
    { kind: "text", h: "What I did", body: [yzyP?.overview ?? ""] },
    { kind: "text", h: "Four tabs", body: ["The app is organized as YZY, SNDS (music), SPLY (shop) and HQ, the same short uppercase voice Yeezy already uses."] },
    { kind: "gallery", h: "Screens", layout: "phones", items: [
      img("yzy/shop", "Shop screen, product grid on the SPLY tab", "SPLY: the shop.", "phone"),
      img("yzy/album", "Music player, Vultures 1 album tracklist on SNDS", "SNDS: an album.", "phone"),
      img("yzy/disco", "Discography grid, album catalog", "SNDS: the catalog.", "phone") ] }
  ]
};

/* ---------------- 004 SPOTIFY SAMPLES (source: existing case study component) ---------------- */
const ssP = P["spotify-samples"];
const samples: Case = {
  slug: "spotify-samples", n: "Spotify Samples", kicker: "Object / 004",
  line: "Discover the music behind the music.",
  meta: { role: ssP?.role ?? "Product Designer & Frontend Developer", year: ssP?.year ?? "2026", status: "Independent concept, working prototype", tools: "Figma, React, TypeScript, Vite" },
  links: [{ label: "Live prototype", href: "https://spotify-samples.vercel.app" }, { label: "Code", href: GH + "spotify-samples" }],
  hero: img("samples/home", "Spotify Samples prototype: now playing with the Samples entry point", "Working front-end prototype. Playback and catalog states are simulated.", "browser"),
  bench: "disc", thinking: "chop",
  sources: "Existing Spotify Samples case study on shazport.",
  sections: [
    { kind: "text", h: "Music discovery usually moves forward", body: ["Spotify is great at helping listeners figure out what to play next, but discovering where music came from usually means leaving the app. Samples, interpolations and musical connections are a huge part of how people discover older music."] },
    { kind: "steps", h: "Bring the relationship into the song", lanes: [{ label: "From the track that's already playing", steps: ["Now Playing", "Samples", "Compare", "Sample Chain", "Explore"] }] },
    { kind: "compare", h: "Hear the source, then the sample", body: "Listeners switch between the original source and the sampled song to understand the connection.",
      a: { label: "Original", title: "Through the Fire", artist: "Chaka Khan", time: "0:58" }, b: { label: "Sampled", title: "Through the Wire", artist: "Kanye West", time: "0:04" } },
    { kind: "defs", h: "From a utility into a place to browse", items: [
      { t: "Hip-Hop Classics", d: "A shelf of records people already know, opened through the samples inside them." },
      { t: "Soul to Rap", d: "A path from the source era into the songs that borrowed from it." },
      { t: "Your Sample Trail", d: "A personal thread of origins a listener has already opened." },
      { t: "Era-based discovery", d: "Jump decades without leaving the song that started the search." } ] },
    { kind: "list", h: "From Figma to a working product", items: ["Responsive UI", "Interactive navigation", "Simulated playback states", "Progress behavior", "Microinteractions", "Accessibility considerations"],
      note: "Designed in Figma, built in React, TypeScript and Vite. A front-end concept with simulated listening states, not Spotify's backend or production APIs." },
    { kind: "list", h: "What I would test", items: ["Do users understand the Samples entry point?", "Does A/B comparison lead to more source-song discovery?", "Where should Samples live without interrupting normal listening?"] },
    { kind: "defs", h: "Proposed success metrics", note: "Proposed metrics. Not measured results.", items: [
      { t: "Sample opens", d: "How often listeners enter Samples from a track." },
      { t: "A/B comparison interactions", d: "Switches between the source and the sampled song." },
      { t: "Source-song plays and saves", d: "Whether the original actually gets heard and kept." },
      { t: "Sample Chain exploration", d: "How far a listener follows one connection into the next." },
      { t: "Playlist adds after sample discovery", d: "Songs saved because of where they came from." } ] }
  ]
};

/* ---------------- 005 YE ARCHIVE (sources: ye-archive README, SOURCES.md, public/search-index.json counts) ---------------- */
const archive: Case = {
  slug: "ye-archive", n: "YE ARCHIVE", kicker: "Object / 005",
  line: "A connected digital archive of Ye's documented creative work.",
  meta: { role: "Design + build", year: "2026", status: "Built, runs locally", tools: "React, TypeScript, Vite, TypeScript scrapers" },
  links: [{ label: "Code", href: GH + "ye-archive" }],
  hero: img("ye-archive/entry", "YE ARCHIVE entry page", "Entry. Desktop-first at about 1440px.", "browser"),
  bench: "catalog", thinking: "rs",
  sources: "ye-archive README and SOURCES.md. Counts computed from public/search-index.json.",
  sections: [
    { kind: "bars", h: "28,083 records, 13,956 local images", intro: "Every record has a domain, era, year, type and a release status.", note: "Counted from the archive's search index.",
      rows: [{ label: "Music", value: 14310 }, { label: "Ephemera", value: 7602 }, { label: "Fashion", value: 4808 }, { label: "Design", value: 676 }, { label: "Film", value: 192 }, { label: "Photography", value: 151 }, { label: "Performance", value: 131 }, { label: "Objects", value: 66 }, { label: "Writing", value: 25 }] },
    { kind: "gallery", h: "Ways in", layout: "wide", items: [
      img("ye-archive/field", "The archive field: records scattered across a timeline", "The field. Records placed in time.", "browser"),
      img("ye-archive/era", "Era page for Yeezus, 2013", "Era pages.", "browser"),
      img("ye-archive/connections", "Connections view for Glow in the Dark", "Connections between records.", "browser"),
      img("ye-archive/search", "Search for donda with domain, year and status filters", "Search. Press / anywhere.", "browser") ] },
    { kind: "list", h: "How it's built", items: [
      "Routes: entry, archive field, era, record, music, fashion, unrealized, connections, search.",
      "Search queries a slim derived index. It never renders 28k records at once.",
      "Images are local only (public/archive, figma-export).",
      "The scraper audits robots.txt and crawls permitted public sources into data/. Sources and attributions are documented in the repo." ] }
  ]
};

/* ---------------- 006 YE TOUR MEDIA (source: existing site tour stops) ---------------- */
const tourP = P["ye-tour"];
const tour: Case = {
  slug: "ye-tour", n: "Ye Tour Media", kicker: "Object / 006",
  line: "Media and campaigns for Ye's world tour, one city at a time.",
  meta: { role: tourP?.role ?? "", year: tourP?.year ?? "", status: "Ongoing", tools: (tourP?.tools ?? "").replace(/ · /g, ", ") },
  links: [],
  hero: img("ye-tour/mexico-stadium", "Ye live in Mexico City, the stadium", undefined, "plain"),
  bench: "stage", thinking: "contact",
  sources: "Existing site: tour stops, roles and media.",
  sections: [
    { kind: "text", h: "What I do", body: [tourP?.overview ?? "", tourP?.approach?.body ?? ""] },
    { kind: "stops", h: "Stops", stops: (tourP?.tourStops ?? []).map(s => ({
      city: s.city, tag: s.descriptor, body: s.campaign, upcoming: s.upcoming,
      media: [...s.images.map(i => img(fromProjects(i.src), i.alt, undefined, "plain")), ...(s.videos ?? []).map(v => vid(v.src, v.alt, undefined, (v.aspect ?? "9/16") === "9/16"))] })) }
  ]
};

/* ---------------- WALL: SPOTIFY MAP ---------------- */
const mapP = P["spotify-map"];
const map: Case = {
  slug: "spotify-map", n: "Spotify Map", kicker: "From the wall",
  line: "Hear what the world is listening to. Music discovery through place.",
  meta: { role: mapP?.role ?? "", year: mapP?.year ?? "2026", status: "Independent concept, working prototype", tools: (mapP?.tools ?? "").replace(/ · /g, ", ") },
  links: [{ label: "Code", href: GH + "Spotify-Map" }],
  hero: img("map/world", "Spotify Map world view", "World map. Explore music cities around the world.", "browser"),
  thinking: "map", sources: "Existing Spotify Map case study on shazport.",
  sections: [
    { kind: "gallery", h: "The flow", layout: "wide", items: [
      img("map/chicago", "Chicago city view", "City view. Trending music, local scenes, neighborhoods, emerging sounds.", "browser"),
      img("map/drill", "Chicago Drill scene view", "Scene view. Defining tracks, artists, origins and influence.", "browser"),
      img("map/teleport", "Teleport", "Teleport. Jump to a random city outside your usual listening.", "browser"),
      img("map/yours", "Your Music Map", "Your Music Map. Where your own listening comes from.", "browser"),
      img("map/passport", "Spotify Passport", "Passport. Collect the cities and scenes you've explored.", "browser") ] },
    { kind: "list", h: "Principles", items: ["Geography as discovery", "Local culture over generic popularity", "Exploration over recommendation", "Make music discovery feel spatial"] },
    { kind: "list", h: "Interactions", items: ["Interactive city markers", "Local / Global discovery", "City and scene navigation", "Teleport", "Animated geographic routes", "Dynamic destination content", "Personalized music geography", "Spotify Passport", "Responsive interface"] }
  ]
};

/* ---------------- WALL: CAMPAIGNS (source: existing site) ---------------- */
const yzP = P["yeezy-marketing"];
const yeezy: Case = {
  slug: "yeezy-marketing", n: "Yeezy Marketing", kicker: "From the wall",
  line: "Vultures album rollout and Yeezy clothing.",
  meta: { role: yzP?.role ?? "", year: yzP?.year ?? "", status: "Campaign", tools: (yzP?.tools ?? "").replace(/ · /g, ", ") },
  links: [], thinking: "yzposter", sources: "Existing site copy and media.",
  hero: img("yeezy-marketing/vultures/listening-party", "Vultures listening experience poster", undefined, "plain"),
  sections: [
    { kind: "text", h: "What I did", body: [yzP?.overview ?? "", yzP?.approach?.body ?? ""] },
    ...(yzP?.marketingCampaigns ?? []).map(mc => ({ kind: "gallery" as const, h: mc.name, intro: mc.campaign, layout: "mixed" as const,
      items: [...(mc.mediaItems ?? []).map(m => m.type === "video" ? vid(m.src, m.alt, undefined, (m.aspect ?? "9/16") === "9/16") : img(fromProjects(m.src), m.alt, undefined, "plain")),
        ...mc.images.map(i => img(fromProjects(i.src), i.alt, undefined, "plain")), ...(mc.videos ?? []).map(v => vid(v.src, v.alt, undefined, (v.aspect ?? "9/16") === "9/16"))] }))
  ]
};
const laP = P["la-apparel"];
const la: Case = {
  slug: "la-apparel", n: "LA Apparel", kicker: "From the wall",
  line: "Graphics, promos and short form for Los Angeles Apparel.",
  meta: { role: laP?.role ?? "", year: laP?.year ?? "", status: "Brand partnership", tools: (laP?.tools ?? "").replace(/ · /g, ", ") },
  links: [], thinking: "laprint", sources: "Existing site copy and media.",
  hero: vid("/projects/la-apparel/campaign-1.mp4", "LA Apparel campaign video", undefined, false),
  sections: [
    { kind: "text", h: "What I did", body: [laP?.overview ?? ""] },
    { kind: "gallery", h: "Stories", layout: "phones", items: (laP?.laApparelMedia?.reels ?? []).map(v => vid(v.src, v.alt)) },
    { kind: "gallery", h: "Campaign", layout: "wide", items: (laP?.laApparelMedia?.wides ?? []).slice(1).map(v => vid(v.src, v.alt, undefined, false)) }
  ]
};
const amP = P["artist-marketing"];
const artists: Case = {
  slug: "artist-marketing", n: "Artist Marketing", kicker: "From the wall",
  line: "Rollouts and short form for three independent artists.",
  meta: { role: amP?.role ?? "", year: amP?.year ?? "", status: "Ongoing", tools: (amP?.tools ?? "").replace(/ · /g, ", ") },
  links: [], thinking: "kino", sources: "Existing site copy and media.",
  hero: img("artist-marketing/kino/cover", "Kino single cover", undefined, "print"),
  sections: [
    { kind: "text", h: "How I work", body: [amP?.overview ?? "", amP?.approach?.body ?? ""] },
    { kind: "stops", h: "Artists", stops: (amP?.artists ?? []).map(a => ({ city: a.handle, tag: a.descriptor, body: a.campaign,
      media: [...a.images.map(i => img(fromProjects(i.src), i.alt, undefined, "plain")), ...(a.videos ?? []).map(v => vid(v.src, v.alt))] })) }
  ]
};
const cjP = P["creative-journey"];
const cj = cjP?.creativeJourneyMedia;
const journey: Case = {
  slug: "creative-journey", n: "The Creative Journey", kicker: "From the wall",
  line: "Fan pages, built in public.",
  meta: { role: cjP?.role ?? "", year: cjP?.year ?? "", status: "Ongoing", tools: (cjP?.tools ?? "").replace(/ · /g, ", ") },
  links: [], thinking: "profile", sources: "Existing site copy, stats and screenshots.",
  hero: img("creative-journey/rolling-stone-feature", cj?.press.alt ?? "Rolling Stone feature", cj ? `${cj.press.outlet}, ${cj.press.date}: “${cj.press.headline}”` : undefined, "print"),
  sections: [
    { kind: "text", h: "What it is", body: [cjP?.overview ?? ""] },
    { kind: "stats", h: "Numbers", items: cjP?.stats ?? [], note: "As stated on shazport." },
    { kind: "gallery", h: "The pages", layout: "phones", items: [
      ...(cj?.socials ?? []).map(s => img(fromProjects(s.src), s.alt, `${s.handle}: ${s.highlight}`, "phone")),
      ...(cj ? [img(fromProjects(cj.hashtag.src), cj.hashtag.alt, `${cj.hashtag.tag}: ${cj.hashtag.posts} posts`, "phone")] : [])] }
  ]
};

export const CASES: Case[] = [moodboard, kwl, yzy, samples, archive, tour, map, yeezy, la, artists, journey];
export const caseBySlug = (slug: string) => CASES.find(x => x.slug === slug);
