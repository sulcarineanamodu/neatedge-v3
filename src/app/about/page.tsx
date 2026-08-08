'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/why-neatedge.webp"
            alt="About Neatedge cleaning"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>About Neatedge — Professional Cleaning, Delivered Properly</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Trusted by homeowners, businesses, and property professionals across West London since 2026. Founded on reliability, transparency, and genuine care.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="#our-story" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Our Story</a>
              <a href="/contact" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Our Story</h2>
          <p className="text-gray-700 mb-6">Neatedge was founded with a simple principle: cleaning shouldn't be a chore you dread delegating. We're founder-led, locally based in West London, and we answer our phone. You get consistency, transparency, and accountability from people who care about their reputation and your peace of mind.</p>
          <p className="text-gray-700">Whether you're a busy professional, a property manager juggling multiple properties, or a business owner looking for reliable support, we're here to take the stress out of cleaning.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Residential Expertise", text: "Years of experience cleaning homes across West London. From small flats to large family houses." },
              { title: "Commercial Professionalism", text: "Supporting offices, retail spaces, and professional services with reliable standards." },
              { title: "Property Professional Network", text: "Trusted by estate agents, letting agents, and landlords across London." },
              { title: "Specialist Services", text: "End of tenancy deep cleans, post-construction cleanups, and medical/healthcare standards." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded border border-gray-200">
                <h3 className="font-bold text-[#001F3F] mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Values</h2>
          <div className="space-y-8">
            {[
              { title: "Reliability", text: "We show up on time. We do what we say we'll do. You can count on us." },
              { title: "Transparency", text: "No hidden costs. No surprises. We explain what we'll clean and how much it costs." },
              { title: "Quality", text: "We use professional-grade products and techniques. Your home should feel genuinely clean." },
              { title: "Respect", text: "Your home is your private space. All staff are fully vetted and background-checked." },
              { title: "Accountability", text: "Something not right? We fix it. We're here to make things right." },
            ].map((value) => (
              <div key={value.title} className="border-l-4 border-[#D4A574] pl-6">
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#001F3F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Why West London?</h2>
          <p className="text-gray-100 mb-6">We chose to base Neatedge here because we know the area. We understand the properties, challenges, and community. This means faster response times and genuine local accountability.</p>
          <a href="/contact" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Get in Touch</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
