'use client';

import Footer from '@/components/Footer';

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Professional Commercial Cleaning for West London Businesses</h1>
          <p className="text-xl text-gray-100 mb-8">Reliable, discreet cleaning services that keep your business looking professional.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=commercial-survey" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Book a Free Site Survey</a>
            <a href="/contact?enquiry=commercial-quote" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Request a Quote</a>
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
            <p className="text-3xl font-bold text-[#001F3F]">24/7</p>
            <p className="text-gray-700">Flexible Scheduling</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Discreet</p>
            <p className="text-gray-700">Professional Service</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Commercial Cleaning Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Office Cleaning", desc: "Daily office maintenance including desks and breakrooms." },
              { title: "Retail Space Cleaning", desc: "Keep your shop clean and welcoming for customers." },
              { title: "Warehouse Cleaning", desc: "Large-scale floor cleaning for warehouses and industrial spaces." },
              { title: "Medical/Healthcare", desc: "High-standard hygiene protocols for surgeries and clinics." },
              { title: "Hospitality Cleaning", desc: "Professional cleaning for hotels, restaurants, and venues." },
              { title: "Carpet & Floor Care", desc: "Professional carpet cleaning and floor maintenance." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Why Choose Neatedge</h2>
          <div className="space-y-6">
            {[
              { title: "Reliable Service", text: "Consistent, dependable cleaning on a schedule that fits your business." },
              { title: "Professional Standards", text: "All staff are fully trained, background-checked, and professional." },
              { title: "Flexible Scheduling", text: "Early morning, evening, or weekend cleaning to minimize disruption." },
              { title: "Fully Insured", text: "£5M public liability insurance covers accidental damage or loss." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded border-l-4 border-[#D4A574]">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Keep Your Business Spotless</h2>
          <p className="text-lg text-gray-700 mb-8">Get a free site survey and quotation.</p>
          <a href="/contact?enquiry=commercial-survey" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Book Your Site Survey</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
