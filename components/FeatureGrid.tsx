export default function FeatureGrid() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Intelligent copilot that automates tasks, prioritizes leads, and provides actionable insights',
      href: '#ai-assistant'
    },
    {
      icon: '📊',
      title: 'Pipeline Management',
      description: 'Track leads from first contact to funded loan with automated status updates',
      href: '#pipeline'
    },
    {
      icon: '🔗',
      title: 'Seamless Integrations',
      description: 'Connect with Microsoft Teams, Outlook, SMS, and calendar for unified communication',
      href: '#integrations'
    },
    {
      icon: '⚡',
      title: 'Task Automation',
      description: 'AI-driven task creation and assignment based on pipeline triggers and deadlines',
      href: '#automation'
    },
    {
      icon: '📧',
      title: 'Email Intelligence',
      description: 'Automatically parse emails to update CRM status and create follow-up tasks',
      href: '#email'
    },
    {
      icon: '📈',
      title: 'Advanced Analytics',
      description: 'Comprehensive scorecards, conversion metrics, and performance tracking',
      href: '#analytics'
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Scale Your Business
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and maximize conversions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-5xl mb-4" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-brand mb-3 group-hover:text-brand-dark transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <a
                href={feature.href}
                className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
              >
                Learn more
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
