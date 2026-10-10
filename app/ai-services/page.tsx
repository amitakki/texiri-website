import type { Metadata } from "next";
import { Check } from "lucide-react";
import { H2, Placeholder, Section } from "@/components/ui";
import { Breadcrumbs, CTABand, FAQAccordion, StickyMobileCTA } from "@/components/sections";
import { AiReferenceArchitecture } from "@/components/diagrams";

export const metadata: Metadata = {
  title: "AI Services: Strategy, GenAI, ML & MLOps",
  description: "Practical AI, from strategy to production: AI readiness workshops, generative AI and RAG, machine learning and forecasting, MLOps, and governance aligned to the EU AI Act and ISO/IEC 42001.",
  alternates: { canonical: "/ai-services/" },
};

const serviceJsonLd = { "@context": "https://schema.org", "@type": "Service", name: "AI Services", serviceType: "Artificial intelligence consulting", provider: { "@type": "Organization", name: "Texiri Solutions" } };

const AiKicker = ({ children }: { children: React.ReactNode }) => <span className="mb-4 block text-kicker font-semibold uppercase tracking-[0.1em] text-ai-ink">{children}</span>;

const steps = [ // [TO CONFIRM] durations
  { name: "AI readiness workshop", dur: "1 day", out: ["Goals and constraints", "Long list of use cases"] },
  { name: "Data readiness analysis", dur: "2–3 weeks", out: ["Data inventory", "Quality and access report"] },
  { name: "Prioritise and set pilot KPIs", dur: "1 week", out: ["Ranked shortlist", "Baseline and target KPIs"] },
  { name: "POC / prototype", dur: "6–8 weeks", out: ["Working pilot", "Evaluation against KPIs"] },
  { name: "Scale", dur: "Ongoing", out: ["Production deployment", "MLOps, monitoring, training"] },
];
const caps = [
  { name: "Machine learning", desc: "Models that predict and optimise, with reasons people can read.", items: ["Predictive analytics", "Time-series forecasting", "Optimisation", "Explainable AI"] },
  { name: "Generative AI", desc: "Language models grounded in your own knowledge.", items: ["LLM fine-tuning (GPT, Llama, Mistral)", "RAG knowledge systems", "Conversational AI", "Document intelligence"] },
  { name: "MLOps & DataOps", desc: "Pipelines that retrain, monitor and redeploy reliably.", items: ["MLflow, Kubeflow, TFX", "Airflow, Spark, Kafka", "Kubernetes", "Drift monitoring"] },
  { name: "Governance & adoption", desc: "Policies, evaluation and people-readiness from the first sprint.", items: ["EU AI Act alignment", "ISO/IEC 42001 alignment", "GDPR alignment", "Adoption training"] },
];
const uses = [
  { name: "Demand forecasting", problem: "Planners rely on spreadsheets and gut feel.", approach: "Time-series models with explainable drivers", kpi: "Forecast accuracy (MAPE)" },
  { name: "Customer-service assistant", problem: "Agents search scattered knowledge for answers.", approach: "RAG over approved content, with citations", kpi: "First-contact resolution rate" },
  { name: "Document intelligence", problem: "Contracts and invoices are keyed in by hand.", approach: "Extraction with human review", kpi: "Processing time per document" },
  { name: "Predictive maintenance", problem: "Unplanned failures on critical assets.", approach: "Failure-risk models on sensor and work-order history", kpi: "Unplanned downtime hours" },
  { name: "Employee knowledge search", problem: "Policies and procedures are hard to find.", approach: "Role-aware conversational search", kpi: "Time to answer" },
  { name: "Churn and risk prediction", problem: "Customers leave without warning.", approach: "Classification models with explainability", kpi: "Retention rate" },
];
const controls = [
  ["Data residency", "Workloads run in the region and tenancy you choose."],
  ["No training on your data", "Client data is never used to train third-party foundation models."],
  ["Access control", "Retrieval and outputs respect existing roles and permissions."],
  ["Evaluation", "Accuracy, bias and drift tests before and after go-live."],
  ["ISO/IEC 42001 alignment", "AI management practices mapped to the standard."],
  ["EU AI Act & GDPR alignment", "Risk classification and documentation for each use case."],
];
const tech = ["Vertex AI", "Azure ML", "Databricks", "Amazon Bedrock", "GPT", "Llama", "Mistral", "MLflow", "Kubeflow", "TFX", "Airflow", "Spark", "Kafka", "Kubernetes"];
const faqs = [
  { q: "We have no AI in production yet. Where do we start?", a: "With the one-day readiness workshop. You leave with a ranked list of use cases, the data each one needs and a realistic first pilot." },
  { q: "Is our data used to train models?", a: "No. Your data is never used to train third-party foundation models. Where we fine-tune, the resulting model stays in your tenancy." },
  { q: "Which platforms do you work with?", a: "Vertex AI, Azure ML, Databricks and Amazon Bedrock, with MLflow, Kubeflow, TFX and Airflow for MLOps. We build on what you already run." },
  { q: "How do you address the EU AI Act and ISO/IEC 42001?", a: "We classify each use case by risk, document data and evaluation results, and align delivery with ISO/IEC 42001. We support your compliance work; we do not certify it." },
  { q: "Do you help our people adopt the tools?", a: "Yes. Adoption training for users and handover training for your technical team are part of the scale phase." },
];

export default function AiServicesPage() {
  return (
    <>
      <section aria-labelledby="hero-h" className="surface-dark ai-grid bg-navy-900 text-on-navy">
        <Breadcrumbs tone="navy" items={[{ label: "Home", href: "/" }, { label: "AI Services", href: "/ai-services/" }]} />
        <div className="container-content grid items-end gap-[clamp(2.5rem,5vw,5rem)] py-[clamp(3rem,7vw,6.5rem)] lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 text-kicker font-semibold uppercase tracking-[0.1em] text-ai"><span aria-hidden className="size-2.5 bg-ai" />Texiri AI Services</span>
            <h1 id="hero-h" className="m-0 -ml-[0.04em] max-w-[14ch] text-display text-on-navy">Practical AI, from strategy to production.</h1>
            <p className="mt-6 max-w-[52ch] text-lead text-on-navy-muted">We help organisations pick the AI use cases worth doing, get their data ready, and run models and assistants in production with the governance to back them.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" data-track="ai_workshop_click" className="inline-flex min-h-13 items-center gap-2.5 bg-ai px-5 font-extrabold text-navy-900 no-underline hover:bg-ai-600 hover:text-navy-900">Request an AI readiness workshop</a>
              <a href="#engagement" className="inline-flex min-h-13 items-center border-2 border-on-navy px-5 font-extrabold text-on-navy no-underline hover:bg-navy-700 hover:text-on-navy">How we work</a>
            </div>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-0.5 border-2 border-ai/40 bg-ai/40 p-0">
            {[["Strategy", "Readiness and use-case roadmap"], ["Generative AI", "RAG, assistants, documents"], ["Machine learning", "Prediction and forecasting"], ["MLOps & governance", "Run it, monitor it, prove it"]].map(([t, d]) => (
              <li key={t} className="bg-navy-900 p-6"><strong className="block text-lg">{t}</strong><span className="text-sm text-on-navy-muted">{d}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <Section labelledBy="prob-h">
        <AiKicker>The problem</AiKicker>
        <H2 id="prob-h" className="max-w-[20ch]">Most AI pilots never reach production.</H2>
        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid list-none gap-8 p-0 md:grid-cols-3">
          {[["No clear use case", "Pilots start from the technology rather than a business problem with a measurable target."], ["Data that isn't ready", "Gaps, silos and one-off extracts mean the model can't be rebuilt or trusted next month."], ["No governance", "Without evaluation, access control and documentation, risk teams won't sign off production use."]].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-ink pt-4"><span className="text-sm font-extrabold text-ai-ink">0{i + 1}</span><h3 className="mb-2 mt-3 text-[22px]">{t}</h3><p className="m-0 text-muted">{d}</p></li>
          ))}
        </ol>
      </Section>

      <Section id="engagement" labelledBy="eng-h" tone="surface" className="scroll-mt-18">
        <div className="mb-4 flex flex-wrap items-center gap-3"><AiKicker>Engagement model</AiKicker><Placeholder>DURATIONS TO CONFIRM</Placeholder></div>
        <H2 id="eng-h">Five steps from first workshop to production</H2>
        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.name} className="flex flex-col border-t-4 border-ai bg-ground">
              <div className="px-4 pb-3 pt-4"><span className="text-sm font-extrabold text-ai-ink">0{i + 1}</span><h3 className="my-1 text-[19px]">{s.name}</h3><span className="text-sm font-bold">{s.dur}</span></div>
              <div className="flex-1 border-t border-hairline p-4"><span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deliverables</span><ul className="m-0 mt-1.5 flex flex-col gap-1 pl-4 text-sm">{s.out.map((o) => <li key={o}>{o}</li>)}</ul></div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="capabilities" labelledBy="cap-h" className="scroll-mt-18">
        <AiKicker>Capabilities</AiKicker>
        <H2 id="cap-h">What we build</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {caps.map((g) => (
            <div key={g.name} className="flex flex-col gap-3 border-t-2 border-ink pt-4">
              <h3 className="m-0 text-[22px]">{g.name}</h3><p className="m-0 text-[15px] text-muted">{g.desc}</p>
              <ul className="m-0 list-none p-0">{g.items.map((it) => <li key={it} className="border-t border-hairline py-2 text-[15px]">{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="uc-h" tone="surface">
        <AiKicker>Use cases</AiKicker>
        <H2 id="uc-h" className="max-w-[20ch]">Where AI earns its keep</H2>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {uses.map((u) => (
            <article key={u.name} className="flex flex-col border-t-4 border-ink bg-ground">
              <h3 className="m-0 px-6 pb-4 pt-6 text-xl">{u.name}</h3>
              <dl className="m-0 text-[15px]">
                {([["Problem", u.problem], ["Approach", u.approach], ["KPI", u.kpi]] as const).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[96px_1fr] gap-3 border-t border-hairline px-6 py-3 last:pb-6">
                    <dt className={`pt-0.5 text-xs font-semibold uppercase tracking-[0.08em] ${k === "KPI" ? "text-ai-ink" : "text-muted"}`}>{k}</dt>
                    <dd className={`m-0 ${k === "KPI" ? "font-bold" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <section aria-labelledby="arch-h" className="surface-dark ai-grid bg-navy-900 py-section text-on-navy">
        <div className="container-content">
          <span className="mb-4 block text-kicker font-semibold uppercase tracking-[0.1em] text-ai">Reference architecture</span>
          <H2 id="arch-h" className="text-on-navy">From your data to an AI application</H2>
          <AiReferenceArchitecture />
        </div>
      </section>

      <Section id="governance" labelledBy="sec-h" className="scroll-mt-18">
        <AiKicker>Security &amp; governance</AiKicker>
        <H2 id="sec-h" className="mb-[clamp(2.5rem,5vw,4rem)]">Controls your risk team will ask for</H2>
        <ul className="m-0 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3">
          {controls.map(([t, d]) => (
            <li key={t} className="grid grid-cols-[28px_1fr] gap-3 border-t-2 border-ink py-6">
              <Check aria-hidden className="mt-0.5 size-5.5 text-ai-ink" />
              <div><h3 className="mb-1 text-[19px]">{t}</h3><p className="m-0 text-[15px] text-muted">{d}</p></div>
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="tech-h" className="border-y-2 border-rule py-[clamp(3rem,6vw,5rem)]">
        <div className="container-content grid items-start gap-x-8 gap-y-6 md:grid-cols-2">
          <div><AiKicker>Technology</AiKicker><h2 id="tech-h" className="m-0 text-[clamp(1.625rem,3vw,2.25rem)]">Platforms and tools we work with</h2></div>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">{tech.map((t) => <li key={t} className="border border-rule px-3.5 py-2 text-[15px] font-semibold">{t}</li>)}</ul>
        </div>
      </section>

      <FAQAccordion id="faq-h" title="Questions buyers ask us" faqs={faqs} />
      <CTABand vertical="ai" title="One day with your team. A ranked list of AI use cases worth piloting." note="An AI lead replies within one business day." primary={{ label: "Request an AI readiness workshop", href: "/contact/?type=ai" }} />
      <StickyMobileCTA vertical="ai" label="Request an AI readiness workshop" href="/contact/?type=ai" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
