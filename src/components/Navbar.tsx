"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
          {/* Language */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg">
              {languages.find((l) => l.code === language)?.flag}
            </button>

            <div className="absolute right-0 mt-2 w-36 bg-[#12121e] border border-white/10 rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className="w-full px-4 py-2 text-xs text-left hover:bg-white/5"
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/FakhirAhmedKhan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm rounded-lg"
          >
            GitHub
          </a>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE NAV ================= */}
      {menuOpen && (
        <nav
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
                    className="block px-4 py-3 rounded-xl"
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

            <li>
              <a
                href="https://github.com/FakhirAhmedKhan"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-xl"
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