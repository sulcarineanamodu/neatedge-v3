'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function EndOfTenancyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/end-of-tenancy.webp"
            alt="End-of-tenancy cleaning"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>End-of-Tenancy Cleaning, Delivered Properly</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Professional clean to help you recover your full deposit. We handle every detail.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=end-of-tenancy-quote" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Book Your Clean</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call Us</a>
            </div>
          </div>
        </div>
      </section>
        </div>
      </section>

      <section className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">£5M</p>
            <p className="text-gray-700">Public Liability Insurance</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">24-48 Hours</p>
            <p className="text-gray-700">Rapid Turnaround</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Guaranteed</p>
            <p className="text-gray-700">Deposit Protection Promise</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Why End of Tenancy Cleaning Matters</h2>
          <p className="text-gray-700 mb-6">Moving out? Your landlord expects the property to be returned in the same condition as when you moved in. A professional end of tenancy clean isn't optional — it's the difference between recovering your full deposit and losing hundreds of pounds.</p>
          <p className="text-gray-700 mb-6">Landlords and letting agents have strict standards. A basic clean won't cut it. We provide the deep, thorough clean that passes professional inspections and satisfies the most demanding landlords.</p>
          <p className="text-gray-700">We've helped tenants recover deposits on hundreds of properties across West London. We know exactly what landlords and agents are looking for.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our End of Tenancy Cleaning Process</h2>
          <div className="space-y-6">
            {[
              { num: 1, title: "Pre-Inspection", text: "We inspect the property and agree on the scope with you. No surprises." },
              { num: 2, title: "Deep Clean", text: "Professional deep clean of every room, including skirting boards, light fittings, inside appliances, carpets." },
              { num: 3, title: "Detailed Check", text: "We photograph and document everything cleaned. You get proof for the landlord." },
              { num: 4, title: "Final Handover", text: "Keys handed over, paperwork provided, deposit recovery begins." },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="w-10 h-10 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-bold text-[#001F3F] mb-1">{step.title}</h3>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">What's Included in Our Clean</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Kitchen", desc: "Inside oven, hob, fridge, cupboards, drawers, floors, walls, skirting boards." },
              { title: "Bathroom", desc: "Shower/tub, toilet, sink, tiles, mirrors, floors, skirting boards, extractor fans." },
              { title: "Bedrooms", desc: "Carpets vacuumed, walls wiped, skirting boards, light fittings, wardrobes cleaned." },
              { title: "Living Areas", desc: "All surfaces cleaned, carpets deep cleaned, windows, doors, light switches, radiators." },
              { title: "Hallways", desc: "Carpets cleaned, walls wiped, skirting boards, doors, light fittings polished." },
              { title: "Outside", desc: "Garden tidied, bins removed, paths cleared, exterior swept and ready for next tenant." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How much does it cost?", a: "Pricing depends on property size, condition, and location. We provide free quotes within 24 hours. Typically £800-£2,500 for a 2-3 bed property." },
              { q: "How long does it take?", a: "Most properties completed in 1-2 days. We work efficiently to get you moved out quickly without compromising on quality." },
              { q: "What if the landlord isn't satisfied?", a: "We guarantee our work. If the landlord has complaints about our clean, we return at no cost to put things right." },
              { q: "Can you do it last-minute?", a: "Yes. We handle urgent moves. Call us and we'll fit you in within 48 hours whenever possible." },
              { q: "Do you clean carpets?", a: "Yes, professional steam cleaning is included. We can also handle hard floors, vinyl, and specialty surfaces." },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-[#D4A574] pl-6">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Ready to Move Out Worry-Free?</h2>
          <p className="text-lg text-gray-700 mb-8">Let us handle the clean. You focus on your move. Get your deposit back in full.</p>
          <a href="/contact?enquiry=end-of-tenancy-quote" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Get a Free Quote Today</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
