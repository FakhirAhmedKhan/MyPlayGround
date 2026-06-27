import type { MetadataRoute } from "next";
import portfolioData from "@/data/portfolio.json";
import { getAllBlogIds } from "@/lib/blog";

const base = portfolioData.meta.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/projects`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/skills`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/certifications`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/education`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogIds().map((id) => ({
    url: `${base}/blog/${id}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...blogRoutes];
}
