import type { Metadata } from "next";
import { images } from "@/lib/images";
import Link from "next/link";
import { Button, Kicker, Placeholder, H2, SiteImage } from "@/components/ui";
import { Breadcrumbs, CTABand, CredibilityStrip, NumberedGrid } from "@/components/sections";
import { LeadershipSection } from "@/components/LeadershipSection";
import { principles } from "@/lib/company";
import { offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us: Founder-led SAP Consulting",
  description: "Texiri Solutions is a founder-led SAP consultancy. Our CEO began his career at SAP Labs India. 20+ years in SAP, delivery across five countries, and our own 2Klicks migration tools.",
  alternates: { canonical: "/about/" },
};

const verticals = [
  { t: "SAP Services", d: "Consulting, S/4HANA data migration and MDG, integration and managed services.", href: "/sap/", tone: "border-accent" },
  { t: "2Klicks", d: "Our own tools for SAP data migration and mass updates through Excel.", href: "/2klicks/", tone: "border-accent" },
  { t: "AI Services & Community", d: "Applied AI for enterprises, and an open community for anyone learning AI.", href: "/ai-services/", tone: "border-ai" },
];

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
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
            {verticals.map((v) => (
              <Link key={v.t} href={v.href} className={`flex flex-col gap-2 border-t-4 ${v.tone} pt-4 text-on-navy no-underline hover:text-accent`}>
                <span className="text-2xl font-extrabold">{v.t}</span><span className="text-on-navy-muted">{v.d}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-h" className="py-section">
        <div className="container-content"><Kicker>How we work</Kicker><H2 id="how-h">Four commitments</H2><NumberedGrid items={principles} cols={4} /></div>
      </section>

      <LeadershipSection />

      <section aria-labelledby="off-h" className="bg-surface py-[clamp(4rem,9vw,7rem)]">
        <div className="container-content">
          <Kicker>Where we are</Kicker><H2 id="off-h">Two offices, five delivery countries</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-3">
            {offices.map((o) => (
              <address key={o.name} className={`border-t-4 pt-4 not-italic ${o.hq ? "border-accent" : "border-ink"}`}>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{o.label}</span>
                <div className="mt-1 text-2xl font-extrabold">{o.locality}, {o.region}</div>
                <div className="mt-2 text-[15px] text-muted">{o.street.map((line) => <div key={line}>{line}</div>)}{o.locality} {o.postalCode}</div>
              </address>
            ))}
            <div className="border-t-4 border-ink pt-4"><span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Delivery experience</span><div className="mt-1 text-2xl font-extrabold">India · USA · Germany · Singapore · Australia</div></div>
          </div>
        </div>
      </section>

      <CTABand title="Talk to the people who will do the work." note="A senior consultant replies within one business day." primary={{ label: "Contact us", href: "/contact/" }} secondary={{ label: "See open roles", href: "/careers/" }} />
    </>
  );
}
