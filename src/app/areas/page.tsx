'use client';

import Footer from '@/components/Footer';

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Cleaning Services Across West London</h1>
          <p className="text-xl text-gray-100">We serve Uxbridge, West Drayton, Hayes, Hillingdon, and surrounding areas.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Primary Service Areas</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Uxbridge", desc: "Town centre and residential areas. Quick response." },
              { name: "West Drayton", desc: "Residential and commercial properties. Same-day response." },
              { name: "Hayes", desc: "Homes, offices, and commercial spaces. Trusted locally." },
              { name: "Hillingdon", desc: "Covering all of the London borough. Flexible service." },
            ].map((area) => (
              <div key={area.name} className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">{area.name}</h3>
                <p className="text-gray-700 text-sm mb-6">{area.desc}</p>
                <a href="/contact?enquiry=residential-estimate" className="inline-block bg-[#001F3F] text-white font-semibold px-4 py-2 rounded text-sm hover:bg-[#003366]">Get a Quote</a>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 text-center"><strong>Don't see your area listed?</strong> We serve beyond these main locations. Contact us to check if we can help you.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Wider Coverage</h2>
          <p className="text-gray-700 mb-6">While our primary focus is the core West London areas listed above, we regularly serve properties across the surrounding region, including Ealing, Richmond, Staines, and areas along the M25 corridor.</p>
          <p className="text-gray-700 mb-6">Travel time affects pricing and availability, so we're always upfront about what a service will cost based on your location.</p>
          <p className="text-gray-700">For property professionals managing multiple sites, we offer flexible scheduling and discount pricing.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Services Available in All Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Residential Cleaning", desc: "Weekly, fortnightly, or one-off cleans for homes." },
              { title: "Commercial Cleaning", desc: "Office, retail, and business space cleaning." },
              { title: "Property Professional Services", desc: "End of tenancy, move-in refreshes, and rapid turnarounds." },
              { title: "Deep Cleaning", desc: "Thorough, detailed cleaning after construction or heavy use." },
              { title: "Carpet & Floor Care", desc: "Professional carpet steam cleaning and floor maintenance." },
              { title: "Garden Tidying", desc: "Basic outdoor maintenance and leaf clearing." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Why Local Matters</h2>
          <div className="space-y-6">
            {[
              { title: "Fast Response Times", text: "No long waiting lists. We often arrange cleaning within 24-48 hours." },
              { title: "Personal Accountability", text: "You can actually speak to someone who knows your area and cares." },
              { title: "Understanding Local Challenges", text: "We know the parking, access, and planning issues unique to West London." },
              { title: "Fair Pricing", text: "No premium for being local. Transparent pricing based on job scope." },
            ].map((point) => (
              <div key={point.title} className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-[#001F3F] mb-1">{point.title}</h3>
                  <p className="text-gray-700">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Check Availability for Your Area</h2>
          <p className="text-gray-700 mb-8">Not sure if we cover your location? Get in touch and we'll let you know.</p>
          <div className="flex gap-4 justify-center">
            <a href="/contact?enquiry=residential-estimate" className="inline-block bg-[#001F3F] text-white font-semibold px-8 py-3 rounded hover:bg-[#003366]">Request a Quote Online</a>
            <a href="tel:07886091926" className="inline-block border-2 border-[#001F3F] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-[#001F3F] hover:text-white">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
