"use client";

import { useActionState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitContactForm, type FormState } from "@/app/contact";

const PURPOSE_OPTIONS = [
  "Job Opportunity",
  "Collaboration",
  "General Inquiry",
  "Other",
];

const initialState: FormState = {};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [state.success]);

  if (state.success) {
    return (
      <p className="text-center text-sm text-green-700 font-medium py-4">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-md">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-purpose">Purpose</Label>
        <select
          id="contact-purpose"
          name="purpose"
          required
          defaultValue=""
          className={cn(
            "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          )}
        >
          <option value="" disabled className="text-muted-foreground">
            Select a purpose
          </option>
          {PURPOSE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="text-foreground">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your message…"
          required
          rows={4}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors outline-none resize-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      {state.error && (
        <p className="text-xs text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
