import type { RefObject } from "react";
import BackgroundGrid from "./BackgroundGrid";
import FloatingCards from "./FloatingCards";
import FloatingParticles from "./FloatingParticles";
import GeoShapes from "./GeoShapes";
import OrbitalRings from "./OrbitalRings";
import PortraitStage from "./PortraitStage";

interface HeroVisualProps {
  name: string;
  /** Element that receives the eased `--mx` / `--my` pointer variables. */
  rigRef: RefObject<HTMLDivElement | null>;
}

/**
 * Right-hand column: a layered 3D scene.
 *
 *   .hero-stage  — owns `perspective`
 *   .hero-rig    — `preserve-3d`, tilts a few degrees towards the pointer
 *   .hero-layer  — planes at different translateZ (back → front):
 *                  glow · dial · disc · arc · orbit · grid · shapes · light · portrait · cards · particles
 *
 * Nothing between the stage and the planes may use overflow, filter, mask, clip-path or
 * opacity < 1, otherwise the browser flattens the 3D context.
 */
export default function HeroVisual({ name, rigRef }: HeroVisualProps) {
  return (
    <div className="hero-visual">
      <div className="hero-stage">
        <div className="hero-rig" ref={rigRef}>
          <div className="hero-layer hero-layer--glow" aria-hidden="true" />

          <OrbitalRings />

          <div className="hero-layer hero-layer--grid" aria-hidden="true">
            <BackgroundGrid cols={13} rows={8} seed={11} anchor="tr" className="hero-grid--stage" />
          </div>

          <GeoShapes />

          <div className="hero-layer hero-layer--light" aria-hidden="true">
            <div className="hero-light" />
          </div>

          <PortraitStage name={name} />
          <FloatingCards />
          <FloatingParticles />
        </div>
      </div>
    </div>
  );
}
