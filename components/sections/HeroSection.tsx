import Image from "next/image"
import Link from "next/link"
import { Terminal } from "lucide-react"
import { siteConfig } from "@/config/site"

export function HeroSection() {
  return (
    <section className="pt-32 px-6 max-w-6xl mx-auto pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left: Text */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#303331] leading-tight font-headline">
              Sri Satya Sai{" "}
              <span className="text-[#50662b]">Immani</span>
            </h1>
            <p className="text-2xl font-medium text-[#5d605e] leading-tight font-body">
              Full-Stack Software Engineer focused on AI systems, backend platforms, and data products
            </p>
          </div>

          <p className="text-lg text-[#5d605e] max-w-xl font-body">
            Engineering scalable architectures and intelligent systems. Specializing in bridging the gap between sophisticated data modeling and performant production environments.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="px-8 py-3 bg-[#50662b] text-[#f0ffcf] rounded-xl font-semibold shadow-lg hover:bg-[#455a20] transition-all duration-200 hover:-translate-y-0.5 font-body"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#d8e8c9] text-[#48563e] rounded-xl font-semibold hover:opacity-90 transition-all font-body"
            >
              Get In Touch
            </Link>
          </div>

          <div className="flex gap-6 pt-4">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#787b79] hover:text-[#50662b] transition-colors font-body text-sm"
            >
              <Terminal size={16} />
              LinkedIn
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#787b79] hover:text-[#50662b] transition-colors font-body text-sm"
            >
              <Terminal size={16} />
              GitHub
            </Link>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="md:col-span-5 relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#e7e8e6] relative z-10">
            <Image
              src="/stitch/hero-portrait.jpg"
              alt="Sri Satya Sai Immani — Full-Stack Software Engineer"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#d8e8c9] rounded-3xl -z-10 opacity-40" />
        </div>
      </div>
    </section>
  )
}
