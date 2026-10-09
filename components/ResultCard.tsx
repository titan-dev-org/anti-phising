import { AnalysisResult } from "@/types";
import SignalList from "./SignalList";

const VERDICT_STYLES = {
  SAFE: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
    bar: "bg-green-500",
    label: "✅ AMAN",
  },
  SUSPICIOUS: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    bar: "bg-yellow-500",
    label: "⚠️ MENCURIGAKAN",
  },
  PHISHING: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    bar: "bg-red-500",
    label: "🚨 PHISHING",
  },
} as const;

export default function ResultCard({ result }: { result: AnalysisResult }) {
  const style = VERDICT_STYLES[result.verdict];

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-xl border ${style.bg} ${style.border}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className={`text-2xl font-bold ${style.text}`}>
              {style.label}
            </div>
            <div className="text-slate-400 text-sm mt-1 break-all">
              {result.url}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-4xl font-bold ${style.text}`}>
              {result.riskScore}
            </div>
            <div className="text-slate-400 text-xs uppercase tracking-wider">
              Risk Score
            </div>
          </div>
        </div>

        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${style.bar}`}
            style={{ width: `${result.riskScore}%` }}
          />
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
        <h3 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">
          🤖 Analisis AI
        </h3>
        <p className="text-slate-300 leading-relaxed">{result.aiAnalysis}</p>
        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <h4 className="text-sm font-semibold text-blue-400 mb-1">
            💡 Rekomendasi
          </h4>
          <p className="text-slate-300 text-sm">{result.recommendation}</p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
          📊 Detail Sinyal
        </h3>
        <SignalList signals={result.signals} />
      </div>
    </div>
  );
}
