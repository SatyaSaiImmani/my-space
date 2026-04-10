import type { Metadata } from "next"
import { ContactSection } from "@/components/sections"
import { routes } from "@/lib/metadata/routes"

export const metadata: Metadata = routes.contact

export default function ContactPage() {
  return <ContactSection />
}
