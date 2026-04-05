import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Perennia AI",
  description:
    "Privacy Policy for Perennia AI. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50" style={{ cursor: "auto" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-900 no-underline"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="text-lg font-semibold">Perennia AI</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Last Updated: April 3, 2026
          </p>

          <div className="text-gray-700 leading-relaxed text-[15px]">
            {/* Intro */}
            <div className="mb-10">
              <p>
                Perennia AI (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your
                privacy and is committed to protecting the personal information
                you share with us. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use the
                Perennia AI platform (&ldquo;Service&rdquo;), visit our website at
                www.perenniaai.com, or interact with us in any other way.
              </p>
            </div>

            {/* 1 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                a. Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  phone number, company name, NMLS number, and password when you
                  register for an account.
                </li>
                <li>
                  <strong>Borrower Data:</strong> Information about your
                  borrowers that you input into the platform, including names,
                  contact information, financial details, loan information, and
                  documents.
                </li>
                <li>
                  <strong>Communications:</strong> Messages, emails, SMS
                  content, call recordings, and other communications sent or
                  received through the platform.
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details processed
                  through our third-party payment processor. We do not store
                  full credit card numbers on our servers.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-gray-800 mt-6 mb-2">
                b. Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Usage Data:</strong> Pages visited, features used,
                  click patterns, session duration, and other interaction data.
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, operating
                  system, device type, IP address, and screen resolution.
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> We use cookies and
                  similar technologies to maintain sessions, remember
                  preferences, and analyze usage patterns.
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Provide, operate, and maintain the Service.
                </li>
                <li>
                  Process transactions and manage your subscription.
                </li>
                <li>
                  Send communications related to your account, including service
                  updates, security alerts, and support messages.
                </li>
                <li>
                  Improve and personalize the Service, including AI features and
                  recommendations.
                </li>
                <li>
                  Analyze usage trends to enhance platform performance and user
                  experience.
                </li>
                <li>
                  Comply with legal obligations and enforce our Terms of
                  Service.
                </li>
                <li>
                  Detect, prevent, and address fraud, security issues, or
                  technical problems.
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With third-party vendors
                  who help us operate the Service (e.g., cloud hosting, email
                  delivery, SMS providers, payment processors). These providers
                  are contractually obligated to protect your data.
                </li>
                <li>
                  <strong>Integrations:</strong> When you connect third-party
                  services (e.g., Microsoft Outlook, loan origination systems),
                  data is shared as necessary to enable the integration.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  regulation, legal process, or governmental request.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets, your information may
                  be transferred to the acquiring entity.
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly
                  authorize the sharing of your information.
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                information, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Encryption of data in transit (TLS/SSL) and at rest.
                </li>
                <li>
                  Role-based access controls and multi-tenant data isolation.
                </li>
                <li>
                  Regular security assessments and monitoring.
                </li>
                <li>
                  Secure authentication with RS256 JSON Web Tokens.
                </li>
              </ul>
              <p className="mt-3">
                While we take reasonable precautions, no method of electronic
                storage or transmission is 100% secure. We cannot guarantee
                absolute security of your data.
              </p>
            </div>

            {/* 5 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Data Retention
              </h2>
              <p>
                We retain your information for as long as your account is active
                or as needed to provide the Service. After account termination,
                we retain data for up to 30 days to allow for data export
                requests. We may retain certain data longer as required by law
                or for legitimate business purposes such as resolving disputes
                and enforcing our agreements.
              </p>
            </div>

            {/* 6 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Your Rights and Choices
              </h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Access</strong> the personal information we hold about
                  you.
                </li>
                <li>
                  <strong>Correct</strong> inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Delete</strong> your personal information, subject to
                  legal and contractual obligations.
                </li>
                <li>
                  <strong>Export</strong> your data in a portable format.
                </li>
                <li>
                  <strong>Opt Out</strong> of marketing communications at any
                  time.
                </li>
                <li>
                  <strong>Withdraw Consent</strong> where processing is based on
                  consent.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:admin@perenniaai.com"
                  className="text-blue-600 hover:underline"
                >
                  admin@perenniaai.com
                </a>
                . We will respond to your request within 30 days.
              </p>
            </div>

            {/* 7 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. SMS and Communication Privacy
              </h2>
              <p>
                When borrowers opt in to receive SMS messages through the
                platform, we collect their phone number and consent status. SMS
                communications are processed through third-party providers
                subject to their own privacy practices.
              </p>
              <p className="mt-3">
                Phone numbers collected for SMS communication will not be shared
                with third parties for marketing purposes. Borrowers may opt out
                of SMS communications at any time by replying STOP. See our{" "}
                <a
                  href="/sms-consent"
                  className="text-blue-600 hover:underline"
                >
                  SMS Consent Policy
                </a>{" "}
                for full details.
              </p>
            </div>

            {/* 8 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. AI and Automated Processing
              </h2>
              <p>
                Our Service uses AI and machine learning to analyze data,
                generate insights, and automate workflows. This processing may
                include analyzing borrower profiles, scoring leads, suggesting
                actions, and generating communications.
              </p>
              <p className="mt-3">
                We do not use borrower data to train general-purpose AI models.
                AI processing is performed solely to provide and improve the
                Service for your account and organization.
              </p>
            </div>

            {/* 9 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. Cookies
              </h2>
              <p>
                We use cookies and similar technologies to operate the Service.
                Essential cookies are required for authentication and basic
                functionality. Analytics cookies help us understand how you use
                the Service. You can manage cookie preferences through your
                browser settings, but disabling essential cookies may impair
                functionality.
              </p>
            </div>

            {/* 10 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                10. Children&apos;s Privacy
              </h2>
              <p>
                The Service is not directed to individuals under the age of 18.
                We do not knowingly collect personal information from children.
                If we become aware that we have collected information from a
                child under 18, we will take steps to delete such information
                promptly.
              </p>
            </div>

            {/* 11 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                11. California Privacy Rights (CCPA)
              </h2>
              <p>
                If you are a California resident, you have additional rights
                under the California Consumer Privacy Act (CCPA), including the
                right to know what personal information we collect, the right to
                delete your information, and the right to opt out of the sale of
                personal information. We do not sell personal information.
              </p>
              <p className="mt-3">
                To exercise your CCPA rights, contact us at{" "}
                <a
                  href="mailto:admin@perenniaai.com"
                  className="text-blue-600 hover:underline"
                >
                  admin@perenniaai.com
                </a>
                .
              </p>
            </div>

            {/* 12 */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of material changes by posting the updated policy on
                our website and updating the &ldquo;Last Updated&rdquo; date. Your continued
                use of the Service after changes are posted constitutes your
                acceptance of the revised policy.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                13. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm space-y-1">
                <p className="font-semibold text-gray-900">Perennia AI</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:admin@perenniaai.com"
                    className="text-blue-600 hover:underline"
                  >
                    admin@perenniaai.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+18433838956"
                    className="text-blue-600 hover:underline"
                  >
                    (843) 383-8956
                  </a>
                </p>
                <p>
                  Web:{" "}
                  <a
                    href="https://www.perenniaai.com/contact"
                    className="text-blue-600 hover:underline"
                  >
                    www.perenniaai.com/contact
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
