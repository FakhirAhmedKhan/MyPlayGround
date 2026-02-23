"use client";

import { useState } from "react";
import type { ProjectItem } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const categoryColors: Record<string, { gradient: string; bg: string }> = {
  SAAS: { gradient: "from-violet-500 to-purple-600", bg: "#7c3aed, #9333ea" },
  Web: { gradient: "from-blue-500 to-cyan-500", bg: "#3b82f6, #06b6d4" },
  Tool: { gradient: "from-emerald-500 to-teal-500", bg: "#10b981, #14b8a6" },
  Game: { gradient: "from-rose-500 to-pink-500", bg: "#f43f5e, #ec4899" },
  Python: { gradient: "from-yellow-500 to-orange-500", bg: "#eab308, #f97316" },
  React: { gradient: "from-cyan-500 to-blue-500", bg: "#06b6d4, #3b82f6" },
  JavaScript: {
    gradient: "from-amber-400 to-yellow-500",
    bg: "#f59e0b, #eab308",
  },
  Doc: { gradient: "from-indigo-500 to-blue-600", bg: "#6366f1, #2563eb" },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const cat = categoryColors[project.category] ?? {
    gradient: "from-purple-500 to-blue-500",
    bg: "#a855f7, #3b82f6",
  };

  return (
    <article
      id={`project-card-${project.id}`}
      className="glass-card-hover group overflow-hidden flex flex-col h-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image / Placeholder */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl flex-shrink-0 bg-slate-900">
        {!imgError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Gradient fallback when image 404s */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${cat.bg})` }}
          >
            <span className="text-white text-5xl font-black opacity-30 select-none">
              {project.title.replace(/[^a-zA-Z]/g, "").charAt(0)}
            </span>
            <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-50">
              {project.category}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 60%)",
          }}
        />

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${cat.gradient} text-white shadow-lg`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-slate-100 font-semibold text-base mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-live-${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
            }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-code-${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(148,163,184,1)",
            }}
          >
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
        </div>
      </div>
    </article>
  );
}
