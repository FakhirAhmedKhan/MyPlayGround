import Image from "next/image";

interface PortraitStageProps {
  name: string;
}

/**
 * The portrait plane. The image is a transparent cutout of the original photo
 * (public/hero/portrait.webp); hero.css adds rim light, a soft backlight and a lower fade.
 * The "sheen" is a faint cursor-following light clipped to the suit (never the face).
 */
export default function PortraitStage({ name }: PortraitStageProps) {
  return (
    <div className="hero-layer hero-layer--portrait">
      <div className="hero-portrait">
        <Image
          className="hero-portrait__img"
          src="/hero/portrait.webp"
          alt={`Portrait of ${name}, wearing a dark suit and white shirt`}
          width={940}
          height={1160}
          sizes="(max-width: 899px) min(82vw, 28rem), min(42vw, 42rem)"
          quality={90}
          preload
        />
        <div className="hero-portrait__sheen" aria-hidden="true">
          <div className="hero-portrait__sheen-clip">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
