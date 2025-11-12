export default function Integrations() {
  const integrations = [
    { name: 'Microsoft Graph API', function: 'Email, calendar, and Teams sync', logo: '📧' },
    { name: 'Twilio', function: 'SMS, voice calls, and AI outbound agent', logo: '📞' },
    { name: 'Calendly AI', function: 'Appointment scheduling', logo: '🗓️' },
    { name: 'Encompass / Blend', function: 'Loan origination sync', logo: '🏦' },
    { name: 'Zapier & Make', function: 'Custom automations', logo: '⚡' },
    { name: 'Pinecone + PostgreSQL', function: 'Vector & structured AI memory', logo: '🧠' },
  ];

  return (
    <section id="integrations" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Integrations That Just Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your favorite tools with native integrations, powerful APIs, and Zapier workflows
          </p>
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
            >
              <div className="text-4xl mb-3" aria-hidden="true">{integration.logo}</div>
              <h3 className="font-semibold text-foreground mb-2 text-lg">
                {integration.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {integration.function}
              </p>
            </div>
          ))}
        </div>

        {/* API Section */}
        <div className="bg-gradient-to-r from-brand/10 to-brand-dark/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need a custom integration?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our REST API and webhooks give you complete control. Build custom workflows that fit your exact needs.
          </p>
          <a
            href="/api-docs"
            className="inline-flex items-center px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-lg hover:bg-brand-dark transition-colors"
          >
            View API Documentation
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
