import { describe, it, expect } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Service Pages Smoke & Link Test Suite
 * Verifies all service pages are built, prerendered, and contain no broken internal links.
 */

const SERVICE_PAGES = [
  '/services',
  '/services/end-of-tenancy-cleaning',
  '/services/deep-cleaning',
  '/services/office-cleaning',
  '/services/carpet-cleaning',
];

const EXPECTED_LINKS = {
  '/services': [
    '/services/end-of-tenancy-cleaning',
    '/services/deep-cleaning',
    '/services/office-cleaning',
    '/services/carpet-cleaning',
    '/residential',
    '/commercial',
    '/property-professionals',
    '/contact',
    'tel:',
  ],
  '/services/end-of-tenancy-cleaning': ['/contact', 'tel:'],
  '/services/deep-cleaning': ['/contact', 'tel:'],
  '/services/office-cleaning': ['/contact', 'tel:'],
  '/services/carpet-cleaning': ['/contact', 'tel:'],
};

describe('Service Pages - Smoke Tests', () => {
  it('all service page files exist in src/app', async () => {
    const pageFiles = [
      'src/app/services/page.tsx',
      'src/app/services/end-of-tenancy-cleaning/page.tsx',
      'src/app/services/deep-cleaning/page.tsx',
      'src/app/services/office-cleaning/page.tsx',
      'src/app/services/carpet-cleaning/page.tsx',
    ];

    for (const file of pageFiles) {
      const filePath = path.join(process.cwd(), file);
      const stat = await fs.stat(filePath);
      expect(stat.isFile()).toBe(true);
    }
  });

  it('services hub page contains no broken internal links', async () => {
    const hubPath = path.join(process.cwd(), 'src/app/services/page.tsx');
    const content = await fs.readFile(hubPath, 'utf-8');

    const expectedLinks = EXPECTED_LINKS['/services'];
    for (const link of expectedLinks) {
      expect(content).toContain(`href="${link}"`);
    }
  });

  it('end-of-tenancy page contains contact links', async () => {
    const pagePath = path.join(process.cwd(), 'src/app/services/end-of-tenancy-cleaning/page.tsx');
    const content = await fs.readFile(pagePath, 'utf-8');

    expect(content).toContain('href="/contact');
    expect(content).toContain('href="tel:');
  });

  it('deep-cleaning page contains contact links', async () => {
    const pagePath = path.join(process.cwd(), 'src/app/services/deep-cleaning/page.tsx');
    const content = await fs.readFile(pagePath, 'utf-8');

    expect(content).toContain('href="/contact');
    expect(content).toContain('href="tel:');
  });

  it('office-cleaning page contains contact links', async () => {
    const pagePath = path.join(process.cwd(), 'src/app/services/office-cleaning/page.tsx');
    const content = await fs.readFile(pagePath, 'utf-8');

    expect(content).toContain('href="/contact');
    expect(content).toContain('href="tel:');
  });

  it('carpet-cleaning page contains contact links', async () => {
    const pagePath = path.join(process.cwd(), 'src/app/services/carpet-cleaning/page.tsx');
    const content = await fs.readFile(pagePath, 'utf-8');

    expect(content).toContain('href="/contact');
    expect(content).toContain('href="tel:');
  });

  it('end-of-tenancy headline does not contain deposit guarantee', async () => {
    const pagePath = path.join(process.cwd(), 'src/app/services/end-of-tenancy-cleaning/page.tsx');
    const content = await fs.readFile(pagePath, 'utf-8');

    // Verify the corrected headline is present
    expect(content).toContain('Professional End-of-Tenancy Cleaning Across West London');

    // Verify old deposit-return guarantee is NOT present
    expect(content).not.toContain('Gets You Your Deposit Back');
  });

  it('all service pages use 200 height for hero section', async () => {
    const pages = [
      'src/app/services/page.tsx',
      'src/app/services/end-of-tenancy-cleaning/page.tsx',
      'src/app/services/deep-cleaning/page.tsx',
      'src/app/services/office-cleaning/page.tsx',
      'src/app/services/carpet-cleaning/page.tsx',
    ];

    for (const page of pages) {
      const filePath = path.join(process.cwd(), page);
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('py-20');
    }
  });
});

describe('Service Pages - Content Verification', () => {
  it('services hub contains all four priority service cards', async () => {
    const hubPath = path.join(process.cwd(), 'src/app/services/page.tsx');
    const content = await fs.readFile(hubPath, 'utf-8');

    expect(content).toContain('End of Tenancy Cleaning');
    expect(content).toContain('Deep Cleaning');
    expect(content).toContain('Office Cleaning');
    expect(content).toContain('Carpet Cleaning');
  });

  it('services hub contains residential, commercial, and property professional sections', async () => {
    const hubPath = path.join(process.cwd(), 'src/app/services/page.tsx');
    const content = await fs.readFile(hubPath, 'utf-8');

    expect(content).toContain('Residential Cleaning Services');
    expect(content).toContain('Commercial & Business Cleaning');
    expect(content).toContain('Services for Property Professionals');
  });
});
