import { ContactForm } from "@/components/forms/ContactForm"

export function ContactSection() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center">
      {/* Hero text */}
      <div className="max-w-2xl w-full text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#303331] leading-tight font-headline">
          Contact Sri Satya Sai Immani
        </h1>
        <p className="text-lg md:text-xl text-[#5d605e] leading-relaxed max-w-xl mx-auto font-body">
          Currently exploring opportunities in AI platforms, high-performance
          backend systems, and data product engineering. Let&apos;s build
          something architectural.
        </p>
      </div>

      {/* Form card */}
      <div className="w-full max-w-xl bg-white rounded-xl p-8 md:p-12 shadow-[0_12px_40px_rgba(48,51,49,0.03)]">
        <ContactForm />
      </div>
    </main>
  )
}
