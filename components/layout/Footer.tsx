import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 bg-[#faf9f7] border-t border-gray-100">
      <div className="text-[#5d605e] text-xs uppercase tracking-widest mb-4 md:mb-0 font-body">
        © {new Date().getFullYear()} The Editorial Engineer. Built with precision.
      </div>
      <div className="flex gap-8 items-center text-xs uppercase tracking-widest font-body">
        <Link
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5d605e] hover:text-[#50662b] underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          LinkedIn
        </Link>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5d605e] hover:text-[#50662b] underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          GitHub
        </Link>
        <Link
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5d605e] hover:text-[#50662b] underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          Twitter
        </Link>
        <Link
          href={`mailto:${siteConfig.author.email}`}
          className="text-[#5d605e] hover:text-[#50662b] underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          Email
        </Link>
      </div>
    </footer>
  )
}
