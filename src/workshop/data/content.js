// content.js: every project in the Workshop, where it lives, and what it links to.
// Facts come from the project repos (READMEs, data) and the current shazport site. Anything unverified is marked [like this].
const GH = "https://github.com/shazaanraza123/";

export const LINKS = {
  resume: "https://shazport.netlify.app",   // [replace with the real resume PDF]
  email: "[your email]",                    // [replace]
  caseStudyBase: "https://shazport.netlify.app" // [each project gets /work/<slug> once case studies are built]
};

// THE BENCH: six featured objects. key = project id. obj = the physical thing on the bench.
export const FEATURED = {
  moodboard: { n: "Instagram Moodboard", obj: "Proof board, flows A + B", meta: "Product design + React prototype / 2026 / Independent concept",
    line: "Turns Instagram's Saved tab into a workspace: find more of what you like, or make something of your own.",
    slug: "instagram-moodboard", code: GH + "IGMOODBOARDMOCKUP", wall: "igflow", bench: "board",
    plates: ["ig-board", "ig-similar", "ig-ideas", "ig-feed"], portrait: true },
  kwl: { n: "KWL Studio", obj: "Star Belt 001 + Peak Wallet 002", meta: "Brand, product, manufacturing + store / 2023 to now",
    line: "Drop-only accessories from Chicago. A reversible star belt and a mountain card wallet.",
    slug: "kwl-studio", code: GH + "KWLSTUDIO", live: "https://kwlstudio.shop", wall: "beltsketch", bench: "belt",
    plates: ["belt-black", "belt-white", "wallet-front", "wallet-open"] },
  yzy: { n: "YZY Mobile", obj: "Phone prototype", meta: "UI design + Swift prototype / 2024 / Internal prototype",
    line: "One app for the drop, the album and the catalog, prototyped in Swift for internal pitches.",
    slug: "yzy-mobile", wall: "phone", bench: "phone", plates: ["shop", "album", "disco"], portrait: true },
  samples: { n: "Spotify Samples", obj: "Record, side A", meta: "Product design + front-end / 2026 / Built concept",
    line: "Hear where a sample came from, compare both songs, follow the chain.",
    slug: "spotify-samples", code: GH + "spotify-samples", wall: "chop", bench: "disc", plates: ["ss-home"] },
  archive: { n: "YE ARCHIVE", obj: "Card catalog", meta: "Design + React/TypeScript build / 2026 / Built",
    line: "A connected archive of Ye's documented work: 28,083 records, 13,956 local images.",
    slug: "ye-archive", code: GH + "ye-archive", wall: "rs", bench: "catalog", plates: ["ye-entry", "ye-archive", "ye-era", "ye-search"] },
  tour: { n: "Ye Tour Media", obj: "Stage model", meta: "Tour media + campaigns / 2025 to now / Ongoing",
    line: "Promos, hype edits and on-the-ground content across SoFi, Mexico City, Istanbul, Arnhem and more.",
    slug: "ye-tour", wall: "contact", bench: "stage", plates: ["mexico", "tampa", "sofi", "chicago"], portrait: true }
};
export const FEATURED_ORDER = ["moodboard", "kwl", "yzy", "samples", "archive", "tour"];

// THE WALL: projects that live as artifacts of thinking (and are still reachable from the index)
export const WALL_PROJECTS = {
  map: { n: "Spotify Map", meta: "Product design + front-end / 2026 / Live", wallId: "map", code: GH + "Spotify-Map",
    live: "https://spotify-samples-8gia-e0j3hj9id-shazaanraza123s-projects.vercel.app/" }, // [check: this URL is copied from the current site and points at a spotify-samples deploy]
  yeezy: { n: "Yeezy Marketing", meta: "Vultures rollout + Yeezy clothing / 2024", wallId: "yzposter" },
  la: { n: "LA Apparel", meta: "Visual content + short form / 2023 to 2024", wallId: "laprint" },
  artists: { n: "Artist Marketing", meta: "@mysp8c, @kinoftw, @oodaredevil / 2025 to now", wallId: "kino" },
  journey: { n: "The Creative Journey", meta: "Fan pages, Rolling Stone feature / 2022 to now", wallId: "profile" }
};

// THE DRAWER: everything else, filed by kind. status: built | in progress | needs link
export const DRAWER = [
  { folder: "Software", items: [
    { n: "Resume Builder", line: "Web app that generates LaTeX resumes through the Overleaf CLSI API.", status: "built", href: GH + "resume-builder" },
    { n: "Personal Finance Tracker", line: "[add a one-line description]", status: "needs link", href: null },
    { n: "Moodboard (2025)", line: "Shared canvas: upload images, add text, drag, auto-save.", status: "built", href: GH + "moodboard" } ] },
  { folder: "Data + engineering", items: [
    { n: "Real Estate Price Predictor", line: "[add a one-line description]", status: "needs link", href: null },
    { n: "NBA Game Predictor", line: "XGBoost model on historical and live data, served as a web app.", status: "built", href: GH + "NBA-predictor" },
    { n: "Search engine, CS 429", line: "Web crawler, indexer and query processor, end to end.", status: "built", href: GH + "cs429proj" },
    { n: "Options trading bot", line: "Automated options strategies on the Alpaca API with risk limits.", status: "built", href: GH + "alpacabot" } ] },
  { folder: "Games + interaction", items: [
    { n: "Kick the Can", line: "Roblox game, built in Roblox Studio.", status: "in progress", href: null },
    { n: "Yeezer", line: "Guess the Kanye song, on the Spotify Web Playback SDK.", status: "built", href: GH + "yeezer" },
    { n: "Artist Wordle", line: "Wordle for artist names, multi-word names handled.", status: "built", href: GH + "Artist-Wordle" } ] },
  { folder: "In progress", items: [
    { n: "Artist Analytics Platform", line: "A tool for independent artists and managers.", status: "in progress", href: GH + "artist-data-analytics" },
    { n: "Kick the Can", line: "Roblox, see Games.", status: "in progress", href: null } ] },
  { folder: "Older work", items: [
    { n: "Pixel Craft Co.", line: "Agency site in React + SCSS, Virgil-inspired minimalism.", status: "built", href: GH + "pixelCraft" },
    { n: "YZY app concepts", line: "2021 concept sketches. Private, ask me.", status: "private", href: null } ] }
];

export const caseStudy = slug => LINKS.caseStudyBase; // [swap to `/work/${slug}` once the routes exist]
