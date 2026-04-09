'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CookiePreferences {
  necessary: boolean;   // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;  // ISO timestamp
  expiresAt: string;    // ISO timestamp (365 days from consent)
}

type ConsentView = 'banner' | 'customize' | 'hidden';

const STORAGE_KEY = 'cookie-consent';
const CONSENT_DURATION_DAYS = 365;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: CookiePreferences = JSON.parse(raw);
    // Check expiry
    if (new Date(parsed.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function buildPreferences(analytics: boolean, marketing: boolean): CookiePreferences {
  const now = new Date();
  const expires = new Date(now);
  expires.setDate(expires.getDate() + CONSENT_DURATION_DAYS);
  return {
    necessary: true,
    analytics,
    marketing,
    consentedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
}

/**
 * Dispatches a custom event that analytics/marketing scripts can listen for.
 * Scripts should check `getCookieConsent()` before initializing.
 */
function dispatchConsentEvent(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: prefs }));
}

/**
 * Public API: other scripts can call this to check current consent.
 * Attach to window for global access.
 */
export function getCookieConsent(): CookiePreferences | null {
  return getStoredPreferences();
}

export function hasAnalyticsConsent(): boolean {
  return getStoredPreferences()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return getStoredPreferences()?.marketing === true;
}

// Expose globally for non-React scripts
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__cookieConsent = {
    get: getCookieConsent,
    hasAnalytics: hasAnalyticsConsent,
    hasMarketing: hasMarketingConsent,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CookieConsent() {
  const [view, setView] = useState<ConsentView>('hidden');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    const existing = getStoredPreferences();
    if (!existing) {
      setView('banner');
    } else {
      setAnalyticsEnabled(existing.analytics);
      setMarketingEnabled(existing.marketing);
    }
  }, []);

  // Listen for footer "Cookie Settings" click
  useEffect(() => {
    const handler = () => {
      const existing = getStoredPreferences();
      if (existing) {
        setAnalyticsEnabled(existing.analytics);
        setMarketingEnabled(existing.marketing);
      }
      setView('customize');
    };
    window.addEventListener('open-cookie-settings', handler);
    return () => window.removeEventListener('open-cookie-settings', handler);
  }, []);

  const saveAndClose = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    dispatchConsentEvent(prefs);
    setView('hidden');
  }, []);

  const handleAcceptAll = useCallback(() => {
    const prefs = buildPreferences(true, true);
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    saveAndClose(prefs);
  }, [saveAndClose]);

  const handleRejectAll = useCallback(() => {
    const prefs = buildPreferences(false, false);
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    saveAndClose(prefs);
  }, [saveAndClose]);

  const handleSaveCustom = useCallback(() => {
    const prefs = buildPreferences(analyticsEnabled, marketingEnabled);
    saveAndClose(prefs);
  }, [analyticsEnabled, marketingEnabled, saveAndClose]);

  if (view === 'hidden') return null;

  return (
    <>
      {/* Backdrop for customize panel */}
      {view === 'customize' && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          onClick={() => setView('hidden')}
          aria-hidden="true"
        />
      )}

      {/* ── Banner View ───────────────────────────────────────────────── */}
      {view === 'banner' && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-900/95 backdrop-blur-md border-t border-gray-700/60 shadow-2xl animate-slide-up"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-banner-desc"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-1">
                  We value your privacy
                </p>
                <p id="cookie-banner-desc" className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                  We use cookies and similar technologies to provide essential site functionality,
                  analyze traffic, and personalize content. You can accept all cookies, reject
                  non-essential ones, or customize your preferences.
                  Under GDPR and CCPA, you have the right to control how your data is collected.{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  {' '}&middot;{' '}
                  <Link
                    href="/privacy#ccpa"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Do Not Sell My Information
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setView('customize')}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors order-3 sm:order-1"
                >
                  Customize
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors order-2"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold order-1 sm:order-3"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Customize Panel ───────────────────────────────────────────── */}
      {view === 'customize' && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-900/98 backdrop-blur-md border-t border-gray-700/60 shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto"
          role="dialog"
          aria-label="Cookie preferences"
          aria-modal="true"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Cookie Preferences</h2>
              <button
                onClick={() => setView('hidden')}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close cookie preferences"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Choose which cookie categories to allow. Necessary cookies are required for the site
              to function and cannot be disabled. For more information, read our{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                Privacy Policy
              </Link>.
              California residents: see our{' '}
              <Link href="/privacy#ccpa" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                CCPA disclosure
              </Link>.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-4 mb-8">
              {/* Necessary */}
              <div className="border border-gray-700/60 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-sm font-semibold text-white">Necessary</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Essential for the site to function. Includes session management,
                      authentication, and security (CSRF protection). These cannot be disabled.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div
                      className="w-11 h-6 bg-blue-600 rounded-full relative cursor-not-allowed opacity-70"
                      title="Always enabled"
                    >
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block text-center">Always on</span>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="border border-gray-700/60 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-sm font-semibold text-white">Analytics</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Help us understand how visitors use our site. Includes page views,
                      navigation patterns, and performance metrics. Data is aggregated
                      and anonymized.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      role="switch"
                      aria-checked={analyticsEnabled}
                      aria-label="Toggle analytics cookies"
                      onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
                        analyticsEnabled ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
                        style={{ left: analyticsEnabled ? '22px' : '2px' }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="border border-gray-700/60 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="text-sm font-semibold text-white">Marketing</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Used for conversion tracking and retargeting. These cookies help us
                      measure ad effectiveness and show relevant content. May share data
                      with third-party advertising partners.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      role="switch"
                      aria-checked={marketingEnabled}
                      aria-label="Toggle marketing cookies"
                      onClick={() => setMarketingEnabled(!marketingEnabled)}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${
                        marketingEnabled ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200"
                        style={{ left: marketingEnabled ? '22px' : '2px' }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2.5 text-sm border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
