'use client';

import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';

/**
 * Areas We Cover Page
 * Location hub for West London service areas
 * Target: Local customers in West London
 */
export default function AreasPage() {
  const areas = [
    {
      name: 'Uxbridge',
      description:
        'Our local hub. Professional cleaning services for residential, commercial and property professionals in Uxbridge and surrounding areas.',
      highlights: ['Town center & commercial area', 'Residential neighborhoods', 'Estate agent & property network'],
      icon: '🏢',
    },
    {
      name: 'Hayes',
      description:
        'Diverse commercial and residential community. We serve offices, retail, homes and landlords across Hayes.',
      highlights: ['Mixed commercial & residential', 'Strong business community', 'Growing residential demand'],
      icon: '🏭',
    },
    {
      name: 'West Drayton',
      description:
        'Growing commercial sector with strong transport links. Professional cleaning for businesses and homes.',
      highlights: ['Commercial hubs', 'Transport connectivity', 'Residential properties'],
      icon: '🚛',
    },
    {
      name: 'Hillingdon',
      description:
        'Residential and commercial mix. Professional cleaning for families, landlords, and business owners.',
      highlights: ['Family neighborhoods', 'Landlord & letting agents', 'Commercial properties'],
      icon: '🏡',
    },
  ];

  const services = [
    'Residential deep cleaning',
    'End-of-tenancy cleaning',
    'Move-in/move-out cleaning',
    'Commercial office cleaning',
    'Property-professional services',
    'Carpet & upholstery cleaning',
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-areas.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Cleaning Services Across West London</h1>
            <p className="text-body-xl mb-md">
              Professional residential, commercial, and property cleaning across Uxbridge, Hayes, West Drayton, Hillingdon and beyond.
            </p>
            <p className="text-body mb-2xl">
              Local specialists serving West London and the Heathrow corridor.
            </p>
            <a href="/contact?enquiry=estimate" className="inline-block">
              <Button variant="primary" size="lg">
                Get Local Estimate
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* PRIMARY SERVICE AREAS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Our Primary Service Areas</h2>
          <p className="text-body text-grey-600 mb-2xl max-w-2xl">
            We focus on West London's key commercial and residential hubs. These are our primary service areas with rapid response times.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {areas.map((area, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="text-4xl mb-md">{area.icon}</div>
                  <h3 className="h3 mb-md text-brand-navy">{area.name}</h3>
                  <p className="text-body-sm text-grey-600 mb-lg">{area.description}</p>
                  <div className="mb-lg">
                    {area.highlights.map((highlight, hidx) => (
                      <div key={hidx} className="flex gap-md text-body-sm mb-sm">
                        <span className="text-brand-gold">✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/contact?enquiry=estimate" className="text-brand-navy font-medium hover:text-brand-gold transition-colors">
                    Get {area.name} Estimate →
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EXPANDED COVERAGE */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Expanded Service Coverage</h2>
          <p className="text-body text-grey-600 mb-2xl max-w-2xl">
            Beyond our primary hubs, we also serve:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {[
              'Ruislip',
              'Eastcote',
              'Stanmore',
              'Wembley',
              'Alperton',
              'Acton',
              'Ealing',
              'Harrow',
              'Pinner',
            ].map((location, idx) => (
              <div key={idx} className="p-lg border border-grey-300 rounded-lg bg-white text-center">
                <p className="text-body font-medium text-brand-navy">{location}</p>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-grey-600 mt-lg">
            Not in the list? Call us on <strong>07886 091926</strong> to discuss coverage for your location.
          </p>
        </div>
      </section>

      {/* SERVICES AVAILABLE */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Services Available in All Areas</h2>
          <p className="text-body text-grey-600 mb-2xl">
            Wherever you are in West London, we provide professional cleaning across all our service categories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {services.map((service, idx) => (
              <div key={idx} className="flex gap-lg">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <p className="text-body font-medium text-brand-navy">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY LOCAL MATTERS */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl text-center">Why Choose Your Local Cleaner?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">⚡</div>
                <h3 className="h5 text-brand-navy mb-md">Faster Response</h3>
                <p className="text-body-sm text-grey-600">
                  Local presence means quicker response times and easier coordination for urgent jobs.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">🤝</div>
                <h3 className="h5 text-brand-navy mb-md">Local Understanding</h3>
                <p className="text-body-sm text-grey-600">
                  We know West London neighborhoods, property types, and community standards.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">💼</div>
                <h3 className="h5 text-brand-navy mb-md">Accountability</h3>
                <p className="text-body-sm text-grey-600">
                  We're part of your local community. Direct relationships and reputation matter.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* COVERAGE MAP NOTE */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md max-w-2xl">
          <h2 className="h2 text-brand-navy mb-lg">Can't Find Your Area?</h2>
          <p className="text-body text-grey-600 mb-2xl">
            If your location isn't listed, don't worry. We may still be able to help.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-lg rounded mb-lg">
            <p className="text-body text-blue-900">
              <strong>Call us on 07886 091926</strong> to discuss whether we can cover your location. We often expand our service area based on customer demand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 mb-lg">Ready to Book Your Local Cleaner?</h2>
            <p className="text-body-xl mb-2xl">
              Professional cleaning across West London. Get your free estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get Your Free Estimate
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
