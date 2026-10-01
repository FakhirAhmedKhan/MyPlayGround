"use client";

import { useEffect, type RefObject } from "react";
import { clamp } from "@/lib/math";

/**
 * Subtle magnetic pull: while the pointer is within `reach` px of the element, its inner
 * content is nudged up to `strength` px towards the pointer via `--mag-x` / `--mag-y`.
 * The element itself never moves. Pointer coordinates are only stored in the listener;
 * all reads and writes happen in a rAF loop that sleeps once the content has settled.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  strength = 3,
  reach = 56,
) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let rect: DOMRect | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const frame = () => {
      rect ??= el.getBoundingClientRect();
      const halfW = rect.width / 2 + reach;
      const halfH = rect.height / 2 + reach;
      const dx = pointerX - (rect.left + rect.width / 2);
      const dy = pointerY - (rect.top + rect.height / 2);
      const near = Math.abs(dx) < halfW && Math.abs(dy) < halfH;

      const tx = near ? clamp(dx / halfW) * strength : 0;
      const ty = near ? clamp(dy / halfH) * strength : 0;
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;

      const settled = Math.abs(tx - x) < 0.02 && Math.abs(ty - y) < 0.02;
      if (settled) {
        x = tx;
        y = ty;
      }
      el.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
      el.style.setProperty("--mag-y", `${y.toFixed(2)}px`);

      raf = settled ? 0 : requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const invalidate = () => {
      rect = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(raf);
      el.style.removeProperty("--mag-x");
      el.style.removeProperty("--mag-y");
    };
  }, [ref, enabled, strength, reach]);
}
