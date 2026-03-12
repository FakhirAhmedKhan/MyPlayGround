import type { BlogPost } from "./types";
import blogData from "@/data/blog.json";

export function getBlogPosts(): BlogPost[] {
  return blogData as BlogPost[];
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.id === id);
}

export function getAllBlogIds(): string[] {
  return getBlogPosts().map((post) => post.id);
}
