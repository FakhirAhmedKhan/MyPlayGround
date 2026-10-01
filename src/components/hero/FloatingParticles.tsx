import type { CSSVars } from "./cssVars";

interface Particle {
  /** Position inside the stage, in %. */
  x: number;
  y: number;
  /** Size in px (a "line" is 4× as long as it is thick). */
  size: number;
  shape: "dot" | "square" | "line";
  /** Drift period (s), phase offset (s), and drift distance (px). */
  duration: number;
  phase: number;
  driftX: number;
  driftY: number;
  /** Opacity range the particle breathes through. */
  from: number;
  to: number;
}

// Hand-placed so the composition is balanced and identical on server and client.
// Twelve in total; hero.css thins them out on small screens.
const PARTICLES: Particle[] = [
  { x: 10, y: 20, size: 3, shape: "dot", duration: 9, phase: 2, driftX: 6, driftY: -14, from: 0.25, to: 0.75 },
  { x: 88, y: 14, size: 4, shape: "square", duration: 11, phase: 5, driftX: -8, driftY: 12, from: 0.2, to: 0.6 },
  { x: 94, y: 46, size: 3, shape: "dot", duration: 8, phase: 1, driftX: -5, driftY: -16, from: 0.3, to: 0.8 },
  { x: 4, y: 52, size: 3, shape: "line", duration: 12, phase: 7, driftX: 8, driftY: -10, from: 0.2, to: 0.55 },
  { x: 78, y: 6, size: 3, shape: "dot", duration: 10, phase: 3, driftX: 4, driftY: 14, from: 0.25, to: 0.7 },
  { x: 20, y: 8, size: 4, shape: "square", duration: 13, phase: 9, driftX: -6, driftY: 10, from: 0.15, to: 0.5 },
  { x: 97, y: 74, size: 3, shape: "line", duration: 9, phase: 4, driftX: -10, driftY: -8, from: 0.2, to: 0.6 },
  { x: 2, y: 78, size: 3, shape: "dot", duration: 10, phase: 6, driftX: 7, driftY: -12, from: 0.25, to: 0.65 },
  { x: 66, y: 34, size: 2, shape: "dot", duration: 7, phase: 2, driftX: 5, driftY: -9, from: 0.3, to: 0.85 },
  { x: 30, y: 38, size: 2, shape: "dot", duration: 8, phase: 8, driftX: -4, driftY: 11, from: 0.2, to: 0.7 },
  { x: 84, y: 88, size: 4, shape: "square", duration: 12, phase: 5, driftX: -7, driftY: -10, from: 0.15, to: 0.45 },
  { x: 14, y: 90, size: 3, shape: "dot", duration: 11, phase: 3, driftX: 6, driftY: -13, from: 0.2, to: 0.55 },
];

/** A handful of tiny motes on the nearest depth plane. Opacity + translate only. */
export default function FloatingParticles() {
  return (
    <div className="hero-layer hero-layer--particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`hero-particle hero-particle--${p.shape}`}
          style={
            {
              "--x": `${p.x}%`,
              "--y": `${p.y}%`,
              "--s": `${p.size}px`,
              "--dur": `${p.duration}s`,
              "--delay": `-${p.phase}s`,
              "--dx": `${p.driftX}px`,
              "--dy": `${p.driftY}px`,
              "--o1": p.from,
              "--o2": p.to,
            } as CSSVars
          }
        />
      ))}
    </div>
  );
}
