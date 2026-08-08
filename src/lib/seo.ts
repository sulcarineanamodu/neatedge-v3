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
  title: 'Professional Cleaning Across West London | Neatedge Cleaning',
  description:
    'Professional residential, commercial and property cleaning across Uxbridge, West Drayton, Hayes, Hillingdon and the Heathrow corridor. Founder-led service with £5M insurance.',
  canonical: 'https://neatedgecleaning.com/',
  ogImage: 'https://neatedgecleaning.com/og-image.jpg',
  ogType: 'website',
  robots: 'index, follow',
};

/**
 * Page-specific metadata overrides
 * Each page should have its own title, description, and self-referencing canonical
 */
export const PAGE_METADATA: Record<string, Partial<PageMetadata>> = {
  '/': DEFAULT_METADATA,
  '/about': {
    title: 'About Neatedge Cleaning | Professional Cleaning in West London',
    description: 'Founded on reliability, accountability, and respect. Learn about the Neatedge Cleaning team, our values, and why we\'re trusted by West London homes and businesses.',
    canonical: 'https://neatedgecleaning.com/about',
  },
  '/areas': {
    title: 'Service Areas | Neatedge Cleaning West London & Surroundings',
    description: 'We serve Uxbridge, West Drayton, Hayes, Hillingdon and surrounding areas. Local service, fast response times, genuine accountability.',
    canonical: 'https://neatedgecleaning.com/areas',
  },
  '/commercial': {
    title: 'Commercial Office Cleaning | Flexible Scheduling | Neatedge',
    description: 'Professional office cleaning with 24/7 flexible scheduling. Keep your workspace professional, productive, and hygienic. £5M insured.',
    canonical: 'https://neatedgecleaning.com/commercial',
  },
  '/residential': {
    title: 'Residential Home Cleaning | Weekly, Deep Clean & Refresh | Neatedge',
    description: 'Professional home cleaning for West London. Regular maintenance, deep cleans, and refresh cleans. DBS checked, fully insured, trusted locally.',
    canonical: 'https://neatedgecleaning.com/residential',
  },
  '/property-professionals': {
    title: 'Property Cleaning for Agents & Landlords | Neatedge Professional Service',
    description: 'Tailored cleaning solutions for estate agents, letting agents, landlords, and Airbnb hosts. Documented cleaning, flexible contracts, consistent quality.',
    canonical: 'https://neatedgecleaning.com/property-professionals',
  },
  '/services': {
    title: 'Professional Cleaning Services | Residential, Commercial & Specialist | Neatedge',
    description: 'Explore our full range: residential, commercial, end-of-tenancy, deep cleaning, carpet care, and specialist services across West London.',
    canonical: 'https://neatedgecleaning.com/services',
  },
  '/services/carpet-cleaning': {
    title: 'Professional Carpet Cleaning | Steam Extraction | Neatedge Cleaning',
    description: 'Professional carpet cleaning with hot water extraction. Removes dirt, stains, allergens and odours. Safe for kids and pets. 2-4 hour dry time.',
    canonical: 'https://neatedgecleaning.com/services/carpet-cleaning',
  },
  '/services/deep-cleaning': {
    title: 'Deep Cleaning Service | Thorough Home & Office Cleaning | Neatedge',
    description: 'Detailed, thorough cleaning of every corner. Move-in, move-out, post-renovation, or seasonal refresh. Nothing missed.',
    canonical: 'https://neatedgecleaning.com/services/deep-cleaning',
  },
  '/services/end-of-tenancy-cleaning': {
    title: 'End of Tenancy Cleaning | Landlord & Agent Approved | Neatedge',
    description: 'Professional end-of-tenancy cleaning for property handovers. Documented with photos & checklists. £5M insured. Landlord & agent preferred.',
    canonical: 'https://neatedgecleaning.com/services/end-of-tenancy-cleaning',
  },
  '/services/office-cleaning': {
    title: 'Office Cleaning Services | Flexible Scheduling | Neatedge Cleaning',
    description: 'Professional office cleaning with minimal disruption. Daily, weekly or bi-weekly service. Fully insured, trained teams, responsive.',
    canonical: 'https://neatedgecleaning.com/services/office-cleaning',
  },
  '/contact': {
    title: 'Contact Neatedge Cleaning | Get a Quote | 07886 091926',
    description: 'Get in touch for a free cleaning estimate. Phone, email, form, or WhatsApp. We respond within 24 hours.',
    canonical: 'https://neatedgecleaning.com/contact',
  },
};

/**
 * Generate canonical URL based on pathname
 * Server-side safe — returns homepage canonical if pathname not available
 */
export function generateCanonicalUrl(pathname?: string): string {
  if (!pathname || pathname === '/') {
    return 'https://neatedgecleaning.com/';
  }
  // Remove trailing slash if present
  const cleanPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;
  return `https://neatedgecleaning.com${cleanPath}`;
}

/**
 * Get page-specific metadata by pathname
 * Falls back to default if pathname not found in PAGE_METADATA
 */
export function getPageMetadata(pathname: string): Partial<PageMetadata> {
  return PAGE_METADATA[pathname] || DEFAULT_METADATA;
}

/**
 * Generate complete metadata object
 * Environment-aware: applies noindex for staging/preview environments
 * Uses provided canonical or defaults to homepage
 */
export function generateMetadata(overrides?: Partial<PageMetadata>, pathname?: string): PageMetadata {
  const robotsObject = getRobotsObject();
  const robotsString = robotsObject.noindex ? 'noindex, nofollow' : 'index, follow';

  // Get page-specific metadata
  const pageMetadata = pathname ? getPageMetadata(pathname) : DEFAULT_METADATA;

  return {
    ...DEFAULT_METADATA,
    ...pageMetadata,
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
 * Generate Next.js Metadata export for a specific page
 * Use this in each page's metadata export
 * Example: export const metadata = createPageMetadata('/about');
 */
export function createPageMetadata(pathname: string): Metadata {
  const pageMetadata = getPageMetadata(pathname);
  const robotsObject = getRobotsObject();

  return {
    title: pageMetadata.title || DEFAULT_METADATA.title,
    description: pageMetadata.description || DEFAULT_METADATA.description,
    alternates: {
      canonical: pageMetadata.canonical || DEFAULT_METADATA.canonical,
    },
    robots: robotsObject as any,
    openGraph: {
      title: pageMetadata.title || DEFAULT_METADATA.title,
      description: pageMetadata.description || DEFAULT_METADATA.description,
      url: pageMetadata.canonical || DEFAULT_METADATA.canonical,
      images: [{ url: pageMetadata.ogImage || DEFAULT_METADATA.ogImage || '' }],
      type: (pageMetadata.ogType as 'website') || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title || DEFAULT_METADATA.title,
      description: pageMetadata.description || DEFAULT_METADATA.description,
      images: [pageMetadata.ogImage || DEFAULT_METADATA.ogImage || ''],
    },
  };
}

/**
 * Generate structured data for Schema.org Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neatedge Cleaning Ltd',
    url: 'https://neatedgecleaning.com/',
    logo: 'https://neatedgecleaning.com/logo.png',
    description:
      'Professional residential, commercial and property cleaning across West London.',
    sameAs: [
      'https://www.instagram.com/neatedgecleaning',
      'https://www.linkedin.com/company/neatedge-cleaning',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@neatedgecleaning.com',
      telephone: '+447886091926',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'West London',
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
    name: 'Neatedge Cleaning Ltd',
    image: 'https://neatedgecleaning.com/hero-image.jpg',
    description: 'Professional residential, commercial and property cleaning',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'West London',
      areaServed: ['Uxbridge', 'West Drayton', 'Hayes', 'Hillingdon'],
    },
    telephone: '+447886091926',
    email: 'info@neatedgecleaning.com',
    url: 'https://neatedgecleaning.com/',
    priceRange: '$$',
    sameAs: [
      'https://www.instagram.com/neatedgecleaning',
      'https://www.linkedin.com/company/neatedge-cleaning',
    ],
    serviceType: ['Residential Cleaning', 'Commercial Cleaning'],
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
      name: 'Neatedge Cleaning Ltd',
      url: 'https://neatedgecleaning.com/',
    },
    areaServed: serviceArea || 'West London, UK',
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
