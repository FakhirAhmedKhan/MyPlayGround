/**
 * Digital rings framing the portrait: a translucent glass disc, a comet-arc ring, a
 * tick-mark dial and one tilted orbit with a satellite. Pure CSS (see hero.css).
 *
 * Returned as a fragment on purpose — every plane has to stay a direct child of the 3D rig
 * so that it keeps its own depth.
 */
export default function OrbitalRings() {
  return (
    <>
      <div className="hero-layer hero-layer--dial" aria-hidden="true">
        <div className="hero-ring hero-ring--dial">
          <div className="hero-ring__spin" />
        </div>
      </div>

      <div className="hero-layer hero-layer--disc" aria-hidden="true">
        <div className="hero-disc">
          <div className="hero-disc__body" />
        </div>
      </div>

      <div className="hero-layer hero-layer--arc" aria-hidden="true">
        <div className="hero-ring hero-ring--arc">
          <div className="hero-ring__spin">
            <i className="hero-ring__arc" />
            <i className="hero-ring__node" />
          </div>
        </div>
      </div>

      <div className="hero-layer hero-layer--orbit" aria-hidden="true">
        <div className="hero-ring hero-ring--orbit">
          <div className="hero-ring__spin">
            <i className="hero-ring__sat" />
          </div>
        </div>
      </div>
    </>
  );
}
