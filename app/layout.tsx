import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Security Analyzer",
  description:
    "Cek keamanan URL dengan AI - deteksi phishing realtime dengan Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
