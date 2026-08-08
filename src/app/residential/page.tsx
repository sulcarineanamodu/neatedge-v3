'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';

export default function ResidentialPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/residential.webp"
            alt="Professional residential cleaning service"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Professional Residential Cleaning, Delivered Properly</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Trusted by homeowners across West London. Verified by background checks. Insured for complete peace of mind.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=residential-estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Get a Cleaning Estimate</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">£5M</p>
            <p className="text-gray-700">Public Liability Insurance</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">DBS Checked</p>
            <p className="text-gray-700">Background Verified</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">West London</p>
            <p className="text-gray-700">Local, Accountable Service</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4 font-cinzel">A Clean Home Without the Effort</h2>
          <p className="text-lg text-gray-700 mb-12">Choose the frequency that works for you. We handle everything so you can enjoy your space.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Regular Cleaning", desc: "Weekly or bi-weekly maintenance. The easiest way to keep your home consistently clean." },
              { title: "Deep Cleaning", desc: "Thorough one-off clean for every corner, detail, and hard-to-reach area." },
              { title: "Refresh Cleans", desc: "Move-in, move-out, post-renovation, or special occasion cleaning." },
            ].map((service) => (
              <div key={service.title} className="bg-brand-navy text-white p-6 rounded">
                <h3 className="font-bold text-brand-gold mb-2 text-lg">{service.title}</h3>
                <p className="text-grey-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">How It Works</h2>
          <div className="space-y-6">
            {[
              { num: 1, title: "Contact Us", text: "Get in touch via phone, email, or our online form." },
              { num: 2, title: "Free Assessment", text: "We discuss your requirements and provide a no-obligation quote." },
              { num: 3, title: "Agree Terms", text: "Review the quote and confirm the details that work for you." },
              { num: 4, title: "Clean Day", text: "Professional cleaner arrives on time. We leave your home spotless." },
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

      {/* Areas */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-6">Areas We Serve</h2>
          <p className="text-gray-700 mb-6">Primary coverage: Uxbridge, West Drayton, Hayes, Hillingdon. We also serve surrounding areas.</p>
          <a href="/areas" className="inline-block bg-[#001F3F] text-white font-semibold px-6 py-3 rounded hover:bg-[#003366]">View All Service Areas</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">Questions About Home Cleaning</h2>
          <div className="space-y-6">
            {[
              { q: "How often should I get my home cleaned?", a: "It depends on your home and lifestyle. Weekly or bi-weekly is most common. We can help you find the right rhythm." },
              { q: "Do you provide cleaning supplies?", a: "Yes. We bring our own eco-friendly supplies. If you prefer specific products, just let us know." },
              { q: "Can I meet my cleaner before they start?", a: "Absolutely. We arrange an introductory meeting so you can discuss preferences and build trust." },
              { q: "What if I'm not happy with a clean?", a: "We care about quality. Let us know, and we'll address any concerns and make it right." },
              { q: "How do you handle access to my home?", a: "We can use your keys, arrange a meet-time, or discuss secure access options that work for you." },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-brand-gold pl-6">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Feel the Difference?</h2>
          <p className="text-lg mb-8 text-grey-light">Get a free, no-obligation quote and meet your dedicated cleaner.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=residential-estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Book Your Free Estimate</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
