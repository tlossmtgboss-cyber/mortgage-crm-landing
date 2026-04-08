'use client';

import Link from 'next/link';
import Header from '@/components/Header';

/* ─── Section data ─── */

const channels = [
  {
    id: 'voice',
    number: '01',
    title: 'AI Voice Calls',
    description: 'Aria places outbound calls using Vapi AI with the Deepgram asteria voice. Each call opens with a personalized greeting built from the lead\'s data, referencing prior SMS messages, emails, or calls.',
    qualifyingQuestions: [
      'Loan purpose: Purchase, refinance, cash-out, HELOC',
      'Timeline: How soon are you looking to move forward?',
      'Price range / loan amount',
      'Credit range: Excellent (740+), Good (680-739), Fair (620-679), Below 620',
      'Employment: W-2 employed, self-employed, retired',
    ],
    outcomes: [
      { label: 'Live Transfer', detail: 'Borrower is ready now — Aria bridges you in with a whisper briefing' },
      { label: 'Appointment', detail: 'Borrower wants to talk later — Aria books your calendar' },
      { label: 'Nurture', detail: 'Interested but not ready — enrolled in drip campaign' },
      { label: 'Disqualification', detail: 'Deal breaker found — Aria provides alternatives, never dead-ends' },
    ],
    compliance: [
      'No calls before 8 AM or after 9 PM (borrower local time)',
      'DNC registry checked before every dial',
      'Recording disclosure at call start',
      'Timezone from borrower area code mapping',
    ],
  },
  {
    id: 'sms',
    number: '02',
    title: 'AI SMS (Two-Way)',
    description: 'Aria sends and receives text messages via Telnyx from your dedicated number. Messages are composed by Claude AI — not canned templates. Aria adapts tone, references prior conversations on any channel, and never repeats herself.',
    features: [
      'One question at a time, natural qualification flow',
      'Remembers answers across messages and channels',
      'Deal Breaker integration with ECOA-compliant alternatives',
      'Cross-channel awareness: "I tried calling earlier — text me here if easier"',
    ],
    compliance: [
      'STOP/HELP keyword handling is automatic and immediate',
      'Every opt-out recorded with full audit trail',
      'A2P 10DLC registered campaign with carrier-approved throughput',
      'Re-subscribe via START/YES/UNSTOP with confirmation',
    ],
  },
  {
    id: 'email',
    number: '03',
    title: 'AI Email',
    description: 'Emails are sent from your actual Outlook address via Microsoft Graph — not from a system email. Claude composes hyper-personalized content using full lead context. Each email is individually written, not mail merge.',
    features: [
      'Open/click tracking that updates lead scores in real time',
      'Email opened → SMS escalation within 5 minutes',
      'HMAC-signed tracking pixels prevent spoofing',
      'Template categories: pre-approval, rate alerts, market updates, doc reminders, referrals',
    ],
    triggers: [
      'Rate drops affecting the borrower\'s scenario',
      'Stale leads needing re-engagement',
      'Post-call follow-up summaries',
      'Document requests during processing',
      'Appointment confirmations and no-show follow-ups',
    ],
  },
  {
    id: 'voicemail',
    number: '04',
    title: 'Voicemail Drops',
    description: 'When an outbound call goes unanswered or hits an answering machine, the system triggers a ringless voicemail drop via Slybroadcast. The message appears in the borrower\'s inbox without their phone ringing.',
    flow: [
      'Outbound call goes to voicemail or no-answer',
      'AMD (Answering Machine Detection) identifies machine result',
      'Slybroadcast delivers voicemail to borrower\'s inbox',
      '15 minutes later: automatic SMS follow-up sent',
    ],
    safeguards: [
      'Circuit breaker: 5 consecutive failures → falls back to SMS-only for 60 seconds',
      'TCPA quiet hours enforced',
      'DNC freshness check is blocking — stale data prevents the drop entirely',
    ],
  },
  {
    id: 'transfer',
    number: '05',
    title: 'Live Transfer',
    description: 'When Aria qualifies a borrower who is ready to proceed, the system transfers the call live to you with a whisper briefing containing everything you need to close.',
    flow: [
      'Borrower placed on brief hold with hold music',
      'System dials your phone via Telnyx Call Control',
      'You hear a whisper briefing: name, loan type, credit, amount, property, prior context',
      'Both call legs bridged into conference — conversation begins',
      'If unavailable: priority callback task + SMS notification created',
    ],
    statuses: ['initiated', 'lo_ringing', 'lo_answered', 'whisper_playing', 'bridged', 'completed'],
    availability: [
      'Available — ready to receive transfers',
      'Busy / On Call — transfers queue',
      'DND — no transfers',
      'Offline / Away — not available',
    ],
  },
];

const dripPhases = [
  {
    phase: 'Phase 1: Hot Lead',
    period: 'Days 1–7',
    frequency: 'Daily Contact',
    items: [
      'Day 0: Immediate intro SMS + voicemail follow-up if call went to VM',
      'Day 1: Pre-approval intro email',
      'Day 2: Check-in SMS',
      'Day 3: Rate environment email',
      'Day 5: Pre-approval CTA SMS',
      'Day 7: Market update email',
    ],
    color: '#FFB84D',
  },
  {
    phase: 'Phase 2: Warm Nurture',
    period: 'Days 8–90',
    frequency: 'Weekly Contact',
    items: [
      'Biweekly check-in texts and educational emails',
      'Content varies: closing costs, credit tips, market updates',
      'Refinance leads get rate-focused content',
    ],
    color: '#4DA3FF',
  },
  {
    phase: 'Phase 3: Long Nurture',
    period: 'Days 91–365',
    frequency: 'Monthly Touchpoints',
    items: [
      'Quarterly market reviews',
      'Monthly check-in texts',
      'Rate watch alerts',
      'Anniversary re-engagement at 1-year mark',
    ],
    color: '#3DFFA0',
  },
];

const triggers = [
  { trigger: 'new_lead', fires: 'A new lead is created in the system' },
  { trigger: 'no_answer', fires: 'An outbound call was not answered' },
  { trigger: 'voicemail_dropped', fires: 'A voicemail was successfully delivered' },
  { trigger: 'sms_no_response_24h', fires: 'SMS sent but no reply within 24 hours' },
  { trigger: 'email_opened', fires: 'Borrower opened a tracked email' },
  { trigger: 'call_completed', fires: 'An AI or manual call was completed' },
  { trigger: 'appointment_set', fires: 'A consultation was booked' },
  { trigger: 'appointment_missed', fires: 'Borrower did not show' },
  { trigger: 'rate_drop', fires: 'Interest rates dropped significantly' },
  { trigger: 'document_needed', fires: 'A document is required to advance the loan' },
  { trigger: 'stale_7d', fires: 'No engagement activity for 7 days' },
  { trigger: 'stale_30d', fires: 'No engagement activity for 30 days' },
  { trigger: 'qualification_complete', fires: 'Borrower answered all qualifying questions' },
  { trigger: 'deal_breaker_found', fires: 'A disqualifying factor was identified' },
  { trigger: 'loan_funded', fires: 'The loan has closed and funded' },
];

const fatigueRules = [
  'Maximum 5 contacts per day per lead (configurable)',
  'Maximum 15 contacts per week per lead (configurable)',
  '30-minute same-channel deduplication',
  '60-second trigger deduplication (webhook retry protection)',
  'Limits reached → deferred to next morning, never dropped',
];

const complianceChecks = [
  {
    label: 'TCPA',
    rules: [
      'No calls or SMS before 8 AM / after 9 PM (borrower local time)',
      'Prior express consent required for automated calls and SMS',
      'Recording disclosure on every outbound call',
    ],
  },
  {
    label: 'ECOA',
    rules: [
      'Aria never asks about race, sex, religion, national origin, marital status, or age',
      'Deal breaker responses reviewed for ECOA compliance before sending',
      'Every engagement decision logged with full decision factors',
    ],
  },
  {
    label: 'DNC',
    rules: [
      'DNC registry checked before every outbound dial',
      'Per-org DNC lists AND national registry consulted',
      'Stale DNC data blocks the call entirely (fail-closed)',
    ],
  },
  {
    label: 'A2P 10DLC',
    rules: [
      'STOP/HELP automatic and immediate',
      'Every opt-out recorded with timestamps',
      'Full audit trail for every opt-out and opt-in',
    ],
  },
];

/* ─── Component ─── */

export default function TrainingGuidePage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'var(--bg-0)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
      }}
    >
      {/* Noise + ambient */}
      <div className="noise fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[60vw] h-[60vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(77,163,255,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(24,160,166,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <Header />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 60%, rgba(77,163,255,0.06) 0%, transparent 70%), var(--bg-0)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#18a0a6]/30 bg-[#18a0a6]/10 mb-8">
            <span className="text-sm font-medium text-[#18a0a6] tracking-wide">Training Guide</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6">
            Omnichannel{' '}
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
              Engagement Engine
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to know about how Aria contacts, qualifies, and nurtures your leads across voice, SMS, email, voicemail, and live transfer — automatically.
          </p>
          <Link
            href="/engagement-engine"
            className="inline-flex items-center gap-2 text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:text-white"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Back to Engagement Engine
          </Link>
        </div>
      </section>

      {/* ─── What Is the Engagement Engine ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading number="00" title="What Is the Engagement Engine?" />
          <Prose>
            The Engagement Engine is the AI-powered brain that automatically contacts, qualifies, and nurtures your leads across every communication channel — voice calls, SMS, email, and ringless voicemail — so you never miss a lead and never let one go cold.
          </Prose>
          <Prose>
            At the center is <strong>Aria</strong>, your AI assistant. When a new lead arrives, Aria initiates first contact within 60 seconds. She qualifies borrowers by asking the right questions, books appointments on your calendar, and transfers hot leads to you live with a full briefing. Between those conversations, Aria runs intelligent drip campaigns that adapt based on how each borrower responds.
          </Prose>
          <Prose>
            You do not need to manually chase leads, remember to follow up, or worry about compliance. The engine handles all of that. Your job is to close loans — Aria handles everything that gets borrowers to your desk.
          </Prose>

          <GlassCard className="mt-10">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Lead Sources</div>
            <ul className="space-y-2">
              {['Web forms on your microsite or landing pages', 'Encompass imports via LOS integration sync', 'Salesforce sync for lead aggregation', 'Follow Up Boss (FUB) webhooks from partner agents', 'Manual entry in the Perennia dashboard'].map(s => (
                <li key={s} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-[#18a0a6] mt-0.5">&#10003;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* ─── Channels ─── */}
      {channels.map((ch) => (
        <section key={ch.id} id={ch.id} className="py-16 md:py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading number={ch.number} title={ch.title} />
            <Prose>{ch.description}</Prose>

            {ch.qualifyingQuestions && (
              <GlassCard className="mt-8">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Qualifying Questions</div>
                <ul className="space-y-2">
                  {ch.qualifyingQuestions.map(q => (
                    <li key={q} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#4DA3FF] mt-0.5 font-mono text-xs">&#8250;</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {ch.outcomes && (
              <GlassCard className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Call Outcomes</div>
                <div className="space-y-4">
                  {ch.outcomes.map(o => (
                    <div key={o.label}>
                      <span className="text-sm font-semibold text-white">{o.label}</span>
                      <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>— {o.detail}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {ch.features && (
              <GlassCard className="mt-8">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Features</div>
                <ul className="space-y-2">
                  {ch.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#3DFFA0] mt-0.5">&#10003;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {ch.triggers && (
              <GlassCard className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Trigger Events</div>
                <ul className="space-y-2">
                  {ch.triggers.map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#FFB84D] mt-0.5">&#9656;</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {ch.flow && (
              <GlassCard className="mt-8">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>How It Works</div>
                <ol className="space-y-3">
                  {ch.flow.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#4DA3FF] font-mono text-xs font-bold mt-0.5">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </GlassCard>
            )}

            {ch.safeguards && (
              <GlassCard className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Safeguards</div>
                <ul className="space-y-2">
                  {ch.safeguards.map(s => (
                    <li key={s} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#18a0a6] mt-0.5">&#9632;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {ch.statuses && (
              <div className="mt-6 flex flex-wrap gap-2">
                {ch.statuses.map((s, i) => (
                  <span key={s} className="inline-flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>{s}</span>
                    {i < ch.statuses.length - 1 && <span className="text-gray-600 text-xs">&rarr;</span>}
                  </span>
                ))}
              </div>
            )}

            {ch.availability && (
              <GlassCard className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>LO Availability States</div>
                <ul className="space-y-2">
                  {ch.availability.map(a => (
                    <li key={a} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{a}</li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {ch.compliance && (
              <GlassCard className="mt-6">
                <div className="text-xs font-mono uppercase tracking-widest mb-4 text-[#18a0a6]">Compliance</div>
                <ul className="space-y-2">
                  {ch.compliance.map(c => (
                    <li key={c} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#18a0a6] mt-0.5">&#9632;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        </section>
      ))}

      {/* ─── Drip Campaigns ─── */}
      <section id="drip" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading number="06" title="12-Month Drip Campaigns" />
          <Prose>
            When a lead is not ready to proceed immediately, the engine enrolls them in an automated drip campaign — a 12-month sequence with three phases that gradually decrease in frequency. The moment a lead responds, the drip pauses and Aria starts a live conversation.
          </Prose>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {dripPhases.map(p => (
              <GlassCard key={p.phase}>
                <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: p.color }}>{p.phase}</div>
                <div className="text-xs font-mono mb-1" style={{ color: 'var(--text-secondary)' }}>{p.period}</div>
                <div className="text-sm font-semibold text-white mb-4">{p.frequency}</div>
                <ul className="space-y-2">
                  {p.items.map(item => (
                    <li key={item} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mt-8">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Adaptive Behavior</div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><strong className="text-white">Email opened</strong> — escalate from monthly to weekly</li>
              <li><strong className="text-white">Link clicked</strong> — escalate from weekly to daily for 3 days</li>
              <li><strong className="text-white">SMS replied</strong> — pause drip, route to live AI conversation</li>
              <li><strong className="text-white">No engagement 14 days</strong> — reduce frequency</li>
              <li><strong className="text-white">Email bounced</strong> — switch primary channel to SMS</li>
            </ul>
          </GlassCard>

          <GlassCard className="mt-6">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Exit Conditions</div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>Lead responds to any message — routes to live conversation</li>
              <li>Appointment booked — switches to prep sequence</li>
              <li>Application submitted — switches to loan lifecycle sequence</li>
              <li>STOP received — permanently exits all sequences</li>
              <li>Loan funded — switches to post-close referral sequence</li>
            </ul>
          </GlassCard>

          <Prose className="mt-6">
            Four pre-built sequences: <strong>purchase_12_month</strong>, <strong>refinance_12_month</strong>, <strong>post_close</strong>, and <strong>reengagement</strong>. All drip steps are timezone-aware — messages scheduled for 10 AM in the borrower&apos;s local time.
          </Prose>
        </div>
      </section>

      {/* ─── Orchestrator ─── */}
      <section id="orchestrator" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading number="07" title="The Engagement Orchestrator" />
          <Prose>
            The Engagement Orchestrator is the master decision engine that coordinates all channels. Every engagement action flows through it. It decides <strong>what</strong> to send, <strong>when</strong> to send it, and on <strong>which channel</strong>, then dispatches to the appropriate service.
          </Prose>

          <GlassCard className="mt-10">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>15 Trigger Events</div>
            <div className="space-y-2">
              {triggers.map(t => (
                <div key={t.trigger} className="flex items-center justify-between py-2 px-3 rounded-lg text-sm" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <code className="font-mono text-[#4DA3FF] text-xs">{t.trigger}</code>
                  <span className="text-right ml-4" style={{ color: 'var(--text-secondary)' }}>{t.fires}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="mt-8">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Channel Selection Logic</div>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><strong className="text-white">Time of day</strong> — Morning/afternoon: call preferred. Evening: SMS. Quiet hours: no contact.</li>
              <li><strong className="text-white">Lead preference</strong> — If the lead prefers text, that channel moves first.</li>
              <li><strong className="text-white">Pipeline stage</strong> — New leads favor calls; nurture-stage leads favor SMS/email.</li>
              <li><strong className="text-white">Channel availability</strong> — No phone? Skip call/SMS. DNC? Skip call.</li>
              <li><strong className="text-white">Consent status</strong> — call_consent and sms_consent checked before dispatch.</li>
              <li><strong className="text-white">Recent patterns</strong> — Already called today? Deprioritize another call.</li>
            </ul>
          </GlassCard>

          <GlassCard className="mt-8">
            <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>Fatigue Prevention</div>
            <ul className="space-y-2">
              {fatigueRules.map(r => (
                <li key={r} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-[#FFB84D] mt-0.5">&#9632;</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* ─── Compliance ─── */}
      <section id="compliance" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading number="08" title="Compliance Built In" />
          <Prose>
            Every engagement action passes through a multi-layer compliance check before dispatch. This is not optional — the system enforces these rules automatically. Aria never quotes specific interest rates, APRs, or fees in any channel.
          </Prose>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {complianceChecks.map(c => (
              <GlassCard key={c.label}>
                <div className="text-lg font-bold font-mono text-white mb-3">{c.label}</div>
                <ul className="space-y-2">
                  {c.rules.map(r => (
                    <li key={r} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="text-[#18a0a6] mt-0.5">&#10003;</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-4xl font-medium mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent">
              activate the engine?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://app.perenniaai.com/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(77,163,255,0.9), rgba(120,200,255,0.8))', color: '#040508', boxShadow: '0 8px 40px rgba(77,163,255,0.3)' }}
            >
              Start Free Trial
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link
              href="/engagement-engine"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-normal tracking-wider uppercase transition-all duration-300 hover:border-[rgba(77,163,255,0.4)] hover:text-white"
              style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Reusable subcomponents ─── */

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-mono text-[#18a0a6] tracking-widest mb-2">{number}</div>
      <h2 style={{ fontFamily: 'var(--font-display)' }} className="text-3xl md:text-4xl font-medium text-white">
        {title}
      </h2>
    </div>
  );
}

function Prose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base leading-relaxed mb-4 ${className}`} style={{ color: 'var(--text-secondary)' }}>
      {children}
    </p>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 ${className}`}
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(16px)' }}
    >
      {children}
    </div>
  );
}
