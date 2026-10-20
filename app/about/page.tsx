import type { Metadata } from "next";
import { images } from "@/lib/images";
import Link from "next/link";
import { Button, Kicker, Placeholder, H2, SiteImage } from "@/components/ui";
import { ShieldCheck, UserCheck, Wrench, LifeBuoy } from "lucide-react";
import { Breadcrumbs, CTABand, CredibilityStrip, NumberedGrid } from "@/components/sections";
import { DeliveryNetwork, FitDiagram } from "@/components/visuals";
import { LeadershipSection } from "@/components/LeadershipSection";
import { principles } from "@/lib/company";
import { offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us: Founder-led SAP Consulting",
  description: "Texiri Solutions is a founder-led SAP consultancy. Our CEO began his career at SAP Labs India. 20+ years in SAP, delivery across five countries, and our own 2Klicks migration tools.",
  alternates: { canonical: "/about/" },
};

const principleIcons = { people: UserCheck, tools: Wrench, verify: ShieldCheck, support: LifeBuoy };
const deliveryCountries = ["India", "USA", "Germany", "Singapore", "Australia"];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>About Texiri</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[15ch] text-display">An SAP company, founded by an SAP engineer.</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">Texiri Solutions implements SAP, migrates it to S/4HANA and keeps it running well. We build our own tools where manual work slows projects down, and we apply AI where it earns its place.</p>
            <div className="flex flex-wrap gap-3"><Button href="/about/leadership/">Meet the leadership</Button><Button href="/careers/" variant="secondary">Work with us</Button></div>
          </div>
        </div>
      </section>
      <CredibilityStrip />

      <section aria-labelledby="story-h" className="py-section">
        <div className="container-content grid gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8"><div><Kicker>Our story</Kicker><H2 id="story-h" className="max-w-[14ch]">Built from Vijayapura for SAP teams worldwide.</H2></div><SiteImage {...images.office} ratio="aspect-[4/3]" /></div>
          <div className="flex max-w-[60ch] flex-col gap-4 text-[17px] leading-relaxed">
            <p className="m-0">Texiri started with one observation from years of SAP projects: the hardest weeks are rarely the configuration. They&apos;re the data. Every migration object needed its own programs before a single record could load.</p>
            <p className="m-0">So we built 2Klicks, patented tools <Placeholder>PATENT TO VERIFY</Placeholder> that turn Excel templates into SAP loads and mass updates. Around them we grew a consulting practice covering the full lifecycle, from blueprint to managed services.</p>
            <p className="m-0">Today we deliver from Vijayapura, Karnataka and Navi Mumbai to clients in India, the USA, Germany, Singapore and Australia. We also run the TEXIRI AI Community, an open learning group that began in Vijayapura.</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">Founded <strong className="text-ink">[Year]</strong><Placeholder>TO CONFIRM</Placeholder></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-h" className="surface-dark bg-navy-900 py-[clamp(4rem,9vw,7rem)] text-on-navy">
        <div className="container-content">
          <Kicker onNavy>What we do</Kicker>
          <H2 id="what-h" className="text-on-navy">SAP first. Tools and AI where they help.</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] max-w-3xl"><FitDiagram /></div>
        </div>
      </section>

      <section aria-labelledby="how-h" className="py-section">
        <div className="container-content"><Kicker>How we work</Kicker><H2 id="how-h">Four commitments</H2><NumberedGrid items={principles.map((p) => ({ ...p, icon: principleIcons[p.icon] }))} cols={4} /></div>
      </section>

      <LeadershipSection />

      <section aria-labelledby="off-h" className="bg-surface py-[clamp(4rem,9vw,7rem)]">
        <div className="container-content">
          <Kicker>Where we are</Kicker><H2 id="off-h">Two offices, five delivery countries</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <DeliveryNetwork offices={offices.map((o) => ({ name: `${o.locality}, ${o.region}`, label: o.label }))} countries={deliveryCountries} />
            <p className="mb-0 mt-6 text-[15px] text-muted">Full addresses and opening hours are on the <Link href="/contact/" className="font-bold">contact page</Link>.</p>
          </div>
        </div>
      </section>

      <CTABand title="Talk to the people who will do the work." note="A senior consultant replies within one business day." primary={{ label: "Contact us", href: "/contact/" }} secondary={{ label: "See open roles", href: "/careers/" }} />
    </>
  );
}
