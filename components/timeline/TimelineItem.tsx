interface TimelineItemProps {
  period: string
  title: string
  company: string
  bullets: string[]
}

export function TimelineItem({ period, title, company, bullets }: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Dot */}
      <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#50662b] ring-4 ring-[#faf9f7]" />

      <div className="space-y-4">
        <div>
          <span className="text-sm font-bold text-[#50662b] font-label">{period}</span>
          <h3 className="text-xl font-bold font-headline text-[#303331]">{title}</h3>
          <p className="text-[#5d605e] font-medium italic font-body">{company}</p>
        </div>
        <ul className="space-y-2 text-[#5d605e] list-disc pl-4 font-body text-sm">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
