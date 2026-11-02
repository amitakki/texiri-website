import type { Metadata } from "next";
import { ArrowLeftRight, Fuel, Lock, Puzzle, Smartphone } from "lucide-react";
import { Button, H2, Kicker, Section } from "@/components/ui";
import { LifecycleRail } from "@/components/visuals";
import { Breadcrumbs, CheckList, CTABand, FAQAccordion, Hero, NumberedGrid } from "@/components/sections";

export const metadata: Metadata = {
  title: "SAP BTP & ABAP Development",
  description: "SAP BTP and custom development: ABAP enhancements, Fiori/UI5 apps, RAP services, clean-core BTP extensions, workflows and integration, and SAP mobile apps with BTP Mobile Services.",
  alternates: { canonical: "/sap/btp/" },
};

const serviceJsonLd = {
  "@context": "https://schema.org", "@type": "Service",
  name: "SAP BTP and ABAP Development",
  provider: { "@type": "Organization", name: "Texiri Solutions" },
  serviceType: "SAP development", areaServed: ["US", "EU", "AE", "AU", "IN"],
};

const caps = [
  { t: "Custom ABAP", d: "Enhancements, reports and interfaces, moved from on-premise habits to clean-core application enhancements." },
  { t: "Fiori/UI5 and RAP", d: "Modern, mobile-ready Fiori apps on RAP-based services that speed up user adoption." },
  { t: "SAP BTP extensions", d: "Side-by-side extensions on SAP BTP that keep the S/4HANA core clean and ready for the cloud." },
  { t: "Workflows and approvals", d: "Approval flows and process automation on SAP BTP, built around how your teams work." },
  { t: "Integration", d: "Interfaces between SAP and the rest of your landscape on SAP Integration Suite (CPI), and support for PI/PO until its mainstream maintenance ends in 2027." },
  { t: "Clean-core rework", d: "Every S/4HANA move needs custom code reviewed and reworked. We assess it, retire what you don't need and rebuild the rest." },
];
const mobileServices = ["Security", "Connectivity", "Offline", "Data privacy"];
const mobileBenefits = [
  { icon: Lock, t: "Enterprise-ready out of the box", d: "SAP BTP Mobile Services provides security, connectivity, offline working and data privacy as standard." },
  { icon: Puzzle, t: "Customise without touching the core", d: "Metadata-based component applications extend SSAM without disturbing the core metadata." },
  { icon: Smartphone, t: "iOS and Android, deployed lightly", d: "One solution for both platforms, with lightweight app-store deployment." },
];
const faqs = [
  { q: "What does clean core mean for our custom code?", a: "Keeping custom logic out of the S/4HANA core, in released APIs and BTP extensions, so upgrades stay simple. We review your existing code and decide with you what to retire, keep or rebuild." },
  { q: "Do you still support SAP PI/PO?", a: "Yes. We support PI/PO today and help you plan the move to SAP Integration Suite before its mainstream maintenance ends in 2027." },
  { q: "Can we hire a development team rather than a project?", a: "Yes. We work per project or as a dedicated offshore development team, whichever gives you the capacity you need." },
];

export default function SapBtpPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }, { label: "SAP BTP & Development", href: "/sap/btp/" }]} />
      <Hero
        kicker="SAP BTP & Development"
        title="Extend S/4HANA without touching the core."
        lead="Tailored SAP development, from ABAP to Fiori apps and SAP BTP extensions, plus the workflows and integrations that connect SAP to the rest of your landscape."
        aside={<LifecycleRail active={3} />}
        actions={<><Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button><Button href="#mobile" variant="secondary">SAP Mobile use case</Button></>}
      />

      <Section labelledBy="cap-h" ruled>
        <Kicker>What we do</Kicker>
        <H2 id="cap-h">Custom development, built for S/4HANA and the cloud</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]"><CheckList items={caps} /></div>
      </Section>

      <Section labelledBy="stack-h" tone="surface">
        <Kicker>Three layers</Kicker>
        <H2 id="stack-h">ABAP, Fiori and BTP</H2>
        <NumberedGrid items={[
          { title: "ABAP", body: "On-premise to clean-core application enhancements." },
          { title: "Fiori", body: "Mobile-ready apps that speed up user adoption." },
          { title: "BTP", body: "Extensions ready for S/4HANA and the cloud." },
        ]} />
      </Section>

      <Section id="mobile" labelledBy="mobile-h" tone="navy" className="scroll-mt-20">
        <Kicker onNavy>Use case · Oil &amp; Gas</Kicker>
        <H2 id="mobile-h" className="text-on-navy">SAP Mobile for field crews</H2>
        <p className="mt-6 max-w-[60ch] text-lg text-on-navy-muted">SAP Service and Asset Manager (SSAM), enabled with SAP BTP Mobile Services.</p>
        <figure aria-label="SAP S/4HANA asset and maintenance data, connected through SAP BTP Mobile Services to the SSAM mobile app" className="m-0 mt-[clamp(2rem,4vw,3rem)] grid items-center gap-3 lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1.4fr)_32px_minmax(0,1fr)]">
          <div className="border-t-4 border-on-navy/40 bg-navy-800 p-5"><strong className="block text-lg">SAP S/4HANA</strong><span className="text-sm text-on-navy-muted">Asset and maintenance data</span></div>
          <ArrowLeftRight aria-hidden className="mx-auto size-6 rotate-90 text-accent lg:rotate-0" />
          <div className="bg-accent p-5 text-navy-900">
            <strong className="block text-lg">SAP BTP Mobile Services</strong>
            <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-1.5 p-0 text-[13px] font-bold">{mobileServices.map((m) => <li key={m} className="border border-navy-900/40 px-2.5 py-1">{m}</li>)}</ul>
          </div>
          <ArrowLeftRight aria-hidden className="mx-auto size-6 rotate-90 text-accent lg:rotate-0" />
          <div className="border-t-4 border-on-navy/40 bg-navy-800 p-5"><strong className="block text-lg">SSAM mobile app</strong><span className="text-sm text-on-navy-muted">iOS and Android</span></div>
        </figure>
        <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-6 md:grid-cols-3">
          {mobileBenefits.map((b) => (
            <div key={b.t} className="border-t-2 border-accent pt-4">
              <b.icon aria-hidden className="size-6 text-accent" />
              <h3 className="mb-2 mt-3 text-[21px] text-on-navy">{b.t}</h3>
              <p className="m-0 text-on-navy-muted">{b.d}</p>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-8 flex items-start gap-3 border-t border-on-navy/20 pt-5 text-[15px] text-on-navy-muted">
          <Fuel aria-hidden className="size-5 flex-none text-accent" />
          <span><strong className="text-on-navy">Why it matters in oil &amp; gas:</strong> field crews at remote sites keep working offline and sync securely when they are back in coverage.</span>
        </p>
      </Section>

      <Section labelledBy="eng-h">
        <div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-2">
          <div><Kicker>How we engage</Kicker><h2 id="eng-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)]">Per project, or a dedicated team</h2></div>
          <p className="m-0 max-w-[52ch] text-[17px] text-muted">An offshore development team gives you capacity at a competitive cost. Take a single build, or keep a dedicated team that knows your system.</p>
        </div>
      </Section>

      <FAQAccordion id="faq-h" title="BTP and development questions" faqs={faqs} />
      <CTABand title="Tell us what you need to build or extend." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
