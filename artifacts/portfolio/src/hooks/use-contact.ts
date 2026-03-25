import { useSubmitContact } from "@workspace/api-client-react";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.enum(["under-10k", "10k-50k", "50k-100k", "100k-plus", "not-sure"]).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactSubmission() {
  return useSubmitContact();
}
