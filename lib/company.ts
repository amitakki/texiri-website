// Company, leadership and careers content. Move to the CMS once Sanity/Payload is chosen.

/** `verify` marks a claim still awaiting confirmation (rendered with a placeholder badge). */
/** `icon` is a key into the icon map in components/sections.tsx. Facts from the Texiri Profile 2026. */
export const credentials: { t: string; d: string; icon: "experience" | "countries" | "clients" | "tools"; verify?: string }[] = [
  { t: "20+ years in SAP", d: "SAP transformation programmes and data migration.", icon: "experience" },
  { t: "Clients on 5 continents", d: "USA, Europe, Middle East, Australia, India.", icon: "countries" },
  { t: "Fortune 500 clients", d: "And high-growth enterprises, since 2021.", icon: "clients", verify: "TO VERIFY" },
  // Content decision C6: proprietary, not patented.
  { t: "Proprietary SAP migration tools", d: "2Klicks: SAP RE-FX mass data, 10× faster at 75% lower cost.", icon: "tools", verify: "BENCHMARK TO VERIFY" },
];

/** Verbatim from the old site's homepage (content decision P7: approved for publishing, Nov 2026). */
export const testimonials = {
  utility: { quote: "Texiri has been an invaluable partner, demonstrating exceptional commitment and relentless hard work. Consistently exceeding our expectations, their dedication is evident in every aspect of their work. Texiri is a trusted and indispensable asset to our team, and we're grateful for the positive impact they've had on our success.", who: "Utility client, Australia" },
  retail: { quote: "We engaged Texiri for their technical expertise, and the results surpassed our expectations. Their remarkable understanding of our industry's challenges translates into tailored, efficient, and forward-thinking solutions – a testament to their profound technical acumen.", who: "Major retail client, USA" },
  realEstate: { quote: "We're delighted with Texiri's teamwork and empathy. Their personal connection with our team and collaborative spirit have created a positive, inclusive environment. Texiri not only contributes expertise but also fosters unity, making them a joy to work with. We appreciate the positive impact they've had on our collaboration.", who: "Real estate client, USA" },
};

/** `icon` is a key into the icon map in app/about/page.tsx. */
export const principles: { title: string; body: string; icon: "people" | "tools" | "verify" | "support" }[] = [
  { title: "Senior people on the work", body: "The consultants who scope your project are the ones who deliver it.", icon: "people" },
  { title: "Tools over manual effort", body: "Where a task repeats, we automate it, which is how 2Klicks began.", icon: "tools" },
  { title: "Data you can verify", body: "Every load and change is recorded in SAP change documents your auditors can read.", icon: "verify" },
  { title: "We stay after go-live", body: "Managed services from the team that knows how your system was built.", icon: "support" },
];

export type Leader = {
  name: string;
  role: string;
  /** Key into `images` in lib/images.ts. */
  image: "founder" | "santosh";
  bio: string[];
  facts: [string, string][];
  linkedin?: string;
};

// Muttu's title is "Founder & CEO" (content decision L4). Patents are not mentioned in his bio (L6).
export const leaders: Leader[] = [
  {
    name: "Muttu Sarashetti",
    role: "Founder & CEO",
    image: "founder",
    bio: [
      "Muttu began his career at SAP Labs India and has more than 20 years of global SAP consulting and digital transformation experience across India, the USA, Europe, Australia and Singapore.",
      "He has led global SAP transformation programmes and architected enterprise-scale RE-FX solutions managing more than 17,000 lease contracts. His expertise spans SAP RE-FX, IFRS 16, S/4HANA, lease accounting, ERP integration, custom SAP development, data migration and enterprise solution architecture.",
      "He founded Texiri in 2021 and leads the design of the 2Klicks tools. He is also a co-founder of 10 Gravity Partners and an advocate for sustainable development.",
    ],
    facts: [["Started at", "SAP Labs India"], ["Experience", "20+ years in SAP"], ["Focus", "RE-FX, IFRS 16, S/4HANA migration, 2Klicks"], ["Also", "Co-founder, 10 Gravity Partners"]],
    linkedin: "https://www.linkedin.com/in/muttannasarashetti/",
  },
  {
    name: "Santosh S Angadi",
    role: "Chief Revenue Officer",
    image: "santosh",
    bio: [
      "Santosh has more than 20 years in programme and project management across ERP, CRM, digital transformation and enterprise automation, with expertise in SAP/ERP functional analysis, CRM implementations, data migration and process automation.",
      "He has led more than 48 enterprise projects for power utilities and global clients using Agile and SDLC methods, and has managed and mentored cross-functional teams of 200 to 440 people. His automation, CRM integration and process work has delivered operational efficiency gains of more than 50%.",
    ],
    facts: [["Experience", "20+ years, ERP and CRM programmes"], ["Delivery", "48+ enterprise projects"], ["Teams", "200–440 professionals"], ["Previously", "L&T Technology Services, Easun Reyrolle, Aditi Technologies, CG Parivar IT Solutions"]],
    linkedin: "https://www.linkedin.com/in/santosh-s-angadi/",
  },
];

export const founder = leaders[0];

/** Content decision H2. The mailbox must exist before launch, or CVs bounce. */
export const CAREERS_EMAIL = "careers@texiri.com";

export type RoleTeam = "SAP" | "AI" | "Early career";
export type Role = { team: RoleTeam; title: string; where: string; exp: string; skills: string; body: string };
/**
 * Live openings only (content decision H1). The careers page shows a "no roles listed" message while this is empty.
 * The five sample roles that were here are in git history (commit 352654d, lib/company.ts).
 */
export const roles: Role[] = [];

export const lifeAtTexiri = [
  { t: "Client work from the start", d: "You join live projects, not a bench." },
  { t: "Learn from SAP veterans", d: "Pair with consultants who have 20+ years in SAP." },
  { t: "Build the tools", d: "Contribute to 2Klicks and internal accelerators." },
  { t: "Grow into AI", d: "Learn and build alongside the TEXIRI AI Community, our platform for AI collaboration." },
];

// The four stages from the old site's careers page.
export const hiringSteps = [
  { title: "Submit your resume", body: "Your CV and a few lines on what you want to work on." },
  { title: "Technical discussions", body: "Multiple rounds with our consultants, based on real project work." },
  { title: "HR discussion", body: "Role, expectations, location and joining date." },
  { title: "Onboarding", body: "A mentor, project context and access to 2Klicks from your first week." },
];

export const shambhavi108 = {
  summary: "Took a career break? Restart in software with structured SAP training from Texiri, and a path to a job when you finish.",
  // Content decisions S1–S4: an SAP track, hybrid. Duration and fees are not stated until they are fixed.
  format: "The training is in SAP, mostly online, with some sessions at our Vijayapura office.",
  blocks: [
    ["Who it's for", "Graduates who stepped away from work, for family or any other reason, and want to restart in the software field."],
    ["What it asks of you", "Consistent effort, a set number of hours each week, and a laptop. We ask you to commit to finishing the training."],
    ["What happens after", "Candidates who complete the training may be offered a role, working on real projects with the Texiri team."],
  ],
};

export const S108_STEPS = [
  { label: "About you", fields: [
    { id: "reference", label: "Reference (who referred you, or where you heard about us)", kind: "text" },
    { id: "name", label: "Name", kind: "text", auto: "name" },
    { id: "location", label: "Current location", kind: "text", auto: "address-level2" },
    { id: "age", label: "Age", kind: "number", optional: true },
    { id: "qualification", label: "Highest qualification", kind: "text" },
    { id: "gradYear", label: "Graduation year", kind: "number" },
    { id: "married", label: "Married?", kind: "choice", opts: ["Yes", "No"], optional: true },
    { id: "children", label: "Children? If yes, how many", kind: "text", optional: true },
    { id: "mobile", label: "Mobile number", kind: "tel", auto: "tel" },
    { id: "email", label: "Email ID", kind: "email", auto: "email" },
  ] },
  { label: "Background", fields: [
    { id: "occupation", label: "Current occupation (if professional, years of experience)", kind: "text" },
    { id: "laptop", label: "Laptop available?", kind: "choice", opts: ["Yes", "No"] },
    { id: "english", label: "English communication skill: rate yourself 1–5", kind: "choice", opts: ["1", "2", "3", "4", "5"] },
    { id: "intro", label: "Please introduce yourself in a few lines", kind: "area" },
    { id: "education", label: "Tell us about your education and professional background", kind: "area" },
  ] },
  { label: "Career break", fields: [
    { id: "breakReason", label: "What led to your career break?", kind: "area" },
    { id: "breakUse", label: "How did you use your career break, and what helped you stay connected to learning, personal growth or professional development?", kind: "area" },
    { id: "whyRestart", label: "Why do you want to restart your career now in the software field?", kind: "area" },
    { id: "impact", label: "How will this opportunity impact your family and your future?", kind: "area" },
    { id: "strengths", label: "What strengths or qualities make you a committed learner?", kind: "area" },
  ] },
  { label: "Commitment", fields: [
    { id: "commitment", label: "How committed are you to completing the training?", kind: "area" },
    { id: "hours", label: "How many hours per week can you dedicate to training?", kind: "number" },
    { id: "acceptJob", label: "If offered the job after training, are you willing to take it up?", kind: "choice", opts: ["Yes", "No"] },
    { id: "describe", label: "Describe yourself in a few words", kind: "text" },
    { id: "pledge", label: "I understand this programme requires consistent effort, and I commit to completing it sincerely.", kind: "check" },
    { id: "consent", label: "I agree that Texiri Solutions may use the details in this form, including any answers I give about age, family and my career break, to assess my application, as described in the Privacy Policy.", kind: "check" },
  ] },
] as const;
