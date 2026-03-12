"use client";

import type { BlogPost } from "@/lib/types";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article
        className="group glass-card-hover flex flex-col h-full p-6 rounded-xl cursor-pointer"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold rounded-full group-hover:border-purple-500/50 transition-colors">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-xs">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-slate-400">{post.author}</span>
          </div>
          <span className="text-xs text-slate-500">{post.date}</span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-700/30">
            {post.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs text-slate-500 px-2 py-0.5 bg-slate-800/30 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
