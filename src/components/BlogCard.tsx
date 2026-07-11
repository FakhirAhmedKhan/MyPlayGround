"use client";

import type { BlogPost } from "@/lib/types";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const categoryAccents: Record<string, string> = {
  Tutorial:     "#7c3aed, #2563eb",
  Guide:        "#0891b2, #059669",
  Opinion:      "#db2777, #e11d48",
  Architecture: "#4f46e5, #7c3aed",
  Performance:  "#d97706, #b45309",
  Tooling:      "#059669, #0891b2",
};

function readingTime(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const accent = categoryAccents[post.category] ?? "rgba(139,92,246,1), rgba(59,130,246,1)";
  const mins = readingTime(post.description);

  return (
    <Link href={`/blog/${post.id}`} className="block h-full group">
      <article
        className="relative flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-400"
        style={{
          background: "rgba(255,255,255,0.026)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          animationDelay: `${index * 60}ms`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(139,92,246,0.28)";
          el.style.transform = "translateY(-5px)";
          el.style.boxShadow = "0 24px 60px rgba(109,40,217,0.15), inset 0 1px 0 rgba(255,255,255,0.07)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.07)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)";
        }}
      >
        {/* Gradient top accent bar */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${accent})` }}
          aria-hidden="true"
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Category + reading time */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "#c4b5fd",
              }}
            >
              {post.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "#475569" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {mins} min read
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-slate-100 mb-3 line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-white"
            style={{ letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {post.description}
          </p>

          {/* Footer */}
          <div
            className="flex items-center justify-between mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: `linear-gradient(135deg, ${accent})` }}
                aria-hidden="true"
              >
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-slate-300 text-xs font-medium leading-none mb-0.5">{post.author}</p>
                <p className="text-slate-600 text-[11px]">{post.date}</p>
              </div>
            </div>

            {/* Read more arrow */}
            <span
              className="flex items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2"
              style={{ color: "#7c3aed" }}
            >
              Read
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#475569",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
