"use client";

import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AnalysisResult } from "@/types";

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium mb-4">
            🛡️ Powered by Gemini AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            URL Security Analyzer
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Cek apakah sebuah URL aman, mencurigakan, atau phishing dengan
            analisis AI realtime.
          </p>
        </header>

        <div className="mb-8">
          <UrlForm onResult={setResult} onLoading={setLoading} />
        </div>

        {loading && <LoadingSpinner />}
        {!loading && result && <ResultCard result={result} />}

        <footer className="mt-16 text-center text-xs text-slate-600">
          ⚠️ Hasil analisis bukan jaminan 100%. Selalu berhati-hati dengan data
          pribadi.
        </footer>
      </div>
    </main>
  );
}
