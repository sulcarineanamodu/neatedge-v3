'use client';

import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';

/**
 * Property Professionals Landing Page
 * Hub for estate agents, letting agents, property managers
 * Target: Estate agents, letting agents, property managers, landlords
 */
export default function PropertyProfessionalsPage() {
  const solutions = [
    {
      title: 'For Estate Agents',
      description:
        'Market-ready presentations with before-viewing cleans and property preparation. Fast turnarounds for viewings.',
      benefits: [
        'Before-viewing deep cleans',
        'Quick turnaround between viewings',
        'Professional presentation',
        'Dedicated account support',
      ],
      icon: '🏠',
    },
    {
      title: 'For Letting Agents',
      description:
        'End-of-tenancy cleans, move-in prep, and ongoing maintenance. Ensure properties meet standards between tenants.',
      benefits: [
        'End-of-tenancy deep clean',
        'Move-in preparation',
        'Inspection cleans',
        'Regular maintenance cleaning',
      ],
      icon: '📋',
    },
    {
      title: 'For Property Managers',
      description:
        'Recurring schedules for managed portfolios. Communal area cleaning, turnover support, and maintenance.',
      benefits: [
        'Recurring maintenance schedule',
        'Communal area cleaning',
        'Tenant turnover support',
        'Flexible contract terms',
      ],
      icon: '🔑',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-property-professionals.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Cleaning Support for Property Professionals</h1>
            <p className="text-body-xl mb-md">
              Professional cleaning and garden solutions for estate agents, letting agents, and property managers across West London.
            </p>
            <p className="text-body mb-2xl">
              Flexible contracts, bulk discounts, and dedicated support for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <a href="/contact?enquiry=property-partnership" className="inline-block">
                <Button variant="primary" size="lg">
                  Become a Partner
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

      {/* DEDICATED SOLUTIONS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl">Dedicated Solutions for Property Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {solutions.map((solution, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="text-4xl mb-md">{solution.icon}</div>
                  <h3 className="h4 mb-md text-brand-navy">{solution.title}</h3>
                  <p className="text-body-sm text-grey-600 mb-lg">{solution.description}</p>
                  <div className="space-y-sm">
                    {solution.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="flex gap-md text-body-sm">
                        <span className="text-brand-gold">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP BENEFITS */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl text-center">Why Partner With Neatedge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Fast Turnarounds</h3>
                <p className="text-body-sm text-grey-600">
                  Quick-response cleaning for properties between tenants or for viewings. Same-day options available.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">💰</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Bulk & Recurring Discounts</h3>
                <p className="text-body-sm text-grey-600">
                  Special pricing for property professionals managing multiple properties or recurring cleans.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">📊</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Documented Completion</h3>
                <p className="text-body-sm text-grey-600">
                  Photos and reports included with every job. Professional documentation for your records.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">🤝</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Dedicated Support</h3>
                <p className="text-body-sm text-grey-600">
                  Direct communication with the team. Flexible scheduling and responsive to urgent requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GARDEN & OUTDOOR SERVICES */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Bonus: Garden & Outdoor Services</h2>
          <p className="text-body text-grey-600 mb-2xl max-w-3xl">
            We also offer garden and outdoor maintenance for managed properties. Keep gardens tidy for viewings, manage seasonal maintenance, and provide ongoing landscaping support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <Card>
              <CardBody>
                <h4 className="h5 text-brand-navy mb-md">Garden Tidy-Ups</h4>
                <p className="text-body-sm text-grey-600">
                  Quick garden refresh before viewings. Lawn tidy, edges trimmed, leaves cleared.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h4 className="h5 text-brand-navy mb-md">Seasonal Garden Care</h4>
                <p className="text-body-sm text-grey-600">
                  Recurring seasonal maintenance. Spring tidy-up, summer maintenance, autumn leaf clearing.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h4 className="h5 text-brand-navy mb-md">Lawn Maintenance</h4>
                <p className="text-body-sm text-grey-600">
                  Regular lawn mowing and garden maintenance for managed properties.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PROCESS */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2 text-brand-navy mb-lg">How Partnership Works</h2>
            <div className="space-y-lg">
              <div className="flex gap-lg">
                <div className="text-4xl font-bold text-brand-gold flex-shrink-0">1</div>
                <div>
                  <h3 className="h5 text-brand-navy mb-md">Initial Discussion</h3>
                  <p className="text-body-sm text-grey-600">
                    We discuss your business, properties, volumes, and requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-lg">
                <div className="text-4xl font-bold text-brand-gold flex-shrink-0">2</div>
                <div>
                  <h3 className="h5 text-brand-navy mb-md">Tailored Proposal</h3>
                  <p className="text-body-sm text-grey-600">
                    We provide custom pricing, contract terms, and service levels for your needs.
                  </p>
                </div>
              </div>
              <div className="flex gap-lg">
                <div className="text-4xl font-bold text-brand-gold flex-shrink-0">3</div>
                <div>
                  <h3 className="h5 text-brand-navy mb-md">Agreement & Setup</h3>
                  <p className="text-body-sm text-grey-600">
                    Sign contract, establish communication channels, and schedule first jobs.
                  </p>
                </div>
              </div>
              <div className="flex gap-lg">
                <div className="text-4xl font-bold text-brand-gold flex-shrink-0">4</div>
                <div>
                  <h3 className="h5 text-brand-navy mb-md">Ongoing Partnership</h3>
                  <p className="text-body-sm text-grey-600">
                    Professional service, responsive support, and dedicated account management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 text-brand-navy mb-lg">Let's Build a Partnership</h2>
            <p className="text-body text-grey-600 mb-2xl">
              Professional cleaning on your terms. Custom pricing, flexible contracts, dedicated support.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <a href="/contact?enquiry=property-partnership" className="inline-block">
                <Button variant="primary" size="lg">
                  Schedule Partnership Call
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
