import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Kicker } from "@/components/ui";
import { Breadcrumbs, NumberedGrid } from "@/components/sections";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ENQUIRY_TYPES } from "@/lib/enquiry";
import { DEMO_HREF, contact, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: Talk to an SAP or AI Expert",
  description: "Contact Texiri Solutions about SAP consulting, S/4HANA data migration, SAP integration, managed services, 2Klicks demos or AI Services. A senior consultant replies within one business day.",
  alternates: { canonical: "/contact/" },
};

const TYPE_PARAM: Record<string, (typeof ENQUIRY_TYPES)[number]> = { ai: "AI Services", "2klicks": "2Klicks demo", migration: "S/4HANA data migration", partner: "Partnership" };
const others = [["Jobs and Shambhavi 108", "/careers/"], ["Join the TEXIRI AI Community", "/ai-community/join/"], ["Book a 2Klicks demo", DEMO_HREF]];
const next = [
  { title: "A senior reply", body: "Within one business day, the right practice lead reads your note and emails you directly." },
  { title: "A scoping call", body: "30 minutes on your landscape, timeline and constraints. An NDA first if you need one." },
  { title: "A clear proposal", body: "Scope, team and approach in writing, or an honest referral if we're not the fit." },
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const defaultType = (type && TYPE_PARAM[type]) || "SAP implementation / consulting";
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,6vw,5rem)]">
        <div className="container-content">
          <Kicker>Contact</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[14ch] text-display">Tell us what you&apos;re working on.</h1>
          <p className="mt-6 max-w-[52ch] text-lead text-muted">A senior consultant reads every enquiry and replies within one business day. No sales sequence, no call centre.</p>
        </div>
      </section>
      <section aria-label="Enquiry form and contact details" className="border-t-2 border-ink">
        <div className="container-content grid gap-x-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div className="py-[clamp(2rem,4vw,3.5rem)]">
            <h2 id="form-h" className="mb-6 mt-0 text-[clamp(1.5rem,2.6vw,2rem)]">Send an enquiry</h2>
            {/* Routing by enquiry type happens in app/actions/enquiry.ts once the CRM is chosen */}
            <EnquiryForm defaultType={defaultType} headingId="form-h" />
          </div>
          <aside aria-label="Contact details" className="flex flex-col gap-8 py-[clamp(2rem,4vw,3.5rem)]">
            <div className="surface-dark flex flex-col gap-3 border-t-4 border-accent bg-navy-900 p-6 text-on-navy">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Direct</span>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-2.5 text-[22px] font-extrabold text-on-navy no-underline hover:text-accent"><Phone aria-hidden className="size-5" />{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-2.5 text-[22px] font-extrabold text-on-navy no-underline hover:text-accent"><Mail aria-hidden className="size-5" />{contact.email}</a>
              <span className="text-[15px] text-on-navy-muted">{contact.hours}</span>
            </div>
            <div>
              <h2 className="mb-3 mt-0 text-kicker font-semibold uppercase tracking-[0.1em] text-muted">Offices</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {offices.map((o) => (
                  <address key={o.name} className="border-t-2 border-ink pt-3 not-italic">
                    <strong className="text-lg">{o.name}</strong>
                    <div className="mt-1 text-[15px] text-muted">{o.street.map((line) => <div key={line}>{line}</div>)}{o.locality}, {o.region} {o.postalCode}<div>India</div></div>
                  </address>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-3 mt-0 text-kicker font-semibold uppercase tracking-[0.1em] text-muted">Not a project enquiry?</h2>
              <ul className="m-0 list-none border-t-2 border-ink p-0">
                {others.map(([l, h]) => <li key={h} className="border-b border-hairline"><Link href={h} className="flex min-h-14 items-center justify-between gap-4 font-bold no-underline">{l}<span aria-hidden>→</span></Link></li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section aria-labelledby="next-h" className="border-t-2 border-rule bg-surface py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-content"><h2 id="next-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)]">What happens after you send it</h2><NumberedGrid items={next} cols={3} /></div>
      </section>
    </>
  );
}
