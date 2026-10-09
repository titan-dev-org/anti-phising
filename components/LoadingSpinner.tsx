export default function LoadingSpinner() {
  return (
    <div className="animate-fade-in-up">
      <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin" />
          </div>
          <div>
            <div className="text-sm font-mono text-white">ANALYZING...</div>
            <div className="text-xs font-mono text-neutral-500 mt-0.5">
              Fetching URL, checking threats, running AI
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 rounded shimmer"
              style={{ width: `${100 - i * 15}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
