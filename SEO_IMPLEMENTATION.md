# SEO implementation — 2026-08-14

This pass focuses on technical/on-page foundations without redesigning the site.

## Implemented

- Search-focused unique `<title>` and meta descriptions for all 8 indexable pages.
- Canonical URLs on the apex `https://vdpacking.net` host.
- `robots` directives (`index,follow,max-image-preview:large`); 404 is `noindex,follow`.
- Open Graph + Twitter Card metadata with page-relevant images.
- JSON-LD structured data:
  - homepage: `LocalBusiness`, `WebSite`, `WebPage`
  - service pages: `Service`, `WebPage`, `BreadcrumbList`
  - contact: `LocalBusiness`, `ContactPage`, `BreadcrumbList`
  - informational pages: `WebPage`, `BreadcrumbList`
- Square 192×192 favicon derived from the existing VD Packing box mark.
- Google Fonts moved from CSS `@import` to preconnected document-head stylesheet loading.
- `how-to-order.html` linked from the shared footer so it is no longer orphaned.
- Sitemap updated with all 8 canonical URLs and `2026-08-14` last-modified dates.
- Cloudflare `_redirects` file includes `/index.html` canonicalization and known legacy Weebly path mappings.

## Deployment follow-up

1. Deploy to the final HTTPS `vdpacking.net` domain.
2. Redirect `www` and the Cloudflare Pages preview hostname to the apex domain.
3. Preserve SEO equity from `vdgroups.com` with server/edge-level 301 redirects on the old domain.
4. Verify the property in Google Search Console, submit `/sitemap.xml`, and inspect/request indexing for the homepage and service pages.
5. After indexing begins, use Search Console query data to drive the next content/keyword pass instead of guessing keyword demand.

## Keyword expansion — Pass 2

Homepage broad-intent terms were added naturally without a meta-keywords tag or hidden keyword blocks:

- `ผลิตกล่อง`
- `โรงงานกล่อง`
- `โรงงานผลิตกล่อง`
- `รับผลิตกล่อง`

Changes include the homepage title, meta/social descriptions, LocalBusiness/WebPage structured-data descriptions, and the visible company-history paragraph. The visual H1 `VD PACKING LTD.` was intentionally preserved so the approved design does not change.

## Content + Local SEO — Pass 3

Implemented using only business details already present in the website source:

- Added a homepage content section targeting the natural local/manufacturer intent **โรงงานผลิตกล่องลูกฟูก กรุงเทพฯ** without changing the approved hero/history design.
- Added contextual copy explaining made-to-size, printed, die-cut, postal-printed, paper/flute, and quote-preparation topics with crawlable internal links to the relevant pages.
- Strengthened contextual internal linking across custom boxes, postal printed, die-cut, express, materials, and how-to-order pages.
- Strengthened the contact page's local intent around **สุขสวัสดิ์ / เขตราษฎร์บูรณะ / กรุงเทพฯ** while preserving the same verified address, phone, LINE, email, hours, and map.
- Refined LocalBusiness address structured data to use `addressLocality: เขตราษฎร์บูรณะ` and `addressRegion: กรุงเทพมหานคร`.
- Updated homepage/contact descriptions and structured-data descriptions to reflect the verified Bangkok location.
- No unverified claims were added for delivery coverage, MOQ, lead time, production capacity, certifications, machinery, or customer brands.

### Still pending after deployment

- Verify `vdpacking.net` in Google Search Console.
- Submit `https://vdpacking.net/sitemap.xml`.
- Inspect/request indexing for the homepage and important service pages.
- Validate/complete the old-domain 301 migration from `vdgroups.com`.
- Use real Search Console query/impression data for the next SEO iteration.

