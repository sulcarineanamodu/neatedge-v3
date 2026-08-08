// Simplified chatbot conversation flow (30-second WhatsApp concierge)
// Maximum 5 steps: Service → Postcode → Property Details → When → Summary

export type ServiceType =
  | 'residential-cleaning'
  | 'deep-cleaning'
  | 'end-of-tenancy'
  | 'carpet-cleaning'
  | 'property-landlord'
  | 'commercial';

export type CommercialType = 'office' | 'retail' | 'communal' | 'hospitality' | 'other';

export type CommercialFrequency = 'one-off' | 'regular';

export type TimingOption = 'asap' | 'this-week' | 'next-week' | 'choose-date' | 'quote';

export interface ChatbotLeadData {
  service: ServiceType | '';
  postcode: string;
  bedrooms?: string;
  bathrooms?: string;
  carpetRooms?: string;
  commercialType?: CommercialType | '';
  commercialFrequency?: CommercialFrequency | '';
  landlordServiceType?: string;
  timing: TimingOption | '';
  preferredDate?: string;
  additionalNotes?: string;
  name?: string;
}

export const SERVICES: { value: ServiceType; label: string }[] = [
  { value: 'residential-cleaning', label: 'Residential Cleaning' },
  { value: 'deep-cleaning', label: 'Deep Cleaning' },
  { value: 'end-of-tenancy', label: 'End of Tenancy' },
  { value: 'carpet-cleaning', label: 'Carpet Cleaning' },
  { value: 'property-landlord', label: 'Property / Landlord Cleaning' },
  { value: 'commercial', label: 'Commercial Cleaning' },
];

export const COMMERCIAL_TYPES: { value: CommercialType; label: string }[] = [
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'communal', label: 'Communal Area' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'other', label: 'Other' },
];

export const COMMERCIAL_FREQUENCIES: { value: CommercialFrequency; label: string }[] = [
  { value: 'one-off', label: 'One-off' },
  { value: 'regular', label: 'Regular' },
];

export const LANDLORD_SERVICES: { value: string; label: string }[] = [
  { value: 'property-turnaround', label: 'Property turnaround' },
  { value: 'end-of-tenancy', label: 'End of tenancy' },
  { value: 'pre-tenancy', label: 'Pre-tenancy clean' },
  { value: 'airbnb', label: 'Airbnb / serviced accommodation' },
  { value: 'portfolio-support', label: 'Ongoing portfolio support' },
];

export const BEDROOMS_OPTIONS = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' },
];

export const BATHROOMS_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' },
];

export const CARPET_ROOMS_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' },
];

export const TIMING_OPTIONS = [
  { value: 'asap', label: 'ASAP' },
  { value: 'this-week', label: 'This week' },
  { value: 'next-week', label: 'Next week' },
  { value: 'choose-date', label: 'Choose a date' },
  { value: 'quote', label: 'Just getting a quote' },
];

// Get the next step after current step
export function getNextStep(currentStep: string): string | null {
  switch (currentStep) {
    case 'service':
      return 'postcode';
    case 'postcode':
      return 'property-details';
    case 'property-details':
      return 'timing';
    case 'timing':
      return 'summary';
    case 'summary':
      return null;
    default:
      return 'service';
  }
}

// Validate single field
export function validateField(fieldId: string, value: string): boolean {
  if (fieldId === 'postcode') {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(value);
  }
  return true;
}

// Validate lead data for CRM submission
export function validateLeadData(data: Partial<ChatbotLeadData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.service) {
    errors.push('Service is required');
  }

  if (!data.postcode || !/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(data.postcode)) {
    errors.push('Valid UK postcode is required');
  }

  if (!data.timing) {
    errors.push('Preferred timing is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generate clean WhatsApp message with only non-empty fields
export function generateWhatsAppMessage(data: ChatbotLeadData): string {
  const lines = [
    `Hello Neatedge Cleaning 👋`,
    ``,
    `I'd like a quotation.`,
    ``,
  ];

  // Service
  const serviceLabel = SERVICES.find((s) => s.value === data.service)?.label || data.service;
  lines.push(`Service: ${serviceLabel}`);

  // Postcode
  lines.push(`Postcode: ${data.postcode}`);

  // Property details based on service
  if (
    data.service === 'residential-cleaning' ||
    data.service === 'deep-cleaning' ||
    data.service === 'end-of-tenancy'
  ) {
    const propertyInfo: string[] = [];
    if (data.bedrooms) propertyInfo.push(`${data.bedrooms} bedrooms`);
    if (data.bathrooms) propertyInfo.push(`${data.bathrooms} bathrooms`);
    if (propertyInfo.length > 0) {
      lines.push(`Property: ${propertyInfo.join(', ')}`);
    }
  } else if (data.service === 'carpet-cleaning') {
    if (data.carpetRooms) {
      lines.push(`Carpet rooms: ${data.carpetRooms}`);
    }
  } else if (data.service === 'commercial') {
    if (data.commercialType) {
      lines.push(`Premises: ${data.commercialType}`);
    }
    if (data.commercialFrequency) {
      lines.push(`Frequency: ${data.commercialFrequency}`);
    }
  } else if (data.service === 'property-landlord') {
    if (data.landlordServiceType) {
      lines.push(`Service type: ${data.landlordServiceType}`);
    }
  }

  // Timing
  const timingLabel = TIMING_OPTIONS.find((t) => t.value === data.timing)?.label || data.timing;
  lines.push(`Preferred date: ${timingLabel}`);

  if (data.preferredDate && data.timing === 'choose-date') {
    lines.push(`Specific date: ${data.preferredDate}`);
  }

  // Notes (only if provided)
  if (data.additionalNotes) {
    lines.push(`Notes: ${data.additionalNotes}`);
  }

  // Name (only if provided)
  if (data.name) {
    lines.push(`Name: ${data.name}`);
  }

  lines.push(``, `Sent from neatedgecleaning.com`);

  // Replace line breaks with %0A for URL encoding
  return lines.join('%0A');
}

// Generate lead source for database
export function generateLeadSource(): string {
  return 'website_chatbot';
}
