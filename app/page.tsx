import type { Metadata } from "next"
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  StrengthsSection,
} from "@/components/sections"
import { routes } from "@/lib/metadata/routes"

export const metadata: Metadata = routes.home

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <StrengthsSection />
    </>
  )
}
