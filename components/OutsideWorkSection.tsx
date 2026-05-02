"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: "1",
    src: "/sri.jpeg",
    alt: "Photo 1",
    caption: "A placeholder caption. Replace with your own.",
  },
  {
    id: "2",
    src: "/hero.png",
    alt: "Photo 2",
    caption: "A placeholder caption. Replace with your own.",
  },
  {
    id: "3",
    src: "/cwru-logo.png",
    alt: "Photo 3",
    caption: "A placeholder caption. Replace with your own.",
  },
  {
    id: "4",
    src: "/sri.jpeg",
    alt: "Photo 4",
    caption: "A placeholder caption. Replace with your own.",
  },
  {
    id: "5",
    src: "/hero.png",
    alt: "Photo 5",
    caption: "A placeholder caption. Replace with your own.",
  },
];

const SCROLL_AMOUNT = 288;

export default function OutsideWorkSection() {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () =>
    stripRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const scrollRight = () =>
    stripRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  return (
    <div className="flex flex-col gap-4">
      {/* Arrow row */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={scrollLeft} aria-label="Scroll left">
          <ChevronLeft className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={scrollRight} aria-label="Scroll right">
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Scroll strip */}
      <div
        ref={stripRef}
        className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {photos.map((photo) => (
          <div key={photo.id} className="snap-start shrink-0 w-64 flex flex-col gap-2">
            <div className="rounded-xl overflow-hidden h-64 w-full bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-[#3a3a3a] leading-snug">{photo.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
