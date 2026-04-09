'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import BookingModal from '@/components/BookingModal';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pipelineSteps = [
  {
    number: '01',
    title: 'Lead Comes In',
    description: 'New lead from any source — web form, Zillow, referral, phone call. Aria responds instantly.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Books the Meeting',
    description: 'Aria checks your real-time Outlook availability and books directly into an open slot — no back-and-forth.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Reminders Sent',
    description: 'SMS, email, and voice reminders fire automatically — 24 hours before, 1 hour before, and 15 minutes before.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'You Meet, Perennia Logs',
    description: 'Meeting happens. Notes, action items, and follow-ups are auto-generated. No-shows get re-engagement sequences.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const features = [
  {
    name: 'Two-Way Outlook Sync',
    description: 'Real-time sync with Microsoft Outlook via Graph API. Block personal time, and Perennia respects it instantly.',
    color: 'from-blue-500 to-blue-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    name: 'Multi-Channel Reminders',
    description: 'SMS, email, and AI voice reminders timed automatically. Borrowers never forget.',
    color: 'from-emerald-500 to-emerald-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    name: 'Public Booking Links',
    description: 'Share a branded link. Borrowers pick a time that works — availability updates in real time.',
    color: 'from-purple-500 to-purple-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    name: 'Smart Routing',
    description: 'Round-robin, relationship-based, or territory-based assignment. The right LO gets the right meeting.',
    color: 'from-amber-500 to-amber-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    name: 'Meeting Type Templates',
    description: 'Pre-qualification, document review, rate lock — each with custom durations, buffers, and intake questions.',
    color: 'from-rose-500 to-rose-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    name: 'TCPA Compliance',
    description: 'Quiet hours enforced automatically. Consent tracked. Every reminder logged for audit.',
    color: 'from-indigo-500 to-indigo-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const analyticsCards = [
  {
    name: 'Best Booking Times',
    description: 'AI identifies when borrowers are most likely to show up — by day of week and hour.',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    metric: '10am Tue',
    metricLabel: 'Top slot this month',
  },
  {
    name: 'No-Show Analysis',
    description: 'Patterns behind missed meetings. Lead source, time of day, reminder channel — all correlated.',
    gradient: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    metric: '8%',
    metricLabel: 'No-show rate (industry avg: 22%)',
  },
  {
    name: 'Schedule Optimization',
    description: 'AI suggests ideal meeting clusters, buffer adjustments, and protected focus blocks.',
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    metric: '3.2 hrs',
    metricLabel: 'Recovered per week',
  },
];

const stats = [
  { value: '< 60s', label: 'Lead to booked' },
  { value: '92%', label: 'Show rate' },
  { value: '3', label: 'Reminder channels' },
  { value: '24/7', label: 'Self-service booking' },
];

/* ------------------------------------------------------------------ */
/*  Fade-in hook                                                       */
/* ------------------------------------------------------------------ */

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SmartCalendarPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pipeline = useFadeIn();
  const featureGrid = useFadeIn();
  const analytics = useFadeIn();
  const booking = useFadeIn();
  const cta = useFadeIn();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-0,#040508)] text-[var(--text-primary,rgba(230,238,255,0.96))] overflow-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      <Header />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-600/15 rounded-full blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-sm font-medium text-gray-300">AI-Powered Scheduling</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-1000 delay-100 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
          >
            Your calendar runs{' '}
            <br />
            <em className="bg-gradient-to-r from-[#18a0a6] via-teal-300 to-blue-400 bg-clip-text text-transparent not-italic">
              itself
            </em>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Leads book themselves. Outlook syncs in real time.
            Reminders fire across SMS, email, and voice.
            No-shows get re-engaged automatically.
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-300 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </button>
          </div>

          {/* Stats bar */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS — Pipeline                                     */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/20 to-transparent pointer-events-none" />

        <div
          ref={pipeline.ref}
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            pipeline.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-bold">
              From new lead to{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                booked meeting
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-teal-500/30 hover:bg-white/[0.05] transition-all duration-500 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-teal-400/40 text-5xl font-black absolute top-4 right-4 group-hover:text-teal-400/60 transition-colors">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES                                                    */}
      {/* ============================================================ */}
      <section id="features" className="py-24 relative">
        <div
          ref={featureGrid.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            featureGrid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">Built for Mortgage</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Not another generic{' '}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                calendar tool
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Every feature designed for the mortgage workflow — from pre-qual calls
              to document review meetings to closing appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ANALYTICS & INTELLIGENCE                                    */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/15 to-transparent pointer-events-none" />

        <div
          ref={analytics.ref}
          className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            analytics.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-3">Calendar Intelligence</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your schedule gets{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                smarter over time
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              AI analyzes every booking, every no-show, every reschedule — and continuously
              optimizes when, how, and who gets scheduled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsCards.map((card, i) => (
              <div
                key={card.name}
                className={`p-8 rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} hover:scale-[1.02] transition-all duration-500`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${card.iconColor} mb-5`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div className={`text-3xl font-black ${card.iconColor} mb-1`}>{card.metric}</div>
                <div className="text-xs text-gray-500 mb-4">{card.metricLabel}</div>
                <h3 className="text-xl font-bold mb-1">{card.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LIVE BOOKING EMBED                                          */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div
          ref={booking.ref}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            booking.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-3">Try It Now</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              See it in{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                action
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              This is the actual booking experience your borrowers will see.
              Pick a time — it books directly into the LO&apos;s calendar.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden shadow-2xl shadow-teal-500/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-gray-500 font-mono">app.perenniaai.com/book/your-name</span>
            </div>
            <div className="relative" style={{ height: '500px' }}>
              <iframe
                src="https://app.perenniaai.com/embed/book/demo"
                className="w-full h-full border-0"
                allow="clipboard-write"
                title="Smart Calendar Booking Demo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                  */}
      {/* ============================================================ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/20 to-transparent pointer-events-none" />

        <div
          ref={cta.ref}
          className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
          >
            Stop chasing borrowers.
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Let them book you.
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Every minute spent scheduling is a minute not spent closing.
            Smart Calendar handles the back-and-forth so you can focus on
            what matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setBookingOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-lg rounded-xl hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
