import Link from "next/link"
import { Terminal, Code2, Mail } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 py-3 z-50 flex justify-between items-center bg-white rounded-full shadow-[0_12px_40px_rgba(48,51,49,0.05)]">
      <div className="text-xl font-bold tracking-tighter text-[#50662b] font-headline">
        The Editorial Engineer
      </div>

      <div className="hidden md:flex gap-8 items-center text-sm font-medium font-body">
        <Link
          href="/#about"
          className="text-[#5d605e] hover:text-[#50662b] transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/#projects"
          className="text-[#5d605e] hover:text-[#50662b] transition-colors duration-300"
        >
          Projects
        </Link>
        <Link
          href="/#experience"
          className="text-[#5d605e] hover:text-[#50662b] transition-colors duration-300"
        >
          Experience
        </Link>
        <Link
          href="/contact"
          className="text-[#5d605e] hover:text-[#50662b] transition-colors duration-300"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4 text-[#50662b]">
        <Terminal size={18} />
        <Code2 size={18} />
        <Mail size={18} />
      </div>
    </nav>
  )
}
