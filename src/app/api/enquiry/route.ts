import { NextRequest, NextResponse } from 'next/server';
import { validateEnquiry, enquirySubmissionSchema } from '@/lib/validation/enquiry';
import { createLead, checkDuplicateSubmission } from '@/lib/db/leads';

// Rate limiting: track submissions by IP (in-memory for this demo)
const submissionTracker = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionTracker.get(ip) || [];

  // Remove submissions outside the time window
  const recentSubmissions = submissions.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentSubmissions.push(now);
  submissionTracker.set(ip, recentSubmissions);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many enquiries. Please try again later.' },
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

    // Parse and validate
    let rawData;
    try {
      rawData = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const validation = enquirySubmissionSchema.safeParse(rawData);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid enquiry data' },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check for duplicate submissions
    const isDuplicate = await checkDuplicateSubmission(data.email);
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'Enquiry already submitted recently. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Get page URL
    const pageUrl = request.headers.get('referer') || 'unknown';

    // Store in database
    const result = await createLead(data, pageUrl, ip);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to process enquiry' },
        { status: 500 }
      );
    }

    // Log submission (sanitized)
    console.log(`[LEAD_SUBMITTED] Type: ${data.enquiryType}, Method: ${data.preferredContactMethod}`);

    // TODO: Send confirmation email via SendGrid/Mailgun
    // TODO: Send internal notification

    return NextResponse.json(
      {
        success: true,
        message: "Thanks for your enquiry. We'll be in touch within 24 hours.",
        leadId: result.leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ENQUIRY_ERROR]', error);
    return NextResponse.json(
      { error: 'Unable to process your enquiry. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
