'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

export default function PropertyProfessionalsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cleaning Support for Property Professionals</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">Trusted by estate agents, letting agents, landlords, and property managers across West London. Reliable, professional, on-demand.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact?enquiry=property-partnership" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Discuss a Property Partnership</Button>
            <Button href="/contact?enquiry=property-cleaning" className="border-2 border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-[#001F3F]">Get a Property Cleaning Quote</Button>
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
            <p className="text-2xl font-bold text-[#001F3F]">Quick Turnaround</p>
            <p className="text-gray-700">24-48 Hour Response</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#001F3F]">Discretion</p>
            <p className="text-gray-700">Professional, Confidential Service</p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Solutions for Property Professionals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Estate Agents</h3>
              <p className="text-gray-700 mb-4">Get properties photo-ready and move clients in fast. We handle viewings turnover, deep cleans between viewings, and post-sale sanitisation.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Rapid turnaround between viewings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Deep clean before photos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Post-exchange sanitisation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Letting Agents</h3>
              <p className="text-gray-700 mb-4">Reduce void periods and keep tenant satisfaction high. End of tenancy cleans, move-in refreshes, and damage assessments.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>End of tenancy cleaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Move-in refreshes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Damage documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">Landlords & Airbnb</h3>
              <p className="text-gray-700 mb-4">Maximize occupancy and guest reviews. Turnover cleans, weekly maintenance, and guest-ready sanitisation.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Fast turnover between guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Weekly maintenance cleans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-bold">✓</span>
                  <span>Guest satisfaction guaranteed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Partnership Benefits</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Dedicated Support</h3>
                <p className="text-gray-700">Your own point of contact for consistency and faster decision-making.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Flexible Pricing</h3>
                <p className="text-gray-700">Volume discounts and tailored packages for regular or bulk bookings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Priority Scheduling</h3>
                <p className="text-gray-700">Your bookings get priority slots and rapid turnaround when needed.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Professional Standards</h3>
                <p className="text-gray-700">All staff fully trained, insured, and able to provide documentation for audits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Services */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-6">Garden & Outdoor Maintenance</h2>
          <p className="text-gray-700 mb-8">Properties with well-maintained gardens attract better tenants and fetch higher rents. We offer garden tidying, leaf clearing, and basic outdoor maintenance to complement our cleaning services.</p>
          <Button href="/contact?enquiry=property-partnership" className="bg-[#001F3F] text-white hover:bg-[#003366]">Ask About Garden Services</Button>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">How We Work Together</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Understand Your Needs</h3>
                <p className="text-gray-700">We learn about your properties, typical cleaning demands, and your response time expectations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Agree a Framework</h3>
                <p className="text-gray-700">We set up pricing tiers, service standards, and booking procedures tailored to your workflow.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Book & Confirm</h3>
                <p className="text-gray-700">You book through our system or by direct contact. We confirm arrival time and send photo evidence on completion.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#001F3F] mb-2">Ongoing Support</h3>
                <p className="text-gray-700">Regular check-ins ensure quality, and we handle any issues or adjustments quickly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#001F3F] mb-12">Why Property Professionals Choose Neatedge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#001F3F] mb-3">Local Accountability</h3>
              <p className="text-gray-700">We're based in West London and know the properties and challenges of the area. You can speak to a person, not a call centre.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-3">Reliability</h3>
              <p className="text-gray-700">We show up on time and deliver consistent results. Your reputation depends on it; ours does too.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-3">Full Documentation</h3>
              <p className="text-gray-700">Photos, checklists, and evidence available for audits, disputes, or landlord verification.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#001F3F] mb-3">Scalable</h3>
              <p className="text-gray-700">Whether you need one property cleaned or ten, we scale to your needs without sacrificing quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#001F3F] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Partner With a Cleaning Service You Can Trust</h2>
          <p className="text-lg mb-8">Let's discuss how Neatedge can support your portfolio or business.</p>
          <Button href="/contact?enquiry=property-partnership" className="bg-[#D4A574] text-[#001F3F] hover:bg-yellow-600">Discuss a Partnership</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
