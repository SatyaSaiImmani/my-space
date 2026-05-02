"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

const schema = z.object({
  name: z.string().min(1, "Name is required."),
  purpose: z.enum(
    ["Job Opportunity", "Collaboration", "General Inquiry", "Other"] as const,
    { error: "Please select a valid purpose." },
  ),
  email: z.email("Please enter a valid email address."),
  message: z.string().min(1, "Message is required."),
});

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = schema.safeParse({
    name: formData.get("name"),
    purpose: formData.get("purpose"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Invalid input.";
    return { success: false, error: firstError };
  }

  const { name, email, purpose, message } = result.data;

  const { error } = await resend.emails.send({
    from: "contact@immanisrisatyasai.com",
    to: "srisatyasaiimmani@proton.me",
    replyTo: email,
    subject: `[Portfolio] ${purpose} from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPurpose: ${purpose}\n\n${message}`,
  });

  if (error) {
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true, message: "Thanks! I'll get back to you soon." };
}
