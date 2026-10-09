const BLOCKED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "169.254.169.254",
];

export function validateAndNormalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) {
    raw = "http://" + raw;
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Format URL tidak valid");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Hanya protokol HTTP/HTTPS yang diizinkan");
  }

  const host = url.hostname.toLowerCase();

  if (BLOCKED_HOSTS.includes(host)) {
    throw new Error("Host tidak diizinkan");
  }

  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = host.match(ipv4);
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    if (
      a === 10 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a === 127
    ) {
      throw new Error("Alamat IP privat tidak diizinkan");
    }
  }

  return url;
}
