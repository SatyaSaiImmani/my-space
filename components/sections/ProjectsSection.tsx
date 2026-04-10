import Image from "next/image"
import Link from "next/link"
import { Terminal } from "lucide-react"

const projects = [
  {
    id: "rabbithole",
    title: "RabbitHole",
    description:
      "An AI-driven exploration engine that visualizes semantic connections between topics, allowing users to dive deep into knowledge graphs.",
    tags: ["Python", "Next.js"],
    role: "Lead Architect & Developer",
    impact: "Recognized for best-in-class UI and semantic navigation.",
    image: "/stitch/project-rabbithole.jpg",
    github: "#",
    imageAlt: "RabbitHole — AI exploration engine visualization",
    reverse: false,
  },
  {
    id: "noveltease",
    title: "NovelTease",
    description:
      "A specialized content delivery platform for independent authors featuring lightning-fast search and personalized discovery algorithms.",
    tags: ["Backend", "FastAPI"],
    role: "Full-Stack Engineer",
    impact: "Handled 10k+ requests/min during beta launch with zero downtime.",
    image: "/stitch/project-noveltease.jpg",
    github: "#",
    imageAlt: "NovelTease — content delivery platform",
    reverse: true,
  },
  {
    id: "urban-stress",
    title: "Urban Stress Indicator",
    description:
      "Interactive dashboard monitoring real-time urban stressors, visualizing traffic, noise, and air quality across city zones.",
    tags: ["Data Viz", "D3.js"],
    role: "Frontend & Data Pipeline Dev",
    impact: "Used by local municipality planners for transit optimization studies.",
    image: "/stitch/project-urban-stress.jpg",
    github: "#",
    imageAlt: "Urban Stress Indicator dashboard",
    reverse: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 max-w-6xl mx-auto py-24 space-y-16">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-bold text-[#303331] font-headline">Featured Projects</h2>
        <Link href="/projects" className="text-[#50662b] font-bold hover:underline font-body text-sm">
          View All Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#e1e3e0] rounded-3xl overflow-hidden"
          >
            <div
              className={`h-full min-h-[300px] relative ${project.reverse ? "md:order-2" : ""}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover"
              />
            </div>

            <div className={`p-12 space-y-6 ${project.reverse ? "md:order-1" : ""}`}>
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white text-[#50662b] text-xs font-bold rounded-full font-label"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl font-bold font-headline text-[#303331]">{project.title}</h3>
              <p className="text-[#5d605e] font-body">{project.description}</p>

              <div className="text-sm font-medium font-body text-[#303331]">
                Role: {project.role}
              </div>

              <div className="italic text-[#50662b] border-l-4 border-[#50662b] pl-4 font-body text-sm">
                Impact: {project.impact}
              </div>

              <div className="flex gap-4">
                <Link
                  href={project.github}
                  className="flex items-center gap-2 font-bold text-[#303331] hover:text-[#50662b] transition-colors font-body text-sm"
                >
                  <Terminal size={16} />
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
