"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/app/experience";

export default function ExperienceCard({
  company,
  location,
  role,
  duration,
  bullets,
  logo,
}: Experience) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Card */}
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-in-out bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        )}
      >
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              {duration} · {location}
            </p>
            <h3 className="text-lg font-bold text-[#1a1a1a]">{role}</h3>
            <p className="text-sm font-medium text-gray-500">{company}</p>
          </div>
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={`${company} logo`}
              className="h-8 object-contain self-start sm:self-center opacity-80"
            />
          )}
        </div>

        {/* Bullet points */}
        <ul className="flex flex-col gap-2 pl-4 list-disc list-outside">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-[#3a3a3a] leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
