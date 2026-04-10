import { cn } from "@/lib/utils"

type SectionBg = "surface" | "surface-container-low" | "surface-container" | "none"

interface SectionProps {
  children: React.ReactNode
  className?: string
  bg?: SectionBg
  id?: string
}

const bgMap: Record<SectionBg, string> = {
  surface: "bg-[#faf9f7]",
  "surface-container-low": "bg-[#f4f4f1]",
  "surface-container": "bg-[#edeeec]",
  none: "",
}

export function Section({ children, className, bg = "none", id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24", bgMap[bg], className)}>
      {children}
    </section>
  )
}
