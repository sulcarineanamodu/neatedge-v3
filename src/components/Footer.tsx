'use client';

import React from 'react';

/**
 * Footer Component
 * 4-column responsive footer with business info
 * Mobile-first responsive design
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Main footer content */}
      <div className="max-w-container mx-auto px-md py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {/* Column 1: About */}
          <div>
            <h3 className="h5 mb-md text-brand-gold">About Neatedge</h3>
            <p className="text-body-sm text-grey-light mb-md">
              Professional cleaning and garden care services serving London and the South
              East since 2026.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="h5 mb-md text-brand-gold">Services</h3>
            <ul className="space-y-sm">
              <li>
                <a
                  href="/services/commercial-cleaning"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  Commercial Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/services/residential-cleaning"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  Residential Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/services/end-of-tenancy"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  End of Tenancy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="h5 mb-md text-brand-gold">Company</h3>
            <ul className="space-y-sm">
              <li>
                <a
                  href="/about"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-body-sm hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="h5 mb-md text-brand-gold">Get In Touch</h3>
            <div className="space-y-sm text-body-sm">
              <p>
                Email:{' '}
                <a
                  href="mailto:info@neatedgecleaning.co.uk"
                  className="text-brand-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  info@neatedgecleaning.co.uk
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href="tel:+44XXXXXXXXX"
                  className="text-brand-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-1"
                >
                  +44 (0) XXXX XXX XXX
                </a>
              </p>
              <p>London, UK</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-midnight my-3xl"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-body-sm text-grey-light">
            &copy; 2026 Neatedge Cleaning. All rights reserved.
          </p>
          <div className="flex gap-lg">
            <a
              href="https://instagram.com/neatedgecleaning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-2 py-1"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/neatedge-cleaning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded px-2 py-1"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
