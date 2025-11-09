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
    default: "Mortgage CRM - AI-Powered CRM for Mortgage Professionals",
    template: "%s | Mortgage CRM"
  },
  description: "Transform your mortgage business with intelligent automation, seamless integrations, and data-driven insights. Close more deals faster with our AI-powered CRM.",
  keywords: ["mortgage CRM", "AI CRM", "loan officer software", "mortgage automation", "pipeline management"],
  authors: [{ name: "Mortgage CRM" }],
  creator: "Mortgage CRM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Mortgage CRM - AI-Powered CRM for Mortgage Professionals",
    description: "Transform your mortgage business with intelligent automation, seamless integrations, and data-driven insights.",
    siteName: "Mortgage CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage CRM - AI-Powered CRM for Mortgage Professionals",
    description: "Transform your mortgage business with intelligent automation, seamless integrations, and data-driven insights.",
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
