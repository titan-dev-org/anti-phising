import { AnalysisSignals } from "@/types";

function Row({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-neutral-900 last:border-0">
      <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-xs font-mono ${
          danger ? "text-white font-semibold" : "text-neutral-400"
        }`}
      >
        {danger && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 align-middle" />
        )}
        {value}
      </span>
    </div>
  );
}

export default function SignalList({
  signals,
}: {
  signals: AnalysisSignals;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
      <div>
        <h4 className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-3">
          // Technical Signals
        </h4>
        <Row
          label="SSL Valid"
          value={signals.sslValid ? "YES" : "NO"}
          danger={!signals.sslValid}
        />
        <Row
          label="HTTPS"
          value={signals.usesHttps ? "YES" : "NO"}
          danger={!signals.usesHttps}
        />
        <Row
          label="URL Length"
          value={`${signals.urlLength} chars`}
          danger={signals.urlLength > 75}
        />
        <Row
          label="Subdomains"
          value={String(signals.subdomainCount)}
          danger={signals.subdomainCount > 2}
        />
        <Row
          label="Redirects"
          value={String(signals.redirectCount)}
          danger={signals.redirectCount > 2}
        />
        <Row
          label="IP Address"
          value={signals.hasIpAddress ? "YES" : "NO"}
          danger={signals.hasIpAddress}
        />
        <Row
          label="Symbol @"
          value={signals.hasAtSymbol ? "FOUND" : "NO"}
          danger={signals.hasAtSymbol}
        />
      </div>

      <div>
        <h4 className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-3">
          // Content & Intel
        </h4>
        <Row
          label="Login Form"
          value={signals.hasLoginForm ? "DETECTED" : "NO"}
          danger={signals.hasLoginForm}
        />
        <Row
          label="Password Field"
          value={signals.hasPasswordField ? "YES" : "NO"}
          danger={signals.hasPasswordField}
        />
        <Row
          label="External Scripts"
          value={String(signals.externalScripts)}
          danger={signals.externalScripts > 5}
        />
        <Row
          label="VirusTotal"
          value={
            signals.virustotalTotal
              ? `${signals.virustotalDetections}/${signals.virustotalTotal}`
              : "N/A"
          }
          danger={(signals.virustotalDetections ?? 0) > 0}
        />
        <Row label="Page Title" value={signals.title?.slice(0, 30) || "—"} />
      </div>

      {signals.suspiciousKeywords.length > 0 && (
        <div className="md:col-span-2">
          <h4 className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-3">
            // Suspicious Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {signals.suspiciousKeywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white text-black font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
        }
