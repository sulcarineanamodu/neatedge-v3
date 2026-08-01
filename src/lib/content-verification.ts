/**
 * Content Verification System
 * Prevents unverified or unapproved content from reaching production
 */

import type { ContentStatus, VerifiedContent } from '@/types';
import { ContentStatus as ContentStatusEnum } from '@/types';

export interface VerifiedContentWithAuthor<T> {
  data: T;
  status: ContentStatus;
  author?: string;
  context?: string;
  timestamp?: Date;
}

/**
 * Create a verified content item
 */
export function createVerifiedContent<T>(
  data: T,
  status: ContentStatus,
  metadata?: {
    verifiedBy?: string;
    note?: string;
  },
): VerifiedContent<T> {
  return {
    data,
    status,
    verifiedAt: new Date(),
    verifiedBy: metadata?.verifiedBy,
    note: metadata?.note,
  };
}

/**
 * Check if content is safe to display in production
 */
export function canPublishContent(
  item: VerifiedContent<unknown>,
  environment: 'development' | 'staging' | 'production',
): boolean {
  // In development, allow all statuses
  if (environment === 'development') {
    return true;
  }

  // In staging, allow VERIFIED and STAGING_ONLY
  if (environment === 'staging') {
    return (
      item.status === ContentStatusEnum.VERIFIED ||
      item.status === ContentStatusEnum.STAGING_ONLY
    );
  }

  // In production, only allow VERIFIED or OWNER_APPROVED
  return (
    item.status === ContentStatusEnum.VERIFIED ||
    item.status === ContentStatusEnum.OWNER_APPROVED
  );
}

/**
 * Filter content array to only publishable items
 */
export function filterPublishableContent<T extends VerifiedContent<unknown>>(
  items: T[],
  environment: 'development' | 'staging' | 'production',
): T[] {
  return items.filter((item) => canPublishContent(item, environment));
}

/**
 * Mark content as staging-only (visible in staging, hidden in production)
 */
export function markAsStaging<T>(
  data: T,
  reason?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.STAGING_ONLY,
    context: reason,
    timestamp: new Date(),
  };
}

/**
 * Mark content as do-not-publish (hidden everywhere except maybe development)
 */
export function markAsDoNotPublish<T>(
  data: T,
  author: string,
  context?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.DO_NOT_PUBLISH,
    author,
    context,
    timestamp: new Date(),
  };
}

/**
 * Check if content can be published in production
 */
export function canPublishInProduction(status: ContentStatus): boolean {
  return (
    status === ContentStatusEnum.VERIFIED ||
    status === ContentStatusEnum.OWNER_APPROVED
  );
}

/**
 * Verify content for production
 */
export function markAsVerified<T>(
  data: T,
  verifiedBy: string,
  note?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.VERIFIED,
    author: verifiedBy,
    context: note,
    timestamp: new Date(),
  };
}

/**
 * Mark content as owner-approved (for business-critical info)
 */
export function markAsOwnerApproved<T>(
  data: T,
  owner: string,
  note?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.OWNER_APPROVED,
    author: owner,
    context: note,
    timestamp: new Date(),
  };
}

/**
 * Mark content as placeholder (temporary content, not for production)
 */
export function markAsPlaceholder<T>(
  data: T,
  author: string,
  context?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.PLACEHOLDER,
    author,
    context,
    timestamp: new Date(),
  };
}

/**
 * Mark content as requiring evidence (needs data to back up claims)
 */
export function markAsEvidenceRequired<T>(
  data: T,
  author: string,
  context?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.EVIDENCE_REQUIRED,
    author,
    context,
    timestamp: new Date(),
  };
}

/**
 * Mark content as requiring owner confirmation
 */
export function markAsOwnerConfirmationRequired<T>(
  data: T,
  author: string,
  context?: string,
): VerifiedContentWithAuthor<T> {
  return {
    data,
    status: ContentStatusEnum.OWNER_CONFIRMATION_REQUIRED,
    author,
    context,
    timestamp: new Date(),
  };
}

/**
 * Validate that no fake claims or prices are displayed
 */
export function validateNoClaims(content: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  const suspiciousPatterns = [
    /earn\s+(?:\$|£|€)\s*\d+/i,
    /guaranteed\s+results/i,
    /fake\s+(?:price|claim|testimonial)/i,
    /sample\s+(?:price|content|data)/i,
    /\[placeholder\]/i,
    /\[TODO\]/i,
    /\[SAMPLE\]/i,
  ];

  suspiciousPatterns.forEach((pattern) => {
    if (pattern.test(content)) {
      issues.push(`Detected suspicious pattern: ${pattern}`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Ensure pricing is not displayed without feature flag
 */
export function validatePricingGate(
  hasPricing: boolean,
  publicPricingEnabled: boolean,
): { valid: boolean; message?: string } {
  if (hasPricing && !publicPricingEnabled) {
    return {
      valid: false,
      message: 'Pricing is not available — publicPricingEnabled feature flag is false',
    };
  }
  return { valid: true };
}

/**
 * Ensure testimonials only show when enabled
 */
export function validateTestimonialGate(
  hasTestimonials: boolean,
  testimonialsEnabled: boolean,
): { valid: boolean; message?: string } {
  if (hasTestimonials && !testimonialsEnabled) {
    return {
      valid: false,
      message: 'Testimonials are not available — testimonialsEnabled feature flag is false',
    };
  }
  return { valid: true };
}

/**
 * Production safety report
 */
export function generateContentReport(
  items: VerifiedContent<unknown>[],
): {
  total: number;
  verified: number;
  ownerApproved: number;
  stagingOnly: number;
  doNotPublish: number;
  summary: string;
} {
  const counts = {
    total: items.length,
    verified: items.filter((i) => i.status === ContentStatusEnum.VERIFIED).length,
    ownerApproved: items.filter(
      (i) => i.status === ContentStatusEnum.OWNER_APPROVED,
    ).length,
    stagingOnly: items.filter((i) => i.status === ContentStatusEnum.STAGING_ONLY)
      .length,
    doNotPublish: items.filter((i) => i.status === ContentStatusEnum.DO_NOT_PUBLISH)
      .length,
  };

  const summary = `Content Report: ${counts.total} items total | ${counts.verified} verified | ${counts.ownerApproved} owner-approved | ${counts.stagingOnly} staging-only | ${counts.doNotPublish} do-not-publish`;

  return {
    ...counts,
    summary,
  };
}
