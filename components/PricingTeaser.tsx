export default function PricingTeaser() {
  const tiers = [
    {
      name: 'Starter',
      price: 99,
      unit: '/month',
      badge: null,
      bullets: [
        'Up to 5 team members',
        '1,000 leads/month',
        'Basic AI assistant',
        'Email support',
        'Core integrations'
      ],
      ctaLabel: 'Get Started',
      ctaUrl: '/register?plan=starter'
    },
    {
      name: 'Professional',
      price: 199,
      unit: '/month',
      badge: 'Most Popular',
      bullets: [
        'Up to 15 team members',
        'Unlimited leads',
        'Advanced AI assistant',
        'Priority support',
        'All integrations',
        'Custom workflows'
      ],
      ctaLabel: 'Start Free Trial',
      ctaUrl: '/register?plan=professional'
    },
    {
      name: 'Scale',
      price: 'Custom',
      unit: '',
      badge: null,
      bullets: [
        'Unlimited team members',
        'Unlimited everything',
        'Dedicated AI training',
        'White-glove support',
        'Custom integrations',
        'SLA guarantee'
      ],
      ctaLabel: 'Contact Sales',
      ctaUrl: '/contact-sales'
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 ${
                tier.badge
                  ? 'border-2 border-brand shadow-xl scale-105 relative'
                  : 'border border-gray-200 shadow-sm'
              } transition-all duration-300 hover:shadow-lg flex flex-col`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand text-brand-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  {tier.badge}
                </div>
              )}

              {/* Tier name */}
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-8">
                {typeof tier.price === 'number' ? (
                  <>
                    <span className="text-5xl font-bold text-brand">${tier.price}</span>
                    <span className="text-muted-foreground text-lg">{tier.unit}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-brand">{tier.price}</span>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-4 mb-8">
                {tier.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.ctaUrl}
                className={`block text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  tier.badge
                    ? 'bg-brand text-brand-foreground hover:bg-brand-dark hover:shadow-md'
                    : 'border-2 border-brand text-brand hover:bg-brand hover:text-brand-foreground'
                }`}
              >
                {tier.ctaLabel}
              </a>

              {/* Trial note */}
              {tier.badge && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  14-day free trial included
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-muted-foreground mt-12">
          All plans include automatic upgrades, cancel anytime, no hidden fees
        </p>
      </div>
    </section>
  );
}
