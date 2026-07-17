"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const footer = t.sections.footer;
  const meta = t.meta;
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/",               label: t.navLabels.home },
    { href: "/projects",       label: t.navLabels.projects },
    { href: "/skills",         label: t.navLabels.skills },
    { href: "/education",      label: t.navLabels.education },
    { href: "/certifications", label: t.navLabels.certifications },
    { href: "/blog",           label: t.navLabels.blog },
  ];

  const socials = [
    {
      href: "https://github.com/FakhirAhmedKhan",
      label: "GitHub",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/in/fakhir-ahmed-3b5537316",
      label: "LinkedIn",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className={`relative overflow-hidden ${isRTL ? "font-urdu" : ""}`}
      style={{
        background: "rgba(5, 5, 10, 0.96)",
      }}
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(109,40,217,0.5) 30%, rgba(37,99,235,0.5) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />


      <div className="relative max-w-[1240px] mx-auto px-6 pt-16 pb-10">

        {/* GitHub contributions */}
        <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-[0.1em]"
            style={{
              background: "rgba(109,40,217,0.1)",
              border: "1px solid rgba(139,92,246,0.28)",
              color: "#c4b5fd",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            {footer.title}
          </span>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">{footer.paragraph}</p>
        </div>

        {/* Contribution chart */}
        <div
          className="rounded-2xl p-5 mb-14 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/7c3aed/${footer.githubUsername}`}
            alt={`${meta.name} GitHub contribution chart`}
            className="w-full h-auto rounded-lg opacity-80"
            loading="lazy"
          />
        </div>

        {/* Footer grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12 ${isRTL ? "text-right" : ""}`}>
          {/* Brand */}
          <div>
            <div className={`flex items-center gap-2.5 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, #6d28d9, #2563eb)",
                  boxShadow: "0 4px 16px rgba(109,40,217,0.4)",
                }}
              >
                FK
              </div>
              <div>
                <p className="font-semibold text-slate-100 text-sm leading-none">{meta.name}</p>
                <p className="text-slate-600 text-xs mt-0.5">Full-Stack Developer</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {isRTL
                ? "جذبے اور درستگی کے ساتھ مستقبل کے ڈیجیٹل تجربات کی تعمیر۔"
                : "Building premium digital experiences with precision and purpose."}
            </p>

            {/* Social icons */}
            <div className={`flex gap-2.5 mt-5 ${isRTL ? "flex-row-reverse" : ""}`}>
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#64748b",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(139,92,246,0.12)";
                    el.style.borderColor = "rgba(139,92,246,0.3)";
                    el.style.color = "#c4b5fd";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "#64748b";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-[0.12em] mb-4">
              {isRTL ? "نیویگیشن" : "Navigation"}
            </h3>
            <ul className="space-y-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-500 hover:text-slate-200 text-sm transition-colors duration-200"
                  >
                    <span
                      className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3"
                      style={{ background: "rgba(139,92,246,0.6)" }}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-slate-300 font-semibold text-xs uppercase tracking-[0.12em] mb-4">
              {isRTL ? "تکنیک" : "Built With"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Vercel"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-lg font-medium"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#475569",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-slate-600 text-xs">
            © {year} {meta.name}.{" "}
            <span style={{ color: "#334155" }}>
              {isRTL ? "جذبے کے ساتھ بنایا گیا۔" : "Crafted with passion."}
            </span>
          </p>
          <div className="flex items-center gap-1.5 text-slate-700 text-xs">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "rgba(34,197,94,0.7)" }}
              aria-hidden="true"
            />
            {isRTL ? "تمام سروسز فعال ہیں" : "All systems operational"}
          </div>
        </div>
      </div>
    </footer>
  );
}
