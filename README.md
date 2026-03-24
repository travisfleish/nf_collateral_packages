# Marketing app starter

Minimal Vite + React + TypeScript shell for single-page marketing sites. It **consumes** [`@genius-sports/gs-marketing-ui`](../packages/gs-marketing-ui) for design tokens, global styles, Tailwind preset, and UI primitives. This repo folder only owns **wiring, routes, composition helpers, and placeholder content**.

## Purpose

- Ship new campaign or product landing pages quickly with a consistent layout and design system.
- Avoid copying tokens, Tailwind config, or primitives into each app.
- Keep apps “boring”: compose shared components, swap copy in `content/`, add pages under `pages/`.

## Setup

From the **monorepo root** (recommended):

```bash
npm install
npm run dev --workspace=marketing-app-starter
```

Build:

```bash
npm run build --workspace=marketing-app-starter
```

Preview production build:

```bash
npm run preview --workspace=marketing-app-starter
```

### Standalone clone (outside this monorepo)

1. Copy the `marketing-app-starter` folder into its own repository.
2. In `package.json`, replace `"@genius-sports/gs-marketing-ui": "file:../packages/gs-marketing-ui"` with a **published** version (e.g. `"^0.1.0"`) or adjust the `file:` path if you keep the package next to the starter in your own layout.
3. Ensure `tailwind.config.ts` **`content`** globs include the installed package so Tailwind sees class names used inside the dependency, for example:

   `./node_modules/@genius-sports/gs-marketing-ui/src/**/*.{ts,tsx}`

   (This starter also lists `../packages/gs-marketing-ui/src/**/*` for workspace development.)

4. Run `npm install`, then `npm run dev` / `npm run build` from the starter root.

## Project structure

| Path | Responsibility |
|------|----------------|
| `src/main.tsx` | App bootstrap; imports local `styles/index.css` (single CSS entry for Vite + PostCSS). |
| `src/styles/index.css` | `@import`s the package stylesheet **before** `@tailwind` so Tailwind can process `@layer` rules from the design system (importing package CSS only from `main.tsx` would run two separate PostCSS pipelines and break that ordering). |
| `src/app/App.tsx` | `MarketingPageLayout`, header, footer, routes. |
| `src/app/routes.tsx` | Route table. |
| `src/app/providers.tsx` | `BrowserRouter` (and room for future providers). |
| `src/app/seo.ts` | Lightweight `document.title` / meta description updates. |
| `src/components/common/` | Reusable section helpers: `PageHero`, `SectionIntro`. |
| `src/components/navigation/` | `SiteHeader`, `SiteFooter` shells driven by `content/site.ts`. |
| `src/content/site.ts` | Placeholder site metadata, nav, footer, and home copy. |
| `src/pages/` | Example pages (`HomePage`, `NotFoundPage`). |
| `src/styles/index.css` | Tailwind layers only; no duplicate token CSS. |
| `tailwind.config.ts` | Uses the shared preset; `content` points at this app + the UI package sources. |

## Building a new campaign page

1. Add `src/pages/YourCampaignPage.tsx` and compose shared primitives (`SectionShell`, `Heading`, `Text`, `Button`, `Card`, etc.) plus local helpers from `components/common/` as needed.
2. Register a route in `src/app/routes.tsx`.
3. Put page-specific copy in `src/content/` (e.g. `content/yourCampaign.ts`) and import it from the page.
4. Call `setPageMeta()` in a `useEffect` (or equivalent) for title/description.

Prefer **new content modules** and **small compositions** over forking styles from the shared package.

## Shared package vs this starter

| Belongs in `@genius-sports/gs-marketing-ui` | Belongs in this starter |
|---------------------------------------------|-------------------------|
| Design tokens, CSS variables, fonts | App entry, Vite config, routes |
| Tailwind preset | Tailwind `content` paths for this app + scanning package files |
| Reusable primitives (`Button`, `Card`, `SectionShell`, typography, etc.) | `SiteHeader` / `SiteFooter` / `PageHero`-style **composition** |
| Shared `MarketingPageLayout` | SEO helpers, `content/site.ts`, campaign-specific pages |

Do **not** duplicate button/card/modal styling or token definitions here; import from the package instead.

## Notes

- **`framer-motion`** is listed as a dependency because the UI package declares it as a peer dependency (used by components such as `Modal` and `Accordion` if you import them later).
- The package `Button` renders a `<button>`. For anchor-style CTAs, use action **slots** on `PageHero`, plain links in the header/footer content model, or add a link-capable primitive to the shared package in a follow-up.
