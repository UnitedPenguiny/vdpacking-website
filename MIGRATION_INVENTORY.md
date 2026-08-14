# VD Packing migration inventory — v2

Source site: `https://www.vdgroups.com/`  
New primary domain: `https://vdpacking.net/`

## Migration status

The v2 rebuild keeps the static, framework-free architecture from v1 and refreshes the shared visual system, navigation, page hierarchy, mobile conversion flow, accessibility attributes, and metadata. The original local reference imagery remains available where it helps explain a product or material.

| Existing topic | New URL | v2 status |
|---|---|---|
| Home | `/` | Rebuilt with clearer manufacturing-first hero, service overview, process, materials, and LINE CTA |
| กล่องไปรษณีย์พิมพ์ | `/postal-printed.html` | Rebuilt with sample-product photography derived from the provided postal asset; obsolete MOQ/price/lead-time text is not published |
| กล่องพิมพ์และไม่พิมพ์ทุกขนาด | `/custom-boxes.html` | Rebuilt with dimension guide, quote checklist, and MOQ caveat |
| กล่องด่วน 1 วันได้ | `/express.html` | Rebuilt; turnaround claims remain unconfirmed and are not published as guarantees |
| กล่องไดคัท | `/die-cut.html` | Rebuilt with die-cut explanation and MOQ caveat |
| วิธีการสั่งซื้อ | `/how-to-order.html` | Rebuilt as a four-step quote/order flow |
| ติดต่อเรา | `/contact.html` | Rebuilt with phone, fax, email, address, hours, and LINE conversion CTA |
| ตัวอย่างกระดาษ | `/materials.html` | Rebuilt with 3/5-ply explanation and preserved KW/KI/KL/KT/KA samples |

## Business details carried over from the migration source

- Company: VD PACKING LTD.
- Address: 319 ซ.สุขสวัสดิ์ 30 ถ.สุขสวัสดิ์ แขวงบางปะกอก เขตราษฎร์บูรณะ กรุงเทพฯ 10140
- Tel: 02-871-0393-4
- Fax: 02-871-0955
- Email: vdpacking@gmail.com
- LINE: @vdbox
- Hours: Monday–Saturday 08:00–17:00; closed public holidays
- Existing site states more than 30 years of experience
- Existing material information includes 3-layer / 5-layer structures, B/C/BC flutes, and paper examples KW/KI/KL/KT/KA

## Conflicting source claims intentionally not published as current facts

1. **Express production time:** the old navigation says “1 day”, while an old graphic says “within 3 hours”. The express page asks the owner to confirm current policy.
2. **Die-cut MOQ:** old pages differ between approximately 200 pieces and a 50–800 range depending on size. No hard MOQ is published.
3. **General box MOQ:** old pages differ between 800/400/200 by size and 1,000 on the postal-print graphic. No hard MOQ is published.
4. **Old price graphics:** original source files are preserved in the project, but the public pages use only photo-only crops that exclude obsolete prices, MOQ and turnaround claims.
5. **Paper sample M:** the source referenced an M image, but it was not reliably available in the provided project. v2 retains the available KW/KI/KL/KT/KA images.

## Preserved local assets

- Original owner-selected product photos remain under `assets/Front Page Pics/`.
- The real VD PACKING logo sources remain under `assets/Logo/`.
- Category imagery remains under `assets/เลือกประเภทกล่องให้ตรงกับงาน/`.
- Paper/material references remain under `assets/กระดาษและลอน/`.
- Die-cut references remain under `assets/กล่องไดคัท/`.
- Postal-print and express source sheets remain under their titled folders; the public site does not display the obsolete claim/price-table regions.
- Web-optimized derivatives used by the public pages are under `assets/site/`.

## Before DNS cutover

- Confirm the current express turnaround and any service eligibility rules.
- Confirm die-cut and general-box minimum quantities.
- Confirm whether additional factory/process photographs should be added later; the homepage now uses all owner-selected images from `assets/Front Page Pics/`.
- Confirm apex-domain canonical policy versus `www`.
- Deploy to Cloudflare Pages and test the generated Pages URL before attaching `vdpacking.net`.
- If control of `vdgroups.com` remains available, create permanent redirects from the old URLs to matching new pages.

## SEO migration implementation — 2026-08-14

- Added canonical, crawl/index, Open Graph, Twitter Card, favicon, and structured-data metadata across the new site.
- Added a Cloudflare Pages `_redirects` map for the seven legacy Weebly page paths discovered on `vdgroups.com`, plus `/index.html` → `/`.
- **Important:** the `_redirects` file only handles requests that reach the Cloudflare Pages deployment. If `vdgroups.com` remains hosted on Weebly, permanent redirects must also be configured at the old-domain/origin level before or during cutover.
- The current canonical host is the apex domain `https://vdpacking.net/`. Configure `www.vdpacking.net` and the Pages preview hostname to 301-redirect to the apex domain when deployed.
- Submit `https://vdpacking.net/sitemap.xml` in Google Search Console after the production domain is live and verify each important URL with URL Inspection.
