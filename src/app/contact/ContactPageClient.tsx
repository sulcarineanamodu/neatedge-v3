"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "direct";

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neatedge-curated/final-cta.webp"
            alt="Contact Neatedge"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/70 to-brand-navy/40"></div>
        </div>

        <div className="relative z-10 w-full px-md sm:px-lg md:px-xl">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="font-cinzel font-bold mb-lg sm:mb-xl leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>Get in Touch — Professional Cleaning Starts Here</h1>
            <p className="font-manrope text-base sm:text-lg md:text-xl mb-md sm:mb-lg max-w-3xl text-grey-light leading-relaxed">Call us, email us, or fill out the form below. We'll respond within 24 hours with a free quote.</p>
            <div className="flex flex-col xs:flex-row gap-md sm:gap-lg">
              <a href="#contact-form" className="inline-block bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">Send a Message</a>
              <a href="tel:07886091926" className="inline-block border-2 border-brand-gold text-brand-gold font-semibold px-6 py-3 rounded hover:bg-brand-gold hover:text-brand-navy transition-colors">Call 07886 091926</a>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-navy mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-8">Source: {source}</p>
          <Button>Contact Form</Button>
        </div>
      </div>
    </div>
  );
}
