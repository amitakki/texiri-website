# Launch checklist

Work through this list before pointing www.texiri.com at the new site. Tick each item as it's done.

## 1. Content and legal
- [ ] Every row in [content-decisions.md](content-decisions.md) is `Done` or `Dropped`.
- [ ] `npm run placeholders -- --strict` passes (no `TO VERIFY`, `TO CONFIRM`, `[X]` or `<Placeholder>` left in the code).
- [ ] A lawyer has reviewed the Privacy Policy, Cookie Policy and Terms, and the "Draft" badges are removed.
- [ ] The grievance officer and retention periods are filled in on the Privacy Policy.

## 2. Email (Resend)
- [ ] Create a Resend account and add the domain `texiri.com`.
- [ ] Add the SPF, DKIM and (recommended) DMARC DNS records Resend gives you, and wait for the domain to show **Verified**.
- [ ] Create an API key with "sending" access only.
- [ ] Decide which inboxes receive each form (see `LEAD_NOTIFY_TO`, `COMMUNITY_NOTIFY_TO`, `CAREERS_NOTIFY_TO` below).

## 3. Google Sheet log
- [ ] Create a Google Sheet owned by a company Google account (not a personal one).
- [ ] Add the script from [google-sheet-webhook.gs](google-sheet-webhook.gs) and deploy it as a web app, following the steps at the top of that file.
- [ ] Share the sheet only with the people who handle leads, applications and community members.

## 4. Spam protection
- [ ] Create a Cloudflare Turnstile widget. Add the production hostname (`www.texiri.com`) and the Vercel preview hostname.
- [ ] Optional but recommended: create an Upstash Redis database for rate limiting (5 submissions per 10 minutes per visitor).

## 5. Vercel environment variables
Set these in **Project → Settings → Environment Variables**. "Prod only" means set it for the Production environment only.

| Variable | Value | Scope |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.texiri.com` | All |
| `NEXT_PUBLIC_SITE_ENV` | `production` | **Prod only.** Leaving it unset on previews keeps them out of search engines. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key | All |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key | All |
| `RESEND_API_KEY` | Resend API key | All |
| `LEAD_FROM` | `Texiri Solutions <website@texiri.com>` | All |
| `LEAD_NOTIFY_TO` | Inbox for business enquiries (default `info@texiri.com`) | All |
| `COMMUNITY_NOTIFY_TO` | Inbox for community sign-ups | All |
| `CAREERS_NOTIFY_TO` | Inbox for Shambhavi 108 applications | All |
| `SHEETS_WEBHOOK_URL` | Apps Script web-app URL | All |
| `SHEETS_WEBHOOK_SECRET` | The same secret set in the Apps Script | All |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash credentials (optional) | All |

## 6. Test on the preview deployment
- [ ] Submit each form (enquiry on `/contact/`, demo on `/2klicks/create/`, community join, Shambhavi 108). For each one, check that:
  - the notification email arrives in the right inbox;
  - the acknowledgement email reaches the person who submitted;
  - a row appears in the right tab of the Google Sheet.
- [ ] Open `/contact/` by clicking through from another page, and check that the Turnstile widget still appears.
- [ ] Check that `/robots.txt` on the preview says `Disallow: /`.

## 7. Domain cutover
- [ ] Add `www.texiri.com` and `texiri.com` to the Vercel project. Set `texiri.com` to redirect to `www.texiri.com` (permanent).
- [ ] Lower the DNS TTL a day ahead, then switch the DNS records to Vercel.
- [ ] Check that HTTPS works on both hostnames.
- [ ] Test every old URL redirects to its new page:
  `/services/`, `/services/single-service/`, `/services/managed-services/`, `/services/data-migration/`, `/mobility-solutions/`, `/2klicks-create/`, `/about/2klicks-update/`, `/texiri-ai-community/`, `/shambhavi-108/`, `/services/careers/`, `/about/team/`, `/about/contact/`, `/home/footer/`.
- [ ] Check that `/robots.txt` on production allows crawling and lists the sitemap.

## 8. Search engines
- [ ] Verify `www.texiri.com` in Google Search Console and Bing Webmaster Tools.
- [ ] Submit `https://www.texiri.com/sitemap.xml`.
- [ ] Use the URL Inspection tool on the homepage and request indexing.
- [ ] Check the homepage with Google's Rich Results Test (Organization and Breadcrumb data).

## 9. Old WordPress site (security)
The old homepage currently contains **11 hidden casino spam links** (`mpwhi.com`, "1win casino"), placed off-screen so visitors can't see them. That means the WordPress site has been hacked. Search engines can penalise this, so deal with it now, even before launch.
- [ ] Remove the injected links (check the homepage content, theme files, widgets and the database).
- [ ] Update WordPress core, the theme and every plugin. Delete unused plugins and themes.
- [ ] Change every WordPress admin password, the hosting/FTP passwords and the database password.
- [ ] Run a malware scan (for example Wordfence or Sucuri), and check for unknown admin users.
- [ ] After cutover, take the old site offline, or keep it only at a private address. Don't leave it publicly reachable.
- [ ] In Google Search Console, check **Security issues** and **Manual actions** after the cleanup.

## 10. After launch
- [ ] Watch the inboxes and the Google Sheet for the first week to make sure nothing is missed.
- [ ] Check Search Console's coverage report after one to two weeks.
- [ ] Plan steps 7–10 from the README: CRM, CMS, consent banner and analytics.
