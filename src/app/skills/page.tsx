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
      "HTML", "CSS", "JavaScript", "TypeScript",
      "React.js", "Vue.js", "Angular", "Svelte", "Astro", "Remix", "Gatsby",
      "Next.js", "Nuxt.js",
      "Tailwind CSS", "SASS", "Bootstrap", "Material UI",
      "Redux", "React Query", "Zustand", "Framer Motion",
      "Three.js", "Storybook", "Vite",
    ],

    Mobile: [
      "React Native", "Expo",
      "Flutter", "Dart",
      "Android", "Android Studio", "Kotlin", "Java",
      "Swift", "Objective-C", "Xcode",
      "Ionic", "Capacitor", "Cordova",
    ],

    Backend: [
      "Node.js", "Express.js", "Nest.js", "Deno", "Bun",
      "Python", "FastAPI", "Django",
      "PHP", "Laravel", "Symfony",
      "Ruby", "Rails",
      "Go", "Rust",
      "C#", ".NET",
      "Java", "Spring Boot", "Hibernate", "Maven", "Gradle", "Tomcat",
      "Scala", "Elixir",
      "GraphQL", "Apollo GraphQL", "gRPC", "Socket.io", "WebSocket",
      "RabbitMQ", "Apache Kafka",
    ],

    Languages: [
      "C", "C++", "Lua", "Perl", "R",
      "Haskell", "Clojure", "Erlang", "Julia", "MATLAB",
      "Solidity", "Markdown",
    ],

    Database: [
      "MySQL", "PostgreSQL", "MongoDB", "SQLite",
      "Redis", "SQL Server", "Prisma",
      "Firebase", "Supabase",
      "Cassandra", "CouchDB", "Neo4j",
      "Elasticsearch", "DynamoDB", "Oracle", "InfluxDB",
    ],

    "AI & Data": [
      "OpenAI", "TensorFlow", "PyTorch", "Keras",
      "Scikit-learn", "OpenCV", "Hugging Face", "CUDA",
      "Jupyter", "Pandas", "NumPy", "Matplotlib",
      "Hadoop", "Spark", "Airflow", "dbt",
    ],

    "Cloud & DevOps": [
      "Docker", "Kubernetes", "Terraform", "Ansible", "Vagrant",
      "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "Heroku",
      "DigitalOcean", "Cloudflare",
      "Nginx", "Apache", "Traefik",
      "Prometheus", "Grafana",
      "Jenkins", "GitHub Actions", "GitLab",
      "Linux", "Ubuntu", "Debian", "CentOS", "Fedora", "Arch Linux",
      "Windows", "macOS",
      "Bash", "PowerShell",
    ],

    "Testing & Automation": [
      "Vitest", "Jest", "Playwright", "Selenium", "Cypress", "Mocha", "Chai",
    ],

    "Tools & Editors": [
      "Git", "GitHub", "GitLab", "Bitbucket",
      "VS Code", "PyCharm", "IntelliJ IDEA",
      "Postman", "Swagger",
      "JIRA", "Confluence", "Trello", "Slack",
      "ESLint", "Prettier",
      "npm", "pnpm", "Yarn", "Webpack", "Rollup", "Babel",
      "Axios", "JWT",
    ],

    "Design & Creative": [
      "Figma", "Photoshop", "Illustrator", "XD", "Sketch",
      "After Effects", "Premiere Pro", "Blender",
      "Unity", "Unreal Engine",
    ],

    "CMS & E-commerce": [
      "WordPress", "Drupal", "Joomla", "Shopify", "Magento",
    ],

    "Embedded & Hardware": [
      "Raspberry Pi", "Arduino",
      "C", "C++",
    ],

    "Blockchain & Web3": [
      "Solidity", "IPFS",
    ],
  };

  const categoryLabels: Record<string, string> = {
    Frontend: "فرنٹ اینڈ",
    Mobile: "موبائل",
    Backend: "بیک اینڈ",
    Languages: "پروگرامنگ زبانیں",
    Database: "ڈیٹا بیس",
    "AI & Data": "اے آئی اور ڈیٹا",
    "Cloud & DevOps": "کلاؤڈ اور ڈیواوپس",
    "Testing & Automation": "ٹیسٹنگ اور آٹومیشن",
    "Tools & Editors": "ٹولز اور ایڈیٹرز",
    "Design & Creative": "ڈیزائن اور تخلیق",
    "CMS & E-commerce": "سی ایم ایس اور ای-کامرس",
    "Embedded & Hardware": "ایمبیڈڈ اور ہارڈویئر",
    "Blockchain & Web3": "بلاک چین اور ویب 3",
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
        style={{ background: "rgba(34,197,94,0.4)" }}
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
                      ? "linear-gradient(to left, rgba(34,197,94,0.4), transparent)"
                      : "linear-gradient(to right, rgba(34,197,94,0.4), transparent)",
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
                      ? "linear-gradient(to right, rgba(34,197,94,0.4), transparent)"
                      : "linear-gradient(to left, rgba(34,197,94,0.4), transparent)",
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