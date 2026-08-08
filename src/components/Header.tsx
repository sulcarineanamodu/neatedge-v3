'use client';

import React, { useState } from 'react';

/**
 * Header Component
 * Sticky navigation bar with mobile menu
 * Fully accessible with keyboard navigation
 */
export const Header: React.FC<{ logoSrc?: string }> = ({ logoSrc }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-brand-navy shadow-md">
      <nav className="max-w-container mx-auto px-md py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logoSrc ? (
            <img src={logoSrc} alt="Neatedge Cleaning" className="h-8 w-auto" />
          ) : (
            <a href="/" className="text-xl font-bold text-brand-gold hover:text-brand-navy transition-colors">
              Neatedge
            </a>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-sm flex-1 justify-center flex-nowrap">
          <a
            href="/"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Home
          </a>
          <a
            href="/residential"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Residential
          </a>
          <a
            href="/commercial"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Commercial
          </a>
          <a
            href="/property-professionals"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Property Professionals
          </a>
          <a
            href="/services"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Services
          </a>
          <a
            href="/areas"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Areas
          </a>
          <a
            href="/about"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            Contact
          </a>
        </div>

        {/* CTA and Phone */}
        <div className="hidden lg:flex items-center gap-md flex-shrink-0 whitespace-nowrap">
          <a
            href="tel:07886091926"
            className="text-body font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2 py-1"
          >
            07886 091926
          </a>
          <a
            href="/contact?enquiry=estimate"
            className="px-5 py-2 bg-brand-gold text-brand-navy font-semibold rounded-base hover:bg-yellow-400 transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Get an Estimate
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          className="lg:hidden p-2 rounded-base text-brand-navy hover:bg-gray-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-150 ${isMenuOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-gray-50 border-t border-brand-gold"
        >
          <div className="px-md py-4 space-y-2">
            <a
              href="/"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Home
            </a>
            <a
              href="/residential"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Residential
            </a>
            <a
              href="/commercial"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Commercial
            </a>
            <a
              href="/property-professionals"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Property Professionals
            </a>
            <a
              href="/services"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Services
            </a>
            <a
              href="/areas"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Areas
            </a>
            <a
              href="/about"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              About
            </a>
            <a
              href="/contact"
              onClick={closeMenu}
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              Contact
            </a>
            <a
              href="tel:07886091926"
              className="block py-2 text-base font-medium text-brand-navy hover:text-brand-gold transition-colors duration-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy rounded px-2"
            >
              07886 091926
            </a>
            <a
              href="/contact?enquiry=estimate"
              className="block w-full mt-4 px-5 py-2 bg-brand-gold text-brand-navy font-semibold rounded-base hover:bg-yellow-400 transition-colors duration-standard text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              Get an Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
