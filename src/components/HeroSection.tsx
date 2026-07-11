"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { HomeSection } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

function SocialIcon({ label }: { label: string }) {
  const lower = label.toLowerCase();
  if (lower === "github")
    return (
      <svg className="w-5 h-5 text-slate-400 group-hover:text-violet-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  if (lower === "linkedin")
    return (
      <svg className="w-5 h-5 text-slate-400 group-hover:text-violet-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (lower === "twitter")
    return (
      <svg className="w-5 h-5 text-slate-400 group-hover:text-violet-300 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  return <span className="text-slate-400 text-xs font-bold">{label[0]}</span>;
}

interface HeroSectionProps {
  data: HomeSection;
}

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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isRTL ? "font-urdu" : ""}`}
      aria-label="Hero section"
    >
      {/* ── Deep layered background ── */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.18) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 40% at 90% 50%, rgba(37,99,235,0.1) 0%, transparent 55%)," +
            "radial-gradient(ellipse 50% 50% at 10% 90%, rgba(6,182,212,0.07) 0%, transparent 60%)," +
            "rgb(7,7,13)",
        }}
      />

      {/* Animated orbs */}
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow" aria-hidden="true"
        style={{ background: "rgba(109,40,217,0.45)", filter: "blur(120px)" }} />
      <div className="absolute -right-32 bottom-1/4 w-[500px] h-[500px] rounded-full opacity-15 animate-float" aria-hidden="true"
        style={{ background: "rgba(37,99,235,0.4)", filter: "blur(100px)", animationDelay: "2s" }} />
      <div className="absolute left-1/2 -top-20 w-[400px] h-[400px] rounded-full opacity-10" aria-hidden="true"
        style={{ background: "rgba(6,182,212,0.35)", filter: "blur(100px)" }} />

      {/* Fine dot grid */}
      <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-px h-64 opacity-15"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.6), transparent)", transform: "rotate(15deg)" }} />
        <div className="absolute bottom-1/3 -right-10 w-px h-48 opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.6), transparent)", transform: "rotate(-10deg)" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2.5 mb-10 animate-badge-in"
          style={{ animationFillMode: "both" }}
        >
          <span
            className="relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em]"
            style={{
              background: "rgba(109,40,217,0.12)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#c4b5fd",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 16px rgba(109,40,217,0.2)",
            }}
          >
            {/* Pulse dot */}
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" aria-hidden="true" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" aria-hidden="true" />
            </span>
            <span className={isRTL ? "mr-4" : "ml-4"}>{t.badges.home}</span>
          </span>
        </div>

        {/* Greeting */}
        <p
          className="text-slate-400 text-base sm:text-lg mb-3 font-medium tracking-wide animate-fade-in"
          style={{ animationDelay: "0.15s", animationFillMode: "both" }}
        >
          {data.greeting}
        </p>

        {/* Name — hero-size with animated gradient */}
        <div
          className="mb-8 animate-slide-in"
          style={{ animationDelay: "0.25s", animationFillMode: "both" }}
        >
          <h1
            className="font-black leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)" }}
          >
            <span className="gradient-text-hero">{data.name.split(" ")[0]}</span>
            <br />
            <span
              className="text-slate-100"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
            >
              {data.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
        </div>

        {/* Typewriter */}
        <div
          className="mb-8 animate-slide-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <p className="sr-only">{data.tagline} {data.roles.join(", ")}</p>
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-medium"
            aria-hidden="true"
          >
            {data.tagline}{" "}
            <span
              className="font-bold"
              style={{
                background: "linear-gradient(135deg, #c4b5fd, #818cf8, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayed}
              <span
                className={`inline-block w-[3px] h-[1.1em] ${isRTL ? "mr-1" : "ml-1"} rounded-sm align-middle`}
                style={{
                  background: "linear-gradient(to bottom, #a78bfa, #60a5fa)",
                  animation: "type-cursor 0.8s ease-in-out infinite",
                  verticalAlign: "text-bottom",
                }}
                aria-hidden="true"
              />
            </span>
          </p>
        </div>

        {/* Description */}
        <p
          className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed animate-slide-in"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          {data.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-slide-in"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <Link href="/projects" id="hero-cta-projects" className="btn-primary">
            {data.cta}
            <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <a href="#contact" id="hero-cta-contact" className="btn-secondary">
            {isRTL ? "رابطہ کریں" : "Contact Me"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

          <a href="/resume.pdf" id="hero-cta-resume" download className="btn-secondary" aria-label="Download resume PDF">
            {isRTL ? "ریزومے ڈاؤنلوڈ" : "Resume"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.75s", animationFillMode: "both" }}
        >
          {data.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`hero-social-${social.label.toLowerCase()}`}
              aria-label={`Visit ${social.label} profile`}
              className="group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(139,92,246,0.14)";
                el.style.borderColor = "rgba(139,92,246,0.45)";
                el.style.boxShadow = "0 8px 28px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05)";
              }}
            >
              <SocialIcon label={social.label} />
            </a>
          ))}

          {/* Divider dot */}
          {/* <span className="w-1 h-1 rounded-full bg-slate-700 mx-1" aria-hidden="true" /> */}

          {/* Subtle stat pills */}
          {/* <div className="hidden sm:flex items-center gap-2">
            {[
              { n: "30+", label: isRTL ? "پروجیکٹس" : "Projects" },
              { n: "17+", label: isRTL ? "سرٹیفکیٹس" : "Certs" },
            ].map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#64748b",
                }}
              >
                <span className="font-bold text-purple-400">{s.n}</span>
                {s.label}
              </span>
            ))}
          </div> */}
        </div>

        {/* Scroll indicator */}
        {/* <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
          aria-hidden="true"
        >
          <span className="text-slate-600 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div
            className="w-[22px] h-9 rounded-full flex items-start justify-center pt-1.5"
            style={{
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="w-1 h-2.5 rounded-full scroll-wheel"
              style={{ background: "linear-gradient(to bottom, #a78bfa, #60a5fa)" }}
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
