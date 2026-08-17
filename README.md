# digigym-fit

Static site for DigiGym, published via GitHub Pages to [digigym.fit](https://digigym.fit).

Pages:
- `index.html` — landing page (for members, for gyms, FAQ)
- `privacy-policy.html` — required Privacy Policy URL for Play Console
- `terms-of-service.html`
- `delete-account.html` — account/data deletion instructions (required by Play Console's Data Safety form for apps with account creation)
- `404.html` — served by GitHub Pages for unknown paths

No build step — plain static HTML/CSS, served as-is by GitHub Pages.

## Design

`assets/style.css` carries the same Material Design 3 palette the app ships in
`digigym-app/theme/palette.ts`, seeded from the brand blue `#2196F3`. The site
and the app are meant to look like one product, so a change to one palette
belongs in both.

Light/dark follows the OS by default; the header toggle writes a manual choice
to `localStorage` under `digigym-theme`, and an inline script in each `<head>`
applies it before first paint so a dark-mode visitor never sees a white flash.

## SEO

Each page carries a canonical URL, a description, Open Graph and Twitter card
tags, and JSON-LD. `index.html` holds the `Organization` / `WebSite` /
`MobileApplication` graph plus an `FAQPage` matching the on-page FAQ — the
answers are in the markup inside `<details>`, collapsed for the reader but
present for a crawler.

Sitewide: `robots.txt`, `sitemap.xml`, `site.webmanifest`.

When a page is added or its copy meaningfully changes, update `sitemap.xml`
(`<loc>` and `<lastmod>`), and keep the `dateModified` in a legal page's JSON-LD
in step with the "Last updated" line the page shows.

## Icons

`assets/images/` holds the favicon set, all generated from the app's
`logo-mark-white.png` on the brand blue:

| File | Used for |
|---|---|
| `favicon.ico` (repo root) | `/favicon.ico`, the address a browser asks for unprompted |
| `favicon-16/32/48/192/512.png` | tab icons and the web manifest |
| `apple-touch-icon.png` | iOS home screen — flat square, iOS applies its own corner mask |
| `icon-512-maskable.png` | Android maskable icon, mark kept inside the safe zone |
| `og-image.png` | 1200×630 link preview for Open Graph and Twitter |
| `logo.png` | the transparent mark used in the page header |

## Deploying

GitHub Pages, from the default branch root. Settings → Pages → *Deploy from a
branch* → `main` / `/ (root)`.

`CNAME` holds the custom domain and `.nojekyll` stops Pages from running the
content through Jekyll. The domain's DNS needs `A`/`AAAA` records for the apex
pointing at GitHub Pages, and a `CNAME` for `www` pointing at
`digigym-fit.github.io`.
