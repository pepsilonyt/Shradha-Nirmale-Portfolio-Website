import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/scroll-progress';
import { FAQS } from '@/lib/constants';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shradha N. | Learning Strategist & English Educator',
  description: 'Premium English coaching for CELPIP, Duolingo English Test (DET), and Corporate Communication. Isolate your exact English bottleneck and fast-track your scores and career.',
  keywords: [
    'English Coach',
    'CELPIP Tutor',
    'Duolingo English Test Prep',
    'Corporate English Coaching',
    'Learning Strategist',
    'English Language Coach',
    'CELPIP Band 9',
    'English bottlenecks',
  ],
  authors: [{ name: 'Shradha Nirmale' }],
  creator: 'Shradha Nirmale',
  openGraph: {
    title: 'Shradha N. | Learning Strategist & English Educator',
    description: 'Premium English coaching for CELPIP, Duolingo English Test, and Corporate Communication.',
    url: 'https://shradhanirmale.com',
    siteName: 'Shradha N. English Strategy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shradha N. | Learning Strategist & English Educator',
    description: 'Isolate your exact English bottleneck and fast-track your scores and career.',
  },
  metadataBase: new URL('https://shradhanirmale.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Shradha Nirmale',
    'jobTitle': 'Learning Strategist & English Educator',
    'url': 'https://shradhanirmale.com',
    'sameAs': ['https://www.linkedin.com/in/shradhanirmale/'],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Diagnostics Auditing & Premium English Coaching',
    'provider': {
      '@type': 'Person',
      'name': 'Shradha Nirmale',
    },
    'description': 'High-converting personalized coaching program for CELPIP, Duolingo English Test, and Corporate Professional Communication.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'description': 'Free 2-minute diagnostic bottleneck audit consultation',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQS.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full font-sans antialiased text-foreground bg-white flex flex-col">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
