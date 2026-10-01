import BackgroundGrid from "./BackgroundGrid";

/**
 * Static, page-level lighting for the hero: near-black base, an emerald glow behind the
 * portrait, a faint one near the name, a vignette and a barely-there noise texture.
 * Everything here is one gradient stack plus a tiny tiled SVG; nothing repaints.
 */
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__lighting" />
      <BackgroundGrid cols={9} rows={6} seed={7} anchor="tl" className="hero-grid--page" />
      <div className="hero-bg__noise" />
    </div>
  );
}
