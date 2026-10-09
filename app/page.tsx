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
    <main className="min-h-screen bg-black text-white relative grid-bg">
      {/* Top nav */}
      <nav className="relative z-10 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-semibold tracking-tight">SENTINEL</span>
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            v1.0 / AI-POWERED
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">
        {/* Hero */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            REALTIME ANALYSIS
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 leading-none">
            Is this URL
            <br />
            <span className="text-neutral-500">safe to visit?</span>
          </h1>

          <p className="text-neutral-400 max-w-md mx-auto text-base leading-relaxed">
            Analisis realtime dengan AI untuk mendeteksi phishing, malware, dan
            ancaman siber — dalam hitungan detik.
          </p>
        </header>

        {/* Form */}
        <div className="mb-12">
          <UrlForm onResult={setResult} onLoading={setLoading} />
        </div>

        {/* Result */}
        <div className="space-y-8">
          {loading && <LoadingSpinner />}
          {!loading && result && <ResultCard result={result} />}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-900 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600 font-mono">
          <span>
            ⚠ Hasil analisis bukan jaminan 100% — selalu berhati-hati
          </span>
          <span>BUILT WITH GEMINI AI</span>
        </div>
      </footer>
    </main>
  );
              }
