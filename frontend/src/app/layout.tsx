import type { Metadata } from "next";
import { Geist_Mono, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Portfolio Auditor // TERMINAL_V1.0",
  description: "Evaluate your GitHub repositories and analyze code stability, issue metrics, and overall portfolio sanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark selection:bg-neon-magenta selection:text-white",
        geistMono.variable,
        shareTechMono.variable
      )}
    >
      <body className="min-h-full bg-cyber-bg text-foreground font-mono flex flex-col antialiased crt-scanlines">
        {/* CRT Scanline and Flicker Overlays */}
        <div className="crt-overlay" />
        <div className="flex-1 flex flex-col relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
