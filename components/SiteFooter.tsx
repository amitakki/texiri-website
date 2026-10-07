import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { contact } from "@/lib/site";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "SAP Services", links: [["Overview", "/sap/"], ["SAP Consulting", "/sap/consulting/"], ["S/4HANA Data Migration", "/sap/data-migration/"], ["SAP Integration", "/sap/integration/"], ["Managed Services", "/sap/managed-services/"], ["Mobility Solutions", "/sap/mobility/"]] },
  { title: "2Klicks", links: [["2Klicks Create", "/2klicks/create/"], ["2Klicks Update", "/2klicks/update/"], ["Request a demo", "/2klicks/demo/"]] },
  { title: "AI Services", links: [["Overview", "/ai-services/"], ["AI Strategy & Readiness", "/ai-services/strategy-readiness/"], ["Generative AI & RAG", "/ai-services/generative-ai/"], ["MLOps & Governance", "/ai-services/mlops-governance/"]] },
  { title: "AI Community", links: [["About the community", "/ai-community/"], ["Learning paths", "/ai-community/learning-paths/"], ["Events & workshops", "/ai-community/events/"], ["Join the community", "/ai-community/join/"]] },
  { title: "Company", links: [["About", "/about/"], ["Leadership", "/about/leadership/"], ["Industries", "/industries/"], ["Case Studies", "/case-studies/"], ["Insights", "/insights/"], ["Contact", "/contact/"]] },
  { title: "Careers", links: [["Open roles", "/careers/"], ["Life at Texiri", "/careers/#life"], ["Shambhavi 108", "/careers/shambhavi-108/"]] },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-on-navy">
      <div className="container-content pb-8 pt-16">
        <div className="grid gap-8 border-b-2 border-on-navy/20 pb-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Image src="/texiri-logo.png" alt="Texiri Solutions" width={128} height={32} />
            <p className="m-0 max-w-[34ch] text-[15px] text-on-navy-muted">A founder-led SAP consultancy: implementation, S/4HANA migration, integration and support, with our own 2Klicks migration tools.</p>
          </div>
          <address className="flex flex-col gap-1.5 text-[15px] not-italic">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">Contact</span>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="min-h-8 text-on-navy no-underline hover:text-accent">{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`} className="min-h-8 text-on-navy no-underline hover:text-accent">{contact.email}</a>
            <span className="text-on-navy-muted">{contact.hours}</span>
            <span className="text-on-navy-muted">Vijayapura, Karnataka (HQ) · Navi Mumbai</span>
          </address>
        </div>
        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-6">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="flex flex-col gap-0.5 text-[15px]">
              <span className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-on-navy-muted">{c.title}</span>
              {c.links.map(([label, href]) => <Link key={href} href={href} className="flex min-h-9 items-center text-on-navy no-underline hover:text-accent">{label}</Link>)}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t-2 border-on-navy/20 pt-6 text-[13px] text-on-navy-muted">
          <span>© {new Date().getFullYear()} {contact.legalName} · CIN {contact.cin}</span>
          <nav aria-label="Legal" className="ml-auto flex flex-wrap gap-4">
            <Link href="/legal/privacy/" className="flex min-h-11 items-center text-on-navy">Privacy Policy</Link>
            <Link href="/legal/cookies/" className="flex min-h-11 items-center text-on-navy">Cookie Policy</Link>
            <Link href="/legal/terms/" className="flex min-h-11 items-center text-on-navy">Terms</Link>
            <a href={contact.linkedin} target="_blank" rel="noopener" data-track="outbound_linkedin"
              aria-label="Texiri Solutions on LinkedIn (opens in a new tab)" className="grid size-11 place-items-center border-2 border-on-navy/30 text-on-navy hover:border-accent hover:text-accent">
              <Linkedin aria-hidden className="size-4.5" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
