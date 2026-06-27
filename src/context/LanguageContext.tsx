"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import type { PortfolioData } from "@/lib/types";
import enData from "@/data/portfolio.json";
import skillIconData from "@/data/SkillIcon.json";

type Language = "en" | "ur" | "ar" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: PortfolioData;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Dynamic imports — translation files are NOT in the initial bundle.
// They are fetched only when the user switches language.
async function loadTranslation(lang: Language): Promise<Record<string, unknown>> {
  switch (lang) {
    case "ur":
      return (await import("@/data/Urdu.json")).default as Record<string, unknown>;
    case "ar":
      return (await import("@/data/Arabic.json")).default as Record<string, unknown>;
    case "es":
      return (await import("@/data/Español.json")).default as Record<string, unknown>;
    default:
      return {};
  }
}

function mergeData(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key in override) {
    const ov = override[key];
    const bv = base[key];
    if (ov && typeof ov === "object" && !Array.isArray(ov)) {
      result[key] = mergeData(
        (bv && typeof bv === "object" ? bv : {}) as Record<string, unknown>,
        ov as Record<string, unknown>,
      );
    } else if (Array.isArray(ov) && Array.isArray(bv)) {
      result[key] = (bv as Record<string, unknown>[]).map((item, index) => {
        const overrideItem =
          (item["id"] !== undefined &&
            (ov as Record<string, unknown>[]).find(
              (o) => o["id"] === item["id"],
            )) ||
          (ov as Record<string, unknown>[])[index];
        return { ...item, ...(overrideItem ?? {}) };
      });
    } else {
      result[key] = ov;
    }
  }
  return result;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  // Holds the loaded translation override; empty object = English (no override).
  const [translationOverride, setTranslationOverride] = useState<
    Record<string, unknown>
  >({});

  // On mount: restore saved language and lazy-load its translation.
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && saved !== "en") {
      setLanguageState(saved);
      loadTranslation(saved).then(setTranslationOverride);
    }
  }, []);

  // Sync dir + lang attribute whenever language changes.
  useEffect(() => {
    document.documentElement.dir =
      language === "ar" || language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    if (lang === "en") {
      setTranslationOverride({});
    } else {
      loadTranslation(lang).then(setTranslationOverride);
    }
  };

  // mergeData is only recomputed when translationOverride changes (i.e. on language switch).
  // English users pay zero cost here after the initial mount.
  const currentT = useMemo((): PortfolioData => {
    const merged = mergeData(
      enData as unknown as Record<string, unknown>,
      translationOverride,
    );
    return {
      ...merged,
      sections: {
        ...(merged["sections"] as Record<string, unknown>),
        skills: {
          ...((merged["sections"] as Record<string, Record<string, unknown>>)
            ?.skills ?? {}),
          items: skillIconData.items,
        },
      },
      SkillIcon: skillIconData,
    } as unknown as PortfolioData;
  }, [translationOverride]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: currentT,
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
