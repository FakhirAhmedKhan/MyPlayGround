"use client";

import { useState } from "react";
import type { EducationItem } from "@/lib/types";

interface EducationTimelineProps {
  items: EducationItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    </svg>
  ),
  Sparkles: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  Code: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  BookOpen: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
};

/** Fallback avatar when logo URL fails */
function LogoFallback({
  label,
  gradient,
}: {
  label: string;
  gradient: string;
}) {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white text-xs font-bold rounded-lg"
      style={{ background: `linear-gradient(135deg, ${gradient})` }}
    >
      {label.charAt(0)}
    </div>
  );
}

function InstitutionLogo({
  src,
  alt,
  gradient,
}: {
  src: string;
  alt: string;
  gradient: string;
}) {
  const [errored, setErrored] = useState(false);
  return errored ? (
    <LogoFallback label={alt} gradient={gradient} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-lg"
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default function EducationTimeline({ items }: EducationTimelineProps) {
  return (
    <div className="relative" role="list" aria-label="Education timeline">
      {/* Timeline line */}
      <div
        className="absolute left-8 top-4 bottom-4 w-px hidden sm:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139,92,246,0.6), rgba(59,130,246,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            id={`education-item-${index}`}
            className="group relative flex gap-6 sm:gap-8"
            role="listitem"
          >
            {/* Timeline dot — desktop */}
            <div className="relative flex-shrink-0 hidden sm:flex">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${getGradientColors(item.color)})`,
                  boxShadow: `0 8px 25px ${getGlowColor(item.color)}`,
                }}
              >
                {iconMap[item.icon] ?? iconMap.GraduationCap}
              </div>
            </div>

            {/* Content card */}
            <div
              className="flex-1 p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(139,92,246,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(139,92,246,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  {/* Mobile icon */}
                  <div
                    className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${getGradientColors(item.color)})`,
                    }}
                  >
                    <div className="w-4 h-4">
                      {iconMap[item.icon] ?? iconMap.GraduationCap}
                    </div>
                  </div>
                  <h3 className="text-slate-100 font-semibold text-base leading-snug group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Institution logo — plain img with error fallback */}
                  <div
                    className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <InstitutionLogo
                      src={item.logo}
                      alt={item.title}
                      gradient={getGradientColors(item.color)}
                    />
                  </div>

                  <span
                    className="px-3 py-1 text-xs font-semibold rounded-full text-white whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${getGradientColors(item.color)})`,
                    }}
                  >
                    {item.year}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getGradientColors(colorClass: string): string {
  const map: Record<string, string> = {
    "from-purple-500 to-pink-500": "#a855f7, #ec4899",
    "from-blue-500 to-cyan-500": "#3b82f6, #06b6d4",
    "from-emerald-500 to-teal-500": "#10b981, #14b8a6",
    "from-orange-500 to-red-500": "#f97316, #ef4444",
    "from-indigo-500 to-purple-500": "#6366f1, #a855f7",
    "from-amber-500 to-orange-500": "#f59e0b, #f97316",
    "from-rose-500 to-pink-500": "#f43f5e, #ec4899",
  };
  return map[colorClass] ?? "#a855f7, #3b82f6";
}

function getGlowColor(colorClass: string): string {
  const map: Record<string, string> = {
    "from-purple-500 to-pink-500": "rgba(168,85,247,0.3)",
    "from-blue-500 to-cyan-500": "rgba(59,130,246,0.3)",
    "from-emerald-500 to-teal-500": "rgba(16,185,129,0.3)",
    "from-orange-500 to-red-500": "rgba(249,115,22,0.3)",
    "from-indigo-500 to-purple-500": "rgba(99,102,241,0.3)",
    "from-amber-500 to-orange-500": "rgba(245,158,11,0.3)",
    "from-rose-500 to-pink-500": "rgba(244,63,94,0.3)",
  };
  return map[colorClass] ?? "rgba(139,92,246,0.3)";
}
