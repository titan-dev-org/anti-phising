import { AnalysisResult } from "@/types";
import SignalList from "./SignalList";

const VERDICT_CONFIG = {
  SAFE: {
    label: "SAFE",
    sublabel: "No threats detected",
    icon: "✓",
  },
  SUSPICIOUS: {
    label: "SUSPICIOUS",
    sublabel: "Proceed with caution",
    icon: "!",
  },
  PHISHING: {
    label: "PHISHING",
    sublabel: "Do not enter any data",
    icon: "✕",
  },
} as const;

export default function ResultCard({ result }: { result: AnalysisResult }) {
  const config = VERDICT_CONFIG[result.verdict];
  const isDanger = result.verdict === "PHISHING";
  const isWarn = result.verdict === "SUSPICIOUS";

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Main verdict card */}
      <div
        className={`relative overflow-hidden rounded-2xl border ${
          isDanger
            ? "border-white bg-white text-black"
            : "border-neutral-800 bg-neutral-950"
        }`}
      >
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex items-start gap-4 min-w-0">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 ${
                  isDanger
                    ? "bg-black text-white"
                    : isWarn
                    ? "bg-white text-black"
                    : "border-2 border-white text-white"
                }`}
              >
                {config.icon}
              </div>
              <div className="min-w-0">
                <div
                  className={`text-3xl font-bold tracking-tighter ${
                    isDanger ? "text-black" : "text-white"
                  }`}
                >
                  {config.label}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    isDanger ? "text-neutral-700" : "text-neutral-500"
                  }`}
                >
                  {config.sublabel}
                </div>
                <div
                  className={`text-xs mt-3 font-mono break-all ${
                    isDanger ? "text-neutral-600" : "text-neutral-600"
                  }`}
                >
                  {result.url}
                </div>
              </div>
            </div>

            {/* Risk score */}
            <div className="text-right shrink-0">
              <div
                className={`text-6xl font-bold tracking-tighter leading-none ${
                  isDanger ? "text-black" : "text-white"
                }`}
              >
                {result.riskScore}
              </div>
              <div
                className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${
                  isDanger ? "text-neutral-600" : "text-neutral-500"
                }`}
              >
                Risk Score / 100
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className={`mt-6 h-1 rounded-full overflow-hidden ${
              isDanger ? "bg-neutral-300" : "bg-neutral-900"
            }`}
          >
            <div
              className={`h-full transition-all duration-1000 ${
                isDanger ? "bg-black" : "bg-white"
              }`}
              style={{ width: `${result.riskScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            // AI Analysis
          </h3>
        </div>
        <p className="text-neutral-300 leading-relaxed text-sm">
          {result.aiAnalysis}
        </p>

        <div className="mt-6 pt-6 border-t border-neutral-900">
          <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3">
            // Recommendation
          </h4>
          <p className="text-white text-sm font-medium">
            {result.recommendation}
          </p>
        </div>
      </div>

      {/* Signals */}
      <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            // Detailed Signals
          </h3>
        </div>
        <SignalList signals={result.signals} />
      </div>
    </div>
  );
                    }
