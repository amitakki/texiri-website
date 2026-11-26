# Pending items and photo requests

Status on 26 November 2026. Everything the website still needs before or after launch, and the exact photos to send. Row IDs (H3, IMG2 and so on) match [content-decisions.md](content-decisions.md).

## 1. What is still pending

### Photos (the only open content)

Until these photos arrive, the pages show an illustration with an orange "PLACEHOLDER IMAGE" badge. **9 badges on 4 live pages** (Careers 6, About 1, Contact 1, Shambhavi 108 1).

| # | What we need | Tracker rows | Owner | Where it shows | Live on the site? |
| --- | --- | --- | --- | --- | --- |
| P1 | Team photo at the Vijayapura office | H3, IMG2 | HR | Careers → Life at Texiri (the large first photo) | **Yes, with a badge** |
| P2 | Five photos of office life | H4, IMG12 | HR | Careers → Life at Texiri gallery | **Yes, 5 badges** |
| P3 | Vijayapura office building | IMG3 | Founder | About → Our story; Contact → Offices | **Yes, 2 badges** |
| P4 | Shambhavi 108 learners at work | IMG11 | Programme lead | Shambhavi 108 page | **Yes, with a badge** |
| P5 | Sharper founder portrait | L1 | Founder | About → Leadership; Leadership page | Yes, current photo accepted for launch (no badge, but soft) |
| P6 | Sharper photo of Santosh S Angadi | L5 (marked Done) | Santosh | About → Leadership; Leadership page | Yes; the supplied photo is 430×537, below the size the layout needs (see section 2) |
| P7 | Photos from the first real CSR event, with consent | CSR1, CSR2, IMG13 | HR / founder | `/about/csr/`, About → CSR band | No: the CSR page stays hidden until a real event is added |

**Launch decision still needed for P1–P4:** if a photo isn't ready in time, either wait for it, remove the image for launch and add it later, or replace it with a final illustration.

### Not photos

| Item | Owner | What to do |
| --- | --- | --- |
| Create the `careers@texiri.com` mailbox (H2) | Founder / IT | Must exist before launch, or CVs sent from the Careers page bounce |

### Housekeeping (no input needed)

- **IMG1** (consultants with a client team): not shown anywhere on the site. Can be dropped.
- **X7** (who supplies each photo, and by when): this file covers it, so the row can be closed.
- **IMG11:** the tracker says it also appears on the Community page. It doesn't; it is only on Shambhavi 108.

## 2. Photo specifications

### How to send photos

- **Send the original file** from the camera or phone, in the highest quality setting. Don't send photos through WhatsApp or as screenshots: they come through shrunk and blurry. Use a shared Google Drive folder, email them as attachments, or use AirDrop.
- **Format:** JPEG (HEIC from iPhone is fine; we convert it). Colour profile sRGB, which is the default on phones.
- **File size:** whatever the camera produces, usually 2–10 MB. Up to 25 MB per photo is fine. The website makes small, fast versions automatically, so there is no need to compress anything.
- **Landscape (horizontal)** for everything except the two portraits.
- **Leave space around the subject.** The site crops each photo differently on phones and desktops (shown in the "Crops to" column). Keep faces and the main subject in the middle, away from the edges.
- **Daylight, sharp and natural.** Candid moments beat posed ones. No stock photos, no filters, no text or logos added on top.
- **For each photo, send one line** saying what it shows (for example "Team lunch at Diwali, Vijayapura office, October 2026"). We use it as the caption and as the description for screen-reader users.
- **Consent:** everyone who can be recognised must agree to being on the website. For children, we need written consent from a parent or the school.
- **File names:** short and descriptive, for example `life-diwali-2026.jpg` or `csr-school-kits-1.jpg`.

### Sizes per photo

"Minimum" is the smallest size that still looks sharp on a laptop or phone screen. "Preferred" also looks sharp on large tablets and high-resolution monitors. Any modern phone camera (12 MP, about 4000×3000) meets both.

| # | Photo | Shape (width:height) | Minimum (px) | Preferred (px) | Crops to | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Team at the Vijayapura office | 4:3 landscape | 2000×1500 | 2400×1800 or larger | About 5:4 on desktop (a little cut from the sides) | The largest photo in the gallery. Whole team, with space around the group |
| P2 | Office life ×5: festival celebrations; birthdays and work anniversaries; team outings; learning sessions; the Navi Mumbai office | 4:3 landscape | 1200×900 each | 1600×1200 each | 4:3, no extra crop | Shown as small tiles, two per row on phones, three on desktop |
| P3 | Vijayapura office building or entrance | 4:3 landscape | 1600×1200 | 2400×1800 | 4:3 on About; a wide 2:1 strip on Contact (top and bottom cut off) | Keep the building and signboard in the middle half of the frame, so both crops work. Daylight |
| P4 | Shambhavi 108 learners at work (on laptops, in a session) | 16:10 landscape | 1600×1000 | 2400×1500 | 16:10, no extra crop | A 4:3 photo also works, but a little is cut from the top and bottom |
| P5 | Founder portrait (Muttu Sarashetti) | 4:5 portrait (vertical) | 720×900 | 1200×1500 | 4:5, no extra crop | Head and shoulders, plain or softly blurred background, facing the camera. The current photo is 343×444 |
| P6 | Santosh S Angadi portrait | 4:5 portrait (vertical) | 720×900 | 1200×1500 | 4:5, no extra crop | Same style as the founder's, so the two match side by side. The current photo is 430×537 |
| P7 | CSR event: 2–6 photos per event (the activity, the volunteers with the partner organisation, the result) | 4:3 landscape | 1200×900 each; **the first photo 2000×1500** | 1600×1200 each; the first 2400×1800 | The first photo also appears as a 4:3 cover and as a 16:10 banner on About | Put the best photo first: it is the event's cover. Send the event title, date, place and a two- or three-sentence summary with them |

## 3. For the developer

To swap in a photo, add it under `public/images/` (`life/` and `csr/<event>/` for the galleries), change its `src` in `lib/images.ts` or `lib/gallery.ts`, write the real `alt` and `caption`, and delete `placeholder: true`. The badge disappears with it. Then set the row in [content-decisions.md](content-decisions.md) to Done.

The sizes above are worked out from the layout: an 80rem content column, the column splits on each page and the `sizes` attribute on each `SiteImage`. They're doubled for high-density screens. Next.js resizes and compresses every non-SVG image, so the originals can be committed as supplied, after resizing anything over about 3000 px wide.
