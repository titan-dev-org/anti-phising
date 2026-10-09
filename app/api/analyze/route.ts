import { NextRequest, NextResponse } from "next/server";
import { validateAndNormalizeUrl } from "@/lib/validator";
import { scrapeUrl } from "@/lib/scraper";
import { checkVirusTotal } from "@/lib/virustotal";
import { checkIp } from "@/lib/ipcheck";
import { findSubdomains } from "@/lib/subdomains";
import { analyzeWithGemini } from "@/lib/gemini";
import { AnalysisResult, AnalysisSignals } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const input = body?.url;

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "URL wajib diisi" },
        { status: 400 }
      );
    }

    const url = validateAndNormalizeUrl(input).toString();
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // Jalankan semua paralel
    const [scraped, vt, ipInfo, subdomains] = await Promise.all([
      scrapeUrl(url),
      checkVirusTotal(url),
      checkIp(hostname),
      findSubdomains(hostname),
    ]);

    const signals: AnalysisSignals = {
      sslValid: scraped.sslValid ?? false,
      domainAgeDays: scraped.domainAgeDays ?? null,
      virustotalDetections: vt?.detections ?? null,
      virustotalTotal: vt?.total ?? null,
      hasLoginForm: scraped.hasLoginForm ?? false,
      hasPasswordField: scraped.hasPasswordField ?? false,
      externalScripts: scraped.externalScripts ?? 0,
      suspiciousKeywords: scraped.suspiciousKeywords ?? [],
      urlLength: scraped.urlLength ?? url.length,
      hasIpAddress: scraped.hasIpAddress ?? false,
      hasAtSymbol: scraped.hasAtSymbol ?? false,
      subdomainCount: scraped.subdomainCount ?? 0,
      usesHttps: scraped.usesHttps ?? false,
      redirectCount: scraped.redirectCount ?? 0,
      title: scraped.title ?? null,
      finalUrl: scraped.finalUrl ?? url,
    };

    const ai = await analyzeWithGemini(url, signals);

    const result: AnalysisResult = {
      url,
      verdict: ai.verdict,
      riskScore: ai.riskScore,
      signals,
      aiAnalysis: ai.aiAnalysis,
      recommendation: ai.recommendation,
      timestamp: new Date().toISOString(),
      ipInfo,
      subdomains,
    };

    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal menganalisis URL";
    console.error("Analyze error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
      }
