"use client";

import { useState } from "react";
import type { CertificationItem } from "@/lib/types";

interface CertificationCardProps {
  cert: CertificationItem;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Database: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      />
    </svg>
  ),
  Palette: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  ),
  Code: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  Terminal: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  BookOpen: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Layout: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    </svg>
  ),
  Monitor: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Smartphone: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
};

function getGradientColors(colorClass: string): string {
  const map: Record<string, string> = {
    "from-green-500 to-emerald-500": "#22c55e, #10b981",
    "from-blue-500 to-cyan-500": "#3b82f6, #06b6d4",
    "from-yellow-500 to-orange-500": "#eab308, #f97316",
    "from-indigo-500 to-purple-500": "#6366f1, #a855f7",
    "from-amber-500 to-orange-500": "#f59e0b, #f97316",
    "from-sky-500 to-blue-500": "#0ea5e9, #3b82f6",
    "from-pink-500 to-rose-500": "#ec4899, #f43f5e",
    "from-gray-600 to-gray-800": "#4b5563, #1f2937",
    "from-gray-700 to-gray-900": "#374151, #111827",
  };
  return map[colorClass] ?? "#a855f7, #3b82f6";
}

/** Issuer logo with graceful fallback */
function IssuerLogo({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
        {alt.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain p-0.5"
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default function CertificationCard({
  cert,
  index,
}: CertificationCardProps) {
  const gradientColors = getGradientColors(cert.color);

  return (
    <article
      id={`cert-card-${index}`}
      className="group relative glass-card-hover p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${gradientColors})`,
            boxShadow: `0 8px 20px rgba(0,0,0,0.3)`,
          }}
        >
          {iconMap[cert.icon] ?? iconMap.Code}
        </div>

        {/* Title & issuer */}
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-100 font-semibold text-sm leading-snug group-hover:text-purple-300 transition-colors duration-300">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {/* Issuer logo — plain img with error fallback */}
            <div
              className="w-5 h-5 rounded overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <IssuerLogo src={cert.logo} alt={cert.issuer} />
            </div>
            <span className="text-slate-400 text-xs">{cert.issuer}</span>
          </div>
        </div>

        {/* Year */}
        <span
          className="px-2.5 py-1 text-xs font-bold rounded-full text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${gradientColors})` }}
        >
          {cert.year}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 text-xs rounded-full font-medium"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#a78bfa",
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Credential link */}
      <a
        href={cert.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`cert-credential-${index}`}
        className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all duration-300 hover:gap-3"
        style={{ color: "#a78bfa" }}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        View Credential
        <svg
          className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </article>
  );
}
