"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import portfolio from "@/data/portfolio.json";

const projectsData = portfolio.sections.projects;

const categories = [
  "All",
  ...Array.from(new Set(projectsData.items.map((p) => p.category))),
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projectsData.items
      : projectsData.items.filter((p) => p.category === activeCategory);

  return (
    <div className="relative min-h-screen pt-24">
      {/* Background */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="orb w-96 h-96 -right-32 top-20 opacity-15"
        style={{ background: "rgba(59,130,246,0.4)" }}
        aria-hidden="true"
      />

      <div className="relative section-container">
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
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  activeCategory === cat
                    ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                    : "rgba(255,255,255,0.05)",
                color: activeCategory === cat ? "white" : "rgba(148,163,184,1)",
                border:
                  activeCategory === cat
                    ? "1px solid rgba(139,92,246,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 15px rgba(124,58,237,0.3)"
                    : "none",
              }}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                {cat === "All"
                  ? projectsData.items.length
                  : projectsData.items.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
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
