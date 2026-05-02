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
  title: "Sri Satya Sai Immani | Full-Stack Software Engineer",
  description:
    "Portfolio of Sri Satya Sai Immani — Full-Stack Software Engineer specializing in Java, Spring Boot, Python, FastAPI, microservices, and cloud-native architecture. Previously at Deloitte and Case Western Reserve University.",
  keywords: [
    "Sri Satya Sai Immani",
    "Satya Immani",
    "Full-Stack Software Engineer",
    "Java Engineer",
    "Spring Boot",
    "Python",
    "FastAPI",
    "Microservices",
    "Deloitte",
    "Case Western Reserve University",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Sri Satya Sai Immani" }],
  openGraph: {
    title: "Sri Satya Sai Immani | Full-Stack Software Engineer",
    description:
      "Backend-first Full-Stack Engineer building scalable systems with Java, Spring Boot, Python, and FastAPI.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sri Satya Sai Immani | Full-Stack Software Engineer",
    description:
      "Backend-first Full-Stack Engineer building scalable systems with Java, Spring Boot, Python, and FastAPI.",
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
