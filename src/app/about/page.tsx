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
            alt="Professional cleaning team"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Professional Cleaning, Built on Trust</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">We're a local, accountable team committed to delivering quality service and genuine care.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="/contact?enquiry=estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Get a Cleaning Estimate</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4 font-cinzel">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700">
            <p>Founded on the principle that cleaning should be reliable, professional, and honest. We serve West London households and businesses with respect and attention to detail.</p>
            <p>Every team member is background-checked and trained to our standards. This isn't a franchise operation—it's founder-led, locally accountable service from people who genuinely care about delivering quality work.</p>
            <p>Your home and business are important. We treat them like they're ours.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 text-center font-cinzel">Why We Do This</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Reliability", desc: "You should never worry about whether we'll show up or do good work. We're consistent." },
              { title: "Accountability", desc: "We're local, we're here, and we stand behind our work. No disappearing acts." },
              { title: "Respect", desc: "Your home and business are important. We treat them like they're ours." },
            ].map((value) => (
              <div key={value.title} className="bg-white p-6 rounded shadow">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 text-center font-cinzel">Credentials & Insurance</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { badge: "£5M", label: "Public Liability Insurance" },
              { badge: "✓", label: "DBS Checked Team" },
              { badge: "✓", label: "Local Service Provider" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded shadow">
                <div className="text-4xl font-bold text-[#001F3F] mb-4">{item.badge}</div>
                <p className="font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12 font-cinzel">Our Team</h2>
          <p className="text-lg text-gray-700 mb-12">Trained professionals. All background-checked. Real people, genuine care. Available during hours that work for you.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✓", title: "Professional Training", desc: "Every team member trained to our standards" },
              { icon: "✓", title: "Background Checked", desc: "DBS verified for your peace of mind" },
              { icon: "✓", title: "Flexible Scheduling", desc: "Times that work around your life" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-4xl text-brand-gold font-bold mb-2">{item.icon}</div>
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Experience the Difference?</h2>
          <p className="text-lg mb-8 text-grey-light">Professional cleaning you can trust, from people who genuinely care about your satisfaction.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?enquiry=estimate" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Get a Cleaning Estimate</a>
            <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
