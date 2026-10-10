import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, LegalTable, type LegalSection } from "@/components/LegalPage";
import { Placeholder } from "@/components/ui";
import { contact, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Texiri Solutions Private Limited collects, uses and protects personal data from its website forms, under India's DPDP Act 2023 and the GDPR.",
  alternates: { canonical: "/legal/privacy/" },
};

// DRAFT for lawyer review (content decisions G1–G3). Keep in step with lib/leads.ts and the three forms.
const hq = offices.find((o) => o.hq)!;
const tbc = <Placeholder>TO CONFIRM</Placeholder>;
const mail = <a href={`mailto:${contact.email}`}>{contact.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who", title: "Who we are",
    body: (
      <>
        <p>This website is run by <strong>{contact.legalName}</strong> (&ldquo;Texiri&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company registered in India {contact.cin ? <>(CIN {contact.cin})</> : tbc}, with its registered office at {hq.street.join(", ")}, {hq.locality}, {hq.region} {hq.postalCode}, India.</p>
        <p>For the personal data described here, we are the <strong>data fiduciary</strong> under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and the <strong>controller</strong> under the EU and UK General Data Protection Regulation (GDPR). You can contact us about privacy at {mail}.</p>
      </>
    ),
  },
  {
    id: "scope", title: "What this policy covers",
    body: (
      <>
        <p>This policy covers personal data we collect through texiri.com, mainly through its three forms: business enquiries (including 2Klicks demo requests), TEXIRI AI Community sign-ups and Shambhavi 108 applications.</p>
        <p>It does not cover data we process for clients during SAP or AI projects. That is governed by our contracts with those clients.</p>
      </>
    ),
  },
  {
    id: "collect", title: "What we collect and why",
    body: (
      <>
        <LegalTable
          head={["Form", "Personal data", "Why we use it", "Legal basis"]}
          rows={[
            ["Business enquiry and 2Klicks demo", "Name, email, company, role, enquiry type, phone (optional), your message, the page you sent it from, the time you gave consent.", "To reply, arrange a scoping call or demo, and prepare a proposal. We note whether the email is a personal address so we can route it.", "Your consent (DPDP Act s.6). Under the GDPR, also our legitimate interest in answering business enquiries and steps you ask us to take before a contract."],
            ["TEXIRI AI Community", "Name, email, city, role, AI experience, why you're joining (optional), phone (optional), the time you gave consent.", "To send community updates, plan in-person sessions near you, and suggest a learning path. Never used for sales.", "Your consent."],
            ["Shambhavi 108", "Reference, name, location, age, highest qualification, graduation year, marital status, number of children, mobile, email, occupation, laptop availability, a self-rating of English, and your written answers about your education, career break, motivation, family, strengths and commitment.", "To assess your application for the programme, contact you about it, and plan training.", "Your consent, given with the checkbox on the form."],
            ["Every visitor", "IP address and technical data from your browser.", "To protect the forms from spam and abuse (Cloudflare Turnstile) and to run the website securely (hosting logs).", "Our legitimate interest in keeping the site secure (GDPR); reasonable purposes for security (DPDP Act)."],
          ]}
        />
        <h3>Why the Shambhavi 108 form asks about age and family</h3>
        <p>Shambhavi 108 is a career-restart programme for people returning to work after a break. We ask about age, marital status and children to understand each applicant&apos;s situation and plan training that fits around it. {tbc} These answers are used only to assess your application and are never shared outside the people who review applications.</p>
        <p>We do not use your data for automated decisions, and we do not sell it.</p>
      </>
    ),
  },
  {
    id: "sharing", title: "Who we share it with",
    body: (
      <>
        <p>Only the Texiri staff who handle each form can see its submissions. We use these service providers (data processors) to run the website and forms. They may only use your data to provide their service to us:</p>
        <LegalTable
          head={["Provider", "What they do", "Where"]}
          rows={[
            ["Vercel Inc.", "Hosts the website and processes form submissions.", "USA and other regions"],
            ["Cloudflare, Inc.", "Turnstile spam protection on the forms.", "Global network"],
            ["Resend", "Delivers form notifications and confirmation emails.", "USA"],
            ["Google LLC", "Google Workspace email and Google Sheets, where we keep a record of submissions.", "Global"],
            ["Upstash, Inc. (if enabled)", "Counts submissions per IP address to limit abuse. Stores only the IP address, for 10 minutes.", "Region chosen by us"],
          ]}
        />
        <p>We may also disclose data where the law requires it, for example to a court or regulator.</p>
      </>
    ),
  },
  {
    id: "transfers", title: "International transfers",
    body: (
      <p>Some of these providers store or process data outside India, including in the USA. The DPDP Act allows this except to countries the Government of India restricts. For visitors in the EEA or UK, transfers rely on the providers&apos; Standard Contractual Clauses or equivalent safeguards.</p>
    ),
  },
  {
    id: "retention", title: "How long we keep it",
    body: (
      <LegalTable
        head={["Data", "Kept for"]}
        rows={[
          ["Business enquiries", <>[X] months after our last contact with you, or longer if you become a client. {tbc}</>],
          ["Community members", <>Until you leave the community, then [X] months. {tbc}</>],
          ["Shambhavi 108 applications", <>[X] months after the selection decision, unless you join the programme. {tbc}</>],
          ["Rate-limit counters", "10 minutes."],
        ]}
      />
    ),
  },
  {
    id: "rights", title: "Your rights",
    body: (
      <>
        <p>Under the DPDP Act you can ask us for a summary of the personal data we hold about you and how we use it, ask us to correct, complete, update or erase it, withdraw your consent at any time, nominate someone to exercise your rights if you die or become unable to, and raise a grievance with us.</p>
        <p>If the GDPR applies to you, you also have the right to restrict or object to our use of your data, to receive it in a portable format, and to complain to your local data protection authority.</p>
        <p>To use any of these rights, email {mail}. We reply within [30] days. {tbc} Withdrawing consent doesn&apos;t affect what we did before you withdrew it. Community members can also stop updates by replying &ldquo;unsubscribe&rdquo; to any of our emails.</p>
      </>
    ),
  },
  {
    id: "grievance", title: "Grievance officer",
    body: (
      <>
        <p>If you have a concern about how we handle your data, contact our grievance officer:</p>
        <LegalList items={[<>Name: [Grievance officer] {tbc}</>, <>Email: {mail}</>, <>Post: {contact.legalName}, {hq.street.join(", ")}, {hq.locality}, {hq.region} {hq.postalCode}, India</>]} />
        <p>If you&apos;re not satisfied with our response, you can complain to the Data Protection Board of India.</p>
      </>
    ),
  },
  {
    id: "children", title: "Children",
    body: <p>Our forms are meant for people aged 18 or over. Shambhavi 108 applicants must be at least 18. If you are under 18 and want to join the TEXIRI AI Community, please ask a parent or guardian to contact us first at {mail}. {tbc}</p>,
  },
  {
    id: "device", title: "Saved answers on your device",
    body: <p>The Shambhavi 108 form saves your answers in your browser&apos;s local storage as you type, so you can finish later. They stay on your device and are sent to us only when you submit. They are deleted after you submit, after 30 days, or when you choose &ldquo;Clear saved answers&rdquo;. On a shared computer, clear them when you&apos;re done. See also our <Link href="/legal/cookies/">Cookie Policy</Link>.</p>,
  },
  {
    id: "security", title: "How we protect it",
    body: <p>The site is served only over HTTPS. Access to submissions is limited to the staff who need them, and our providers are bound by contracts to keep data secure. No system is completely secure, so if we learn of a breach affecting you, we will tell you and the authorities as the law requires.</p>,
  },
  {
    id: "changes", title: "Changes to this policy",
    body: <p>We may update this policy as the website changes, for example when we add analytics or a CRM. The date at the top shows when it last changed. If a change affects how we use data you have already given us, we will ask for your consent again where required.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      href="/legal/privacy/"
      updated="10 October 2026"
      intro={<p className="m-0">How we collect, use and protect personal data when you contact us, join the TEXIRI AI Community or apply to Shambhavi 108.</p>}
      sections={sections}
    />
  );
}
