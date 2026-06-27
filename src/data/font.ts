import { Inter } from "next/font/google";

// Explicit weights prevent loading the full Inter variable font (~110KB).
// Only weights actually used in Tailwind classes are listed:
// 400 (body), 500 (font-medium), 600 (font-semibold), 700 (font-bold), 900 (font-black)
export const inter = Inter({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
