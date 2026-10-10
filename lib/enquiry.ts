import { z } from "zod";

export const ENQUIRY_TYPES = [
  "SAP implementation / consulting",
  "S/4HANA data migration",
  "SAP integration",
  "SAP managed services",
  "2Klicks demo",
  "AI Services",
  "Partnership",
  "Other",
] as const;

const freeMail = /@(gmail|googlemail|yahoo|ymail|rediffmail|hotmail|outlook|live|msn|icloud|me|aol|proton|protonmail)\./i;

/** Personal mailbox providers. Not blocked: shown as a soft hint and flagged in the notification. */
export const isFreeMail = (email: string) => freeMail.test(email);

/** Shared by the client form and the server action — one schema, both sides. */
export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email, like name@company.com.").max(200),
  company: z.string().trim().min(1, "Enter your company name.").max(160),
  role: z.string().trim().min(1, "Enter your role.").max(120),
  type: z.enum(ENQUIRY_TYPES),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the Privacy Policy so we can reply." }) }),
});

export type Enquiry = z.infer<typeof enquirySchema>;
