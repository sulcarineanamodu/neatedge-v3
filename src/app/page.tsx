'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Card, { CardBody } from '@/components/Card';
import { getFeatureFlags } from '@/lib/features';

/**
 * Premium Homepage — Neatedge
 * Cinematic design, professional imagery, premium interactions
 * 70% cleaning company | 20% luxury property brand | 10% modern tech
 */
export default function Home() {
  const flags = getFeatureFlags();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* PREMIUM STICKY HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-md h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl">
            <span className={scrolled ? 'text-brand-navy' : 'text-white'}>Neatedge</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-2xl">
            {['Residential', 'Commercial', 'Property Professionals', 'Areas', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-body font-medium transition-colors hover:text-brand-gold ${
                  scrolled ? 'text-brand-navy' : 'text-white'
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-md">
            <a href="tel:07886091926" className={`font-medium transition-colors ${
              scrolled ? 'text-brand-navy hover:text-brand-gold' : 'text-white hover:text-brand-gold'
            }`}>
              📞 07886 091926
            </a>
            <a href="/contact?enquiry=estimate">
              <Button variant={scrolled ? "primary" : "ghost"} size="sm">
                Get Estimate
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image-hero.png"
            alt="Professional cleaning team at work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/60 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 max-w-container mx-auto px-md text-white">
          <div className="max-w-3xl">
            <div className="mb-md text-brand-gold font-semibold uppercase tracking-wide">
              Professional Cleaning • West London
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-lg leading-tight">
              Professional Cleaning,
              <br />
              <span className="text-brand-gold">Delivered Properly</span>
            </h1>
            <p className="text-xl md:text-2xl mb-lg max-w-2xl text-grey-light">
              Professional residential, commercial and property cleaning for homes, businesses, landlords and property professionals across West London.
            </p>
            <p className="text-lg mb-2xl text-brand-gold font-medium">
              Serving Uxbridge • West Drayton • Hayes • Hillingdon • Heathrow Corridor
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <a href="/contact?enquiry=estimate" className="inline-block">
                <Button variant="primary" size="lg">
                  Get a Cleaning Estimate
                </Button>
              </a>
              <a href="/contact?enquiry=commercial-survey" className="inline-block">
                <Button variant="ghost" size="lg">
                  Book a Site Survey
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white animate-bounce">
          <div className="text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* TRUST BAR - PREMIUM */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            <div>
              <div className="text-brand-gold text-sm font-semibold mb-sm uppercase tracking-wider">Insurance</div>
              <p className="text-3xl font-bold">£5M</p>
              <p className="text-sm text-grey-light mt-sm">Public Liability Insured</p>
            </div>
            <div>
              <div className="text-brand-gold text-sm font-semibold mb-sm uppercase tracking-wider">Coverage</div>
              <p className="text-3xl font-bold">✓</p>
              <p className="text-sm text-grey-light mt-sm">Residential & Commercial</p>
            </div>
            <div>
              <div className="text-brand-gold text-sm font-semibold mb-sm uppercase tracking-wider">Location</div>
              <p className="text-3xl font-bold">Local</p>
              <p className="text-sm text-grey-light mt-sm">West London Specialists</p>
            </div>
            <div>
              <div className="text-brand-gold text-sm font-semibold mb-sm uppercase tracking-wider">Leadership</div>
              <p className="text-3xl font-bold">✓</p>
              <p className="text-sm text-grey-light mt-sm">Founder-Led Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID - PREMIUM */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-5xl md:text-6xl font-bold mb-2xl text-brand-navy text-center">
            Our Services
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-lg">
            {/* Large left card */}
            <div className="group cursor-pointer">
              <div className="relative h-96 rounded-lg overflow-hidden mb-md shadow-lg">
                <Image
                  src="/image-office.png"
                  alt="Commercial cleaning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent flex items-end">
                  <div className="p-lg text-white w-full">
                    <h3 className="text-3xl font-bold mb-sm">Commercial Cleaning</h3>
                    <p className="text-sm text-grey-light">Offices, retail, communal spaces</p>
                  </div>
                </div>
              </div>
              <Link href="/commercial">
                <Button variant="secondary" className="w-full">
                  Explore Commercial →
                </Button>
              </Link>
            </div>

            {/* Right side - two stacked cards */}
            <div className="space-y-lg">
              <div className="group cursor-pointer">
                <div className="relative h-40 rounded-lg overflow-hidden mb-md shadow-lg">
                  <Image
                    src="/image-retail.png"
                    alt="Retail cleaning"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent flex items-end">
                    <div className="p-lg text-white w-full">
                      <h3 className="text-xl font-bold">Residential Cleaning</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative h-40 rounded-lg overflow-hidden mb-md shadow-lg">
                  <Image
                    src="/image-supplies.png"
                    alt="Deep cleaning supplies"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent flex items-end">
                    <div className="p-lg text-white w-full">
                      <h3 className="text-xl font-bold">Property Professional Support</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESIDENTIAL / COMMERCIAL SPLIT */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
            {/* Residential */}
            <div>
              <div className="relative h-80 rounded-lg overflow-hidden mb-lg shadow-lg mb-lg">
                <Image
                  src="/image-hero.png"
                  alt="Residential cleaning"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-3xl font-bold text-brand-navy mb-md">Residential Cleaning</h3>
              <p className="text-body mb-lg text-grey-600">
                From regular domestic cleaning to deep cleans and end-of-tenancy work, we provide professional residential cleaning across West London.
              </p>
              <Link href="/residential">
                <Button variant="primary" size="md" className="w-full">
                  Explore Residential Services
                </Button>
              </Link>
            </div>

            {/* Commercial */}
            <div>
              <div className="relative h-80 rounded-lg overflow-hidden mb-lg shadow-lg mb-lg">
                <Image
                  src="/image-office.png"
                  alt="Commercial cleaning"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-3xl font-bold text-brand-navy mb-md">Commercial Cleaning</h3>
              <p className="text-body mb-lg text-grey-600">
                Reliable cleaning support for offices, retail premises and commercial properties. Flexible schedules tailored to your business needs.
              </p>
              <Link href="/commercial">
                <Button variant="primary" size="md" className="w-full">
                  Explore Commercial Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY PROFESSIONALS FEATURE */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
            <div>
              <div className="text-brand-gold text-sm font-semibold mb-md uppercase tracking-wider">
                For Property Professionals
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-lg">
                Cleaning Support Built Around Property Turnarounds
              </h2>
              <p className="text-lg mb-lg text-grey-light">
                Estate agents, letting agents, landlords, property managers and serviced accommodation operators rely on Neatedge for responsive, professional cleaning support.
              </p>
              <div className="space-y-sm mb-2xl">
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl">✓</span>
                  <span>Property turnovers and end-of-tenancy cleaning</span>
                </p>
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl">✓</span>
                  <span>Airbnb and serviced accommodation support</span>
                </p>
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl">✓</span>
                  <span>Consolidated communication and flexible scheduling</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-md">
                <Link href="/contact?enquiry=property-partnership">
                  <Button variant="primary" size="md">
                    Discuss a Partnership
                  </Button>
                </Link>
                <Link href="/property-professionals">
                  <Button variant="ghost" size="md">
                    Learn More →
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/image-about.png"
                alt="Property professional partnership"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - TIMELINE */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-5xl md:text-6xl font-bold mb-2xl text-brand-navy text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-2xl">
            {[
              { step: '01', title: 'Tell Us What You Need', desc: 'Describe your property, cleaning type and requirements' },
              { step: '02', title: 'Receive Your Estimate', desc: 'We review and provide a clear, transparent quotation' },
              { step: '03', title: 'Confirm the Service', desc: 'Review and schedule your preferred cleaning date' },
              { step: '04', title: 'We Complete the Job', desc: 'Professional cleaning with full communication' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-brand-gold mb-md">{item.step}</div>
                <h3 className="text-xl font-bold text-brand-navy mb-sm">{item.title}</h3>
                <p className="text-sm text-grey-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEATEDGE - DARK SECTION */}
      <section className="py-3xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-5xl md:text-6xl font-bold mb-2xl text-center">
            Why Choose Neatedge?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { title: 'Professional Standards', desc: 'Documented processes, consistent quality, full accountability' },
              { title: 'Clear Communication', desc: 'Transparent quotes, responsive updates, no hidden costs' },
              { title: 'Dual Capability', desc: 'Proven experience across residential and commercial sectors' },
              { title: 'West London Focus', desc: 'Deep local knowledge of the area and established relationships' },
              { title: 'Insurance & Security', desc: '£5M public liability insurance and professional credentials' },
              { title: 'Founder-Led', desc: 'Personal accountability and direct oversight of quality' },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-brand-gold pl-lg">
                <h3 className="text-xl font-bold mb-sm">{item.title}</h3>
                <p className="text-grey-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - DARK */}
      <section className="py-3xl bg-brand-midnight text-white">
        <div className="max-w-container mx-auto px-md text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-lg">
            A Cleaner Property Starts Here
          </h2>
          <p className="text-xl mb-2xl max-w-2xl mx-auto text-grey-light">
            Tell us what you need and our team will review your requirements and get back to you with a quotation.
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
          </div>
        </div>
      </section>

      {/* FOOTER - PREMIUM REDESIGNED */}
      <footer className="bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md py-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-3xl pb-3xl border-b border-brand-midnight">
            {/* Column 1: Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-md text-brand-gold">Neatedge</h3>
              <p className="text-sm text-grey-light">
                Professional cleaning services across West London, serving residential, commercial and property professionals.
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="font-bold text-brand-gold mb-md uppercase text-sm tracking-wider">Services</h4>
              <ul className="space-y-sm text-sm">
                <li><Link href="/residential" className="hover:text-brand-gold transition-colors">Residential Cleaning</Link></li>
                <li><Link href="/commercial" className="hover:text-brand-gold transition-colors">Commercial Cleaning</Link></li>
                <li><Link href="/property-professionals" className="hover:text-brand-gold transition-colors">Property Professionals</Link></li>
                <li><Link href="/areas" className="hover:text-brand-gold transition-colors">Service Areas</Link></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="font-bold text-brand-gold mb-md uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-sm text-sm">
                <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-bold text-brand-gold mb-md uppercase text-sm tracking-wider">Get In Touch</h4>
              <div className="space-y-md text-sm">
                <p>
                  <span className="text-brand-gold">Email:</span>
                  <br />
                  <a href="mailto:info@neatedgecleaning.com" className="hover:text-brand-gold transition-colors">
                    info@neatedgecleaning.com
                  </a>
                </p>
                <p>
                  <span className="text-brand-gold">Phone:</span>
                  <br />
                  <a href="tel:07886091926" className="hover:text-brand-gold transition-colors">
                    07886 091926
                  </a>
                </p>
                <p className="text-grey-light">West London, UK</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-md text-sm text-grey-light">
            <p>&copy; 2026 Neatedge Cleaning. All rights reserved.</p>
            <p>Company Number: 14909903</p>
          </div>
        </div>
      </footer>
    </>
  );
}
