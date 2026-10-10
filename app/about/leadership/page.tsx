import type { Metadata } from "next";
import { Breadcrumbs, CTABand } from "@/components/sections";
import { LeadershipSection } from "@/components/LeadershipSection";
import { founder } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leadership",
  description: `Meet the leadership of Texiri Solutions, led by founder and CEO ${founder.name}, who began his career at SAP Labs India.`,
  alternates: { canonical: "/about/leadership/" },
};

const personLd = { "@context": "https://schema.org", "@type": "Person", name: founder.name, jobTitle: founder.role, worksFor: { "@type": "Organization", name: "Texiri Solutions", url: SITE_URL } };

export default function LeadershipPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }, { label: "Leadership", href: "/about/leadership/" }]} />
      <LeadershipSection asPage />
      <CTABand title="Talk to the people who will do the work." note="A senior consultant replies within one business day." primary={{ label: "Contact us", href: "/contact/" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
