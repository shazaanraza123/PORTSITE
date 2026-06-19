# Shazaan Raza — Work

Standalone case-study portfolio site (separate from [shazweb.netlify.app](https://shazweb.netlify.app)).

Warm editorial layout inspired by printed design portfolios — single-page scroll with six project case studies.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
```

Deploy to Netlify with publish directory `dist`. `netlify.toml` is included.

## Adding project images

1. Place images in `public/projects/<slug>/`.
2. In `src/data/projects.ts`, set each image's `src` to the public path (e.g. `/projects/yzy-mobile/home.png`).
3. Placeholders in `ProjectImageGrid.tsx` automatically render `<img>` when `src` is set.
