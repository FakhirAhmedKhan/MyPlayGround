import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import SkillCard from "@/components/SkillCard";
import { getSkillsData, getMetaData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const meta = getMetaData();
  const skills = getSkillsData();
  return {
    title: "Skills & Toolkit",
    description: `${meta.name}'s technical skills and tools: ${skills.items
      .map((s) => s.name)
      .slice(0, 8)
      .join(", ")} and more.`,
    openGraph: {
      title: `Skills & Toolkit | ${meta.name}`,
      description: skills.paragraph,
    },
  };
}

export default function SkillsPage() {
  const skillsData = getSkillsData();

  // Group skills by category
  const categories = {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "React Native",
      "Next.js",
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
      "Expo",
      "Electron",
      "Docker",
    ],
  };

  const grouped = Object.entries(categories).map(([category, names]) => ({
    category,
    skills: skillsData.items.filter((s) => names.includes(s.name)),
  }));

  return (
    <div className="relative min-h-screen pt-24">
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
          badge="Always Learning"
          title={skillsData.title}
          paragraph={skillsData.paragraph}
        />

        {/* All skills at top */}
        <div className="glass-card p-8 mb-16">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
            {skillsData.items.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

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
                    background:
                      "linear-gradient(to right, rgba(139,92,246,0.5), transparent)",
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
                    background:
                      "linear-gradient(to left, rgba(139,92,246,0.5), transparent)",
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
