'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

/**
 * Premium Homepage — Neatedge
 * Cinematic design, professional imagery, premium interactions
 * 70% cleaning company | 20% luxury property brand | 10% modern tech
 *
 * Key fixes:
 * - Hero H1 uses clamp() for responsive sizing (64px–72px desktop)
 * - No text clipping with proper max-widths and padding
 * - CSS animations for premium feel
 * - Fixed image layouts
 * - Responsive at all breakpoints (375px–1920px)
 */
export default function Home() {
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
            <a href="tel:07886091926" className={`font-medium transition-colors text-sm sm:text-base ${
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

      {/* CINEMATIC HERO — FIXED LAYOUT & RESPONSIVE TYPOGRAPHY */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28">
        {/* Background image + overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image-hero.png"
            alt="Professional cleaning team at work"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/50"></div>
        </div>

        {/* Hero content — constrained width, proper padding */}
        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-5xl mx-auto">
            {/* Subheading */}
            <div className="mb-lg sm:mb-xl text-brand-gold font-semibold uppercase tracking-widest text-xs sm:text-sm">
              Professional Cleaning • West London
            </div>

            {/* Main headline — clamp() for responsive sizing (NO CLIPPING) */}
            <h1
              className="font-bold mb-lg sm:mb-xl leading-tight text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', // 40px–72px responsive, never clips
              }}
            >
              Professional Cleaning,
              <br />
              <span className="text-brand-gold">Delivered Properly</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">
              Professional residential, commercial and property cleaning for homes, businesses, landlords and property professionals across West London.
            </p>

            {/* Service areas */}
            <p className="text-sm sm:text-base mb-xl sm:mb-2xl text-brand-gold font-medium">
              Serving Uxbridge • West Drayton • Hayes • Hillingdon • Heathrow Corridor
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
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
            <p className="text-xs sm:text-sm mb-2 opacity-80">Scroll to explore</p>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* SERVICES GRID - PREMIUM REDESIGNED */}
      <section className="py-3xl sm:py-4xl">
        <div className="max-w-container mx-auto px-md sm:px-lg">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3xl text-brand-navy text-center">
            Our Services
          </h2>

          {/* 2x2 service grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg md:gap-2xl">
            {/* Card 1: Commercial */}
            <div className="group cursor-pointer">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-md">
                <Image
                  src="/image-office.png"
                  alt="Commercial cleaning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent flex items-end p-lg sm:p-2xl">
                  <div className="text-white w-full">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-sm">Commercial Cleaning</h3>
                    <p className="text-sm sm:text-base text-grey-light">Offices, retail, communal spaces</p>
                  </div>
                </div>
              </div>
              <Link href="/commercial" className="inline-block w-full">
                <Button variant="secondary" className="w-full">
                  Explore Commercial →
                </Button>
              </Link>
            </div>

            {/* Card 2: Residential */}
            <div className="group cursor-pointer">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-md">
                <Image
                  src="/image-retail.png"
                  alt="Residential cleaning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent flex items-end p-lg sm:p-2xl">
                  <div className="text-white w-full">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-sm">Residential Cleaning</h3>
                    <p className="text-sm sm:text-base text-grey-light">Domestic, deep cleans, end of tenancy</p>
                  </div>
                </div>
              </div>
              <Link href="/residential" className="inline-block w-full">
                <Button variant="secondary" className="w-full">
                  Explore Residential →
                </Button>
              </Link>
            </div>

            {/* Card 3: End of Tenancy */}
            <div className="group cursor-pointer">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-md">
                <Image
                  src="/image-supplies.png"
                  alt="End of tenancy cleaning"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent flex items-end p-lg sm:p-2xl">
                  <div className="text-white w-full">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-sm">End of Tenancy</h3>
                    <p className="text-sm sm:text-base text-grey-light">Professional property turnover cleaning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Property Professional */}
            <div className="group cursor-pointer">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-md">
                <Image
                  src="/image-about.png"
                  alt="Property professional support"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-transparent flex items-end p-lg sm:p-2xl">
                  <div className="text-white w-full">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-sm">Property Professionals</h3>
                    <p className="text-sm sm:text-base text-grey-light">Turnover & lettings support</p>
                  </div>
                </div>
              </div>
              <Link href="/property-professionals" className="inline-block w-full">
                <Button variant="secondary" className="w-full">
                  Learn More →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESIDENTIAL / COMMERCIAL SPLIT — PREMIUM */}
      <section className="py-3xl sm:py-4xl bg-white">
        <div className="max-w-container mx-auto px-md sm:px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl lg:gap-4xl">
            {/* Residential */}
            <div>
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-lg sm:mb-xl shadow-2xl">
                <Image
                  src="/image-hero.png"
                  alt="Professional residential cleaning team"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-md">Residential Cleaning</h3>
              <p className="text-base text-grey-600 mb-lg sm:mb-xl leading-relaxed">
                From regular domestic cleaning to deep cleans and end-of-tenancy work, we provide professional residential cleaning across West London.
              </p>
              <Link href="/residential" className="inline-block w-full">
                <Button variant="primary" size="md" className="w-full">
                  Explore Residential Services
                </Button>
              </Link>
            </div>

            {/* Commercial */}
            <div>
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-lg sm:mb-xl shadow-2xl">
                <Image
                  src="/image-office.png"
                  alt="Professional commercial office cleaning"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-md">Commercial Cleaning</h3>
              <p className="text-base text-grey-600 mb-lg sm:mb-xl leading-relaxed">
                Reliable cleaning support for offices, retail premises and commercial properties. Flexible schedules tailored to your business needs.
              </p>
              <Link href="/commercial" className="inline-block w-full">
                <Button variant="primary" size="md" className="w-full">
                  Explore Commercial Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY PROFESSIONALS FEATURE — REDESIGNED */}
      <section className="py-3xl sm:py-4xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md sm:px-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl lg:gap-4xl items-center">
            {/* Content */}
            <div>
              <div className="text-brand-gold text-xs sm:text-sm font-semibold mb-md uppercase tracking-widest">
                For Property Professionals
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-lg sm:mb-xl leading-tight">
                Cleaning Support Built Around Property Turnarounds
              </h2>
              <p className="text-base sm:text-lg mb-lg sm:mb-xl text-grey-light leading-relaxed">
                Estate agents, letting agents, landlords, property managers and serviced accommodation operators rely on Neatedge for responsive, professional cleaning support.
              </p>

              {/* Benefits list */}
              <div className="space-y-md mb-2xl sm:mb-3xl">
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-base text-grey-light">Property turnovers and end-of-tenancy cleaning</span>
                </p>
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-base text-grey-light">Airbnb and serviced accommodation support</span>
                </p>
                <p className="flex gap-md items-start">
                  <span className="text-brand-gold text-xl mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-base text-grey-light">Consolidated communication and flexible scheduling</span>
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col xs:flex-row gap-md">
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

            {/* Image */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/image-about.png"
                alt="Property professional partnership — modern property"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - PREMIUM TIMELINE */}
      <section className="py-3xl sm:py-4xl bg-gradient-to-b from-grey-light to-white">
        <div className="max-w-container mx-auto px-md sm:px-lg">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3xl text-brand-navy text-center">
            How It Works
          </h2>

          {/* Timeline grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md md:gap-lg">
            {[
              { step: '01', title: 'Tell Us What You Need', desc: 'Describe your property, cleaning type and requirements' },
              { step: '02', title: 'Receive Your Estimate', desc: 'We review and provide a clear, transparent quotation' },
              { step: '03', title: 'Confirm the Service', desc: 'Review and schedule your preferred cleaning date' },
              { step: '04', title: 'We Complete the Job', desc: 'Professional cleaning with full communication' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                {/* Timeline connector line (desktop only) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-brand-gold/60 to-brand-gold/20"></div>
                )}

                {/* Step number circle */}
                <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold/80 text-brand-navy font-bold mb-lg mx-auto">
                  <span className="text-4xl font-bold">{item.step}</span>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy mb-md">{item.title}</h3>
                <p className="text-sm text-grey-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE NEATEDGE - PREMIUM DARK SECTION */}
      <section className="py-3xl sm:py-4xl bg-brand-navy text-white">
        <div className="max-w-container mx-auto px-md sm:px-lg">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3xl text-center">
            Why Choose Neatedge?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg md:gap-2xl">
            {[
              { title: 'Professional Standards', desc: 'Documented processes, consistent quality, full accountability' },
              { title: 'Clear Communication', desc: 'Transparent quotes, responsive updates, no hidden costs' },
              { title: 'Dual Capability', desc: 'Proven experience across residential and commercial sectors' },
              { title: 'West London Focus', desc: 'Deep local knowledge of the area and established relationships' },
              { title: 'Insurance & Security', desc: '£5M public liability insurance and professional credentials' },
              { title: 'Founder-Led', desc: 'Personal accountability and direct oversight of quality' },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-brand-gold pl-lg sm:pl-2xl py-md">
                <h3 className="text-lg sm:text-xl font-bold mb-sm text-white">{item.title}</h3>
                <p className="text-grey-light text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - PREMIUM DARK SECTION */}
      <section className="relative py-4xl sm:py-5xl bg-brand-navy text-white overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-md sm:px-lg text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-lg leading-tight">
            A Cleaner Property
            <br />
            <span className="text-brand-gold">Starts Here</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-3xl max-w-3xl mx-auto text-grey-light leading-relaxed">
            Tell us what you need and our team will review your requirements and get back to you with a quotation.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col xs:flex-row gap-md sm:gap-lg justify-center">
            <a href="/contact?enquiry=estimate" className="inline-block">
              <Button variant="primary" size="lg">
                Get a Cleaning Estimate
              </Button>
            </a>
            <a href="tel:07886091926" className="inline-block">
              <Button variant="ghost" size="lg">
                Call 07886 091926
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - PREMIUM */}
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
