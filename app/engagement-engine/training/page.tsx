import type { Metadata } from "next";
import TrainingGuidePage from "@/components/TrainingGuidePage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Engagement Engine Training Guide — Perennia AI",
  description:
    "Complete training guide for the Perennia AI Omnichannel Engagement Engine. Learn how AI voice calls, SMS, email, live transfers, drip campaigns, and compliance work.",
  openGraph: {
    title: "Engagement Engine Training Guide — Perennia AI",
    description:
      "How the AI engagement engine works — voice, SMS, email, live transfer, drip campaigns, and compliance.",
    url: "https://www.perenniaai.com/engagement-engine/training",
  },
};

export default function Page() {
  return (
    <>
      <TrainingGuidePage />
      <Footer />
    </>
  );
}
