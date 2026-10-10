import type { Metadata } from "next";
import { Kicker, Placeholder, H2 } from "@/components/ui";
import { Breadcrumbs } from "@/components/sections";
import { Shambhavi108 } from "@/components/Shambhavi108";
import { ShambhaviForm } from "@/components/ShambhaviForm";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shambhavi 108 Career Restart Programme",
  description: "Shambhavi 108 is a Texiri Solutions training programme for people restarting their career in software after a career break. Register in four short steps.",
  alternates: { canonical: "/careers/shambhavi-108/" },
};

export default function Shambhavi108Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers/" }, { label: "Shambhavi 108", href: "/careers/shambhavi-108/" }]} />
      <Shambhavi108 asPage />
      <section aria-labelledby="about-h" className="py-[clamp(3rem,6vw,5rem)]">
        <div className="container-content">
          <H2 id="about-h" className="max-w-[20ch]">A break in your CV is not the end of your career.</H2>
          {/* The three "who / what / after" blocks are in the hero above. Content decisions S1–S4. */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted"><Placeholder>TO CONFIRM</Placeholder>Training duration, format (online or Vijayapura), tracks and fees.</div>
        </div>
      </section>
      <section id="register" aria-labelledby="reg-h" className="scroll-mt-20 border-t-2 border-ink bg-surface py-section">
        <div className="mx-auto max-w-[880px] px-[clamp(1.25rem,4vw,3rem)]">
          <Kicker>Register</Kicker>
          <H2 id="reg-h">Tell us about yourself</H2>
          <p className="mb-0 mt-4 max-w-[56ch] text-muted">Four short steps, about 15 minutes. Your answers are saved on this device as you go, so you can come back and finish later.</p>
          <ShambhaviForm />
          <p className="mb-0 mt-8 text-[15px] text-muted">Questions about the programme? Call <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-bold text-ink">{contact.phoneDisplay}</a> or email <a href={`mailto:${contact.email}`} className="font-bold text-ink">{contact.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
