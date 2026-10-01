import type { CSSProperties } from "react";

/** `style` prop type that also accepts CSS custom properties (`--foo`). */
export type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };
