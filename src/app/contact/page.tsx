'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

type EnquiryType = 'general' | 'residential-estimate' | 'commercial-survey' | 'property-partnership';

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
    privacyConsent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          telephone: formData.phone,
          postcode: formData.postcode,
          message: formData.message,
          privacyConsent: formData.privacyConsent,
          enquiryType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', postcode: '', message: '', privacyConsent: false });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const getHeadline = () => {
    switch (enquiryType) {
      case 'residential-estimate':
        return 'Get Your Residential Cleaning Estimate';
      case 'commercial-survey':
        return 'Book Your Commercial Site Survey';
      case 'property-partnership':
        return 'Partner With Neatedge';
      default:
        return 'Get In Touch';
    }
  };

  const getDescription = () => {
    switch (enquiryType) {
      case 'residential-estimate':
        return 'Tell us about your home and receive a free, no-obligation quote within 24 hours.';
      case 'commercial-survey':
        return 'Schedule a free site survey for your office or commercial space.';
      case 'property-partnership':
        return "Let's discuss how we can support your property business.";
      default:
        return "Have a question? Get in touch and we'll respond within 24 hours.";
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#001F3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{getHeadline()}</h1>
          <p className="text-xl text-gray-100">{getDescription()}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <label className="block text-lg font-bold text-[#001F3F] mb-4">What are you enquiring about?</label>
            <select
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
            >
              <option value="general">General Enquiry</option>
              <option value="residential-estimate">Residential Cleaning Estimate</option>
              <option value="commercial-survey">Commercial Site Survey</option>
              <option value="property-partnership">Property Professional Partnership</option>
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#001F3F] mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
                placeholder="Your name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#001F3F] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#001F3F] mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
                  placeholder="07XXXX XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#001F3F] mb-2">Postcode *</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
                placeholder="e.g., UB3 2PN"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#001F3F] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
                placeholder="Tell us about your cleaning needs..."
              />
            </div>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                ✓ Thanks! We've received your enquiry and will be in touch within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                ✗ Error: {errorMsg}. Please try again or call 07886 091926.
              </div>
            )}

            <div className="flex items-start">
              <input
                type="checkbox"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 border border-gray-300 rounded focus:outline-none focus:border-[#D4A574]"
              />
              <label className="ml-3 text-sm text-gray-700">
                I agree to the privacy policy and consent to being contacted about my enquiry *
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !formData.privacyConsent}
              className="w-full bg-[#D4A574] text-[#001F3F] font-bold py-3 rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-[#001F3F] mb-6">Other Ways to Contact Us</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#001F3F] mb-2">Phone</h4>
                <p className="text-gray-700">
                  <a href="tel:07886091926" className="text-[#D4A574] hover:text-[#001F3F]">
                    07886 091926
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-2">Mon–Fri 8am–6pm, Sat 9am–2pm</p>
              </div>
              <div>
                <h4 className="font-bold text-[#001F3F] mb-2">Email</h4>
                <p className="text-gray-700">
                  <a href="mailto:info@neatedgecleaning.co.uk" className="text-[#D4A574] hover:text-[#001F3F]">
                    info@neatedgecleaning.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
