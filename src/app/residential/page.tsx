'use client';

import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';

/**
 * Residential Cleaning Page
 * Hub for residential cleaning services
 * Target: Homeowners, landlords, tenants
 */
export default function ResidentialPage() {
  const residentialServices = [
    {
      name: 'End-of-Tenancy Cleaning',
      description:
        'Professional move-out cleaning for landlords, tenants and letting agents. Deep clean every surface.',
      icon: '🔑',
    },
    {
      name: 'Deep Cleaning',
      description:
        'Intensive deep clean for homes and apartments. We clean every corner including behind appliances.',
      icon: '✨',
    },
    {
      name: 'Move-In Cleaning',
      description:
        'New home preparation. Clean and prepare your property before moving in.',
      icon: '🏡',
    },
    {
      name: 'Carpet Cleaning',
      description:
        'Professional carpet and upholstery cleaning using specialist equipment.',
      icon: '🧹',
    },
    {
      name: 'After-Builders Cleaning',
      description:
        'Post-construction clean-up for newly built or renovated homes.',
      icon: '🏗️',
    },
    {
      name: 'Regular Maintenance Cleaning',
      description:
        'Ongoing fortnightly or weekly cleaning to keep your home fresh and tidy.',
      icon: '📅',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-residential.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Professional Residential Cleaning Across West London</h1>
            <p className="text-body-xl mb-md">
              Reliable deep cleaning, move-in/move-out, and regular maintenance for homes, apartments, and landlords.
            </p>
            <p className="text-body mb-2xl">
              £60–£150 per room or fixed-price packages. Free quote in 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get a Residential Estimate
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
          <h2 className="h2 text-brand-navy mb-lg">Our Residential Services</h2>
          <p className="text-body text-grey-600 mb-2xl max-w-2xl">
            We offer a complete range of residential cleaning services tailored to your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {residentialServices.map((service, idx) => (
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

      {/* WHY CHOOSE US */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl text-center">Why Choose Neatedge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <div className="text-center">
              <div className="text-4xl mb-md">✅</div>
              <h3 className="h5 mb-md text-brand-navy">Fully Insured</h3>
              <p className="text-body-sm text-grey-600">
                £5M public liability insurance
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-md">⚡</div>
              <h3 className="h5 mb-md text-brand-navy">24-Hour Quotes</h3>
              <p className="text-body-sm text-grey-600">
                Free estimate within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-md">🎯</div>
              <h3 className="h5 mb-md text-brand-navy">Reliable Service</h3>
              <p className="text-body-sm text-grey-600">
                Professional cleaners who show up on time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-md">💰</div>
              <h3 className="h5 mb-md text-brand-navy">Transparent Pricing</h3>
              <p className="text-body-sm text-grey-600">
                No hidden fees, clear pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 text-brand-navy mb-lg">Ready to Experience Professional Cleaning?</h2>
            <p className="text-body text-grey-600 mb-2xl">
              Get your free estimate today. No obligation, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get Your Free Estimate
                </Button>
              </a>
              <a href="tel:07886091926" className="inline-block">
                <Button variant="secondary" size="lg">
                  Call for Immediate Advice
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
