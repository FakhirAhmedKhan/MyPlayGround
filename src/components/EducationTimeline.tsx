"use client";

import { useState } from "react";
import type { EducationItem } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface EducationTimelineProps {
  items: EducationItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  Sparkles: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Code: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  BookOpen: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

function getGradientColors(colorClass: string): string {
  const map: Record<string, string> = {
    "from-purple-500 to-pink-500":   "#a855f7, #ec4899",
    "from-blue-500 to-cyan-500":     "#3b82f6, #06b6d4",
    "from-emerald-500 to-teal-500":  "#10b981, #14b8a6",
    "from-orange-500 to-red-500":    "#f97316, #ef4444",
    "from-indigo-500 to-purple-500": "#6366f1, #a855f7",
    "from-amber-500 to-orange-500":  "#f59e0b, #f97316",
    "from-rose-500 to-pink-500":     "#f43f5e, #ec4899",
  };
  return map[colorClass] ?? "#7c3aed, #2563eb";
}

function getGlowColor(colorClass: string): string {
  const map: Record<string, string> = {
    "from-purple-500 to-pink-500":   "rgba(168,85,247,0.35)",
    "from-blue-500 to-cyan-500":     "rgba(59,130,246,0.35)",
    "from-emerald-500 to-teal-500":  "rgba(16,185,129,0.35)",
    "from-orange-500 to-red-500":    "rgba(249,115,22,0.35)",
    "from-indigo-500 to-purple-500": "rgba(99,102,241,0.35)",
    "from-amber-500 to-orange-500":  "rgba(245,158,11,0.35)",
    "from-rose-500 to-pink-500":     "rgba(244,63,94,0.35)",
  };
  return map[colorClass] ?? "rgba(139,92,246,0.35)";
}

function InstitutionLogo({ src, alt, gradient }: { src: string; alt: string; gradient: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-white text-xs font-bold rounded-lg"
        style={{ background: `linear-gradient(135deg, ${gradient})` }}
      >
        {alt.charAt(0)}
      </div>
    );
  }
  return (
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

function TimelineItem({ item, index }: { item: EducationItem; index: number }) {
  const { isRTL } = useLanguage();
  const ref = useScrollReveal(0.12);
  const gradient = getGradientColors(item.color);
  const glow = getGlowColor(item.color);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`reveal group relative flex gap-6 sm:gap-8 ${isRTL ? "flex-row-reverse text-right" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      role="listitem"
    >
      {/* ── Desktop icon ── */}
      <div className="relative hidden sm:flex flex-col items-center gap-0 flex-shrink-0">
        {/* Icon circle */}
        <div
          className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-white z-10 transition-all duration-400"
          style={{
            background: `linear-gradient(135deg, ${gradient})`,
            boxShadow: hovered
              ? `0 0 0 4px rgba(7,7,13,1), 0 0 0 6px ${glow}, 0 12px 30px ${glow}`
              : `0 0 0 3px rgba(7,7,13,1), 0 0 0 4px rgba(255,255,255,0.08), 0 8px 20px ${glow.replace("0.35", "0.2")}`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          {iconMap[item.icon] ?? iconMap.GraduationCap}
        </div>

        {/* Connector line to next item */}
        <div
          className="w-px flex-1 mt-3 min-h-[2rem]"
          style={{
            background: `linear-gradient(to bottom, ${glow.replace("0.35","0.4")}, transparent)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Card ── */}
      <div
        className="flex-1 mb-8 rounded-2xl p-6 transition-all duration-400 cursor-default"
        style={{
          background: hovered ? "rgba(139,92,246,0.055)" : "rgba(255,255,255,0.026)",
          border: hovered ? `1px solid ${glow.replace("0.35","0.3")}` : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 20px 50px ${glow.replace("0.35","0.14")}, inset 0 1px 0 rgba(255,255,255,0.07)`
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Colored left accent */}
        <div
          className={`absolute top-6 ${isRTL ? "right-0" : "left-0"} w-[3px] h-10 rounded-full transition-opacity duration-300`}
          style={{
            background: `linear-gradient(to bottom, ${gradient})`,
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
          <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Mobile icon */}
            <div
              className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${gradient})` }}
            >
              <div className="w-5 h-5">{iconMap[item.icon] ?? iconMap.GraduationCap}</div>
            </div>
            <div>
              <h3
                className="text-slate-100 font-semibold text-base leading-snug transition-colors duration-300"
                style={{ color: hovered ? "#f1f5f9" : "#f8fafc" }}
              >
                {item.title}
              </h3>
            </div>
          </div>

          <div className={`flex items-center gap-2 flex-shrink-0 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Institution logo */}
            <div
              className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <InstitutionLogo src={item.logo} alt={item.title} gradient={gradient} />
            </div>

            <span
              className="px-3 py-1 text-xs font-bold rounded-full text-white whitespace-nowrap"
              style={{
                background: `linear-gradient(135deg, ${gradient})`,
                boxShadow: `0 4px 12px ${glow.replace("0.35","0.3")}`,
              }}
            >
              {item.year}
            </span>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

export default function EducationTimeline({ items }: EducationTimelineProps) {
  const { isRTL } = useLanguage();

  return (
    <div className="relative" role="list" aria-label="Education timeline">
      {/* Background timeline line — desktop */}
      <div
        className={`absolute top-4 bottom-4 w-px hidden sm:block ${isRTL ? "right-[30px]" : "left-[30px]"}`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(139,92,246,0.0), rgba(139,92,246,0.35) 15%, rgba(59,130,246,0.25) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
