"use client";

import { useEffect, type RefObject } from "react";
import { clamp } from "@/lib/math";

/**
 * Writes `--hero-scroll` (0 → 1) on the hero while the first `range` of its height is
 * scrolled past. CSS reads the variable for the portrait drift, ring rotation and the very
 * slight content fade, so scrolling never touches React state.
 */
export function useHeroScroll(
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  range = 0.3,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;

    let height = root.offsetHeight;
    let last = -1;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const progress = clamp(window.scrollY / (height * range), 0, 1);
      if (progress === last) return;
      last = progress;
      root.style.setProperty("--hero-scroll", progress.toFixed(3));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const resizeObserver = new ResizeObserver(() => {
      height = root.offsetHeight;
      schedule();
    });
    resizeObserver.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", schedule);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
      root.style.removeProperty("--hero-scroll");
    };
  }, [rootRef, enabled, range]);
}
