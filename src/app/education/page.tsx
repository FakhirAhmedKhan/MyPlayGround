"use client";

import SectionHeader from "@/components/SectionHeader";
import EducationTimeline from "@/components/EducationTimeline";
import { useLanguage } from "@/context/LanguageContext";
import PageBackground from "@/components/PageBackground";

export default function EducationPage() {
  const { t, isRTL } = useLanguage();
  const educationData = t.sections.education;

  return (
    <div className={`relative isolate min-h-screen pt-24 ${isRTL ? "font-urdu" : ""}`}>
      <PageBackground variant="education" />

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
