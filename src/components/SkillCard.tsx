"use client";

import { useState } from "react";
import type { SkillItem } from "@/lib/types";

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const delay = (index % 12) * 30;

  return (
    <div
      id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
      role="img"
      aria-label={skill.name}
      className="group relative flex flex-col items-center gap-2.5 p-3.5 rounded-2xl cursor-default"
      style={{
        background: hovered ? "rgba(139,92,246,0.07)" : "rgba(255,255,255,0.028)",
        border: hovered
          ? "1px solid rgba(139,92,246,0.3)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? "0 16px 40px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover glow spot */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(139,92,246,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div
        className="relative w-11 h-11 rounded-xl flex items-center justify-center p-2"
        style={{
          background: hovered
            ? "rgba(139,92,246,0.12)"
            : "rgba(255,255,255,0.05)",
          border: hovered
            ? "1px solid rgba(139,92,246,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.icon}
            alt=""
            width={28}
            height={28}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className="text-[10px] font-black text-center leading-none"
            style={{ color: hovered ? "#c4b5fd" : "#94a3b8" }}
          >
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="relative z-10 text-[11px] font-medium text-center leading-tight"
        style={{
          color: hovered ? "#e2e8f0" : "#94a3b8",
          transition: "color 0.3s ease",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}
