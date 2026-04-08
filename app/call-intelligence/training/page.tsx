import type { Metadata } from "next";
import CallIntelligenceTraining from "@/components/CallIntelligenceTraining";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Call Intelligence Training — Perennia AI",
  description:
    "Learn how Perennia AI's Call Intelligence works — from transcription to extraction to compliance scoring. Complete training guide for loan officers.",
  openGraph: {
    title: "Call Intelligence Training — Perennia AI",
    description:
      "Complete training guide: how AI analyzes every borrower call in your pipeline.",
    url: "https://www.perenniaai.com/call-intelligence/training",
  },
};

export default function Page() {
  return (
    <>
      <CallIntelligenceTraining />
      <Footer />
    </>
  );
}
