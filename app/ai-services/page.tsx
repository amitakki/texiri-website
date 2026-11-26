import type { Metadata } from "next";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { techLogos } from "@/lib/tech-logos";
import {
  Activity, ArrowRight, BrainCircuit, Check, CircleCheck, ClipboardCheck, Cloud, Compass, EyeOff, FileSearch, FileText, FlaskConical, Globe,
  KeyRound, Layers, ListChecks, MessageSquare, Scale, ScanSearch, Server, ShieldCheck, Sparkles, TriangleAlert, type LucideIcon,
} from "lucide-react";
import { Button, H2, Kicker, Section, SiteImage } from "@/components/ui";
import { Breadcrumbs, CTABand, FAQAccordion } from "@/components/sections";
import { AiReferenceArchitecture } from "@/components/diagrams";

/*
 * AI Services, second redesign (Nov 2026, content decision A9): governed AI built on the client's own data, for any
 * industry and any core system (not SAP-specific). Navy and AI blue set the vertical apart from the orange SAP pages, but
 * light and dark bands alternate so the page isn't one blue wash. Every claim comes from a confirmed decision (A1–A8, X4);
 * the wording that is new is listed in A9, confirmed by the AI practice lead.
 */

export const metadata: Metadata = {
  title: "AI Services: Governed AI, from Pilot to Production",
  description: "Assistants, agents and machine-learning models built on your own data, run in your cloud tenancy and evaluated on every release. Start with a one-day readiness workshop or a production-readiness review.",
  alternates: { canonical: "/ai-services/" },
};

const serviceJsonLd = { "@context": "https://schema.org", "@type": "Service", name: "AI Services", serviceType: "Artificial intelligence consulting", provider: { "@type": "Organization", name: "Texiri Solutions" } };

const workshop = { label: "Request an AI readiness workshop", href: "/contact/?type=ai" };
const review = { label: "Book a production-readiness review", href: "/contact/?type=ai-review" };

// `light` marks a section on the light page background: AI blue steps down to its darker `ai-ink` so it keeps its contrast.
const AiKicker = ({ children, light }: { children: ReactNode; light?: boolean }) => <Kicker vertical="ai" onNavy={!light}>{children}</Kicker>;
const Lead = ({ children, light }: { children: ReactNode; light?: boolean }) => <p className={`mb-0 mt-5 max-w-[62ch] text-lead ${light ? "text-muted" : "text-on-navy-muted"}`}>{children}</p>;
const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => <span className={`block text-xs font-semibold uppercase tracking-[0.08em] ${className}`}>{children}</span>;

/**
 * A full-width band: a navy-by-default Section whose anchor clears the sticky header. The page alternates light and dark
 * so it doesn't read as one blue wash: navy is kept for the hero, the pilots illustration, the engagement steps, the
 * architecture and the closing call to action.
 */
const Band = ({ tone = "navy", className = "", ...props }: ComponentProps<typeof Section>) => <Section tone={tone} className={`scroll-mt-18 ${className}`} {...props} />;

// ── Hero ──────────────────────────────────────────────────────────────────────────────────────────
const trust: [LucideIcon, string][] = [[Cloud, "Runs in your tenancy"], [EyeOff, "No training on your data"], [FlaskConical, "Evaluated on every release"], [ShieldCheck, "Aligned with EU AI Act, ISO/IEC 42001, GDPR"]];

const Cite = ({ n }: { n: number }) => <span className="border border-ai/60 px-1 text-[11px] font-bold leading-4 text-ai">{n}</span>;
const sources = ["Travel and expense policy", "Finance approval matrix"];
const trace: { icon: LucideIcon; t: string; d: ReactNode }[] = [
  { icon: MessageSquare, t: "Question", d: <>“Who approves a travel claim above my limit?”<span className="mt-0.5 block text-xs text-on-navy-muted">Asked by a team manager</span></> },
  { icon: KeyRound, t: "Permission check", d: "Only content this user can already open is searched." },
  { icon: FileSearch, t: "Retrieval", d: <span className="mt-1 flex flex-wrap gap-1.5">{sources.map((s, i) => <span key={s} className="inline-flex items-center gap-1.5 border border-on-navy/30 px-2 py-0.5 text-[13px]"><Cite n={i + 1} />{s}</span>)}</span> },
  {
    icon: FileText, t: "Answer with citations",
    d: <><span className="sr-only">An answer that cites both sources.</span><span aria-hidden className="mt-1.5 flex flex-col gap-1.5">{([["78%", 1], ["58%", 2]] as const).map(([w, n]) => <span key={n} className="flex items-center gap-1.5"><span className="h-2 bg-on-navy/25" style={{ width: w }} /><Cite n={n} /></span>)}</span></>,
  },
  { icon: Activity, t: "Traced and evaluated", d: "Prompt, sources and answer are logged, and groundedness is evaluated." },
];

/** Hero visual: one assistant answer, step by step, with the controls this page describes. Illustrative, no data. */
function AnswerTrace() {
  return (
    <figure aria-labelledby="trace-cap" className="hero-enter-late m-0 border-2 border-ai/50 bg-navy-800/85 shadow-[0_0_90px_-30px_var(--color-ai)]">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ai/25 px-5 py-4">
        <span id="trace-cap"><Label className="text-on-navy-muted">How a governed answer is made</Label><strong className="text-lg">Employee knowledge search</strong></span>
        <span className="border border-on-navy/40 px-2.5 py-1 text-xs font-bold text-on-navy-muted">Illustrative</span>
      </figcaption>
      <ol className="ai-gate relative m-0 list-none px-5 py-2">
        {trace.map(({ icon: Icon, t, d }, i) => (
          <li key={t} style={{ "--i": i } as CSSProperties} className="relative grid grid-cols-[28px_1fr] gap-3 py-3">
            {i < trace.length - 1 && <span aria-hidden className="absolute bottom-[-12px] left-[13px] top-[40px] border-l-2 border-dashed border-ai/40" />}
            <span aria-hidden className="grid size-7 place-items-center border border-ai/60 bg-navy-900 text-ai"><Icon className="size-4" /></span>
            <div className="min-w-0 text-[15px]"><strong className="block">{t}</strong><div className="mt-0.5 text-on-navy-muted">{d}</div></div>
          </li>
        ))}
      </ol>
      <div style={{ "--i": trace.length } as CSSProperties} className="ai-gate-item mx-5 mb-5 flex items-center gap-3 bg-ai px-4 py-3 font-extrabold text-navy-900"><Cloud aria-hidden className="size-5" />In your tenancy, region-pinned</div>
    </figure>
  );
}

// ── Where to start (content decisions A1, A7) ─────────────────────────────────────────────────────
const reviewAreas: [LucideIcon, string][] = [[FlaskConical, "Evaluation"], [ShieldCheck, "Security"], [Layers, "Architecture"], [Activity, "MLOps"]];
const routes = [
  {
    icon: Compass, when: "No AI in production yet", t: "AI readiness workshop", d: "One day with your team to find the use cases worth doing.",
    // Shows what the workshop produces, not how long it takes: a big "1 day" read as "AI in a day". Illustrative, no data.
    visual: (
      <figure aria-label="Example of a ranked use-case list" className="m-0">
        <Label className="mb-2 text-muted">Example: a ranked list</Label>
        <ol className="m-0 list-none p-0">
          {([["Customer-service assistant", "Data ready"], ["Demand forecasting", "Needs data work"], ["Document intelligence", "Later"]] as const).map(([n, s], i) => (
            <li key={n} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border-t border-rule py-2.5 text-[15px] last:border-b">
              <span className="text-sm font-extrabold text-ai-ink">0{i + 1}</span><strong>{n}</strong><span className="text-[13px] font-semibold text-muted">{s}</span>
            </li>
          ))}
        </ol>
      </figure>
    ),
    get: ["A ranked list of use cases", "The data each one needs", "A proposed first pilot"], cta: workshop, track: "ai_workshop_click",
  },
  {
    icon: ScanSearch, when: "A pilot that stalled", t: "Production-readiness review", d: "We test the pilot you already have, in four areas. You don't need a workshop first.",
    // Same row style as the workshop's list, so the two halves of the panel balance.
    visual: (
      <div>
        <Label className="mb-2 text-muted">Tested in four areas</Label>
        <ul className="m-0 list-none p-0">
          {reviewAreas.map(([Icon, a]) => <li key={a} className="flex items-center gap-3 border-t border-rule py-2.5 text-[15px] last:border-b"><Icon aria-hidden className="size-5 flex-none text-ai-ink" /><strong>{a}</strong></li>)}
        </ul>
      </div>
    ),
    get: ["Findings in all four areas", "A prioritised plan to production"], cta: review, track: "ai_review_click",
  },
];

// ── Why pilots stall ──────────────────────────────────────────────────────────────────────────────
const stalls = [
  { t: "Use case", stall: "The pilot starts from the technology, not a business problem with a measurable target.", fix: "Every use case is ranked and gets a baseline and target KPI before anything is built." },
  { t: "Data", stall: "Gaps, silos and one-off extracts mean the model can't be rebuilt or trusted next month.", fix: "A data readiness analysis inventories each source and reports its quality and access." },
  { t: "Governance", stall: "Without evaluation, access control and documentation, risk teams won't sign off production use.", fix: "Evaluation suites, permission filtering, model cards and a risk register are part of the delivery." },
];

// ── What we build (A4, A5: sectors and source data per use case; no outcome figures yet) ───────────
type UseCase = { name: string; sectors: string; problem: string; approach: string; data: string; kpi: string };
// `id` is the anchor the AI Services menu, footer and old sub-page redirects point to (content decision A2).
const builds: { id: string; icon: LucideIcon; t: string; d: string; caps: string[]; uses: UseCase[] }[] = [
  {
    id: "generative-ai", icon: Sparkles, t: "Generative AI & agents", d: "Language models grounded in your own knowledge, and agents that act through defined tools.",
    caps: ["RAG knowledge systems with citations", "Agents with tool calling, MCP servers into your systems", "Document intelligence with human review", "LLM fine-tuning (GPT, Llama, Mistral)", "LLM gateway: routing, semantic cache, token budgets"],
    uses: [
      { name: "Customer-service assistant", sectors: "Utilities · Financial services", problem: "Agents search scattered knowledge for answers.", approach: "RAG over approved content, with citations", data: "Knowledge base and past service cases", kpi: "First-contact resolution rate" },
      { name: "Document intelligence", sectors: "Real estate · Financial services", problem: "Contracts and invoices are keyed in by hand.", approach: "Extraction, with a person's review before anything is posted to your ERP", data: "Contracts and invoices", kpi: "Processing time per document" },
      { name: "Employee knowledge search", sectors: "All sectors", problem: "Policies and procedures are hard to find.", approach: "Conversational search; each user only sees what they can already open", data: "Policies and process guides", kpi: "Time to answer" },
    ],
  },
  {
    id: "machine-learning", icon: BrainCircuit, t: "Machine learning", d: "Models that predict and optimise, with reasons people can read.",
    caps: ["Predictive analytics", "Time-series forecasting", "Optimisation", "Explainable AI"],
    uses: [
      { name: "Predictive maintenance", sectors: "Oil & gas · Utilities · Pharma", problem: "Unplanned failures on critical assets.", approach: "Failure-risk models whose scores feed back into asset management", data: "Maintenance work orders and sensor data", kpi: "Unplanned downtime hours" },
      { name: "Demand forecasting", sectors: "Retail · Manufacturing", problem: "Planners rely on spreadsheets and gut feel.", approach: "Time-series models with explainable drivers, feeding forecasts back to planning", data: "Sales orders, deliveries and stock", kpi: "Forecast accuracy (MAPE)" },
      { name: "Churn and risk prediction", sectors: "Retail · Financial services", problem: "Customers leave without warning.", approach: "Classification models with explainability", data: "Customer, order and payment history from ERP and CRM", kpi: "Retention rate" },
    ],
  },
];

// ── Engagement (content decision A1: no duration per step; each engagement is scoped with the client) ──
// The steps brighten from the navy up to a light final step as they rise towards production; AI blue is only the top rule.
const stepFill = ["bg-on-navy/5", "bg-on-navy/10", "bg-on-navy/15", "bg-on-navy/20", "bg-ground text-ink"];
const steps = [
  // The workshop ranks the long list; step 3 narrows it once the data has been checked.
  { name: "AI readiness workshop", out: ["Goals and constraints", "Ranked list of use cases"] },
  { name: "Data readiness analysis", out: ["Data inventory", "Quality and access report"] },
  { name: "Prioritise and set pilot KPIs", out: ["Shortlist checked against the data", "Baseline and target KPIs"] },
  { name: "Pilot", out: ["Working pilot", "Evaluation against KPIs"] },
  { name: "Scale", out: ["Production deployment", "MLOps and monitoring", "Adoption and handover training"] },
];

// ── Governance (content decisions X4, A6: confirmed by the AI practice lead) ───────────────────────
const dataPaths = [
  { icon: Cloud, t: "Managed model APIs", sub: "GPT, Bedrock, Vertex AI", d: "Called through enterprise endpoints in your cloud account, under terms that exclude training on your prompts and outputs." },
  { icon: Server, t: "Self-hosted models", sub: "Llama, Mistral, fine-tuned models", d: "Run inside your tenancy. Prompts, outputs and fine-tuned weights never leave it." },
];
// Permission filtering in retrieval is answered below and listed in the evidence pack, so it isn't a third data path.
const riskQuestions: [LucideIcon, string, string][] = [
  [EyeOff, "Is our data used to train models?", "No, on either model path above."],
  [KeyRound, "Can a user see content they shouldn't?", "No. Retrieval checks each user's roles and access lists before the model sees anything."],
  [FlaskConical, "How do we know it is still accurate?", "Accuracy, groundedness, bias and drift are tested before go-live and on every release, and evaluations keep running in production."],
  [Globe, "Where does it run?", "In the region and tenancy you choose."],
  [ClipboardCheck, "How does it map to the EU AI Act, ISO/IEC 42001 and GDPR?", "Each use case is risk-classified under the EU AI Act and documented, you get input for your GDPR data-protection impact assessment, and our AI management practices are mapped to ISO/IEC 42001."],
];
const evidence: [LucideIcon, string, string][] = [
  [FileText, "Model cards", "One per use case: purpose, data, limits and owner."],
  [ListChecks, "Evaluation suites", "Repeatable tests your team can rerun on every release."],
  [KeyRound, "Permission filtering in retrieval", "Role and access-list checks enforced before the model sees content."],
  [Scale, "Risk register & DPIA input", "EU AI Act risk classification and input to your data-protection impact assessment."],
];

// ── Technology (content decisions A3, A8) ──────────────────────────────────────────────────────────
const techRules = ["We build on the cloud you already run, not the one we prefer.", "One model platform per client, so models, monitoring and costs live in one place.", "Workloads stay in your tenancy; open models when data must not leave it."];
const techGroups = [
  { t: "Cloud AI platforms", items: ["Vertex AI", "Azure ML", "Databricks", "Amazon Bedrock"] },
  { t: "Foundation models", items: ["GPT", "Llama", "Mistral"] },
  { t: "MLOps & data", items: ["MLflow", "Kubeflow", "TFX", "Airflow", "Spark", "Kafka", "Kubernetes"] },
];

function TechChip({ name }: { name: string }) {
  const logo = techLogos[name];
  const parts = !logo || "src" in logo ? [] : "parts" in logo ? logo.parts : [[logo.hex, logo.path]];
  return (
    // Brand logos keep their own colours, so the chips sit on the light page; several logos are near-black.
    <li className="inline-flex items-center gap-2 border border-hairline bg-ground px-3.5 py-2 text-[15px] font-semibold text-ink">
      {logo && ("src" in logo
        ? <Image src={logo.src} alt="" width={18} height={18} unoptimized className="size-[18px] shrink-0" />
        : <svg aria-hidden viewBox={logo.viewBox ?? "0 0 24 24"} className="size-[18px] shrink-0">{parts.map(([hex, d]) => <path key={d} fill={`#${hex}`} d={d} />)}</svg>)}
      {name}
    </li>
  );
}

const faqs = [
  { q: "We have no AI in production yet. Where do we start?", a: "With the one-day readiness workshop. You leave with a ranked list of use cases, the data each one needs and a proposed first pilot. The data readiness analysis that follows confirms the shortlist." },
  { q: "We already have a pilot that stalled. Can you help?", a: "Yes. A production-readiness review tests your pilot against evaluation, security, architecture and MLOps, and ends with a prioritised plan to get it into production. You don't need to start with the workshop." },
  { q: "Can AI work with the systems we already have?", a: "Yes. Agents reach your ERP, CRM and other business systems through MCP servers and APIs, and the use cases we build run on the data those systems already hold. Where a person must check a result first, as with invoices, the review comes before anything is written back." },
  { q: "How long does an engagement take?", a: "It depends on the use case and the state of your data, so each engagement is scoped with you. The readiness workshop takes one day." },
  { q: "Do you certify EU AI Act or ISO/IEC 42001 compliance?", a: "No. We classify each use case by risk, document data and evaluation results, and align delivery with ISO/IEC 42001. Certification and legal sign-off stay with you and your auditors." },
  { q: "Do you help our people adopt the tools?", a: "Yes. Adoption training for users and handover training for your technical team are part of the scale phase." },
];

const iconCell = "grid size-11 flex-none place-items-center bg-navy-900 text-ai";

export default function AiServicesPage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="surface-dark ai-hero-bg bg-navy-900 text-on-navy">
        <Breadcrumbs tone="navy" items={[{ label: "Home", href: "/" }, { label: "AI Services", href: "/ai-services/" }]} />
        <div className="container-content grid items-center gap-[clamp(2.5rem,5vw,5rem)] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1.05fr_1fr]">
          <div className="hero-enter">
            <span className="mb-6 inline-flex items-center gap-2 text-kicker font-semibold uppercase tracking-[0.1em] text-ai"><span aria-hidden className="ai-pulse size-2.5 bg-ai" />Texiri AI Services</span>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[14ch] text-display text-on-navy">AI that gets past the pilot.</h1>
            <p className="mb-0 mt-6 max-w-[54ch] text-lead text-on-navy-muted">Assistants, agents and machine-learning models built on your own data. They run in your cloud tenancy, are tested on every release, and come with the evidence your risk team needs to sign them off.</p>
            {/* Stacked at equal width: side by side they don't fit the hero column and wrap unevenly. */}
            <div className="mt-8 grid gap-3 sm:w-max">
              <Button href={workshop.href} variant="ai" arrow data-track="ai_workshop_click">{workshop.label}</Button>
              <Button href={review.href} variant="outline-on-navy" data-track="ai_review_click">{review.label}</Button>
            </div>
            <ul className="m-0 mt-9 grid list-none gap-x-6 gap-y-3 border-t border-on-navy/20 p-0 pt-6 sm:grid-cols-2">
              {trust.map(([Icon, t]) => <li key={t} className="flex items-center gap-3 text-[15px] font-bold"><Icon aria-hidden className="size-5 flex-none text-ai" />{t}</li>)}
            </ul>
          </div>
          <AnswerTrace />
        </div>
      </section>

      <Band id="start" labelledBy="start-h" tone="ground">
        <AiKicker light>Where to start</AiKicker>
        <H2 id="start-h">Two ways in, depending on where you are.</H2>
        <Lead light>Both end with a plan you can act on, and both lead to the same governed path to production.</Lead>
        {/* One split panel, not two cards: the reader picks a side. */}
        <div className="relative mt-[clamp(2.5rem,5vw,3.5rem)] grid border-2 border-ink bg-surface lg:grid-cols-2">
          <span aria-hidden className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-ink bg-ground font-extrabold lg:grid">or</span>
          {routes.map((r, i) => (
            <article key={r.t} aria-labelledby={`${r.track}-h`} className={`flex flex-col p-[clamp(1.5rem,3.5vw,2.75rem)] ${i ? "border-t-2 border-ink lg:border-l-2 lg:border-t-0" : ""}`}>
              <div className="flex items-center gap-3"><r.icon aria-hidden className="size-6 flex-none text-ai-ink" /><Label className="text-ai-ink">Starting point: {r.when}</Label></div>
              <h3 id={`${r.track}-h`} className="m-0 mt-4 text-[clamp(1.5rem,2.6vw,2rem)]">{r.t}</h3>
              <p className="m-0 mt-2 max-w-[44ch] text-muted">{r.d}</p>
              <div className="flex min-h-36 flex-col justify-center py-6">{r.visual}</div>
              <Label className="text-muted">You leave with</Label>
              <ul className="m-0 mt-2 flex list-none flex-col p-0">
                {r.get.map((g) => <li key={g} className="grid grid-cols-[24px_1fr] gap-2 border-t border-rule py-2.5 font-semibold"><Check aria-hidden className="mt-0.5 size-5 text-ai-ink" />{g}</li>)}
              </ul>
              <div className="mt-auto pt-7"><Button href={r.cta.href} variant={i ? "secondary" : "navy"} arrow data-track={r.track}>{r.cta.label}</Button></div>
            </article>
          ))}
        </div>
      </Band>

      <Band labelledBy="stall-h">
        <AiKicker>Why pilots stall</AiKicker>
        <H2 id="stall-h" className="max-w-[24ch]">Most AI pilots stall at one of three checkpoints.</H2>
        <Lead>Our engagement clears all three before a pilot is approved, so the one you approve can go live.</Lead>
        {/* Desktop only: below lg its labels shrink past reading size, and the three columns below say the same.
            bg override: the slot's light default would show through the translucent border. */}
        <SiteImage {...images.aiPilots} ratio="aspect-[2/1]" className="mt-[clamp(1.5rem,3vw,2rem)] hidden border-2 border-on-navy/15 bg-navy-800! lg:block" sizes="(min-width: 1280px) 1280px, 100vw" />
        {/* Open columns, no boxes. Orange marks the stall and blue the fix, as in the illustration above. */}
        <ol className="m-0 mt-[clamp(2rem,4vw,3rem)] grid list-none p-0 md:grid-cols-3">
          {stalls.map((s, i) => (
            <li key={s.t} className="border-t-2 border-on-navy/20 py-7 first:border-t-0 first:pt-0 md:border-l-2 md:border-t-0 md:px-7 md:py-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
              <div className="flex items-end gap-3">
                <span aria-hidden className="text-[clamp(2.75rem,4.5vw,3.5rem)] font-extrabold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--color-ai)]">0{i + 1}</span>
                <h3 className="m-0 text-[22px] leading-none">{s.t}</h3>
              </div>
              <div className="mt-6 grid grid-cols-[22px_1fr] gap-2.5">
                <TriangleAlert aria-hidden className="mt-0.5 size-5 text-accent" />
                <div><Label className="text-accent">Where it stalls</Label><p className="m-0 mt-1.5 text-[15px] text-on-navy-muted">{s.stall}</p></div>
              </div>
              <div className="mt-5 grid grid-cols-[22px_1fr] gap-2.5">
                <CircleCheck aria-hidden className="mt-0.5 size-5 text-ai" />
                <div><Label className="text-ai">How we clear it</Label><p className="m-0 mt-1.5 text-[15px] font-semibold">{s.fix}</p></div>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      <Band labelledBy="build-h" tone="ground">
        <AiKicker light>What we build</AiKicker>
        <H2 id="build-h" className="max-w-[24ch]">Six places to start, and the data they run on.</H2>
        <Lead light>Most of the data these need already sits in your ERP, CRM, document stores and sensors. Each one is measured against a KPI agreed before anything is built.</Lead>
        {builds.map((b) => (
          <div key={b.id} id={b.id} className="mt-[clamp(2.5rem,5vw,3.5rem)] grid scroll-mt-18 gap-x-12 gap-y-8 border-t-2 border-ink pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
            <div>
              <div className="flex items-center gap-3"><span className={iconCell}><b.icon aria-hidden className="size-5" /></span><h3 className="m-0 text-[clamp(1.375rem,2.2vw,1.75rem)]">{b.t}</h3></div>
              <p className="m-0 mt-4 text-muted">{b.d}</p>
              <Label className="mt-6 text-muted">Capabilities</Label>
              <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">{b.caps.map((c) => <li key={c} className="bg-surface px-2.5 py-1 text-[14px] font-semibold">{c}</li>)}</ul>
            </div>
            {/* Spec-sheet rows rather than cards. */}
            <ul className="m-0 list-none p-0">
              {b.uses.map((u) => (
                <li key={u.name} className="grid gap-x-8 gap-y-4 border-b border-rule py-6 first:pt-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div>
                    <h4 className="m-0 text-xl">{u.name}</h4>
                    <Label className="mt-1.5 text-ai-ink">{u.sectors}</Label>
                    <p className="m-0 mt-3 text-[15px] text-muted">{u.problem}</p>
                  </div>
                  <dl className="m-0 grid grid-cols-[80px_1fr] gap-x-3 gap-y-2.5 text-[15px]">
                    <dt className="pt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">Approach</dt><dd className="m-0">{u.approach}</dd>
                    <dt className="pt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">Built on</dt><dd className="m-0">{u.data}</dd>
                    <dt className="pt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-ai-ink">KPI</dt><dd className="m-0 font-bold">{u.kpi}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Band>

      <Band id="engagement" labelledBy="eng-h">
        <AiKicker>How an engagement runs</AiKicker>
        <H2 id="eng-h">Five steps. Each one ends with something you keep.</H2>
        <Lead>Each engagement is scoped with you, so we don&apos;t quote fixed durations. What is fixed is what you hold at the end of every step.</Lead>
        <ol aria-label="AI engagement model: five steps" className="m-0 mt-[clamp(2.5rem,5vw,3.5rem)] grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              // From lg the columns rise step by step, like a staircase to production; the last one is lit.
              <li key={s.name} style={{ "--i": i } as CSSProperties} className={`flex flex-col border-t-4 border-ai p-5 lg:min-h-[calc(15rem+var(--i)*2.5rem)] ${stepFill[i]} ${last ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <span className="text-sm font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 mt-2 text-xl leading-tight">{s.name}</h3>
                <Label className="mt-5">You keep</Label>
                <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0 text-[15px] font-semibold">
                  {s.out.map((o) => <li key={o} className="grid grid-cols-[20px_1fr] gap-1.5"><Check aria-hidden className={`mt-0.5 size-4 ${last ? "text-ai-ink" : "text-ai"}`} />{o}</li>)}
                </ul>
              </li>
            );
          })}
        </ol>
        <p className="m-0 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-on-navy/20 pt-5 text-[17px]">
          <ScanSearch aria-hidden className="size-5 text-ai" />
          <span><strong>Already have a pilot?</strong> <span className="text-on-navy-muted">A production-readiness review tests it against evaluation, security, architecture and MLOps first.</span></span>
          <Link href={review.href} data-track="ai_review_click" className="inline-flex items-center gap-1.5 font-extrabold text-ai no-underline hover:text-on-navy">Book a review<ArrowRight aria-hidden className="size-4" /></Link>
        </p>
      </Band>

      <Band id="governance" labelledBy="gov-h" tone="ground">
        <AiKicker light>Security &amp; governance</AiKicker>
        <H2 id="gov-h" className="max-w-[24ch]">The questions your risk team will ask, answered up front.</H2>
        <Lead light>We help you meet the EU AI Act, ISO/IEC 42001 and GDPR, and hand over the evidence. We don&apos;t certify compliance: certification and legal sign-off stay with you and your auditors.</Lead>

        <h3 className="mb-0 mt-[clamp(2.5rem,5vw,3.5rem)] text-[22px]">Where your data goes</h3>
        {/* One routing table: each path, and what happens to your data on it. */}
        <ul className="m-0 mt-4 list-none border-2 border-ink bg-surface p-0">
          {dataPaths.map(({ icon: Icon, t, sub, d }) => (
            <li key={t} className="grid items-center gap-x-6 gap-y-3 border-b border-rule px-[clamp(1.25rem,3vw,2rem)] py-5 last:border-b-0 md:grid-cols-[minmax(0,0.9fr)_24px_minmax(0,1.7fr)]">
              <div className="flex items-center gap-4">
                <span className={iconCell}><Icon aria-hidden className="size-5" /></span>
                <div><h4 className="m-0 text-[19px]">{t}</h4><Label className="mt-1 text-ai-ink">{sub}</Label></div>
              </div>
              <ArrowRight aria-hidden className="hidden size-5 text-ai-ink md:block" />
              <p className="m-0 text-[15px] text-muted">{d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid items-start gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <h3 className="m-0 text-[22px]">What they ask, and what we answer</h3>
            <dl className="m-0 mt-2">
              {riskQuestions.map(([Icon, q, a]) => (
                // The icon sits inside the dt (a dl group may only hold dt and dd); the subgrid keeps the answer aligned.
                <div key={q} className="grid grid-cols-[28px_1fr] gap-x-3 border-t-2 border-ink py-5">
                  <dt className="col-span-2 grid grid-cols-subgrid text-[19px] font-extrabold"><Icon aria-hidden className="mt-0.5 size-6 text-ai-ink" />{q}</dt>
                  <dd className="col-start-2 m-0 mt-1 text-[15px] text-muted">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* Drawn as a handed-over pack: the one navy card on this light section. */}
          <aside aria-labelledby="pack-h" className="surface-dark border-t-4 border-ai bg-navy-900 text-on-navy lg:sticky lg:top-24">
            <div className="border-b border-on-navy/20 px-6 pb-4 pt-6">
              <Label className="text-ai">Handed to your risk team</Label>
              <h3 id="pack-h" className="m-0 mt-1.5 text-[22px]">The evidence pack</h3>
            </div>
            <ul className="m-0 list-none px-6 pb-3 pt-1">
              {evidence.map(([Icon, t, d]) => (
                <li key={t} className="grid grid-cols-[28px_1fr] gap-3 border-b border-on-navy/15 py-4 last:border-b-0">
                  <Icon aria-hidden className="mt-0.5 size-5.5 text-ai" />
                  <div><strong className="block text-[17px]">{t}</strong><span className="text-[15px] text-on-navy-muted">{d}</span></div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Band>

      <Band id="mlops" labelledBy="arch-h" className="ai-grid">
        <AiKicker>Reference architecture</AiKicker>
        <H2 id="arch-h" className="max-w-[24ch]">One architecture, running in your tenancy.</H2>
        <Lead>From your source systems to the applications people use, with an LLM gateway in front of the models and observability and evaluation across every layer.</Lead>
        <AiReferenceArchitecture />
      </Band>

      {/* The hairline keeps this band and the FAQ below, both light, from running together. */}
      <Band labelledBy="tech-h" tone="surface" className="border-b border-hairline">
        <div className="grid items-start gap-x-12 gap-y-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <AiKicker light>Technology</AiKicker>
            <h2 id="tech-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.012em]">Platforms and tools we work with</h2>
            <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0 text-[15px] text-muted">
              {techRules.map((r) => <li key={r} className="grid grid-cols-[20px_1fr] gap-2"><ArrowRight aria-hidden className="mt-1 size-4 text-ai-ink" />{r}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            {techGroups.map((grp) => (
              <div key={grp.t}>
                <h3 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{grp.t}</h3>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">{grp.items.map((t) => <TechChip key={t} name={t} />)}</ul>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <FAQAccordion id="faq-h" title="Questions buyers ask us" faqs={faqs} vertical="ai" />
      <CTABand vertical="ai" onNavy title="Bring one business problem, or the pilot you already have." note="An AI lead reads every enquiry and replies personally." primary={workshop} secondary={review} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
