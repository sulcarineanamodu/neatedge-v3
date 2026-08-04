-- Add email tracking fields to leads table for Resend integration
ALTER TABLE public.leads
ADD COLUMN customer_email_status TEXT DEFAULT 'pending' CHECK (customer_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN internal_email_status TEXT DEFAULT 'pending' CHECK (internal_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN customer_email_id TEXT,
ADD COLUMN internal_email_id TEXT,
ADD COLUMN email_attempted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN email_error_code TEXT,
ADD COLUMN retry_count INTEGER DEFAULT 0;

-- Add index for email status tracking (for analytics/dashboard)
CREATE INDEX idx_leads_customer_email_status ON public.leads(customer_email_status);
CREATE INDEX idx_leads_internal_email_status ON public.leads(internal_email_status);
CREATE INDEX idx_leads_email_attempted_at ON public.leads(email_attempted_at DESC);
