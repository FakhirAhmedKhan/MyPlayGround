"use client";

import type { HomeSection } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import HeroButton from "./HeroButton";
import HeroName from "./HeroName";
import HeroSocials from "./HeroSocials";
import RoleTypewriter from "./RoleTypewriter";

interface HeroContentProps {
  data: HomeSection;
  magnetic: boolean;
}

/** Left-hand column. The entrance sequence is driven by the `hero-d*` delay classes (ms). */
export default function HeroContent({ data, magnetic }: HeroContentProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="hero-copy">
      <div className="hero-main">
        <div className="hero-badge hero-in hero-d100">
          <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
            <span className="ping-finite absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" aria-hidden="true" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" aria-hidden="true" />
          </span>
          {t.badges.home}
        </div>

        <p className="hero-greeting hero-in hero-d200">{data.greeting}</p>

        <HeroName data={data} />

        <div className="hero-in hero-d550">
          <RoleTypewriter prefix={data.tagline} roles={data.roles} />
        </div>

        <p className="hero-description hero-in hero-d650">{data.description}</p>

        <div className="hero-ctas hero-in hero-d750">
          <HeroButton variant="primary" href="/projects" id="hero-cta-projects" internal magnetic={magnetic}>
            {data.cta}
            <svg
              className={`hero-btn__icon hero-btn__arrow ${isRTL ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </HeroButton>

          <HeroButton variant="secondary" href="#contact" id="hero-cta-contact" magnetic={magnetic}>
            {isRTL ? "رابطہ کریں" : "Contact Me"}
            <svg className="hero-btn__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </HeroButton>

          <HeroButton
            variant="secondary"
            href="/resume.pdf"
            id="hero-cta-resume"
            download
            ariaLabel="Download resume PDF"
            magnetic={magnetic}
          >
            {isRTL ? "ریزومے ڈاؤنلوڈ" : "Resume"}
            <svg className="hero-btn__icon hero-btn__icon--down" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </HeroButton>
        </div>
      </div>

      <HeroSocials links={data.socialLinks} />
    </div>
  );
}
