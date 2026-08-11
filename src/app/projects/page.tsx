"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

/* Full display labels for each raw category key */
const categoryLabels: Record<string, string> = {
  // All: "All",
  // SAAS: "Software as a Service",
  Web: "Web",
  Tool: "Tool",
  Game: "Game",
  Python: "Python",
  React: "React",
  JavaScript: "JavaScript",
  Doc: "Docs",
};

/** Renders a label where every letter animates up on hover */
function AnimatedLabel({ text, isActive }: { text: string; isActive: boolean }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200 group-hover:-translate-y-[3px]"
          style={{
            transitionDelay: `${i * 28}ms`,
            /* already settled when active so no re-animate on repeat click */
            transform: isActive ? "translateY(-2px)" : undefined,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function ProjectsPage() {
  const { t, isRTL } = useLanguage();
  const projectsData = t.sections.projects;

  const categories = useMemo(
    () => Array.from(new Set(projectsData.items.map((p) => p.category.trim()))),
    [projectsData.items],
  );

  const [activeCategory, setActiveCategory] = useState<string>(() => categories[0] ?? "");

  const filteredProjects = useMemo(
    () => projectsData.items.filter((p) => p.category === activeCategory),
    [activeCategory, projectsData.items],
  );

  return (
    <div
      className={`relative min-h-screen pt-24 pb-20 ${isRTL ? "font-urdu" : ""}`}
    >
      {/* Background (non-clickable & behind content) */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none -z-20"
        aria-hidden="true"
      />
      <div
        className="absolute orb w-[500px] h-[500px] -right-40 top-20 opacity-10 pointer-events-none -z-20 blur-[100px]"
        style={{ background: "rgba(16,185,129,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="absolute orb w-[400px] h-[400px] -left-40 bottom-20 opacity-10 pointer-events-none -z-20 blur-[100px]"
        style={{ background: "rgba(34,197,94,0.4)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 section-container">
        <SectionHeader
          badge={t.badges.projects}
          title={projectsData.title}
          paragraph={projectsData.paragraph}
        />


        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in text-start">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={`${project.id}-${project.title}`}
              project={project}
              index={i}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32 glass-card rounded-3xl border border-white/5 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-2">
              {isRTL ? "کوئی پروجیکٹ نہیں ملا" : "No projects found"}
            </h3>
            <p className="text-slate-500">
              {isRTL
                ? "اس زمرے میں ابھی تک کوئی پروجیکٹ نہیں ہے۔"
                : "There are no projects in this category yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
