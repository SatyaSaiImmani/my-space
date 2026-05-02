"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  description: string;
  images: string[];
  imageAlts?: string[];
}

const entries: EducationEntry[] = [
  {
    id: "cwru",
    institution: "Case Western Reserve University",
    degree: "Master of Science",
    field: "Computer Science and Engineering",
    duration: "2024 – 2026",
    description:
      "Graduated in computer science with a focus on AI systems, distributed computing, and software engineering. Concurrently worked as an AI Engineer at the university's Utech division, applying research directly to production systems.",
    images: ["/cwru-logo.png"],
    imageAlts: ["Case Western Reserve University"],
  },
  {
    id: "vit",
    institution: "Vellore Institute of Technology",
    degree: "Bachelor of Science",
    field: "Information Technology",
    duration: "2018 – 2022",
    description:
      "Completed undergraduate studies in Information Technology, building a strong foundation in data structures, algorithms, databases, operating systems, and software engineering principles.",
    images: ["/Vellore_Institute_of_Technology_seal_2017.svg.png"],
    imageAlts: ["Vellore Institute of Technology seal"],
  },
];

export default function EducationSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const goToCard = (index: number) => {
    setActiveCard(index);
    setImageIndex(0);
  };

  const prevCard = () => goToCard((activeCard - 1 + entries.length) % entries.length);
  const nextCard = () => goToCard((activeCard + 1) % entries.length);

  const entry = entries[activeCard];
  const prevImage = () =>
    setImageIndex((i) => (i - 1 + entry.images.length) % entry.images.length);
  const nextImage = () =>
    setImageIndex((i) => (i + 1) % entry.images.length);

  return (
    <div className="flex flex-col gap-8">
      {/* Card carousel */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        {/* Sliding track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeCard * 100}%)` }}
        >
          {entries.map((e, cardIdx) => (
            <div
              key={e.id}
              className="w-full shrink-0 flex flex-col md:flex-row bg-white min-h-72"
            >
              {/* LEFT — details */}
              <div className="flex-1 flex flex-col justify-center gap-4 p-8 md:p-10">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                    {e.duration}
                  </p>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] leading-snug">
                    {e.institution}
                  </h3>
                  <p className="text-sm font-medium text-gray-500">
                    {e.degree} · {e.field}
                  </p>
                </div>
                <p className="text-sm text-[#3a3a3a] leading-relaxed">{e.description}</p>
              </div>

              {/* RIGHT — image carousel */}
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 bg-gray-50">
                <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  {e.images.length > 0 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={e.images[cardIdx === activeCard ? imageIndex : 0]}
                      alt={e.imageAlts?.[cardIdx === activeCard ? imageIndex : 0] ?? e.institution}
                      className="w-full h-full object-contain p-6"
                    />
                  )}
                </div>
                {e.images.length > 1 && (
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-5" />
                    </Button>
                    <div className="flex items-center gap-1.5">
                      {e.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImageIndex(i)}
                          aria-label={`Go to image ${i + 1}`}
                          className={cn(
                            "rounded-full transition-all duration-200",
                            i === imageIndex
                              ? "size-2.5 bg-green-700"
                              : "size-2 bg-gray-300 hover:bg-gray-400",
                          )}
                        />
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outer carousel navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevCard} aria-label="Previous entry">
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex items-center gap-2">
          {entries.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              aria-label={`Go to ${entries[i].institution}`}
              className={cn(
                "rounded-full transition-all duration-200",
                i === activeCard
                  ? "size-2.5 bg-green-700"
                  : "size-2 bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>

        <Button variant="ghost" size="icon" onClick={nextCard} aria-label="Next entry">
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
