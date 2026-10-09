import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisSignals, Verdict } from "@/types";

export interface GeminiVerdict {
  verdict: Verdict;
  riskScore: number;
  aiAnalysis: string;
  recommendation: string;
}

export async function analyzeWithGemini(
  url: string,
  signals: AnalysisSignals
): Promise<GeminiVerdict> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diset");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `Kamu adalah security analyst ahli dalam mendeteksi phishing & malware.

Analisis data berikut untuk URL: ${url}

SIGNALS:
- SSL Valid: ${signals.sslValid}
- Menggunakan HTTPS: ${signals.usesHttps}
- Panjang URL: ${signals.urlLength}
- IP langsung: ${signals.hasIpAddress}
- Ada simbol @: ${signals.hasAtSymbol}
- Jumlah subdomain: ${signals.subdomainCount}
- Redirect count: ${signals.redirectCount}
- Form login terdeteksi: ${signals.hasLoginForm}
- Ada field password: ${signals.hasPasswordField}
- Script eksternal: ${signals.externalScripts}
- Keyword mencurigakan: ${signals.suspiciousKeywords.join(", ") || "tidak ada"}
- Title halaman: ${signals.title || "tidak ada"}
- VirusTotal detections: ${signals.virustotalDetections ?? "N/A"} / ${signals.virustotalTotal ?? "N/A"}
- Domain age (hari): ${signals.domainAgeDays ?? "tidak diketahui"}
- URL final: ${signals.finalUrl}

ATURAN:
- riskScore 0-100 (0=aman banget, 100=pasti phishing)
- verdict: "SAFE" (0-29), "SUSPICIOUS" (30-69), "PHISHING" (70-100)
- aiAnalysis: penjelasan teknis 2-4 kalimat dalam Bahasa Indonesia
- recommendation: saran singkat untuk user dalam Bahasa Indonesia

WAJIB balas HANYA JSON valid tanpa markdown, format:
{
  "verdict": "SAFE" | "SUSPICIOUS" | "PHISHING",
  "riskScore": number,
  "aiAnalysis": "string",
  "recommendation": "string"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);

    const validVerdicts: Verdict[] = ["SAFE", "SUSPICIOUS", "PHISHING"];
    const verdict: Verdict = validVerdicts.includes(parsed.verdict)
      ? parsed.verdict
      : "SUSPICIOUS";

    return {
      verdict,
      riskScore: Math.max(0, Math.min(100, Number(parsed.riskScore) || 50)),
      aiAnalysis:
        typeof parsed.aiAnalysis === "string"
          ? parsed.aiAnalysis
          : "Tidak ada analisis dari AI.",
      recommendation:
        typeof parsed.recommendation === "string"
          ? parsed.recommendation
          : "Hati-hati dan jangan masukkan data pribadi.",
    };
  } catch {
    return {
      verdict: "SUSPICIOUS",
      riskScore: 50,
      aiAnalysis: "AI gagal memparse hasil. Analisis manual disarankan.",
      recommendation: "Hati-hati dan jangan masukkan data pribadi.",
    };
  }
}
