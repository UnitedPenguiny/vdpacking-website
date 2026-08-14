# REVIEW_NOTES.md

## 2026-08-14 — direct asset integration pass

Implemented directly by ChatGPT from the authoritative `Vdpacking Website` project.

### Changes
- Replaced the temporary VD mark with the real VD PACKING logo derived from `assets/Logo/Untitled-3.jpg`.
- Homepage service cards now use the matching imagery from:
  - `assets/เลือกประเภทกล่องให้ตรงกับงาน/`
  - `assets/กล่องด่วน/` for the Express card.
- Added a homepage `ตัวอย่างผลงานของเรา` gallery using **all 23** owner-selected files in `assets/Front Page Pics/`.
- Added click/tap enlargement with an accessible lightweight lightbox.
- Homepage `กระดาษและลอน` section now uses the provided material sample imagery.
- `materials.html` now uses the supplied paper/material images and no longer references missing `paper-*.jpg` files.
- `die-cut.html` uses all six supplied images from `assets/กล่องไดคัท/`.
- `postal-printed.html` uses the real product-photo strip from its supplied source graphic.
- `express.html` uses the photo-only portion of its supplied source graphic.
- Kept old price/MOQ/turnaround claims out of the public website by excluding the text/table portions of the old postal and express sheets.
- Added optimized web derivatives under `assets/site/`; original source assets remain preserved.

### Verification
- 23 source front-page photos found; 23 gallery items present.
- No missing local HTML/CSS/JS/image references.
- `node --check script.js` passes.
- `git diff --check` passes.
- Browser render tested through an inline Chromium/CDP harness because direct localhost/file URLs are blocked by the execution environment's browser policy.
- Homepage desktop/mobile rendered with no horizontal overflow at 390 px.
- Lightbox open, image load, and Escape close verified.
- Mobile menu accessible label verified (`เปิดเมนู` / `ปิดเมนู`).
- All public internal pages checked for broken images and horizontal overflow at 390 px: none found.
- No JavaScript runtime exceptions observed in the inline browser test.

## 2026-08-14 Homepage showcase + transparent logo pass
- Moved the complete 23-image `Front Page Pics` gallery to the first visual section of the homepage and integrated it as a portfolio-led hero/showcase.
- Kept all 23 samples and the existing lightbox behavior.
- Demoted the former explanatory homepage H1 to H2 so the new portfolio showcase is the single page H1.
- Added a transparent header logo generated from the supplied VD PACKING artwork. Background removal is edge-connected only, so enclosed white regions inside the box mark are preserved.
- Added a transparent light footer logo variant so the mark remains legible on the dark footer without a white rectangle.
- QA: static local references checked (0 missing), 23/23 gallery items present, one homepage H1, no horizontal overflow at 1440/430/390 test widths, lightbox open/Escape close works, and mobile menu accessible label toggles correctly.


## 2026-08-14 — Compact homepage portfolio
- Replaced the full 23-image wall at the top of the homepage with an integrated rotating showcase.
- Desktop shows 5 samples at a time; mobile shows 2.
- All 23 samples remain in rotation and are accessible through “ดูผลงานทั้งหมด 23 รูป”.
- Full gallery opens as an overlay and each sample can still be enlarged in the existing lightbox.
