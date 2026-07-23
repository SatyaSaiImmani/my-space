import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_NO } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwriteNO = Playwrite_NO({
  variable: "--font-main-name",
});

export const metadata: Metadata = {
  title: "Sri Satya Sai Immani | AI Engineer",
  description:
    "Portfolio of Sri Satya Sai Immani — AI Engineer building RAG pipelines, agentic systems, and applied ML training workloads, with a background in enterprise workflow automation at Deloitte and generative AI research at Case Western Reserve University.",
  keywords: [
    "Sri Satya Sai Immani",
    "Satya Immani",
    "AI Engineer",
    "Generative AI",
    "RAG",
    "LangChain",
    "Agentic Systems",
    "Python",
    "FastAPI",
    "AWS",
    "ServiceNow",
    "Deloitte",
    "Case Western Reserve University",
    "Machine Learning Engineer Portfolio",
  ],
  authors: [{ name: "Sri Satya Sai Immani" }],
  openGraph: {
    title: "Sri Satya Sai Immani | AI Engineer",
    description:
      "AI Engineer building RAG pipelines, agentic systems, and applied ML — with enterprise workflow automation experience at Deloitte.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sri Satya Sai Immani | AI Engineer",
    description:
      "AI Engineer building RAG pipelines, agentic systems, and applied ML — with enterprise workflow automation experience at Deloitte.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playwriteNO.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
