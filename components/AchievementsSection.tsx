"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/app/achievements";

const BADGE_ICONS = { Trophy, Award, Star, Medal };

interface Props {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: Props) {
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
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-700 ease-in-out",
        visible ? "opacity-100" : "opacity-20",
      )}
    >
      {achievements.map((item) => {
        const Icon = BADGE_ICONS[item.badge];
        return (
          <div
            key={item.id}
            className="flex flex-row items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            {/* Badge */}
            <div
              className={cn(
                "size-12 rounded-full flex items-center justify-center shrink-0",
                item.badgeColor,
              )}
            >
              <Icon className={cn("size-6", item.badgeIconColor)} />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-[#1a1a1a] leading-snug">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
