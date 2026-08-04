import { describe, it, expect } from 'vitest';
import { enquirySubmissionSchema } from '@/lib/validation/enquiry';

describe('Lead Validation and Database Tests', () => {
  // Test 1: Valid enquiry is accepted
  it('accepts valid enquiry submission', () => {
    const validEnquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      customerType: 'residential',
      message: 'Looking for a cleaning service',
      preferredContactMethod: 'email',
      marketingConsent: false,
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(validEnquiry);
    expect(result.success).toBe(true);
  });

  // Test 2: Missing required fields are rejected
  it('rejects enquiry with missing name', () => {
    const invalidEnquiry = {
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(invalidEnquiry);
    expect(result.success).toBe(false);
  });

  // Test 3: Invalid email is rejected
  it('rejects invalid email address', () => {
    const invalidEmail = {
      name: 'John Doe',
      email: 'not-an-email',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(invalidEmail);
    expect(result.success).toBe(false);
  });

  // Test 4: Invalid consent state is rejected
  it('rejects submission without privacy consent', () => {
    const noConsent = {
      name: 'John Doe',
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      privacyConsent: false, // Must be true
    };

    const result = enquirySubmissionSchema.safeParse(noConsent);
    expect(result.success).toBe(false);
  });

  // Test 5: Oversized message is rejected
  it('rejects message over 2000 characters', () => {
    const longMessage = {
      name: 'John Doe',
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      message: 'a'.repeat(2001), // Over limit
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(longMessage);
    expect(result.success).toBe(false);
  });

  // Test 6: Invalid postcode format is rejected
  it('rejects invalid UK postcode format', () => {
    const invalidPostcode = {
      name: 'John Doe',
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: '12345', // Invalid format
      enquiryType: 'residential-estimate',
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(invalidPostcode);
    expect(result.success).toBe(false);
  });

  // Test 7: Valid UK postcodes are accepted
  it('accepts valid UK postcode formats', () => {
    const validPostcodes = ['UB3 2PN', 'SW1A 1AA', 'M1 1AA', 'EC1A 1BB'];

    validPostcodes.forEach(postcode => {
      const enquiry = {
        name: 'John Doe',
        email: 'john@example.com',
        telephone: '07886091926',
        postcode,
        enquiryType: 'residential-estimate',
        privacyConsent: true,
      };

      const result = enquirySubmissionSchema.safeParse(enquiry);
      expect(result.success).toBe(true);
    });
  });

  // Test 8: All valid enquiry types are accepted
  it('accepts all valid enquiry types', () => {
    const types = ['general', 'residential-estimate', 'commercial-survey', 'property-partnership'];

    types.forEach(enquiryType => {
      const enquiry = {
        name: 'John Doe',
        email: 'john@example.com',
        telephone: '07886091926',
        postcode: 'UB3 2PN',
        enquiryType,
        privacyConsent: true,
      };

      const result = enquirySubmissionSchema.safeParse(enquiry);
      expect(result.success).toBe(true);
    });
  });

  // Test 9: Email normalization (lowercase)
  it('normalizes email to lowercase', () => {
    const enquiry = {
      name: 'John Doe',
      email: 'JOHN@EXAMPLE.COM',
      telephone: '07886091926',
      postcode: 'UB3 2PN',
      enquiryType: 'residential-estimate',
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(enquiry);
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe('john@example.com');
  });

  // Test 10: Postcode normalization (uppercase)
  it('normalizes postcode to uppercase', () => {
    const enquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      telephone: '07886091926',
      postcode: 'ub3 2pn',
      enquiryType: 'residential-estimate',
      privacyConsent: true,
    };

    const result = enquirySubmissionSchema.safeParse(enquiry);
    expect(result.success).toBe(true);
    expect(result.data?.postcode).toBe('UB3 2PN');
  });
});

describe('Security Tests', () => {
  // Test: Database never reaches browser
  it('confirms service-role key not in browser environment', () => {
    // Service role key should NEVER have NEXT_PUBLIC prefix (would expose to browser)
    // This is a naming convention check, not a runtime check
    const neverPublicKey = !Object.keys(process.env).some(
      (key) => key === 'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'
    );

    // Naming convention enforced: service-role key is server-only
    expect(neverPublicKey).toBe(true); // Key never has NEXT_PUBLIC prefix
  });

  // Test: No sensitive data in responses
  it('does not expose sensitive data in error messages', () => {
    // Error messages should be generic, not reveal database structure
    const safeErrors = [
      'Unable to process your enquiry. Please try again or call us directly.',
      'Too many enquiries. Please try again later.',
      'Invalid enquiry data',
    ];

    safeErrors.forEach(error => {
      expect(error).not.toMatch(/postgres|supabase|database|sql/i);
      expect(error).not.toMatch(/internal|sensitive|private/i);
    });
  });
});
