import { ImageResponse } from "next/og";
import portfolioData from "@/data/portfolio.json";

export const runtime = "edge";
export const alt = `${portfolioData.meta.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030a05 0%, #051a0a 50%, #030a05 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Purple glow orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.18)",
            filter: "blur(80px)",
            top: -100,
            left: -100,
          }}
        />
        {/* Blue glow orb */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.15)",
            filter: "blur(80px)",
            bottom: -80,
            right: -80,
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #14532d, #059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 32,
          }}
        >
          FK
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
            marginBottom: 16,
            display: "flex",
          }}
        >
          {portfolioData.meta.name}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "rgba(148,163,184,1)",
            marginBottom: 40,
          }}
        >
          Full-Stack Developer
        </div>

        {/* Tech stack pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                background: "rgba(20,83,45,0.18)",
                border: "1px solid rgba(34,197,94,0.35)",
                color: "#86efac",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "rgba(100,116,139,1)",
            fontSize: 18,
          }}
        >
          {portfolioData.meta.url}
        </div>
      </div>
    ),
    size,
  );
}
