/** Minimal "mouse" scroll cue; fades out as soon as the page starts to scroll. */
export default function ScrollCue() {
  return (
    <div className="hero-cue" aria-hidden="true">
      <span className="hero-cue__mouse">
        <span className="hero-cue__wheel" />
      </span>
    </div>
  );
}
