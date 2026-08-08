'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/hero.webp"
            alt="Service coverage across West London"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>We Serve West London & Surrounding Areas</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Based locally, familiar with your community. Reliable service you can count on.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Get a Cleaning Estimate</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-4 font-cinzel">Primary Coverage Areas</h2>
          <p className="text-center text-gray-700 mb-12">We're based in West London and serve the following areas as our primary coverage zone. If you're outside these areas, reach out — we may still be able to help.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Uxbridge', desc: 'Our home base. Full range of services, same-day availability often possible.' },
              { name: 'West Drayton', desc: 'Regular and one-off cleaning for homes and businesses.' },
              { name: 'Hayes', desc: 'Commercial and residential cleaning, flexible scheduling.' },
              { name: 'Hillingdon', desc: 'Local expertise, consistent service quality.' },
            ].map((area) => (
              <div key={area.name} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-2">{area.name}</h3>
                <p className="text-gray-700 mb-4 text-sm">{area.desc}</p>
                <a href="/contact?enquiry=estimate" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-4 py-2 rounded text-sm hover:bg-yellow-500">Get a Quote</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-4 font-cinzel">Surrounding Areas</h2>
          <p className="text-center text-gray-700 text-lg">We also serve: Ruislip, Ickenham, Yiewsley, Cowley, Iver, Slough (parts), and other West London suburbs. Contact us to confirm coverage for your postcode.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Why Local Service Matters</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'We know the area', desc: 'Understand local needs and community' },
              { title: 'Faster response times', desc: 'Reliable arrivals, quick scheduling' },
              { title: 'Same team, consistent quality', desc: 'You get familiar faces and continuity' },
              { title: 'You can actually call us', desc: 'Real people, actual accountability' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow text-center">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4 font-cinzel">Service Coverage</h2>
          <p className="text-lg text-gray-700">From M25 to central Uxbridge, South to West Drayton, East to Ruislip — we're here.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Questions About Service Areas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Do you serve my postcode?', a: 'If you\'re in Uxbridge, West Drayton, Hayes, Hillingdon, or surrounding areas, we almost certainly do. Contact us with your postcode to confirm.' },
              { q: 'Can you serve areas outside your primary coverage?', a: 'We may be able to. Give us a call on 07886 091926 and we can discuss whether we can help.' },
              { q: 'Why does location matter for cleaning services?', a: 'Being local means faster response times, lower travel costs, and genuine accountability. We\'re invested in our community.' },
              { q: 'How quickly can you schedule in my area?', a: 'Primary areas like Uxbridge often have same-day or next-day availability. Other areas typically within 2-3 days. Call for current availability.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded border-l-4 border-brand-gold">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Not Sure If We Cover Your Area?</h2>
          <p className="text-lg mb-8 text-grey-light">Get in touch. We'll confirm coverage and discuss how we can help with your cleaning needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Contact Us</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
