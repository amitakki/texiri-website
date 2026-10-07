// Company, leadership and careers content. Move to the CMS once Sanity/Payload is chosen.
export const credentials = [
  ["Founder-led since SAP Labs India", "Our CEO began his career at SAP Labs India."],
  ["20+ years in SAP", "Consulting and enterprise transformation."],
  ["Delivery across 5 countries", "India, USA, Germany, Singapore, Australia."],
  ["Patented SAP migration tools", "2Klicks Create and 2Klicks Update."],
] as const;

export const principles = [
  { title: "Senior people on the work", body: "The consultants who scope your project are the ones who deliver it." },
  { title: "Tools over manual effort", body: "Where a task repeats, we automate it, which is how 2Klicks began." },
  { title: "Data you can verify", body: "Every load and change leaves validation logs your auditors can read." },
  { title: "We stay after go-live", body: "Managed services from the team that knows how your system was built." },
];

export const founder = {
  name: "Muttu Sarashetti",
  role: "Founder & CEO",
  bio: "Muttu began his career at SAP Labs India and has spent more than 20 years in SAP consulting and enterprise transformation. He founded Texiri to bring that depth to clients directly, and leads the design of the 2Klicks tools.",
  facts: [["Started at", "SAP Labs India"], ["Focus", "RE-FX, S/4HANA migration, 2Klicks"]],
  linkedin: "https://www.linkedin.com/company/texiri", // [TO CONFIRM] personal profile URL
};

export const CAREERS_EMAIL = "careers@texiri.com"; // [TO CONFIRM]

export type RoleTeam = "SAP" | "AI" | "Early career";
// [TO CONFIRM] sample roles until Texiri supplies live openings
export const roles: { team: RoleTeam; title: string; where: string; exp: string; skills: string; body: string }[] = [
  { team: "SAP", title: "SAP RE-FX Functional Consultant", where: "Vijayapura / Navi Mumbai", exp: "4+ years", skills: "RE-FX, FI/CO integration, lease accounting", body: "Configure and migrate real-estate objects, contracts and conditions for clients in the USA and India." },
  { team: "SAP", title: "S/4HANA Data Migration Consultant", where: "Navi Mumbai / Hybrid", exp: "3+ years", skills: "Migration Cockpit, Data Services, 2Klicks, MDG", body: "Plan, cleanse and load master and transactional data for S/4HANA programmes." },
  { team: "SAP", title: "SAP CPI Integration Developer", where: "Vijayapura / Remote (India)", exp: "2+ years", skills: "SAP CPI, PI/PO, Groovy, APIs", body: "Build integration flows and help clients move from PI/PO to Integration Suite." },
  { team: "AI", title: "AI / ML Engineer", where: "Vijayapura / Hybrid", exp: "2+ years", skills: "Python, RAG, LLM evaluation, MLOps", body: "Ship generative AI and forecasting systems for enterprise clients, with governance built in." },
  { team: "Early career", title: "Associate SAP Consultant", where: "Vijayapura", exp: "Graduate", skills: "Any engineering or commerce degree, curiosity", body: "Join a mentored track covering SAP fundamentals, 2Klicks and live project work." },
];

export const lifeAtTexiri = [
  { t: "Client work from the start", d: "You join live projects, not a bench." },
  { t: "Learn from SAP veterans", d: "Pair with consultants who have 20+ years in SAP." },
  { t: "Build the tools", d: "Contribute to 2Klicks and internal accelerators." },
  { t: "Grow into AI", d: "Free access to the TEXIRI AI Community and its learning paths." },
];

// [TO CONFIRM] timings
export const hiringSteps = [
  { title: "Apply", body: "CV and a few lines on what you want to work on." },
  { title: "Conversation", body: "A 30-minute call with the hiring lead." },
  { title: "Technical session", body: "A practical exercise based on real project work." },
  { title: "Offer", body: "A decision and written offer, usually within a week." },
];

export const shambhavi108 = {
  summary: "Took a career break? Restart in software with structured training from Texiri, and a path to a job when you finish.",
  blocks: [
    ["Who it's for", "Graduates who stepped away from work, for family or any other reason, and want to restart in the software field."],
    ["What it asks of you", "Consistent effort, a set number of hours each week, and a laptop. We ask you to commit to finishing the training."],
    ["What happens after", "Candidates who complete the training may be offered a role, working on real projects with the Texiri team."],
  ],
  // [TO CONFIRM] training duration, format (online or Vijayapura), tracks and fees
};

export const S108_STEPS = [
  { label: "About you", fields: [
    { id: "reference", label: "Reference (who referred you, or where you heard about us)", kind: "text" },
    { id: "name", label: "Name", kind: "text", auto: "name" },
    { id: "location", label: "Current location", kind: "text", auto: "address-level2" },
    { id: "age", label: "Age", kind: "number" },
    { id: "qualification", label: "Highest qualification", kind: "text" },
    { id: "gradYear", label: "Graduation year", kind: "number" },
    { id: "married", label: "Married?", kind: "choice", opts: ["Yes", "No"] },
    { id: "children", label: "Children? If yes, how many", kind: "text" },
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
  ] },
] as const;
