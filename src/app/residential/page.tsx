'use client';

import Footer from '@/components/Footer';

export default function ResidentialPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Professional Residential Cleaning Across West London</h1>
          <p className="text-xl text-gray-100 mb-8">Trusted by homeowners. Verified by background checks. Insured for peace of mind.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=residential-estimate" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Get a Cleaning Estimate</a>
            <a href="tel:07886091926" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Call 07886 091926</a>
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
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Residential Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Weekly Cleaning", desc: "Regular maintenance to keep your home fresh and tidy every week." },
              { title: "Fortnightly Service", desc: "Scheduled every two weeks for consistent cleanliness without the cost." },
              { title: "Monthly Deep Clean", desc: "Thorough cleaning with attention to detail and hard-to-reach areas." },
              { title: "One-Off Blitzes", desc: "Deep clean your home before a special occasion or after moving in." },
              { title: "Post-Builders Clean", desc: "Heavy-duty cleaning after construction or renovation work." },
              { title: "End of Tenancy", desc: "Professional clean to help you recover your deposit." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.desc}</p>
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

      {/* CTA */}
      <section className="bg-[#001F3F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Feel the Difference?</h2>
          <p className="text-lg mb-8">Get a free, no-obligation quote from Neatedge today.</p>
          <a href="/contact?enquiry=residential-estimate" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Book Your Free Estimate</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
