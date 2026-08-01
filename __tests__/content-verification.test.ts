/**
 * Content Verification Tests
 * Prove restricted statuses cannot reach production
 */

import { describe, test, expect } from 'vitest';
import {
  markAsVerified,
  markAsOwnerApproved,
  markAsStaging,
  markAsPlaceholder,
  markAsDoNotPublish,
  markAsEvidenceRequired,
  markAsOwnerConfirmationRequired,
  canPublishInProduction,
} from '@/lib/content-verification';

describe('Content Verification System', () => {
  describe('Production-safe statuses', () => {
    test('VERIFIED content can be published in production', () => {
      const content = markAsVerified(
        { text: 'Verified content' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(true);
    });

    test('OWNER_APPROVED content can be published in production', () => {
      const content = markAsOwnerApproved(
        { text: 'Owner approved content' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(true);
    });
  });

  describe('Production-restricted statuses', () => {
    test('STAGING_ONLY content cannot be published in production', () => {
      const content = markAsStaging({ text: 'Staging only' }, 'test-context');
      expect(canPublishInProduction(content.status)).toBe(false);
    });

    test('PLACEHOLDER content cannot be published in production', () => {
      const content = markAsPlaceholder(
        { text: 'Placeholder content' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(false);
    });

    test('DO_NOT_PUBLISH content cannot be published in production', () => {
      const content = markAsDoNotPublish(
        { text: 'Do not publish' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(false);
    });

    test('EVIDENCE_REQUIRED content cannot be published in production', () => {
      const content = markAsEvidenceRequired(
        { text: 'Needs evidence' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(false);
    });

    test('OWNER_CONFIRMATION_REQUIRED content cannot be published in production', () => {
      const content = markAsOwnerConfirmationRequired(
        { text: 'Needs confirmation' },
        'test-author',
        'test-context'
      );
      expect(canPublishInProduction(content.status)).toBe(false);
    });
  });

  describe('Content metadata', () => {
    test('verified content includes author and timestamp', () => {
      const content = markAsVerified(
        { text: 'Test' },
        'claude-code',
        'Package 1'
      );
      expect(content.author).toBe('claude-code');
      expect(content.context).toBe('Package 1');
      expect(content.timestamp).toBeDefined();
      expect(content.timestamp instanceof Date).toBe(true);
    });

    test('staging content is marked for staging only', () => {
      const content = markAsStaging({ text: 'Test' }, 'Staging context');
      expect(content.status).toBe('STAGING_ONLY');
      expect(content.context).toBe('Staging context');
    });
  });

  describe('Production filtering', () => {
    test('only VERIFIED and OWNER_APPROVED pass production filter', () => {
      const verified = markAsVerified({ text: 'v' }, 'a', 'c');
      const approved = markAsOwnerApproved({ text: 'a' }, 'a', 'c');
      const staging = markAsStaging({ text: 's' }, 'c');
      const placeholder = markAsPlaceholder({ text: 'p' }, 'a', 'c');
      const doNotPublish = markAsDoNotPublish({ text: 'dnp' }, 'a', 'c');

      expect(canPublishInProduction(verified.status)).toBe(true);
      expect(canPublishInProduction(approved.status)).toBe(true);
      expect(canPublishInProduction(staging.status)).toBe(false);
      expect(canPublishInProduction(placeholder.status)).toBe(false);
      expect(canPublishInProduction(doNotPublish.status)).toBe(false);
    });
  });

  describe('Content data preservation', () => {
    test('verification does not modify the wrapped data', () => {
      const originalData = { title: 'Test', description: 'Description' };
      const content = markAsVerified(
        originalData,
        'test-author',
        'test-context'
      );
      expect(content.data).toEqual(originalData);
    });

    test('nested objects are preserved', () => {
      const complexData = {
        hero: {
          title: 'Hero Title',
          subtitle: 'Hero Subtitle',
          cta: { text: 'Click Me', url: '/' },
        },
      };
      const content = markAsVerified(complexData, 'author', 'context');
      expect(content.data).toEqual(complexData);
      expect(content.data.hero.cta.text).toBe('Click Me');
    });
  });
});
