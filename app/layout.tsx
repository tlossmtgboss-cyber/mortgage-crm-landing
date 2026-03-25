import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.perenniaai.com'),
  title: {
    default: "Perennia AI — The Mortgage Operating System",
    template: "%s | Perennia AI"
  },
  description: "Everything connected. Everything visible. Everything moving forward. Perennia AI is the mortgage operating system with 20+ specialized AI agents that run your pipeline, track every file, and surface risk before it costs you.",
  keywords: [
    "mortgage operating system",
    "AI mortgage CRM",
    "loan officer CRM",
    "mortgage pipeline management",
    "AI underwriting intelligence",
    "mortgage document automation",
    "call intelligence mortgage",
    "loan pipeline analytics",
    "mortgage workflow engine",
    "AI-powered mortgage platform",
    "mortgage team software",
    "loan officer productivity",
    "mortgage compliance automation",
    "intelligent loan processing",
    "borrower portal mortgage",
    "mortgage SLA tracking",
    "best CRM for loan officers",
    "mortgage broker CRM software",
  ],
  authors: [{ name: "Perennia AI" }],
  creator: "Perennia AI",
  publisher: "Perennia AI",
  applicationName: "Perennia AI",
  category: "Business Software",
  classification: "Mortgage Operating System",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Perennia AI — The Mortgage Operating System",
    description: "20+ specialized AI agents run your pipeline, track every file, and surface risk before it costs you. The operating system for mortgage teams.",
    siteName: "Perennia AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Perennia AI — The Mortgage Operating System",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Perennia AI — The Mortgage Operating System",
    description: "20+ AI agents. One pipeline. Zero blind spots. The operating system for mortgage teams.",
    images: ["/og-image.png"],
    creator: "@PerenniaAI",
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

  alternates: {
    canonical: "/",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@200;300;400;500&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#hero" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
