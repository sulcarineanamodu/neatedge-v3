import { Resend } from 'resend';
import { CustomerEnquiryReceivedEmail, InternalNewLeadEmail } from './templates';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(resendApiKey);

const SENDER_EMAIL = 'enquiries@send.neatedgecleaning.com';
const REPLY_TO_EMAIL = 'info@neatedgecleaning.com';
const INTERNAL_EMAIL = 'info@neatedgecleaning.com';

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Send customer acknowledgement email
 * Returns immediately with Resend message ID (fire-and-forget)
 */
export async function sendCustomerAcknowledgementEmail(
  customerEmail: string,
  name: string,
  enquiryType: string,
  leadId: string
): Promise<SendEmailResult> {
  try {
    const result = await resend.emails.send({
      from: `Neatedge Cleaning <${SENDER_EMAIL}>`,
      to: customerEmail,
      replyTo: REPLY_TO_EMAIL,
      subject: `We Received Your Enquiry • Neatedge Cleaning`,
      react: CustomerEnquiryReceivedEmail({ name, enquiryType, leadId }),
    });

    if (result.error) {
      return {
        success: false,
        errorCode: result.error.message || 'unknown',
        errorMessage: result.error.message || 'Failed to send email',
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('[EMAIL_ERROR] Customer acknowledgement failed:', error);
    return {
      success: false,
      errorCode: 'send_failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send internal lead notification email
 * Sent to info@neatedgecleaning.com (fire-and-forget)
 */
export async function sendInternalLeadNotification(
  name: string,
  email: string,
  telephone: string,
  postcode: string,
  enquiryType: string,
  message: string | undefined,
  preferredContactMethod: string,
  leadId: string
): Promise<SendEmailResult> {
  try {
    const result = await resend.emails.send({
      from: `Neatedge Cleaning <${SENDER_EMAIL}>`,
      to: INTERNAL_EMAIL,
      replyTo: email,
      subject: `New Lead: ${name} • ${enquiryType}`,
      react: InternalNewLeadEmail({
        name,
        email,
        telephone,
        postcode,
        enquiryType,
        message,
        preferredContactMethod,
        leadId,
      }),
    });

    if (result.error) {
      return {
        success: false,
        errorCode: result.error.message || 'unknown',
        errorMessage: result.error.message || 'Failed to send email',
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('[EMAIL_ERROR] Internal notification failed:', error);
    return {
      success: false,
      errorCode: 'send_failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Update lead email status in database
 * Called after email send attempt (success or failure)
 */
export async function updateLeadEmailStatus(
  leadId: string,
  emailType: 'customer' | 'internal',
  status: 'sent' | 'failed',
  messageId?: string,
  errorCode?: string
) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[DB_ERROR] Missing Supabase credentials');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const now = new Date().toISOString();
    const updates: Record<string, unknown> = {
      email_attempted_at: now,
    };

    if (emailType === 'customer') {
      updates.customer_email_status = status;
      updates.customer_email_id = messageId || null;
    } else {
      updates.internal_email_status = status;
      updates.internal_email_id = messageId || null;
    }

    if (errorCode) {
      updates.email_error_code = errorCode;
    }

    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', leadId);

    if (error) {
      console.error('[DB_ERROR] Failed to update email status:', {
        code: error.code,
        message: error.message,
      });
    }
  } catch (error) {
    console.error('[DB_ERROR] Unexpected error updating email status:', error);
  }
}
