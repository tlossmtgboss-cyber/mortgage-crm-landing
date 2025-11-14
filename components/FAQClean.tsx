'use client';

import { useState } from 'react';

export default function FAQClean() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI actually work?",
      answer: "Our AI reads your emails, extracts key information like dates, loan amounts, and borrower details, then automatically updates your CRM. It learns from your corrections and gets smarter over time."
    },
    {
      question: "What integrations do you support?",
      answer: "We integrate with Microsoft 365, Google Workspace, Calendly, Twilio, Encompass LOS, and more. Our API allows for custom integrations as well."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption (AES-256), are GLBA and GDPR compliant, and never share your data with third parties. All sensitive borrower information is encrypted at rest."
    },
    {
      question: "How long does setup take?",
      answer: "Most teams are up and running in under 30 minutes. Connect your email, set up your pipelines, and you're ready to go. Our team provides onboarding support."
    },
    {
      question: "Can I try it before committing?",
      answer: "Yes! We offer a 14-day free trial with no credit card required. You'll have full access to all features to see if it's the right fit for your team."
    },
    {
      question: "What if I need help?",
      answer: "We provide email support, live chat, and comprehensive documentation. Enterprise plans include dedicated support and training for your team."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
