# Ganesh Prasad Bhandari — Portfolio

A premium, interactive portfolio website built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**.

Live site: https://ganeshpsdbhandari.com.np

## Features

- Light / dark themes with animated view transitions
- Scroll-triggered reveals, magnetic hover effects, tilt cards, animated skill rings
- Background music player with persistent preference
- Contact form powered by EmailJS
- SEO meta tags, Open Graph, JSON-LD structured data, sitemap
- Reduced-motion support and accessible UI

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run Oxlint

## Environment variables

The contact form uses EmailJS. Create a `.env.local` file (gitignored):

```env
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Deployment

Deploy the `dist/` output produced by `npm run build`. The repo includes
`public/_headers` with cache-control rules for Netlify-style static hosting.
