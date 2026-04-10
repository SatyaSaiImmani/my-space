import { Brain, Server, Database, Cloud, Globe } from "lucide-react"

const skills = [
  {
    icon: Brain,
    title: "AI Systems",
    items: ["RAG Architectures", "Vector Databases (MongoDB Atlas)", "PyTorch & TensorFlow"],
    bg: "bg-[#ffffff]",
    shadow: "shadow-sm",
    iconColor: "text-[#50662b]",
    textColor: "text-[#303331]",
  },
  {
    icon: Server,
    title: "Backend Platforms",
    items: ["Java / Spring Boot", "Python / FastAPI", "Microservices Design"],
    bg: "bg-[#edeeec]",
    shadow: "",
    iconColor: "text-[#50662b]",
    textColor: "text-[#303331]",
  },
  {
    icon: Database,
    title: "Data Engineering",
    items: ["PostgreSQL / MongoDB", "Apache Kafka / Spark", "ETL Pipeline Design", "Data Modeling"],
    bg: "bg-[#ffffff]",
    shadow: "shadow-sm",
    iconColor: "text-[#50662b]",
    textColor: "text-[#303331]",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    items: ["AWS (S3, EC2, Lambda)", "Docker & Kubernetes", "CI/CD (GitHub Actions)", "Terraform"],
    bg: "bg-[#edeeec]",
    shadow: "",
    iconColor: "text-[#50662b]",
    textColor: "text-[#303331]",
  },
]

export function SkillsSection() {
  return (
    <section className="px-6 max-w-6xl mx-auto py-24 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#303331] font-headline">Technical Arsenal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.title}
            className={`${skill.bg} ${skill.shadow} p-8 rounded-2xl space-y-4`}
          >
            <skill.icon className={`${skill.iconColor} w-8 h-8`} />
            <h3 className={`text-xl font-bold font-headline ${skill.textColor}`}>{skill.title}</h3>
            <ul className="space-y-2 text-[#5d605e] text-sm font-body">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Frontend — wide card spanning 2 cols */}
        <div className="md:col-span-2 bg-[#d2eca2] p-8 rounded-2xl space-y-4">
          <Globe className="text-[#43581f] w-8 h-8" />
          <h3 className="text-xl font-bold text-[#43581f] font-headline">Frontend Engineering</h3>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-2 text-[#43581f] text-sm font-body">
              <li>React / Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
            <ul className="space-y-2 text-[#43581f] text-sm font-body">
              <li>TypeScript</li>
              <li>Responsive Design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
