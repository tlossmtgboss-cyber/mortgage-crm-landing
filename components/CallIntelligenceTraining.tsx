'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';

/* ------------------------------------------------------------------ */
/*  Section data                                                       */
/* ------------------------------------------------------------------ */

const tableOfContents = [
  { id: 'overview', label: 'Overview' },
  { id: 'pipeline', label: 'The Pipeline' },
  { id: 'extraction', label: 'AI Extraction' },
  { id: 'automation', label: 'Post-Call Automation' },
  { id: 'agents', label: 'Three AI Agents' },
  { id: 'qa', label: 'QA Scoring' },
  { id: 'whisper', label: 'Live Whisper' },
  { id: 'screening', label: 'Call Screening' },
  { id: 'review', label: 'Review Queue' },
  { id: 'security', label: 'Security' },
  { id: 'tips', label: 'Tips' },
  { id: 'faq', label: 'FAQ' },
];

const extractionDomains = [
  { name: 'Identity', fields: 'Name, DOB, SSN (last 4), contact info, email, phone' },
  { name: 'Property', fields: 'Address, purchase price, occupancy, type, property details' },
  { name: 'Employment', fields: 'Employer name, title, years employed, income type' },
  { name: 'Financial', fields: 'Income sources, assets, liabilities, down payment, reserves' },
  { name: 'Compliance', fields: 'Declarations (bankruptcy, litigation), required disclosures' },
  { name: 'Intent', fields: 'Loan purpose, timeline, co-borrower info, preferences' },
];

const qaCategories = [
  { name: 'Greeting Quality', weight: '10%' },
  { name: 'Active Listening', weight: '12%' },
  { name: 'Problem Resolution', weight: '15%' },
  { name: 'Product Knowledge', weight: '12%' },
  { name: 'Communication Clarity', weight: '12%' },
  { name: 'Empathy & Rapport', weight: '10%' },
  { name: 'Compliance Adherence', weight: '12%' },
  { name: 'Call Control', weight: '7%' },
  { name: 'Closing Technique', weight: '5%' },
  { name: 'Professionalism', weight: '5%' },
];

const faqs = [
  {
    q: 'Do borrowers know the call is being analyzed?',
    a: 'The standard recording disclosure covers this. No additional disclosure is required for AI analysis of calls you\'re already recording.',
  },
  {
    q: 'How long does processing take?',
    a: 'Transcription completes within 30-60 seconds. Full analysis (extraction, summary, QA scoring) completes within 2-3 minutes of call end.',
  },
  {
    q: 'Can I search across all my call transcripts?',
    a: 'Yes. Every word is indexed and searchable. Search by borrower name, topic, date range, or keywords.',
  },
  {
    q: 'What if the AI extracts something wrong?',
    a: 'Use the review queue to correct it. Low-confidence items are flagged automatically. You can also manually review any extraction.',
  },
  {
    q: 'Does this work for video calls?',
    a: 'Yes, if audio is captured. Video meeting recordings are processed through the same pipeline.',
  },
  {
    q: 'Is my data secure?',
    a: 'All PII is encrypted at rest and in transit. SSNs are stored as last-4 only. Transcripts are redacted before AI processing. All access is audit-logged.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CallIntelligenceTraining() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#040508] text-[var(--text-primary,rgba(230,238,255,0.96))]">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            href="/call-intelligence"
            className={`inline-flex items-center gap-2 text-sm text-[var(--accent-blue,#4DA3FF)] hover:underline mb-6 transition-all duration-700 ${
              heroVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Call Intelligence
          </Link>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
          >
            Call Intelligence{' '}
            <em className="bg-gradient-to-r from-[var(--accent-blue,#4DA3FF)] to-purple-400 bg-clip-text text-transparent not-italic">
              Training Guide
            </em>
          </h1>

          <p
            className={`text-lg text-[var(--text-secondary,rgba(180,200,230,0.85))] max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Everything you need to know about how Perennia AI analyzes, scores,
            and extracts intelligence from every borrower call.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl border border-[var(--glass-border,rgba(180,220,255,0.09))] bg-[var(--glass-bg,rgba(12,18,28,0.82))] backdrop-blur-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-dim,rgba(150,170,200,0.7))] mb-4">
              Contents
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-20">

        {/* OVERVIEW */}
        <Section id="overview" title="What is Call Intelligence?">
          <p>
            Call Intelligence is Perennia AI&apos;s automated call analysis system. Every
            borrower call you make or receive is automatically transcribed, analyzed,
            scored, and turned into actionable data — without you lifting a finger.
          </p>
          <p>
            Think of it as having a junior loan officer, an underwriter, and a compliance
            officer all listening to every call simultaneously, taking perfect notes, and
            filing everything into the right place.
          </p>
        </Section>

        {/* PIPELINE */}
        <Section id="pipeline" title="The Pipeline: Call to Intelligence">
          <p className="mb-6">When a call ends, here&apos;s what happens in under 3 minutes:</p>

          <div className="space-y-4">
            {[
              { step: '1', title: 'Recording Capture', desc: 'Inbound via AI Receptionist, outbound from dialer, click-to-call from any profile, or uploaded recordings from external calls.' },
              { step: '2', title: 'Transcription', desc: 'Speaker diarization (you vs. borrower labeled), word-level timestamps, confidence scoring. Deepgram Nova-2 primary, with automatic fallback providers.' },
              { step: '3', title: 'AI Extraction', desc: 'A single optimized AI call analyzes the full transcript and extracts structured data across six mortgage domains — each with confidence scores.' },
              { step: '4', title: 'Post-Call Automation', desc: 'Five automations run simultaneously: AI summary, action items, follow-up SMS draft, compliance score, and sentiment analysis.' },
              { step: '5', title: 'Parallel Agent Analysis', desc: 'Three specialized AI agents process the call: The Scribe, Junior LO, and Underwriter — each generating artifacts for your review.' },
              { step: '6', title: 'QA Scoring', desc: 'Every call scored on 10 weighted criteria. Scores feed into coaching dashboards and performance reviews.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue-dim,rgba(77,163,255,0.12))] border border-[var(--accent-blue,#4DA3FF)]/20 flex items-center justify-center text-[var(--accent-blue)] text-sm font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXTRACTION */}
        <Section id="extraction" title="AI Extraction: Six Domains">
          <p className="mb-6">
            One optimized AI call extracts structured data across all six mortgage domains.
            High-confidence extractions (85%+) are auto-approved. Low-confidence items go
            to your review queue.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] font-medium">Domain</th>
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] font-medium">What It Extracts</th>
                </tr>
              </thead>
              <tbody>
                {extractionDomains.map((d) => (
                  <tr key={d.name} className="border-b border-white/5">
                    <td className="py-3 px-4 font-semibold text-[var(--accent-blue)]">{d.name}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{d.fields}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout>
            <strong>PII Security:</strong> Full SSNs are never stored — only the last 4 digits.
            All PII is redacted before being sent to the AI for analysis.
          </Callout>
        </Section>

        {/* AUTOMATION */}
        <Section id="automation" title="Post-Call Automation">
          <p className="mb-6">After extraction, five automations run simultaneously:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'AI Summary',
                desc: 'Four flavors: Quick (5 bullets), Standard (2 min read), Executive (manager-focused with conversion probability), and Coaching (training-focused with improvement areas).',
              },
              {
                title: 'Action Items',
                desc: 'Tasks mentioned during the call are extracted and created in your task dashboard with title, priority, due date, and owner assignment.',
              },
              {
                title: 'Follow-up SMS Draft',
                desc: 'A personalized 160-character follow-up text is drafted referencing call-specific details. Review and send with one tap.',
              },
              {
                title: 'Compliance Score',
                desc: 'Seven dimensions: TRID disclosure (25%), fair lending (20%), consent (15%), rate accuracy (15%), identity verification (10%), fee transparency (10%), DNC (5%).',
              },
              {
                title: 'Sentiment Analysis',
                desc: 'Borrower sentiment tracked through the call. Overall trajectory (improving/stable/declining), negative moments flagged, risk alerts if call ends negative.',
              },
              {
                title: 'Recording Consent Check',
                desc: 'Detects required consent disclosures in the first ~2 minutes. State-specific rules for two-party consent states (CA, FL, IL, MD, MT, NE, NH, PA, WA).',
              },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* AGENTS */}
        <Section id="agents" title="Three AI Agents on Every Call">
          <p className="mb-6">
            Once the transcript is ready, three specialized agents process the call simultaneously:
          </p>

          <div className="space-y-4">
            <AgentCard
              name="The Scribe"
              role="Comprehensive Recap"
              items={[
                '5 C\'s of Credit analysis (credit, capacity, collateral, character, cash)',
                'Key decisions and commitments made during the call',
                'Next steps for both you and the borrower',
              ]}
              color="blue"
            />
            <AgentCard
              name="Junior Loan Officer"
              role="Application Analysis"
              items={[
                'Pre-qualification calculation based on stated income/assets',
                'Debt-to-income (DTI) analysis',
                'Document requirements identified from conversation',
                'Loan product recommendations',
              ]}
              color="emerald"
            />
            <AgentCard
              name="The Underwriter"
              role="Risk Assessment"
              items={[
                'Risk flags by category: credit, income, employment, property, compliance, assets, DTI',
                'Severity ratings: low, medium, high, critical',
                'Specific file concerns to address before submission',
              ]}
              color="amber"
            />
          </div>

          <Callout>
            All artifacts generated by these agents appear in your review queue.
            Nothing is applied to the loan file until you approve it.
          </Callout>
        </Section>

        {/* QA */}
        <Section id="qa" title="QA Scoring: 10 Criteria">
          <p className="mb-6">Every call is automatically scored on 10 weighted criteria:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)] font-medium">Criteria</th>
                  <th className="text-right py-3 px-4 text-[var(--text-dim)] font-medium">Weight</th>
                </tr>
              </thead>
              <tbody>
                {qaCategories.map((cat) => (
                  <tr key={cat.name} className="border-b border-white/5">
                    <td className="py-3 px-4">{cat.name}</td>
                    <td className="py-3 px-4 text-right text-[var(--accent-blue)]">{cat.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Excellent', range: '4.5+', color: 'text-[var(--green,#3DFFA0)]' },
              { label: 'Good', range: '4.0-4.5', color: 'text-[var(--accent-blue)]' },
              { label: 'Acceptable', range: '3.5-4.0', color: 'text-[var(--amber,#FFB84D)]' },
              { label: 'Needs Work', range: '<3.0', color: 'text-[var(--red,#FF6B6B)]' },
            ].map((tier) => (
              <div key={tier.label} className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-center">
                <div className={`text-xl font-bold ${tier.color}`}>{tier.range}</div>
                <div className="text-xs text-[var(--text-dim)] mt-1">{tier.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* WHISPER */}
        <Section id="whisper" title="Live Call Whisper">
          <p className="mb-4">
            During active calls, AI suggestions appear on your screen in real time.
            The borrower never sees or hears them. Delivered within 2 seconds.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Talking points',
              'Objection handlers',
              'Compliance reminders',
              'Rate info',
              'Question prompts',
              'Closing techniques',
              'Rapport builders',
              'Calculator suggestions',
              'Risk warnings',
            ].map((item) => (
              <div key={item} className="py-2.5 px-4 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] text-sm text-center">
                {item}
              </div>
            ))}
          </div>
        </Section>

        {/* SCREENING */}
        <Section id="screening" title="Call Screening">
          <p className="mb-4">Before a call reaches you, multi-tier screening runs automatically:</p>
          <div className="space-y-2">
            {[
              { tier: 'Whitelist', desc: 'Known contacts connect immediately', cost: 'Free' },
              { tier: 'CRM Lookup', desc: 'Existing leads/clients identified with profile pull-up', cost: 'Free' },
              { tier: 'Blocklist', desc: 'Known spam callers blocked automatically', cost: 'Free' },
              { tier: 'Spam Score', desc: 'Unknown callers scored (threshold: 60)', cost: '~$0.05' },
              { tier: 'AI Screen', desc: 'AI receptionist asks name and reason if truly unknown', cost: 'Free' },
            ].map((item) => (
              <div key={item.tier} className="flex items-center gap-4 py-3 px-4 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                <span className="font-semibold text-sm w-28 shrink-0">{item.tier}</span>
                <span className="text-sm text-[var(--text-secondary)] flex-1">{item.desc}</span>
                <span className="text-xs text-[var(--text-dim)] shrink-0">{item.cost}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* REVIEW */}
        <Section id="review" title="The Review Queue">
          <p className="mb-4">When the AI isn&apos;t confident enough, items land in your review queue:</p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li className="flex gap-2"><span className="text-[var(--accent-blue)]">-</span> Extractions below 85% confidence — review the value against the source transcript</li>
            <li className="flex gap-2"><span className="text-[var(--accent-blue)]">-</span> Three decisions: <strong className="text-white">Approve</strong> (accept), <strong className="text-white">Reject</strong> (discard), or <strong className="text-white">Modify</strong> (correct the value)</li>
            <li className="flex gap-2"><span className="text-[var(--accent-blue)]">-</span> Bulk actions — approve or reject multiple items at once</li>
            <li className="flex gap-2"><span className="text-[var(--accent-blue)]">-</span> Priority sorting — lowest confidence items appear first</li>
          </ul>
        </Section>

        {/* SECURITY */}
        <Section id="security" title="Security & Compliance">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'PII Protection', desc: 'Full SSNs never stored. Only last 4 digits captured. All PII redacted before AI processing.' },
              { title: 'Encryption', desc: 'All transcripts encrypted at rest and in transit. GLBA-grade data protection.' },
              { title: 'Consent Detection', desc: 'Two-party consent state detection built in (CA, FL, IL, MD, MT, NE, NH, PA, WA).' },
              { title: 'Audit Trail', desc: 'Complete logging on every access, extraction, and review decision. Compliance-ready.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* TIPS */}
        <Section id="tips" title="Tips for Best Results">
          <div className="space-y-3">
            {[
              'Use the built-in dialer or AI receptionist — external calls need manual upload',
              'Review low-confidence extractions daily — the more you review, the better the system',
              'Check your QA scores weekly — identify trends in call performance',
              'Use follow-up SMS drafts — they\'re personalized to each call, review and send in minutes',
              'Don\'t ignore risk flags — the underwriter agent catches things you might miss on a busy day',
              'Say "this call may be recorded" in the first 2 minutes, especially in two-party consent states',
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[var(--green,#3DFFA0)]/10 border border-[var(--green)]/20 flex items-center justify-center text-[var(--green)] text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{tip}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" title="FAQ">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Bottom CTA */}
        <div className="text-center py-12">
          <p className="text-[var(--text-dim)] mb-6">Ready to see it in action?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.perenniaai.com/register"
              className="px-8 py-3.5 bg-gradient-to-r from-[var(--accent-blue,#4DA3FF)] to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              Start Free Trial
            </Link>
            <Link
              href="/call-intelligence"
              className="px-8 py-3.5 border border-[var(--glass-border)] bg-[var(--glass-bg)] text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 p-5 rounded-xl border-l-2 border-[var(--accent-blue,#4DA3FF)] bg-[var(--accent-blue-dim,rgba(77,163,255,0.12))]">
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function AgentCard({
  name,
  role,
  items,
  color,
}: {
  name: string;
  role: string;
  items: string[];
  color: 'blue' | 'emerald' | 'amber';
}) {
  const colorMap = {
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', dot: 'bg-blue-400' },
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', dot: 'bg-emerald-400' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/5', dot: 'bg-amber-400' },
  };
  const c = colorMap[color];

  return (
    <div className={`p-5 rounded-xl border ${c.border} ${c.bg}`}>
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-sm text-[var(--text-dim)] mb-3">{role}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 items-start text-sm text-[var(--text-secondary)]">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-2 shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
