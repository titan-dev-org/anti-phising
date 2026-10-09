import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel — URL Security Analyzer",
  description:
    "Analisis keamanan URL realtime dengan AI. Deteksi phishing, malware, dan ancaman lainnya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased noise">{children}</body>
    </html>
  );
}
