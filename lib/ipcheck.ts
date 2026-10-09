import axios from "axios";
import { IpInfo } from "@/types";

// ipwho.is - free, no API key, 10k req/month
export async function checkIp(hostname: string): Promise<IpInfo | null> {
  try {
    // Resolve hostname ke IP dulu (kalau input berupa domain)
    // Kalau udah IP, langsung query
    const res = await axios.get(
      `https://ipwho.is/${encodeURIComponent(hostname)}`,
      { timeout: 6000 }
    );

    if (!res.data || res.data.success === false) return null;

    const d = res.data;
    return {
      ip: d.ip || null,
      city: d.city || null,
      region: d.region || null,
      country: d.country || null,
      isp: d.connection?.isp || null,
      org: d.connection?.org || null,
      asn: d.connection?.asn ? `AS${d.connection.asn}` : null,
      timezone: d.timezone?.id || null,
    };
  } catch {
    return null;
  }
  }
