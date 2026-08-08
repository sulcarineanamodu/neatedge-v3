// Chatbot conversation flow and lead qualification logic

export type ServiceType =
  | 'residential-cleaning'
  | 'deep-cleaning'
  | 'end-of-tenancy'
  | 'carpet-cleaning'
  | 'office-cleaning'
  | 'commercial';

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'bungalow'
  | 'office'
  | 'retail'
  | 'warehouse'
  | 'other';

export type FrequencyType =
  | 'one-off'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'quarterly'
  | 'other';

export interface ChatbotLeadData {
  name: string;
  email: string;
  telephone: string;
  postcode: string;
  service: ServiceType | '';
  propertyType: PropertyType | '';
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  frequency?: FrequencyType | '';
  preferredDate?: string;
  additionalNotes?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export interface ChatbotQuestion {
  id: string;
  text: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'date' | 'textarea' | 'postcode' | 'number';
  options?: { value: string; label: string }[];
  validation?: (value: string) => boolean;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  conditional?: (data: Partial<ChatbotLeadData>) => boolean;
}

export const SERVICES: { value: ServiceType; label: string }[] = [
  { value: 'residential-cleaning', label: 'Residential Cleaning' },
  { value: 'deep-cleaning', label: 'Deep Cleaning' },
  { value: 'end-of-tenancy', label: 'End of Tenancy Cleaning' },
  { value: 'carpet-cleaning', label: 'Carpet Cleaning' },
  { value: 'office-cleaning', label: 'Office Cleaning' },
  { value: 'commercial', label: 'Commercial' },
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail Space' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'other', label: 'Other' },
];

export const FREQUENCIES: { value: FrequencyType; label: string }[] = [
  { value: 'one-off', label: 'One-off Clean' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'other', label: 'Other' },
];

// Chatbot conversation flow
export const CHATBOT_FLOW: ChatbotQuestion[] = [
  {
    id: 'greeting',
    text: "Hi! Welcome to Neatedge Cleaning. Whats your name?",
    type: 'text',
    required: true,
    placeholder: 'Your full name',
    validation: (value) => value.trim().length >= 2,
    errorMessage: 'Please enter a valid name',
  },
  {
    id: 'email',
    text: 'What email should we use to contact you?',
    type: 'email',
    required: true,
    placeholder: 'your@email.com',
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: 'Please enter a valid email address',
  },
  {
    id: 'telephone',
    text: 'Whats your phone number?',
    type: 'phone',
    required: true,
    placeholder: '07700 123456',
    validation: (value) => /^[\d\s\-+()]{10,20}$/.test(value),
    errorMessage: 'Please enter a valid phone number',
  },
  {
    id: 'postcode',
    text: 'Whats your postcode?',
    type: 'postcode',
    required: true,
    placeholder: 'SW1A 1AA',
    validation: (value) => /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(value),
    errorMessage: 'Please enter a valid UK postcode',
  },
  {
    id: 'service',
    text: 'What cleaning service do you need?',
    type: 'select',
    options: SERVICES.map((s) => ({ value: s.value, label: s.label })),
    required: true,
    validation: (value) => SERVICES.some((s) => s.value === value),
    errorMessage: 'Please select a service',
  },
  {
    id: 'propertyType',
    text: 'What type of property?',
    type: 'select',
    options: PROPERTY_TYPES.map((p) => ({ value: p.value, label: p.label })),
    required: true,
    validation: (value) => PROPERTY_TYPES.some((p) => p.value === value),
    errorMessage: 'Please select a property type',
    conditional: () => {
      // Show property type for all services
      return true;
    },
  },
  {
    id: 'bedrooms',
    text: 'How many bedrooms?',
    type: 'number',
    placeholder: '3',
    conditional: (data) =>
      data.propertyType === 'apartment' ||
      data.propertyType === 'house' ||
      data.propertyType === 'bungalow',
  },
  {
    id: 'bathrooms',
    text: 'How many bathrooms?',
    type: 'number',
    placeholder: '2',
    conditional: (data) =>
      data.propertyType === 'apartment' ||
      data.propertyType === 'house' ||
      data.propertyType === 'bungalow',
  },
  {
    id: 'squareFootage',
    text: 'Approximate square footage? (optional)',
    type: 'number',
    placeholder: '2000',
    conditional: (data) =>
      data.propertyType === 'office' ||
      data.propertyType === 'retail' ||
      data.propertyType === 'warehouse' ||
      data.propertyType === 'other',
  },
  {
    id: 'frequency',
    text: 'How often do you need this service?',
    type: 'select',
    options: FREQUENCIES.map((f) => ({ value: f.value, label: f.label })),
    required: true,
    conditional: (data) => data.service !== 'end-of-tenancy',
  },
  {
    id: 'preferredDate',
    text: 'When would you like the service?',
    type: 'date',
    required: false,
    conditional: (data) =>
      data.service === 'end-of-tenancy' || data.frequency === 'one-off',
  },
  {
    id: 'additionalNotes',
    text: 'Any additional details we should know? (optional)',
    type: 'textarea',
    placeholder: 'E.g., specific areas of concern, access details, etc.',
    validation: (value) => (value ? value.length <= 2000 : true),
    errorMessage: 'Additional notes must be less than 2000 characters',
  },
  {
    id: 'privacyConsent',
    text: 'I agree to the privacy policy',
    type: 'text', // Will be handled as checkbox in UI
    required: true,
  },
  {
    id: 'marketingConsent',
    text: 'I would like to receive updates about special offers',
    type: 'text', // Will be handled as checkbox in UI
    required: false,
  },
];

// Get questions to display based on conditional logic
export function getActiveQuestions(
  data: Partial<ChatbotLeadData>
): ChatbotQuestion[] {
  return CHATBOT_FLOW.filter((question) => {
    if (question.conditional) {
      return question.conditional(data);
    }
    return true;
  });
}

// Validate lead data
export function validateLeadData(data: Partial<ChatbotLeadData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required (min 2 characters)');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.telephone || !/^[\d\s\-+()]{10,20}$/.test(data.telephone)) {
    errors.push('Valid phone number is required');
  }

  if (!data.postcode || !/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(data.postcode)) {
    errors.push('Valid UK postcode is required');
  }

  if (!data.service || data.service.trim() === '') {
    errors.push('Service selection is required');
  }

  if (!data.propertyType || data.propertyType.trim() === '') {
    errors.push('Property type is required');
  }

  if (data.service !== 'end-of-tenancy' && (!data.frequency || data.frequency.trim() === '')) {
    errors.push('Frequency is required');
  }

  if (!data.privacyConsent) {
    errors.push('You must accept the privacy policy');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generate pre-filled WhatsApp message
export function generateWhatsAppMessage(data: ChatbotLeadData): string {
  const lines = [
    `*New Cleaning Service Inquiry*`,
    ``,
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.telephone}`,
    `*Postcode:* ${data.postcode}`,
    `*Service:* ${SERVICES.find((s) => s.value === data.service)?.label || data.service}`,
    `*Property Type:* ${PROPERTY_TYPES.find((p) => p.value === data.propertyType)?.label || data.propertyType}`,
  ];

  if (data.bedrooms) {
    lines.push(`*Bedrooms:* ${data.bedrooms}`);
  }

  if (data.bathrooms) {
    lines.push(`*Bathrooms:* ${data.bathrooms}`);
  }

  if (data.squareFootage) {
    lines.push(`*Square Footage:* ${data.squareFootage} sqft`);
  }

  if (data.frequency && data.frequency !== 'one-off') {
    lines.push(
      `*Frequency:* ${FREQUENCIES.find((f) => f.value === data.frequency)?.label || data.frequency}`
    );
  }

  if (data.preferredDate) {
    lines.push(`*Preferred Date:* ${data.preferredDate}`);
  }

  if (data.additionalNotes) {
    lines.push(`*Notes:* ${data.additionalNotes}`);
  }

  lines.push(``, `*Source:* Website Chatbot`);

  return lines.join(`%0A`);
}

// Generate lead source for database
export function generateLeadSource(): string {
  return 'website_chatbot';
}
