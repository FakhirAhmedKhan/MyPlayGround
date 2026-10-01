import BackgroundGrid from "./hero/BackgroundGrid";
import "./page-background.css";

export type PageBackgroundVariant =
  | "home"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "blog"
  | "article"
  | "center";

interface GridSpec {
  cols: number;
  rows: number;
  seed: number;
  /** Which corner the cluster hangs from: top corners sit under the navbar, bottom ones above the footer. */
  corner: "tl" | "tr" | "bl" | "br";
  density: number;
}

// Two dot-grid clusters on each listing page — a large one at the top and a smaller one in
// the opposite bottom corner. Reading pages (article, 404) and the home sections have none.
const top = (seed: number, corner: "tl" | "tr"): GridSpec => ({ cols: 22, rows: 12, seed, corner, density: 1.6 });
const bottom = (seed: number, corner: "bl" | "br"): GridSpec => ({ cols: 16, rows: 9, seed, corner, density: 1.4 });

const GRIDS: Partial<Record<PageBackgroundVariant, GridSpec[]>> = {
  projects: [top(21, "tl"), bottom(22, "br")],
  skills: [top(33, "tr"), bottom(34, "bl")],
  education: [top(47, "tr"), bottom(48, "bl")],
  certifications: [top(58, "tl"), bottom(59, "br")],
  blog: [top(69, "tr"), bottom(70, "bl")],
};

interface PageBackgroundProps {
  variant: PageBackgroundVariant;
}

/**
 * Shared page backdrop that continues the hero's look: emerald light pools on the
 * near-black page colour, a faint technical line grid, a calm dot-grid cluster and the
 * same barely-there noise. Entirely static (gradients and one tiled SVG), so it costs
 * nothing at runtime and no blur filters.
 *
 * Place it as the first child of a wrapper that is `relative isolate`; it sits behind that
 * wrapper's content and never takes pointer events.
 */
export default function PageBackground({ variant }: PageBackgroundProps) {
  const grids = GRIDS[variant] ?? [];

  return (
    <div className={`page-bg page-bg--${variant}`} aria-hidden="true">
      <div className="page-bg__lighting" />
      <div className="page-bg__lines" />
      {grids.map((grid) => (
        <BackgroundGrid
          key={grid.seed}
          cols={grid.cols}
          rows={grid.rows}
          seed={grid.seed}
          anchor={grid.corner}
          density={grid.density}
          animated={false}
          className={`page-grid page-grid--${grid.corner}`}
        />
      ))}
      <div className="page-bg__noise" />
    </div>
  );
}
