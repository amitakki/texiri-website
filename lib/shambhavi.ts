import { z } from "zod";

const req = z.string().trim().min(1, "This field is required.").max(4000, "Please keep this under 4,000 characters.");
const yesNo = z.enum(["Yes", "No"], { errorMap: () => ({ message: "Please choose an option." }) });

/** Shared by the client form and the server action. Field ids match S108_STEPS in lib/company.ts. */
export const s108Schema = z.object({
  reference: req, name: req, location: req,
  age: z.coerce.number({ invalid_type_error: "Enter your age in years." }).int().min(18, "Enter your age in years.").max(70, "Enter your age in years."),
  qualification: req,
  gradYear: z.coerce.number().int().min(1970, "Enter a four-digit year, like 2014.").max(2030, "Enter a four-digit year, like 2014."),
  married: yesNo, children: req,
  mobile: z.string().trim().max(30, "Enter a 10-digit mobile number.").refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit mobile number."),
  email: z.string().trim().email("Enter a valid email, like name@example.com.").max(200),
  occupation: req, laptop: yesNo,
  english: z.enum(["1", "2", "3", "4", "5"], { errorMap: () => ({ message: "Please choose an option." }) }),
  intro: req, education: req, breakReason: req, breakUse: req, whyRestart: req, impact: req, strengths: req, commitment: req,
  hours: z.coerce.number().min(1, "Enter hours per week, like 15.").max(80, "Enter hours per week, like 15."),
  acceptJob: yesNo, describe: req,
  pledge: z.literal(true, { errorMap: () => ({ message: "Please confirm your commitment to continue." }) }),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to how we use your details so we can assess your application." }) }),
});
export type S108Application = z.infer<typeof s108Schema>;
