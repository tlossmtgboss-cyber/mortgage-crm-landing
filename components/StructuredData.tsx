/**
 * Structured Data (JSON-LD) for SEO and AI Search Engines
 * This component provides rich metadata for search engines to better understand
 * our product, features, and organization.
 */

export default function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mortgage CRM",
    "description": "AI-Powered CRM platform built specifically for mortgage professionals, loan officers, and mortgage teams",
    "url": "https://mortgage-crm-production-7a9a.up.railway.app",
    "logo": "https://mortgage-crm-production-7a9a.up.railway.app/logo.png",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "info@mortgagecrm.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/MortgageCRM",
      "https://linkedin.com/company/mortgage-crm"
    ]
  };

  // SoftwareApplication Schema - Critical for AI understanding
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mortgage CRM",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "CRM Software",
    "operatingSystem": "Web Browser, Cloud-based",
    "description": "AI-powered Customer Relationship Management (CRM) platform designed specifically for mortgage professionals. Features include AI underwriting, smart lead routing, automated SMS follow-ups, pipeline management, document management, and real-time analytics.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "description": "14-day free trial, no credit card required"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI-powered underwriting and pre-qualification",
      "Intelligent lead routing and assignment",
      "Automated SMS and email follow-ups",
      "Real-time pipeline management",
      "Advanced analytics and reporting",
      "Document management and compliance tracking",
      "Team collaboration tools",
      "Integration with Microsoft Teams, Outlook, and SMS",
      "Customizable workflow automation",
      "Mobile-responsive dashboard"
    ],
    "screenshot": "https://mortgage-crm-production-7a9a.up.railway.app/screenshot.png",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-15",
    "author": {
      "@type": "Organization",
      "name": "Mortgage CRM"
    }
  };

  // WebSite Schema with Sitelinks Search Box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mortgage CRM",
    "url": "https://mortgage-crm-production-7a9a.up.railway.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mortgage-crm-production-7a9a.up.railway.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Product Schema - Alternative representation
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Mortgage CRM - AI-Powered Platform for Loan Officers",
    "description": "Complete mortgage CRM solution with AI underwriting, smart lead routing, automated communications, and real-time analytics. Built for loan officers, mortgage brokers, and lending teams.",
    "brand": {
      "@type": "Brand",
      "name": "Mortgage CRM"
    },
    "category": "CRM Software for Mortgage Industry",
    "offers": {
      "@type": "Offer",
      "url": "https://mortgage-crm-production-7a9a.up.railway.app/register",
      "priceCurrency": "USD",
      "price": "0",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "description": "Start with a 14-day free trial"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Mortgage Professionals, Loan Officers, Mortgage Brokers, Lending Teams"
    }
  };

  // FAQ Schema - Helps AI answer questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Mortgage CRM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mortgage CRM is an AI-powered customer relationship management platform built specifically for mortgage professionals, loan officers, and mortgage teams. It features AI underwriting, smart lead routing, automated SMS follow-ups, pipeline management, and real-time analytics to help close more loans faster."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI underwriting work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI underwriting feature automatically analyzes borrower data, runs multiple loan scenarios, and provides instant pre-qualification decisions. It uses machine learning to identify the best loan products for each borrower and flags potential issues early in the process."
        }
      },
      {
        "@type": "Question",
        "name": "What integrations does Mortgage CRM support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mortgage CRM integrates seamlessly with Microsoft Teams, Outlook, SMS messaging (Twilio), calendar systems, and email platforms. All communications sync automatically to keep your CRM data current."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free trial?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer a 14-day free trial with full access to all features. No credit card is required to start your trial, and you can cancel anytime."
        }
      },
      {
        "@type": "Question",
        "name": "Who should use Mortgage CRM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mortgage CRM is designed for loan officers, mortgage brokers, lending teams, mortgage processors, and anyone in the mortgage industry looking to automate workflows, manage leads more effectively, and close more loans."
        }
      },
      {
        "@type": "Question",
        "name": "How much does Mortgage CRM cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible pricing plans for individuals and teams. Start with our free 14-day trial to experience all features. Contact our sales team for custom enterprise pricing."
        }
      }
    ]
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "CRM Software for Mortgage Industry",
    "provider": {
      "@type": "Organization",
      "name": "Mortgage CRM"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mortgage CRM Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Underwriting",
            "description": "Automated borrower analysis and pre-qualification with AI"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Smart Lead Routing",
            "description": "AI-powered lead distribution based on expertise and capacity"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SMS Automation",
            "description": "Automated follow-ups and appointment reminders via SMS"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pipeline Management",
            "description": "Real-time tracking from lead to funded loan"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
