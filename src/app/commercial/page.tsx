'use client';

import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';

/**
 * Commercial Cleaning Page
 * Hub for commercial cleaning services
 * Target: Facilities managers, landlords, property professionals
 */
export default function CommercialPage() {
  const commercialServices = [
    {
      name: 'Office Cleaning',
      description:
        'Professional daily or weekly office cleaning. Keep your workspace clean, professional and hygienic for employees and clients.',
      icon: '🏢',
    },
    {
      name: 'Retail Cleaning',
      description:
        'Specialized retail space cleaning. Clean floors, windows, displays and customer areas to reflect your brand.',
      icon: '🛍️',
    },
    {
      name: 'Contract Cleaning',
      description:
        'Flexible contract cleaning for businesses of all sizes. Customize frequency and scope to match your needs.',
      icon: '📋',
    },
    {
      name: 'Communal Area Cleaning',
      description:
        'Keep shared spaces pristine. Lobbies, reception areas, corridors and communal facilities regularly cleaned.',
      icon: '🚪',
    },
    {
      name: 'Property Manager Support',
      description:
        'Turnover cleans, pre-viewing cleans, and ongoing maintenance for managed properties and portfolios.',
      icon: '🏘️',
    },
    {
      name: 'Airbnb & Serviced Accommodation',
      description:
        'Rapid turnaround cleaning between guests. Professional, thorough, and quick — ready for next arrival.',
      icon: '🛏️',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-commercial.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Professional Commercial Cleaning for West London Businesses</h1>
            <p className="text-body-xl mb-md">
              Reliable office, retail and property cleaning with flexible contracts and transparent pricing.
            </p>
            <p className="text-body mb-2xl">
              Serving facilities managers, landlords, estate agents and property professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <a href="/contact?enquiry=commercial-survey" className="inline-block">
                <Button variant="primary" size="lg">
                  Book a Free Site Survey
                </Button>
              </a>
              <a href="tel:07886091926" className="inline-block">
                <Button variant="ghost" size="lg">
                  Call 07886 091926
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Our Commercial Services</h2>
          <p className="text-body text-grey-600 mb-2xl max-w-2xl">
            From small offices to large commercial complexes, we provide professional cleaning tailored to your business needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {commercialServices.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="text-4xl mb-md">{service.icon}</div>
                  <h3 className="h4 mb-md text-brand-navy">{service.name}</h3>
                  <p className="text-body-sm text-grey-600">{service.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY COMMERCIAL CLIENTS CHOOSE US */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl text-center">Why Commercial Clients Choose Neatedge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <Card className="border border-brand-gold/20">
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Reliable & Consistent</h3>
                <p className="text-body-sm text-grey-600">
                  Professional team committed to on-time delivery and consistent quality. We understand the importance of a well-maintained facility for your business.
                </p>
              </CardBody>
            </Card>
            <Card className="border border-brand-gold/20">
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Flexible Contracts</h3>
                <p className="text-body-sm text-grey-600">
                  Customize frequency, scope and timing to match your business requirements. Daily, weekly, monthly or ad-hoc cleaning available.
                </p>
              </CardBody>
            </Card>
            <Card className="border border-brand-gold/20">
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Transparent Pricing</h3>
                <p className="text-body-sm text-grey-600">
                  Clear pricing with no hidden fees. Bulk and recurring discounts available. Fixed-price contracts for budget certainty.
                </p>
              </CardBody>
            </Card>
            <Card className="border border-brand-gold/20">
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Fully Insured & Professional</h3>
                <p className="text-body-sm text-grey-600">
                  £5M public liability insurance. Professional team trained in commercial standards. Responsive support and account management.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2 text-brand-navy mb-lg">Let's Discuss Your Commercial Cleaning Needs</h2>
            <p className="text-body text-grey-600 mb-2xl">
              Every business is different. We'll visit your site, understand your requirements, and put together a tailored proposal that works for you.
            </p>
            <div className="bg-grey-light p-lg rounded-lg mb-2xl">
              <h3 className="h4 text-brand-navy mb-md">Our Process</h3>
              <ol className="space-y-md">
                <li className="flex gap-md">
                  <span className="font-bold text-brand-gold">1.</span>
                  <span className="text-body"><strong>Site Survey:</strong> We visit your property to understand your needs</span>
                </li>
                <li className="flex gap-md">
                  <span className="font-bold text-brand-gold">2.</span>
                  <span className="text-body"><strong>Proposal:</strong> We provide a detailed quote with custom pricing</span>
                </li>
                <li className="flex gap-md">
                  <span className="font-bold text-brand-gold">3.</span>
                  <span className="text-body"><strong>Agreement:</strong> You approve, we sign a contract</span>
                </li>
                <li className="flex gap-md">
                  <span className="font-bold text-brand-gold">4.</span>
                  <span className="text-body"><strong>Service:</strong> We start on your schedule with professional service</span>
                </li>
              </ol>
            </div>
            <a href="/contact?enquiry=commercial-survey" className="inline-block">
              <Button variant="primary" size="lg">
                Book Your Free Site Survey
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 mb-lg">Ready to Work With Us?</h2>
            <p className="text-body-xl mb-2xl">
              Professional cleaning on your terms. Free site survey and no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <a href="/contact?enquiry=commercial-survey" className="inline-block">
                <Button variant="primary" size="lg">
                  Schedule Site Survey
                </Button>
              </a>
              <a href="tel:07886091926" className="inline-block">
                <Button variant="secondary" size="lg">
                  Call 07886 091926
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
