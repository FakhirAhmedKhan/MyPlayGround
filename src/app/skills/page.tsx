"use client";

import SectionHeader from "@/components/SectionHeader";
import SkillCard from "@/components/SkillCard";
import { useLanguage } from "@/context/LanguageContext";

export default function SkillsPage() {
  const { t, isRTL } = useLanguage();

  const skillIcons = t.SkillIcon.items;
  const skillsConfig = t.sections.skills;

  const categories: Record<string, string[]> = {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "Redux",
      "React Query",
      "Zustand",
    ],

    Mobile: [
      "React Native",
      "Expo",
      "Flutter",
      "Dart",
      "Android",
      "Kotlin",
      "Java",
      "Android Studio",
    ],

    Backend: [
      "Node.js",
      "Express.js",
      "Nest.js",
      "Python",
      "FastAPI",
      "Django",
      "GraphQL",
      "Apollo GraphQL",
    ],

    Database: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
      "Redis",
      "SQL Server",
      "Prisma",
      "Firebase",
      "Supabase",
    ],

    "AI & Data": [
      "OpenAI",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "Jupyter",
      "Pandas",
      "NumPy",
    ],

    "Tools & DevOps": [
      "Git",
      "GitHub",
      "GitHub Actions",
      "GitLab",
      "Docker",
      "Linux",
      "Ubuntu",
      "Nginx",
      "Jenkins",
      "Postman",
      "Swagger",
    ],

    "Testing & Automation": ["Vitest", "Jest", "Playwright", "Selenium"],

    "Desktop & Design": [
      "Electron",
      "Figma",
      "Photoshop",
      "VS Code",
      "PyCharm",
      "IntelliJ IDEA",
    ],

    "Package Managers": ["npm", "pnpm", "Yarn", "Webpack", "Babel"],
  };

  const categoryLabels: Record<string, string> = {
    Frontend: "فرنٹ اینڈ",
    Mobile: "موبائل",
    Backend: "بیک اینڈ",
    Database: "ڈیٹا بیس",
    "AI & Data": "اے آئی اور ڈیٹا",
    "Tools & DevOps": "ٹولز اور ڈیواوپس",
    "Testing & Automation": "ٹیسٹنگ اور آٹومیشن",
    "Desktop & Design": "ڈیسک ٹاپ اور ڈیزائن",
    "Package Managers": "پیکیج مینیجرز",
  };

  const grouped = Object.entries(categories)
    .map(([key, names]) => ({
      key,
      category: isRTL ? categoryLabels[key] || key : key,
      skills: skillIcons.filter((skill) => names.includes(skill.name)),
    }))
    .filter((group) => group.skills.length > 0);

  return (
    <div className={`relative min-h-screen pt-24 ${isRTL ? "font-urdu" : ""}`}>
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

        <div className="space-y-12">
          {grouped.map(({ key, category, skills }) => (
            <section
              key={key}
              id={`skills-${key.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              aria-labelledby={`category-${key
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-")}`}
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
                  id={`category-${key
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "-")}`}
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
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}