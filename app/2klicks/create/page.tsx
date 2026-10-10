import type { Metadata } from "next";
import Link from "next/link";
import { Button, H2, ImagePlaceholder, Kicker, Placeholder, Section } from "@/components/ui";
import { Breadcrumbs, FAQAccordion, NumberedGrid, StickyMobileCTA } from "@/components/sections";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "2Klicks Create — SAP Data Migration Tool",
  description: "2Klicks Create is a template-based SAP data migration tool. It recognises custom fields and validations, removes 8+ programs per object, and makes migration programs available on day 1. RE-FX, MM, PM, FI/CO, SD.",
  alternates: { canonical: "/2klicks/create/" },
};

const productJsonLd = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "2Klicks Create", applicationCategory: "BusinessApplication",
  description: "Template-based SAP data migration tool supporting RE-FX, MM, PM, FI/CO and SD.",
  publisher: { "@type": "Organization", name: "Texiri Solutions" },
};

const modules = [["RE-FX", "Flexible Real Estate"], ["MM", "Materials Management"], ["PM", "Plant Maintenance"], ["FI/CO", "Finance & Controlling"], ["SD", "Sales & Distribution"]];
const benefits = [
  ["Custom-field aware", "Templates recognise the custom fields and validations in your SAP system, so loads respect your configuration rather than a generic standard."],
  ["No development of 8+ programs", "Skip the spec, mapping, coding, testing and transport cycle for each object. Developers can focus on the work that genuinely needs them."],
  ["Available on day 1", "Migration programs are ready when the project starts, instead of around day 120. More time for mock loads and data quality."],
];
const security = ["SAP releases", "Deployment", "Authorisations", "Data handling", "Audit trail"]; // [TO CONFIRM] values
const faqs = [
  { q: "Which objects does 2Klicks Create support?", a: "Objects across RE-FX, MM, PM, FI/CO and SD. We share the current object list during the demo." },
  { q: "Does it replace S/4HANA Migration Cockpit?", a: "No. It works alongside it. Many projects use Migration Cockpit for some objects and 2Klicks for those where custom fields and validations matter most." },
  { q: "Who fills in the templates?", a: "Usually business and data teams, in Excel. No ABAP knowledge is needed to enter or modify data." },
];

export default function TwoKlicksCreatePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "2Klicks", href: "/2klicks/" }, { label: "2Klicks Create", href: "/2klicks/create/" }]} />
      <section aria-labelledby="hero-h" className="pt-[clamp(2.5rem,6vw,5rem)]">
        <div className="container-content">
          <div className="grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2.5"><span className="bg-navy-900 px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-on-navy">2Klicks by Texiri</span><span className="text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">Create</span></div>
              <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[13ch] text-display">SAP migration programs on day 1.</h1>
            </div>
            <div>
              <p className="m-0 max-w-[50ch] text-lead text-muted">2Klicks Create is a template-based SAP data migration tool. It recognises your custom fields and validations, so your project skips building at least eight programs per object.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#demo" arrow data-track="2klicks_demo_click">Request a demo</Button>
                <Button href="/2klicks/update/" variant="secondary">See 2Klicks Update</Button>
              </div>
            </div>
          </div>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] border-2 border-b-0 border-ink">
            <div className="flex items-center gap-3 border-b-2 border-ink bg-navy-900 px-4 py-2.5 text-[13px] font-bold text-on-navy"><span aria-hidden className="size-2.5 bg-accent" />2Klicks Create</div>
            <ImagePlaceholder label="product UI · template selection → upload → validation log" ratio="aspect-[21/9] min-h-56" />
          </div>
        </div>
      </section>

      <Section labelledBy="wf-h" tone="navy">
        <Kicker onNavy>How it works</Kicker>
        <H2 id="wf-h" className="text-on-navy">Three steps. No new code.</H2>
        <NumberedGrid onNavy items={[
          { title: "Download template", body: "Pick the object. The template is generated from your system, custom fields included." },
          { title: "Enter or modify data", body: "Business and data teams fill it in Excel, using the format they already know." },
          { title: "Upload", body: "2Klicks applies your validations and loads the data into SAP." },
        ]} />
      </Section>

      <Section labelledBy="ben-h">
        <Kicker>Key benefits</Kicker>
        <H2 id="ben-h">Why teams use it</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]">
          {benefits.map(([t, d], i) => (
            <div key={t} className="grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-4 border-t-2 border-ink py-8 last:border-b-2 md:grid-cols-2">
              <div><span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span><h3 className="m-0 mt-1.5 text-[26px]">{t}</h3></div>
              <p className="m-0 text-[17px] text-muted">{d}</p>
            </div>
          ))}
        </div>
        <span className="mb-3 mt-8 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">Supported modules</span>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {modules.map(([m, n]) => <li key={m} className="bg-surface p-4"><div className="text-[22px] font-extrabold">{m}</div><div className="text-sm text-muted">{n}</div></li>)}
        </ul>
      </Section>

      <Section labelledBy="rel-h" ruled>
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3"><Kicker>Technical</Kicker><Placeholder>TO CONFIRM</Placeholder></div>
            <h2 id="rel-h" className="mb-6 mt-0 text-[clamp(1.625rem,3vw,2.25rem)]">Supported releases &amp; security model</h2>
            <table className="w-full border-collapse text-[15px]"><tbody>
              {security.map((k) => <tr key={k} className="border-b border-rule"><th scope="row" className="w-[42%] py-3 pr-2 text-left text-xs uppercase tracking-[0.08em] text-muted">{k}</th><td className="py-3"><Placeholder>TO CONFIRM</Placeholder></td></tr>)}
            </tbody></table>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-3"><Kicker>ROI example</Kicker><Placeholder /></div>
            <h2 className="mb-6 mt-0 text-[clamp(1.625rem,3vw,2.25rem)]">What 40 objects look like</h2>
            <dl className="m-0 bg-navy-900 text-on-navy">
              {[["Migration objects in scope (example)", "40"], ["Programs avoided (40 × 8)", "320"], ["Effort per program", "[X] person-days"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-on-navy/20 p-4"><dt>{k}</dt><dd className="m-0 font-extrabold">{v}</dd></div>
              ))}
              <div className="flex justify-between gap-3 bg-accent p-4 font-extrabold text-navy-900"><dt>Estimated effort avoided</dt><dd className="m-0">[X] person-days</dd></div>
            </dl>
            <p className="mt-3 text-[13px] text-muted">Illustrative only. We model your own object list during the demo.</p>
          </div>
        </div>
      </Section>

      <Section id="demo" labelledBy="demo-h" tone="surface" ruled>
        <div className="grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[2fr_3fr]">
          <div>
            <Kicker>Request a demo</Kicker>
            <H2 id="demo-h" className="max-w-[14ch]">See 2Klicks on your own objects</H2>
            <p className="mt-6 max-w-[42ch] text-[17px] text-muted">A 45-minute session with a 2Klicks specialist. Bring your object list and we&apos;ll walk through a load end to end.</p>
          </div>
          <div className="border-t-4 border-accent bg-ground p-[clamp(1.25rem,3vw,2.5rem)]"><EnquiryForm defaultType="2Klicks demo" headingId="demo-h" /></div>
        </div>
      </Section>

      <FAQAccordion id="faq-h" title="About 2Klicks Create" faqs={faqs} />
      <section aria-label="Related" className="surface-dark bg-navy-900 text-on-navy">
        <div className="container-content grid md:grid-cols-2">
          <Link href="/2klicks/update/" className="flex flex-col gap-2 py-8 pr-8 text-on-navy no-underline hover:text-accent"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">Same workflow, existing data</span><h2 className="m-0 text-[26px] text-inherit">2Klicks Update →</h2></Link>
          <Link href="/sap/data-migration/" className="flex flex-col gap-2 border-on-navy/20 py-8 text-on-navy no-underline hover:text-accent md:border-l md:pl-8"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">The service around it</span><h2 className="m-0 text-[26px] text-inherit">S/4HANA Data Migration &amp; MDG →</h2></Link>
        </div>
      </section>
      <StickyMobileCTA label="Request a 2Klicks demo" href="#demo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}
