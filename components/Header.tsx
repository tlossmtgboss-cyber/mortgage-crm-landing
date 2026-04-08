'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Aria', href: '/aria' },
    { label: 'Engagement Engine', href: '/engagement-engine' },
    { label: 'Call Intelligence', href: '/call-intelligence' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-xl shadow-blue-500/10 py-3 border-b border-white/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-105 group"
          >
            <svg width="36" height="36" viewBox="0 0 32 32" className="flex-shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4DA3FF"/>
                  <stop offset="100%" stopColor="#18a0a6"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="8" fill="#0c121c"/>
              <text x="16" y="23" textAnchor="middle" fontFamily="system-ui,sans-serif" fontWeight="700" fontSize="20" fill="url(#logo-g)">P</text>
            </svg>
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#18a0a6] bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
              Perennia AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-100 hover:text-white transition-all duration-300 font-medium relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-100 hover:text-white transition-all duration-300 font-medium relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="https://app.perenniaai.com/login"
              className="px-5 py-2.5 text-gray-100 hover:text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Log In
            </Link>
            <Link
              href="https://app.perenniaai.com/register"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 font-semibold"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-all duration-300 text-white"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 bg-black/50 backdrop-blur-xl rounded-xl px-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) =>
                item.href.startsWith('/') ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-100 hover:text-white transition-all duration-300 font-medium py-2 hover:pl-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-100 hover:text-white transition-all duration-300 font-medium py-2 hover:pl-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                <Link
                  href="https://app.perenniaai.com/login"
                  className="text-center px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-300"
                >
                  Log In
                </Link>
                <Link
                  href="https://app.perenniaai.com/register"
                  className="text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
