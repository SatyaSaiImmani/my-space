import { TimelineItem } from "./TimelineItem"

interface TimelineEntry {
  period: string
  title: string
  company: string
  bullets: string[]
}

interface TimelineProps {
  entries: TimelineEntry[]
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="space-y-12 relative before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#e1e3e0] ml-4 md:ml-0 pl-8">
      {entries.map((entry, i) => (
        <TimelineItem key={i} {...entry} />
      ))}
    </div>
  )
}
