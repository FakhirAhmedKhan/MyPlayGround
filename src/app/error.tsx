"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div
          className="text-6xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg, #f43f5e, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Oops
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-3">
          Something went wrong
        </h2>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto text-sm">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <button onClick={reset} className="btn-primary inline-flex">
          Try again
        </button>
      </div>
    </div>
  );
}
