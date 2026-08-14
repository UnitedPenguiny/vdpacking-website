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
- Branch and pull-request previews are expected to use separate temporary `*.pages.dev` URLs.
- The production domain `vdpacking.net` is intentionally not connected yet, and no DNS or email/MX records should be changed for this project setup.

Google Search Console setup and sitemap submission are intentionally deferred. The `vdgroups.com` redirect/migration is also intentionally deferred until the production-domain cutover is approved. Preserve the open business questions in `MIGRATION_INVENTORY.md` when making future changes.
