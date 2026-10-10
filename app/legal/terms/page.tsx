import type { Metadata } from "next";
import Link from "next/link";
import { LegalList, LegalPage, type LegalSection } from "@/components/LegalPage";
import { Placeholder } from "@/components/ui";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use texiri.com, the website of Texiri Solutions Private Limited.",
  alternates: { canonical: "/legal/terms/" },
};

// DRAFT for lawyer review (content decision G5).
const sections: LegalSection[] = [
  {
    id: "about", title: "About these terms",
    body: <p>These terms apply when you use texiri.com, run by {contact.legalName} (&ldquo;Texiri&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to them. If you don&apos;t agree, please don&apos;t use the site.</p>,
  },
  {
    id: "use", title: "Using the site",
    body: (
      <>
        <p>You may use the site to learn about our services and to contact us. You agree not to:</p>
        <LegalList items={[
          "use the site in a way that breaks any law;",
          "send spam, false information or someone else's details through our forms;",
          "try to gain unauthorised access to the site, interfere with how it works, or overload it;",
          "copy large parts of the site automatically (scraping) without our written permission.",
        ]} />
      </>
    ),
  },
  {
    id: "info", title: "Information on the site",
    body: <p>The content on this site is general information about our services. It isn&apos;t professional advice for your specific situation, and we don&apos;t guarantee that it is complete or up to date. Examples, ROI figures and case studies are illustrative; actual results depend on each project. Anything we commit to is set out in a written agreement.</p>,
  },
  {
    id: "ip", title: "Intellectual property",
    body: (
      <>
        <p>The site&apos;s content, design and the Texiri and 2Klicks names and logos belong to Texiri or our licensors. You may view and print pages for your own reference, but not reuse them commercially without our written permission.</p>
        <p>SAP, S/4HANA and other SAP products mentioned are trademarks or registered trademarks of SAP SE in Germany and other countries. Other product and company names belong to their owners. We are not affiliated with or endorsed by SAP SE unless we say so.</p>
      </>
    ),
  },
  {
    id: "forms", title: "Enquiries and applications",
    body: <p>Please give accurate information when you use our forms. Sending an enquiry doesn&apos;t create a contract. Applying to Shambhavi 108, joining the TEXIRI AI Community or applying for a role doesn&apos;t guarantee selection, a place on a programme or a job offer.</p>,
  },
  {
    id: "links", title: "Links to other sites",
    body: <p>The site links to other websites, such as LinkedIn and Instagram. We aren&apos;t responsible for their content or how they handle your data.</p>,
  },
  {
    id: "liability", title: "Our liability",
    body: <p>We work to keep the site available and accurate, but we provide it &ldquo;as is&rdquo;. To the extent the law allows, we aren&apos;t liable for any loss arising from your use of the site or reliance on its content. Nothing in these terms limits liability that can&apos;t be limited by law.</p>,
  },
  {
    id: "privacy", title: "Privacy",
    body: <p>Our <Link href="/legal/privacy/">Privacy Policy</Link> explains how we handle personal data, and our <Link href="/legal/cookies/">Cookie Policy</Link> explains the cookies we use.</p>,
  },
  {
    id: "changes", title: "Changes",
    body: <p>We may update these terms from time to time. The date at the top shows when they last changed. Continuing to use the site after a change means you accept the updated terms.</p>,
  },
  {
    id: "law", title: "Governing law",
    body: <p>These terms are governed by the laws of India. The courts at Vijayapura, Karnataka have exclusive jurisdiction over any dispute about them. <Placeholder>JURISDICTION TO CONFIRM</Placeholder></p>,
  },
  {
    id: "contact", title: "Contact",
    body: <p>Questions about these terms: <a href={`mailto:${contact.email}`}>{contact.email}</a> or {contact.phoneDisplay}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      href="/legal/terms/"
      updated="10 October 2026"
      intro={<p className="m-0">The rules for using texiri.com.</p>}
      sections={sections}
    />
  );
}
