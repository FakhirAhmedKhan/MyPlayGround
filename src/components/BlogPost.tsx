"use client";

import type { BlogPost } from "@/lib/types";
import BlogContent from "./BlogContent";

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPostComponent({ post }: BlogPostProps) {
  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
          <span className="text-slate-400 text-sm">{post.date}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-slate-300 leading-8">
          {post.description}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">{post.author}</p>
            <p className="text-xs text-slate-400">Author</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-slate-800 mb-12" />

      {/* Blog Content */}
      <BlogContent content={post.content} />

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <>
          <div className="border-b border-slate-800 my-12" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
