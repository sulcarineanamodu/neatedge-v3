'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

export default function ResidentialPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Residential Cleaning Across West London</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">Trusted by homeowners. Verified by background checks. Insured for peace of mind.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact?enquiry=residential-estimate" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Get a Cleaning Estimate</Button>
            <Button href="tel:07886091926" className="border-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-[#001F3F]">Call 07886 091926</Button>
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
            <p className="text-2xl font-bold text-[#001F3F]">DBS Checked</p>
            <p className="text-gray-700">Background Verified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#001F3F]">West London</p>
            <p className="text-gray-700">Local, Accountable Service</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Our Residential Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Weekly Cleaning" description="Regular maintenance to keep your home fresh and tidy every week." />
            <Card title="Fortnightly Service" description="Scheduled every two weeks for consistent cleanliness without the cost." />
            <Card title="Monthly Deep Clean" description="Thorough cleaning with attention to detail and hard-to-reach areas." />
            <Card title="One-Off Blitzes" description="Deep clean your home before a special occasion or after moving in." />
            <Card title="Post-Builders Clean" description="Heavy-duty cleaning after construction or renovation work." />
            <Card title="End of Tenancy" description="Professional clean to help you recover your deposit." />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">How the Enquiry Process Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Contact Us</h3>
                <p className="text-gray-700">Get in touch via phone, email, or our online form. Tell us about your home and cleaning needs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Free Assessment</h3>
                <p className="text-gray-700">We discuss your requirements and provide a transparent, no-obligation quote within 24 hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Agree Terms</h3>
                <p className="text-gray-700">Review the quote, schedule your first clean, and confirm the details that work for you.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Clean Day</h3>
                <p className="text-gray-700">Professional cleaner arrives on time. We work efficiently and leave your home spotless.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Factors */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Pricing Factors</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#D4A574] font-bold">•</span>
              <span><strong>Property Size:</strong> Number of bedrooms and square footage</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A574] font-bold">•</span>
              <span><strong>Frequency:</strong> Weekly, fortnightly, or one-off service</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A574] font-bold">•</span>
              <span><strong>Current Condition:</strong> Deep cleans cost more than regular maintenance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#D4A574] font-bold">•</span>
              <span><strong>Location:</strong> Travel time within West London</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Optional Extras */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Add-On Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#001F3F] mb-2">Carpet Cleaning</h3>
              <p className="text-gray-700 text-sm">Professional steam cleaning for carpets and rugs</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#001F3F] mb-2">Window Cleaning</h3>
              <p className="text-gray-700 text-sm">Interior and exterior window cleaning</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#001F3F] mb-2">Garden Tidy</h3>
              <p className="text-gray-700 text-sm">Basic garden maintenance and leaf clearing</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#001F3F] mb-2">Laundry Service</h3>
              <p className="text-gray-700 text-sm">Washing, drying, and ironing of household items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-6">Areas We Serve</h2>
          <p className="text-gray-700 mb-6">Primary coverage: Uxbridge, West Drayton, Hayes, Hillingdon. We also serve surrounding areas—contact us to check availability.</p>
          <Button href="/areas" className="bg-[#001F3F] text-white hover:bg-[#003366]">View All Service Areas</Button>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Do you provide your own cleaning supplies?</h3>
              <p className="text-gray-700">Yes. We use eco-friendly cleaning products and bring all necessary equipment. Let us know if you prefer specific products.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">What if I'm not home during cleaning?</h3>
              <p className="text-gray-700">We can arrange key access or arrange a time that suits your schedule. Your security is our priority.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Can I cancel or pause my regular cleaning?</h3>
              <p className="text-gray-700">Absolutely. You can pause, cancel, or adjust your schedule anytime with at least one week's notice.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-2">Are you insured?</h3>
              <p className="text-gray-700">Yes. We carry £5M public liability insurance covering accidental damage or loss.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#001F3F] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Feel the Difference?</h2>
          <p className="text-lg mb-8">Get a free, no-obligation quote from Neatedge today.</p>
          <Button href="/contact?enquiry=residential-estimate" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Book Your Free Estimate</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
