import Link from 'next/link';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', url: '#features' },
        { label: 'Pricing', url: '#pricing' },
        { label: 'Integrations', url: '#integrations' },
        { label: 'Security', url: '/security' },
        { label: 'API Docs', url: '/api-docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Documentation', url: '/docs' },
        { label: 'Help Center', url: '/help' },
        { label: 'Community', url: '/community' },
        { label: 'Status', url: '/status' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookie Policy', url: '/cookies' },
      ]
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: '⚙️', url: 'https://github.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-2xl" aria-hidden="true">🏠</span>
              <span>Mortgage CRM</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              AI-powered CRM for mortgage professionals
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-2xl hover:text-brand transition-colors"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="text-gray-400 hover:text-brand transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2 text-white">Stay updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest mortgage industry insights and product updates
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mortgage CRM. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-brand transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-brand transition-colors">Terms</a>
            <a href="/cookies" className="hover:text-brand transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
