'use client';

import Footer from '@/components/Footer';

export default function OfficeCleaningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Professional Office Cleaning for West London Businesses</h1>
          <p className="text-xl text-gray-100 mb-8">Keep your office spotless without disrupting your team. Flexible scheduling around your business hours.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=office-cleaning-survey" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Book a Free Site Survey</a>
            <a href="/contact?enquiry=office-cleaning-quote" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Request a Quote</a>
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Why Office Cleaning Matters</h2>
          <p className="text-gray-700 mb-6">A clean office isn't just about appearances. It affects productivity, morale, health, and how clients perceive your business. Professional office cleaning keeps your workspace hygienic, organised, and professional — without taking your team's attention away from core work.</p>
          <p className="text-gray-700 mb-6">We handle office cleaning around your business hours. Early morning arrival before staff, end-of-day after everyone leaves, or weekend deep cleans — whatever suits your operation.</p>
          <p className="text-gray-700">Your office is your professional space. It deserves professional care.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Office Cleaning Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Daily Office Maintenance", desc: "Desks wiped, bins emptied, floors vacuumed/mopped, bathrooms cleaned. Scheduled daily or weekly." },
              { title: "Reception & Common Areas", desc: "Waiting areas, hallways, kitchens kept pristine. First impression matters." },
              { title: "Breakroom & Kitchen", desc: "Appliances cleaned, worktops sanitised, floors cleaned. Staff kitchen stays hygienic." },
              { title: "Bathroom Cleaning", desc: "Toilets, sinks, showers cleaned and sanitised. Hand towels, soap, and air freshener restocked." },
              { title: "Carpet & Floor Care", desc: "Vacuum, shampoo, or professional cleaning depending on flooring type." },
              { title: "Glass & Windows", desc: "Interior windows, glass partitions, and doors cleaned and polished." },
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
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Why Choose Neatedge for Office Cleaning</h2>
          <div className="space-y-6">
            {[
              { title: "Minimal Disruption", text: "We work around your schedule — early mornings, evenings, or weekends. Your team stays focused." },
              { title: "Professional Standards", text: "Consistent quality every single day. All staff fully trained and background-checked." },
              { title: "Flexible Contracts", text: "Daily, weekly, fortnightly, or one-off cleans. Adjust frequency and scope anytime." },
              { title: "Fully Insured", text: "£5M public liability insurance covers accidental damage. Work with confidence." },
              { title: "Responsive", text: "Something spilled? Unexpected guest visit? We respond quickly to urgent requests." },
              { title: "Eco-Friendly", text: "Professional cleaning products that are safe for staff and the environment." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-[#001F3F] mb-1">{item.title}</h3>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Common Office Cleaning Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Can you clean while we're working?", a: "Yes, we can. Many offices prefer morning or lunchtime cleaning. We're discreet and work around your team." },
              { q: "What about sensitive areas?", a: "We respect confidentiality. Server rooms, executive offices, and sensitive areas handled with care." },
              { q: "How often should we clean?", a: "Depends on foot traffic and business type. Most offices benefit from daily or twice-weekly cleaning." },
              { q: "Do you supply cleaning products?", a: "Yes. We provide all cleaning supplies, or use yours if preferred. Either way, supplies are included in pricing." },
              { q: "What if something goes wrong?", a: "We're insured and professional. If there's an issue, we address it immediately and make it right." },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-[#D4A574] pl-6">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Let Your Office Shine</h2>
          <p className="text-lg text-gray-700 mb-8">A clean office is a productive office. Schedule a free site survey and quotation today.</p>
          <a href="/contact?enquiry=office-cleaning-survey" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Book Your Site Survey</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
