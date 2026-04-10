import type { Metadata } from "next"
import { ProjectsSection } from "@/components/sections"
import { routes } from "@/lib/metadata/routes"

export const metadata: Metadata = routes.projects

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <ProjectsSection />
    </div>
  )
}
