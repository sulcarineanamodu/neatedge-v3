'use client';

import Footer from '@/components/Footer';

export default function DeepCleaningPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Deep Cleaning That Transforms Your Home</h1>
          <p className="text-xl text-gray-100 mb-8">When a regular clean isn't enough. We reach the places you can't — deep into carpets, behind appliances, and into every corner.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=deep-cleaning-quote" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Book a Deep Clean</a>
            <a href="tel:07886091926" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Call 07886 091926</a>
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
            <p className="text-3xl font-bold text-[#001F3F]">Professional Grade</p>
            <p className="text-gray-700">Equipment & Techniques</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#001F3F]">Eco-Friendly</p>
            <p className="text-gray-700">Safe for Families & Pets</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">When Your Home Needs More Than a Regular Clean</h2>
          <p className="text-gray-700 mb-6">A deep clean isn't about surface tidiness. It's about restoring your home to a level of cleanliness that regular weekly cleaning can't achieve.</p>
          <p className="text-gray-700 mb-6">Deep cleaning targets the dirt, dust, and grime that accumulate over months or years. Behind radiators, inside ovens, beneath sofas, inside grout lines, on top of cupboards — anywhere dust settles and regular cleaning misses.</p>
          <p className="text-gray-700">We use professional-grade equipment, specialist cleaning solutions, and techniques designed to lift dirt that's set in. The result: a home that genuinely feels fresh and clean, not just tidy.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">What Makes a Deep Clean Different</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Steam Cleaning", desc: "Carpets, upholstery, grout lines, and tile cleaned with high-temperature steam. Kills bacteria and allergens." },
              { title: "Inside Appliances", desc: "Ovens, microwaves, fridges, and dishwashers cleaned inside and out. Remove built-up grease and food residue." },
              { title: "Walls & Ceilings", desc: "Dust and marks wiped from walls, ceilings, light fittings, and corners. No more grey patches." },
              { title: "Behind Furniture", desc: "We move sofas, beds, and wardrobes to clean underneath and behind. Removes trapped dust and pet hair." },
              { title: "Grout & Baseboards", desc: "Grout between tiles scrubbed and brightened. Skirting boards and baseboards cleaned throughout." },
              { title: "Window Tracks & Frames", desc: "Window frames and tracks cleaned deeply. Blind slats wiped individually. Glass cleaned to sparkle." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded border border-gray-200">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">When to Book a Deep Clean</h2>
          <div className="space-y-6">
            {[
              { title: "After Construction or Renovation", text: "Dust settles everywhere during work. A deep clean restores your home before you move back in." },
              { title: "Before Special Events", text: "Holiday gatherings, parties, or family visits. A deep clean makes your home spotless for guests." },
              { title: "Spring Refresh", text: "Annual deep clean to start the year fresh. Remove winter dust, pollen, and accumulated grime." },
              { title: "Allergy Season", text: "Deep steam cleaning removes allergens from carpets and furniture. Breathe easier." },
              { title: "Moving House", text: "Prepare your new home with a deep clean before unpacking. Start fresh in a sparkling home." },
              { title: "When Regular Cleaning Isn't Enough", text: "Every 6-12 months, homes benefit from deep cleaning to maintain hygiene and freshness." },
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
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Our Deep Cleaning Guarantee</h2>
          <div className="space-y-4 mb-8">
            <p className="text-gray-700">✓ Every surface cleaned to professional standards</p>
            <p className="text-gray-700">✓ Hard-to-reach areas included as standard</p>
            <p className="text-gray-700">✓ Eco-friendly products safe for families and pets</p>
            <p className="text-gray-700">✓ Fully insured and background-checked staff</p>
            <p className="text-gray-700">✓ Not satisfied? We come back and make it right at no extra cost</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Ready for a Real Deep Clean?</h2>
          <p className="text-lg text-gray-700 mb-8">Let us restore your home to spotless. Book your deep clean today and feel the difference.</p>
          <a href="/contact?enquiry=deep-cleaning-quote" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Book Your Deep Clean</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
