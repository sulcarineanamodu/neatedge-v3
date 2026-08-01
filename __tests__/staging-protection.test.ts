import { describe, it, expect, beforeEach } from 'vitest';
import {
  isPreview,
  isProduction,
  isDevelopment,
  getEnvironment,
  isAnalyticsEnabled,
  isPaymentsEnabled,
  isIndexingAllowed,
  getRobotsMetadata,
  getRobotsObject,
  getXRobotsTagValue,
} from '@/lib/environment';

describe('Staging Protection', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env for each test
    process.env = { ...originalEnv };
  });

  describe('Environment Detection', () => {
    it('should detect preview environment when VERCEL_ENV is preview', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isPreview()).toBe(true);
    });

    it('should detect preview environment when NEXT_PUBLIC_APP_ENV is staging', () => {
      process.env.NEXT_PUBLIC_APP_ENV = 'staging';
      expect(isPreview()).toBe(true);
    });

    it('should detect production environment when VERCEL_ENV is production', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    it('should return correct environment name for preview', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(getEnvironment()).toBe('preview');
    });

    it('should return correct environment name for production', () => {
      process.env.VERCEL_ENV = 'production';
      expect(getEnvironment()).toBe('production');
    });

    it('should return correct environment name for development', () => {
      process.env.NODE_ENV = 'development';
      process.env.VERCEL_ENV = undefined;
      expect(getEnvironment()).toBe('development');
    });
  });

  describe('Indexing Protection', () => {
    it('should return noindex, nofollow for preview environment', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(getRobotsMetadata()).toBe('noindex, nofollow');
    });

    it('should return index, follow for production environment', () => {
      process.env.VERCEL_ENV = 'production';
      expect(getRobotsMetadata()).toBe('index, follow');
    });

    it('should return noindex robots object for preview', () => {
      process.env.VERCEL_ENV = 'preview';
      const robots = getRobotsObject();
      expect(robots.index).toBe(false);
      expect(robots.follow).toBe(false);
      expect(robots.noindex).toBe(true);
      expect(robots.nofollow).toBe(true);
    });

    it('should return index robots object for production', () => {
      process.env.VERCEL_ENV = 'production';
      const robots = getRobotsObject();
      expect(robots.index).toBe(true);
      expect(robots.follow).toBe(true);
    });

    it('should return noindex X-Robots-Tag header for preview', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(getXRobotsTagValue()).toBe('noindex, nofollow');
    });

    it('should return index X-Robots-Tag header for production', () => {
      process.env.VERCEL_ENV = 'production';
      expect(getXRobotsTagValue()).toBe('index, follow');
    });
  });

  describe('Feature Gating', () => {
    it('should disable analytics in preview environment', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isAnalyticsEnabled()).toBe(false);
    });

    it('should enable analytics in production environment', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isAnalyticsEnabled()).toBe(true);
    });

    it('should disable payments in preview environment', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isPaymentsEnabled()).toBe(false);
    });

    it('should enable payments in production environment', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isPaymentsEnabled()).toBe(true);
    });

    it('should disable indexing in preview environment', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isIndexingAllowed()).toBe(false);
    });

    it('should enable indexing in production environment', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isIndexingAllowed()).toBe(true);
    });
  });

  describe('Environment Consistency', () => {
    it('should not return both preview and production true', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isPreview()).toBe(true);
      expect(isProduction()).toBe(false);
    });

    it('should not return both production and preview true', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isProduction()).toBe(true);
      expect(isPreview()).toBe(false);
    });

    it('should disable all production features in preview', () => {
      process.env.VERCEL_ENV = 'preview';
      expect(isAnalyticsEnabled()).toBe(false);
      expect(isPaymentsEnabled()).toBe(false);
      expect(isIndexingAllowed()).toBe(false);
    });

    it('should enable all production features in production', () => {
      process.env.VERCEL_ENV = 'production';
      expect(isAnalyticsEnabled()).toBe(true);
      expect(isPaymentsEnabled()).toBe(true);
      expect(isIndexingAllowed()).toBe(true);
    });
  });
});
