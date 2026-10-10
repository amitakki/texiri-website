import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalTable, type LegalSection } from "@/components/LegalPage";
import { Placeholder } from "@/components/ui";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and similar technologies texiri.com uses. Today: only what's strictly needed for spam protection and saved form drafts. No analytics or advertising cookies.",
  alternates: { canonical: "/legal/cookies/" },
};

// DRAFT for lawyer review (content decision G4). Update when analytics and the consent banner arrive (README step 10).
const sections: LegalSection[] = [
  {
    id: "what", title: "What cookies are",
    body: <p>Cookies are small files a website stores in your browser. Similar technologies, such as your browser&apos;s local storage, work in much the same way. Some are strictly necessary for a site to work; others, such as analytics or advertising cookies, are optional and need your consent.</p>,
  },
  {
    id: "use", title: "What we use today",
    body: (
      <>
        <p>texiri.com currently uses <strong>no analytics, advertising or social-media tracking cookies</strong>. We only use what is strictly necessary:</p>
        <LegalTable
          head={["Name", "Provided by", "Purpose", "Kept for"]}
          rows={[
            ["Cloudflare Turnstile (cookies and local storage set when a form loads)", "Cloudflare", "Tells people and bots apart so our forms aren't flooded with spam. Only loaded on pages with a form.", "Session, or as set by Cloudflare"],
            ["texiri-s108-draft (local storage)", "texiri.com", "Saves your Shambhavi 108 answers on your device so you can finish later. Never sent to us until you submit.", "Until you submit, clear it, or 30 days"],
          ]}
        />
        <p>Because these are strictly necessary, we don&apos;t ask for consent before using them.</p>
      </>
    ),
  },
  {
    id: "future", title: "Analytics in the future",
    body: <p>We may add website analytics to understand which pages are useful. If we do, we will ask for your consent with a cookie banner before setting any analytics cookies, and list them here. <Placeholder>UPDATE WHEN ANALYTICS IS ADDED</Placeholder></p>,
  },
  {
    id: "control", title: "How to control cookies",
    body: <p>You can block or delete cookies and local storage in your browser&apos;s settings. If you block Cloudflare Turnstile, our forms may not be able to verify your submission; you can always email us at <a href={`mailto:${contact.email}`}>{contact.email}</a> instead.</p>,
  },
  {
    id: "more", title: "More information",
    body: <p>For how we handle the personal data you send us, see our <Link href="/legal/privacy/">Privacy Policy</Link>. Questions about this policy: <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>,
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      href="/legal/cookies/"
      updated="10 October 2026"
      intro={<p className="m-0">Which cookies and similar technologies texiri.com uses, and how to control them.</p>}
      sections={sections}
    />
  );
}
