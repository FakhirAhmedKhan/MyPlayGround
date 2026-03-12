"use client";

import type { BlogContentItem } from "@/lib/types";
import React, { useState } from "react";

interface BlogContentProps {
  content: BlogContentItem[];
}

export default function BlogContent({ content }: BlogContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 text-base leading-relaxed">
      {content.map((item, index) => {
        if (item.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-slate-300 text-lg leading-8 font-light"
            >
              {item.content}
            </p>
          );
        }

        if (item.type === "code") {
          return (
            <div key={index} className="space-y-2">
              {item.title && (
                <div className="text-sm font-semibold text-slate-300 px-4 pt-4">
                  {item.title}
                </div>
              )}
              <div className="relative group rounded-lg overflow-hidden bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                {/* Language badge */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                    {item.language}
                  </span>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => copyToClipboard(item.code, index)}
                  className="absolute top-3 right-24 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded text-sm font-medium"
                  title="Copy code"
                >
                  {copiedIndex === index ? "✓ Copied" : "Copy"}
                </button>

                {/* Code block */}
                <pre className="overflow-x-auto p-4 text-sm">
                  <code
                    className={`font-mono text-slate-300 language-${item.language}`}
                  >
                    {item.code}
                  </code>
                </pre>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
