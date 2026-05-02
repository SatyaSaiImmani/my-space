"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AudienceItem, ReferenceLink } from "@/app/projects";

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  expandedDescription: string;
  features: string[];
  audience: AudienceItem[];
  referenceLinks: ReferenceLink[];
  images: string[];
  imageAlts?: string[];
  /** CSS color string applied as the collapsed card background, e.g. "#f59e0b" */
  color: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  expandedDescription,
  features,
  audience,
  referenceLinks,
  images,
  imageAlts,
  color,
}: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [referenceLinksOpen, setReferenceLinksOpen] = useState(false);

  const collapse = () => {
    setExpanded(false);
    setCarouselIndex(0);
    setFeaturesOpen(false);
    setAudienceOpen(false);
    setReferenceLinksOpen(false);
  };

  const prevImage = () =>
    setCarouselIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setCarouselIndex((i) => (i + 1) % images.length);

  return (
    <div
      style={!expanded ? { backgroundColor: color } : undefined}
      className={cn(
        "transition-all duration-500 ease-in-out",
        expanded
          ? "w-full flex flex-row bg-white rounded-xl shadow-lg col-span-2"
          : "w-full flex flex-col rounded-xl p-4 gap-2 justify-between",
      )}
    >
      {!expanded && (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-black/60">
              {subtitle}
            </p>
            <h2 className="text-base font-bold truncate">{title}</h2>
            <p className="text-sm text-black/70 line-clamp-2">{description}</p>
          </div>
          <Button
            variant="link"
            size="sm"
            onClick={() => setExpanded(true)}
            className="self-start px-0"
          >
            Show more
          </Button>
        </div>
      )}

      {expanded && (
        <>
          {/* LEFT — 60% */}
          <div className="flex-3 flex flex-col gap-4 p-6 overflow-y-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              {subtitle}
            </p>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600">{expandedDescription}</p>

            {/* Features collapsible */}
            <button
              onClick={() => setFeaturesOpen((o) => !o)}
              className="flex items-center gap-2 w-full text-left font-semibold text-sm py-2 border-b border-gray-200 hover:text-amber-700 transition-colors"
            >
              {featuresOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
              Features
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                featuresOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <ul className="flex flex-col gap-1 py-2 pl-4 list-disc list-inside">
                {features.map((f, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience collapsible */}
            <button
              onClick={() => setAudienceOpen((o) => !o)}
              className="flex items-center gap-2 w-full text-left font-semibold text-sm py-2 border-b border-gray-200 hover:text-amber-700 transition-colors"
            >
              {audienceOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
              Audience
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                audienceOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <ul className="flex flex-col gap-2 py-2 pl-4">
                {audience.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700">{item.title}</li>
                ))}
              </ul>
            </div>

            {/* Reference Links collapsible */}
            <button
              onClick={() => setReferenceLinksOpen((o) => !o)}
              className="flex items-center gap-2 w-full text-left font-semibold text-sm py-2 border-b border-gray-200 hover:text-amber-700 transition-colors"
            >
              {referenceLinksOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
              Reference Links
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                referenceLinksOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <ul className="flex flex-col gap-2 py-2 pl-4">
                {referenceLinks.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline-offset-4 hover:underline flex items-center gap-1"
                    >
                      {item.label}
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="link"
              size="sm"
              onClick={collapse}
              className="self-start px-0 mt-auto"
            >
              Show less
            </Button>
          </div>

          {/* RIGHT — 40% (hidden when no images) */}
          {images.length > 0 && <div className="flex-2 flex flex-col items-center justify-center gap-3 p-4 bg-gray-50">
            <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[carouselIndex]}
                alt={imageAlts?.[carouselIndex] ?? `${title} ${carouselIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                disabled={images.length <= 1}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <div className="flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      i === carouselIndex
                        ? "size-2.5 bg-amber-500"
                        : "size-2 bg-gray-300 hover:bg-gray-400",
                    )}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                disabled={images.length <= 1}
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>}
        </>
      )}
    </div>
  );
}
