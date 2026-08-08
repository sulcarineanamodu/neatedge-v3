'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/commercial.webp"
            alt="Professional commercial cleaning service"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Professional Commercial Cleaning, Delivered Properly</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Reliable, discreet cleaning services that keep your business looking professional. 24/7 flexible scheduling for your convenience.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=commercial-survey" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Book a Free Site Survey</a>
              <a href="/contact?enquiry=commercial-quote" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Request a Quote</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">£5M</p>
            <p className="text-gray-700">Public Liability Insurance</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">24/7</p>
            <p className="text-gray-700">Flexible Scheduling</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Discreet</p>
            <p className="text-gray-700">Professional Service</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4 font-cinzel">Recurring Cleaning — The Foundation of a Professional Workspace</h2>
          <p className="text-lg text-gray-700 mb-12">Recurring cleaning is more effective than one-off deep cleans. We maintain your space consistently, adapt to your needs, and become a trusted extension of your team.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Weekly", desc: "Regular maintenance for high-traffic areas. Ideal for active offices and retail." },
              { title: "Bi-Weekly", desc: "Cost-effective option for moderate-use spaces. Balance between freshness and budget." },
              { title: "Monthly", desc: "Maintenance for low-traffic professional spaces or corporate refresh schedules." },
            ].map((option) => (
              <div key={option.title} className="bg-brand-navy text-white p-6 rounded text-center">
                <h3 className="font-bold text-brand-gold mb-2 text-xl">{option.title}</h3>
                <p className="text-grey-light">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">What's Typically Included</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Desks & Workspaces", desc: "Surfaces, keyboards, phones, and high-touch areas." },
              { title: "Kitchens & Break Rooms", desc: "Appliances, counters, floors, and refrigerator cleaning." },
              { title: "Washrooms & Facilities", desc: "Toilets, sinks, mirrors, dispensers, and thorough sanitizing." },
              { title: "Communal Spaces & Floors", desc: "Lobbies, corridors, and floor care appropriate to your surface." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded border-t-4 border-brand-gold">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Why Choose Neatedge</h2>
          <div className="space-y-6">
            {[
              { title: "Reliable Service", text: "Consistent, dependable cleaning on a schedule that fits your business." },
              { title: "Professional Standards", text: "All staff are fully trained, background-checked, and professional." },
              { title: "Flexible Scheduling", text: "Early morning, evening, or weekend cleaning to minimize disruption." },
              { title: "Fully Insured", text: "£5M public liability insurance covers accidental damage or loss." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded border-l-4 border-[#D4A574]">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do you work outside business hours?", a: "Yes. We offer evening and weekend cleaning to minimize disruption. Access and scheduling are discussed during your site survey." },
              { q: "Can you handle multi-site contracts?", a: "Absolutely. We manage recurring cleaning across multiple properties with consistent standards and a single point of contact." },
              { q: "What about access and parking?", a: "We'll discuss access requirements, parking, keys/codes, and any site-specific constraints during the site survey." },
              { q: "How flexible is the scheduling?", a: "Very flexible. We adapt to your business hours, seasonal needs, and budget. Changes can be made with reasonable notice." },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-brand-gold pl-6">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Simplify Your Office Cleaning?</h2>
          <p className="text-lg text-grey-light mb-8">Every commercial space is different. We'll assess your needs, schedule, and budget during a free site survey.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=commercial-survey" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Book Your Site Survey</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
