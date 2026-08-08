import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

export interface ChatbotLeadRequest {
  name: string;
  email: string;
  telephone: string;
  postcode: string;
  service: string;
  propertyType: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  frequency?: string;
  preferredDate?: string;
  additionalNotes?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

// Rate limiting: track submissions by IP (in-memory for this demo)
const submissionTracker = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionTracker.get(ip) || [];

  // Remove submissions outside the time window
  const recentSubmissions = submissions.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentSubmissions.push(now);
  submissionTracker.set(ip, recentSubmissions);
  return true;
}

function validateChatbotLead(data: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const lead = data as Record<string, unknown>;

  // Validate required fields
  if (typeof lead.name !== 'string' || lead.name.trim().length < 2) {
    errors.push('Valid name is required');
  }

  if (
    typeof lead.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)
  ) {
    errors.push('Valid email is required');
  }

  if (
    typeof lead.telephone !== 'string' ||
    !/^[\d\s\-+()]{10,20}$/.test(lead.telephone)
  ) {
    errors.push('Valid phone number is required');
  }

  if (
    typeof lead.postcode !== 'string' ||
    !/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(lead.postcode)
  ) {
    errors.push('Valid UK postcode is required');
  }

  if (typeof lead.service !== 'string' || !lead.service.trim()) {
    errors.push('Service selection is required');
  }

  if (
    typeof lead.propertyType !== 'string' ||
    !lead.propertyType.trim()
  ) {
    errors.push('Property type is required');
  }

  if (lead.privacyConsent !== true) {
    errors.push('Privacy consent is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Check request size (max 10KB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }

    // Parse JSON
    let data: unknown;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // Validate
    const validation = validateChatbotLead(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const lead = data as ChatbotLeadRequest;

    // Check for duplicate submissions (same email within 5 minutes)
    const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: existingLeads } = await supabase
      .from('leads')
      .select('id')
      .eq('email', lead.email.toLowerCase())
      .gt('created_at', since)
      .limit(1);

    if (existingLeads && existingLeads.length > 0) {
      return NextResponse.json(
        { error: 'An enquiry from this email was recently submitted. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Get page URL
    const pageUrl = request.headers.get('referer') || 'unknown';
    const now = new Date().toISOString();

    // Create lead in database
    const leadData = {
      name: lead.name.trim(),
      email: lead.email.toLowerCase().trim(),
      telephone: lead.telephone.trim(),
      postcode: lead.postcode.toUpperCase().trim(),
      enquiry_type: 'chatbot-qualification', // Distinguishes chatbot leads
      service: lead.service.trim(),
      property_type: lead.propertyType.trim(),
      message: lead.additionalNotes ? lead.additionalNotes.trim() : null,
      preferred_contact_method: 'both', // Chatbot leads can be contacted via either
      preferred_date: lead.preferredDate ? lead.preferredDate.trim() : null,
      marketing_consent: lead.marketingConsent || false,
      marketing_consent_at: lead.marketingConsent ? now : null,
      privacy_consent: lead.privacyConsent,
      privacy_consent_at: now,
      lead_source: 'website_chatbot', // Key identifier for chatbot leads
      page_url: pageUrl,
      status: 'new',
      ip_address: ip,
      user_agent: request.headers.get('user-agent'),
      // Additional chatbot-specific fields
      bedrooms: lead.bedrooms ? parseInt(lead.bedrooms, 10) || null : null,
      bathrooms: lead.bathrooms ? parseInt(lead.bathrooms, 10) || null : null,
      square_footage: lead.squareFootage ? parseInt(lead.squareFootage, 10) || null : null,
      frequency: lead.frequency ? lead.frequency.trim() : null,
    };

    const { data: insertedLead, error: insertError } = await supabase
      .from('leads')
      .insert([leadData])
      .select('id')
      .single();

    if (insertError) {
      console.error('[DB_ERROR]', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
      });
      return NextResponse.json(
        { error: 'Failed to process your enquiry. Please try again.' },
        { status: 500 }
      );
    }

    // Log submission (sanitized)
    console.log('[CHATBOT_LEAD_SUBMITTED]', {
      service: lead.service,
      propertyType: lead.propertyType,
      leadId: insertedLead?.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "We've received your enquiry. Our team will be in touch shortly.",
        leadId: insertedLead?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[CHATBOT_ERROR]', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}
