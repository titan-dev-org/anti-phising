export interface AnalysisSignals {
  sslValid: boolean;
  domainAgeDays: number | null;
  virustotalDetections: number | null;
  virustotalTotal: number | null;
  hasLoginForm: boolean;
  hasPasswordField: boolean;
  externalScripts: number;
  suspiciousKeywords: string[];
  urlLength: number;
  hasIpAddress: boolean;
  hasAtSymbol: boolean;
  subdomainCount: number;
  usesHttps: boolean;
  redirectCount: number;
  title: string | null;
  finalUrl: string;
}

export type Verdict = "SAFE" | "SUSPICIOUS" | "PHISHING";

export interface AnalysisResult {
  url: string;
  verdict: Verdict;
  riskScore: number;
  signals: AnalysisSignals;
  aiAnalysis: string;
  recommendation: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
  }
