import type { Metadata } from "next";
import SMSOptInForm from "@/components/SMSOptInForm";

export const metadata: Metadata = {
  title: "SMS Opt-In — Perennia AI",
  description:
    "Opt in to receive SMS updates from your loan officer powered by Perennia AI. Standard messaging rates apply.",
};

export default function SMSConsentPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-gray-900 no-underline">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="text-lg font-semibold">Perennia AI</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SMS Communication Opt-In
          </h1>
          <p className="text-gray-600 mb-8">
            Stay connected with your loan officer. Receive timely updates about
            your mortgage application, rate changes, document requests, and
            important milestones — directly to your phone.
          </p>

          <SMSOptInForm />

          {/* Additional Disclosures */}
          <div className="mt-10 pt-8 border-t border-gray-200 space-y-4 text-sm text-gray-500">
            <h3 className="text-base font-semibold text-gray-700">
              About Our SMS Program
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Program Name:</strong> Perennia AI Mortgage Updates
              </li>
              <li>
                <strong>Message Frequency:</strong> Message frequency varies.
                You may receive up to 10 messages per month related to your
                mortgage application status, document requests, rate alerts, and
                appointment reminders.
              </li>
              <li>
                <strong>Message &amp; Data Rates:</strong> Message and data
                rates may apply. Check with your wireless carrier for details
                about your messaging plan.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt out at any time by
                replying <strong>STOP</strong> to any message. You will receive
                a one-time confirmation that you have been unsubscribed.
              </li>
              <li>
                <strong>Help:</strong> Reply <strong>HELP</strong> for
                assistance or contact us at{" "}
                <a
                  href="mailto:support@perenniaai.com"
                  className="text-blue-600 underline"
                >
                  support@perenniaai.com
                </a>{" "}
                or call{" "}
                <a href="tel:+18433838956" className="text-blue-600 underline">
                  (843) 383-8956
                </a>
                .
              </li>
              <li>
                <strong>Carriers Supported:</strong> Compatible with all major
                US carriers including AT&amp;T, T-Mobile, Verizon, and others.
              </li>
              <li>
                <strong>Privacy:</strong> Your phone number will not be shared
                with third parties for marketing purposes. See our{" "}
                <a href="/privacy" className="text-blue-600 underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="text-blue-600 underline">
                  Terms of Service
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Perennia AI. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            <a
              href="mailto:support@perenniaai.com"
              className="text-blue-600 hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
