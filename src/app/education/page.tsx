"use client";

import SectionHeader from "@/components/SectionHeader";
import EducationTimeline from "@/components/EducationTimeline";
import { useLanguage } from "@/context/LanguageContext";

export default function EducationPage() {
  const { t, isRTL } = useLanguage();
  const educationData = t.sections.education;

  return (
    <div className={`relative min-h-screen pt-24 ${isRTL ? "font-urdu" : ""}`}>
      {/* Background */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="orb w-80 h-80 right-0 top-40 opacity-15"
        style={{ background: "rgba(59,130,246,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-60 h-60 left-10 bottom-20 opacity-10"
        style={{ background: "rgba(34,211,238,0.4)" }}
        aria-hidden="true"
      />

      <div className="relative section-container">
        <SectionHeader
          badge={t.badges.education}
          title={educationData.title}
          paragraph={educationData.paragraph}
        />

        <div className="max-w-3xl mx-auto">
          <EducationTimeline items={educationData.items} />
        </div>
      </div>
    </div>
  );
}
