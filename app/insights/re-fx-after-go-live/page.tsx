import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CTABand, FAQAccordion, NumberedGrid } from "@/components/sections";
import { ArticleHero, articleJsonLd, ArticleRelated, ArticleSources, ArticleSummary, DataTable, Figure, Part, ProofStats, SourcedStats, type TableRow as Row } from "@/components/article";
import { images } from "@/lib/images";
import { articleFor } from "@/lib/insights";
import { isLive, isReady } from "@/lib/pages";
import { DEMO_HREF, METADATA_BASE } from "@/lib/site";

const HREF = "/insights/re-fx-after-go-live/";
const ECC_HREF = "/insights/ecc-2027-start-with-the-data/";
const article = articleFor(HREF);
const LEAD = "Go-live is the cleanest your lease data will ever be. From then on, renewals, index changes, modifications and reorganisations change the contracts your IFRS 16 numbers are built on. Here is where SAP RE-FX data drifts, how it shows up at period-end, and a monthly routine that keeps it clean.";

export const metadata: Metadata = {
  title: article.title,
  description: "Where SAP RE-FX lease data drifts after go-live, how it shows up in period-end valuation runs, and a monthly routine (owners, exception checks, bulk fixes at the source, reconciliation) that keeps IFRS 16 and ASC 842 lease accounting right.",
  alternates: { canonical: HREF },
  // Stays out of search results until the article is signed off and marked ready in lib/pages.ts (content decision I1).
  robots: { index: isReady(HREF), follow: true },
};

const jsonLd = articleJsonLd(article, { description: LEAD, image: images.refxHero, origin: METADATA_BASE });

const summary = [
  "In RE-FX, lease accounting is calculated from contract data: term, options, conditions, index rules, valuation rules and organisational assignments. Every one of them changes after go-live.",
  "Drift shows up at period-end as failed postings and, worse, as contracts that post cleanly on a term or rent that is no longer right.",
  "A monthly routine keeps the data clean without a clean-up project every year: an owner for every field, exception checks before the close, bulk fixes in RE-FX and a reconciliation.",
];

const evidence = [
  { n: "70%", l: "of the preparers who answered manage more than 5,000 lease contracts", s: "EFRAG preparers' survey, 33 responses, May 2024" },
  { n: "12 of 33", l: "respondents named determining the lease term as an application issue, second only to identifying a lease", s: "EFRAG preparers' survey, May 2024" },
  { n: "23 Nov 2026", l: "the IASB completes its review: IFRS 16 is “overall, working as intended”", s: "IASB feedback statement, November 2026" },
];

const driftPoints = [
  { t: "Term and options", d: "Renewal and termination options are reassessed when a significant event within the lessee's control changes the picture, such as a decision to refit or close a store. When notice dates pass without a review, the contract keeps a term the business no longer intends.", effect: "Wrong lease term, wrong liability" },
  { t: "Index and rent adjustments", d: "CPI-linked rents depend on index points being maintained and the adjustment run being executed. Indices are often published after the payment date, so adjustments land retroactively, sometimes into closed periods.", effect: "Liability remeasured late, or not at all" },
  { t: "Modifications posted as new contracts", d: "When a lease is extended, reduced or re-priced, it is tempting to end the contract and create a new one. That breaks the contract history and can book a full derecognition and a new lease where IFRS 16 requires the existing lease to be remeasured.", effect: "Wrong gain or loss, broken audit trail" },
  { t: "Conditions and valuation setup", d: "A new condition type without a valuation rule, a changed contract type or an outdated incremental borrowing rate means payments that are not valued, or are valued on the wrong basis.", effect: "Payments missing from the liability" },
  { t: "Reorganisations", d: "Store closures, profit-centre redesigns and legal-entity moves leave contracts and rental objects assigned to locked cost centres or to the wrong company code.", effect: "Failed postings at period-end" },
  { t: "Business partners and custom fields", d: "Duplicate landlord records, outdated bank details and the custom fields reporting depends on (region, store number, lease category) drift as quickly as the contracts do.", effect: "Payment errors, reports that don't reconcile" },
];

const symptoms: Row[] = [
  ["Posting fails: cost centre locked", "Store closed or reorganised; contract and rental object still assigned to it", "Reassign the objects in bulk, or end the contract correctly"],
  ["Posting fails: index points missing", "Index published after the run", "Maintain the index points and run the rent adjustment (REAJPR) before the valuation"],
  ["Condition not valued", "New condition type with no valuation rule", "Add the rule, then check every contract that uses the condition"],
  ["Posting into a closed period", "Retroactive change entered late", "Agree the cut-off and the treatment with finance before changing the contract"],
  ["Liability looks wrong, no error", "Option or term not reassessed", "Review option dates monthly and reassess with finance"],
];

const steps = [
  { title: "Give every field an owner", body: "Lease administration owns terms, options and notice dates. Real estate owns objects and assignments. Finance owns valuation rules, discount rates and how modifications are treated. Write it down." },
  { title: "Run exception checks before the close", body: "Option and notice dates in the next 90 days, index rules without current points, conditions without a valuation rule, objects on locked cost centres, contracts ending without a follow-up." },
  { title: "Classify each event with finance", body: "Before a renewal, rent change or termination is entered, agree whether it is a reassessment, a modification or a new lease. Then enter it as that, on the existing contract where it belongs." },
  { title: "Fix at the source, in bulk", body: "Correct contracts, objects and conditions in RE-FX, not with a manual journal. Mass changes from validated templates keep reorganisations and corrections out of the close-week rush." },
  { title: "Reconcile and sign off", body: "Reconcile lease liability and right-of-use balances by company code to the general ledger, explain the movements, and record what changed and why." },
];

const checks: Row[] = [
  ["Option and notice dates in the next 90 days", "Terms that need reassessing before the date passes", "Lease administration"],
  ["Index rules without points for the period", "Missed or late rent adjustments", "Lease administration"],
  ["Conditions without a valuation rule", "Payments left out of the liability", "Finance"],
  ["Objects on locked or closed cost centres", "Failed postings after reorganisations", "Real estate"],
  ["Contracts ended and recreated in the month", "Modifications booked as new leases", "Finance"],
  ["Duplicate landlords, missing bank details", "Payment errors and duplicate payments", "Master data team"],
];

const proof: [string, string][] = [
  ["17,000+", "lease contracts in RE-FX solutions architected by our founder"],
  ["100%", "IFRS 16-compliant lease accounting for a leading US retailer"],
  ["Up to 75%", "lower cost for RE-FX data operations with 2Klicks"],
];

const faqs = [
  { q: "What is the difference between a reassessment and a modification?", a: "Under IFRS 16, a reassessment remeasures the lease liability when, for example, the lease term changes, the assessment of a purchase option changes, or payments change because of an index or rate. A modification is a change to the scope or the consideration that was not part of the original terms, such as adding space or renegotiating the rent; it is either accounted for as a separate lease or remeasures the existing one. Both are handled on the existing RE-FX contract. Ending it and creating a new one is rarely the right answer." },
  { q: "How often should we check lease data?", a: "Monthly, in the week before the close, with a 90-day look-ahead for option and notice dates (longer if your notice periods are). Quarterly is too slow for index adjustments and notice dates, and an annual clean-up turns small fixes into a project." },
  { q: "Does this apply to ASC 842 as well?", a: "Yes. The data that drifts is the same: terms, options, payments, indices and assignments. The rules for reassessments and modifications differ in detail between the two standards (ASC 842, for example, does not remeasure the liability for an index change alone), so the classification step with finance follows the standard you report under." },
  { q: "Can 2Klicks change contracts that are already live and posted?", a: "Yes. The same download, update and upload workflow that creates records also handles mass changes after reorganisations and data corrections. Rows are validated before anything is posted, and changes are recorded in standard SAP change documents. Agree the accounting treatment with finance first: the tool changes the data, not the judgement behind it." },
];

const sources = [
  { t: "EFRAG Preparers' Survey on the Effects of IFRS 16 Leases: summary of responses", by: "EFRAG, 14 May 2024", href: "https://efrag.org/system/files/sites/webpublishing/Meeting%20Documents/2312131633450944/07-02%20-%20Summary%20of%20responses%20-%20EFRAG%20Preparer%27s%20Survey%20on%20IFRS%2016%20Leases%20-%20EFRAG%20FR%20TEG-User%20Panel%20joint%20meeting%2024-05-14.pdf" },
  { t: "Post-implementation Review of IFRS 16 Leases: project summary and feedback statement", by: "IASB, 23 November 2026", href: "https://www.ifrs.org/projects/work-plan/post-implementation-review-of-ifrs-16-leases/" },
];

export default function RefxArticlePage() {
  if (!isLive(HREF)) notFound();
  const eccLive = isLive(ECC_HREF);
  const related = [
    { label: "ECC mainstream maintenance ends in 2027. Start with the data.", href: ECC_HREF },
    { label: "SAP RE-FX & Lease Accounting services", href: "/sap/consulting/#re-fx" },
    { label: "2Klicks: SAP RE-FX mass data", href: "/2klicks/" },
  ].filter((r) => isLive(r.href));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights/" }, { label: "RE-FX after go-live", href: HREF }]} />

      <ArticleHero article={article} lead={LEAD} byline="the Texiri RE-FX & lease accounting team" image={images.refxHero} />

      <ArticleSummary points={summary} />

      <Part id="drift" n="01" title="Go-live is when the drift starts" image={images.refxDrift} body={<>
          <p>On go-live day, your lease portfolio has been migrated, reconciled and signed off. Without ongoing effort, it will never be this clean again. From the next morning the business starts changing it: a store renews early, a landlord agrees a rent-free period, the consumer price index moves, a region is folded into another legal entity.</p>
          <p>In SAP RE-FX, each of those events touches the contract that the IFRS 16 or ASC 842 valuation is calculated from. When a change is captured late, partly or in the wrong way, the lease liability and the right-of-use asset are wrong too, and nobody sees it until period-end, or until the auditors do.</p>
          <p>The burden is well documented. In EFRAG&apos;s 2024 survey on the effects of IFRS 16, most respondents were preparers, and 70% of them manage more than 5,000 lease contracts. They described data collection and continuous monitoring as burdensome, time-consuming and costly, and some said they struggle to manage many contract modifications over the lease term.</p>
          <p>The rules are not about to change. On 23 November 2026 the IASB published the feedback statement from its post-implementation review of IFRS 16. It concluded that the standard is, overall, working as intended, and opened a research project on reducing lessees&apos; costs for remeasurements and discount rates. Until that produces anything, keeping lease data current stays with the teams that own it.</p>
        </>}>
        <SourcedStats stats={evidence} />
      </Part>

      <Part id="where" n="02" title="Six places lease data drifts" image={images.refxDriftPoints} body={<>
          <p>In our RE-FX work, the same six areas account for most of the drift. None of them is exotic. Each is a field or setting that was right at go-live and depends on someone noticing when it stops being right.</p>
          <p>The third deserves special attention. Ending a contract and creating a new one feels like the quickest way to record a renegotiated lease. It is also the change most likely to produce numbers that look plausible and are wrong, because the valuation history the modification depends on is gone.</p>
        </>}>
        <ul aria-label="Where lease data drifts after go-live" className="m-0 mt-[clamp(2rem,4vw,3rem)] grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {driftPoints.map((p, i) => (
            <li key={p.t} className={`flex flex-col gap-3 border-t-4 p-6 ${i === 2 ? "border-accent bg-accent-100" : "border-ink bg-surface"}`}>
              <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 text-[22px]">{p.t}</h3>
              <p className="m-0 flex-1 text-[16px] text-muted">{p.d}</p>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{p.effect}</span>
            </li>
          ))}
        </ul>
      </Part>

      <Part id="period-end" n="03" title="How drift shows up at period-end" image={images.refxPeriodEnd} body={<>
          <p>The visible symptoms appear in the period-end runs: the periodic posting of contracts (RERAPP) and the lease accounting valuation postings (RECEEP). A posting fails because a cost centre is locked, index points are missing, a condition has no valuation rule, or a retroactive change tries to post into a closed period.</p>
          <p>Those are the helpful errors, because the system stops and tells you. The costly ones post cleanly: a contract valued on a term the business has already decided not to use, or a rent that missed its index adjustment. They surface in an audit sample or a year-end review, when correcting them means remeasuring and explaining prior periods.</p>
          <p>Under close pressure, failed postings are often fixed with a manual journal. The close gets done, but the contract stays wrong, the same error returns next month, and the lease subledger and the general ledger drift apart.</p>
        </>}>
        <Figure className="mt-[clamp(2rem,4vw,3rem)]" caption="Common period-end symptoms in RE-FX and their usual causes. Exact messages depend on your release and configuration.">
          <DataTable caption="From symptom to fix" head={["What you see", "Likely cause", "Fix at the source"]} rows={symptoms} />
        </Figure>
      </Part>

      <Part id="routine" n="04" title="A monthly routine that keeps it clean" image={images.refxRoutine} body={<>
          <p>Drift is a process problem, so the fix is a process too: small, monthly and owned. The routine below sits in the week before the close. Once it is running, most of it is reviewing short exception lists rather than chasing errors.</p>
          <p>The principle is the one that makes migrations work: fix data where it lives. A correction made on the RE-FX contract carries into every later valuation. A manual journal has to be repeated, and explained, every period.</p>
        </>}>
        <NumberedGrid items={steps} />
        <div className="mt-[clamp(2rem,4vw,3rem)] grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Figure caption="Six exception checks to run before every close, each with an owner. Most can be built from standard RE-FX reports or a simple query.">
            <DataTable caption="Monthly exception checks" head={["Check", "What it catches", "Owner"]} rows={checks} />
          </Figure>
          <aside aria-label="Why 90 days" className="border-t-4 border-accent bg-surface p-[clamp(1.25rem,3vw,2rem)]">
            <p className="m-0 text-xl font-semibold leading-[1.45]">Ninety days is our default look-ahead for option dates: long enough to get a decision from the business before notice is due. If your longest notice period is longer, use that.</p>
          </aside>
        </div>
      </Part>

      <Part id="big-changes" n="05" title="Reorganisations, acquisitions and S/4HANA" image={images.refxReorg} body={<>
          <p>Some changes are too big for a monthly routine: a legal-entity merger that moves hundreds of contracts to a new company code, a new store format that redraws every profit centre, an acquired portfolio to onboard, or a new condition structure after renegotiating with a landlord group.</p>
          <p>Many RE-FX teams handle these with custom programs, one per object and type of change, each needing a specification, development, testing and transports, usually just before a deadline. Treat them as small projects instead: agree the target state with finance, test on a copy of production, run outside the close window and reconcile before and after.</p>
          <p>The same applies to the move to S/4HANA. Contracts with stale terms, unvalued conditions or orphaned assignments are the ones that fail mock loads, so clean RE-FX data on ECC is the cheapest preparation for the migration.{eccLive && <> See <Link href={ECC_HREF}>ECC mainstream maintenance ends in 2027. Start with the data</Link>.</>}</p>
        </>} />

      <Part id="texiri" n="06" title="How Texiri helps" image={images.refxKlicks} body={<>
          <p>Our RE-FX &amp; lease accounting practice implements and supports SAP RE-FX and Cloud for Real Estate for property groups, retailers and other lease-heavy businesses: portfolios, lessee and lessor contracts, rent, indexation, renewals and options, service-charge settlement and sales-based rent, with IFRS 16 and ASC 842 lease accounting integrated with Finance and Asset Accounting.</p>
          <p>Our founder has architected enterprise-scale RE-FX solutions managing more than 17,000 lease contracts. For a leading US retailer, we implemented RE-FX across leasing, contracts, valuations and accounting, with 100% IFRS 16-compliant lease accounting. <Link href="/case-studies/retail-usa/" data-track="case_study_view">Read the case study</Link>.</p>
          <p>After go-live, <Link href="/sap/managed-services/">SAP Managed Services</Link> runs the routine with your team, and <Link href="/2klicks/">2Klicks</Link> handles the bulk work: business entities, buildings, properties, rental objects, contracts and contract offers, with conditions and their values, custom fields and cross-company-code transfers, from one Excel template. Every row is validated before anything is posted, changes are recorded in standard SAP change documents, and the data stays in your SAP system.</p>
        </>}>
        <ProofStats items={proof} />
      </Part>

      <FAQAccordion id="faq-h" title="RE-FX lease data questions" faqs={faqs} />
      <ArticleSources sources={sources} />
      <ArticleRelated items={related} />

      <CTABand title="Get a health check of your RE-FX lease data." note="A senior consultant reads every enquiry and replies personally." primary={{ label: "Talk to an RE-FX expert", href: "/contact/" }} secondary={{ label: "Request a 2Klicks demo", href: DEMO_HREF }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
