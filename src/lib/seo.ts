/**
 * SEO Utilities
 * Metadata, structured data, and SEO helpers
 */

import type { PageMetadata } from '@/types';
import { getRobotsObject } from '@/lib/environment';

/**
 * Default metadata for the site
 */
export const DEFAULT_METADATA: PageMetadata = {
  title: 'Neatedge Cleaning | Professional Cleaning & Garden Care',
  description:
    'Professional cleaning and garden care services in London. Trusted by businesses and homeowners.',
  canonical: 'https://neatedgecleaning.co.uk',
  ogImage: 'https://neatedgecleaning.co.uk/og-image.jpg',
  ogType: 'website',
  robots: 'index, follow',
};

/**
 * Generate complete metadata object
 * Environment-aware: applies noindex for staging/preview environments
 */
export function generateMetadata(overrides?: Partial<PageMetadata>): PageMetadata {
  const robotsObject = getRobotsObject();
  const robotsString = robotsObject.noindex ? 'noindex, nofollow' : 'index, follow';

  return {
    ...DEFAULT_METADATA,
    ...overrides,
    robots: robotsString,
  };
}

/**
 * Generate complete metadata object with robots object format
 * For use with Next.js Metadata API
 */
export function generateMetadataWithRobotsObject(
  overrides?: Partial<PageMetadata>,
): PageMetadata & { robotsObject?: ReturnType<typeof getRobotsObject> } {
  const metadata = generateMetadata(overrides);
  return {
    ...metadata,
    robotsObject: getRobotsObject(),
  };
}

/**
 * Generate structured data for Schema.org Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neatedge Cleaning',
    url: 'https://neatedgecleaning.co.uk',
    logo: 'https://neatedgecleaning.co.uk/logo.png',
    description:
      'Professional commercial and residential cleaning services in London, UK.',
    sameAs: [
      'https://www.instagram.com/neatedgecleaning',
      'https://www.linkedin.com/company/neatedge-cleaning',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@neatedgecleaning.co.uk',
      telephone: '+44-XXXXXXXXX',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London',
    },
  };
}

/**
 * Generate structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Neatedge Cleaning',
    image: 'https://neatedgecleaning.co.uk/hero-image.jpg',
    description: 'Professional cleaning and garden maintenance services.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London',
    },
    telephone: '+44-XXXXXXXXX',
    url: 'https://neatedgecleaning.co.uk',
    priceRange: '£££',
    sameAs: [
      'https://www.instagram.com/neatedgecleaning',
      'https://www.linkedin.com/company/neatedge-cleaning',
    ],
  };
}

/**
 * Generate structured data for Service
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceArea?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Neatedge Cleaning',
      url: 'https://neatedgecleaning.co.uk',
    },
    areaServed: serviceArea || 'London, UK',
    serviceType: 'Cleaning Service',
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate meta tags for Open Graph
 */
export function generateOpenGraphTags(metadata: PageMetadata) {
  return {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:url': metadata.canonical,
    'og:image': metadata.ogImage,
    'og:type': metadata.ogType,
    'og:site_name': 'Neatedge Cleaning',
  };
}

/**
 * Generate meta tags for Twitter Card
 */
export function generateTwitterCardTags(metadata: PageMetadata) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:image': metadata.ogImage,
    'twitter:site': '@neatedgecleaning',
  };
}

/**
 * Generate canonical link
 */
export function generateCanonicalLink(url: string): string {
  return url;
}

/**
 * Generate robots meta tag
 */
export function generateRobotsMeta(
  noindex?: boolean,
  nofollow?: boolean,
): string {
  const parts = [];
  if (noindex) parts.push('noindex');
  else parts.push('index');

  if (nofollow) parts.push('nofollow');
  else parts.push('follow');

  return parts.join(', ');
}

/**
 * SEO audit helpers
 */
export class SEOAudit {
  static checkTitleLength(title: string): { valid: boolean; message: string } {
    const length = title.length;
    if (length < 30) {
      return { valid: false, message: `Title too short (${length}). Aim for 30-60 characters.` };
    }
    if (length > 60) {
      return {
        valid: false,
        message: `Title too long (${length}). Aim for 30-60 characters.`,
      };
    }
    return { valid: true, message: 'Title length is good.' };
  }

  static checkDescriptionLength(
    description: string,
  ): { valid: boolean; message: string } {
    const length = description.length;
    if (length < 120) {
      return {
        valid: false,
        message: `Description too short (${length}). Aim for 120-160 characters.`,
      };
    }
    if (length > 160) {
      return {
        valid: false,
        message: `Description too long (${length}). Aim for 120-160 characters.`,
      };
    }
    return { valid: true, message: 'Description length is good.' };
  }

  static checkKeywordPresence(
    content: string,
    keyword: string,
  ): { present: boolean; count: number } {
    const regex = new RegExp(keyword, 'gi');
    const matches = content.match(regex);
    return {
      present: !!matches,
      count: matches?.length || 0,
    };
  }
}
