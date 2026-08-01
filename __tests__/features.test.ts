/**
 * Feature Flag Tests
 * Verify all 8 flags default to false when missing, empty, malformed, or not explicitly true
 */

import { getFeatureFlags } from '@/lib/features';
import { describe, test, expect, beforeEach } from 'vitest';

describe('Feature Flags', () => {
  beforeEach(() => {
    // Reset process.env to original state
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith('NEXT_PUBLIC_FEATURE_')) {
        delete process.env[key];
      }
    });
  });

  describe('gardenServicesEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES;
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(false);
    });

    test('defaults to false when empty string', () => {
      process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = '';
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(false);
    });

    test('defaults to false when malformed (yes)', () => {
      process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = 'yes';
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(false);
    });

    test('defaults to false when 0', () => {
      process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = '0';
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(false);
    });

    test('defaults to false when FALSE (uppercase)', () => {
      process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = 'FALSE';
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = 'true';
      const flags = getFeatureFlags();
      expect(flags.gardenServicesEnabled).toBe(true);
    });
  });

  describe('publicPricingEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_PUBLIC_PRICING;
      const flags = getFeatureFlags();
      expect(flags.publicPricingEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_PUBLIC_PRICING = 'true';
      const flags = getFeatureFlags();
      expect(flags.publicPricingEnabled).toBe(true);
    });
  });

  describe('onlinePaymentsEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_ONLINE_PAYMENTS;
      const flags = getFeatureFlags();
      expect(flags.onlinePaymentsEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_ONLINE_PAYMENTS = 'true';
      const flags = getFeatureFlags();
      expect(flags.onlinePaymentsEnabled).toBe(true);
    });
  });

  describe('testimonialsEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS;
      const flags = getFeatureFlags();
      expect(flags.testimonialsEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS = 'true';
      const flags = getFeatureFlags();
      expect(flags.testimonialsEnabled).toBe(true);
    });
  });

  describe('instantEstimateEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_INSTANT_ESTIMATE;
      const flags = getFeatureFlags();
      expect(flags.instantEstimateEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_INSTANT_ESTIMATE = 'true';
      const flags = getFeatureFlags();
      expect(flags.instantEstimateEnabled).toBe(true);
    });
  });

  describe('aiReceptionistEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_AI_RECEPTIONIST;
      const flags = getFeatureFlags();
      expect(flags.aiReceptionistEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_AI_RECEPTIONIST = 'true';
      const flags = getFeatureFlags();
      expect(flags.aiReceptionistEnabled).toBe(true);
    });
  });

  describe('publicAddressEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_PUBLIC_ADDRESS;
      const flags = getFeatureFlags();
      expect(flags.publicAddressEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_PUBLIC_ADDRESS = 'true';
      const flags = getFeatureFlags();
      expect(flags.publicAddressEnabled).toBe(true);
    });
  });

  describe('dbsClaimsEnabled', () => {
    test('defaults to false when missing', () => {
      delete process.env.NEXT_PUBLIC_FEATURE_DBS_CLAIMS;
      const flags = getFeatureFlags();
      expect(flags.dbsClaimsEnabled).toBe(false);
    });

    test('is true when explicitly true', () => {
      process.env.NEXT_PUBLIC_FEATURE_DBS_CLAIMS = 'true';
      const flags = getFeatureFlags();
      expect(flags.dbsClaimsEnabled).toBe(true);
    });
  });

  test('all flags default to false when all variables missing', () => {
    // Clear all feature flag env vars
    delete process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES;
    delete process.env.NEXT_PUBLIC_FEATURE_PUBLIC_PRICING;
    delete process.env.NEXT_PUBLIC_FEATURE_ONLINE_PAYMENTS;
    delete process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS;
    delete process.env.NEXT_PUBLIC_FEATURE_INSTANT_ESTIMATE;
    delete process.env.NEXT_PUBLIC_FEATURE_AI_RECEPTIONIST;
    delete process.env.NEXT_PUBLIC_FEATURE_PUBLIC_ADDRESS;
    delete process.env.NEXT_PUBLIC_FEATURE_DBS_CLAIMS;

    const flags = getFeatureFlags();

    expect(flags.gardenServicesEnabled).toBe(false);
    expect(flags.publicPricingEnabled).toBe(false);
    expect(flags.onlinePaymentsEnabled).toBe(false);
    expect(flags.testimonialsEnabled).toBe(false);
    expect(flags.instantEstimateEnabled).toBe(false);
    expect(flags.aiReceptionistEnabled).toBe(false);
    expect(flags.publicAddressEnabled).toBe(false);
    expect(flags.dbsClaimsEnabled).toBe(false);
  });

  test('one flag being true does not enable another flag', () => {
    process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES = 'true';
    delete process.env.NEXT_PUBLIC_FEATURE_PUBLIC_PRICING;

    const flags = getFeatureFlags();

    expect(flags.gardenServicesEnabled).toBe(true);
    expect(flags.publicPricingEnabled).toBe(false);
  });
});
