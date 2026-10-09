import { IpInfo } from "@/types";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-neutral-900 last:border-0">
      <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">
        {label}
      </span>
      <span className="text-neutral-300 text-xs font-mono truncate max-w-[60%] text-right">
        {value}
      </span>
    </div>
  );
}

export default function IpInfoCard({ ipInfo }: { ipInfo: IpInfo }) {
  return (
    <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
        <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          // IP Information
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
        <div>
          <Row label="IP Address" value={ipInfo.ip || "—"} />
          <Row label="ISP" value={ipInfo.isp || "—"} />
          <Row label="Organization" value={ipInfo.org || "—"} />
          <Row label="ASN" value={ipInfo.asn || "—"} />
        </div>
        <div>
          <Row label="Country" value={ipInfo.country || "—"} />
          <Row label="Region" value={ipInfo.region || "—"} />
          <Row label="City" value={ipInfo.city || "—"} />
          <Row label="Timezone" value={ipInfo.timezone || "—"} />
        </div>
      </div>
    </div>
  );
      }
