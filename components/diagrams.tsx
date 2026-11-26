import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLive } from "@/lib/pages";

/** Diagrams are semantic HTML (text stays selectable and translatable) — never raster. */
const sapServices = [
  { t: "RE-FX & Lease Accounting", modules: ["RE-FX", "C4RE", "IFRS 16 / ASC 842"], href: "/sap/consulting/#re-fx" },
  { t: "S/4HANA, Data Migration & MDG", modules: ["BODS", "Syniti ADM", "2Klicks"], href: "/sap/data-migration/" },
  { t: "Enterprise Asset Management", modules: ["PM", "APM", "SSAM", "PS"], href: "/sap/consulting/#eam" },
  { t: "SAP BTP & Development", modules: ["ABAP", "Fiori/UI5", "RAP", "Integration"], href: "/sap/btp/" },
  { t: "SAP Managed Services", modules: ["Basis to functional support"], href: "/sap/managed-services/" },
];

/** Home hero: the specific SAP services, each linking to where it is described. */
export function SapServicesPanel() {
  return (
    <figure aria-labelledby="sap-panel-cap" className="m-0 bg-navy-900 p-[clamp(1.25rem,3vw,2.25rem)] text-on-navy">
      <figcaption id="sap-panel-cap" className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">Our SAP services</figcaption>
      <ul className="hero-stagger m-0 list-none p-0">
        {sapServices.map((s) => {
          const inner = (
            <>
              <span className="min-w-0">
                <strong className="block text-lg leading-snug">{s.t}</strong>
                <span className="mt-2 flex flex-wrap gap-1.5 text-[13px]">
                  {s.modules.map((m) => <span key={m} className={m === "2Klicks" ? "bg-accent px-2.5 py-1 font-extrabold text-navy-900" : "border border-on-navy/35 px-2.5 py-1"}>{m}</span>)}
                </span>
              </span>
              <ArrowRight aria-hidden className="size-5 flex-none text-accent" />
            </>
          );
          const cls = "flex items-center justify-between gap-4 border-t-2 border-on-navy/20 py-4 text-on-navy no-underline";
          return (
            <li key={s.t}>
              {/* A page that is not ready yet is shown as plain text, not a link. */}
              {isLive(s.href.split("#")[0]) ? <Link href={s.href} className={`${cls} hover:text-accent`}>{inner}</Link> : <div className={cls}>{inner}</div>}
            </li>
          );
        })}
      </ul>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 border-2 border-on-navy p-4">
        <strong className="text-[15px]">Your SAP core · ECC → S/4HANA</strong>
        <span className="text-[13px] text-on-navy-muted">RE-FX · FI/CO · PS · PM · MM · SD</span>
      </div>
    </figure>
  );
}

export function AiReferenceArchitecture() {
  // Content decision A4: gateway, agents and LLM observability confirmed as delivered (Nov 2026).
  const layers = [
    { name: "Data sources", items: ["ERP and CRM", "Databases and data lakes", "Documents", "Events and IoT"], edge: "border-ai" },
    { name: "Data platform", items: ["Ingestion: Kafka, Airflow", "Processing: Spark, Databricks", "Feature store, vector index"], edge: "border-on-navy/20" },
    { name: "Model & LLM layer", items: ["Managed model APIs", "Fine-tuned or self-hosted LLMs", "MLflow model registry"], edge: "border-on-navy/20" },
    { name: "Gateway & agents", items: ["LLM gateway: routing, semantic cache", "Token budgets, cost per use case", "Agents with tool calling", "MCP servers and APIs into your systems"], edge: "border-on-navy/20" },
    { name: "Applications", items: ["Assistants and chat", "Forecasts and dashboards", "Document workflows"], edge: "border-ai" },
  ];
  const observe = ["Traces of prompts, tool calls and answers", "Evaluations in production", "Quality and drift alerts", "Cost per use case"];
  const deploy = ["Your cloud tenancy", "Vertex AI · Azure ML · Amazon Bedrock", "Databricks", "Region-pinned for residency"];
  return (
    <figure aria-label="Reference architecture: data sources, data platform, model and LLM layer, gateway and agents, applications, with observability and evaluation across all layers, and deployment options" className="m-0 mt-[clamp(2.5rem,5vw,4rem)]">
      <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-5">
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
        <div className="border-2 border-ai px-4 py-3 font-extrabold">Observability &amp; evaluation <span className="block font-semibold text-on-navy-muted">across every layer</span></div>
        {observe.map((d) => <div key={d} className="border-2 border-on-navy/20 px-4 py-3">{d}</div>)}
      </div>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
        <div className="border-2 border-ai px-4 py-3 font-extrabold">Deployment options <span className="block font-semibold text-on-navy-muted">where it runs</span></div>
        {deploy.map((d) => <div key={d} className="border-2 border-on-navy/20 px-4 py-3">{d}</div>)}
      </div>
    </figure>
  );
}
