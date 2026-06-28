import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLIQ Code — High-Performance AI CLI Agent Engine",
  description: "A model-agnostic AI coding assistant with a lightning-fast 17-module C++ engine and a Python-powered LLM brain. Run any LLM (Gemini, OpenAI, Anthropic, Ollama) right in your terminal with advanced permission sandsboxing.",
  keywords: ["AI Agent", "CLI", "C++", "Python", "Developer Tool", "Coding Assistant", "LiteLLM", "pybind11"],
  authors: [{ name: "Fliq Odd Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#F3F4F6]">{children}</body>
    </html>
  );
}
