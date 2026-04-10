"use client"

import { useState } from "react"
import { submitContact } from "@/app/actions/contact"
import { Send } from "lucide-react"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    const result = await submitContact(data)

    if (result.success) {
      setStatus("success")
      form.reset()
    } else {
      setStatus("error")
      setErrorMsg(result.error ?? "Something went wrong.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-xs font-bold uppercase tracking-widest text-[#5d605e] ml-1 font-label"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          required
          className="w-full bg-[#edeeec] border-none rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#50662b]/20 transition-all text-[#303331] placeholder:text-[#b0b2b0] font-body"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-widest text-[#5d605e] ml-1 font-label"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          required
          className="w-full bg-[#edeeec] border-none rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#50662b]/20 transition-all text-[#303331] placeholder:text-[#b0b2b0] font-body"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-xs font-bold uppercase tracking-widest text-[#5d605e] ml-1 font-label"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          rows={5}
          required
          className="w-full bg-[#edeeec] border-none rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#50662b]/20 transition-all text-[#303331] placeholder:text-[#b0b2b0] resize-none font-body"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm font-body">{errorMsg}</p>
      )}
      {status === "success" && (
        <p className="text-[#50662b] text-sm font-body font-semibold">
          Message sent! I&apos;ll get back to you soon.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-br from-[#50662b] to-[#455a20] text-[#f0ffcf] font-semibold py-4 px-8 rounded-lg shadow-md hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed font-body"
      >
        <span>{status === "loading" ? "Sending…" : "Send Message"}</span>
        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  )
}
