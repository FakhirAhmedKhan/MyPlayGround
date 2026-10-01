import type { CSSVars } from "./cssVars";

interface HeroNameProps {
  data: { name?: string };
}

interface NameLineProps {
  text: string;
  /** Index of the line's first letter within the whole name (drives the hover stagger). */
  offset: number;
  tone: "first" | "rest";
  delayClass: string;
}

function NameLine({ text, offset, tone, delayClass }: NameLineProps) {
  return (
    <span className={`hero-name__line hero-name__line--${tone}`} aria-hidden="true">
      <span className={`hero-name__reveal ${delayClass}`}>
        {text.split("").map((char, i) => (
          <span key={i} className="hero-letter" style={{ "--i": offset + i } as CSSVars}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * The name is the visual anchor of the hero. Each line slides up out of a clipped mask on
 * load (one transform per line, not per letter); the per-letter flap is kept as a
 * hover-only flourish.
 */
export default function HeroName({ data }: HeroNameProps) {
  const fullName = data?.name?.trim() ?? "Fakhir Ahmed Khan";
  const [firstName = "", ...rest] = fullName.split(/\s+/).filter(Boolean);
  const restName = rest.join(" ");

  return (
    <div className="hero-name">
      <h1 aria-label={fullName} className="hero-name__heading">
        <NameLine text={firstName} offset={0} tone="first" delayClass="hero-d300" />
        {restName && (
          <NameLine text={restName} offset={firstName.length} tone="rest" delayClass="hero-d400" />
        )}
      </h1>
    </div>
  );
}
