"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const enquiry = searchParams.get("enquiry") || "general";

  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/final-cta.webp"
            alt="Get in touch with Neatedge"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Get in Touch With Neatedge</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Have a question? Ready to book? We'd love to hear from you.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="#contact-form" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Send a Message</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Contact Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Call Us", phone: "07886 091926", hours: ["Mon–Fri: 8am–6pm", "Sat: 10am–4pm", "Sun: Closed"] },
              { title: "Email Us", email: "info@neatedgecleaning.com", note: "Within 24 hours" },
              { title: "Message Us", note: "WhatsApp for quick inquiries" },
            ].map((method, idx) => (
              <div key={idx} className="bg-white p-6 rounded shadow">
                <h3 className="font-bold text-[#001F3F] mb-4 text-lg">{method.title}</h3>
                {method.phone && <p className="text-lg font-semibold text-brand-gold mb-2">{method.phone}</p>}
                {method.email && <p className="text-lg font-semibold text-brand-gold mb-2">{method.email}</p>}
                {method.hours && <div className="text-sm text-gray-700 space-y-1">{method.hours.map((h, i) => <p key={i}>{h}</p>)}</div>}
                {method.note && <p className="text-sm text-gray-700">{method.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-8 font-cinzel">Business Hours</h2>
          <div className="bg-white p-8 rounded shadow max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between"><p className="font-medium text-[#001F3F]">Monday–Friday</p><p className="text-gray-700">8am–6pm</p></div>
              <div className="flex justify-between"><p className="font-medium text-[#001F3F]">Saturday</p><p className="text-gray-700">10am–4pm</p></div>
              <div className="flex justify-between"><p className="font-medium text-[#001F3F]">Sunday</p><p className="text-gray-700">Closed (enquiries via email/form welcome)</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4" id="contact-form">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-8 font-cinzel">Send Us Your Details</h2>
          <p className="text-center text-gray-700 mb-8">Fill out the form below and we'll respond within 24 hours with a quote or to discuss your needs.</p>

          <form action="/api/enquiry" method="POST" className="bg-white p-8 rounded shadow space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#001F3F] mb-2">Enquiry Type</label>
              <select defaultValue={enquiry} name="enquiry" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]">
                <option value="general">General Enquiry</option>
                <option value="estimate">Cleaning Estimate</option>
                <option value="residential-estimate">Residential Estimate</option>
                <option value="commercial-quote">Commercial Quote</option>
                <option value="commercial-survey">Commercial Site Survey</option>
                <option value="end-of-tenancy-quote">End-of-Tenancy Quote</option>
                <option value="deep-cleaning-quote">Deep Cleaning Quote</option>
                <option value="property-partnership">Property Professional Partnership</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#001F3F] mb-2">Your Name</label>
                <input type="text" name="name" placeholder="John Smith" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#001F3F] mb-2">Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001F3F] mb-2">Phone Number</label>
              <input type="tel" name="phone" placeholder="07123 456789" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001F3F] mb-2">Property Type & Location</label>
              <input type="text" name="property" placeholder="e.g., 2-bed house in Uxbridge" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#001F3F] mb-2">Tell Us About Your Cleaning Needs</label>
              <textarea name="message" placeholder="What cleaning services are you looking for?" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#001F3F]"></textarea>
            </div>

            <button type="submit" className="w-full bg-brand-gold text-brand-navy font-semibold py-3 rounded hover:bg-yellow-400 transition-colors">Send Enquiry</button>

            <p className="text-xs text-gray-600 text-center">We'll respond within 24 hours. Typical response time is 2-4 hours.</p>
          </form>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Submit Your Inquiry or Call Us', desc: 'Tell us what you need or speak to us directly.' },
              { step: 2, title: 'We Confirm Availability', desc: 'We'll confirm coverage and understand your needs.' },
              { step: 3, title: 'Schedule and Enjoy', desc: 'Pick a date and time, and let us handle the rest.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#001F3F] mb-12 font-cinzel">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "How quickly do you respond to inquiries?", a: "We aim to respond within 24 hours. Most enquiries get a response within 2-4 hours during business hours." },
              { q: "Can I book outside business hours?", a: "You can submit an enquiry form anytime. We'll get back to you as soon as possible." },
              { q: "What information do you need upfront?", a: "Tell us about your property, cleaning type, and any specific requirements." },
              { q: "Do you offer emergency cleaning?", a: "Yes. Call us for urgent requests. We often accommodate rush jobs within 24-48 hours." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded border-l-4 border-brand-gold">
                <h3 className="font-bold text-[#001F3F] mb-2">{item.q}</h3>
                <p className="text-sm text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-cinzel">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-grey-light">Get in touch today. We'll discuss your cleaning needs and provide a free quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:07886091926" className="inline-block bg-brand-gold text-brand-navy font-semibold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Call 07886 091926</a>
            <a href="mailto:info@neatedgecleaning.com" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Email Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
