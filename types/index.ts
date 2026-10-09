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

export interface IpInfo {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  timezone: string | null;
}

export interface SubdomainInfo {
  subdomain: string;
  ip: string | null;
  country: string | null;
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
  ipInfo: IpInfo | null;           // ← TAMBAH
  subdomains: SubdomainInfo[];     // ← TAMBAH
}

export interface ApiError {
  error: string;
}
