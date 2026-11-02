import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { Breadcrumbs, CaseStudyCard, CTABand, Hero } from "@/components/sections";
import { caseHref, caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies: SAP Programmes and Results",
  description: "SAP case studies: an S/4HANA data migration for an Australian utility, RE-FX and IFRS 16 lease accounting for a US retailer, and predictive asset management in oil and gas.",
  alternates: { canonical: "/case-studies/" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies/" }]} />
      <Hero
        kicker="Case Studies"
        title="Results from SAP programmes."
        lead="Selected engagements across utilities, retail, and oil and gas: data migration to S/4HANA, RE-FX lease accounting and predictive asset management."
        actions={<Button href="/contact/" arrow data-track="cta_click" data-vertical="sap">Talk to an SAP expert</Button>}
      />
      <section aria-label="All case studies" className="pb-section">
        <div className="container-content grid gap-x-6 gap-y-12 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <div key={c.slug} className="flex flex-col gap-3">
              <CaseStudyCard sector={c.sector} title={c.title} metric={c.metric} metricLabel={c.metricLabel} href={caseHref(c)} />
              <p className="m-0 text-[15px] text-muted">{c.summary}</p>
            </div>
          ))}
        </div>
      </section>
      <CTABand title="Planning something similar? Talk to the team that delivered it." note="A senior SAP consultant replies within one business day." primary={{ label: "Talk to an SAP expert", href: "/contact/" }} />
    </>
  );
}
