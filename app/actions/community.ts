"use server";

import { communityJoinSchema } from "@/lib/community";

export type JoinState = { ok: true; firstName: string; email: string; city: string } | { ok: false; errors: Record<string, string> } | null;

export async function joinCommunity(_: JoinState, form: FormData): Promise<JoinState> {
  const raw = Object.fromEntries(form);
  const parsed = communityJoinSchema.safeParse({ ...raw, consent: raw.consent === "on" });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { ok: false, errors };
  }
  // TODO(step 9): Turnstile + rate limit, then add to the community mailing list (COMMUNITY_LIST_PROVIDER), NOT the sales CRM.
  const record = { ...parsed.data, consentAt: new Date().toISOString(), source: "ai-community" };
  console.info("community_join", record.level);
  return { ok: true, firstName: record.name.split(" ")[0], email: record.email, city: record.city };
}
