'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cleaning Services Across West London</h1>
          <p className="text-lg md:text-xl text-gray-100">We serve Uxbridge, West Drayton, Hayes, Hillingdon, and surrounding areas. Local, reliable, professional cleaning.</p>
        </div>
      </section>

      {/* Primary Coverage Areas */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Our Primary Service Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Uxbridge</h3>
              <p className="text-gray-700 mb-6">Town centre and residential areas. Quick response, flexible scheduling.</p>
              <Button href="/contact?enquiry=residential-estimate" className="w-full bg-[#001F3F] text-white hover:bg-[#003366] text-sm">Get a Quote</Button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">West Drayton</h3>
              <p className="text-gray-700 mb-6">Residential and commercial properties. Same-day response available.</p>
              <Button href="/contact?enquiry=residential-estimate" className="w-full bg-[#001F3F] text-white hover:bg-[#003366] text-sm">Get a Quote</Button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Hayes</h3>
              <p className="text-gray-700 mb-6">Homes, offices, and commercial spaces. Trusted by local businesses.</p>
              <Button href="/contact?enquiry=commercial-survey" className="w-full bg-[#001F3F] text-white hover:bg-[#003366] text-sm">Book a Survey</Button>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Hillingdon</h3>
              <p className="text-gray-700 mb-6">Covering all of the London borough. Flexible, professional service.</p>
              <Button href="/contact?enquiry=residential-estimate" className="w-full bg-[#001F3F] text-white hover:bg-[#003366] text-sm">Get a Quote</Button>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 text-center"><strong>Don't see your area listed?</strong> We serve beyond these main locations. Contact us to check if we can help you.</p>
          </div>
        </div>
      </section>

      {/* Coverage Map Info */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-8">Wider Coverage</h2>
          <p className="text-gray-700 mb-6">While our primary focus is the core West London areas listed above, we regularly serve properties across the surrounding region, including Ealing, Richmond, Staines, and areas along the M25 corridor.</p>
          <p className="text-gray-700 mb-6">Travel time affects pricing and availability, so we're always upfront about what a service will cost based on your location. Contact us with your postcode and we'll confirm coverage and give you an accurate quote.</p>
          <p className="text-gray-700">For property professionals managing multiple sites, we offer flexible scheduling and discount pricing for larger bookings.</p>
        </div>
      </section>

      {/* Services by Area */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Services Available in All Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Residential Cleaning" description="Weekly, fortnightly, or one-off cleans for homes across West London." />
            <Card title="Commercial Cleaning" description="Office, retail, and business space cleaning with flexible scheduling." />
            <Card title="Property Professional Services" description="End of tenancy, move-in refreshes, and rapid turnaround cleans." />
            <Card title="Deep Cleaning" description="Thorough, detailed cleaning for homes after construction or heavy use." />
            <Card title="Carpet & Floor Care" description="Professional carpet steam cleaning and floor maintenance." />
            <Card title="Garden Tidying" description="Basic outdoor maintenance and leaf clearing in select areas." />
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-8">Why Local Matters</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Fast Response Times</h3>
                <p className="text-gray-700">No long waiting lists. We know the area and can often arrange cleaning within 24-48 hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Personal Accountability</h3>
                <p className="text-gray-700">You can actually speak to someone who knows your area and cares about their local reputation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Understanding Local Challenges</h3>
                <p className="text-gray-700">We know the parking, access, and planning issues unique to West London properties.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Fair Pricing</h3>
                <p className="text-gray-700">No premium for being "local." Transparent pricing based on job size and scope, not corporate markups.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">How to Book in Your Area</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-2xl font-bold text-[#D4A574]">1</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Tell Us Your Postcode</h3>
                <p className="text-gray-700">Use our online form or call us. Include your postcode so we can confirm coverage and estimate travel time.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-2xl font-bold text-[#D4A574]">2</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Get a Quote</h3>
                <p className="text-gray-700">We'll ask about your property, cleaning needs, and preferred schedule. No hidden costs—just a clear, transparent quote.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-2xl font-bold text-[#D4A574]">3</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Confirm & Schedule</h3>
                <p className="text-gray-700">Accept the quote and we'll find a time that works for you. We confirm 24 hours before the clean.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-2xl font-bold text-[#D4A574]">4</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Relax</h3>
                <p className="text-gray-700">We arrive on time and leave your home clean. Simple as that.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-4">Check Availability for Your Area</h2>
          <p className="text-gray-700 mb-8">Not sure if we cover your location? Get in touch and we'll let you know.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact?enquiry=residential-estimate" className="bg-[#001F3F] text-white hover:bg-[#003366]">Request a Quote Online</Button>
            <Button href="tel:07886091926" className="border-2 border-[#001F3F] text-[#001F3F] hover:bg-[#001F3F] hover:text-white">Call 07886 091926</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
