import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PROMPTFORGE AI – ChatGPT Master Prompt Generator",
  description:
    "Transform simple ideas into professional, detailed, and intelligent ChatGPT Master Prompts powered by Gemini AI.",
  keywords: [
    "ChatGPT Master Prompt Generator",
    "AI Prompt Engineering",
    "PromptForge AI",
    "Gemini AI",
    "Prompt Builder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans min-h-screen overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
