# Visual asset brief

The site uses on-brand placeholder illustrations (marked "PLACEHOLDER IMAGE") where a real photo or screenshot is still missing. This brief says what each one should be, so it can be passed straight to a photographer, the product team or marketing. IDs match [content-decisions.md](content-decisions.md) section 9.

**General rules**
- Real people and real client screens only. Nothing staged to look like a client, and no stock photos of "business people".
- Photos of people need written consent from everyone recognisable (and a parent or guardian for under-18s).
- Client names, logos and data must be blurred or removed from screenshots unless the client approved them.
- Supply the original file (JPEG or PNG, sRGB), at least the minimum size below. We resize and compress.
- Landscape unless stated. Leave some empty space at the edges: the image is cropped differently on phones and desktops.
- Add a one-line description of what the picture shows; it becomes the image's alt text for screen-reader users.

| ID | Subject | Ratio · minimum size | Appears on | Supplier | Consent / approval |
| --- | --- | --- | --- | --- | --- |
| IMG1 | Texiri SAP consultants working with a client team (workshop, whiteboard or screen review). Optional now: the SAP pages use a lifecycle diagram instead. | 4:3 · 1600×1200 | SAP Services, SAP sub-pages | Marketing | Everyone shown; client approval if the client is identifiable |
| IMG2 | The Texiri team at the Vijayapura office | 4:3 · 1600×1200 | Careers → Life at Texiri | HR | Everyone shown |
| IMG3 | The Vijayapura office building or entrance, daylight | 4:3 · 1600×1200 | About → Our story | Founder | None |
| IMG4 | A real migration diagram (redacted) or project photo | 16:9 · 1920×1080 | Data Migration, case studies | Delivery lead | Client approval |
| IMG5 | **Real 2Klicks Create screenshots**: template screen, upload, validation log. Light theme, browser chrome removed, sample data only. | 16:10 · 2400×1500 | Home 2Klicks band, 2Klicks Create hero | 2Klicks product lead | No real client data |
| IMG6 | An AI readiness workshop in progress | 4:3 · 1600×1200 | AI Services, AI sub-pages | AI practice lead | Everyone shown |
| IMG7 | A TEXIRI AI Community workshop, wide shot | 4:3 · 1600×1200 | Community hero, events | Community lead | Everyone shown |
| IMG8 | A community member presenting their project | 4:3 · 1600×1200 | Community hero, Join, learning paths | Community lead | The presenter and anyone in frame |
| IMG9 | Three member project screenshots (one per project) | 16:10 · 1600×1000 each | Community → Built by members | Community lead | Member name and consent per project |
| IMG10 | Article cover images for the three launch articles (illustration or photo, no text in the image) | 16:9 · 1600×900 | Home, Insights | Marketing | None |
| IMG11 | Shambhavi 108 learners at work | 4:3 · 1600×1200 | Shambhavi 108 | Programme lead | Everyone shown |

**About the current placeholders.** Each illustration is drawn to explain its topic (for example the roadmap workshop, the data-cleansing flow, the 2Klicks screen), so reviewers can see what the real image should convey. They are regenerated from `scripts/generate-placeholder-images.mjs` (helpers in `scripts/illustration-kit.mjs`). Every one keeps its "PLACEHOLDER IMAGE" badge until `placeholder: true` is removed in `lib/images.ts`.

**How to swap one in** (developer): put the file under `public/images/`, change its `src` in `lib/images.ts`, and delete `placeholder: true`. The badge disappears with it.

**Also wanted, not an image**
- A high-resolution founder portrait (tracker L1). The current one is 343×444 px; aim for at least 1200×1500.
- Client logos, only where the client has agreed in writing (tracker P6, X5).
