import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button, Kicker, Placeholder, H2, SiteImage } from "@/components/ui";
import { images } from "@/lib/images";
import { Breadcrumbs, NumberedGrid } from "@/components/sections";
import { RoleList } from "@/components/RoleList";
import { Shambhavi108 } from "@/components/Shambhavi108";
import { CAREERS_EMAIL, hiringSteps, lifeAtTexiri } from "@/lib/company";

export const metadata: Metadata = {
  title: "Careers: SAP & AI Jobs in Vijayapura",
  description: "Work on real SAP and AI projects with a founder-led team. Open roles in SAP consulting, data migration, integration and AI, plus the Shambhavi 108 programme.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>Careers</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[15ch] text-display">Do real SAP and AI work from day one.</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">A small, senior team in Vijayapura and Navi Mumbai, delivering for clients in five countries. You work on live client systems, alongside the people who built 2Klicks.</p>
            <div className="flex flex-wrap gap-3"><Button href="#roles">See open roles</Button><Button href="/careers/shambhavi-108/" variant="secondary">Shambhavi 108</Button></div>
          </div>
        </div>
      </section>

      <section id="roles" aria-labelledby="roles-h" className="scroll-mt-20 border-t-2 border-ink pb-section pt-[clamp(3rem,6vw,5rem)]">
        <div className="container-content">
          <div className="mb-4 flex flex-wrap items-center gap-3"><Kicker>Open roles</Kicker><Placeholder>SAMPLE ROLES · TO CONFIRM</Placeholder></div>
          <RoleList headingId="roles-h" />
          <p className="mb-0 mt-6 text-muted">Don&apos;t see your role? Send your CV to <a href={`mailto:${CAREERS_EMAIL}?subject=General%20application`} className="font-bold text-ink">{CAREERS_EMAIL}</a> <Placeholder>ADDRESS TO CONFIRM</Placeholder></p>
        </div>
      </section>

      <Shambhavi108 />

      <section id="life" aria-labelledby="life-h" className="scroll-mt-20 py-section">
        <div className="container-content">
          <Kicker>Life at Texiri</Kicker><H2 id="life-h" className="max-w-[18ch]">Why people join, and why they stay</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-8 lg:grid-cols-2">
            <SiteImage {...images.teamPhoto} ratio="aspect-[4/3]" />
            <ul className="m-0 grid list-none gap-x-6 p-0 sm:grid-cols-2">
              {lifeAtTexiri.map((l) => (
                <li key={l.t} className="grid grid-cols-[28px_1fr] gap-3 border-t-2 border-ink py-6">
                  <Check aria-hidden className="mt-0.5 size-5.5 text-accent-700" />
                  <div><h3 className="mb-1 mt-0 text-[19px]">{l.t}</h3><p className="m-0 text-[15px] text-muted">{l.d}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="proc-h" className="surface-dark bg-navy-900 py-[clamp(3.5rem,7vw,6rem)] text-on-navy">
        <div className="container-content">
          <Kicker onNavy>How we hire</Kicker>
          <H2 id="proc-h" className="text-on-navy">Four steps, no surprises</H2>
          <NumberedGrid items={hiringSteps} cols={4} onNavy />
        </div>
      </section>
    </>
  );
}
