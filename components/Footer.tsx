'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus('loading');
    setSubError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://api.perenniaai.com'}/api/v1/public/newsletter`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      if (res.ok) {
        setSubStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => null);
        setSubError(data?.detail || 'Something went wrong.');
        setSubStatus('error');
      }
    } catch {
      setSubError('Unable to connect. Please try again.');
      setSubStatus('error');
    }
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '/#features' },
        { label: 'How It Works', url: '/#workflow' },
        { label: 'Integrations', url: '/#integrations' },
        { label: 'Book a Demo', url: 'https://app.perenniaai.com/book/demo' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Contact Us', url: '/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'SMS Opt-In', url: '/sms-consent' },
      ]
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <span>Perennia AI</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              The Mortgage Operating System. 20+ AI agents that run your pipeline, track every file, and surface risk before it costs you.
            </p>
          </div>

          {/* Footer links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const isExternal = link.url.startsWith('http');
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2 text-white">Stay updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest mortgage industry insights and product updates.
            </p>

            {subStatus === 'success' ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>You&apos;re subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all whitespace-nowrap disabled:opacity-50"
                >
                  {subStatus === 'loading' ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
            )}
            {subStatus === 'error' && subError && (
              <p className="text-red-400 text-xs mt-2">{subError}</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Perennia AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="/sms-consent" className="hover:text-blue-400 transition-colors">SMS Opt-In</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
