"use client";

interface HeroNameProps {
  data: { name?: string };
}

export default function HeroName({ data }: HeroNameProps) {
  const fullName  = data?.name?.trim() ?? "Fakhir Ahmed Khan";
  const parts     = fullName.split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const restName  = parts.slice(1).join(" ");

  /* Global letter index for stagger — continues across lines */
  let gi = 0;

  return (
    <div className="hero-name-container mb-5 select-none cursor-default">
      <h1
        aria-label={fullName}
        className="hero-name-heading font-black"
        style={{ fontSize: "clamp(3.5rem, 7.5vw, 7rem)", letterSpacing: "-0.04em", lineHeight: "1.0" }}
      >
        {/* Line 1 — first name */}
        <span className="block hero-line hero-line-first" aria-hidden="true">
          {firstName.split("").map((ch) => {
            const idx = gi++;
            return (
              <span key={idx} className="hero-letter" style={{ "--i": idx } as React.CSSProperties}>
                {ch}
              </span>
            );
          })}
        </span>

        {/* Line 2 — rest of name on one line, no wrapping */}
        {restName && (
          <span className="block hero-line hero-line-remaining" aria-hidden="true">
            {restName.split("").map((ch) => {
              const idx = gi++;
              return (
                <span key={idx} className="hero-letter" style={{ "--i": idx } as React.CSSProperties}>
                  {ch === " " ? " " : ch}
                </span>
              );
            })}
          </span>
        )}
      </h1>
    </div>
  );
}
