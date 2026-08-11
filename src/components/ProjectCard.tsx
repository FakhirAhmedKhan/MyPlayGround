"use client";

import { useState } from "react";
import type { ProjectItem } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const categoryMeta: Record<string, { color: string; rgb: string; label: string }> = {
  SAAS:       { color: "#15803d, #059669", rgb: "21,128,61",    label: "SaaS" },
  Web:        { color: "#2563eb, #06b6d4", rgb: "37,99,235",    label: "Web" },
  Tool:       { color: "#059669, #0d9488", rgb: "5,150,105",    label: "Tool" },
  Game:       { color: "#e11d48, #ec4899", rgb: "225,29,72",    label: "Game" },
  Python:     { color: "#d97706, #f97316", rgb: "217,119,6",    label: "Python" },
  React:      { color: "#0891b2, #2563eb", rgb: "8,145,178",    label: "React" },
  JavaScript: { color: "#b45309, #d97706", rgb: "180,83,9",     label: "JS" },
  Doc:        { color: "#4f46e5, #2563eb", rgb: "79,70,229",    label: "Docs" },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const cat = categoryMeta[project.category] ?? {
    color: "#15803d, #059669",
    rgb: "21,128,61",
    label: project.category,
  };

  return (
    <article
      id={`project-card-${project.id}`}
      className="project-card group relative flex flex-col h-full overflow-hidden rounded-2xl"
      style={{ "--card-rgb": cat.rgb } as React.CSSProperties}
    >
      {/* Colored top accent bar — opacity driven by CSS :hover */}
      <div
        className="project-card-accent absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${cat.color})` }}
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden shrink-0" style={{ background: "#0c0c1a" }}>
        {!imgError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={538}
            height={240}
            sizes="(max-width: 768px) 100vw, 538px"
            className="project-card-image w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${cat.color})` }}
          >
            <span className="text-white text-6xl font-black opacity-20 select-none leading-none">
              {project.title.replace(/[^a-zA-Z]/g, "").charAt(0)}
            </span>
            <span className="text-white/50 text-[11px] font-bold uppercase tracking-[0.14em]">
              {cat.label}
            </span>
          </div>
        )}

        {/* Scrim — deepens toward bottom, lets badge/number stay legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.2) 45%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Index number */}
        <span
          className="absolute top-3 left-3 text-[11px] font-bold tabular-nums leading-none"
          style={{ color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category badge */}
        <span
          className="absolute top-3 right-3 px-2.5 py-0.75 text-[10px] font-bold rounded-full text-white"
          style={{
            background: `linear-gradient(135deg, ${cat.color})`,
            letterSpacing: "0.08em",
          }}
        >
          {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
        <h3
          className="text-slate-100 font-semibold mb-1.5 line-clamp-1 group-hover:text-white transition-colors duration-200"
          style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em", lineHeight: "1.35" }}
        >
          {project.title}
        </h3>
        <p
          className="text-slate-500 flex-1 line-clamp-2"
          style={{ fontSize: "0.8125rem", lineHeight: "1.65", letterSpacing: "0.005em" }}
        >
          {project.description}
        </p>

        {/* Actions */}
        <div
          className="flex items-center gap-2 mt-4 pt-3.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-live-${project.id}`}
            className="project-action-primary flex-1 flex items-center justify-center gap-1.5"
            style={{ background: `linear-gradient(135deg, ${cat.color})` }}
          >
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-code-${project.id}`}
            className="project-action-secondary flex-1 flex items-center justify-center gap-1.5"
          >
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
        </div>
      </div>
    </article>
  );
}
