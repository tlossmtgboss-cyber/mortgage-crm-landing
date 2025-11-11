import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "AI-Powered Mortgage CRM | Close More Loans 40% Faster",
    template: "%s | Mortgage CRM"
  },
  description: "The only CRM built for modern mortgage teams. AI underwriting, smart lead routing, automated SMS follow-ups, and real-time analytics. Trusted by 500+ loan officers processing $2B+ in loans. Start your 14-day free trial - no credit card required.",
  keywords: [
    // Primary Keywords
    "mortgage CRM software",
    "AI mortgage CRM",
    "loan officer CRM",
    "mortgage automation software",

    // Feature-based Keywords
    "AI underwriting software",
    "mortgage lead management",
    "loan pipeline management",
    "mortgage SMS automation",
    "loan officer productivity tools",

    // Long-tail Keywords
    "best CRM for loan officers",
    "mortgage broker CRM software",
    "automated mortgage workflow",
    "mortgage team collaboration software",
    "real estate loan management system",

    // AI Search Keywords
    "AI-powered mortgage platform",
    "intelligent loan processing",
    "automated borrower communication",
    "mortgage analytics dashboard"
  ],
  authors: [{ name: "Mortgage CRM Team" }],
  creator: "Mortgage CRM",
  publisher: "Mortgage CRM",
  applicationName: "Mortgage CRM",
  category: "Business Software",
  classification: "CRM Software for Mortgage Industry",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AI-Powered Mortgage CRM | Close More Loans 40% Faster",
    description: "The only CRM built for modern mortgage teams. AI underwriting, smart lead routing, and automated follow-ups. Trusted by 500+ loan officers. Start free trial today.",
    siteName: "Mortgage CRM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mortgage CRM - AI-Powered Platform for Loan Officers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Mortgage CRM | Close More Loans 40% Faster",
    description: "AI underwriting, smart lead routing, automated SMS. Trusted by 500+ loan officers processing $2B+ in loans. 14-day free trial.",
    images: ["/og-image.png"],
    creator: "@MortgageCRM",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Additional metadata for AI search engines
  alternates: {
    canonical: "/",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      me: ["info@mortgagecrm.com"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
