"use client";

import SectionHeader from "@/components/SectionHeader";
import CertificationCard from "@/components/CertificationCard";
import { useLanguage } from "@/context/LanguageContext";
import PageBackground from "@/components/PageBackground";

export default function CertificationsPage() {
  const { t, isRTL } = useLanguage();
  const certsData = t.sections.certifications;

  const issuerGroups = Array.from(
    new Set(certsData.items.map((c) => c.issuer)),
  );

  const latestYear = Math.max(
    ...certsData.items.map((c) => parseInt(c.year, 10)),
  ).toString();

  return (
    <div className={`relative isolate min-h-screen pt-24 ${isRTL ? "font-urdu" : ""}`}>
      <PageBackground variant="certifications" />

      <div className="relative section-container">
        <SectionHeader
          badge={t.badges.certifications}
          title={certsData.title}
          paragraph={certsData.paragraph}
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {[
            {
              value: certsData.items.length,
              label: isRTL ? "کل سرٹیفکیٹس" : "Total Certificates",
            },
            {
              value: issuerGroups.length,
              label: isRTL ? "جاری کنندگان" : "Issuers",
            },
            { value: latestYear, label: isRTL ? "تازہ ترین سال" : "Latest Year" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 text-start">
          {certsData.items.map((cert) => (
            <CertificationCard key={cert.title} cert={cert} />
          ))}
        </div>
      </div>
    </div>
  );
}
