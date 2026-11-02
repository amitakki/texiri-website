import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button, Kicker, H2 } from "@/components/ui";
import { PhotoGrid } from "@/components/PhotoGrid";
import { lifePhotos } from "@/lib/gallery";
import { Breadcrumbs } from "@/components/sections";
import { Track } from "@/components/visuals";
import { RoleList } from "@/components/RoleList";
import { Shambhavi108 } from "@/components/Shambhavi108";
import { CAREERS_EMAIL, hiringSteps, lifeAtTexiri, roles } from "@/lib/company";

export const metadata: Metadata = {
  title: "Careers: SAP & AI Jobs in Vijayapura",
  description: "Work on real SAP and AI projects with a senior team. Careers in SAP consulting, data migration, SAP BTP and AI, plus the Shambhavi 108 programme.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
        <div className="hero-enter container-content">
          <Kicker>Careers</Kicker>
          <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[22ch] text-display">Do real SAP and AI work from day one.</h1>
          <div className="mt-8 grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
            <p className="m-0 max-w-[52ch] text-lead text-muted">A small, senior team in Vijayapura and Navi Mumbai, delivering for clients on five continents. You work on live client systems, alongside the people who built 2Klicks.</p>
            <div className="flex flex-wrap gap-3"><Button href="#roles">Open roles</Button><Button href="/careers/shambhavi-108/" variant="secondary">Shambhavi 108</Button></div>
          </div>
        </div>
      </section>

      <section id="roles" aria-labelledby="roles-h" className="scroll-mt-20 border-t-2 border-ink pb-section pt-[clamp(3rem,6vw,5rem)]">
        <div className="container-content">
          <Kicker>Open roles</Kicker>
          {roles.length > 0 ? (
            <>
              <RoleList headingId="roles-h" />
              <p className="mb-0 mt-6 text-muted">Don&apos;t see your role? Send your CV to <a href={`mailto:${CAREERS_EMAIL}?subject=General%20application`} className="font-bold text-ink">{CAREERS_EMAIL}</a></p>
            </>
          ) : (
            <>
              <h2 id="roles-h" className="m-0 max-w-[22ch] text-h2">No roles listed right now.</h2>
              <p className="mt-6 max-w-[56ch] text-lg text-muted">We are always interested in experienced SAP and AI people. Send your CV and a few lines on what you want to work on, and we will get back to you when a fitting role opens.</p>
              <div className="mt-8"><Button href={`mailto:${CAREERS_EMAIL}?subject=General%20application`} arrow>Send your CV</Button></div>
            </>
          )}
        </div>
      </section>

      <Shambhavi108 />

      <section id="life" aria-labelledby="life-h" className="scroll-mt-20 py-section">
        <div className="container-content">
          <Kicker>Life at Texiri</Kicker><H2 id="life-h" className="max-w-[18ch]">Why people join, and why they stay</H2>
          <ul className="m-0 mt-[clamp(2.5rem,5vw,4rem)] grid list-none gap-x-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {lifeAtTexiri.map((l) => (
              <li key={l.t} className="grid grid-cols-[28px_1fr] gap-3 border-t-2 border-ink py-6">
                <Check aria-hidden className="mt-0.5 size-5.5 text-accent-700" />
                <div><h3 className="mb-1 mt-0 text-[19px]">{l.t}</h3><p className="m-0 text-[15px] text-muted">{l.d}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-[clamp(2rem,4vw,3rem)]"><PhotoGrid photos={lifePhotos} label="Photos from life at Texiri" /></div>
        </div>
      </section>

      <section aria-labelledby="proc-h" className="surface-dark bg-navy-900 py-[clamp(3.5rem,7vw,6rem)] text-on-navy">
        <div className="container-content">
          <Kicker onNavy>How we hire</Kicker>
          <H2 id="proc-h" className="text-on-navy">Four steps, no surprises</H2>
          <div className="mt-[clamp(2.5rem,5vw,4rem)]"><Track label="Hiring process: four steps" rowFrom="lg" onNavy numbered items={hiringSteps.map((s) => ({ label: s.title, note: s.body }))} /></div>
        </div>
      </section>
    </>
  );
}
