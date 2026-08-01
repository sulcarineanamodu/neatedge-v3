'use client';

import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';

/**
 * About Page
 * Company story, mission, values, credentials
 */
export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative py-12 md:py-16 lg:py-24 text-white overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 31, 63, 0.7), rgba(0, 31, 63, 0.7)), url("/hero-about.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-lg">Professional Cleaning With Local Accountability</h1>
            <p className="text-body-xl mb-md">
              Neatedge is a West London-based professional cleaning company serving residential, commercial, and property professionals.
            </p>
            <p className="text-body mb-2xl">
              We believe in reliability, transparency, and building long-term relationships with our customers.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl items-center">
            <div>
              <h2 className="h2 text-brand-navy mb-lg">Our Story</h2>
              <p className="text-body text-grey-600 mb-md">
                Neatedge was founded to provide professional, reliable cleaning services to West London's residential and commercial sectors. With over 2 years of professional cleaning experience, our founder understood the frustration of finding a trustworthy, quality cleaning service.
              </p>
              <p className="text-body text-grey-600 mb-md">
                Rather than the typical "boom and bust" agency model, we built Neatedge around accountability, professionalism, and long-term customer relationships. We show up, do great work, and build trust.
              </p>
              <p className="text-body text-grey-600">
                Today, Neatedge serves residential customers, commercial clients, estate agents, letting agents, and property managers across West London and the Heathrow corridor.
              </p>
            </div>
            <div className="bg-grey-light rounded-lg p-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-lg">🧹</div>
                <p className="text-body-sm text-grey-600">Professional cleaning across West London since 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">🤝</div>
                <h3 className="h5 text-brand-navy mb-md">Reliability</h3>
                <p className="text-body-sm text-grey-600">
                  We show up on time, do what we promise, and deliver consistent quality every time.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">💎</div>
                <h3 className="h5 text-brand-navy mb-md">Professionalism</h3>
                <p className="text-body-sm text-grey-600">
                  High standards, professional behavior, and attention to detail in every job.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">💰</div>
                <h3 className="h5 text-brand-navy mb-md">Transparency</h3>
                <p className="text-body-sm text-grey-600">
                  Clear pricing, honest communication, and no hidden fees or surprises.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="text-4xl mb-md">🌱</div>
                <h3 className="h5 text-brand-navy mb-md">Community</h3>
                <p className="text-body-sm text-grey-600">
                  Building relationships with customers and supporting the local West London community.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* CREDENTIALS & TRUST */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl">Why You Can Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Fully Insured</h3>
                <p className="text-body-sm text-grey-600">
                  £5M public liability insurance with Simply Business. Certificate CHBS5518848XB, expires 23 April 2027.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">🏢</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Registered Company</h3>
                <p className="text-body-sm text-grey-600">
                  Neatedge Cleaning Limited, Companies House registration 14909903.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">👥</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Professional Team</h3>
                <p className="text-body-sm text-grey-600">
                  Professional cleaners with 2+ years of industry experience. Founder-led, accountable service.
                </p>
              </div>
            </div>
            <div className="flex gap-lg">
              <div className="text-3xl flex-shrink-0">⭐</div>
              <div>
                <h3 className="h5 text-brand-navy mb-md">Track Record</h3>
                <p className="text-body-sm text-grey-600">
                  Serving residential, commercial and property-professional clients across West London.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-2xl">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            <Card>
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Residential Cleaning</h3>
                <p className="text-body-sm text-grey-600">
                  Deep cleans, end-of-tenancy, move-in/move-out, carpet cleaning, and regular maintenance.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Commercial Cleaning</h3>
                <p className="text-body-sm text-grey-600">
                  Office, retail, contract cleaning, communal areas, and property-manager support.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3 className="h5 text-brand-navy mb-md">Partnership Services</h3>
                <p className="text-body-sm text-grey-600">
                  Dedicated support for estate agents, letting agents, and property professionals.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="h2 text-brand-navy mb-lg">Service Areas</h2>
          <p className="text-body text-grey-600 mb-2xl">
            We specialize in West London and the Heathrow corridor. Our primary service areas include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-2xl">
            <div className="text-center p-lg border border-grey-300 rounded-lg">
              <h3 className="h5 text-brand-navy mb-md">Uxbridge</h3>
              <p className="text-body-sm text-grey-600">Local hub with strong commercial presence</p>
            </div>
            <div className="text-center p-lg border border-grey-300 rounded-lg">
              <h3 className="h5 text-brand-navy mb-md">West Drayton</h3>
              <p className="text-body-sm text-grey-600">Growing commercial and residential sector</p>
            </div>
            <div className="text-center p-lg border border-grey-300 rounded-lg">
              <h3 className="h5 text-brand-navy mb-md">Hayes</h3>
              <p className="text-body-sm text-grey-600">Diverse commercial and residential mix</p>
            </div>
            <div className="text-center p-lg border border-grey-300 rounded-lg">
              <h3 className="h5 text-brand-navy mb-md">Hillingdon</h3>
              <p className="text-body-sm text-grey-600">Residential and commercial opportunity</p>
            </div>
          </div>
          <p className="text-body-sm text-grey-600">
            <a href="/areas" className="font-medium text-brand-navy hover:text-brand-gold">View all service areas →</a>
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="h2 mb-lg">Ready to Experience Professional Cleaning?</h2>
            <p className="text-body-xl mb-2xl">
              Whether residential, commercial, or partnership, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get a Free Estimate
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
