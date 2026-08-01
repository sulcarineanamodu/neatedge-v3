/**
 * Feature Flag Management
 * All flags default to false — must be explicitly enabled
 * Each flag is independent and can be enabled/disabled without affecting others
 */

import type { FeatureFlags } from '@/types';

// Default feature flags — all false for safety
const DEFAULT_FLAGS: FeatureFlags = {
  gardenServicesEnabled: false,
  publicPricingEnabled: false,
  onlinePaymentsEnabled: false,
  testimonialsEnabled: false,
  instantEstimateEnabled: false,
  aiReceptionistEnabled: false,
  publicAddressEnabled: false,
  dbsClaimsEnabled: false,
};

/**
 * Get feature flags from environment variables
 * Environment variables override defaults
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    gardenServicesEnabled: process.env.NEXT_PUBLIC_FEATURE_GARDEN_SERVICES === 'true',
    publicPricingEnabled: process.env.NEXT_PUBLIC_FEATURE_PUBLIC_PRICING === 'true',
    onlinePaymentsEnabled: process.env.NEXT_PUBLIC_FEATURE_ONLINE_PAYMENTS === 'true',
    testimonialsEnabled: process.env.NEXT_PUBLIC_FEATURE_TESTIMONIALS === 'true',
    instantEstimateEnabled: process.env.NEXT_PUBLIC_FEATURE_INSTANT_ESTIMATE === 'true',
    aiReceptionistEnabled: process.env.NEXT_PUBLIC_FEATURE_AI_RECEPTIONIST === 'true',
    publicAddressEnabled: process.env.NEXT_PUBLIC_FEATURE_PUBLIC_ADDRESS === 'true',
    dbsClaimsEnabled: process.env.NEXT_PUBLIC_FEATURE_DBS_CLAIMS === 'true',
  };
}

/**
 * Check if a specific feature is enabled
 */
export function isFeatureEnabled(
  flags: FeatureFlags,
  feature: keyof FeatureFlags,
): boolean {
  return flags[feature] === true;
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(flags: FeatureFlags): (keyof FeatureFlags)[] {
  return (Object.keys(flags) as (keyof FeatureFlags)[]).filter((key) =>
    isFeatureEnabled(flags, key),
  );
}

/**
 * Log feature flag status (development only)
 */
export function logFeatureFlags(flags: FeatureFlags): void {
  if (process.env.NODE_ENV === 'development') {
    const enabled = getEnabledFeatures(flags);
    console.log('Feature Flags Status:', {
      total: Object.keys(flags).length,
      enabled: enabled.length,
      disabled: Object.keys(flags).length - enabled.length,
      features: flags,
    });
  }
}

/**
 * Validate that feature flags are in expected state
 * Used for build-time validation
 */
export function validateFeatureFlags(flags: FeatureFlags): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check that all keys exist
  Object.keys(DEFAULT_FLAGS).forEach((key) => {
    if (!(key in flags)) {
      errors.push(`Missing feature flag: ${key}`);
    }
  });

  // Check that all values are boolean
  Object.entries(flags).forEach(([key, value]) => {
    if (typeof value !== 'boolean') {
      errors.push(`Feature flag ${key} must be boolean, got ${typeof value}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
