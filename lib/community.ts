import { z } from "zod";

export const COMMUNITY_ROLES = ["Student", "Working professional", "Developer", "Educator", "Entrepreneur", "Other"] as const;

export const EXPERIENCE_LEVELS = [
  { value: "new", label: "Just discovered AI yesterday" },
  { value: "tried", label: "I've chatted with ChatGPT" },
  { value: "tinker", label: "I've built a thing or two" },
  { value: "build", label: "I train models for fun" },
  { value: "pro", label: "I explain AI to ChatGPT" },
] as const;

/** Community joins — essential fields only. Routed to the community list, never the sales CRM. */
export const communityJoinSchema = z.object({
  name: z.string().trim().min(1, "Tell us what to call you."),
  email: z.string().trim().email("Enter a valid email, like you@example.com."),
  city: z.string().trim().min(1, "Enter your city."),
  role: z.enum(COMMUNITY_ROLES, { errorMap: () => ({ message: "Choose the role closest to yours." }) }),
  level: z.enum(EXPERIENCE_LEVELS.map((l) => l.value) as [string, ...string[]], { errorMap: () => ({ message: "Pick the option that sounds most like you." }) }),
  why: z.string().trim().max(1000).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy so we can send you updates." }) }),
});

export type CommunityJoin = z.infer<typeof communityJoinSchema>;
