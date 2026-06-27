import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div
          className="text-8xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-3">
          Page not found
        </h1>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
