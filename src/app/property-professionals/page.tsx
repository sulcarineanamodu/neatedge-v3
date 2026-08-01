'use client';

import Footer from '@/components/Footer';

export default function PropertyProfessionalsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Cleaning Support for Property Professionals</h1>
          <p className="text-xl text-gray-100 mb-8">Trusted by estate agents, letting agents, landlords, and property managers across West London.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=property-partnership" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Discuss a Partnership</a>
            <a href="/contact?enquiry=property-cleaning" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Get a Quote</a>
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
            <p className="text-3xl font-bold text-[#001F3F]">Quick Turnaround</p>
            <p className="text-gray-700">24-48 Hour Response</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Discretion</p>
            <p className="text-gray-700">Professional Service</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Solutions for Property Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Estate Agents", items: ["Rapid turnaround between viewings", "Deep clean before photos", "Post-exchange sanitisation"] },
              { title: "Letting Agents", items: ["End of tenancy cleaning", "Move-in refreshes", "Damage documentation"] },
              { title: "Landlords & Airbnb", items: ["Fast turnover between guests", "Weekly maintenance cleans", "Guest satisfaction guaranteed"] },
            ].map((solution) => (
              <div key={solution.title} className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">{solution.title}</h3>
                <ul className="space-y-2">
                  {solution.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4A574] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Partnership Benefits</h2>
          <div className="space-y-6">
            {[
              { title: "Dedicated Support", text: "Your own point of contact for consistency and faster decisions." },
              { title: "Flexible Pricing", text: "Volume discounts and tailored packages for regular bookings." },
              { title: "Priority Scheduling", text: "Your bookings get priority slots and rapid turnaround." },
              { title: "Professional Standards", text: "All staff fully trained, insured, and able to provide documentation." },
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-[#001F3F] mb-1">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Partner With a Cleaning Service You Can Trust</h2>
          <p className="text-lg text-gray-700 mb-8">Let's discuss how Neatedge can support your portfolio.</p>
          <a href="/contact?enquiry=property-partnership" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Discuss a Partnership</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
