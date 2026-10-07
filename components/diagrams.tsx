import { ArrowRight } from "lucide-react";

/** Diagrams are semantic HTML (text stays selectable and translatable) — never raster. */
const stages = [
  { n: "01", stage: "Implement", service: "SAP Consulting", klicks: null, chips: ["Functional", "Technical", "RE-FX highlight"] },
  { n: "02", stage: "Migrate", service: "S/4HANA Data Migration & MDG", klicks: "2Klicks Create", chips: ["Migration Cockpit", "Data Services", "MDG"] },
  { n: "03", stage: "Integrate", service: "SAP Integration · Mobility", klicks: null, chips: ["CPI", "PI/PO", "Mobile & IoT"] },
  { n: "04", stage: "Run", service: "SAP Managed Services", klicks: "2Klicks Update", chips: ["Support", "Optimisation"] },
];

export function SapLifecycleDiagram() {
  return (
    <figure aria-label="Diagram: Texiri services across the SAP lifecycle — implement, migrate, integrate and run — on an ECC or S/4HANA core" className="m-0 bg-navy-900 p-[clamp(1.25rem,3vw,2.25rem)] text-on-navy">
      <figcaption className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">One partner across the SAP lifecycle</figcaption>
      <ol className="m-0 list-none p-0">
        {stages.map((s) => (
          <li key={s.n} className="grid grid-cols-[40px_1fr] gap-4 border-t-2 border-on-navy/20 py-4">
            <span className="pt-0.5 text-sm font-extrabold text-accent">{s.n}</span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1"><strong className="text-lg">{s.stage}</strong><span className="text-sm text-on-navy-muted">{s.service}</span></div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[13px]">
                {s.klicks && <span className="bg-accent px-2.5 py-1 font-extrabold text-navy-900">{s.klicks}</span>}
                {s.chips.map((c) => <span key={c} className="border border-on-navy/35 px-2.5 py-1">{c}</span>)}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 border-2 border-on-navy p-4">
        <strong className="text-[15px]">Your SAP core · ECC → S/4HANA</strong>
        <span className="text-[13px] text-on-navy-muted">RE-FX · FI/CO · PM · MM · SD</span>
      </div>
    </figure>
  );
}

export function AiReferenceArchitecture() {
  const layers = [
    { name: "Data sources", items: ["ERP and CRM (incl. SAP)", "Databases and data lakes", "Documents", "Events and IoT"], edge: "border-ai" },
    { name: "Data platform", items: ["Ingestion: Kafka, Airflow", "Processing: Spark, Databricks", "Feature store, vector index"], edge: "border-on-navy/20" },
    { name: "Model & LLM layer", items: ["Vertex AI · Azure ML · Bedrock", "Fine-tuned or hosted LLMs", "MLflow registry, evaluation"], edge: "border-on-navy/20" },
    { name: "Applications", items: ["Assistants and chat", "Forecasts and dashboards", "Document workflows"], edge: "border-ai" },
  ];
  const deploy = ["Your cloud tenancy", "Vertex AI · Azure ML · Bedrock", "Databricks", "Region-pinned for residency"];
  return (
    <figure aria-label="Reference architecture: data sources, data platform, model and LLM layer, applications, with deployment options" className="m-0 mt-[clamp(2.5rem,5vw,4rem)]">
      <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-4">
        {layers.map((l, i) => (
          <li key={l.name} className={`flex flex-col border-2 bg-navy-800 ${l.edge}`}>
            <div className={`flex items-center justify-between border-b-2 px-4 py-3 ${l.edge}`}>
              <span className="font-extrabold">{l.name}</span>
              {i < layers.length - 1 && <ArrowRight aria-hidden className="size-4 text-ai" />}
            </div>
            <ul className="m-0 flex list-none flex-col gap-1.5 px-4 pb-4 pt-3 text-sm text-on-navy-muted">{l.items.map((x) => <li key={x}>{x}</li>)}</ul>
          </li>
        ))}
      </ol>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-ai px-4 py-3 font-extrabold text-navy-900">Deployment options</div>
        {deploy.map((d) => <div key={d} className="border-2 border-on-navy/20 px-4 py-3">{d}</div>)}
      </div>
    </figure>
  );
}
