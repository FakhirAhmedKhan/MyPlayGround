"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import portfolio from "@/data/portfolio.json";

const projectsData = portfolio.sections.projects;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  console.log(projectsData.items.map((p) => p.id));
  // Generate categories dynamically
  const categories = [
    "All",
    ...Array.from(new Set(projectsData.items.map((p) => p.category.trim()))),
  ];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData.items;
    return projectsData.items.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen pt-24">
      {/* Background (non-clickable & behind content) */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none -z-20"
        aria-hidden="true"
      />
      <div
        className="absolute orb w-96 h-96 -right-32 top-20 opacity-15 pointer-events-none -z-20"
        style={{ background: "rgba(59,130,246,0.4)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 section-container">
        <SectionHeader
          badge={portfolio.badges.projects}
          title={projectsData.title}
          paragraph={projectsData.paragraph}
        />

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
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
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white border border-violet-500 shadow-lg shadow-violet-500/30"
                    : "bg-white/5 text-slate-400 border border-white/10"
                }`}
              >
                {cat}
                <span className="ml-2 text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
