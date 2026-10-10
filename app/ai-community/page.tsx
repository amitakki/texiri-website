import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Placeholder } from "@/components/ui";
import { Breadcrumbs, StickyMobileCTA, isUnconfirmed } from "@/components/sections";

export const metadata: Metadata = {
  title: "TEXIRI AI Community: Learn AI Together",
  description: "The TEXIRI AI Community is a learning community for anyone curious about AI: students, professionals, developers, educators and entrepreneurs. Learning paths, workshops, projects and resources. Started in Vijayapura.",
  alternates: { canonical: "/ai-community/" },
};

// TODO(cms, step 8): LearningPath, CommunityEvent (with Event JSON-LD), CommunityProject, Resource, FAQ.
const Y = "bg-com-tint", B = "bg-[#e3ecfb]", O = "bg-[#fde3c4]";
const who = [["Students", Y], ["Working professionals", B], ["Developers", O], ["Educators", B], ["Entrepreneurs", O], ["The AI-curious", Y]];
const perks = [
  ["Learning paths", "Beginner to advanced, in a sensible order.", Y], ["Live sessions", "Talks and Q&As you can join in person or online.", B],
  ["Hands-on workshops", "Build something real in an afternoon.", O], ["Project showcases", "Show your work and get friendly feedback.", Y],
  ["Mentorship", "Learn from Texiri practitioners who build AI for a living.", B], ["Resource library", "Notes, notebooks and recordings, all in one place.", O],
];
const paths = [ // [TO CONFIRM] curriculum
  { level: "Beginner", t: "AI from zero", d: "No code needed to start.", topics: ["What AI is (and isn't)", "Prompting well", "Your first no-code project"], bg: Y },
  { level: "Intermediate", t: "Build with Python", d: "Comfortable with basics? Start building.", topics: ["Python for data", "Machine learning foundations", "Working with LLM APIs"], bg: O },
  { level: "Advanced", t: "Ship it", d: "For people already building models.", topics: ["RAG and fine-tuning", "MLOps and deployment", "Evaluation and responsible AI"], bg: B },
];
const events = [ // placeholders until CMS events exist
  { type: "Workshop", level: "Beginner", where: "Vijayapura + online", bg: Y },
  { type: "Talk", level: "All levels", where: "Online", bg: B },
  { type: "Project night", level: "Intermediate", where: "Vijayapura", bg: O },
];
const resources = [["Starter reading list", "Where to begin, in plain English.", "Guide"], ["Session recordings", "Catch up on talks you missed.", "Video"], ["Hands-on notebooks", "Run, break and fix real code.", "Notebook"], ["AI glossary", "From \u201cagent\u201d to \u201czero-shot\u201d.", "Reference"]];
const faqs = [
  { q: "Do I need to know how to code?", a: "No. The beginner path starts without code. You can pick up Python later if you want to." },
  { q: "Is it free to join?", a: "[TO CONFIRM] Membership and fees for events and workshops." },
  { q: "Where do sessions happen?", a: "In Vijayapura and online. Each event lists its format. [TO CONFIRM]" },
  { q: "Will I get sales emails from Texiri?", a: "No. Community members only receive community updates, and you can unsubscribe at any time." },
  { q: "Can I present my own project?", a: "Yes, please. Showcases are open to members at every level." },
];
const kicker = "mb-3 block text-[13px] font-bold uppercase tracking-[0.08em] text-com-ink";
const h2 = "m-0 text-[clamp(1.875rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]";
const joinBtn = "rounded-pill inline-flex min-h-13 items-center gap-2.5 bg-com px-6 font-extrabold text-navy-900 no-underline hover:bg-com-600 hover:text-navy-900";

export default function CommunityPage() {
  return (
    <div className="bg-com-bg">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Services", href: "/ai-services/" }, { label: "AI Community", href: "/ai-community/" }]} />

      <section aria-labelledby="hero-h" className="pb-[clamp(3.5rem,7vw,6rem)] pt-[clamp(2rem,5vw,4.5rem)]">
        <div className="container-content grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
          <div>
            <span className="rounded-pill mb-6 inline-flex items-center gap-2 bg-com-tint px-3.5 py-1.5 text-[13px] font-bold text-com-ink"><span aria-hidden className="size-2 rounded-full bg-com-orange" />TEXIRI AI Community · started in Vijayapura</span>
            <h1 id="hero-h" className="m-0 text-[clamp(2.625rem,6vw,5.25rem)] leading-none tracking-[-0.03em]">
              <span className="block">Learn AI.</span><span className="block">Build with AI.</span><span className="block text-com-blue">Grow together.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-lead text-muted">A community for anyone curious about AI, whether you&apos;re opening your first notebook or shipping models at work. It began as the Vijayapura AI Club and is open to learners everywhere.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ai-community/join/" className={joinBtn} data-track="community_join_click">Join the community<ArrowRight aria-hidden className="size-4.5" /></Link>
              <a href="#events" className="rounded-pill inline-flex min-h-13 items-center border-2 border-navy-900 px-6 font-extrabold text-navy-900 no-underline hover:bg-com-tint hover:text-navy-900">See upcoming events</a>
            </div>
          </div>
          <div className="grid grid-cols-[3fr_2fr] gap-3">
            <div role="img" aria-label="Placeholder: photo of community members learning together at a workshop" className="rounded-com row-span-2 flex min-h-90 items-end bg-[repeating-linear-gradient(135deg,#fff0c7_0_12px,#ffe6a3_12px_24px)] p-3"><span className="rounded-md bg-com-surface px-2 py-1 font-mono text-[11px] text-muted">photo · workshop in progress</span></div>
            <div role="img" aria-label="Placeholder: photo of a learner presenting a project" className="rounded-com flex min-h-42 items-end bg-[repeating-linear-gradient(135deg,#e3ecfb_0_12px,#cfdcf5_12px_24px)] p-3"><span className="rounded-md bg-com-surface px-2 py-1 font-mono text-[11px] text-muted">photo · project demo</span></div>
            <div className="rounded-com flex min-h-42 flex-col justify-end gap-1 bg-com-blue p-4 text-com-surface"><strong className="text-[34px] leading-none">[X]</strong><span className="text-sm">members learning together</span><span className="mt-1 self-start rounded-md bg-com-surface px-2 py-0.5 text-[11px] font-bold tracking-[0.06em] text-navy-900">TO VERIFY</span></div>
          </div>
        </div>
      </section>

      <section id="about" aria-labelledby="who-h" className="scroll-mt-18 bg-com-surface py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-content grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className={kicker}>Who it&apos;s for</span>
            <h2 id="who-h" className={`${h2} max-w-[16ch]`}>Everyone curious about AI. Really.</h2>
            <p className="mt-4 max-w-[44ch] text-lg text-muted">No experience needed. Bring your questions; we&apos;ll bring the patience, the examples and a room full of people learning the same thing.</p>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">{who.map(([t, bg]) => <li key={t} className={`rounded-pill px-5 py-3 text-[17px] font-bold ${bg}`}>{t}</li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="get-h" className="py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <span className={kicker}>What you get</span>
          <h2 id="get-h" className={h2}>Six ways to level up</h2>
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(([t, d, bg], i) => (
              <div key={t} className="rounded-com flex flex-col gap-2 bg-com-surface p-6 shadow-sm">
                <span className={`grid size-10 place-items-center rounded-xl font-extrabold ${bg}`}>{i + 1}</span>
                <h3 className="m-0 mt-2 text-xl">{t}</h3><p className="m-0 text-[15px] text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="paths" aria-labelledby="paths-h" className="scroll-mt-18 bg-com-surface py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <div className="mb-3 flex flex-wrap items-center gap-3"><span className={`${kicker} mb-0`}>Learning paths</span><Placeholder>CURRICULUM TO CONFIRM</Placeholder></div>
          <h2 id="paths-h" className={h2}>Start where you are</h2>
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3">
            {paths.map((p) => (
              <article key={p.level} className={`rounded-com flex flex-col gap-3 px-6 py-8 ${p.bg}`}>
                <span className="rounded-pill self-start bg-com-surface px-3 py-1 text-[13px] font-bold">{p.level}</span>
                <h3 className="m-0 text-2xl">{p.t}</h3><p className="m-0 text-[15px]">{p.d}</p>
                <ul className="m-0 mt-2 flex flex-1 list-none flex-col gap-1.5 p-0 text-[15px]">{p.topics.map((t) => <li key={t} className="flex gap-2"><span aria-hidden>→</span>{t}</li>)}</ul>
                <Link href="/ai-community/join/" className="mt-3 flex min-h-11 items-center font-extrabold no-underline">Start this path →<span className="sr-only"> ({p.level})</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="events" aria-labelledby="ev-h" className="scroll-mt-18 py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <div className="mb-3 flex flex-wrap items-center gap-3"><span className={`${kicker} mb-0`}>Events &amp; workshops</span><Placeholder>FROM CMS · PLACEHOLDERS</Placeholder></div>
          <h2 id="ev-h" className={h2}>Coming up</h2>
          <ul className="m-0 mt-[clamp(2rem,4vw,3.5rem)] flex list-none flex-col gap-3 p-0">
            {events.map((e, i) => (
              <li key={i} className="rounded-com grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 bg-com-surface p-4 shadow-sm sm:grid-cols-[84px_minmax(0,1fr)_auto]">
                <div className={`rounded-xl py-2.5 text-center ${e.bg}`}><div className="text-xs font-bold uppercase">Date</div><div className="text-xl font-extrabold leading-tight">TBC</div></div>
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap gap-1.5"><span className="rounded-pill bg-com-tint px-2.5 py-0.5 text-xs font-bold">{e.type}</span><span className="rounded-pill bg-[#e3ecfb] px-2.5 py-0.5 text-xs font-bold">{e.level}</span></div>
                  <h3 className="m-0 text-[19px]">[Event title]</h3><div className="text-sm text-muted">[Date and time] · {e.where}</div>
                </div>
                <Link href="/ai-community/join/" data-track="community_event_register" className="rounded-pill col-span-2 inline-flex min-h-11 items-center justify-start border-2 border-navy-900 px-4 font-extrabold text-navy-900 no-underline hover:bg-com-tint sm:col-span-1">Register<span className="sr-only"> for this event</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" aria-labelledby="pr-h" className="bg-com-surface py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content">
          <span className={kicker}>Projects &amp; showcases</span>
          <h2 id="pr-h" className={h2}>Built by members</h2>
          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3">
            {[["Computer vision", "Intermediate"], ["Chatbot", "Beginner"], ["Forecasting", "Advanced"]].map(([tag, level]) => (
              <article key={tag} className="rounded-com flex flex-col overflow-hidden bg-com-bg">
                <div role="img" aria-label="Placeholder: member project screenshot" className="flex aspect-[16/10] items-end bg-[repeating-linear-gradient(135deg,#ffe6a3_0_12px,#fff0c7_12px_24px)] p-2.5"><span className="rounded-md bg-com-surface px-1.5 py-0.5 font-mono text-[11px] text-muted">project screenshot</span></div>
                <div className="flex flex-col gap-1.5 px-6 pb-6 pt-4"><span className="text-xs font-bold uppercase tracking-[0.06em] text-com-ink">{tag}</span><h3 className="m-0 text-[19px]">[Project title]</h3><span className="text-sm text-muted">by [Member name] · {level}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" aria-labelledby="res-h" className="py-[clamp(4rem,9vw,7.5rem)]">
        <div className="container-content grid gap-8 lg:grid-cols-2">
          <div><span className={kicker}>Resources</span><h2 id="res-h" className={`${h2} max-w-[14ch]`}>A library that grows with you</h2></div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {resources.map(([t, d, type]) => (
              <li key={t} className="rounded-com-sm flex items-center justify-between gap-4 bg-com-surface px-6 py-4"><div><strong className="text-[17px]">{t}</strong><div className="text-sm text-muted">{d}</div></div><span className="rounded-pill whitespace-nowrap bg-com-tint px-3 py-1 text-xs font-bold">{type}</span></li>
            ))}
          </ul>
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
            <p className="m-0 max-w-[40ch] text-[17px]">Joining takes a minute. We&apos;ll only email you about community sessions and resources.</p>
            <Link href="/ai-community/join/" className="rounded-pill inline-flex min-h-13 items-center gap-2.5 bg-navy-900 px-6 font-extrabold text-com-surface no-underline hover:bg-navy-700 hover:text-com-surface">Join the community<ArrowRight aria-hidden className="size-4.5" /></Link>
          </div>
        </div>
      </section>
      <StickyMobileCTA vertical="community" label="Join the community" href="/ai-community/join/" />
    </div>
  );
}
