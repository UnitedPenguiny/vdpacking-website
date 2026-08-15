# VD Packing website v2

Framework-free static website for VD PACKING LTD. The repository root is the Cloudflare Pages publish directory; there is no build step.

## Preview locally

From this directory, run:

```powershell
python -m http.server 4173
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/) in a browser.

## Project structure

- `index.html` — homepage
- `custom-boxes.html`, `postal-printed.html`, `die-cut.html`, `express.html` — product/service pages
- `materials.html` — paper and flute information
- `how-to-order.html` — quote/order flow
- `contact.html` — contact details and LINE CTA
- `styles.css` — shared responsive design system
- `script.js` — mobile navigation, active navigation state, and footer year
- `assets/` — preserved source images plus web-optimized public derivatives under `assets/site/`
- `MIGRATION_INVENTORY.md` — source traceability and owner-confirmation questions

## Deployment note

The intended deployment is GitHub → Cloudflare Pages:

- `main` is the approved production branch and must contain reviewed website changes only.
- Create a feature branch for each change, push it, and review the Cloudflare Pages preview before merging it into `main`.
- Cloudflare Pages publishes the repository root as a static site; no npm, framework, or build command is required.
- Cloudflare Pages automatically deploys `main`; feature branches receive separate preview deployments.
- Public production URLs use extensionless paths such as `/custom-boxes`, `/postal-printed`, `/express`, `/die-cut`, `/materials`, `/how-to-order`, and `/contact`.
- The Pages hostname is `https://vdpacking-website.pages.dev`, and the production domain is live at `https://vdpacking.net`.

Google Search Console is configured for `vdpacking.net`. The sitemap has been submitted at `https://vdpacking.net/sitemap.xml`, and the 8 primary production URLs have been individually requested for indexing. SEO URL consistency has been fixed and merged. The historical `vdgroups.com` migration has not been executed and remains deferred. Dedicated LINE Official click tracking is deferred. Preserve the open business questions in `MIGRATION_INVENTORY.md` when making future changes.

## Current Pages project

- GitHub repository: `https://github.com/UnitedPenguiny/vdpacking-website`
- Cloudflare Pages project: `vdpacking-website`
- Pages hostname: `https://vdpacking-website.pages.dev`
- Production domain: `https://vdpacking.net` (live)
- Production branch: `main`
- Feature branch previews: enabled for non-`main` branches
- Cloudflare Web Analytics: enabled
