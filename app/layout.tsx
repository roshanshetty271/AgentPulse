import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agentpulse.ai'),
  title: {
    default: "AgentPulse | Enterprise AI Agent Analytics",
    template: "%s | AgentPulse"
  },
  description: "Real-time analytics, monitoring, and performance telemetry dashboard for your enterprise AI agents and LLM workforce.",
  keywords: ["AI Agents", "Analytics", "LLM Monitoring", "Agent Analytics", "Dashboard", "Telemetry"],
  authors: [{ name: "AgentPulse Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentpulse.ai",
    title: "AgentPulse | Enterprise AI Agent Analytics",
    description: "Real-time analytics, monitoring, and performance telemetry dashboard for your enterprise AI agents and LLM workforce.",
    siteName: "AgentPulse"
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentPulse | Enterprise AI Agent Analytics",
    description: "Real-time analytics, monitoring, and performance telemetry dashboard for your enterprise AI agents and LLM workforce.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg-base text-text-primary antialiased selection:bg-accent-blue/20 selection:text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
