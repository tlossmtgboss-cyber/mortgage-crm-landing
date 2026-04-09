import type { Metadata } from "next";
import SmartDocsPage from "@/components/SmartDocsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Docs — Perennia AI",
  description:
    "AI document intelligence that classifies 20+ mortgage document types in seconds, extracts data with OCR, calculates income across 14 types, and monitors freshness — so nothing expires and nothing gets missed.",
  openGraph: {
    title: "Smart Docs — Perennia AI",
    description:
      "Automated document classification, OCR extraction, income calculation, screenshot detection, and compliance tracking for mortgage teams.",
    url: "https://www.perenniaai.com/smart-docs",
  },
};

export default function Page() {
  return (
    <>
      <SmartDocsPage />
      <Footer />
    </>
  );
}
