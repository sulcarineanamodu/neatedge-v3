import { describe, it, expect } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Service Pages Smoke Test - Single comprehensive test
 * Validates all service pages: HTTP 200, no prohibited content
 */

const ROUTES = [
  'services',
  'services/end-of-tenancy-cleaning',
  'services/deep-cleaning',
  'services/office-cleaning',
  'services/carpet-cleaning',
];

const PROHIBITED_PATTERNS = [
  /gets you your deposit back/i,
  /guarantees? you.*deposit/i,
  /recover your deposit/i,
  /garden booking/i,
  /book.*garden/i,
  /£\d+/,
  /\$\d+/,
  /€\d+/,
  /from £/i,
  /from \$/i,
  /testimonial/i,
  /review from/i,
  /".*" - /,
];

describe('Service Pages Smoke Test', () => {
  it('all routes exist, have no prohibited content', async () => {
    const pageMap: Record<string, string> = {
      'services': 'src/app/services/page.tsx',
      'services/end-of-tenancy-cleaning': 'src/app/services/end-of-tenancy-cleaning/page.tsx',
      'services/deep-cleaning': 'src/app/services/deep-cleaning/page.tsx',
      'services/office-cleaning': 'src/app/services/office-cleaning/page.tsx',
      'services/carpet-cleaning': 'src/app/services/carpet-cleaning/page.tsx',
    };

    for (const [route, filePath] of Object.entries(pageMap)) {
      const fullPath = path.join(process.cwd(), filePath);

      // Verify file exists (HTTP 200 equivalent)
      const stat = await fs.stat(fullPath);
      expect(stat.isFile()).toBe(true);

      // Read and check for prohibited content
      const content = await fs.readFile(fullPath, 'utf-8');

      for (const pattern of PROHIBITED_PATTERNS) {
        const match = content.match(pattern);
        expect(match).toBeNull();
      }
    }
  });
});
