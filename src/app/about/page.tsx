'use client';

import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Cleaning With Local Accountability</h1>
          <p className="text-lg md:text-xl text-gray-100">Founded on reliability, transparency, and genuine care for West London homes and businesses.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-8">Our Story</h2>
          <p className="text-gray-700 mb-6">Neatedge was founded with a simple principle: cleaning shouldn't be a chore you dread delegating. Too many people feel anxious about letting strangers into their homes or worried about whether a cleaning service will actually turn up as promised.</p>
          <p className="text-gray-700 mb-6">We started Neatedge to change that. We're founder-led, locally based in West London, and we answer our phone. You get consistency, transparency, and accountability from people who care about their reputation and your peace of mind.</p>
          <p className="text-gray-700">Whether you're a busy professional, a property manager juggling multiple properties, or a business owner looking for reliable support, we're here to take the stress out of cleaning.</p>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Our Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Residential Expertise</h3>
              <p className="text-gray-700">Years of experience cleaning homes across West London. From small flats to large family houses, we know how to make every property feel fresh and welcoming.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Commercial Professionalism</h3>
              <p className="text-gray-700">Supporting offices, retail spaces, and professional services with the same reliability and standards you'd expect from any trusted business partner.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Property Professional Network</h3>
              <p className="text-gray-700">Trusted by estate agents, letting agents, and landlords across London. Rapid response, excellent documentation, and flexible scheduling.</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">Specialist Services</h3>
              <p className="text-gray-700">End of tenancy deep cleans, post-construction cleanups, and medical/healthcare facility standards when needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Our Values</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">Reliability</h3>
              <p className="text-gray-700">We show up on time. We do what we say we'll do. We answer our phones and return messages within 24 hours. You can count on us.</p>
            </div>
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">Transparency</h3>
              <p className="text-gray-700">No hidden costs. No surprises. We explain what we'll clean, how much it costs, and when we'll do it. You decide whether it works for you.</p>
            </div>
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">Quality</h3>
              <p className="text-gray-700">We use professional-grade products and techniques. Your home or business should feel genuinely clean, not just tidy.</p>
            </div>
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">Respect</h3>
              <p className="text-gray-700">Your home is your private space. We respect your trust, your boundaries, and your belongings. All staff are fully vetted and background-checked.</p>
            </div>
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">Accountability</h3>
              <p className="text-gray-700">Something not right? We fix it. We're here to make things right, not to pass the buck. That's what "professional" means.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processes */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">How We Work</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">1. Documented Procedures</h3>
              <p className="text-gray-700">Every cleaning job follows a checklist. We know exactly what gets done, and so do you. Consistency matters.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">2. Professional Training</h3>
              <p className="text-gray-700">Our team isn't made up of people who happen to know how to clean. We invest in proper training, health & safety, and professional standards.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">3. Fully Insured</h3>
              <p className="text-gray-700">£5M public liability insurance. If something goes wrong (which it rarely does), you're protected. No stress, no disputes.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">4. Background Checked</h3>
              <p className="text-gray-700">All staff are DBS checked and vetted. We take your trust seriously. You should never wonder whether the person in your home is trustworthy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Insurance & Verification</h2>
          <p className="text-gray-700 mb-8">Your confidence matters to us. Here's what's in place:</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-3">£5M Public Liability</h3>
              <p className="text-gray-700 text-sm">Full coverage for accidental damage or loss to your property while we're cleaning.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-3">DBS Checked</h3>
              <p className="text-gray-700 text-sm">All staff have passed enhanced background checks. Your safety and security come first.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-3">SLA Documentation</h3>
              <p className="text-gray-700 text-sm">Service agreements, checklists, and photo evidence available on request for audits or disputes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* West London Focus */}
      <section className="bg-[#001F3F] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why West London?</h2>
          <p className="text-gray-100 mb-6">We chose to base Neatedge here because we know the area. We understand the properties—Victorian terraces, modern flats, family homes, commercial spaces. We know the challenges: access, parking, neighbour considerations. We know the local community.</p>
          <p className="text-gray-100">This means faster response times, genuine local accountability, and someone you can actually speak to who understands your street and your situation.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-4">Ready to Experience the Difference?</h2>
          <p className="text-gray-700 mb-8">Get in touch for a free quote or to discuss how we can support your home or business.</p>
          <Button href="/contact" className="bg-[#001F3F] text-white hover:bg-[#003366]">Get in Touch</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
