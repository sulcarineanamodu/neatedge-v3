'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function CarpetCleaningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/hero.webp"
            alt="Professional carpet cleaning service"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Professional Carpet Cleaning, Delivered Properly</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Whether it's a single room or whole home, we restore your carpets to their best.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=carpet-cleaning-quote" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Book Your Carpet Clean</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {[
            { badge: '£5M', label: 'Public Liability Insured' },
            { badge: '2-4h', label: 'Quick Dry Time' },
            { badge: '✓', label: 'Allergen Removal' },
            { badge: '✓', label: 'Stain & Odour Removal' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold text-[#001F3F] mb-2">{item.badge}</div>
              <p className="font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8 font-cinzel">Our Carpet Cleaning Approach</h2>
          <div className="max-w-3xl mx-auto text-gray-700">
            <p className="mb-4">We use professional-grade equipment and eco-friendly products. Hot water extraction method for deep cleaning. Safe for most carpet types (we assess first). Dries quickly — you can walk on it within hours.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">When You Need Carpet Cleaning</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Regular Maintenance', desc: 'Quarterly or semi-annual maintenance keeps carpets fresh and extends life.' },
              { title: 'Stain Removal', desc: 'Stubborn stains need expertise. We tackle red wine, pet accidents, mud, and more.' },
              { title: 'Post-Event Deep Clean', desc: 'After construction or major work, or pre-sale refresh for optimal results.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Our Professional Carpet Cleaning Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Assessment', desc: 'We inspect your carpet to identify stains, odours, and requirements.' },
              { step: 2, title: 'Pre-Treatment', desc: 'We apply pre-treatment solutions to loosen dirt and prepare the carpet.' },
              { step: 3, title: 'Steam Clean', desc: 'High-temperature steam extraction lifts dirt and kills bacteria and allergens.' },
              { step: 4, title: 'Fast Dry', desc: 'Air circulation and extraction ensure carpet dries within 2-4 hours.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8 font-cinzel">Why Professional Cleaning Matters</h2>
          <div className="space-y-4 text-gray-700">
            <p>Carpet is an investment. Vacuuming alone removes surface dust, but embedded dirt, allergens, and bacteria require professional extraction.</p>
            <p>Regular professional cleaning extends carpet life by years. Safe for families and pets when done with eco-friendly products.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'How often should carpets be professionally cleaned?', a: 'At least once a year for normal homes. High-traffic or pet areas may benefit from twice yearly.' },
              { q: 'Is your carpet cleaning safe for kids and pets?', a: 'Yes. We use professional-grade but safe solutions. Pet and child-friendly options available.' },
              { q: 'Can you remove set-in stains?', a: 'Most stains can be removed. Some permanent dyes may not be fully recoverable. We assess first.' },
              { q: 'How long does it take for carpets to dry?', a: 'Typically 2-4 hours depending on carpet thickness and air circulation.' },
              { q: 'What carpet types can you clean?', a: 'Wool, synthetic, natural fibre—all carpet types. We assess your carpet first.' },
              { q: 'Do you offer one-off cleans or subscriptions?', a: 'Both. One-off professional cleans or recurring maintenance plans.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded border-l-4 border-brand-gold">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-sm text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Restore Your Carpets?</h2>
          <p className="text-lg mb-8 text-grey-light">Professional cleaning from people who genuinely care about your satisfaction.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=carpet-cleaning-quote" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Book Your Carpet Clean</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
