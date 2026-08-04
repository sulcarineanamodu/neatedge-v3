import { createClient } from '@supabase/supabase-js';
import type { EnquirySubmission } from '@/lib/validation/enquiry';

// Initialize Supabase client with service role (server-side only)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  telephone: string;
  postcode: string;
  enquiry_type: string;
  customer_type?: string;
  service?: string;
  property_type?: string;
  message?: string;
  preferred_contact_method: string;
  preferred_date?: string;
  marketing_consent: boolean;
  marketing_consent_at?: string;
  privacy_consent: boolean;
  privacy_consent_at: string;
  lead_source?: string;
  page_url?: string;
  status: string;
  assigned_to?: string;
  internal_notes?: string;
}

// Insert a new lead into the database
export async function createLead(
  submission: EnquirySubmission,
  pageUrl: string,
  ipAddress?: string
) {
  try {
    const now = new Date().toISOString();

    const leadData = {
      name: submission.name,
      email: submission.email,
      telephone: submission.telephone,
      postcode: submission.postcode,
      enquiry_type: submission.enquiryType,
      customer_type: submission.customerType,
      service: submission.service,
      property_type: submission.propertyType,
      message: submission.message,
      preferred_contact_method: submission.preferredContactMethod,
      preferred_date: submission.preferredDate,
      marketing_consent: submission.marketingConsent,
      marketing_consent_at: submission.marketingConsent ? now : null,
      privacy_consent: submission.privacyConsent,
      privacy_consent_at: now,
      lead_source: 'website',
      page_url: pageUrl,
      status: 'new',
      ip_address: ipAddress || null,
      user_agent: null,
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select('id')
      .single();

    if (error) {
      console.error('[DB_ERROR] Insert failed:', error.message);
      return {
        success: false,
        error: 'Failed to store enquiry',
        leadId: null,
      };
    }

    return {
      success: true,
      leadId: data?.id,
      error: null,
    };
  } catch (error) {
    console.error('[DB_ERROR] Unexpected error:', error);
    return {
      success: false,
      error: 'Unexpected database error',
      leadId: null,
    };
  }
}

// Check for duplicate submissions (same email, within time window)
export async function checkDuplicateSubmission(
  email: string,
  windowMinutes = 5
): Promise<boolean> {
  try {
    const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email.toLowerCase())
      .gt('created_at', since)
      .limit(1);

    if (error) {
      console.error('[DB_ERROR] Duplicate check failed:', error.message);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('[DB_ERROR] Unexpected error in duplicate check:', error);
    return false;
  }
}

// Get lead by ID (for admin use)
export async function getLead(id: string): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[DB_ERROR] Get lead failed:', error.message);
      return null;
    }

    return data as Lead;
  } catch (error) {
    console.error('[DB_ERROR] Unexpected error getting lead:', error);
    return null;
  }
}
