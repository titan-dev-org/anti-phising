import axios from "axios";

export async function checkVirusTotal(
  url: string
): Promise<{ detections: number; total: number } | null> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey || apiKey.trim() === "") return null;

  try {
    const submit = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url }).toString(),
      {
        headers: {
          "x-apikey": apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 8000,
      }
    );

    const analysisId = submit.data?.data?.id;
    if (!analysisId) return null;

    // Tunggu VT selesai scan
    await new Promise((r) => setTimeout(r, 2500));

    const report = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: { "x-apikey": apiKey },
        timeout: 8000,
      }
    );

    const stats = report.data?.data?.attributes?.stats || {};
    const malicious = (stats.malicious || 0) + (stats.suspicious || 0);
    const total = Object.values(stats).reduce(
      (acc: number, val) => acc + (val as number),
      0
    );

    return { detections: malicious, total };
  } catch {
    return null;
  }
          }
