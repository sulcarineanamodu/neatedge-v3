'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function PropertyProfessionalsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/property-professionals.webp"
            alt="Property professionals cleaning service"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Cleaning Solutions for Property Professionals</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Trusted by estate agents, letting agents, landlords, and property managers across West London. Quick turnaround, discretion guaranteed.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=property-partnership" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Discuss a Partnership</a>
              <a href="/contact?enquiry=property-cleaning" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Get a Quote</a>
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
            <p className="text-3xl font-bold text-[#001F3F]">Quick Turnaround</p>
            <p className="text-gray-700">24-48 Hour Response</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Discretion</p>
            <p className="text-gray-700">Professional Service</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">Tailored Solutions by Role</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Estate Agents", items: ["Deep clean before property photography", "Rapid turnaround between viewings", "Post-exchange professional refresh"] },
              { title: "Letting Agents & Landlords", items: ["End-of-tenancy deep clean for inspections", "Move-in refresh for new tenants", "Portfolio management across multiple properties"] },
              { title: "Airbnb & Serviced Accommodation", items: ["Quick-turnaround between-guest cleaning", "Weekly maintenance for active properties", "Communication and flexibility for guest satisfaction"] },
            ].map((solution) => (
              <div key={solution.title} className="bg-brand-navy text-white p-8 rounded">
                <h3 className="text-2xl font-bold text-brand-gold mb-4">{solution.title}</h3>
                <ul className="space-y-2">
                  {solution.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-grey-light">
                      <span className="text-brand-gold font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How quickly can you do turnaround cleaning?", a: "We offer 24-48 hour turnaround for most bookings. Urgent requests discussed on a case-by-case basis." },
              { q: "Do you provide documentation (photos, checklists)?", a: "Yes. We document cleaning work with photos and checklists for your records and tenant disputes." },
              { q: "Can you handle multiple properties?", a: "Absolutely. We manage portfolios across multiple sites with consistent standards and single point of contact." },
              { q: "What about specialist cleaning?", a: "Carpet, oven, and window cleaning available. Discuss needs during consultation for accurate quoting." },
              { q: "Do you work weekends?", a: "Yes. Weekend and evening slots available for turnaround cleaning between tenancies." },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-brand-gold pl-6">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Partnership Benefits</h2>
          <div className="space-y-6">
            {[
              { title: "Dedicated Support", text: "Your own point of contact for consistency and faster decisions." },
              { title: "Flexible Pricing", text: "Volume discounts and tailored packages for regular bookings." },
              { title: "Priority Scheduling", text: "Your bookings get priority slots and rapid turnaround." },
              { title: "Professional Standards", text: "All staff fully trained, insured, and able to provide documentation." },
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-[#001F3F] mb-1">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Simplify Property Cleaning?</h2>
          <p className="text-lg text-gray-700 mb-8">Let's discuss how Neatedge can support your portfolio.</p>
          <p className="text-lg text-grey-light mb-8">Let's discuss how we can support your property management portfolio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=property-partnership" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Schedule a Consultation</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
