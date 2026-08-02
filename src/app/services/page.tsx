import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Professional Cleaning Services Across West London | Neatedge',
  description: 'Explore residential, commercial and property cleaning services across Uxbridge, West Drayton, Hayes, Hillingdon and the Heathrow corridor.',
  canonical: 'https://neatedgecleaning.com/services',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Professional Cleaning Services Across West London</h1>
          <p className="text-xl text-gray-100 mb-8">Explore residential, commercial and property cleaning services for homes, businesses, landlords and property professionals across West London.</p>
          <div className="flex gap-4">
            <a href="/contact?enquiry=estimate" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-6 py-3 rounded hover:bg-yellow-600">Get a Cleaning Estimate</a>
            <a href="/contact?enquiry=commercial-survey" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-6 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Book a Free Site Survey</a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="bg-gray-50 py-3 px-4">
        <div className="max-w-6xl mx-auto text-sm text-gray-600">
          <a href="/" className="hover:text-[#001F3F]">Home</a> / <span className="text-gray-900">Services</span>
        </div>
      </section>

      {/* Priority Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-4">Most Requested Services</h2>
          <p className="text-gray-700 mb-12">Our most popular cleaning services, trusted by homeowners and businesses across West London.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "End of Tenancy Cleaning", desc: "Professional deep clean to pass landlord inspections and recover your deposit. 24-48 hour turnaround.", link: "/services/end-of-tenancy-cleaning" },
              { title: "Deep Cleaning", desc: "Comprehensive cleaning that reaches places regular cleaning misses. Perfect for seasonal refresh or post-construction cleanup.", link: "/services/deep-cleaning" },
              { title: "Office Cleaning", desc: "Keep your workplace spotless. Flexible scheduling around business hours — early morning, evening, or weekend service.", link: "/services/office-cleaning" },
              { title: "Carpet Cleaning", desc: "Professional steam cleaning that removes dirt, stains, allergens and odours. Carpets ready for use in 2-4 hours.", link: "/services/carpet-cleaning" },
            ].map((service) => (
              <a key={service.title} href={service.link} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.desc}</p>
                <span className="inline-block text-[#D4A574] font-semibold">Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Residential Services */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Residential Cleaning Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Regular Domestic Cleaning", desc: "Weekly, fortnightly or monthly maintenance cleaning. Keep your home fresh and tidy year-round." },
              { title: "Move-In Cleaning", desc: "Professional clean of your new home before you move in. Start fresh in a sparkling space." },
              { title: "Move-Out Cleaning", desc: "Deep clean when leaving a property. Includes carpet cleaning and detailed finish." },
              { title: "Oven Cleaning", desc: "Heavy-duty oven cleaning service. Professional results without the fumes or elbow grease." },
              { title: "After-Builders Cleaning", desc: "Complete cleanup after construction or renovation work. Every surface cleaned and polished." },
              { title: "Spring & Seasonal Cleans", desc: "Annual deep clean to refresh your home. Perfect for spring, autumn or before guests arrive." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{service.desc}</p>
                <a href="/contact?enquiry=residential-estimate" className="inline-block text-[#D4A574] font-semibold text-sm hover:text-[#001F3F]">Get a quote →</a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/residential" className="inline-block bg-[#001F3F] text-white font-semibold px-8 py-3 rounded hover:bg-[#003366]">View All Residential Services</a>
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Commercial & Business Cleaning</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Retail Space Cleaning", desc: "Keep your shop clean and welcoming for customers. Daily, weekly or bespoke schedules." },
              { title: "Commercial Contract Cleaning", desc: "Ongoing cleaning services for offices, warehouses and industrial spaces on flexible contracts." },
              { title: "Communal-Area Cleaning", desc: "Hallways, lifts, lobbies and shared spaces cleaned to professional standards." },
              { title: "Retail & Hospitality", desc: "Restaurants, hotels and venues. Flexible scheduling to minimise disruption to guests." },
              { title: "Medical & Professional", desc: "High-standard hygiene protocols for surgeries, clinics, and professional service businesses." },
              { title: "Flexible Scheduling", desc: "24/7 availability. Early morning, evening or weekend cleaning around your business hours." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{service.desc}</p>
                <a href="/contact?enquiry=commercial-quote" className="inline-block text-[#D4A574] font-semibold text-sm hover:text-[#001F3F]">Get a quote →</a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/commercial" className="inline-block bg-[#001F3F] text-white font-semibold px-8 py-3 rounded hover:bg-[#003366]">View All Commercial Services</a>
          </div>
        </div>
      </section>

      {/* Property & Landlord Services */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Services for Property Professionals</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Estate Agent Cleaning", desc: "Rapid turnaround before viewings. Deep clean and photo-ready finish." },
              { title: "Letting Agent Support", desc: "End of tenancy cleaning, move-in refreshes, damage documentation and photographs." },
              { title: "Landlord Property Prep", desc: "Get your rental property spotless between tenants. Deep clean and damage assessment." },
              { title: "Airbnb & Serviced Accommodation", desc: "Fast turnover between guests. Weekly or daily cleaning tailored to your schedule." },
              { title: "Portfolio Management", desc: "Managing multiple properties? We offer volume discounts and priority scheduling." },
              { title: "Professional Standards", desc: "All staff fully trained, insured and background-checked. Documentation provided." },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded border border-gray-200 hover:shadow-lg">
                <h3 className="font-bold text-[#001F3F] mb-2 text-lg">{service.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{service.desc}</p>
                <a href="/contact?enquiry=property-partnership" className="inline-block text-[#D4A574] font-semibold text-sm hover:text-[#001F3F]">Discuss partnership →</a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/property-professionals" className="inline-block bg-[#001F3F] text-white font-semibold px-8 py-3 rounded hover:bg-[#003366]">View Property Professional Services</a>
          </div>
        </div>
      </section>

      {/* How We Estimate */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">How Neatedge Estimates Your Cleaning Job</h2>
          <div className="space-y-8">
            {[
              { num: 1, title: "You Contact Us", text: "Tell us about your property, the service you need, and your location. Phone, email or online form." },
              { num: 2, title: "We Discuss Your Needs", text: "We ask questions to understand the scope — size, condition, special requirements, timeline." },
              { num: 3, title: "Free Site Survey (Optional)", text: "For commercial or large properties, we often visit to assess the work and provide an accurate quote." },
              { num: 4, title: "Transparent Quote", text: "You receive a detailed quote with no hidden costs. We explain exactly what's included." },
              { num: 5, title: "Schedule Your Clean", text: "If you agree, we schedule the work at a time that suits you. Flexible and straightforward." },
            ].map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="w-16 h-16 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-lg">{step.num}</div>
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F] mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">What Type of Customer Are You?</h2>
          <p className="text-gray-700 mb-12 text-center">Find the services and information most relevant to your situation.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Homeowner", desc: "Regular cleaning, deep cleans, carpet cleaning, move-in/move-out services.", link: "/residential" },
              { title: "Business Owner", desc: "Office cleaning, retail space cleaning, flexible commercial contracts.", link: "/commercial" },
              { title: "Property Professional", desc: "End of tenancy, landlord support, estate agent services, Airbnb cleaning.", link: "/property-professionals" },
            ].map((journey) => (
              <a key={journey.title} href={journey.link} className="bg-white p-8 rounded border-2 border-[#001F3F] hover:bg-blue-50 transition-colors">
                <h3 className="text-2xl font-bold text-[#001F3F] mb-4">{journey.title}</h3>
                <p className="text-gray-700 mb-6">{journey.desc}</p>
                <span className="inline-block text-[#D4A574] font-semibold">Explore services →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* West London Coverage */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-8">Service Coverage Across West London</h2>
          <p className="text-gray-700 mb-6">We serve Uxbridge, West Drayton, Hayes, Hillingdon and surrounding areas including Ealing, Richmond, Staines and the M25 corridor.</p>
          <p className="text-gray-700 mb-6">Our local base means faster response times, better knowledge of the area, and genuine accountability to the communities we serve.</p>
          <a href="/areas" className="inline-block bg-[#001F3F] text-white font-semibold px-6 py-3 rounded hover:bg-[#003366]">View All Service Areas</a>
        </div>
      </section>

      {/* Services FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#001F3F] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Which service is right for me?", a: "Depends on your needs. Homeowners typically choose regular cleaning, deep cleans, or end-of-tenancy. Businesses prefer commercial contracts. Property professionals use end-of-tenancy and landlord services." },
              { q: "How do you price cleaning services?", a: "Pricing depends on property size, condition, location and scope of work. We provide free quotes. Contact us to discuss your specific needs." },
              { q: "Can you do emergency or urgent cleaning?", a: "Yes. For urgent jobs, call us directly. We often accommodate rush requests within 24-48 hours depending on availability." },
              { q: "Are your cleaners insured?", a: "Yes. All our staff carry £5M public liability insurance. We're also background-checked and fully trained." },
              { q: "Do you use eco-friendly products?", a: "We use professional-grade cleaning solutions. We can use eco-friendly products if requested — ask when you book." },
              { q: "What if I'm not satisfied with the cleaning?", a: "We stand behind our work. If you're not happy, contact us and we'll return to make it right at no extra cost." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded border border-gray-200">
                <h3 className="font-bold text-[#001F3F] mb-3 text-lg">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#001F3F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Cleaning Service?</h2>
          <p className="text-lg text-gray-100 mb-8">Get a free quote or book a site survey. No obligation, no hidden costs.</p>
          <div className="flex gap-4 justify-center">
            <a href="/contact?enquiry=estimate" className="inline-block bg-[#D4A574] text-[#001F3F] font-semibold px-8 py-3 rounded hover:bg-yellow-600">Get a Free Quote</a>
            <a href="tel:07886091926" className="inline-block border-2 border-[#D4A574] text-[#D4A574] font-semibold px-8 py-3 rounded hover:bg-[#D4A574] hover:text-[#001F3F]">Call 07886 091926</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
