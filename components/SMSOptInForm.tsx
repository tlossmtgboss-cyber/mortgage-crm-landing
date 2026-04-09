"use client";

import { useState, type FormEvent } from "react";

export default function SMSOptInForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState<"opt-in" | "opt-out" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedChoice, setSubmittedChoice] = useState<"opt-in" | "opt-out" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!choice) {
      setError("Please select either Opt In or Opt Out.");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit US phone number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://api.perenniaai.com"}/api/v1/public/sms-opt-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone: `+1${digits}`,
            email: email || undefined,
            sms_consent: choice === "opt-in",
            consent_text: choice === "opt-in"
              ? "I agree to receive recurring automated SMS/MMS messages from Perennia AI and my assigned loan officer, including mortgage application updates, rate alerts, document requests, and appointment reminders. Message frequency varies (up to 10 msgs/month). Msg & data rates may apply. Reply STOP to cancel, HELP for help. Consent is not a condition of purchase."
              : "I do not wish to receive SMS/MMS messages from Perennia AI.",
            consent_source: "web_form",
            consent_page_url: window.location.href,
          }),
        }
      );

      if (res.ok) {
        setSubmittedChoice(choice);
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.detail || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className={`w-16 h-16 ${submittedChoice === "opt-in" ? "bg-green-100" : "bg-gray-100"} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <svg className={`w-8 h-8 ${submittedChoice === "opt-in" ? "text-green-600" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {submittedChoice === "opt-in" ? "You're all set!" : "Preference saved"}
        </h3>
        <p className="text-gray-600">
          {submittedChoice === "opt-in"
            ? <>You&apos;ve been opted in to receive SMS updates. You can reply{" "}<strong>STOP</strong> at any time to unsubscribe.</>
            : <>You&apos;ve opted out of SMS messages. If you change your mind, you can return to this page at any time.</>
          }
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
            placeholder="Smith"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
            +1
          </span>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
            placeholder="(555) 123-4567"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          US mobile number where you&apos;d like to receive SMS updates.
        </p>
      </div>

      {/* Email (optional) */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
          placeholder="john@example.com"
        />
      </div>

      {/* Opt In Container */}
      <div
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          choice === "opt-in"
            ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
            : "bg-white border-gray-200 hover:border-blue-300"
        }`}
        onClick={() => setChoice("opt-in")}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={choice === "opt-in"}
            onChange={() => setChoice(choice === "opt-in" ? null : "opt-in")}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
          />
          <div>
            <span className="font-semibold text-gray-900 text-sm">Opt In to SMS Updates</span>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              I agree to receive recurring automated SMS/MMS messages from{" "}
              <strong>Perennia AI</strong> and my assigned loan officer, including
              mortgage application updates, rate alerts, document requests, and
              appointment reminders. Message frequency varies (up to 10 msgs/month).
              Msg &amp; data rates may apply. Reply <strong>STOP</strong> to cancel,{" "}
              <strong>HELP</strong> for help.{" "}
              <strong>Consent is not a condition of purchase or receiving services.</strong>{" "}
              See our{" "}
              <a
                href="/privacy"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </a>
              .
            </p>
          </div>
        </label>
      </div>

      {/* Opt Out Container */}
      <div
        className={`border rounded-lg p-4 cursor-pointer transition-all ${
          choice === "opt-out"
            ? "bg-gray-50 border-gray-400 ring-2 ring-gray-300"
            : "bg-white border-gray-200 hover:border-gray-300"
        }`}
        onClick={() => setChoice("opt-out")}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={choice === "opt-out"}
            onChange={() => setChoice(choice === "opt-out" ? null : "opt-out")}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 flex-shrink-0"
          />
          <div>
            <span className="font-semibold text-gray-900 text-sm">Opt Out of SMS Updates</span>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">
              I do not wish to receive SMS/MMS messages from Perennia AI. I understand
              I can change my preference at any time by returning to this page.
            </p>
          </div>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      <p className="text-center text-xs text-gray-400">
        You can change your preference at any time.
      </p>
    </form>
  );
}
