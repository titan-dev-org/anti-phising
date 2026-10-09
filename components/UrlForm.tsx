"use client";

import { useState } from "react";
import { AnalysisResult, ApiError } from "@/types";

interface UrlFormProps {
  onResult: (r: AnalysisResult | null) => void;
  onLoading: (loading: boolean) => void;
}

export default function UrlForm({ onResult, onLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    onLoading(true);
    setError(null);
    onResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = (await res.json()) as AnalysisResult | ApiError;

      if (!res.ok) {
        setError((data as ApiError).error || "Terjadi kesalahan");
      } else {
        onResult(data as AnalysisResult);
      }
    } catch {
      setError("Gagal menghubungi server");
    } finally {
      setLoading(false);
      onLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        {/* Glow effect saat focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />

        <div className="relative flex flex-col sm:flex-row gap-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-2xl">
          <div className="flex-1 flex items-center gap-3 px-4">
            <svg
              className="w-4 h-4 text-neutral-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="paste url here..."
              disabled={loading}
              className="flex-1 py-3 bg-transparent text-white placeholder-neutral-600 focus:outline-none disabled:opacity-50 font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                Analyze
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800 animate-fade-in-up">
          <svg
            className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-neutral-400 font-mono">{error}</span>
        </div>
      )}
    </form>
  );
        }
