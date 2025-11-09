export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Capture',
      description: 'Automatically capture leads from all sources — web forms, emails, calls, and referrals. AI instantly enriches profiles with relevant data.',
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: 'Qualify',
      description: 'AI scores and prioritizes leads based on conversion likelihood, engagement history, and loan readiness. Focus on what matters.',
      color: 'bg-purple-500'
    },
    {
      step: 3,
      title: 'Automate',
      description: 'Trigger personalized nurture sequences, task assignments, and follow-ups automatically. Keep deals moving forward 24/7.',
      color: 'bg-pink-500'
    },
    {
      step: 4,
      title: 'Win',
      description: 'Close more deals faster with real-time insights, automated scheduling, and seamless handoffs. Track every success.',
      color: 'bg-green-500'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your mortgage business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-green-500 opacity-20" aria-hidden="true" />

          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Step number badge */}
              <div className={`w-12 h-12 ${item.color} text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 mx-auto lg:mx-0 relative z-10`}>
                {item.step}
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/demo"
            className="inline-flex items-center px-8 py-4 bg-brand text-brand-foreground font-semibold text-lg rounded-lg hover:bg-brand-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            See it in action
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
