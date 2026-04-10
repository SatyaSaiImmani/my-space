import { Trophy, Star, GraduationCap } from "lucide-react"

const strengths = [
  {
    title: "AI Product Engineering",
    description:
      "Moving beyond wrappers to build deeply integrated intelligence within production-grade software.",
  },
  {
    title: "Scalable Services",
    description:
      "Designing distributed systems that handle high concurrency and mission-critical reliability.",
  },
  {
    title: "Data Architecture",
    description:
      "Structuring complex schemas and pipelines to support real-time analytics and ML modeling.",
  },
]

const achievements = [
  {
    icon: Trophy,
    title: "Best Solo Hack",
    description:
      'Kent Hack Enough 2026 — Recognized for "RabbitHole" project among 200+ participants.',
  },
  {
    icon: Star,
    title: "National Honor Society",
    description: "Academic excellence and leadership in computing.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: [
      "MS in Computer Science — Case Western Reserve University",
      "BTech in IT — VIT University",
    ],
  },
]

export function StrengthsSection() {
  return (
    <section className="px-6 max-w-6xl mx-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Core Strengths */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#303331] font-headline">Core Strengths</h2>
          <div className="space-y-6">
            {strengths.map((s) => (
              <div key={s.title} className="bg-[#f4f4f1] p-6 rounded-2xl">
                <h4 className="font-bold text-[#50662b] mb-2 font-headline">{s.title}</h4>
                <p className="text-sm text-[#5d605e] font-body">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#303331] font-headline">Achievements</h2>
          <div className="space-y-6">
            {achievements.map((a) => (
              <div key={a.title} className="flex gap-6 items-start">
                <div className="p-3 bg-[#fce8a2] rounded-xl text-[#62541d] flex-shrink-0">
                  <a.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold font-headline text-[#303331]">{a.title}</h4>
                  {Array.isArray(a.description) ? (
                    a.description.map((line) => (
                      <p key={line} className="text-sm text-[#5d605e] font-body">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-[#5d605e] font-body">{a.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
