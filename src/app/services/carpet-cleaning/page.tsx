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
            alt="Professional carpet cleaning"
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
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Deep steam cleaning that removes dirt, stains, allergens, and odours. Your carpets will look and feel brand new.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=carpet-cleaning-quote" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Get a Free Quote</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call Us</a>
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
            <p className="text-3xl font-bold text-[#001F3F]">Professional Grade</p>
            <p className="text-gray-700">Hot Water Extraction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Quick Drying</p>
            <p className="text-gray-700">Back in Use in Hours</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Why Professional Carpet Cleaning Matters</h2>
          <p className="text-gray-700 mb-6">Regular vacuuming is good maintenance, but it only removes surface dust. Deep dirt, dust mites, allergens, and bacteria live deep within carpet fibres where vacuums can't reach.</p>
          <p className="text-gray-700 mb-6">Professional steam cleaning uses hot water extraction to lift dirt from the base of the carpet pile. It sanitises, deodorises, and restores your carpets to near-original condition.</p>
          <p className="text-gray-700">The result: cleaner, fresher, healthier carpets that last longer and feel amazing underfoot.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">What Our Carpet Cleaning Process Does</h2>
          <div className="space-y-6">
            {[
              { num: 1, title: "Pre-Inspection & Spot Treatment", text: "We inspect your carpets, identify stains, and pre-treat problem areas for maximum stain removal." },
              { num: 2, title: "Hot Water Extraction", text: "Professional steam cleaning equipment injects hot water deep into carpet fibres, then extracts dirt and moisture." },
              { num: 3, title: "Deodorising", text: "Carpet fibres treated with eco-friendly deodoriser to eliminate odours at the source." },
              { num: 4, title: "Quick Drying", text: "Air flow and extraction leave carpets nearly dry. Ready for foot traffic within 2-4 hours." },
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
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">What Our Carpet Cleaning Removes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Deep Dirt", desc: "Removes embedded dirt, sand, and grit vacuums miss. Restores carpet brightness." },
              { title: "Stains", desc: "Pre-treatment targets tough stains — pet accidents, wine, coffee, mud. Most respond well." },
              { title: "Allergens", desc: "Steam kills dust mites and removes allergens. Breathe easier in your home." },
              { title: "Odours", desc: "Eliminates pet odours, food smells, and musty scents. Eco-friendly deodoriser neutralises." },
              { title: "Bacteria", desc: "Hot water extraction sanitises. Kills germs that live deep in carpet fibres." },
              { title: "Pet Hair", desc: "Extracts trapped pet hair from carpet base. Leaves carpet fresh and pet-hair-free." },
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
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Frequently Asked Carpet Cleaning Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How often should carpets be professionally cleaned?", a: "Typically every 12-18 months for normal household use. High-traffic areas may need cleaning annually." },
              { q: "How long until carpets are dry?", a: "Most carpets are ready for foot traffic within 2-4 hours. We use powerful extraction to minimise drying time." },
              { q: "Will cleaning shrink my carpets?", a: "No. Professional steam cleaning at correct temperatures doesn't shrink quality carpets. We know the right settings for your carpet type." },
              { q: "Can you remove all stains?", a: "We remove most stains. Old set-in stains may require multiple treatments. We'll assess and be honest about results." },
              { q: "Do you clean other floor types?", a: "Yes. We also clean rugs, upholstery, and hard floors. Ask about our full range of services." },
              { q: "Is the cleaning solution safe?", a: "Yes. We use professional-grade eco-friendly solutions safe for families, pets, and the environment." },
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-6">Carpet Care Tips Between Professional Cleans</h2>
          <div className="space-y-3 mb-8">
            <p className="text-gray-700">✓ Vacuum high-traffic areas 2-3 times per week to prevent dirt buildup</p>
            <p className="text-gray-700">✓ Blot spills immediately with a damp cloth — don't scrub</p>
            <p className="text-gray-700">✓ Use a doormat at entrances to reduce dirt tracking</p>
            <p className="text-gray-700">✓ Rotate furniture periodically to even out wear and fading</p>
            <p className="text-gray-700">✓ Use area rugs in high-traffic zones to protect carpet underneath</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Ready to Revive Your Carpets?</h2>
          <p className="text-lg text-gray-700 mb-8">Professional carpet cleaning that transforms your home. Fresh, clean, healthy carpets delivered fast.</p>
          <a href="/contact?enquiry=carpet-cleaning-quote" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Get Your Free Quote</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
