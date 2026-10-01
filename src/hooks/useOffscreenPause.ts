"use client";

import { useEffect, type RefObject } from "react";

/**
 * Flags the hero as inactive (`data-hero-active="false"`) once it has scrolled out of view.
 * hero.css pauses every looping animation in that state, so the ambient motion costs
 * nothing while the visitor is further down the page.
 */
export function useOffscreenPause(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(([entry]) => {
      root.dataset.heroActive = String(entry.isIntersecting);
    });
    observer.observe(root);

    return () => observer.disconnect();
  }, [rootRef]);
}
