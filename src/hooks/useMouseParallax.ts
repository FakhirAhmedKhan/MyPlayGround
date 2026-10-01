"use client";

import { useEffect, type RefObject } from "react";
import { clamp } from "@/lib/math";

/**
 * Pointer parallax without React state.
 *
 * Tracks the pointer inside `areaRef` as normalised coordinates (-1 … 1) and writes them,
 * eased, to `--mx` / `--my` on `targetRef`. CSS turns those variables into transforms, so a
 * mouse move never re-renders React. The rAF loop only runs while the value is still moving
 * towards its target and goes back to sleep once settled.
 *
 * `ease` is the fraction of the remaining distance covered per 60fps frame; it is
 * time-compensated so the feel is identical on 60Hz and 144Hz displays.
 */
export function useMouseParallax(
  areaRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  ease = 0.085,
) {
  useEffect(() => {
    const area = areaRef.current;
    const target = targetRef.current;
    if (!enabled || !area || !target) return;

    let rect: DOMRect | null = null;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let last = 0;
    let raf = 0;

    const frame = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 16.7;
      last = now;
      const k = 1 - Math.pow(1 - ease, dt / 16.7);
      x += (tx - x) * k;
      y += (ty - y) * k;

      const settled = Math.abs(tx - x) < 0.001 && Math.abs(ty - y) < 0.001;
      if (settled) {
        x = tx;
        y = ty;
      }
      target.style.setProperty("--mx", x.toFixed(4));
      target.style.setProperty("--my", y.toFixed(4));

      if (settled) {
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      rect ??= area.getBoundingClientRect();
      tx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1);
      ty = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1);
      wake();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      wake();
    };

    const invalidate = () => {
      rect = null;
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);

    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(raf);
      target.style.removeProperty("--mx");
      target.style.removeProperty("--my");
    };
  }, [areaRef, targetRef, enabled, ease]);
}
