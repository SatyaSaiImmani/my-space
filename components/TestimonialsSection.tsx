import { cn } from "@/lib/utils";
import type { Testimonial } from "@/app/testimonials";

function initials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + (parts[parts.length - 1][0] ?? "")).toUpperCase();
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t) => (
        <div
          key={t.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-4"
        >
          {/* Photo / initials placeholder */}
          {t.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.photo}
              alt={t.name}
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "size-16 rounded-full bg-gray-200 text-gray-500",
                "flex items-center justify-center font-semibold text-lg shrink-0",
              )}
              aria-label={`${t.name} photo placeholder`}
            >
              {initials(t.name)}
            </div>
          )}

          {/* Identity */}
          <div className="flex flex-col gap-0.5">
            <p className="font-bold text-[#1a1a1a]">{t.name}</p>
            <p className="text-xs text-gray-500 leading-snug">{t.title}</p>
            <p className="text-xs text-gray-400 leading-snug">{t.organization}</p>
          </div>

          <hr className="w-full border-gray-100" />

          {/* Quote */}
          <blockquote className="text-sm text-[#3a3a3a] leading-relaxed italic">
            <span className="text-2xl text-gray-300 leading-none mr-1 not-italic">&ldquo;</span>
            {t.quote}
          </blockquote>
        </div>
      ))}
    </div>
  );
}
