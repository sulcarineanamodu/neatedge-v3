/**
 * Environment Detection Utilities
 * Detects deployment environment and applies environment-specific configurations
 */

/**
 * Check if running in preview/staging environment
 * Uses Vercel's built-in environment variables
 */
export function isPreview(): boolean {
  return (
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'staging'
  );
}

/**
 * Check if running in production environment
 */
export function isProduction(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

/**
 * Check if running in development environment (local)
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get current environment name
 */
export function getEnvironment(): 'production' | 'preview' | 'development' {
  if (isProduction()) return 'production';
  if (isPreview()) return 'preview';
  return 'development';
}

/**
 * Check if analytics should be enabled
 * Disabled only in preview/staging environments
 */
export function isAnalyticsEnabled(): boolean {
  return !isPreview();
}

/**
 * Check if payments should be enabled
 * Disabled only in preview/staging environments
 */
export function isPaymentsEnabled(): boolean {
  return !isPreview();
}

/**
 * Check if indexing should be allowed
 * Only enabled in production
 */
export function isIndexingAllowed(): boolean {
  return !isPreview();
}

/**
 * Get robots metadata for current environment
 */
export function getRobotsMetadata(): string {
  return isPreview() ? 'noindex, nofollow' : 'index, follow';
}

/**
 * Get robots object for Next.js metadata
 */
export function getRobotsObject(): {
  index: boolean;
  follow: boolean;
  noindex?: boolean;
  nofollow?: boolean;
} {
  if (isPreview()) {
    return {
      index: false,
      follow: false,
      noindex: true,
      nofollow: true,
    };
  }

  return {
    index: true,
    follow: true,
  };
}

/**
 * Get X-Robots-Tag header value for current environment
 */
export function getXRobotsTagValue(): string {
  return isPreview() ? 'noindex, nofollow' : 'index, follow';
}
