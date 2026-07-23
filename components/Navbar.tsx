"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

type NavbarProps = {
  sections: string[]
  socials: Record<string, string>
}

function NavbarContent({
  sections,
  socials,
  activeId,
  onNavigate,
}: {
  sections: string[]
  socials: Record<string, string>
  activeId: string
  onNavigate?: () => void
}) {
  return (
    <div className="navbar flex flex-col items-center justify-center h-full">
      {/* Profile Image */}
      <div className="ProfileImage w-full flex justify-center items-center">
        <div className="bg-[#ebebeb] w-40 h-40 rounded-full overflow-hidden shadow-md my-10">
          <Image
            src="/sri.jpeg"
            alt="Profile"
            width={160}
            height={160}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Name */}
      <div className="Name flex items-center justify-center font-bold font-main-name">
        Sri Satya Sai Immani
      </div>

      {/* Role */}
      <div className="Role flex items-center justify-center mt-2 font-light text-green-700 text-[15px]">
        AI ENGINEER
      </div>

      {/* Page Sections */}
      <div className="flex flex-col items-center mt-4">
        {sections.map((section) => {
          const isActive = section === activeId
          return (
            <div
              key={section}
              className={`py-2 text-sm tracking-widest cursor-pointer transition-colors duration-300 ${
                isActive ? "text-green-700" : "text-[#3a3a3a] hover:text-green-700"
              }`}
            >
              <a href={`#${section}`} onClick={onNavigate} className="relative group">
                <span>{section}</span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-green-700 rounded-full transform transition-transform duration-300 origin-center group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </div>
          )
        })}
      </div>

      {/* Socials */}
      <span className="flex flex-row items-center justify-center gap-4 mt-4">
        {Object.entries(socials).map(([key, url]) => (
          <a key={key} href={url} target="_blank" rel="noreferrer">
            <Image src={`/${key}-logo.svg`} width={20} height={20} alt={`${key} logo`} />
          </a>
        ))}
      </span>
    </div>
  )
}

export default function Navbar({ sections, socials }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState("HOME")

  useEffect(() => {
    const handler = (e: Event) => setActiveId((e as CustomEvent<string>).detail)
    window.addEventListener("sectionchange", handler)
    return () => window.removeEventListener("sectionchange", handler)
  }, [])

  return (
    <>
      {/* Desktop sidebar — hidden below lg */}
      <aside className="hidden lg:flex lg:w-1/5 lg:flex-none bg-[#f0f0f0] flex-col">
        <NavbarContent sections={sections} socials={socials} activeId={activeId} />
      </aside>

      {/* Mobile hamburger — hidden at lg and above */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-[#f0f0f0] shadow-md hover:bg-[#e0e0e0] transition-colors"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-[#3a3a3a]" />
      </button>

      {/* Mobile drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-4/5 sm:max-w-xs bg-[#f0f0f0] overflow-y-auto p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <NavbarContent
            sections={sections}
            socials={socials}
            activeId={activeId}
            onNavigate={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
