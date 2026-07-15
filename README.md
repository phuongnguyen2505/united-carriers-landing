# United Carriers — Landing Page

Elite global freight forwarding & logistics hero landing page.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

## Self-hosted Font

Place your licensed `HelveticaNeueRoman.woff2` and `HelveticaNeueRoman.woff` files in `/public/fonts/`. The `@font-face` declaration in `src/index.css` will pick them up automatically. If the files are absent the fallback chain (`Helvetica Neue → Helvetica → Arial → sans-serif`) is used.

## Layers

| z-index | Layer |
|---------|-------|
| z-[55] | Mobile fullscreen menu |
| z-50 | Fixed nav bar |
| z-30 | Spotlight reveal (canvas mask + video) |
| z-[25] | Atmosphere overlay PNG |
| z-20 | Hero heading |
| z-10 | Background image |
| z-0 | SVG grid (parallax) |

## Assets

- **Background:** Unsplash container ship aerial shot
- **Video:** Mixkit cargo ship ocean flyover (autoplays muted, loops)
- **Overlay PNG:** Semi-transparent depth/atmosphere layer from Figma CDN
