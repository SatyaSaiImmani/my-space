import { cn } from "@/lib/utils"

interface StackProps {
  children: React.ReactNode
  className?: string
  gap?: "sm" | "md" | "lg" | "xl"
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
  xl: "gap-12",
}

export function Stack({ children, className, gap = "md" }: StackProps) {
  return (
    <div className={cn("flex flex-col", gapMap[gap], className)}>
      {children}
    </div>
  )
}

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 2 | 3 | 4
}

const colsMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}

export function Grid({ children, className, cols = 3 }: GridProps) {
  return (
    <div className={cn("grid gap-6", colsMap[cols], className)}>
      {children}
    </div>
  )
}
