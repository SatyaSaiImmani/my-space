import { Timeline } from "@/components/timeline/Timeline"

const experience = [
  {
    period: "PRESENT",
    title: "Generative AI Research Assistant",
    company: "Case Western Reserve University (CWRU)",
    bullets: [
      "Leading research on large-scale generative model fine-tuning for specialized domain knowledge.",
      "Architected data preprocessing pipelines that improved model training efficiency by 40%.",
      "Collaborating with cross-functional teams to integrate AI models into educational software.",
    ],
  },
  {
    period: "2023 – 2024",
    title: "Full Stack Software Engineer",
    company: "Deloitte",
    bullets: [
      "Engineered microservices for a Fortune 500 financial platform using Spring Boot and React.",
      "Optimized SQL queries and database indexing, reducing dashboard load times by 2 seconds.",
      "Led a team of 4 junior developers in a greenfield project for cloud asset tracking.",
    ],
  },
  {
    period: "2022",
    title: "Software Engineer Intern",
    company: "Deloitte",
    bullets: [
      "Developed automated testing suites using Selenium, improving code coverage by 25%.",
      "Built an internal tool for API documentation automation.",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 max-w-6xl mx-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-bold text-[#303331] sticky top-32 font-headline">
            Experience
          </h2>
          <p className="mt-4 text-[#5d605e] font-body">
            Developing enterprise solutions and conducting cutting-edge AI research.
          </p>
        </div>

        <div className="md:col-span-8">
          <Timeline entries={experience} />
        </div>
      </div>
    </section>
  )
}
