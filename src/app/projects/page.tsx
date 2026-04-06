"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t, isRTL } = useLanguage();
  const projectsData = t.sections.projects;

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(projectsData.items.map((p) => p.category.trim()))),
    ];
  }, [projectsData.items]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData.items;
    return projectsData.items.filter((p) => p.category === activeCategory);
  }, [activeCategory, projectsData.items]);

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
        style={{ background: "rgba(59,130,246,0.5)" }}
        aria-hidden="true"
      />
      <div
        className="absolute orb w-[400px] h-[400px] -left-40 bottom-20 opacity-10 pointer-events-none -z-20 blur-[100px]"
        style={{ background: "rgba(139,92,246,0.5)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 section-container">
        <SectionHeader
          badge={t.badges.projects}
          title={projectsData.title}
          paragraph={projectsData.paragraph}
        />

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-3 justify-center mb-16"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projectsData.items.length
                : projectsData.items.filter((p) => p.category === cat).length;

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative px-5 py-2.5 text-sm font-semibold rounded-2xl transition-all duration-500 overflow-hidden ${
                  isActive
                    ? "text-white shadow-xl shadow-violet-500/20 active:scale-95"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 active:scale-95"
                }`}
              >
                {/* Active Indicator Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-violet-600 to-blue-600 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 invisible"
                  }`}
                />

                {/* Border Effect */}
                <div
                  className={`absolute inset-0 border transition-colors duration-500 rounded-2xl ${
                    isActive
                      ? "border-violet-400/50"
                      : "border-white/10 group-hover:border-white/20"
                  }`}
                />

                <span className="relative z-10 flex items-center gap-2">
                  {cat}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md transition-colors duration-500 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

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
