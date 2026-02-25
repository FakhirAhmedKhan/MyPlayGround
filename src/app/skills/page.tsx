"use client";

import SectionHeader from "@/components/SectionHeader";
import SkillCard from "@/components/SkillCard";
import { useLanguage } from "@/context/LanguageContext";

export default function SkillsPage() {
  const { t, isRTL } = useLanguage();
  const skillIcons = t.SkillIcon.items;
  const skillsConfig = t.sections.skills;

  // Group skills by category
  const categories: Record<string, string[]> = {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "React Native",
      "Next.js",
      "Electron",
      "Tailwind CSS",
    ],
    Backend: ["Node.js", "Nest.js", "Python", "MySQL", "MongoDB"],
    "Tools & DevOps": [
      "Git",
      "GitHub",
      "VS Code",
      "PyCharm",
      "Vite",
      "Vitest",
      "Prisma",
      "Postman",
      "Swagger",
      "Expo",
      "Docker",
    ],
  };

  const grouped = Object.entries(categories).map(([category, names]) => ({
    category: isRTL
      ? category === "Frontend"
        ? "فرنٹ اینڈ"
        : category === "Backend"
          ? "بیک اینڈ"
          : "ٹولز اور ڈیواوپس"
      : category,
    skills: skillIcons.filter((s) => names.includes(s.name)),
  }));

  return (
    <div className={`relative min-h-screen pt-24 ${isRTL ? "font-urdu" : ""}`}>
      {/* Background */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="orb w-96 h-96 -left-32 top-32 opacity-15"
        style={{ background: "rgba(139,92,246,0.5)" }}
        aria-hidden="true"
      />

      <div className="relative section-container">
        <SectionHeader
          badge={t.badges.skills}
          title={skillsConfig.title}
          paragraph={skillsConfig.paragraph}
        />

        {/* Grouped by category */}
        <div className="space-y-12">
          {grouped.map(({ category, skills }) => (
            <section
              key={category}
              id={`skills-${category.toLowerCase().replace(/[^a-z]/g, "-")}`}
              aria-labelledby={`category-${category}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-px flex-1"
                  style={{
                    background: isRTL
                      ? "linear-gradient(to left, rgba(139,92,246,0.5), transparent)"
                      : "linear-gradient(to right, rgba(139,92,246,0.5), transparent)",
                  }}
                />
                <h2
                  id={`category-${category}`}
                  className="text-slate-300 font-semibold text-sm uppercase tracking-widest px-4"
                >
                  {category}
                </h2>
                <div
                  className="h-px flex-1"
                  style={{
                    background: isRTL
                      ? "linear-gradient(to right, rgba(139,92,246,0.5), transparent)"
                      : "linear-gradient(to left, rgba(139,92,246,0.5), transparent)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
