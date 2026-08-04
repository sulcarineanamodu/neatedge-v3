import { z } from 'zod';

// Enquiry submission validation schema
export const enquirySubmissionSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters')
    .trim(),

  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),

  telephone: z
    .string()
    .regex(/^[\d\s\-+()]{10,20}$/, 'Invalid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .trim(),

  postcode: z
    .string()
    .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, 'Invalid UK postcode format')
    .max(10, 'Postcode must be less than 10 characters')
    .toUpperCase()
    .trim(),

  enquiryType: z.enum([
    'general',
    'residential-estimate',
    'commercial-survey',
    'property-partnership',
  ]),

  customerType: z
    .enum(['residential', 'commercial', 'property-professional'])
    .optional(),

  service: z
    .string()
    .max(255, 'Service must be less than 255 characters')
    .optional(),

  propertyType: z
    .string()
    .max(50, 'Property type must be less than 50 characters')
    .optional(),

  message: z
    .string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional(),

  preferredContactMethod: z
    .enum(['email', 'phone', 'both'])
    .default('email'),

  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),

  marketingConsent: z.boolean().default(false),

  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the privacy policy to submit this form',
    }),
});

export type EnquirySubmission = z.infer<typeof enquirySubmissionSchema>;

// Validate enquiry submission
export function validateEnquiry(data: unknown) {
  try {
    return enquirySubmissionSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      };
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed' }],
    };
  }
}
