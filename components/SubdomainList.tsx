import { SubdomainInfo } from "@/types";

export default function SubdomainList({
  subdomains,
  domain,
}: {
  subdomains: SubdomainInfo[];
  domain: string;
}) {
  return (
    <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            // Subdomains ({subdomains.length})
          </h3>
        </div>
        <div className="text-[10px] font-mono text-neutral-600">
          via crt.sh
        </div>
      </div>

      {subdomains.length === 0 ? (
        <div className="text-xs font-mono text-neutral-600 text-center py-6">
          Tidak ada subdomain ditemukan
        </div>
      ) : (
        <div className="space-y-1 max-h-80 overflow-y-auto pr-2">
          {subdomains.map((sub, i) => (
            <div
              key={sub.subdomain}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-neutral-900 transition-colors group"
            >
              <span className="text-[10px] font-mono text-neutral-700 w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-1 h-1 rounded-full bg-neutral-700 group-hover:bg-white transition-colors shrink-0" />
              <span className="text-xs font-mono text-neutral-400 group-hover:text-white transition-colors truncate">
                {sub.subdomain}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-[10px] font-mono text-neutral-700">
        Menampilkan maks {Math.min(subdomains.length, 50)} subdomain dari Certificate Transparency logs
      </div>
    </div>
  );
}
