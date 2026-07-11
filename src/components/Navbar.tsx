"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t, isRTL } = useLanguage();

  const navItems = useMemo(
    () => [
      { href: "/", label: t.navLabels.home },
      { href: "/blog", label: t.navLabels.blog },
      { href: "/projects", label: t.navLabels.projects },
      { href: "/skills", label: t.navLabels.skills },
      { href: "/education", label: t.navLabels.education },
      { href: "/certifications", label: t.navLabels.certifications },
    ],
    [t.navLabels],
  );

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(y / docH, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ur", label: "اردو",    flag: "🇵🇰" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ] as const;

  const currentLang = languages.find((l) => l.code === language);

  return (
    <>
      {/* ── Reading-progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)",
          transform: `scaleX(${scrollProgress})`,
          transition: "transform 0.1s linear",
          opacity: scrollProgress > 0.01 ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          paddingTop: "2px",
          background: scrolled
            ? "rgba(7, 7, 13, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Fakhir Ahmed Khan – Home"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6d28d9, #2563eb)",
                boxShadow: "0 4px 16px rgba(109,40,217,0.45)",
              }}
            >
              {/* Shine */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.18), transparent)",
                }}
              />
              FK
            </div>
            <span className="hidden sm:block text-slate-100 font-semibold text-sm tracking-tight group-hover:text-purple-300 transition-colors duration-200">
              {t.meta.name}
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                      aria-current={isActive ? "page" : undefined}
                      style={{ color: isActive ? "#c4b5fd" : "#94a3b8" }}
                    >
                      {/* Active dot */}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: "#a78bfa" }}
                          aria-hidden="true"
                        />
                      )}
                      {/* Hover bg */}
                      <span
                        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                        style={{ background: isActive ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.04)" }}
                        aria-hidden="true"
                      />
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={`Language: ${currentLang?.label}. Click to change`}
                className="h-9 px-3 flex items-center gap-1.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: langOpen
                    ? "rgba(139,92,246,0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: langOpen
                    ? "1px solid rgba(139,92,246,0.35)"
                    : "1px solid rgba(255,255,255,0.09)",
                  color: "#94a3b8",
                }}
              >
                <span className="text-base leading-none">{currentLang?.flag}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <ul
                  role="listbox"
                  aria-label="Select language"
                  className="absolute right-0 mt-2 w-40 rounded-2xl overflow-hidden z-50 py-1.5"
                  style={{
                    background: "rgba(14, 14, 26, 0.96)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08)",
                    backdropFilter: "blur(24px)",
                  }}
                >
                  {languages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <li key={lang.code} role="option" aria-selected={isSelected}>
                        <button
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-sm flex items-center gap-3 transition-colors duration-150"
                          style={{
                            color: isSelected ? "#c4b5fd" : "#94a3b8",
                            background: isSelected ? "rgba(139,92,246,0.1)" : "transparent",
                          }}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 ml-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* GitHub CTA */}
            <a
              href="https://github.com/FakhirAhmedKhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile (opens in new tab)"
              className="btn-primary text-sm px-4 py-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-200"
            style={{
              background: menuOpen ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile nav ── */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="md:hidden"
            style={{
              background: "rgba(7, 7, 13, 0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="max-w-[1240px] mx-auto px-6 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? "#c4b5fd" : "#94a3b8",
                      background: isActive ? "rgba(139,92,246,0.1)" : "transparent",
                      borderLeft: isActive ? "2px solid rgba(167,139,250,0.6)" : "2px solid transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Language row */}
              <div className="flex gap-2 px-4 py-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    aria-label={`Switch to ${lang.label}`}
                    aria-pressed={language === lang.code}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      background: language === lang.code ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                      border: language === lang.code ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: language === lang.code ? "#c4b5fd" : "#64748b",
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <a
                href="https://github.com/FakhirAhmedKhan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-2"
              >
                GitHub Profile
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
