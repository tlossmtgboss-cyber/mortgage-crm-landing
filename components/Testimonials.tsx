export default function Testimonials() {
  const testimonials = [
    {
      quote: "This CRM has completely transformed how we manage our pipeline. The AI assistant saves us 10+ hours per week on administrative tasks.",
      name: "Sarah Johnson",
      role: "Senior Loan Officer",
      company: "ABC Lending",
      metric: "+38% demo-to-close rate"
    },
    {
      quote: "The email intelligence feature is a game-changer. No more manual data entry - everything updates automatically.",
      name: "Michael Chen",
      role: "Branch Manager",
      company: "XYZ Mortgage",
      metric: "–46% time-to-first-touch"
    },
    {
      quote: "We've seen a 40% increase in conversion rates since implementing this system. The analytics are incredibly powerful.",
      name: "Emily Davis",
      role: "Regional Director",
      company: "Premier Home Loans",
      metric: "NPS 71"
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Top Mortgage Professionals
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how leading loan officers are transforming their businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-muted p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Quote */}
              <div className="flex-1 mb-6">
                <svg className="w-10 h-10 text-brand mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {testimonial.role}, {testimonial.company}
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  {testimonial.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/case-studies"
            className="inline-flex items-center text-brand font-semibold text-lg hover:text-brand-dark transition-colors"
          >
            Read more case studies
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
