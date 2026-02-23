import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import CertificationCard from "@/components/CertificationCard";
import { getCertificationsData, getMetaData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const meta = getMetaData();
  const certs = getCertificationsData();
  return {
    title: "Certifications",
    description: `${meta.name} has earned ${certs.items.length} certifications from HackerRank, Simplilearn, and freeCodeCamp. ${certs.paragraph}`,
    openGraph: {
      title: `Certifications | ${meta.name}`,
      description: certs.paragraph,
    },
  };
}

export default function CertificationsPage() {
  const certsData = getCertificationsData();

  const issuerGroups = Array.from(
    new Set(certsData.items.map((c) => c.issuer)),
  );

  return (
    <div className="relative min-h-screen pt-24">
      {/* Background */}
      <div
        className="absolute inset-0 animated-bg pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="orb w-96 h-96 -left-20 top-20 opacity-15"
        style={{ background: "rgba(139,92,246,0.4)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-64 h-64 right-10 bottom-20 opacity-10"
        style={{ background: "rgba(34,211,238,0.3)" }}
        aria-hidden="true"
      />

      <div className="relative section-container">
        <SectionHeader
          badge="Certifications is key to success"
          title={certsData.title}
          paragraph={certsData.paragraph}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {[
            { value: certsData.items.length, label: "Total Certificates" },
            { value: issuerGroups.length, label: "Issuers" },
            { value: "2025", label: "Latest Year" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-3xl font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certsData.items.map((cert, i) => (
            <CertificationCard key={i} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
