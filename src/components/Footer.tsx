"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const footer = t.sections.footer;
  const meta = t.meta;
  const year = new Date().getFullYear();

  return (
    <footer
      className={`relative overflow-hidden ${isRTL ? "font-urdu" : ""}`}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(6, 6, 12, 0.9)",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb w-64 h-64 -left-20 -top-20 opacity-20"
        style={{ background: "rgba(139, 92, 246, 0.4)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-48 h-48 -right-10 -bottom-10 opacity-15"
        style={{ background: "rgba(59, 130, 246, 0.4)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* GitHub Contributions Section */}
        <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#a78bfa",
            }}
          >
            {footer.title}
          </div>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {footer.paragraph}
          </p>
        </div>

        {/* GitHub Contribution Chart */}
        <div className="glass-card p-6 mb-12 overflow-hidden">
          <img
            src={`https://ghchart.rshah.org/7c3aed/${footer.githubUsername}`}
            alt={`${meta.name} GitHub Contributions`}
            className="w-full h-auto opacity-90 rounded-lg"
            loading="lazy"
          />
        </div>

        {/* Footer Links Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 ${isRTL ? "text-right" : ""}`}
        >
          {/* Brand */}
          <div>
            <div
              className={`flex items-center gap-2 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                }}
              >
                FK
              </div>
              <span className="font-semibold text-slate-100">{meta.name}</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              {isRTL
                ? "جذبے اور درستگی کے ساتھ مستقبل کے ڈیجیٹل تجربات کی تعمیر۔"
                : "Building futuristic digital experiences with passion and precision."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">
              {isRTL ? "نیویگیشن" : "Navigation"}
            </h3>
            <ul className="space-y-2" role="list">
              {[
                { href: "/", label: t.navLabels.home },
                { href: "/projects", label: t.navLabels.projects },
                { href: "/skills", label: t.navLabels.skills },
                { href: "/education", label: t.navLabels.education },
                { href: "/certifications", label: t.navLabels.certifications },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-3 uppercase tracking-wider">
              {isRTL ? "رابطہ کریں" : "Connect"}
            </h3>
            <div className="flex flex-col gap-2">
              {[
                {
                  href: "https://github.com/FakhirAhmedKhan",
                  label: "GitHub",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  href: "https://linkedin.com/in/fakhir-ahmed-3b5537316",
                  label: "LinkedIn",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 ${isRTL ? "flex-row-reverse" : ""}`}
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-slate-500 text-sm">
            © {year} {meta.name}.{" "}
            {isRTL ? "جذبے کے ساتھ بنایا گیا۔" : "Crafted with passion."}
          </p>
          <p className="text-slate-600 text-xs">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
