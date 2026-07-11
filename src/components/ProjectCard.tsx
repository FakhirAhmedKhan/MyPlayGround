"use client";

import { useState } from "react";
import type { ProjectItem } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

const categoryMeta: Record<string, { color: string; glow: string; label: string }> = {
  SAAS:       { color: "#7c3aed, #9333ea", glow: "rgba(124,58,237,0.35)",   label: "SaaS" },
  Web:        { color: "#2563eb, #06b6d4", glow: "rgba(37,99,235,0.35)",    label: "Web" },
  Tool:       { color: "#059669, #0d9488", glow: "rgba(5,150,105,0.35)",    label: "Tool" },
  Game:       { color: "#e11d48, #ec4899", glow: "rgba(225,29,72,0.35)",    label: "Game" },
  Python:     { color: "#d97706, #f97316", glow: "rgba(217,119,6,0.35)",    label: "Python" },
  React:      { color: "#0891b2, #2563eb", glow: "rgba(8,145,178,0.35)",    label: "React" },
  JavaScript: { color: "#b45309, #d97706", glow: "rgba(180,83,9,0.35)",     label: "JS" },
  Doc:        { color: "#4f46e5, #2563eb", glow: "rgba(79,70,229,0.35)",    label: "Docs" },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const cat = categoryMeta[project.category] ?? {
    color: "#6d28d9, #2563eb",
    glow: "rgba(109,40,217,0.35)",
    label: project.category,
  };

  return (
    <article
      id={`project-card-${project.id}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.026)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `rgba(${cat.glow.match(/\d+/g)?.slice(0,3).join(",") ?? "139,92,246"},0.35)`;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = `0 28px 60px ${cat.glow.replace("0.35","0.2")}, inset 0 1px 0 rgba(255,255,255,0.07)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `linear-gradient(90deg, ${cat.color})` }}
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0" style={{ background: "#0c0c1a" }}>
        {!imgError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={538}
            height={240}
            sizes="(max-width: 768px) 100vw, 538px"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
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
            <span className="text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
              {cat.label}
            </span>
          </div>
        )}

        {/* Dark bottom gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(7,7,13,0.9) 0%, rgba(7,7,13,0.3) 40%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Index number (top-left) */}
        <span
          className="absolute top-3 left-3 text-xs font-bold tabular-nums"
          style={{ color: "rgba(255,255,255,0.25)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Category badge (top-right) */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded-full text-white"
          style={{
            background: `linear-gradient(135deg, ${cat.color})`,
            boxShadow: `0 4px 12px ${cat.glow}`,
          }}
        >
          {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-slate-100 font-semibold text-[0.95rem] mb-2 line-clamp-1 transition-colors duration-300 group-hover:text-white">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2.5 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-live-${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${cat.color})`,
              boxShadow: `0 4px 16px ${cat.glow.replace("0.35","0.3")}`,
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-code-${project.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "#94a3b8",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.09)";
              el.style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.color = "#94a3b8";
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Source
          </a>
        </div>
      </div>
    </article>
  );
}
