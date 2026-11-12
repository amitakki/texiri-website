import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Plus, Rocket, Sprout } from "lucide-react";
import { Breadcrumbs, isUnconfirmed } from "@/components/sections";

export const metadata: Metadata = {
  title: "TEXIRI AI Community: Learn AI Together",
  description: "The TEXIRI AI Community is a learning community for anyone curious about AI: students, professionals, developers, educators and entrepreneurs. Learning paths, online sessions, workshops and project showcases. Started in Vijayapura.",
  alternates: { canonical: "/ai-community/" },
};

// TODO(cms, step 8): LearningPath, CommunityEvent (with Event JSON-LD), CommunityProject, FAQ.
// Content decisions M1–M7 (Nov 2026): no member count or photos, sessions online for now, no event list,
// and no project showcase or resource library until they exist.
const Y = "bg-com-tint", B = "bg-com-blue-tint", O = "bg-com-orange-tint";
const who = [["Students", Y], ["Working professionals", B], ["Developers", O], ["Educators", B], ["Entrepreneurs", O], ["The AI-curious", Y]];
const perks = [
  ["Learning paths", "Beginner to advanced, in a sensible order.", Y], ["Live sessions", "Talks and Q&As you can join online.", B],
  ["Hands-on workshops", "Build something real in an afternoon.", O], ["Project showcases", "Show your work and get friendly feedback.", Y],
  ["Mentorship", "Learn from Texiri practitioners who build AI for a living.", B],
];
// Levels only; the topics in each path are not fixed yet (content decision M5).
const paths = [
  { level: "Beginner", t: "AI from zero", d: "No code needed to start.", bg: Y, icon: Sprout, rise: "md:pt-0" },
  { level: "Intermediate", t: "Build with Python", d: "Comfortable with basics? Start building.", bg: O, icon: Code2, rise: "md:pt-14" },
  { level: "Advanced", t: "Ship it", d: "For people already building models.", bg: B, icon: Rocket, rise: "md:pt-28" },
];
const faqs = [
  { q: "Do I need to know how to code?", a: "No. The beginner path starts without code. You can pick up Python later if you want to." },
  { q: "Where do sessions happen?", a: "Online for now. In-person sessions in Vijayapura will be announced." },
  { q: "Will I get sales emails from Texiri?", a: "No. Community members only receive community updates, and you can unsubscribe at any time." },
  { q: "Can I present my own project?", a: "Yes, please. Showcases are open to members at every level." },
];
const kicker = "mb-3 block text-[13px] font-bold uppercase tracking-[0.08em] text-com-ink";
const h2 = "m-0 text-[clamp(1.875rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]";
const joinBtn = "rounded-pill inline-flex min-h-13 items-center gap-2.5 bg-com px-6 font-extrabold text-navy-900 no-underline hover:bg-com-600 hover:text-navy-900";

export default function CommunityPage() {
  return (
    <div className="bg-com-bg">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Community", href: "/ai-community/" }]} />

      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2rem,5vw,4.5rem)]">
        <div className="hero-enter container-content grid items-end gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-6 lg:grid-cols-2">
          <div>
            <span className="rounded-pill mb-6 inline-flex items-center gap-2 bg-com-tint px-3.5 py-1.5 text-[13px] font-bold text-com-ink"><span aria-hidden className="size-2 rounded-full bg-com-orange" />TEXIRI AI Community · started in Vijayapura</span>
            <h1 id="hero-h" className="m-0 text-[clamp(2.25rem,5vw,4rem)] leading-none tracking-[-0.03em]">
              <span className="block">Learn AI.</span><span className="block">Build with AI.</span><span className="block text-com-blue">Grow together.</span>
            </h1>
          </div>
          <div>
            <p className="m-0 max-w-[48ch] text-lead text-muted">A community for anyone curious about AI, whether you&apos;re opening your first notebook or shipping models at work. It began as the Vijayapura AI Club and is open to learners everywhere.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ai-community/join/" className={joinBtn} data-track="community_join_click">Join the community<ArrowRight aria-hidden className="size-4.5" /></Link>
              <a href="#paths" className="rounded-pill inline-flex min-h-13 items-center border-2 border-navy-900 px-6 font-extrabold text-navy-900 no-underline hover:bg-com-tint hover:text-navy-900">See the learning paths</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="who-h" className="scroll-mt-18 bg-com-surface py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-content grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className={kicker}>Who it&apos;s for</span>
            <h2 id="who-h" className={`${h2} max-w-[16ch]`}>Everyone curious about AI. Really.</h2>
            <p className="mt-4 max-w-[44ch] text-lg text-muted">No experience needed. Bring your questions; we&apos;ll bring the patience, the examples and a group of people learning the same thing.</p>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">{who.map(([t, bg]) => <li key={t} className={`rounded-pill px-5 py-3 text-[17px] font-bold ${bg}`}>{t}</li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="get-h" className="py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <span className={kicker}>What you get</span>
          <h2 id="get-h" className={h2}>Five ways to level up</h2>
          {/* Five cards: three on the first row and two wider ones on the second, so no gap is left. */}
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {perks.map(([t, d, bg], i) => (
              <div key={t} className={`lift rounded-com flex flex-col gap-2 bg-com-surface p-6 shadow-sm hover:shadow-md ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === perks.length - 1 ? "sm:max-lg:col-span-2" : ""}`}>
                <span className={`grid size-10 place-items-center rounded-tile font-extrabold ${bg}`}>{i + 1}</span>
                <h3 className="m-0 mt-2 text-xl">{t}</h3><p className="m-0 text-[15px] text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="paths" aria-labelledby="paths-h" className="scroll-mt-18 bg-com-surface py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <span className={kicker}>Learning paths</span>
          <h2 id="paths-h" className={h2}>Start where you are</h2>
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3 md:items-end">
            {paths.map((p) => (
              <article key={p.level} className={`rounded-com flex flex-col gap-3 px-6 pb-8 pt-8 ${p.rise} ${p.bg}`}>
                <div className="flex items-center justify-between"><span className="rounded-pill bg-com-surface px-3 py-1 text-[13px] font-bold">{p.level}</span><p.icon aria-hidden className="size-7" /></div>
                <h3 className="m-0 text-2xl">{p.t}</h3><p className="m-0 text-[15px]">{p.d}</p>
                <Link href="/ai-community/join/" className="mt-3 flex min-h-11 items-center font-extrabold no-underline">Start this path →<span className="sr-only"> ({p.level})</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="events" aria-labelledby="ev-h" className="scroll-mt-18 py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <span className={kicker}>Events &amp; workshops</span>
          <h2 id="ev-h" className={h2}>Coming up</h2>
          <div className="rounded-com mt-[clamp(2rem,4vw,3.5rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4 bg-com-surface p-[clamp(1.5rem,3vw,2.5rem)] shadow-sm">
            <p className="m-0 max-w-[52ch] text-[17px]">The next sessions are being planned. Members hear about them first, with the date, the level and how to join online.</p>
            <Link href="/ai-community/join/" data-track="community_event_register" className="rounded-pill inline-flex min-h-12 items-center gap-2 border-2 border-navy-900 px-5 font-extrabold text-navy-900 no-underline hover:bg-com-tint hover:text-navy-900">Join to hear first<ArrowRight aria-hidden className="size-4.5" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-h" className="bg-com-surface py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content flex flex-wrap gap-8">
          <div className="flex-[1_1_280px]"><span className={kicker}>FAQs</span><h2 id="faq-h" className={`${h2} max-w-[12ch]`}>Good questions</h2></div>
          <div className="flex min-w-0 flex-[2_1_480px] flex-col gap-2">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-com-sm group bg-com-bg px-6">
                <summary className="flex min-h-15 items-center justify-between gap-4 py-3 text-[17px] font-extrabold">{f.q}<Plus aria-hidden className="size-5 flex-none transition-transform group-open:rotate-45" /></summary>
                <p className="mb-4 mt-0 max-w-[64ch] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.filter((f) => !isUnconfirmed(f.a)).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      </section>

      <section id="join" aria-labelledby="join-h" className="px-[var(--spacing-edge)] py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid max-w-[74rem] items-end gap-6 rounded-[27px] bg-com px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.5rem,6vw,5rem)] md:grid-cols-2">
          <h2 id="join-h" className="m-0 text-[clamp(2rem,4.6vw,3.625rem)] leading-[1.02] tracking-[-0.025em] text-navy-900">Your seat is saved. Come learn with us.</h2>
          <div className="flex flex-col items-start gap-3">
            <p className="m-0 max-w-[40ch] text-[17px]">Joining takes a minute. We&apos;ll only email you about community sessions.</p>
            <Link href="/ai-community/join/" className="rounded-pill inline-flex min-h-13 items-center gap-2.5 bg-navy-900 px-6 font-extrabold text-com-surface no-underline hover:bg-navy-700 hover:text-com-surface">Join the community<ArrowRight aria-hidden className="size-4.5" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
