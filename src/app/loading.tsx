export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "#a78bfa",
            borderRightColor: "#60a5fa",
          }}
        />
        <span className="text-slate-500 text-sm">Loading…</span>
      </div>
    </div>
  );
}
