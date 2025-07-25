import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LuminaX-Alt | Intelligent Document Query System",
  description:
    "AI-powered document analysis and query system for insurance, legal, HR, and compliance domains. In collaboration with Bajaj Finserv.",
  keywords: "AI, document analysis, insurance, legal, HR, compliance, semantic search, LLM",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
