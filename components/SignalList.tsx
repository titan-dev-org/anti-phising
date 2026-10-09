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
    <div className="flex justify-between py-2 border-b border-slate-800 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span
        className={`text-sm font-medium ${
          danger ? "text-red-400" : "text-slate-200"
        }`}
      >
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
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Sinyal Teknis
        </h4>
        <Row
          label="SSL Valid"
          value={signals.sslValid ? "Ya" : "Tidak"}
          danger={!signals.sslValid}
        />
        <Row
          label="HTTPS"
          value={signals.usesHttps ? "Ya" : "Tidak"}
          danger={!signals.usesHttps}
        />
        <Row
          label="Panjang URL"
          value={`${signals.urlLength} karakter`}
          danger={signals.urlLength > 75}
        />
        <Row
          label="Jumlah Subdomain"
          value={String(signals.subdomainCount)}
          danger={signals.subdomainCount > 2}
        />
        <Row
          label="Redirect"
          value={String(signals.redirectCount)}
          danger={signals.redirectCount > 2}
        />
        <Row
          label="IP Langsung"
          value={signals.hasIpAddress ? "Ya" : "Tidak"}
          danger={signals.hasIpAddress}
        />
        <Row
          label="Simbol @"
          value={signals.hasAtSymbol ? "Ada" : "Tidak"}
          danger={signals.hasAtSymbol}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Konten & Threat Intel
        </h4>
        <Row
          label="Form Login"
          value={signals.hasLoginForm ? "Terdeteksi" : "Tidak"}
          danger={signals.hasLoginForm}
        />
        <Row
          label="Field Password"
          value={signals.hasPasswordField ? "Ada" : "Tidak"}
          danger={signals.hasPasswordField}
        />
        <Row
          label="Script Eksternal"
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
        <Row label="Title" value={signals.title?.slice(0, 40) || "-"} />
      </div>
      {signals.suspiciousKeywords.length > 0 && (
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Keyword Mencurigakan
          </h4>
          <div className="flex flex-wrap gap-2">
            {signals.suspiciousKeywords.map((kw) => (
              <span
                key={kw}
                className="px-2 py-1 text-xs rounded-md bg-red-500/10 border border-red-500/30 text-red-400"
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
