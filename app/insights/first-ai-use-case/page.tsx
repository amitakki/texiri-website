import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CTABand, FAQAccordion, NumberedGrid } from "@/components/sections";
import { ArticleHero, articleJsonLd, ArticleRelated, ArticleSources, ArticleSummary, DataTable, Figure, Part, SourcedStats, type TableRow } from "@/components/article";
import { images } from "@/lib/images";
import { articleFor } from "@/lib/insights";
import { isLive, isReady } from "@/lib/pages";
import { METADATA_BASE } from "@/lib/site";

const HREF = "/insights/first-ai-use-case/";
const article = articleFor(HREF);
const LEAD = "Many AI pilots stall long before the model matters, because of what was chosen to build first. Here is how to get from a long list of ideas to a ranked shortlist and a first pilot with an owner, data and a target in one working day, and what to prepare so the day counts.";

export const metadata: Metadata = {
  title: article.title,
  description: "How to choose a first AI use case in a one-day workshop: who to invite, what to prepare, how to score ideas on value, data readiness, feasibility and risk, and what a good first pilot looks like.",
  alternates: { canonical: HREF },
  // Stays out of search results until the article is signed off and marked ready in lib/pages.ts (content decision I1).
  robots: { index: isReady(HREF), follow: true },
};

const jsonLd = articleJsonLd(article, { description: LEAD, image: images.aiHero, origin: METADATA_BASE });

const workshop = { label: "Request an AI readiness workshop", href: "/contact/?type=ai" };
const review = { label: "Book a production-readiness review", href: "/contact/?type=ai-review" };

const summary = [
  "A good first AI use case starts from a business problem with an owner and a measurable target, not from a technology looking for somewhere to go.",
  "In one day, the right people can turn a long list of problems into use cases scored on value, data readiness, feasibility and risk. Data and risk act as gates; value decides the order.",
  "The day ends with a ranked list, the data each use case needs and a proposed first pilot. A data readiness analysis then confirms the shortlist before anything is built.",
];

const evidence = [
  { n: "At least 30%", l: "of generative AI projects predicted to be abandoned after proof of concept by the end of 2025", s: "Gartner, July 2024" },
  { n: "60%", l: "of AI projects unsupported by AI-ready data predicted to be abandoned through 2026", s: "Gartner, February 2025" },
  { n: "37%", l: "of respondents credit AI with a positive effect on EBIT, about the same share as a year earlier", s: "McKinsey global survey, 2026" },
];

const day = [
  { title: "Goals and limits", body: "The sponsor sets out what this year must deliver, and the room agrees what AI must not do: data that cannot leave a region, decisions that stay with a person, budget and timing." },
  { title: "Problems, not ideas", body: "Each team presents its homework. Every problem is captured with its volume, time and cost, and duplicates are grouped. No solutions yet." },
  { title: "Shape use cases", body: "For the problems worth solving, the room writes down the users, the data it would need and the KPI that would show it worked. Some problems need no AI at all, and that is useful to know." },
  { title: "Score", body: "Each use case is scored on value, data readiness, feasibility and risk, with the person who can judge each criterion in the room." },
  { title: "Rank and choose", body: "Data and risk act as gates, then value and feasibility set the order. The top three get a one-page card, and one becomes the proposed first pilot." },
  { title: "Next steps", body: "Owners and dates for the data readiness analysis, the open questions for IT and risk, and what the sponsor needs to approve the pilot." },
];

const criteria: TableRow[] = [
  ["Value", "Which KPI moves, by how much, and who notices? Can we measure a baseline today?", "Benefits described only as “efficiency” or “insight”"],
  ["Data readiness", "Does the data exist, in which system, at what quality, and can we get access to it?", "“We’d need to start collecting that”"],
  ["Feasibility", "Does it fit how people work now, with the systems and skills we already have?", "Needs a new platform or a process redesign first"],
  ["Risk", "Does it make or shape decisions about people? Does it use personal data? Who must sign it off?", "Credit, hiring or access to essential services"],
];

const traits = [
  { t: "A problem people already feel", d: "Something slow, costly or error-prone that a team works around every week. If nobody complains about it today, nobody will champion the pilot.", tag: "Clear owner" },
  { t: "Data you already hold", d: "The documents, transactions or records it needs are in your systems now, and the data owner can grant access. If the data has to be collected first, it is a data project, and may be the right next one.", tag: "Data ready" },
  { t: "A number to move", d: "A KPI with a baseline you can measure today and a target agreed before anything is built: processing time, forecast accuracy, first-contact resolution.", tag: "Baseline and target" },
  { t: "A person checks the output", d: "At first, AI should draft, extract or suggest, and a person should approve. You learn how accurate it is without putting customers or postings at risk.", tag: "Human review" },
  { t: "Low regulatory risk", d: "Not a decision about people's access to credit, jobs or essential services. Those are high-risk uses under the EU AI Act and are better left until you have shipped one AI use case already.", tag: "Not high-risk" },
  { t: "Small enough to finish", d: "One process, one business unit, one group of users. A pilot that proves its value in one place is easier to scale than one that tries to cover everything.", tag: "Narrow scope" },
];

const faqs = [
  { q: "Do we need clean data before the workshop?", a: "No. The workshop shows which data each use case needs and what state it is likely to be in, as far as the people in the room know. The data readiness analysis afterwards checks quality and access properly, source by source." },
  { q: "Who should attend?", a: "A business sponsor who can approve a pilot, the owners of the processes in scope, the owners of the main data sources, IT and security, and someone from risk, compliance or data protection. Around ten people is enough; more makes scoring slow." },
  { q: "Does the first use case have to be generative AI?", a: "No. Forecasting, predictive maintenance and other machine-learning use cases often score well on data readiness, because they run on transaction and sensor data you already hold. The criteria are the same either way." },
  { q: "Our most valuable idea is high-risk under the EU AI Act. Should we start there?", a: "Usually not. High-risk uses, such as evaluating the creditworthiness of individuals or filtering job applications, come with obligations for risk management, data governance, documentation and human oversight. Proving your evaluation and governance routine on a lower-risk use case first makes the high-risk one faster and safer to deliver. We help you classify and document each use case; legal sign-off stays with you." },
  { q: "We already have a pilot that stalled. Do we need a workshop?", a: "No. A production-readiness review tests the pilot you have against evaluation, security, architecture and MLOps, and ends with a prioritised plan to get it into production." },
];

const sources = [
  { t: "Gartner predicts 30% of generative AI projects will be abandoned after proof of concept by end of 2025", by: "Gartner, 29 July 2024", href: "https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025" },
  { t: "Lack of AI-ready data puts AI projects at risk", by: "Gartner, 26 February 2025", href: "https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk" },
  { t: "The state of AI in 2026: On the road to ROI", by: "McKinsey & Company, August 2026", href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" },
  { t: "EU AI Act: key amendments adopted under the Digital Omnibus package", by: "Loyens & Loeff, 30 June 2026", href: "https://www.loyensloeff.com/insights/news--events/news/eu-ai-act-key-amendments-adopted-under-digital-omnibus-package/" },
];

export default function FirstAiUseCasePage() {
  if (!isLive(HREF)) notFound();
  const related = [
    { label: "AI Services: governed AI, from pilot to production", href: "/ai-services/" },
    { label: "How an AI engagement runs", href: "/ai-services/#engagement" },
    { label: "Security & governance for AI", href: "/ai-services/#governance" },
  ].filter((r) => isLive(r.href));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights/" }, { label: "Your first AI use case", href: HREF }]} />

      <ArticleHero article={article} lead={LEAD} byline="the Texiri AI team" image={images.aiHero} />

      <ArticleSummary points={summary} />

      <Part id="why" n="01" title="Why the first choice matters" image={images.aiProblem} body={<>
          <p>The first AI use case carries more weight than its size suggests. It is where your organisation learns how to judge an AI result, which data it can actually use, and what your risk team needs to see before it signs anything off. A first pilot that works becomes the template for the next ten. One that stalls makes the next budget harder to win.</p>
          <p>Analysts have warned about the stall for some time. In July 2024, Gartner predicted that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, inadequate risk controls, escalating costs and unclear business value. In February 2025 it added that, through 2026, organisations would abandon 60% of AI projects not supported by AI-ready data.</p>
          <p>Using AI is no longer the hard part. Getting value from it is. In McKinsey&apos;s 2026 global survey, 37% of respondents credit AI with a positive effect on EBIT, about the same share as a year earlier, and only around 6% attribute at least 5% of their EBIT to it.</p>
          <p>Most of the reasons on those lists are settled before a pilot starts: which problem it addresses, whether the data exists, and whether anyone has agreed how success will be measured. Starting from a technology leaves all three open. Starting from a problem answers them on day one.</p>
        </>}>
        <SourcedStats stats={evidence} />
      </Part>

      <Part id="prepare" n="02" title="Before the day: the right people and some homework" image={images.aiPrep} body={<>
          <p>The quality of the day depends on who is in the room. You need people who can say what a problem costs, people who know what data exists, and people who will have to approve whatever gets built.</p>
          <p>That usually means a business sponsor who can approve a pilot, the owners of the processes in scope, the owners of the main data sources, someone from IT and security, and someone from risk, compliance or data protection. Keep the group small enough to talk: around ten people is plenty.</p>
          <p>Send a short pre-read a week ahead. Ask each team for three to five problems, described in the language of their work: what happens, how often, how long it takes, and what it costs when it goes wrong. Add the systems and data you hold, and your limits: where data must stay, which decisions must stay with a person, and any budget or timing constraints.</p>
        </>}>
        <aside aria-label="The question to ask before the day" className="mt-[clamp(2rem,4vw,3rem)] max-w-[60ch] border-t-4 border-accent bg-surface p-[clamp(1.25rem,3vw,2rem)]">
          <p className="m-0 text-xl font-semibold leading-[1.45]">Don&apos;t ask teams where they could use AI. Ask what takes too long, goes wrong too often, or depends on one person. The answers make better use cases, and nobody has to know what AI can do to give them.</p>
        </aside>
      </Part>

      <Part id="day" n="03" title="The day, from goals to a ranked list" image={images.aiAgenda} body={<>
          <p>The day works because it moves in one direction: from goals, to problems, to use cases, to a ranked list. Each block produces what the next one needs, so the room never argues about an idea it cannot yet judge.</p>
          <p>Timings flex with the length of the list; the order doesn&apos;t. Scoring comes after lunch for a reason. By then everyone has heard every problem, so the scores are comparative, and the first idea on the table doesn&apos;t get the benefit of the doubt.</p>
          <p>The illustration shows sample counts from one day: 23 problems become 12 use cases, three make the shortlist and one is proposed as the first pilot.</p>
        </>}>
        <NumberedGrid items={day} />
      </Part>

      <Part id="score" n="04" title="Score every candidate on four criteria" image={images.aiMatrix} body={<>
          <p>Once each candidate is written as a use case, with a problem, its users, the data it needs and a KPI, the room scores it from 1 to 5 on four criteria. Scoring together matters more than the scores themselves: the process owner knows the value, the data owner knows what exists, IT knows what it takes to integrate, and risk knows what will need sign-off.</p>
          <p>Don&apos;t add the four scores into one number. Data readiness and risk act as gates. A use case with a 1 for data is a data project first, and a high-risk use case needs governance that a first pilot shouldn&apos;t have to invent. Among the use cases that pass both gates, value and feasibility set the order.</p>
          <p>Plotting value against readiness makes the trade-offs visible. The top-right corner holds the candidates for a first pilot. The top-left holds valuable ideas that need data work first, which are often the right second wave.</p>
        </>}>
        <div className="mt-[clamp(2rem,4vw,3rem)] grid items-start gap-x-[clamp(2rem,4vw,4rem)] gap-y-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <Figure caption="The four scoring criteria, with the question the room answers for each and the sign that a use case is not ready to be a first pilot.">
            <DataTable caption="How to score a use case" head={["Criterion", "What the room asks", "Warning sign"]} rows={criteria} />
          </Figure>
          <aside aria-label="Low scores are findings" className="border-t-4 border-accent bg-surface p-[clamp(1.25rem,3vw,2rem)]">
            <p className="m-0 text-xl font-semibold leading-[1.45]">A 1 for data readiness doesn&apos;t kill an idea. It moves the idea to the data roadmap, usually with a clear first step that the day has just identified.</p>
          </aside>
        </div>
      </Part>

      <Part id="good" n="05" title="What a good first use case looks like" image={images.aiCard} body={<>
          <p>Good first pilots share six traits, listed below. The sample card shows the result for one use case, supplier invoice extraction, which meets all six: a team feels the problem, the invoices and orders are already in your systems, days to post is easy to measure, and a clerk approves every invoice before it is posted.</p>
          <p>Some ideas look attractive and make poor first pilots. An assistant over &ldquo;all our documents&rdquo; has no single owner and nothing to measure. Credit scoring and CV screening promise high value, but systems that evaluate the creditworthiness of individuals or filter job applications are high-risk under the EU AI Act. After the 2026 Digital Omnibus amendments, obligations for stand-alone high-risk systems apply from 2 December 2027. Such systems can be built well, but they make a better second or third use case, once your evaluation and governance routine has been proven on something simpler.</p>
          <p>Every use case on the shortlist gets a one-page card like this one. If a field can&apos;t be filled in, that is a finding, not a failure.</p>
        </>}>
        <ul aria-label="Six traits of a good first AI use case" className="m-0 mt-[clamp(2rem,4vw,3rem)] grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {traits.map((p, i) => (
            <li key={p.t} className="flex flex-col gap-3 border-t-4 border-ink bg-surface p-6">
              <span className="text-sm font-extrabold text-accent-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 text-[22px]">{p.t}</h3>
              <p className="m-0 flex-1 text-[16px] text-muted">{p.d}</p>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-accent-700">{p.tag}</span>
            </li>
          ))}
        </ul>
      </Part>

      <Part id="texiri" n="06" title="After the day, and how Texiri helps" image={images.aiNext} body={<>
          <p>Our AI readiness workshop is the day described here. You leave with a ranked list of use cases, the data each one needs and a proposed first pilot. It works for any industry and any core system: the data most use cases need is already in your ERP, CRM, document stores and sensors.</p>
          <p>The steps after it are the same for every engagement. A data readiness analysis inventories each source and reports its quality and access, which narrows the ranked list to a shortlist checked against the data. Baseline and target KPIs are agreed before the pilot starts, the pilot is evaluated against them, and only then is it scaled into production with monitoring. <Link href="/ai-services/#engagement">See how an engagement runs</Link>.</p>
          <p>Everything runs in your cloud tenancy, your data is not used to train models, and each use case is risk-classified under the EU AI Act and documented for your risk team. <Link href="/ai-services/#governance">Read how we govern AI</Link>.</p>
          <p>Already have a pilot that stalled? A <Link href={review.href} data-track="ai_review_click">production-readiness review</Link> tests it against evaluation, security, architecture and MLOps. You don&apos;t need a workshop first.</p>
        </>} />

      <FAQAccordion id="faq-h" title="First AI use case questions" faqs={faqs} vertical="ai" />
      <ArticleSources sources={sources} />
      <ArticleRelated items={related} />

      <CTABand vertical="ai" title="Bring your long list. Leave with a first pilot." note="An AI lead reads every enquiry and replies personally." primary={workshop} secondary={review} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
