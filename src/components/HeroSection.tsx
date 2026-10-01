"use client";

import { useRef } from "react";
import type { HomeSection } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useOffscreenPause } from "@/hooks/useOffscreenPause";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";
import ScrollCue from "./hero/ScrollCue";
import "./hero/hero.css";

interface HeroSectionProps {
  data: HomeSection;
}

/**
 * Hero: copy on the left, an interactive layered 3D portrait on the right.
 *
 * This component only wires behaviour to the DOM (pointer parallax, scroll progress,
 * pause-when-offscreen). Pointer and scroll values are written straight to CSS variables,
 * so none of it re-renders React. Everything visual lives in ./hero/* and hero.css.
 */
export default function HeroSection({ data }: HeroSectionProps) {
  const { isRTL } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const pointerMotion = finePointer && !reducedMotion;

  useMouseParallax(rootRef, rigRef, pointerMotion);
  useHeroScroll(rootRef, !reducedMotion);
  useOffscreenPause(rootRef);

  return (
    <section
      ref={rootRef}
      id="hero-section"
      className={`hero ${isRTL ? "font-urdu" : ""}`}
      data-hero-active="true"
      aria-label="Hero section"
    >
      <HeroBackground />

      <div className="hero-inner">
        <HeroContent data={data} magnetic={pointerMotion} />
        <HeroVisual name={data.name} rigRef={rigRef} />
      </div>

      <div className="hero-fade" aria-hidden="true" />
      <ScrollCue />
    </section>
  );
}
