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
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://contoh-website.com"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          {loading ? "Menganalisis..." : "Analisis URL"}
        </button>
      </div>
      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}
    </form>
  );
}
