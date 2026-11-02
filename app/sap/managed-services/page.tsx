import type { Metadata } from "next";
import { Clock, Globe, Users } from "lucide-react";
import { Button, H2, Kicker, Section } from "@/components/ui";
import { LifecycleRail } from "@/components/visuals";
import { Breadcrumbs, CheckList, CTABand, FAQAccordion, Hero, NumberedGrid } from "@/components/sections";

export const metadata: Metadata = {
  title: "SAP Managed Services & Staff Augmentation",
  description: "SAP managed services from Basis to functional support, continuous optimisation, RE-FX mass changes with 2Klicks, and experienced SAP consultants on demand. Onsite, offshore or hybrid.",
  alternates: { canonical: "/sap/managed-services/" },
};

const serviceJsonLd = {
  "@context": "https://schema.org", "@type": "Service",
  name: "SAP Managed Services",
  provider: { "@type": "Organization", name: "Texiri Solutions" },
  serviceType: "SAP application management", areaServed: ["US", "EU", "AE", "AU", "IN"],
};

const caps = [
  { t: "Basis and technical operations", d: "System administration, monitoring, transports and change management (ChaRM), keeping the landscape healthy." },
  { t: "Functional support", d: "Incidents, changes and small enhancements across RE-FX, FICO, PS, PM, MM and the rest of your SAP estate." },
  { t: "Continuous optimisation", d: "Process and performance improvements, raised by the people who see where the system slows your teams down." },
  { t: "Mass changes with 2Klicks", d: "RE-FX reorganisations, condition changes and data corrections handled from Excel templates, without new code." },
  { t: "Development on demand", d: "ABAP, Fiori and BTP changes delivered by the same team, so fixes and enhancements don't wait for a new project." },
  { t: "Staff augmentation", d: "Experienced SAP consultants who join your team for a phase, a backlog or a go-live." },
];
const skills = ["SAP ABAP", "Fiori apps", "BTP", "MDG", "FICO", "RE-FX", "PS", "S/4HANA", "Group Reporting", "FSCM", "PM", "EWM", "Basis"];
const faqs = [
  { q: "Can you support a system you didn't implement?", a: "Yes. We start with a short knowledge transfer and a review of open incidents, then take over support with agreed service levels." },
  { q: "Do you offer round-the-clock support?", a: "Yes. Our onsite, offshore and hybrid teams can cover your business hours across time zones." },
  { q: "How quickly can a consultant join our team?", a: "Tell us the skills and dates you need, and we will propose consultants with matching SAP experience." },
];

export default function ManagedServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SAP Services", href: "/sap/" }, { label: "SAP Managed Services", href: "/sap/managed-services/" }]} />
      <Hero
        kicker="SAP Managed Services"
        title="Basis to functional support, under one roof."
        lead="Complete SAP management after go-live, from the people who know how your system was built. Add experienced consultants whenever your team needs more hands."
        aside={<LifecycleRail active={4} />}
        actions={<><Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button><Button href="/2klicks/" variant="secondary">Explore 2Klicks</Button></>}
      />

      <Section labelledBy="cap-h" ruled>
        <Kicker>What we cover</Kicker>
        <H2 id="cap-h">Everything your SAP system needs after go-live</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)]"><CheckList items={caps} /></div>
      </Section>

      <Section labelledBy="aug-h" tone="surface">
        <div className="grid items-start gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <Kicker>Staff augmentation</Kicker>
            <h2 id="aug-h" className="m-0 max-w-[20ch] text-[clamp(1.625rem,3vw,2.25rem)]">Experienced SAP consultants, when you need them</h2>
            <p className="mt-4 max-w-[46ch] text-[17px] text-muted">Consultants with real project experience, who work inside your team and your processes.</p>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">{skills.map((s) => <li key={s} className="border border-rule bg-ground px-3.5 py-2 text-[15px]">{s}</li>)}</ul>
        </div>
      </Section>

      <Section labelledBy="del-h">
        <Kicker>Delivery model</Kicker>
        <H2 id="del-h">Flexible teams, round-the-clock support</H2>
        <NumberedGrid items={[
          { title: "Onsite, offshore or hybrid", body: "Teams from our delivery centres in Vijayapura and Navi Mumbai, with consultants onsite when the work needs it.", icon: Users },
          { title: "Round-the-clock support", body: "Cover across time zones for clients in the USA, Europe, the Middle East, Australia and India.", icon: Clock },
          { title: "Cost efficiency", body: "Senior SAP expertise at a competitive cost, sized to your landscape.", icon: Globe },
        ]} />
      </Section>

      <FAQAccordion id="faq-h" title="Managed services questions" faqs={faqs} />
      <CTABand title="Tell us how your SAP system is supported today." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
