import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import EducationTimeline from "@/components/EducationTimeline";
import { getEducationData, getMetaData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const meta = getMetaData();
  const edu = getEducationData();
  return {
    title: "Education",
    description: `${meta.name}'s educational journey: ${edu.paragraph}`,
    openGraph: {
      title: `Education | ${meta.name}`,
      description: edu.paragraph,
    },
  };
}

export default function EducationPage() {
  const educationData = getEducationData();

  return (
    <div className="relative min-h-screen pt-24">
      {/* Background */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="orb w-80 h-80 right-0 top-40 opacity-15"
        style={{ background: "rgba(59,130,246,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-60 h-60 left-10 bottom-20 opacity-10"
        style={{ background: "rgba(34,211,238,0.4)" }}
        aria-hidden="true"
      />

      <div className="relative section-container">
        <SectionHeader
          badge="EduBade"
          title={educationData.title}
          paragraph={educationData.paragraph}
        />

        <div className="max-w-3xl mx-auto">
          <EducationTimeline items={educationData.items} />
        </div>
      </div>
    </div>
  );
}
