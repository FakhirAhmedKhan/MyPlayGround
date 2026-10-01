import type { CSSVars } from "./cssVars";

type Anchor = "tl" | "tr" | "bl" | "br";

interface BackgroundGridProps {
  cols: number;
  rows: number;
  seed: number;
  /** Corner the cluster is densest in; it thins out towards the opposite corner. */
  anchor?: Anchor;
  className?: string;
}

interface Cell {
  row: number;
  col: number;
  opacity: number;
  kind: "still" | "breathe" | "pulse";
  duration: number;
  phase: number;
}

/**
 * mulberry32 — tiny seeded PRNG. Integer maths only, so server and client generate the
 * exact same cells (no hydration mismatch, no Math.random during render).
 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCells({ cols, rows, seed, anchor = "tl" }: Required<Omit<BackgroundGridProps, "className">>): Cell[] {
  const rand = mulberry32(seed);
  const focusX = anchor.endsWith("r") ? 1 : 0;
  const focusY = anchor.startsWith("b") ? 1 : 0;
  const cells: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Always draw the same five numbers per cell so the pattern stays stable.
      const presenceRoll = rand();
      const toneRoll = rand();
      const kindRoll = rand();
      const durationRoll = rand();
      const phaseRoll = rand();

      const dx = col / (cols - 1) - focusX;
      const dy = row / (rows - 1) - focusY;
      // 0 at the anchor corner → 1 at the far corner.
      const distance = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;

      if (presenceRoll > 0.95 - distance * 0.85) continue;

      // ~80% static, ~15% slow breathing, ~5% brighter pulse.
      const kind = kindRoll < 0.8 ? "still" : kindRoll < 0.95 ? "breathe" : "pulse";
      cells.push({
        row,
        col,
        opacity: 0.14 + toneRoll * 0.56 * (1 - distance * 0.5),
        kind,
        duration: kind === "pulse" ? 3.4 + durationRoll * 1.8 : 5 + durationRoll * 6,
        phase: phaseRoll,
      });
    }
  }
  return cells;
}

/**
 * Layered "digital matrix" of small squares. Most cells are static; a few breathe slowly
 * and fewer still pulse, each on its own period and phase so nothing moves in sync.
 */
export default function BackgroundGrid({ cols, rows, seed, anchor = "tl", className = "" }: BackgroundGridProps) {
  const cells = buildCells({ cols, rows, seed, anchor });

  return (
    <div className={`hero-grid ${className}`} style={{ "--cols": cols } as CSSVars} aria-hidden="true">
      {cells.map((cell) => {
        const style: CSSVars = {
          "--r": cell.row + 1,
          "--c": cell.col + 1,
          "--o": cell.opacity.toFixed(2),
        };
        if (cell.kind !== "still") {
          style["--dur"] = `${cell.duration.toFixed(1)}s`;
          style["--delay"] = `-${(cell.phase * cell.duration).toFixed(1)}s`;
        }
        return (
          <span
            key={`${cell.row}-${cell.col}`}
            className={cell.kind === "still" ? "hero-cell" : `hero-cell hero-cell--${cell.kind}`}
            style={style}
          />
        );
      })}
    </div>
  );
}
