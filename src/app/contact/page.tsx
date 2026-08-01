'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

/**
 * Contact Landing Page - Content
 * Handles enquiry type routing with useSearchParams
 */
function ContactContent() {
  const searchParams = useSearchParams();
  const enquiry = searchParams.get('enquiry') || 'estimate';

  const enquiries: Record<string, { title: string; description: string }> = {
    estimate: {
      title: 'Get a Cleaning Estimate',
      description: 'Tell us about your cleaning needs and we\'ll provide a detailed quotation.',
    },
    'commercial-survey': {
      title: 'Book a Free Site Survey',
      description: 'Schedule a free site visit for commercial properties. Our team will assess your needs and discuss options.',
    },
    'property-partnership': {
      title: 'Partner With Neatedge',
      description: 'Let\'s discuss how we can support your property management or real estate business.',
    },
  };

  const selected = enquiries[enquiry] || enquiries.estimate;

  if (!selected) {
    return (
      <main className="flex-grow">
        <section className="py-3xl">
          <div className="max-w-2xl mx-auto px-md">
            <h1 className="text-h2 mb-lg text-brand-navy">Get in Touch</h1>
            <p className="text-body text-grey-600">Error: Invalid enquiry type</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <section className="py-3xl">
        <div className="max-w-2xl mx-auto px-md">
          <h1 className="text-h2 mb-lg text-brand-navy">Get in Touch</h1>

          <div className="mb-2xl">
            <h2 className="text-h3 mb-md text-brand-navy">{selected.title}</h2>
            <p className="text-body mb-lg text-grey-600">{selected.description}</p>
          </div>

          <div className="bg-grey-light rounded-lg p-lg mb-2xl">
            <h3 className="h4 mb-md text-brand-navy">Contact Us Directly</h3>
            <p className="text-body mb-md">
              Call us now to discuss your requirements:
            </p>
            <a href="tel:07886091926" className="inline-block mb-lg">
              <Button variant="primary" size="lg">
                Call 07886 091926
              </Button>
            </a>
            <p className="text-body mb-md">
              Or send us an email:
            </p>
            <a href="mailto:info@neatedgecleaning.com" className="inline-block">
              <Button variant="secondary" size="lg">
                Email info@neatedgecleaning.com
              </Button>
            </a>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-lg rounded">
            <p className="text-body text-blue-900">
              <strong>Full enquiry form coming soon.</strong> For now, please call or email us with your details, including the type of cleaning required, property size, location, and your preferred date.
            </p>
          </div>

          <div className="mt-2xl">
            <a href="/">
              <Button variant="secondary" size="md">
                Back to Homepage
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Contact Landing Page
 * Simple contact page with enquiry type routing
 * Full contact form coming in Package 5
 */
export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading contact page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
