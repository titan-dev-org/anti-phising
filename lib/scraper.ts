import axios from "axios";
import * as cheerio from "cheerio";
import { AnalysisSignals } from "@/types";

const SUSPICIOUS_KEYWORDS = [
  "verify your account",
  "confirm your identity",
  "update your payment",
  "suspended",
  "unusual activity",
  "click here immediately",
  "your account will be closed",
  "login to continue",
  "verify password",
  "bank account",
  "credit card",
];

const TIMEOUT_MS = 8000;

export async function scrapeUrl(
  urlStr: string
): Promise<Partial<AnalysisSignals>> {
  const parsed = new URL(urlStr);

  const signals: Partial<AnalysisSignals> = {
    urlLength: urlStr.length,
    hasIpAddress: /^(\d{1,3}\.){3}\d{1,3}$/.test(parsed.hostname),
    hasAtSymbol: urlStr.includes("@"),
    subdomainCount: Math.max(0, parsed.hostname.split(".").length - 2),
    usesHttps: parsed.protocol === "https:",
    redirectCount: 0,
    hasLoginForm: false,
    hasPasswordField: false,
    externalScripts: 0,
    suspiciousKeywords: [],
    title: null,
    finalUrl: urlStr,
    sslValid: parsed.protocol === "https:",
    domainAgeDays: null,
    virustotalDetections: null,
    virustotalTotal: null,
  };

  try {
    const res = await axios.get(urlStr, {
      timeout: TIMEOUT_MS,
      maxRedirects: 5,
      validateStatus: () => true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; URLSecurityBot/1.0; +https://example.com/bot)",
        Accept: "text/html,application/xhtml+xml",
      },
      responseType: "text",
    });

    // Deteksi redirect count dari history
    const requestAny = res.request as any;
    if (requestAny?._redirectable?._redirectCount !== undefined) {
      signals.redirectCount = requestAny._redirectable._redirectCount;
    } else if (requestAny?.res?.responseUrl) {
      signals.finalUrl = requestAny.res.responseUrl;
      if (requestAny.res.responseUrl !== urlStr) {
        signals.redirectCount = 1;
      }
    }

    const html = typeof res.data === "string" ? res.data : "";
    const $ = cheerio.load(html);

    signals.title = $("title").first().text().trim() || null;

    // Deteksi form login
    $("form").each((_, el) => {
      const $form = $(el);
      if ($form.find('input[type="password"]').length > 0) {
        signals.hasLoginForm = true;
        signals.hasPasswordField = true;
      }
      if (
        $form.find(
          'input[type="email"], input[name*="user"], input[name*="login"], input[name*="email"]'
        ).length > 0
      ) {
        signals.hasLoginForm = true;
      }
    });

    // Deteksi script eksternal
    const host = parsed.hostname;
    let ext = 0;
    $("script[src]").each((_, el) => {
      const src = $(el).attr("src") || "";
      try {
        const u = new URL(src, urlStr);
        if (u.hostname !== host) ext++;
      } catch {
        // ignore invalid src
      }
    });
    signals.externalScripts = ext;

    // Deteksi keyword mencurigakan
    const text = $("body").text().toLowerCase().slice(0, 20000);
    signals.suspiciousKeywords = SUSPICIOUS_KEYWORDS.filter((kw) =>
      text.includes(kw)
    );
  } catch {
    signals.suspiciousKeywords = ["fetch_failed"];
  }

  return signals;
  }
