"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { CSSVars } from "./cssVars";

// Only skills that already exist in the portfolio data are ever shown.
const FEATURED_SKILLS = ["React.js", "Next.js"];

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />
    </svg>
  );
}

/**
 * Three small glass cards at different depths around the portrait. Decorative only
 * (aria-hidden): the same skills live in the Skills section.
 */
export default function FloatingCards() {
  const { t, isRTL } = useLanguage();
  const known = new Set(t.sections.skills.items.map((skill) => skill.name));
  const [first, second] = FEATURED_SKILLS.filter((name) => known.has(name));

  return (
    <>
      {first && (
        <div
          className="hero-card hero-card--a"
          style={{ "--z": -30, "--px": 9, "--x": "1%", "--y": "13%", "--float": "-2s" } as CSSVars}
          aria-hidden="true"
        >
          <div className="hero-card__body">
            <span className="hero-card__icon"><CodeIcon /></span>
            <span className="hero-card__label">{first}</span>
          </div>
        </div>
      )}

      {second && (
        <div
          className="hero-card hero-card--b"
          style={{ "--z": 30, "--px": 9, "--x": "79%", "--y": "35%", "--float": "-4.5s" } as CSSVars}
          aria-hidden="true"
        >
          <div className="hero-card__body">
            <span className="hero-card__icon"><BoltIcon /></span>
            <span className="hero-card__label">{second}</span>
          </div>
        </div>
      )}

      <div
        className="hero-card hero-card--c"
        style={{ "--z": 80, "--px": 10.5, "--x": "6%", "--y": "62%", "--float": "-1s" } as CSSVars}
        aria-hidden="true"
      >
        <div className="hero-card__body">
          <span className="hero-status-dot" />
          <span className="hero-card__label">{isRTL ? "دستیاب ہے" : "Available for Work"}</span>
        </div>
      </div>
    </>
  );
}
