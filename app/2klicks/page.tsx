import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button, H2, Kicker, Placeholder, Section } from "@/components/ui";
import { Breadcrumbs, FAQAccordion, NumberedGrid } from "@/components/sections";
import { KlicksTimeline, klicksSteps } from "@/components/visuals";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "2Klicks — SAP RE-FX Mass Data Management",
  description: "2Klicks creates, updates and migrates SAP RE-FX master and transaction data from one Excel template, with no programs to develop. Runs inside SAP ECC and S/4HANA. RE-FX, FI/CO and PS.",
  alternates: { canonical: "/2klicks/" },
};

const productJsonLd = {
  "@context": "https://schema.org", "@type": "SoftwareApplication",
  name: "2Klicks", applicationCategory: "BusinessApplication",
  description: "Mass data management for SAP RE-FX on SAP ECC and S/4HANA: create, update and migrate master and transaction data from one template. Supports RE-FX, FI/CO and PS.",
  publisher: { "@type": "Organization", name: "Texiri Solutions" },
};

const stats = [["10×", "Faster"], ["75%", "Lower cost"], ["0", "Programs to develop"]];
const uses = ["Data migration", "Mass creation", "Mass updates & corrections"];
const objects = ["Business Entity", "Building", "Property", "Contract", "Contract Offer", "Rental Object"];
const features = [
  ["Mass creation by copy", "Duplicate RE-FX objects at scale from an existing one."],
  ["Cross-company-code transfer", "Move RE-FX data from one company code to another."],
  ["Memo and text fields", "Bulk update every memo and text field across RE-FX objects."],
  ["Business partners and roles", "Create business partners and assign their roles in bulk."],
  ["Mass activation and deactivation", "Activate or deactivate objects in bulk."],
  ["Conditions with their values", "Download conditions together with their data, change them and load them back."],
  ["Custom fields", "Custom Z-fields are handled alongside the standard fields."],
  ["Dynamic templates", "Templates adapt to the objects and fields you pick, instead of a fixed layout."],
];
const modules = [["RE-FX", "Flexible Real Estate (core)"], ["FI/CO", "Finance & Controlling"], ["PS", "Project System"]];
// From the gap-analysis slide, without the client name.
const comparison: [string, string, string, boolean][] = [
  ["Mass creation & change", "A separate program for each object", "One template across every RE-FX object", true],
  ["Mass activation / deactivation", "Not available", "Activate or deactivate in bulk", false],
  ["Condition download with data", "Not available", "Conditions exported with their values", false],
  ["Memo & text fields", "Not available", "All memo and text fields, in bulk", false],
  ["Custom fields", "Not supported", "Z-fields alongside standard fields", false],
  ["Cross-company-code transfer", "Not available", "Move RE-FX data between company codes", false],
  ["Templates", "Static, fixed layout", "Dynamic, adapting to the objects and fields you pick", true],
];
const industries = ["Property management", "Retail", "Public sector", "Life sciences", "Manufacturing", "Wineries"];
// Content decisions K1–K5. Deployment and authorisations are deliberately not described.
const technical: [string, string][] = [
  ["Supported releases", "SAP ECC 6.0 and every SAP S/4HANA edition: on-premise, private cloud and public cloud"],
  ["Data handling", "Data stays in your SAP system and the Excel files your users download. Nothing is sent to Texiri or any third party."],
  ["Audit trail", "Changes are recorded in standard SAP change documents."],
];
const faqs = [
  { q: "Which objects does 2Klicks support?", a: "In RE-FX: business entities, buildings, properties, contracts, contract offers and rental objects, plus business partners and their roles. It also covers FI/CO and PS. We share the full object list during the demo." },
  { q: "Can it change data that is already in SAP?", a: "Yes. The same download, update and upload workflow handles new records, mass changes after reorganisations and data corrections." },
  { q: "Do we need ABAP development?", a: "No. There are no functional or technical specs and no development. Business and data teams work from templates." },
  { q: "Does it replace S/4HANA Migration Cockpit?", a: "No. It works alongside it. Many projects use Migration Cockpit for some objects and 2Klicks for RE-FX, where custom fields and validations matter most." },
  { q: "Who fills in the templates?", a: "Usually business and data teams, in Excel. No ABAP knowledge is needed to enter or change data." },
];

export default function TwoKlicksPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "2Klicks", href: "/2klicks/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,6vw,5rem)]">
        <div className="container-content">
          <div className="hero-enter grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <div>
              <div className="mb-6 flex items-center gap-2.5"><span className="bg-navy-900 px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-on-navy">2Klicks by Texiri</span><span className="text-kicker font-semibold uppercase tracking-[0.1em] text-accent-700">SAP RE-FX</span></div>
              <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[13ch] text-display">SAP RE-FX mass data, in two clicks.</h1>
            </div>
            <div>
              <p className="m-0 max-w-[50ch] text-lead text-muted">Create, update and migrate RE-FX master and transaction data from one template. No ABAP, no specs, no development. Runs inside your SAP ECC or S/4HANA system.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#demo" arrow data-track="2klicks_demo_click">Request a demo</Button>
                <Button href="#how" variant="secondary">How it works</Button>
              </div>
            </div>
          </div>
          <dl className="hero-enter-late m-0 mt-[clamp(2rem,4vw,3rem)] grid grid-cols-3 border-t-2 border-ink">
            {stats.map(([v, k]) => (
              <div key={k} className="flex flex-col-reverse py-4 pr-4"><dt className="mt-2 text-sm font-semibold text-muted">{k}</dt><dd className="m-0 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none">{v}</dd></div>
            ))}
          </dl>
          <p className="hero-enter-late m-0 mt-2"><Placeholder>BENCHMARK TO VERIFY · X10</Placeholder></p>
        </div>
      </section>

      <Section id="how" labelledBy="wf-h" tone="navy">
        <Kicker onNavy>How it works</Kicker>
        <H2 id="wf-h" className="text-on-navy">Download, update, upload. No new code.</H2>
        <NumberedGrid onNavy items={klicksSteps.map((st) => ({ title: st.t, body: st.d, icon: st.icon }))} />
        <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-6 border-t border-on-navy/20 pt-6 md:grid-cols-2">
          <div><span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Compatible with</span><p className="m-0 mt-1.5 text-xl font-extrabold">SAP ECC &amp; S/4HANA</p></div>
          <div><span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Use it for</span><ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">{uses.map((u) => <li key={u} className="border border-on-navy/40 px-3 py-1.5 text-[15px] font-bold">{u}</li>)}</ul></div>
        </div>
      </Section>

      <Section labelledBy="ttv-h">
        <Kicker>Time to value</Kicker>
        <H2 id="ttv-h">From 100+ days to day 1</H2>
        <p className="mt-6 max-w-[60ch] text-lg text-muted">RE-FX data changes usually mean months of specs, development, testing and transports, with large teams and rising costs before the real work starts. With 2Klicks there are no programs to build.</p>
        <KlicksTimeline />
      </Section>

      <Section labelledBy="cap-h" tone="surface" ruled>
        <Kicker>Capabilities</Kicker>
        <H2 id="cap-h">RE-FX master and transaction data, end to end</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">RE-FX objects</span>
            <ul className="m-0 list-none border-t-2 border-ink p-0">
              {objects.map((o) => <li key={o} className="flex items-center gap-3 border-b border-rule py-3 text-[17px] font-bold"><Check aria-hidden className="size-5 text-accent-700" />{o}</li>)}
            </ul>
            <span className="mb-3 mt-8 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">Supported modules</span>
            <ul className="m-0 grid list-none gap-3 p-0">
              {modules.map(([m, n]) => <li key={m} className="bg-ground p-4"><div className="text-[22px] font-extrabold">{m}</div><div className="text-sm text-muted">{n}</div></li>)}
            </ul>
          </div>
          <ul className="m-0 grid list-none content-start gap-x-8 p-0 sm:grid-cols-2">
            {features.map(([t, d]) => (
              <li key={t} className="border-t-2 border-ink py-5"><h3 className="m-0 text-[19px]">{t}</h3><p className="m-0 mt-1.5 text-[15px] text-muted">{d}</p></li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="cmp-h">
        <Kicker>Compared</Kicker>
        <H2 id="cmp-h">In-house programs vs 2Klicks</H2>
        <p className="mt-6 max-w-[60ch] text-lg text-muted">Many RE-FX teams already run custom programs for mass changes to contracts and buildings. These are the gaps 2Klicks closes.</p>
        {/* Below md each row stacks into a card, with the column names shown inline. */}
        <div className="mt-[clamp(2rem,4vw,3rem)]">
          <table className="w-full border-collapse text-[15px] max-md:block max-md:border-t-2 max-md:border-ink [&_tbody]:max-md:block [&_td]:max-md:block [&_th]:max-md:block [&_tr]:max-md:block">
            <thead className="max-md:hidden">
              <tr className="border-b-2 border-ink text-left text-xs uppercase tracking-[0.08em]">
                <th scope="col" className="w-[30%] py-3 pr-4 text-muted"><span className="sr-only">Capability</span></th>
                <th scope="col" className="w-[30%] py-3 pr-4 text-muted">In-house programs</th>
                <th scope="col" className="py-3 text-accent-700">With 2Klicks</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([k, today, klicks, partial]) => (
                <tr key={k} className="border-b border-rule max-md:py-4">
                  <th scope="row" className="py-4 pr-4 text-left font-extrabold max-md:pb-2 max-md:pt-0 max-md:text-[17px]">{k}</th>
                  <td className="py-4 pr-4 text-muted max-md:py-1"><span className="flex items-start gap-2">{!partial && <Minus aria-hidden className="mt-0.5 size-4 flex-none" />}<span><span className="font-semibold md:hidden">In-house: </span>{today}</span></span></td>
                  <td className="py-4 font-bold max-md:py-1"><span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 size-4 flex-none text-accent-700" /><span><span className="md:hidden">2Klicks: </span>{klicks}</span></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="ind-h" tone="navy">
        <div className="grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <Kicker onNavy>Where it runs</Kicker>
            <H2 id="ind-h" className="text-on-navy">In use across three continents and six industries</H2>
            <p className="mb-0 mt-6 text-lg text-on-navy-muted">Clients in the US, Australia and Europe.</p>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
            {industries.map((i) => <li key={i} className="border-t-2 border-accent bg-navy-800 p-4 text-[17px] font-bold">{i}</li>)}
          </ul>
        </div>
      </Section>

      <Section labelledBy="tech-h" ruled>
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[2fr_3fr]">
          <div>
            <Kicker>Technical</Kicker>
            <h2 id="tech-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)]">Supported releases &amp; data handling</h2>
            <p className="mt-4 max-w-[42ch] text-[17px] text-muted">Which SAP systems 2Klicks works with, and what happens to your data.</p>
          </div>
          <table className="w-full border-collapse self-start text-[15px]"><tbody>
            {technical.map(([k, v]) => <tr key={k} className="border-b border-rule"><th scope="row" className="w-[42%] py-3 pr-2 text-left text-xs uppercase tracking-[0.08em] text-muted">{k}</th><td className="py-3 font-bold">{v}</td></tr>)}
          </tbody></table>
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

      <FAQAccordion id="faq-h" title="About 2Klicks" faqs={faqs} />
      <section aria-label="Related" className="surface-dark bg-navy-900 text-on-navy">
        <div className="container-content grid md:grid-cols-3">
          {[
            ["The service around it", "S/4HANA, Data Migration & MDG", "/sap/data-migration/"],
            ["After go-live", "SAP Managed Services", "/sap/managed-services/"],
            ["Implementation", "RE-FX & Lease Accounting", "/sap/consulting/#re-fx"],
          ].map(([kicker, label, href], i) => (
            <Link key={href} href={href} className={`flex flex-col gap-2 py-8 text-on-navy no-underline hover:text-accent ${i > 0 ? "border-on-navy/20 md:border-l md:pl-8" : ""} md:pr-8`}><span className="text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">{kicker}</span><h2 className="m-0 text-[26px] text-inherit">{label} →</h2></Link>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}
