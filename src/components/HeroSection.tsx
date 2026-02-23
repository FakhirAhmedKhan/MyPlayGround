"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { HomeSection } from "@/lib/types";
import Image from "next/image";

interface HeroSectionProps {
  data: HomeSection;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

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
        // ✅ don’t setState synchronously inside the effect body
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((r) => (r + 1) % roles.length);
          // optional: keep state consistent
          setDisplayed("");
          setCharIndex(0);
        }, 50); // can be 0 too, 50 feels natural
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, data.roles]); // OK

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background */}
      <div className="absolute inset-0 animated-bg" aria-hidden="true" />

      {/* Orbs */}
      <div
        className="orb w-96 h-96 -left-32 top-1/4 opacity-25"
        style={{ background: "rgba(139,92,246,0.5)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-80 h-80 -right-20 bottom-1/4 opacity-20"
        style={{ background: "rgba(59,130,246,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-60 h-60 left-1/2 -top-20 opacity-15"
        style={{ background: "rgba(34,211,238,0.3)" }}
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          data-animate="badge"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest animate-fade-in"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#a78bfa",
              animationDelay: "0.1s",
              animationFillMode: "both",
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 mr-2 animate-pulse" />
            Welcome to my digital space
          </span>
        </div>

        {/* Greeting & name */}
        <div
          className="mb-6 animate-slide-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <p className="text-lg sm:text-xl text-slate-400 mb-2 font-medium">
            {data.greeting}
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-50 leading-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span className="gradient-text">{data.name.split(" ")[0]}</span>{" "}
            <span className="text-slate-100">
              {data.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
        </div>

        {/* Typewriter */}
        <div
          className="mb-8 animate-slide-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-medium">
            {data.tagline}{" "}
            <span
              className="font-bold"
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa, #60a5fa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayed}
              <span
                className="inline-block w-0.5 h-7 ml-1 rounded-full align-middle"
                style={{
                  background: "#a78bfa",
                  animation: "type-cursor 0.8s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </span>
          </p>
        </div>

        {/* Description */}
        <p
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-in"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          {data.tagline} {data.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-in"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <Link
            href="/projects"
            id="hero-cta-projects"
            className="btn-primary text-sm"
          >
            {data.cta}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/skills"
            id="hero-cta-skills"
            className="btn-secondary text-sm"
          >
            My Skills
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </Link>
        </div>

        {/* Social Links */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          {data.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`hero-social-${social.label.toLowerCase()}`}
              aria-label={`Visit ${social.label} profile`}
              className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(139,92,246,0.15)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(139,92,246,0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 25px rgba(139,92,246,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Image
                src={social.icon}
                width={100}
                height={100}
                alt={social.label}
                className="w-5 h-5 object-contain"
                style={{ filter: "brightness(0) invert(0.7)" }}
              />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
          aria-hidden="true"
        >
          <span className="text-slate-500 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ background: "rgba(139,92,246,0.7)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
