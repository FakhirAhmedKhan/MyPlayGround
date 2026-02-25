"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, MouseEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  const navItems = useMemo(
    () => [
      { href: "/", label: t.navLabels.home },
      { href: "/projects", label: t.navLabels.projects },
      { href: "/skills", label: t.navLabels.skills },
      { href: "/education", label: t.navLabels.education },
      { href: "/certifications", label: t.navLabels.certifications },
    ],
    [t.navLabels],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ur", label: "اردو", flag: "🇵🇰" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 10, 15, 0.9)" : "rgba(10, 10, 15, 0)",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2" id="nav-logo">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
            }}
          >
            FK
          </div>
          <span
            className="font-semibold text-slate-100 hidden sm:block"
            style={{ letterSpacing: "-0.01em" }}
          >
            {t.meta.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  id={`nav-${item.label.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 block"
                  style={{
                    color: isActive ? "#a78bfa" : "rgba(148, 163, 184, 1)",
                    background: isActive
                      ? "rgba(139, 92, 246, 0.1)"
                      : "transparent",
                  }}
                  onMouseEnter={(e: MouseEvent<HTMLElement>) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#e2e8f0";
                      (e.target as HTMLElement).style.background =
                        "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e: MouseEvent<HTMLElement>) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color =
                        "rgba(148, 163, 184, 1)";
                      (e.target as HTMLElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #7c3aed, #2563eb)",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Language Switcher & GitHub CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative group/lang">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300">
              <span>{languages.find((l) => l.code === language)?.flag}</span>
              <span className="uppercase font-bold text-xs">{language}</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-36 py-1 bg-[#12121e] border border-white/10 rounded-xl opacity-0 translate-y-2 invisible group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:visible transition-all duration-300 shadow-2xl z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors duration-200 hover:bg-white/5 ${
                    language === lang.code
                      ? "text-violet-400 bg-violet-500/5"
                      : "text-slate-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    {lang.label}
                  </span>
                  {language === lang.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <a
            href="https://github.com/FakhirAhmedKhan"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-github-cta"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Mobile items group */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Language Trigger */}
          <div className="relative group/mobile-lang">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400">
              <span className="text-sm">
                {languages.find((l) => l.code === language)?.flag}
              </span>
            </button>
            <div
              className={`absolute top-full ${isRTL ? "left-0" : "right-0"} mt-2 w-32 py-1 bg-[#12121e] border border-white/10 rounded-xl opacity-0 translate-y-2 invisible group-focus-within/mobile-lang:opacity-100 group-focus-within/mobile-lang:translate-y-0 group-focus-within/mobile-lang:visible transition-all duration-300 shadow-2xl z-50`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-[10px] font-medium transition-colors duration-200 ${
                    language === lang.code
                      ? "text-violet-400 bg-violet-500/5"
                      : "text-slate-400"
                  }`}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className="h-0.5 bg-current rounded transition-all duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(45deg) translateY(7px)"
                    : "none",
                }}
              />
              <span
                className="h-0.5 bg-current rounded transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="h-0.5 bg-current rounded transition-all duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(-45deg) translateY(-7px)"
                    : "none",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-4 pt-2 space-y-1"
          style={{
            background: "rgba(10, 10, 15, 0.98)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`nav-mobile-${item.label.toLowerCase()}`}
                className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                style={{
                  color: isActive ? "#a78bfa" : "rgba(148, 163, 184, 1)",
                  background: isActive
                    ? "rgba(139, 92, 246, 0.1)"
                    : "transparent",
                  [isRTL ? "borderRight" : "borderLeft"]: isActive
                    ? "2px solid #7c3aed"
                    : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/FakhirAhmedKhan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-3 px-4 py-3 text-sm font-semibold text-white rounded-xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            }}
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </header>
  );
}
