import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Perennia AI",
  description:
    "Terms of Service for Perennia AI, the mortgage operating system for loan officers and mortgage teams.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
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
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: April 3, 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed text-[15px]">
            {/* 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Perennia AI platform ("Service"),
                operated by Perennia AI ("Company," "we," "us," or "our"), you
                agree to be bound by these Terms of Service ("Terms"). If you do
                not agree to these Terms, you may not access or use the Service.
              </p>
              <p className="mt-3">
                These Terms apply to all users of the Service, including loan
                officers, mortgage brokers, team administrators, and any other
                individuals or entities who access or use the platform.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Description of Service
              </h2>
              <p>
                Perennia AI is a software-as-a-service (SaaS) platform designed
                for mortgage professionals. The Service provides customer
                relationship management (CRM), AI-powered pipeline management,
                document tracking, communication tools (including SMS, email, and
                voice), analytics, and related functionality to help mortgage
                teams manage their business operations.
              </p>
              <p className="mt-3">
                The Service may include AI-generated insights, suggestions, and
                automated workflows. These are provided as decision-support tools
                and do not constitute financial, legal, or lending advice.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. Account Registration
              </h2>
              <p>
                To use the Service, you must create an account and provide
                accurate, complete, and current information. You are responsible
                for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>
              <p className="mt-3">
                You must be at least 18 years of age and have the legal
                authority to enter into these Terms on behalf of yourself or the
                organization you represent. You agree to notify us immediately of
                any unauthorized use of your account.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Subscription and Billing
              </h2>
              <p>
                Access to certain features of the Service requires a paid
                subscription. Subscription plans, pricing, and billing cycles are
                described on our website or within the platform. All fees are
                quoted in U.S. dollars and are non-refundable except as
                expressly stated in these Terms or required by applicable law.
              </p>
              <p className="mt-3">
                We may offer free trials or promotional pricing. At the end of a
                trial period, your account will be converted to a paid
                subscription unless you cancel before the trial ends.
                Subscriptions automatically renew at the end of each billing
                cycle unless cancelled prior to the renewal date.
              </p>
              <p className="mt-3">
                We reserve the right to change our pricing with 30 days&apos;
                advance notice. Price changes will take effect at the start of
                your next billing cycle following the notice.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Acceptable Use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Use the Service for any unlawful purpose or in violation of
                  any applicable federal, state, or local law or regulation,
                  including but not limited to RESPA, ECOA, TCPA, TRID, and
                  state mortgage licensing requirements.
                </li>
                <li>
                  Transmit any content that is defamatory, obscene, fraudulent,
                  or that infringes on the intellectual property rights of
                  others.
                </li>
                <li>
                  Attempt to gain unauthorized access to the Service, other
                  accounts, computer systems, or networks connected to the
                  Service.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Service or the data contained therein.
                </li>
                <li>
                  Use automated scripts, bots, or similar means to access the
                  Service except through our published APIs.
                </li>
                <li>
                  Reverse engineer, decompile, or disassemble any aspect of the
                  Service.
                </li>
                <li>
                  Resell, sublicense, or distribute the Service to third parties
                  without our prior written consent.
                </li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Data Ownership and Privacy
              </h2>
              <p>
                You retain all rights to the data you upload, input, or generate
                through the Service ("Your Data"). By using the Service, you
                grant us a limited license to process, store, and transmit Your
                Data solely for the purpose of providing and improving the
                Service.
              </p>
              <p className="mt-3">
                We handle Your Data in accordance with our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                , which is incorporated into these Terms by reference. You are
                responsible for ensuring that your collection and use of
                borrower data complies with all applicable privacy and data
                protection laws.
              </p>
              <p className="mt-3">
                Upon termination of your account, you may request an export of
                Your Data for up to 30 days following termination. After that
                period, we may delete Your Data in accordance with our data
                retention policies.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. AI Features and Limitations
              </h2>
              <p>
                The Service incorporates artificial intelligence and machine
                learning features that may provide suggestions, generate
                content, analyze data, and automate certain tasks. While we
                strive to provide accurate and useful AI outputs, you
                acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  AI-generated outputs may contain errors, inaccuracies, or
                  omissions and should not be relied upon as the sole basis for
                  any lending, compliance, or business decision.
                </li>
                <li>
                  You are solely responsible for reviewing and verifying all
                  AI-generated content before acting on it or sharing it with
                  borrowers or other parties.
                </li>
                <li>
                  AI features do not constitute financial advice, legal counsel,
                  or a substitute for professional judgment.
                </li>
                <li>
                  We may update, modify, or discontinue AI features at any time
                  without prior notice.
                </li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Communication Services (SMS, Email, Voice)
              </h2>
              <p>
                The Service may include communication tools such as SMS
                messaging, email, and voice calling capabilities. By using these
                features, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Obtain all required consents from recipients before sending
                  any communications, in compliance with the Telephone Consumer
                  Protection Act (TCPA), CAN-SPAM Act, and other applicable
                  laws.
                </li>
                <li>
                  Maintain accurate records of consent for all communications
                  sent through the platform.
                </li>
                <li>
                  Honor all opt-out and do-not-call requests promptly.
                </li>
                <li>
                  Not use communication features for unsolicited bulk messaging,
                  spam, or any purpose that violates applicable
                  telecommunications regulations.
                </li>
              </ul>
              <p className="mt-3">
                Standard message and data rates may apply to SMS communications.
                We are not responsible for carrier fees or charges incurred by
                message recipients. See our{" "}
                <a
                  href="/sms-consent"
                  className="text-blue-600 hover:underline"
                >
                  SMS Consent Policy
                </a>{" "}
                for additional details.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. Intellectual Property
              </h2>
              <p>
                The Service, including its software, design, trademarks, logos,
                documentation, and all related intellectual property, is owned by
                Perennia AI and is protected by copyright, trademark, and other
                intellectual property laws. These Terms do not grant you any
                right, title, or interest in the Service beyond the limited
                right to use it in accordance with these Terms.
              </p>
              <p className="mt-3">
                You may provide feedback, suggestions, or ideas about the
                Service ("Feedback"). By submitting Feedback, you grant us a
                perpetual, irrevocable, royalty-free license to use, modify, and
                incorporate such Feedback into the Service without any
                obligation to you.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                10. Third-Party Integrations
              </h2>
              <p>
                The Service may integrate with third-party services such as
                Microsoft Outlook, Microsoft Teams, loan origination systems,
                telephony providers, and other platforms. Your use of
                third-party services is governed by their respective terms and
                privacy policies. We are not responsible for the availability,
                accuracy, or security of any third-party service.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                11. Service Availability and Modifications
              </h2>
              <p>
                We strive to maintain high availability of the Service but do
                not guarantee uninterrupted or error-free operation. We may
                modify, suspend, or discontinue any part of the Service at any
                time, with or without notice. We will make reasonable efforts to
                provide advance notice of material changes.
              </p>
              <p className="mt-3">
                Scheduled maintenance windows will be communicated in advance
                when possible. We are not liable for any loss or damage
                resulting from service interruptions, whether planned or
                unplanned.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                12. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                SHALL PERENNIA AI, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR
                AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
                LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL,
                ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE
                SERVICE.
              </p>
              <p className="mt-3">
                OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR
                RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE
                AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE
                CLAIM.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                13. Disclaimer of Warranties
              </h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL MEET
                YOUR REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, OR BE
                ERROR-FREE.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                14. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless Perennia AI
                and its officers, directors, employees, and agents from any
                claims, liabilities, damages, losses, and expenses (including
                reasonable attorneys&apos; fees) arising out of or related to:
                (a) your use of the Service; (b) your violation of these Terms;
                (c) your violation of any applicable law or regulation; or (d)
                your infringement of any third-party rights.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                15. Termination
              </h2>
              <p>
                Either party may terminate these Terms at any time. You may
                cancel your account through the platform settings or by
                contacting us at{" "}
                <a
                  href="mailto:admin@perenniaai.com"
                  className="text-blue-600 hover:underline"
                >
                  admin@perenniaai.com
                </a>
                . We may suspend or terminate your access to the Service
                immediately if you breach these Terms or engage in conduct that
                we determine, in our sole discretion, to be harmful to the
                Service, other users, or third parties.
              </p>
              <p className="mt-3">
                Upon termination, your right to use the Service ceases
                immediately. Sections of these Terms that by their nature should
                survive termination will survive, including but not limited to
                provisions regarding intellectual property, limitation of
                liability, indemnification, and dispute resolution.
              </p>
            </section>

            {/* 16 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                16. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the State of South Carolina, without regard to
                its conflict of laws principles. Any disputes arising out of or
                related to these Terms or the Service shall be resolved through
                binding arbitration conducted in Charleston, South Carolina, in
                accordance with the rules of the American Arbitration
                Association.
              </p>
              <p className="mt-3">
                You agree to waive any right to a jury trial or to participate
                in a class action lawsuit or class-wide arbitration related to
                these Terms or the Service.
              </p>
            </section>

            {/* 17 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                17. Changes to Terms
              </h2>
              <p>
                We reserve the right to update or modify these Terms at any
                time. We will notify you of material changes by posting the
                updated Terms on our website and updating the "Last Updated"
                date. Your continued use of the Service after such changes
                constitutes your acceptance of the revised Terms.
              </p>
            </section>

            {/* 18 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                18. Miscellaneous
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Entire Agreement.</strong> These Terms, together with
                  our Privacy Policy and any other policies referenced herein,
                  constitute the entire agreement between you and Perennia AI
                  regarding the Service.
                </li>
                <li>
                  <strong>Severability.</strong> If any provision of these Terms
                  is found to be unenforceable, the remaining provisions shall
                  continue in full force and effect.
                </li>
                <li>
                  <strong>Waiver.</strong> Our failure to enforce any right or
                  provision of these Terms shall not be deemed a waiver of such
                  right or provision.
                </li>
                <li>
                  <strong>Assignment.</strong> You may not assign or transfer
                  your rights under these Terms without our prior written
                  consent. We may assign our rights and obligations without
                  restriction.
                </li>
                <li>
                  <strong>Force Majeure.</strong> We shall not be liable for any
                  failure or delay in performance due to circumstances beyond
                  our reasonable control, including natural disasters, acts of
                  government, internet outages, or third-party service failures.
                </li>
              </ul>
            </section>

            {/* 19 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                19. Contact Us
              </h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
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
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Perennia AI. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            <a href="/sms-consent" className="text-blue-600 hover:underline">
              SMS Consent
            </a>
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
