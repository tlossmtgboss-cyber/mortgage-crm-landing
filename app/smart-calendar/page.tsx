import type { Metadata } from "next";
import SmartCalendarPage from "@/components/SmartCalendarPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Calendar — Perennia AI",
  description:
    "AI-powered scheduling that syncs with Outlook, books borrowers automatically, sends reminders across SMS, email, and voice — and optimizes your calendar so you never miss a meeting.",
  openGraph: {
    title: "Smart Calendar — Perennia AI",
    description:
      "Intelligent appointment scheduling with two-way Outlook sync, AI optimization, no-show analysis, and multi-channel reminders.",
    url: "https://www.perenniaai.com/smart-calendar",
  },
};

export default function Page() {
  return (
    <>
      <SmartCalendarPage />
      <Footer />
    </>
  );
}
