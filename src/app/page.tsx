'use client';

import React from 'react';
import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';
import { getFeatureFlags } from '@/lib/features';

/**
 * Homepage — Package 2: Complete Implementation
 * 13 sections: Header, Hero, Trust, Journey, Services, HowItWorks, Why, Commercial, Property, Areas, Testimonials, CTA, Footer
 * All sections responsive, accessible, and feature-flag gated
 */
export default function Home() {
  const flags = getFeatureFlags();

  return (
    <>
      {/* SECTION 2: HERO */}
      <section 
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-professional-cleaning.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Professional Cleaning Across West London</h1>
            <p className="text-body-xl mb-md">
              Reliable residential, commercial and property cleaning for homes, landlords, estate agents and businesses across West London.
            </p>
            <p className="text-body-xl mb-lg text-brand-gold font-medium">
              Serving West London and the Heathrow corridor
            </p>
            <p className="text-body mb-2xl">
              Call <a href="tel:07886091926" className="font-semibold hover:underline">07886 091926</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get a Cleaning Estimate
                </Button>
              </a>
              <a href="/contact?enquiry=commercial-survey" className="inline-block">
                <Button variant="ghost" size="lg">
                  Book a Free Site Survey
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUST STRIP */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-navy mb-sm">£5M</div>
              <p className="text-body font-medium">Public Liability Insured</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-navy mb-sm">✓</div>
              <p className="text-body font-medium">Residential & Commercial Cleaning</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-navy mb-sm">Local</div>
              <p className="text-body font-medium">West London Specialists</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-navy mb-sm">✓</div>
              <p className="text-body font-medium">Founder-Led Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CUSTOMER JOURNEY SPLIT */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {/* Residential */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardBody>
                <h3 className="h4 mb-md text-brand-navy">Professional Cleaning for Homes</h3>
                <p className="text-body mb-lg text-grey-600">
                  Professional cleaning for homes, tenants, landlords and busy households.
                </p>
                <ul className="space-y-sm mb-lg text-body-sm">
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Deep cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>End-of-tenancy cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Carpet cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Regular domestic cleaning</span>
                  </li>
                </ul>
                <a href="/residential">
                  <Button variant="secondary" size="sm" className="w-full">
                    Explore Residential Cleaning
                  </Button>
                </a>
              </CardBody>
            </Card>

            {/* Commercial */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardBody>
                <h3 className="h4 mb-md text-brand-navy">Professional Cleaning for Businesses</h3>
                <p className="text-body mb-lg text-grey-600">
                  Reliable cleaning support for offices, retail premises and commercial properties.
                </p>
                <ul className="space-y-sm mb-lg text-body-sm">
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Office cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Retail cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Contract cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Communal-area cleaning</span>
                  </li>
                </ul>
                <a href="/commercial">
                  <Button variant="secondary" size="sm" className="w-full">
                    Explore Commercial Cleaning
                  </Button>
                </a>
              </CardBody>
            </Card>

            {/* Property Professionals */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardBody>
                <h3 className="h4 mb-md text-brand-navy">Cleaning Support for Property Professionals</h3>
                <p className="text-body mb-lg text-grey-600">
                  Responsive cleaning support for estate agents, landlords, property managers and serviced accommodation.
                </p>
                <ul className="space-y-sm mb-lg text-body-sm">
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Property turnovers</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>End-of-tenancy cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Airbnb cleaning</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Multi-property support</span>
                  </li>
                </ul>
                <a href="/contact?enquiry=property-partnership">
                  <Button variant="secondary" size="sm" className="w-full">
                    Partner With Neatedge
                  </Button>
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRIORITY SERVICES */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 text-center mb-2xl text-brand-navy">Priority Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {[
              { title: 'End-of-Tenancy Cleaning', description: 'Professional preparation for new tenants or owners', type: 'Residential' },
              { title: 'Deep Cleaning', description: 'Comprehensive professional-grade deep clean', type: 'Residential' },
              { title: 'Office Cleaning', description: 'Regular or one-off commercial office support', type: 'Commercial' },
              { title: 'Carpet Cleaning', description: 'Professional carpet and upholstery restoration', type: 'Residential' },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardBody className="flex flex-col flex-grow">
                  <h3 className="h4 mb-md text-brand-navy">{service.title}</h3>
                  <p className="text-body-sm mb-md text-grey-600 flex-grow">{service.description}</p>
                  <p className="text-body-sm font-medium text-brand-gold mb-lg">For {service.type}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 text-center mb-2xl text-brand-navy">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-2xl">
            {[
              { step: 1, title: 'Tell Us What You Need', desc: 'Describe your property, cleaning type and requirements' },
              { step: 2, title: 'Receive Your Estimate', desc: 'We review the details and provide a clear quotation' },
              { step: 3, title: 'Confirm the Service', desc: 'Review the estimate and schedule the cleaning date' },
              { step: 4, title: 'We Complete the Job', desc: 'Professional cleaning with clear communication throughout' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center text-h4 font-bold mx-auto mb-md">
                    {item.step}
                  </div>
                  <h3 className="h5 mb-md text-brand-navy">{item.title}</h3>
                  <p className="text-body-sm text-grey-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-grey-light p-lg rounded-lg">
            <p className="text-body text-grey-700 text-center">
              <strong>Note:</strong> Complex work may require photographs, video or a site survey. We do not provide guaranteed final quotations until we've understood your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE NEATEDGE */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 text-center mb-2xl">Why Choose Neatedge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { icon: '✓', title: 'Clear Communication', desc: 'Transparent, responsive communication throughout' },
              { icon: '✓', title: 'Professional Standards', desc: 'Documented cleaning processes and accountability' },
              { icon: '✓', title: 'Residential & Commercial', desc: 'Proven capability across both market sectors' },
              { icon: '✓', title: 'West London Focus', desc: 'Deep local knowledge and established presence' },
              { icon: '✓', title: 'Insurance Coverage', desc: '£5M public liability insurance' },
              { icon: '✓', title: 'Founder-Led', desc: 'Direct accountability and personal oversight' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-md">
                <div className="text-brand-gold text-2xl font-bold flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="h5 mb-sm">{item.title}</h3>
                  <p className="text-body-sm text-grey-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: COMMERCIAL FEATURE */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
            <div>
              <h2 className="text-h2 mb-lg text-brand-navy">Professional Cleaning for West London Businesses</h2>
              <p className="text-body mb-lg text-grey-600">
                Whether you operate an office, retail premises, communal areas or manage commercial properties across West London, our team understands the importance of a clean, professional environment. We provide responsive, reliable cleaning support tailored to business schedules and requirements.
              </p>
              <div className="mb-lg">
                <h3 className="h5 mb-md text-brand-navy">We Support:</h3>
                <ul className="space-y-sm text-body-sm">
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Offices</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Retail premises</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Communal areas</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Property managers</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Commercial properties</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-md">
                <a href="/contact?enquiry=commercial-survey">
                  <Button variant="primary" size="md">
                    Book a Free Site Survey
                  </Button>
                </a>
                <a href="/contact?enquiry=estimate&type=commercial">
                  <Button variant="secondary" size="md">
                    Request a Commercial Quote
                  </Button>
                </a>
              </div>
            </div>
            <div className="bg-grey-light rounded-lg h-80 flex items-center justify-center">
              <p className="text-grey-600">[Professional commercial cleaning image]</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: PROPERTY PROFESSIONAL FEATURE */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
            <div className="lg:order-last bg-grey-300 rounded-lg h-80 flex items-center justify-center">
              <p className="text-grey-600">[Property professional cleaning image]</p>
            </div>
            <div className="lg:order-first">
              <h2 className="text-h2 mb-lg text-brand-navy">Cleaning Support for Property Professionals</h2>
              <p className="text-body mb-lg text-grey-600">
                If you're an estate agent, letting agent, landlord, property manager or run serviced accommodation across West London, responsive, reliable cleaning is essential to your operation. We provide property-specific quotations, consolidated communication and flexible, one-off or recurring cleaning support.
              </p>
              <div className="mb-lg">
                <h3 className="h5 mb-md text-brand-navy">We Support:</h3>
                <ul className="space-y-sm text-body-sm">
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Estate agents</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Letting agents</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Landlords</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Property managers</span>
                  </li>
                  <li className="flex gap-md">
                    <span className="text-brand-gold">•</span>
                    <span>Airbnb and serviced-accommodation operators</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-md">
                <a href="/contact?enquiry=property-partnership">
                  <Button variant="primary" size="md">
                    Discuss a Property Partnership
                  </Button>
                </a>
                <a href="/contact?enquiry=estimate&type=property">
                  <Button variant="secondary" size="md">
                    Get a Property Cleaning Quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: SERVICE AREAS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 text-center mb-sm text-brand-navy">Serving West London and the Heathrow Corridor</h2>
          <p className="text-center text-body mb-2xl text-grey-600">Expanding across West London. Contact us for your area.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
            {['Uxbridge', 'West Drayton', 'Hayes', 'Hillingdon'].map((location, idx) => (
              <a href={`/areas/${location.toLowerCase().replace(' ', '-')}`} key={idx}>
                <Card className="hover:shadow-lg transition-shadow text-center">
                  <CardBody>
                    <h3 className="h5 text-brand-navy mb-md">{location}</h3>
                    <Button variant="secondary" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardBody>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS (FEATURE GATED) */}
      {flags.testimonialsEnabled && (
        <section className="py-3xl bg-grey-light">
          <div className="max-w-container mx-auto px-md">
            <h2 className="text-h2 text-center mb-2xl text-brand-navy">What Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Testimonials will be added when content is verified */}
              <p className="text-center text-grey-600 col-span-full">Testimonials section coming soon.</p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 12: FINAL CTA */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md text-center">
          <h2 className="text-h2 mb-lg">Need Reliable Cleaning Support?</h2>
          <p className="text-body-xl mb-2xl max-w-2xl mx-auto">
            Tell us about your property, premises or cleaning requirements and our team will review the details and get back to you with a quotation or next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center">
            <a href="/contact?enquiry=estimate">
              <Button variant="primary" size="lg">
                Get a Cleaning Estimate
              </Button>
            </a>
            <a href="tel:07886091926">
              <Button variant="ghost" size="lg">
                Call 07886 091926
              </Button>
            </a>
            <a href="/contact?enquiry=commercial-survey">
              <Button variant="ghost" size="lg">
                Book a Free Site Survey
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
