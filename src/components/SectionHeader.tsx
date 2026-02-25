"use client";

import { useLanguage } from "@/context/LanguageContext";

interface SectionHeaderProps {
  badge: string;
  title: string;
  paragraph: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  paragraph,
  centered = true,
}: SectionHeaderProps) {
  const { isRTL } = useLanguage();

  return (
    <div
      className={`mb-16 ${centered ? "text-center" : isRTL ? "text-right" : "text-left"}`}
    >
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-widest ${centered ? "" : "mb-4"}`}
        style={{
          background: "rgba(139, 92, 246, 0.12)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          color: "#a78bfa",
        }}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse-glow ${isRTL ? "ml-2" : ""}`}
          style={{ background: "#a78bfa" }}
        />
        {badge}
      </div>

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-4"
        style={{ letterSpacing: isRTL ? "0" : "-0.02em", lineHeight: "1.25" }}
      >
        {title}
      </h2>

      <p
        className={`text-slate-400 text-base sm:text-lg leading-relaxed ${
          centered ? "max-w-2xl mx-auto" : "max-w-2xl"
        }`}
      >
        {paragraph}
      </p>
    </div>
  );
}
