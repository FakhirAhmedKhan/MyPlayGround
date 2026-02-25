"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { PortfolioData } from "@/lib/types";
import enData from "@/data/portfolio.json";
import skillIconData from "@/data/SkillIcon.json";
import urData from "@/data/Urdu.json";
import arData from "@/data/Arabic.json";
import esData from "@/data/Español.json";

type Language = "en" | "ur" | "ar" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: PortfolioData;
  skillIconData: any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, any> = {
  en: enData,
  ur: urData,
  ar: arData,
  es: esData,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir =
      lang === "ar" || lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir =
      language === "ar" || language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  // Deep merge function to ensure we always have data even if translation is partial
  const mergeData = (base: any, override: any) => {
    const result = { ...base };
    for (const key in override) {
      if (
        override[key] &&
        typeof override[key] === "object" &&
        !Array.isArray(override[key])
      ) {
        result[key] = mergeData(base[key] || {}, override[key]);
      } else if (Array.isArray(override[key])) {
        // For arrays like projects items, we need to merge items by id if possible,
        // or just use the override if it's the right length
        if (base[key] && Array.isArray(base[key])) {
          result[key] = base[key].map((item: any, index: number) => {
            const overrideItem =
              (item.id !== undefined &&
                override[key].find((o: any) => o.id === item.id)) ||
              override[key][index];
            return { ...item, ...overrideItem };
          });
        } else {
          result[key] = override[key];
        }
      } else {
        result[key] = override[key];
      }
    }
    return result;
  };

  const mergedBase = mergeData(enData, translations[language]);
  const currentT = {
    ...mergedBase,
    SkillIcon: skillIconData,
    sections: {
      ...mergedBase.sections,
      skills: {
        ...mergedBase.sections.skills,
        items: skillIconData.items,
      },
    },
  } as PortfolioData;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: currentT,
        skillIconData: skillIconData,
        isRTL: language === "ar" || language === "ur",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
