"use client";

import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import SkillCard from "@/components/SkillCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t, isRTL } = useLanguage();
  const homeData = t.sections.home;
  const projectsData = t.sections.projects;
  const skillsData = t.sections.skills;

  // Show featured projects (first 6)
  const featuredProjects = projectsData.items.slice(0, 6);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://fakhirahmedkhan.dev/#person",
                name: t.meta.name,
                url: "https://fakhirahmedkhan.dev",
                jobTitle: "Full-Stack Developer",
                description: t.meta.description,
                sameAs: [
                  "https://github.com/FakhirAhmedKhan",
                  "https://linkedin.com/in/fakhir-ahmed-3b5537316",
                  "https://twitter.com/FakhirAhme41220",
                ],
                knowsAbout: [
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "MongoDB",
                  "Tailwind CSS",
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://fakhirahmedkhan.dev/#website",
                url: "https://fakhirahmedkhan.dev",
                name: `${t.meta.name} Portfolio`,
                description: `Personal portfolio website of ${t.meta.name}`,
                author: { "@id": "https://fakhirahmedkhan.dev/#person" },
              },
            ],
          }),
        }}
      />

      <div className={isRTL ? "font-urdu" : ""}>
        {/* Hero */}
        <HeroSection data={homeData} />

        {/* Featured Projects Preview */}
        <section
          id="featured-projects"
          className="section-container"
          aria-labelledby="featured-projects-heading"
        >
          <SectionHeader
            badge={t.badges.projects}
            title={projectsData.title}
            paragraph={projectsData.paragraph}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 text-start">
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
                className={`w-4 h-4 ${isRTL ? "rotate-180 mr-2" : "ml-2"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Skills Preview */}
        <section
          id="featured-skills"
          className="section-container pt-0"
          aria-labelledby="skills-preview-heading"
        >
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
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

        {/* Stats Section */}
        <section id="home-stats" className="section-container pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                value: "30+",
                label: isRTL ? "پروجیکٹس بنائے" : "Projects Built",
                icon: "🚀",
              },
              {
                value: "8+",
                label: isRTL ? "سرٹیفیکیشنز" : "Certifications",
                icon: "🏆",
              },
              {
                value: "3+",
                label: isRTL ? "سیکھنے کے سال" : "Years Learning",
                icon: "📚",
              },
              {
                value: "10+",
                label: isRTL ? "ٹیکنالوجیز" : "Technologies",
                icon: "⚡",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black mb-1 gradient-text">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
