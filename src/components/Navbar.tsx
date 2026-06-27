"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ur", label: "اردو", flag: "🇵🇰" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 10, 15, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "transparent",
      }}
    >
      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            FK
          </div>
          <span className="hidden sm:block text-slate-100 font-semibold">
            {t.meta.name}
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? "#a78bfa" : "#94a3b8",
                      background: isActive
                        ? "rgba(139,92,246,0.1)"
                        : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language selector — keyboard accessible */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={`Language: ${currentLang?.label}. Click to change`}
              className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg flex items-center gap-1.5 hover:bg-white/10 transition-colors"
            >
              <span>{currentLang?.flag}</span>
              <svg
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <ul
                role="listbox"
                aria-label="Select language"
                className="absolute right-0 mt-2 w-36 bg-[#12121e] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
              >
                {languages.map((lang) => (
                  <li key={lang.code} role="option" aria-selected={language === lang.code}>
                    <button
                      onClick={() => {
                        setLanguage(lang.code as "en" | "ur" | "ar" | "es");
                        setLangOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-xs text-left hover:bg-white/5 flex items-center gap-2 transition-colors"
                      style={{
                        color: language === lang.code ? "#a78bfa" : "#94a3b8",
                      }}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/FakhirAhmedKhan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile (opens in new tab)"
            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            GitHub
          </a>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? (
            /* X icon */
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ================= MOBILE NAV ================= */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden px-6 pb-4 bg-[#0a0a0f]"
        >
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-xl text-sm font-medium"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? "#a78bfa" : "#94a3b8",
                      background: isActive
                        ? "rgba(139,92,246,0.1)"
                        : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Language options inline for mobile */}
            <li>
              <div className="flex gap-2 px-4 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ur" | "ar" | "es")}
                    aria-label={`Switch to ${lang.label}`}
                    aria-pressed={language === lang.code}
                    className="text-lg rounded-lg p-1.5 hover:bg-white/5 transition-colors"
                    style={{
                      outline: language === lang.code ? "1px solid rgba(139,92,246,0.5)" : "none",
                    }}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
            </li>

            <li>
              <a
                href="https://github.com/FakhirAhmedKhan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile (opens in new tab)"
                className="block px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl text-sm font-medium text-center"
              >
                GitHub Profile
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
