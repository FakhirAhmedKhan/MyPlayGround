"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const ref = useScrollReveal(0.15);

  const align = centered ? "text-center" : isRTL ? "text-right" : "text-left";

  return (
    <div ref={ref} className={`reveal mb-16 ${align}`}>
      {/* Badge */}
      <div className={`inline-flex items-center gap-2.5 mb-5 reveal-delay-1 ${centered ? "" : ""}`}>
        <span
          className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em]"
          style={{
            background: "rgba(109,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.28)",
            color: "#c4b5fd",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
            style={{ background: "rgba(167,139,250,0.9)" }}
            aria-hidden="true"
          />
          {badge}
        </span>
      </div>

      {/* Heading */}
      <h2
        className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold text-slate-50 mb-5 leading-tight reveal-delay-2"
        style={{ letterSpacing: isRTL ? "0" : "-0.025em" }}
      >
        {title}
      </h2>

      {/* Paragraph */}
      <p
        className={`text-slate-400 text-base sm:text-lg leading-relaxed reveal-delay-3 ${
          centered ? "max-w-2xl mx-auto" : "max-w-2xl"
        }`}
      >
        {paragraph}
      </p>

      {/* Decorative rule */}
      {centered && (
        <div className="flex items-center justify-center gap-2 mt-8 reveal-delay-4" aria-hidden="true">
          <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5))" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(139,92,246,0.6)" }} />
          <div className="h-px w-32 rounded-full" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.5), rgba(59,130,246,0.4), transparent)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(59,130,246,0.6)" }} />
          <div className="h-px w-16 rounded-full" style={{ background: "linear-gradient(to left, transparent, rgba(59,130,246,0.5))" }} />
        </div>
      )}
    </div>
  );
}
