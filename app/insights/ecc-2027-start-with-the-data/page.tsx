import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Track } from "@/components/visuals";
import { Breadcrumbs, CTABand, FAQAccordion, NumberedGrid } from "@/components/sections";
import { ArticleHero, articleJsonLd, ArticleRelated, ArticleSources, ArticleSummary, DataTable, Figure, Part, ProofStats, SourcedStats, type TableRow } from "@/components/article";
import { images } from "@/lib/images";
import { articleFor } from "@/lib/insights";
import { isLive, isReady } from "@/lib/pages";
import { DEMO_HREF, METADATA_BASE } from "@/lib/site";

const HREF = "/insights/ecc-2027-start-with-the-data/";
const article = articleFor(HREF);
const LEAD = "The end-of-2027 date is fixed, and the window to move is getting crowded. Whichever route you take to S/4HANA, the work that decides your timeline is the data, and most of it can start on ECC today.";

export const metadata: Metadata = {
  title: article.title,
  description: "SAP ECC 6.0 mainstream maintenance ends on 31 December 2027. What the 2030 and 2033 options really offer, why data sets the pace of every S/4HANA migration, and five things to do on ECC now.",
  alternates: { canonical: HREF },
  // Stays out of search results until the article is signed off and marked ready in lib/pages.ts (content decision I1).
  robots: { index: isReady(HREF), follow: true },
};

const jsonLd = articleJsonLd(article, { description: LEAD, image: images.articleEcc, origin: METADATA_BASE });

const summary = [
  "Mainstream maintenance for SAP ECC 6.0 ends on 31 December 2027. Extended maintenance to 2030 costs more, and the 2033 option comes with conditions.",
  "In our experience, programmes slip on data more often than on technology: duplicate business partners, open items that don't reconcile, custom fields that break mock loads.",
  "A data assessment and clean-up on your current ECC system shortens the programme whatever route you choose later, and ECC users feel the benefit straight away.",
];

const surveys = [
  { n: "About half", l: "of German-speaking ECC users expect to run past the end-2027 deadline", s: "DSAG survey, 198 respondents, early 2026" },
  { n: "37%", l: "of those ECC users aim to switch to S/4HANA by the end of 2027", s: "DSAG survey, 198 respondents, early 2026" },
  { n: "59%", l: "of companies are fully or partially live on S/4HANA, up 13 points from 2024", s: "ASUG and Precisely, November 2025" },
];

const routes = [
  { t: "Greenfield", s: "New implementation, new processes", d: "You choose what to bring. Opening balances, open items and master data are extracted, cleansed, mapped and loaded over several mock cycles. Quality at the source decides how many cycles you need." },
  { t: "Brownfield", s: "System conversion of your ECC", d: "Your data comes along, problems included. Customers and vendors must be converted to Business Partners before the conversion, and finance data has to pass SAP's consistency checks. Open issues stop the conversion." },
  { t: "Bluefield", s: "Selective data transition", d: "You move the organisations, history and objects you choose. The selection rules are data rules, and the business has to agree them before the first test run." },
];

const steps = [
  { title: "Take an inventory", body: "List the objects you would migrate, with volumes and owners: business partners, materials, open items, assets, contracts and anything custom. Records with no activity in years are candidates to archive, not migrate." },
  { title: "Agree the rules, then measure", body: "Write data-quality rules with the people who own the data (mandatory fields, formats, duplicates) and profile ECC against them. You get a scorecard per object and a baseline to track." },
  { title: "Clean up customers and vendors", body: "Duplicates, missing tax numbers and incomplete addresses cause trouble on every route, and Business Partner conversion is mandatory for a system conversion. Fixing them now helps ECC users today." },
  { title: "Fix at the source, in bulk", body: "Correct data in ECC, not in a load file, so every later extract and mock load starts clean. Mass-correction tools let business users make the changes from Excel, validated before anything is posted." },
  { title: "Rehearse extract and reconcile", body: "Run a trial extract and reconciliation on one or two objects. It exposes mapping gaps and custom fields early, and makes reconciliation a routine instead of a cutover-weekend scramble." },
];

type Status = "Ready" | "Cleanse in ECC" | "Decide scope" | "Design mapping";
const statusStyle: Record<Status, string> = {
  Ready: "bg-navy-900 text-on-navy",
  "Cleanse in ECC": "border border-accent-700 bg-accent-100 text-accent-800",
  "Decide scope": "border border-ink",
  "Design mapping": "border border-dashed border-ink",
};
const StatusBadge = ({ status }: { status: Status }) => <span className={`inline-flex whitespace-nowrap px-2 py-0.5 text-xs font-bold ${statusStyle[status]}`}>{status}</span>;
const scorecard: TableRow[] = [
  ["Business partners (customers and vendors)", "Duplicates across company codes; missing tax numbers", <StatusBadge key="s" status="Cleanse in ECC" />],
  ["Materials", "Records with no movement in years; mixed units of measure", <StatusBadge key="s" status="Decide scope" />],
  ["Open items (receivables and payables)", "Reconcile to the general ledger before every mock load", <StatusBadge key="s" status="Ready" />],
  ["Fixed assets", "Asset classes and depreciation areas to map", <StatusBadge key="s" status="Design mapping" />],
  ["Lease contracts (RE-FX)", "Custom fields on contracts; condition types to map", <StatusBadge key="s" status="Cleanse in ECC" />],
];

const proof: [string, string][] = [
  ["Zero", "data loss at cutover on an ECC to S/4HANA conversion"],
  ["Up to 75%", "lower cost for RE-FX data operations with 2Klicks"],
  ["22%", "of our consultants specialise in data migration"],
];

const faqs = [
  { q: "Can we wait for the 2033 option?", a: "Only if you move ECC to SAP ERP, private edition, on SAP HANA before the end of 2030 and meet SAP's conditions. That is a project in its own right, and it does not remove the move to S/4HANA. It postpones it." },
  { q: "If we choose brownfield, do we still need data cleansing?", a: "Yes. A conversion takes your data as it is. Customers and vendors must become Business Partners first, finance data must pass SAP's consistency checks, and any duplicates or gaps you carry over become S/4HANA problems." },
  { q: "What does a data assessment give us?", a: "An inventory of objects and volumes, a data-quality scorecard per object against rules your data owners agree, a list of what to cleanse, archive or leave behind, and an evidence-based timeline for the migration routes you are weighing." },
];

const sources = [
  { t: "SAP support deadlines: 2027, 2030 and 2033", by: "SAPinsider, 28 September 2026", href: "https://sapinsider.org/blogs/sap-support-deadlines-2027-2030-2033/" },
  { t: "Half of German-speaking SAP users set to blow past 2027 ECC support deadline (DSAG survey)", by: "The Register, 27 February 2026", href: "https://www.theregister.com/2026/02/27/dsag_ecc_sap/" },
  { t: "New research reveals SAP S/4HANA migration momentum, despite ongoing automation challenges", by: "Precisely and ASUG, 4 November 2025", href: "https://www.precisely.com/press-release/new-research-reveals-sap-s-4hana-migration-momentum-despite-ongoing-automation-challenges" },
];

export default function EccArticlePage() {
  if (!isLive(HREF)) notFound();
  const related = [
    { label: "RE-FX after go-live: keeping lease data clean", href: "/insights/re-fx-after-go-live/" },
    { label: "S/4HANA, Data Migration & MDG services", href: "/sap/data-migration/" },
    { label: "2Klicks: SAP data management", href: "/2klicks/" },
  ].filter((r) => isLive(r.href));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights/" }, { label: "ECC 2027: start with the data", href: HREF }]} />

      <ArticleHero article={article} lead={LEAD} byline="the Texiri data migration team" image={images.eccHero} />

      <ArticleSummary points={summary} />

      <Part id="dates" n="01" title="What actually ends in 2027" image={images.eccSupport} body={<>
          <p>On 31 December 2027, SAP&apos;s mainstream maintenance ends for SAP ERP 6.0 (ECC) on its latest enhancement packages, along with the other SAP Business Suite 7 core applications. SAP PI/PO 7.5 reaches the end of mainstream maintenance on the same date, which matters if your interfaces run through it.</p>
          <p>Your system will not switch off on 1 January 2028. What changes is what you can count on. From 2028 to the end of 2030, SAP offers extended maintenance at a premium of two percentage points on the maintenance basis. Without it, or after it, systems move to customer-specific maintenance, which no longer brings new legal changes: a real risk for anything that has to follow changing tax and reporting rules.</p>
          <p>There is a later option too. The SAP ERP, private edition, transition option lets eligible customers keep running ECC from 2031 to 2033, but only after moving it to SAP ERP, private edition, on SAP HANA before 31 December 2030, and on SAP&apos;s commercial conditions. SAP is clear that it is not a maintenance extension.</p>
          <p>The later dates buy time, at a price. They don&apos;t remove the migration. They move it.</p>
        </>}>
        <Figure className="mt-[clamp(2rem,4vw,3rem)]" caption="SAP ECC maintenance dates. Source: SAPinsider, September 2026; eligible products for the transition option are listed in SAP Note 3591251.">
          <div className="surface-dark bg-navy-900 p-[clamp(1.5rem,4vw,3rem)] text-on-navy">
            <Track
              label="SAP ECC maintenance timeline: today, end of 2027, 2028 to 2030, 2031 to 2033"
              onNavy
              rowFrom="lg"
              items={[
                { label: "Today", node: "solid", note: "Start the data work on ECC: assessment, cleansing and Business Partner preparation." },
                { label: "31 Dec 2027", node: "ring", dashed: true, note: "Mainstream maintenance ends for SAP ECC 6.0 and SAP PI/PO 7.5." },
                { label: "2028–2030", node: "hollow", dashed: true, note: "Optional extended maintenance, at two percentage points more on the maintenance basis." },
                { label: "2031–2033", node: "hollow", note: "Transition option, only for systems moved to SAP ERP, private edition, before the end of 2030." },
              ]}
            />
          </div>
        </Figure>
      </Part>

      <Part id="queue" n="02" title="The queue is forming" image={images.eccQueue} body={<>
          <p>Many organisations will not be finished by 2027. In a DSAG survey of 198 senior leaders at SAP customers in Germany, Austria and Switzerland, run between December 2025 and January 2026, about half of ECC users said they would go past the 2027 deadline. 37% aimed to switch by the end of 2027, and almost half of those still investing in ECC planned to migrate by the end of 2030. They gave four reasons: complex system landscapes, skills shortages, parallel transformation projects and limited budgets.</p>
          <p>Globally, the picture is moving. ASUG and Precisely reported in November 2025 that 59% of companies are fully or partially live on S/4HANA, up 13 percentage points from 2024. The same research named data quality, including accuracy and transformation problems with legacy data, as a critical but often overlooked challenge.</p>
          <p>Put the two together and the risk is plain: the remaining ECC customers will compete for the same experienced people between now and 2030. Work you finish before the queue peaks is work you don&apos;t have to buy at the peak.</p>
        </>}>
        <SourcedStats stats={surveys} />
      </Part>

      <Part id="pace" n="03" title="Why the data sets the pace" image={images.eccMockLoad} body={<>
          <p>The first big decision is the route: greenfield, brownfield or bluefield. It is a real decision, with process, business and cost trade-offs, and it often takes months. The data work doesn&apos;t have to wait for it, because every route ends in the same place: S/4HANA running on data the business trusts.</p>
          <p>In our projects, timelines rarely slip on the technical conversion. They slip when mock loads fail on custom fields nobody mapped, when duplicates surface late, and when reconciliation drags into cutover because no one agreed what &ldquo;correct&rdquo; means. All three can be found, and mostly fixed, on ECC.</p>
          <p>What differs between the routes is where the data effort lands.</p>
        </>}>
        <ul aria-label="Where the data effort lands on each migration route" className="m-0 mt-[clamp(2rem,4vw,3rem)] grid list-none gap-4 p-0 lg:grid-cols-3">
          {routes.map((r) => (
            <li key={r.t} className="flex flex-col gap-3 border-t-4 border-ink bg-surface p-6">
              <h3 className="m-0 text-[22px]">{r.t}</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{r.s}</span>
              <p className="m-0 text-[16px] text-muted">{r.d}</p>
            </li>
          ))}
        </ul>
      </Part>

      <Part id="now" n="04" title="Five things to do on ECC before you choose a route" image={images.eccFixAtSource} body={<>
          <p>None of these needs a signed migration programme or a new system. They run on the ECC you have today, and each one makes the next phase shorter.</p>
          <p>The principle behind all five: fix data where it lives. A correction made in ECC carries into every later extract and mock load. A correction made in a load file has to be made again, every cycle, until cutover.</p>
          <p>By the time you choose a route, you should know what your data looks like, who owns each object, and how much cleaning is left.</p>
        </>}>
        <NumberedGrid items={steps} />
        <div className="mt-[clamp(2rem,4vw,3rem)] grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Figure caption="An example data-readiness scorecard (sample, not client data). An assessment produces one row per object, each with an owner and agreed sign-off rules.">
            <DataTable caption="Data readiness by object" head={["Object", "Finding", "Status"]} rows={scorecard} />
          </Figure>
          <aside aria-label="Why the order matters" className="border-t-4 border-accent bg-surface p-[clamp(1.25rem,3vw,2rem)]">
            <p className="m-0 text-xl font-semibold leading-[1.45]">The first four steps don&apos;t depend on the route you pick. The fifth gives you a realistic timeline for each route, which is exactly the evidence the route decision needs.</p>
          </aside>
        </div>
      </Part>

      <Part id="work" n="05" title="What the migration work looks like" image={images.eccMockCycles} body={<>
          <p>Once the route is set, the same cycle runs for each object: extract from ECC and any non-SAP sources, cleanse and validate against the agreed rules, load into S/4HANA, reconcile, and repeat the mock loads until the numbers match.</p>
          <p>Each mock load should reject fewer records than the last. When the count stops falling, the cause is usually upstream: a rule nobody agreed, a mapping that was never signed off, or source data that was patched in a file instead of fixed in ECC.</p>
          <p>A clean start on ECC means fewer cycles, a calmer dress rehearsal and an earlier business sign-off.</p>
        </>} />

      <Part id="texiri" n="06" title="How Texiri helps" image={images.eccKlicks} body={<>
          <p>We run S/4HANA data migration on greenfield, brownfield and bluefield programmes for clients in the USA, Europe, the Middle East, Australia and India, with SAP BODS / Data Services, Syniti ADM, the S/4HANA Migration Cockpit and our own 2Klicks. We often own the data workstream inside a larger programme, alongside your systems integrator.</p>
          <p>For one of Australia&apos;s top utility companies, we moved Plant Maintenance, Project Systems, Supply Chain and Finance from legacy systems to S/4HANA, with a smooth cutover and operations running throughout. <Link href="/case-studies/utility-australia/" data-track="case_study_view">Read the case study</Link>.</p>
          <p><Link href="/2klicks/">2Klicks</Link> works on both ECC and S/4HANA, so the same tool corrects data on ECC now and loads it into S/4HANA later. Business users download a template, update it in Excel and upload it, with validation before anything is posted.</p>
        </>}>
        <ProofStats items={proof} />
      </Part>

      <FAQAccordion id="faq-h" title="ECC 2027 questions" faqs={faqs} />
      <ArticleSources sources={sources} />
      <ArticleRelated items={related} />

      <CTABand title="Get a data-readiness view of your ECC system." note="A senior consultant reads every enquiry and replies personally." primary={{ label: "Talk to a migration architect", href: "/contact/?type=migration" }} secondary={{ label: "Request a 2Klicks demo", href: DEMO_HREF }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
