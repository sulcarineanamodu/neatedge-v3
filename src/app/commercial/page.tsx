'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Commercial Cleaning for West London Businesses</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">Reliable, discreet cleaning services that keep your business looking professional. Flexible schedules. Fully insured.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact?enquiry=commercial-survey" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Book a Free Site Survey</Button>
            <Button href="/contact?enquiry=commercial-quote" className="border-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-[#001F3F]">Request a Commercial Quote</Button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-gray-100 py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#001F3F]">£5M</p>
            <p className="text-gray-700">Public Liability Insurance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#001F3F]">24/7</p>
            <p className="text-gray-700">Flexible Scheduling</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#001F3F]">Discreet</p>
            <p className="text-gray-700">Professional, Quiet Service</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Commercial Cleaning Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Office Cleaning" description="Daily office maintenance including desks, breakrooms, and shared spaces." />
            <Card title="Retail Space Cleaning" description="Keep your shop clean and welcoming for customers. Before/after hours." />
            <Card title="Warehouse Cleaning" description="Large-scale floor cleaning and maintenance for warehouses and industrial spaces." />
            <Card title="Medical/Healthcare Facilities" description="High-standard hygiene protocols for surgeries, clinics, and healthcare settings." />
            <Card title="Hospitality Cleaning" description="Professional cleaning for hotels, restaurants, and hospitality venues." />
            <Card title="Carpet & Floor Care" description="Commercial carpet cleaning and floor maintenance for high-traffic areas." />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Why Choose Neatedge for Your Business</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-2">Reliable Service</h3>
              <p className="text-gray-700">Consistent, dependable cleaning on a schedule that fits your business operations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-2">Professional Standards</h3>
              <p className="text-gray-700">All staff are fully trained, background-checked, and committed to your business's image.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-2">Flexible Scheduling</h3>
              <p className="text-gray-700">Early morning, late evening, or weekend cleaning to minimize disruption to your team.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#D4A574]">
              <h3 className="font-bold text-[#001F3F] mb-2">Fully Insured</h3>
              <p className="text-gray-700">£5M public liability insurance covers accidental damage or loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Our Approach</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">1. Site Survey & Assessment</h3>
              <p className="text-gray-700">We visit your business to understand the layout, size, specific cleaning needs, and the best times to work around your operations.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">2. Scope & Schedule Planning</h3>
              <p className="text-gray-700">We agree on exactly what will be cleaned, how often, and when. No surprises. All terms are clear and documented.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">3. Quality & Communication</h3>
              <p className="text-gray-700">Regular check-ins ensure the service meets your expectations. We respond quickly to any feedback or last-minute schedule changes.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">4. Health & Safety Compliance</h3>
              <p className="text-gray-700">We follow all relevant health and safety regulations, and use appropriate PPE and cleaning products for your industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Documentation */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Insurance & Documentation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#001F3F] mb-4">Insurance Coverage</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>£5M Public Liability Insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Professional Indemnity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Employers' Liability</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-4">Compliance & Standards</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>DBS Background Checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Health & Safety Documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>SLA & Service Agreements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Commercial FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Can you clean outside business hours?</h3>
              <p className="text-gray-700">Yes. We offer early morning, evening, and weekend cleaning to fit around your business schedule.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Do you have minimum contract terms?</h3>
              <p className="text-gray-700">No fixed minimums. Discuss your requirements and we'll agree flexible terms that suit your business.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">What if we need cleaning outside the scheduled times?</h3>
              <p className="text-gray-700">We offer ad-hoc cleaning services for emergency situations. Contact us for availability.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Can you handle specialist cleaning?</h3>
              <p className="text-gray-700">We handle most commercial cleaning needs. For specialist services (medical waste, hazmat), we advise at consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#001F3F] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Keep Your Business Spotless</h2>
          <p className="text-lg mb-8">Get a free site survey and quotation. No obligation.</p>
          <Button href="/contact?enquiry=commercial-survey" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Book Your Site Survey</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
