"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";

interface HeroButtonProps {
  variant: "primary" | "secondary";
  href: string;
  id: string;
  /** Next.js client-side navigation for internal routes; a plain anchor otherwise. */
  internal?: boolean;
  download?: boolean;
  ariaLabel?: string;
  /** Enables the subtle magnetic pull (fine pointers, motion allowed). */
  magnetic: boolean;
  children: ReactNode;
}

/** Hero call-to-action. Label and icon share one inner span that the magnetic effect nudges. */
export default function HeroButton({
  variant,
  href,
  id,
  internal = false,
  download,
  ariaLabel,
  magnetic,
  children,
}: HeroButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, magnetic);

  const className = `hero-btn hero-btn--${variant}`;
  const content = <span className="hero-btn__content">{children}</span>;

  if (internal) {
    return (
      <Link ref={ref} href={href} id={id} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a ref={ref} href={href} id={id} className={className} download={download} aria-label={ariaLabel}>
      {content}
    </a>
  );
}
