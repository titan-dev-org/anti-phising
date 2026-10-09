import axios from "axios";
import { SubdomainInfo } from "@/types";

// crt.sh - Certificate Transparency logs (gratis, no API key)
export async function findSubdomains(
  domain: string
): Promise<SubdomainInfo[]> {
  try {
    const res = await axios.get(
      `https://crt.sh/?q=%25.${encodeURIComponent(domain)}&output=json`,
      { timeout: 10000 }
    );

    if (!Array.isArray(res.data)) return [];

    // Extract unique subdomains dari name_value
    const seen = new Set<string>();
    const subdomains: SubdomainInfo[] = [];

    for (const entry of res.data) {
      if (!entry.name_value) continue;

      // name_value bisa multi-line, pisahin
      const names = String(entry.name_value).split("\n");
      for (const name of names) {
        const clean = name.trim().toLowerCase();
        if (!clean) continue;
        // Skip wildcard & root domain
        if (clean.startsWith("*.")) continue;
        if (clean === domain) continue;
        if (!clean.endsWith(domain)) continue;
        if (seen.has(clean)) continue;
        seen.add(clean);

        // Limit biar gak kebanyakan
        if (subdomains.length >= 50) break;

        subdomains.push({
          subdomain: clean,
          ip: null, // bisa di-resolve nanti kalau perlu
          country: null,
        });
      }
      if (subdomains.length >= 50) break;
    }

    return subdomains.sort((a, b) =>
      a.subdomain.localeCompare(b.subdomain)
    );
  } catch {
    return [];
  }
}
