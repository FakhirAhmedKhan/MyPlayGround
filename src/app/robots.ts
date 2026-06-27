import type { MetadataRoute } from "next";
import portfolioData from "@/data/portfolio.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${portfolioData.meta.url}/sitemap.xml`,
  };
}
