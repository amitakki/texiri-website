import type { Metadata } from "next";
import { images } from "@/lib/images";
import Link from "next/link";
import { Button, Kicker, H2, SiteImage } from "@/components/ui";
import { ShieldCheck, UserCheck, Wrench, LifeBuoy } from "lucide-react";
import { Breadcrumbs, CTABand, CredibilityStrip, NumberedGrid } from "@/components/sections";
import { DeliveryNetwork } from "@/components/visuals";
import { LeadershipSection } from "@/components/LeadershipSection";
import { principles } from "@/lib/company";
import { offices } from "@/lib/site";
import { csrEvents } from "@/lib/gallery";
import { isLive } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About Us: SAP Consulting Since 2021",
  description: "Texiri Solutions is an SAP consultancy founded in 2021. Our CEO began his career at SAP Labs India. 20+ years in SAP, clients on five continents, and our own proprietary 2Klicks migration tools.",
  alternates: { canonical: "/about/" },
};

const principleIcons = { people: UserCheck, tools: Wrench, verify: ShieldCheck, support: LifeBuoy };
const csrCover = csrEvents[0]?.photos[0];
const deliveryRegions = ["USA", "Europe", "Middle East", "Australia", "India"];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>About Texiri</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[22ch] text-display">An SAP company, founded by an SAP engineer.</h1>
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
            <p className="m-0">So we built 2Klicks, our own proprietary tools that turn Excel templates into SAP loads and mass updates. Around them we grew a consulting practice covering the full lifecycle, from blueprint to managed services.</p>
            <p className="m-0">Today we deliver from Vijayapura, Karnataka and Navi Mumbai to clients on five continents: the USA, Europe, the Middle East, Australia and India, including Fortune 500 companies. We also run the TEXIRI AI Community, a platform for AI learning and collaboration that began in Vijayapura.</p>
            <div className="text-sm text-muted">Founded <strong className="text-ink">2021</strong></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-h" className="bg-surface py-section">
        <div className="container-content"><Kicker>How we work</Kicker><H2 id="how-h">Four commitments</H2><NumberedGrid items={principles.map((p) => ({ ...p, icon: principleIcons[p.icon] }))} cols={4} /></div>
      </section>

      <LeadershipSection />

      {isLive("/about/csr/") && csrCover && (
        <section aria-labelledby="csr-h" className="surface-dark bg-navy-900 text-on-navy">
          <Link href="/about/csr/" className="container-content grid items-center gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 py-[clamp(3rem,6vw,5rem)] text-on-navy no-underline hover:text-on-navy md:grid-cols-2">
            <div>
              <Kicker onNavy>CSR at Texiri</Kicker>
              <h2 id="csr-h" className="m-0 max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08]">Giving back where we live and work</h2>
              <p className="mb-0 mt-4 max-w-[46ch] text-[17px] text-on-navy-muted">Our CSR activities and events, with photos from each one.</p>
              <span className="mt-4 inline-block font-extrabold text-accent">See our CSR events →</span>
            </div>
            <SiteImage {...csrCover} ratio="aspect-[16/10]" />
          </Link>
        </section>
      )}

      <section aria-labelledby="off-h" className="rule-section py-[clamp(4rem,9vw,7rem)]">
        <div className="container-content">
          <Kicker>Where we are</Kicker><H2 id="off-h">Two delivery centres, clients on five continents</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <DeliveryNetwork offices={offices.map((o) => ({ name: `${o.locality}, ${o.region}`, label: o.label }))} countries={deliveryRegions} />
            <p className="mb-0 mt-6 text-[15px] text-muted">Full addresses and opening hours are on the <Link href="/contact/" className="font-bold">contact page</Link>.</p>
          </div>
        </div>
      </section>

      <CTABand title="Talk to the people who will do the work." note="A senior consultant replies within one business day." primary={{ label: "Contact us", href: "/contact/" }} secondary={{ label: "See open roles", href: "/careers/" }} />
    </>
  );
}
