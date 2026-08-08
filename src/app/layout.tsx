import type { Metadata } from 'next';
import React from 'react';
import Header from '@/components/Header';
import StagingBanner from '@/components/StagingBanner';
import ChatbotPanel from '@/components/ChatbotPanel';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';
import { getRobotsObject } from '@/lib/environment';
import '@/styles/globals.css';

const seoMetadata = generateSeoMetadata();

export const metadata: Metadata = {
  title: seoMetadata.title,
  description: seoMetadata.description,
  alternates: {
    canonical: seoMetadata.canonical,
  },
  robots: getRobotsObject() as any,
  openGraph: {
    title: seoMetadata.title,
    description: seoMetadata.description,
    url: seoMetadata.canonical,
    images: seoMetadata.ogImage ? [{ url: seoMetadata.ogImage }] : [],
    type: (seoMetadata.ogType as 'website') || 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: seoMetadata.ogImage ? [seoMetadata.ogImage] : [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#001F3F" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-grey-700">
        <StagingBanner />
        <Header />
        <main className="flex-grow">{children}</main>
        <ChatbotPanel />
      </body>
    </html>
  );
}
