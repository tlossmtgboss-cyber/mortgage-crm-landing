import type { Metadata } from "next";
import CallIntelligencePage from "@/components/CallIntelligencePage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Call Intelligence — Perennia AI",
  description:
    "Every borrower call automatically transcribed, analyzed, and scored. AI extracts income, flags risk, drafts follow-ups, and scores compliance — in real time.",
  openGraph: {
    title: "Call Intelligence — Perennia AI",
    description:
      "AI-powered call analysis that turns every borrower conversation into structured data, compliance scores, and actionable next steps.",
    url: "https://www.perenniaai.com/call-intelligence",
  },
};

export default function Page() {
  return (
    <>
      <CallIntelligencePage />
      <Footer />
    </>
  );
}
