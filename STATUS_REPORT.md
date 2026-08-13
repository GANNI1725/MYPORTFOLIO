# Portfolio Project — Status Report

**Project:** `premium-portfolio` · Personal portfolio for Ganesh Prasad Bhandari · Domain: `ganeshpsdbhandari.com.np`

---

## 1. Tech stack

| Aspect | Detail |
|---|---|
| Framework | **React 19** (`react@^19.2.7`, installed 19.2.8) — client-side SPA |
| Build tool | **Vite 8** (`vite@^8.1.1`, installed 8.1.5) via `@vitejs/plugin-react@^6.0.3` |
| Language | **TypeScript ~6.0** (strict-ish; `verbatimModuleSyntax`, `noUnusedLocals/Parameters`, `erasableSyntaxOnly`), target ES2023 |
| Styling | **Tailwind CSS v4** (CSS-first, no `tailwind.config.*` file) via `@tailwindcss/vite@^4.3.3`. Theme tokens live in `src/index.css` using `@theme`, `:root`, `.dark`, `[data-theme="red"]` blocks. No CSS modules, no plain stylesheets beyond `index.css` |
| Config files | `package.json`, `tsconfig.json` (+ `tsconfig.app.json`, `tsconfig.node.json`), `vite.config.ts` (React + Tailwind plugins, `@` alias → `./src`), `index.html`, `public/_headers` (Cloudflare Pages caching rules) |
| Routing | `react-router-dom@^7.18.2` (BrowserRouter) |
| Motion | `motion@^13.1.0` (imports via `motion/react`). Note: `motion` depends on `framer-motion@^13.1.0`, so **both** packages exist in `node_modules` (app only imports from `motion/react`) |
| Forms/email | `@emailjs/browser@^4.4.1` (contact forms on `/` and `/contact-us`) |
| Icons | `lucide-react@^1.27.0` |
| SEO/head | `react-helmet-async@^3.0.0` (custom `SEO.tsx` wrapper) |
| Lint | `oxlint@^1.71.0` (`npm run lint`) — no ESLint/Prettier config |
| Package manager / Node | npm 9.2.0 · Node v22.22.1 |

---

## 2. Project structure

```
src/
├── App.tsx                     # Providers, Navbar/Footer shell, Suspense, Routes
├── main.tsx                    # ReactDOM root + Router + HelmetProvider
├── index.css                   # Tailwind v4 + all design tokens + keyframes
├── data/index.ts               # All content data (person, skills, exp, projects, certs, blog)
├── hooks/                      # useMultiClick.ts, useReducedMotion.ts
├── lib/                        # motion.ts (variants), themeTransition.ts (View Transitions)
├── theme/                      # ThemeProvider.tsx, useTheme.ts (light/dark/red modes)
├── pages/                      # Home, AboutUs, ContactUs, Privacy, Terms, NotFound, ServerError
├── sections/                   # Hero, About, Skills, Experience, Projects, Certifications, Blog, Contact, Footer
└── components/                 # BackgroundMusic, BlogCard, CertificationCard, ErrorBoundary, FAQ,
                                # Logo, MagneticWrap, Navbar, OccultToggleIcon, ProjectCard,
                                # RedBloodDrops, RedLightning, RedModeLoader, RedModeMusic, SEO,
                                # SectionHeading, SkillRing, SocialLinks, StatsCard, ThemeToggle, TimelineItem
```

**Routes** (`src/App.tsx`)
- `/` → Home · `/privacy` · `/about-us` · `/terms` · `/contact-us` · `/500` → ServerError · `*` → NotFound

**Homepage sections, in render order** (`src/pages/Home.tsx`)
1. Hero
2. About
3. Skills
4. Experience
5. Projects
6. Certifications
7. Blog
8. FAQ
9. Contact

(Plus always-mounted: Navbar, Footer with BackToTop button, ScrollProgress bar; red-theme overlays RedBloodDrops/RedLightning only when `data-theme="red"`.)

---

## 3. Design system status

**Token location:** all in `src/index.css` (Tailwind v4 `@theme` + theme blocks). No `tailwind.config.js`.

- **Fonts** (`@theme`): `--font-sans` Inter, `--font-mono` JetBrains Mono, `--font-display` Alvera Demo. **Loading:** Inter + JetBrains Mono via Google Fonts `<link>` in `index.html` (preconnect included); **Alvera Demo self-hosted** in `public/alvera-demo/` (otf/ttf/woff2, `@font-face` in CSS).
- **Typography scale:** `--text-3xs` (10px) and `--text-2xs` (11px) custom tokens; rest use Tailwind default `text-xs`→`text-9xl`. Tracking tokens `--tracking-eyebrow` (0.35em), `--tracking-meta` (0.25em).
- **Semantic colors** (utilities generated from vars): `primary`, `secondary`, `surface`, `canvas`, `border`, `accent`, `accent-hover`, `accent-deep`, `accent-cta`.
- **Raw theme palettes** per mode:
  - Light (`:root`): bg `#F8FAFC`, surface `#FFFFFF`, primary `#0F172A`, secondary `#475569`, border `rgba(0,0,0,0.08)`, accent `#1D4ED8`, accent-cta `#1D4ED8`, particle `#1D4ED8`.
  - Dark (`.dark`): bg `#09090B`, surface `#2A2A2A`, primary `#F5F5F7`, secondary `#9CA3AF`, accent `#60A5FA`, accent-cta `#2563EB`, particle `#60A5FA`.
  - Red (`[data-theme="red"]`): bg `#1A0505`, accent `#B1181F`, accent-cta `#7F0F15`, plus broad CSS overrides forcing red-tinted text/headings (this block sets `--color-accent` directly, not via `--theme-accent`).
- **Radii/spacing:** no custom radius or spacing tokens; Tailwind defaults used throughout (`rounded-xl/2xl/full`, standard spacing scale).

**Theme implementation:** custom `ThemeProvider` with three values — `light` / `dark` / `red`. Persists to `localStorage('theme')`, defaults from `prefers-color-scheme`, applies `.dark` class / `data-theme="red"` on `<html>`. Transitions use native View Transitions API (`document.startViewTransition` + `flushSync`) in `lib/themeTransition.ts`, with a "to-red / to-revert" ink-spill animation. `index.html` sets `class="dark"` by default and holds a scroll-restore lock until React mounts.

**Inconsistencies noted:**
- Red theme defines `--color-accent*` directly while light/dark define `--theme-accent*` → two parallel mechanisms; red's `--theme-accent*` vars are unset.
- 44 hardcoded hex values remain in `index.css` (mostly in the red-mode block: `#FF5A4A`, `#FF7A66`, `#FF2B2B`, drop-shadow/filter colors, scrollbar, body noise) — intentional per-aesthetic but outside the token system.
- Brand hexes hardcoded inline in data/social components: `#24292F` (GitHub), `#0A66C2` (LinkedIn), `#E4405F` (Instagram), plus brand colors in `BackgroundMusic.tsx`/`RedLightning.tsx`/`RedModeLoader.tsx` (e.g., `#ff3026`, `#ef4444`, `#ff5a4a`).
- `--color-secondary` is declared in both `@theme` and `:root` (harmless duplication).
- `--shadow` token exists but is barely used (components use `shadow-lg`/`shadow-2xl` instead).
- Several components still use arbitrary values like `tracking-[0.2em]`→ now tokenized, but `ease-[cubic-bezier(...)]`, `w-[280px]`, `max-w-[696px]` remain inline-arbitrary.

---

## 4. Animation / interaction status

All JS-driven animation uses **`motion/react`** (Motion for React). No leftover direct `framer-motion` imports; `framer-motion` exists only as a transitive dep of `motion`. CSS-only animation via keyframes in `index.css`. `MotionConfig reducedMotion="user"` is set app-wide; a custom `useReducedMotion` hook guards scroll/mouse effects.

| Component | Animation |
|---|---|
| Navbar | `motion.div layout` — pill compacts/shrinks on scroll (`isPastHero`), glass-pill shine class; `layoutId="nav-pill"` active-link pill slides between items |
| ThemeToggle | sun/moon rotate/translate swap, pulse glow, `whileHover/Tap` scale, View Transition circle wipe |
| BackgroundMusic | spinning icon, pulsing equalizer, red-mode variant |
| Hero | staggered char reveal (spring, per-char delay), `name-glow` keyframe, scroll-down indicator (y loop), magnetic CTAs, tilt-on-mouse portrait (`useMotionValue`+`useSpring`), glitch effect |
| SectionHeading / all sections | `whileInView` fade-up reveals with variants from `lib/motion.ts` (`revealTransition`, `staggerContainer`, `staggerItem`) |
| Cards (Project/Blog/Cert/SkillRing/Timeline) | `whileHover` lift (`y:-4`), stagger-in, hover border-glow + shadow, image zoom on hover |
| ProjectCard image | 3D tilt on mouse move (spring motion values), image `onError` fallback icon |
| About portrait | mouse-tilt, word-by-word paragraph reveal |
| Skills/Projects | category filter re-mount with `AnimatePresence`-style re-stagger (key change) |
| Blog | modal open/close with `AnimatePresence` |
| Footer | BackToTop spring in/out (`AnimatePresence`), social icon hover glow (inline styles) |
| Theme change | View Transition API: ink-spill wipe (`to-dark/light/red/revert`) |
| Red mode extras | `cursed-title-smoke`, `cursed-text-smoke`, `name-red-blink`, lightning bolts (`RedLightning`), blood drops canvas (`RedBloodDrops`), dedicated `RedModeLoader` |
| Page transitions | **None** — plain route swaps with a Suspense spinner (no route-level transition) |

**Known bugs / TODOs:**
- The scroll-restore lock script in `index.html` is elaborate and has commented notes ("Hold the lock until…"); it includes a 6s guard and 5s safety unlock — reviewed as intentional, but fragile if React mount never signals.
- `Contact.tsx`/`ContactUs.tsx`: phone input `pattern="[+]?[0-9\s\-\(\)]{7,20}"` matched the `XXX` search but is valid regex, not a bug.
- `BackgroundMusic.tsx` has `// eslint-disable-next-line react-hooks/exhaustive-deps`.
- `motion@13` pulling in `framer-motion@13` as a runtime dependency — double package weight (see §7).
- BackToTop hover changed from `hover:bg-accent-hover` to `hover:brightness-110` (recent change to preserve white-text contrast).

---

## 5. Content status

All content is real, stored centrally in `src/data/index.ts`. **No lorem ipsum found.**

| Section | Status |
|---|---|
| Hero | Real: name, tagline, role, CV (`/Ganesh_Prasad_Bhandari_CV.pdf`), avatar `/hero.png`, socials (GitHub/LinkedIn/Instagram), stats |
| About | Real 3-paragraph bio + "Frontend Intern at Sweven" eyebrow + portrait |
| Skills | 13 real skills with percentages across Language/Framework/Tool categories |
| Experience | 4 real entries: Sweven Internship (work), BCA VI TravelBuddy (academic), BCA IV Digital Menu (academic), Freelance (work) |
| Projects | **3 real projects:** ① TravelBuddy, ② Digital Menu System, ③ HariyaliBazar. Only HariyaliBazar has a live `link` (`https://hariyali-bazar.vercel.app/`); other two have no link field (cards show no "Live Demo" link). All 3 project images exist in `public/projects/` |
| Certifications | 3 real (Sweven Internship, Advanced React & Next.js, Google UX Design). The "View Certificate" buttons call `e.preventDefault()` (no destination). Hero stat claims "5+ Certifications" but only 3 are listed |
| Blog | 3 real full-length posts (Next.js 15, Framer Motion, Internship journey), dates 2026, read-time metadata. "Read More" opens a modal (same excerpt) |
| FAQ | 7 real Q&As incl. contact links |
| Contact | Real form (EmailJS) + email + location. EmailJS env vars required: `VITE_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY` |

**Issues:** `public/audio/` contains 3 audio files (ambient + red-mode sfx) — `atlasaudio-drone-ambient-518685.mp3`, `background.mp3`, `universfield-horror-impact-hit-567238.mp3`; verify licenses before public distribution. No empty sections. Some stat numbers don't reconcile with list counts (5+ certs vs 3 listed; 3+ projects matches 3).

---

## 6. Accessibility & performance snapshot

**Build** (`npm run build` — `tsc -b && vite build`): ✅ passes, **no warnings/errors**.

| Output | Size | gzip |
|---|---|---|
| `dist/index.html` | 8.05 kB | 2.49 kB |
| `index-*.css` | 71.62 kB | 12.61 kB |
| `index-*.js` (main bundle) | 348.88 kB | 108.12 kB |
| `react-*.js` (vendor chunk) | 129.50 kB | 42.25 kB |
| Lazy route chunks (NotFound…ContactUs) | 1.8–7.4 kB each | — |

Main JS ≈ 457 kB raw combined (108+42 gzip) — moderate; React 19 + Motion + Router + lucide bundled into main chunk.

**Preview:** served HTTP 200, correct `<title>`. Runtime console could not be inspected (no browser available in this environment); the only `console.error` calls are EmailJS failure logging and `ErrorBoundary` catch — both intentional.

**Accessibility observations (not fixed):**
- `<img>` tags all have `alt` (hero/about/project/logo). ✅
- Filter buttons (Projects/Skills) and FAQ accordion rely on visible text as accessible names (fine); FAQ button has `aria-expanded`/`aria-controls`; menu/close/theme/back-to-top have `aria-label`. ✅
- Global `:focus-visible` outline (2px accent) exists — good. Some buttons rely on `outline-none` + custom ring (toggle/music).
- Color contrast: token system was reworked for AA (light accent 6.7:1, dark accent 7.83:1, CTA white-on 5.2–6.7:1). Residual concerns: red-theme `text-secondary #B08F8F` on `#1A0505` ≈ 5.6:1 (ok), but red accents like `#FF7A66` are fine while `#B1181F` text on red bg is 2.8:1 unless the red-theme CSS overrides kick in; footer "Built with…" at `text-secondary/50` is small/low contrast; social icons at `text-secondary/70` inside circles are small graphics (below 3:1 boundary).
- Touch targets: primary buttons are 44px (`h-11`); nav "Hire Me" is `h-8` (32px), theme toggle/music are 32px, mobile menu now 36px — all below the 44px recommendation (though ≥ WCAG 2.2 24px minimum).
- Contact form labels are `<span>`s inside `<label>` (fine), inputs have `autoComplete`; no explicit `aria-describedby`/live region for the submit status message.
- Body text `text-justify` on blog excerpts can cause large gaps on narrow widths.
- Lazy-loaded images use `loading="lazy"` on project images; hero/portrait are eager.

---

## 7. Open items

**Unfinished / flagged in code:**
- **Scroll-restore lock** in `index.html` — large commented rationale; contains "Safety: never leave the page locked…" fallbacks. Candidate for simplification/removal.
- **Certification "View Certificate"** buttons are inert (`e.preventDefault()`).
- **Projects without links** (TravelBuddy, Digital Menu) — no live demo URL yet.
- **Env-dependent email**: EmailJS vars must be present for both contact forms; otherwise silent-ish failure (logged to console).
- **Hero stat "5+ Certifications"** vs 3 listed — data mismatch.
- No page-level route transitions; route changes are hard swaps behind a spinner.
- Red-mode bundle weight: `RedBloodDrops`, `RedLightning`, `RedModeLoader`, `RedModeMusic` are always included in the codebase (only the loader is lazy).

**Dependencies:**
- `motion@13` declares `framer-motion@^13.1.0` as a dependency — both installed (~same codebase, but a nominal duplicate package worth watching; app imports only `motion/react`).
- Several `extraneous` packages in `node_modules` (`@emnapi/*`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`) — npm optional/wasm transitive artifacts, not an issue but `npm prune` will report them.
- Installed versions drift slightly from ranges (e.g., React 19.2.8 vs ^19.2.7, oxlint 1.76 vs ^1.71) — normal semver resolution.
- `react-helmet-async@^3.0.0` is unmaintained/deprecated upstream; works fine here but worth a migration note (e.g., to native React 19 metadata or `@zubridge/head`).

---

*Report generated by inspection only — no code changes made.*
