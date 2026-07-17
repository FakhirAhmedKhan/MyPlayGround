"use client";

interface HeroNameProps {
  data: { name?: string };
}

export default function HeroName({ data }: HeroNameProps) {
  const fullName  = data?.name?.trim() ?? "Fakhir Ahmed Khan";
  const parts     = fullName.split(/\s+/);
  const firstName = parts[0] ?? "";
  const restName  = parts.slice(1).join(" ");

  /* Global letter index for stagger — continues across lines */
  let gi = 0;

  return (
    <div className="hero-name-container mb-8 select-none cursor-default">
      <h1
        aria-label={fullName}
        className="hero-name-heading font-black"
        style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)", letterSpacing: "-0.03em" }}
      >
        {/* Line 1 */}
        <span className="block hero-line-first" aria-hidden="true">
          {firstName.split("").map((ch) => {
            const idx = gi++;
            return (
              <span
                key={idx}
                className="hero-letter"
                style={{ "--i": idx } as React.CSSProperties}
              >
                {ch}
              </span>
            );
          })}
        </span>

        {/* Line 2 */}
        {restName && (
          <span className="block hero-line-remaining" aria-hidden="true">
            {restName.split("").map((ch) => {
              const idx = gi++;
              return (
                <span
                  key={idx}
                  className="hero-letter"
                  style={{ "--i": idx } as React.CSSProperties}
                >
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
