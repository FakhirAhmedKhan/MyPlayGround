"use client";

import { useState } from "react";
import type { SkillItem } from "@/lib/types";

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      className="skill-hover group flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        animationDelay: `${index * 30}ms`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background =
          "rgba(139,92,246,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(139,92,246,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 50px rgba(139,92,246,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background =
          "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center p-2 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.icon}
            alt={skill.name}
            width={32}
            height={32}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback: show first 2 letters of skill name */
          <span className="text-slate-300 text-xs font-bold text-center leading-tight">
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Skill name */}
      <span className="text-xs font-medium text-slate-300 group-hover:text-purple-300 transition-colors duration-300 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}
