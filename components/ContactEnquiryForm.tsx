"use client";

import { useSearchParams } from "next/navigation";
import { ENQUIRY_TYPES } from "@/lib/enquiry";
import { EnquiryForm } from "./EnquiryForm";

const TYPE_PARAM: Record<string, (typeof ENQUIRY_TYPES)[number]> = { ai: "AI Services", "2klicks": "2Klicks demo", migration: "S/4HANA data migration", partner: "Partnership" };

/** Reads ?type= on the client so /contact/ can stay a static page. Render inside <Suspense>. */
export function ContactEnquiryForm({ headingId }: { headingId: string }) {
  const type = useSearchParams().get("type");
  return <EnquiryForm defaultType={(type && TYPE_PARAM[type]) || undefined} headingId={headingId} />;
}
