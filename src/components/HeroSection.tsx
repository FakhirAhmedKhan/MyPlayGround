"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { HomeSection } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import HeroName from "./HeroName";

function SocialIcon({ label }: { label: string }) {
  const lower = label.toLowerCase();
  if (lower === "github")
    return (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  if (lower === "linkedin")
    return (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (lower === "twitter")
    return (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  return <span className="text-xs font-bold">{label[0]}</span>;
}

interface HeroSectionProps {
  data: HomeSection;
}

/* GitHub-style contribution grid squares — deterministic positions, top region */
const GRID_SQUARES = [
  // Row 1 — sparse top-right cluster
  { top: 14, left: 62, opacity: 0.55, size: 9 },
  { top: 14, left: 64, opacity: 0.30, size: 9 },
  { top: 14, left: 66, opacity: 0.70, size: 9 },
  { top: 14, left: 68, opacity: 0.20, size: 9 },
  { top: 14, left: 70, opacity: 0.85, size: 9 },
  { top: 14, left: 72, opacity: 0.40, size: 9 },
  { top: 14, left: 74, opacity: 0.60, size: 9 },
  { top: 14, left: 76, opacity: 0.25, size: 9 },
  { top: 14, left: 78, opacity: 0.75, size: 9 },
  { top: 14, left: 80, opacity: 0.45, size: 9 },
  { top: 14, left: 82, opacity: 0.90, size: 9 },
  { top: 14, left: 84, opacity: 0.35, size: 9 },
  { top: 14, left: 86, opacity: 0.65, size: 9 },
  { top: 14, left: 88, opacity: 0.20, size: 9 },
  { top: 14, left: 90, opacity: 0.80, size: 9 },
  // Row 2
  { top: 25, left: 62, opacity: 0.40, size: 9 },
  { top: 25, left: 64, opacity: 0.75, size: 9 },
  { top: 25, left: 66, opacity: 0.25, size: 9 },
  { top: 25, left: 68, opacity: 0.90, size: 9 },
  { top: 25, left: 70, opacity: 0.35, size: 9 },
  { top: 25, left: 72, opacity: 0.60, size: 9 },
  { top: 25, left: 74, opacity: 0.80, size: 9 },
  { top: 25, left: 76, opacity: 0.20, size: 9 },
  { top: 25, left: 78, opacity: 0.55, size: 9 },
  { top: 25, left: 80, opacity: 0.70, size: 9 },
  { top: 25, left: 82, opacity: 0.30, size: 9 },
  { top: 25, left: 84, opacity: 0.85, size: 9 },
  { top: 25, left: 86, opacity: 0.45, size: 9 },
  { top: 25, left: 88, opacity: 0.65, size: 9 },
  { top: 25, left: 90, opacity: 0.25, size: 9 },
  // Row 3
  { top: 36, left: 62, opacity: 0.70, size: 9 },
  { top: 36, left: 64, opacity: 0.30, size: 9 },
  { top: 36, left: 66, opacity: 0.85, size: 9 },
  { top: 36, left: 68, opacity: 0.45, size: 9 },
  { top: 36, left: 70, opacity: 0.20, size: 9 },
  { top: 36, left: 72, opacity: 0.75, size: 9 },
  { top: 36, left: 74, opacity: 0.40, size: 9 },
  { top: 36, left: 76, opacity: 0.90, size: 9 },
  { top: 36, left: 78, opacity: 0.55, size: 9 },
  { top: 36, left: 80, opacity: 0.25, size: 9 },
  { top: 36, left: 82, opacity: 0.60, size: 9 },
  { top: 36, left: 84, opacity: 0.80, size: 9 },
  { top: 36, left: 86, opacity: 0.35, size: 9 },
  { top: 36, left: 88, opacity: 0.70, size: 9 },
  { top: 36, left: 90, opacity: 0.50, size: 9 },
  // Row 4 — fading out bottom
  { top: 47, left: 64, opacity: 0.20, size: 9 },
  { top: 47, left: 68, opacity: 0.45, size: 9 },
  { top: 47, left: 72, opacity: 0.25, size: 9 },
  { top: 47, left: 76, opacity: 0.60, size: 9 },
  { top: 47, left: 80, opacity: 0.15, size: 9 },
  { top: 47, left: 84, opacity: 0.35, size: 9 },
  { top: 47, left: 88, opacity: 0.20, size: 9 },
  // Left top cluster (smaller)
  { top: 8,  left: 2,  opacity: 0.50, size: 8 },
  { top: 8,  left: 4,  opacity: 0.25, size: 8 },
  { top: 8,  left: 6,  opacity: 0.70, size: 8 },
  { top: 8,  left: 8,  opacity: 0.35, size: 8 },
  { top: 8,  left: 10, opacity: 0.80, size: 8 },
  { top: 8,  left: 12, opacity: 0.20, size: 8 },
  { top: 18, left: 2,  opacity: 0.30, size: 8 },
  { top: 18, left: 4,  opacity: 0.65, size: 8 },
  { top: 18, left: 6,  opacity: 0.20, size: 8 },
  { top: 18, left: 8,  opacity: 0.75, size: 8 },
  { top: 18, left: 10, opacity: 0.40, size: 8 },
  { top: 18, left: 12, opacity: 0.55, size: 8 },
  { top: 28, left: 2,  opacity: 0.60, size: 8 },
  { top: 28, left: 4,  opacity: 0.20, size: 8 },
  { top: 28, left: 6,  opacity: 0.45, size: 8 },
  { top: 28, left: 8,  opacity: 0.25, size: 8 },
  { top: 28, left: 10, opacity: 0.70, size: 8 },
  { top: 28, left: 12, opacity: 0.30, size: 8 },
];

export default function HeroSection({ data }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const roles = data.roles ?? [];
    if (roles.length === 0) return;
    const currentRole = roles[roleIndex % roles.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
          setDisplayed("");
          setCharIndex(0);
        }, 50);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, data.roles]);

  return (
    <section
      id="hero-section"
      className={`relative min-h-screen flex items-center justify-center ${isRTL ? "font-urdu" : ""}`}
      aria-label="Hero section"
    >
      {/* ── BG 1: deep dark-green base ── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "#030a05" }}
      />

      {/* ── BG 2: left-side green ambient glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 15% 50%, rgba(20,83,45,0.45) 0%, rgba(16,60,35,0.2) 45%, transparent 75%)",
        }}
      />

      {/* ── BG 3: right-side brighter green glow (matches image) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 80% 40%, rgba(22,163,74,0.18) 0%, rgba(20,83,45,0.08) 55%, transparent 80%)",
        }}
      />

      {/* ── BG 4: subtle center lift ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 55%, rgba(21,128,61,0.08) 0%, transparent 100%)",
        }}
      />

      {/* ── BG 5: edge vignette — deep green-black perimeter ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(2,6,3,0.6) 65%, rgba(1,4,2,0.92) 100%)",
        }}
      />

      {/* ── BG 6: GitHub-style contribution grid squares ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {GRID_SQUARES.map((sq, i) => (
          <span
            key={i}
            className="absolute rounded-[2px]"
            style={{
              top: `${sq.top}%`,
              left: `${sq.left}%`,
              width: `${sq.size}px`,
              height: `${sq.size}px`,
              background: `rgba(34,197,94,${sq.opacity * 0.55})`,
              boxShadow: sq.opacity > 0.6 ? `0 0 6px rgba(74,222,128,${sq.opacity * 0.4})` : "none",
            }}
          />
        ))}
      </div>

      {/* ── BG 7: top-edge fade so grid blends in ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, rgba(3,10,5,0.3) 0%, transparent 18%, transparent 82%, rgba(3,10,5,0.8) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center pt-24 pb-14 ${isRTL ? "dir-rtl" : ""}`}
      >

        {/* ── Group 1: badge + greeting ── */}
        <div className="hero-enter-1 flex flex-col items-center gap-2.5 mb-4">

          {/* Status badge */}
          <div className="hero-badge">
            <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
              <span className="ping-finite absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" aria-hidden="true" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" aria-hidden="true" />
            </span>
            {t.badges.home}
          </div>

          {/* Greeting */}
          <p className="hero-greeting">
            {data.greeting}
          </p>
        </div>

        {/* ── Group 2: name ── */}
        <div className="hero-enter-2">
          <HeroName data={data} />
        </div>

        {/* ── Group 3: role + description + CTAs + socials ── */}
        <div className="hero-enter-3 flex flex-col items-center gap-0">

          {/* Typewriter role line */}
          <div className="mb-4">
            <p className="sr-only">{data.tagline} {data.roles.join(", ")}</p>
            <p className="hero-role-line" aria-hidden="true">
              {data.tagline}{" "}
              <span
                className="font-semibold"
                style={{
                  background: "linear-gradient(135deg, #86efac, #22c55e, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {displayed}
                <span
                  className={`type-cursor-blink inline-block w-0.5 h-[0.9em] ${isRTL ? "mr-0.5" : "ml-0.5"} rounded-xs align-middle`}
                  style={{
                    background: "linear-gradient(to bottom, #4ade80, #16a34a)",
                    verticalAlign: "text-bottom",
                  }}
                  aria-hidden="true"
                />
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="hero-description mb-7">
            {data.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-7 w-full sm:w-auto">
            <Link
              href="/projects"
              id="hero-cta-projects"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              {data.cta}
              <svg
                className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <a
              href="#contact"
              id="hero-cta-contact"
              className="btn-secondary w-full sm:w-auto justify-center"
            >
              {isRTL ? "رابطہ کریں" : "Contact Me"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              id="hero-cta-resume"
              download
              className="btn-secondary w-full sm:w-auto justify-center"
              aria-label="Download resume PDF"
            >
              {isRTL ? "ریزومے ڈاؤنلوڈ" : "Resume"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-2.5">
            {data.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`hero-social-${social.label.toLowerCase()}`}
                aria-label={`Visit ${social.label} profile`}
                className="hero-social-btn"
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
