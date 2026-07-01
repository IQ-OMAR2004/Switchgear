# alfanar MV Switchgear — Interactive 3D Product & Learning Site

A dual-purpose website for alfanar's medium-voltage **"alfa"** switchgear range:
an **interactive 3D learning tool** and a **commercial product showcase**, in a
polished light/dark alfanar-branded interface.

> Built with Next.js (App Router) + React Three Fiber. The **alfa 12** is the fully
> realised reference product — explorable 3D model with exploded view, labelled
> callouts, clickable hotspots and a guided tour. The remaining products are catalogue
> summaries; their full pages + 3D follow in the next milestone.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript strict)
- **Tailwind CSS 4** (CSS-variable theme tokens, light + dark)
- **three / @react-three/fiber / @react-three/drei** — code-built 3D (no CAD; stylised primitives, each part a named mesh)
- **framer-motion** — UI motion (respects `prefers-reduced-motion`)
- Self-hosted fonts via `next/font` — Poppins, IBM Plex Sans, IBM Plex Mono

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and set as needed:

| variable | purpose |
|---|---|
| `NEXT_PUBLIC_QUOTE_ENDPOINT` | POST target for the "Request a quote" form. If unset, the form simulates success (demo mode) and sends nothing. |

No secrets are committed to the repo.

## Project structure

```
app/            routes: / · /range · /products/[slug] · /learn · /contact (+ sitemap, robots, 404)
components/     UI: nav, footer, theme, cards, tabs, quote form, range grid, primitives
three/          3D: ProductViewer, PanelModel, alfa12-parts (geometry), StaticPanelFallback
data/           products.ts · components.ts · glossary.ts · primer.ts  (single source of truth)
lib/            fonts, class helper
public/         datasheets, fonts (self-hosted at build)
styles/         (theme tokens live in app/globals.css)
```

## Theming

Light/dark is driven by a `data-theme` attribute on `<html>`, set **before paint** by an
inline script (no flash), toggled in the nav and persisted to `localStorage`. It respects
`prefers-color-scheme` on first load. Colour tokens are CSS variables mapped to Tailwind
via `@theme inline` in `app/globals.css`, so both themes (and the 3D scene lighting) swap
from one place.

## 3D approach

There is no CAD model. The panel is built from Three.js primitives in
`three/alfa12-parts.ts` — each main part is a separately named group so hotspots,
highlighting and the exploded animation target it precisely. Geometry, colours and
explode directions were derived from alfanar product photos and datasheets. A static
annotated SVG fallback renders when WebGL is unavailable or for reduced-motion users, so
the educational content is never blocked.

## Content & data accuracy

All copy is original alfanar content adapted from the alfanar catalogue and datasheets.
**alfa 12 / 12C is datasheet-backed.** Figures seen only on alfanar factory display
boards (alfa 40, alfa DT, primary alfa GSF6) are flagged with a "display board — confirm"
badge. 3D models are stylised, original representations for explanation — not certified
engineering drawings (see the footer disclaimer).

Third-party catalogues (Siemens / Schneider / ABB) were used only to learn domain
terminology and structure; none of their text, figures, layout or branding is reproduced.
