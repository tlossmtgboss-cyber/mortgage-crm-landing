import type { Metadata } from "next";
import EngagementEnginePage from "@/components/EngagementEnginePage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Engagement Engine — Perennia AI",
  description:
    "The most intelligent omnichannel lead engagement system in mortgage. AI voice calls, SMS, email, live transfers, and 12-month drip campaigns — all from one platform.",
  openGraph: {
    title: "AI Engagement Engine — Perennia AI",
    description:
      "AI-powered voice, SMS, email, and live transfer — 60-second speed-to-lead for loan officers.",
    url: "https://www.perenniaai.com/engagement-engine",
  },
};

export default function Page() {
  return (
    <>
      <EngagementEnginePage />
      <Footer />
    </>
  );
}
