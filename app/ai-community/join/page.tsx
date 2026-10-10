import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections";
import { CommunityJoinForm } from "@/components/CommunityJoinForm";

export const metadata: Metadata = {
  title: "Join the TEXIRI AI Community",
  description: "Join the TEXIRI AI Community: learning paths, live sessions, workshops and projects for students, professionals, developers, educators and entrepreneurs. No experience needed.",
  alternates: { canonical: "/ai-community/join/" },
};

export default function JoinPage() {
  return (
    <div className="bg-com-bg">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Services", href: "/ai-services/" }, { label: "AI Community", href: "/ai-community/" }, { label: "Join", href: "/ai-community/join/" }]} />
      <section aria-labelledby="hero-h" className="pb-[clamp(4rem,8vw,7rem)] pt-[clamp(2rem,5vw,4rem)]">
        <div className="container-content grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-6">
            <span className="rounded-pill self-start bg-com-tint px-3.5 py-1.5 text-[13px] font-bold text-com-ink">TEXIRI AI Community</span>
            <h1 id="hero-h" className="m-0 max-w-[12ch] text-[clamp(2.5rem,5.4vw,4.5rem)] leading-none tracking-[-0.03em]">Pull up a chair. Let&apos;s learn AI.</h1>
            <p className="m-0 max-w-[44ch] text-lg text-muted">Join to hear about sessions, workshops and new learning resources, and to share your projects with other members.</p>
            <div className="rounded-com flex flex-col gap-2 bg-com-surface p-6">
              <strong>Why we ask for this</strong>
              <p className="m-0 text-[15px] text-muted">Your city helps us plan in-person sessions. Your role and experience help us suggest the right learning path. That&apos;s all we use them for.</p>
              <p className="m-0 text-[15px] text-muted">Your details are kept separate from Texiri&apos;s business enquiries and are never used for sales. Read the <Link href="/legal/privacy/" className="font-bold underline">Privacy Policy</Link>.</p>
            </div>
          </div>
          <div className="rounded-[24px] bg-com-surface p-[clamp(1.25rem,3vw,2.5rem)] shadow-md"><CommunityJoinForm /></div>
        </div>
      </section>
    </div>
  );
}
