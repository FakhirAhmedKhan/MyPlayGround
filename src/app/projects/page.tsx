"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

const categoryLabels: Record<string, string> = {
  All: "All",
  SAAS: "SaaS",
  Web: "Web",
  Tool: "Tool",
  Game: "Game",
  Python: "Python",
  React: "React",
  JavaScript: "JavaScript",
  Doc: "Docs",
};

export default function ProjectsPage() {
  const { t, isRTL } = useLanguage();
  const projectsData = t.sections.projects;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projectsData.items.map((p) => p.category.trim())));
    return ["All", ...cats];
  }, [projectsData.items]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projectsData.items
        : projectsData.items.filter((p) => p.category === activeCategory),
    [activeCategory, projectsData.items],
  );

  return (
    <div className={`relative min-h-screen pt-24 pb-20 ${isRTL ? "font-urdu" : ""}`}>
      {/* Background */}
      <div className="absolute inset-0 animated-bg pointer-events-none -z-20" aria-hidden="true" />
      <div
        className="absolute w-[500px] h-[500px] -right-40 top-20 opacity-10 pointer-events-none -z-20 blur-[100px] rounded-full"
        style={{ background: "rgba(16,185,129,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="absolute w-[400px] h-[400px] -left-40 bottom-20 opacity-10 pointer-events-none -z-20 blur-[100px] rounded-full"
        style={{ background: "rgba(34,197,94,0.4)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 section-container">
        <SectionHeader
          badge={t.badges.projects}
          title={projectsData.title}
          paragraph={projectsData.paragraph}
        />

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === "All"
              ? projectsData.items.length
              : projectsData.items.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className="relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #15803d, #059669)"
                    : "rgba(255,255,255,0.05)",
                  border: isActive
                    ? "1px solid rgba(34,197,94,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  boxShadow: isActive ? "0 4px 20px rgba(20,83,45,0.35)" : "none",
                }}
              >
                {categoryLabels[cat] ?? cat}
                <span
                  className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#fff" : "#64748b",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-start">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${project.title}`}
                project={project}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-3xl max-w-2xl mx-auto"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">
              {isRTL ? "کوئی پروجیکٹ نہیں ملا" : "No projects found"}
            </h3>
            <p className="text-slate-500 text-sm">
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
