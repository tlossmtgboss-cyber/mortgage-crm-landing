import type { Metadata } from "next";
import AriaPage from "@/components/AriaPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aria — Your AI Loan Officer Assistant",
  description:
    "Aria is the AI that runs your pipeline. She calls, texts, and emails every lead within 60 seconds, qualifies borrowers in natural conversation, books appointments, and transfers hot prospects live to you. 22 specialized agents. Always on. Always compliant.",
  openGraph: {
    title: "Aria — Your AI Loan Officer Assistant | Perennia AI",
    description:
      "The AI assistant that calls, qualifies, and converts your leads 24/7. Voice, SMS, email — one brain, every channel.",
    url: "https://www.perenniaai.com/aria",
  },
};

export default function Page() {
  return (
    <>
      <AriaPage />
      <Footer />
    </>
  );
}
