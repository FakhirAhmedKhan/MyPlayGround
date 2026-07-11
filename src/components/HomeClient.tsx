"use client";

import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import SkillCard from "@/components/SkillCard";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HomeClient() {
  const { t, isRTL } = useLanguage();
  const homeData = t.sections.home;
  const projectsData = t.sections.projects;
  const skillsData = t.sections.skills;

  const featuredProjects = projectsData.items.slice(0, 6);

  const statsRef   = useScrollReveal(0.1);
  const projectRef = useScrollReveal(0.08);
  const skillRef   = useScrollReveal(0.08);
  const contactRef = useScrollReveal(0.1);

  const stats = [
    { value: `${projectsData.items.length}+`,           label: isRTL ? "پروجیکٹس بنائے"  : "Projects Built",    icon: "🚀" },
    { value: `${t.sections.certifications.items.length}+`, label: isRTL ? "سرٹیفیکیشنز"   : "Certifications",    icon: "🏆" },
    { value: "3+",                                       label: isRTL ? "سیکھنے کے سال"  : "Years Learning",    icon: "📚" },
    { value: `${skillsData.items.length}+`,              label: isRTL ? "ٹیکنالوجیز"      : "Technologies",      icon: "⚡" },
  ];

  return (
    <div className={isRTL ? "font-urdu" : ""}>
      {/* Hero */}
      <HeroSection data={homeData} />

      {/* Stats strip */}
      <section id="home-stats" className="section-container pt-0 pb-0" aria-label="Quick stats">
        <div ref={statsRef} className="reveal">
          {/* <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center py-2 reveal reveal-delay-${i + 1}`}
              >
                <div className="text-2xl mb-1.5" aria-hidden="true">{stat.icon}</div>
                <div
                  className="text-3xl font-black mb-1 gradient-text"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Featured projects */}
      <section
        id="featured-projects"
        className="section-container"
        aria-labelledby="featured-projects-heading"
      >
        <div ref={projectRef} className="reveal">
          <SectionHeader
            badge={t.badges.projects}
            title={projectsData.title}
            paragraph={projectsData.paragraph}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 text-start">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="text-center">
            <a
              href="/projects"
              id="home-view-all-projects"
              className="btn-secondary inline-flex"
            >
              {isRTL
                ? `تمام ${projectsData.items.length} پروجیکٹس دیکھیں`
                : `View All ${projectsData.items.length} Projects`}
              <svg
                className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section
        id="featured-skills"
        className="section-container pt-0"
        aria-labelledby="skills-preview-heading"
      >
        <div
          ref={skillRef}
          className="reveal rounded-3xl p-8 sm:p-12"
          style={{
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <SectionHeader
            badge={t.badges.skills}
            title={skillsData.title}
            paragraph={skillsData.paragraph}
          />

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-3">
            {skillsData.items.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="section-container pt-0"
        aria-labelledby="contact-heading"
      >
        <div ref={contactRef} className="reveal">
          <div
            className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,40,217,0.09) 0%, rgba(37,99,235,0.06) 50%, rgba(6,182,212,0.04) 100%)",
              border: "1px solid rgba(109,40,217,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Orbs */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "rgba(109,40,217,0.15)", filter: "blur(70px)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "rgba(37,99,235,0.1)", filter: "blur(60px)" }}
              aria-hidden="true"
            />

            {/* Availability badge */}
            <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-7 uppercase tracking-[0.1em] reveal-delay-1"
              style={{
                background: "rgba(109,40,217,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#c4b5fd",
              }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" aria-hidden="true" />
              </span>
              {isRTL ? "دستیاب ہے" : "Available for Work"}
            </div>

            {/* Heading */}
            <h2
              id="contact-heading"
              className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-50 mb-5 leading-tight reveal-delay-2"
              style={{ letterSpacing: "-0.025em" }}
            >
              {isRTL ? "مل کر کچھ بنائیں" : "Let's Build Something"}
              <span
                className="block gradient-text"
              >
                {isRTL ? "شاندار" : "Great Together"}
              </span>
            </h2>

            <p className="relative text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed reveal-delay-3">
              {isRTL
                ? "میں نئے مواقع، تعاون، اور دلچسپ پروجیکٹس کے لیے دستیاب ہوں۔"
                : "Open to new opportunities, collaborations, and interesting projects. Let's connect and build something remarkable."}
            </p>

            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 reveal-delay-4">
              <a
                href="https://linkedin.com/in/fakhir-ahmed-3b5537316"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn (opens in new tab)"
                className="btn-primary"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {isRTL ? "لنکڈاِن پر رابطہ" : "Connect on LinkedIn"}
              </a>

              <a
                href="https://github.com/FakhirAhmedKhan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile (opens in new tab)"
                className="btn-secondary"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                {isRTL ? "گِٹ ہب پروفائل" : "View GitHub"}
              </a>

              <a
                href="/resume.pdf"
                download
                aria-label="Download resume as PDF"
                className="btn-secondary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {isRTL ? "ریزومے ڈاؤنلوڈ" : "Download Resume"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
