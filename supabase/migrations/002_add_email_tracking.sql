-- Add email tracking fields to leads table for Resend integration
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS customer_email_status TEXT DEFAULT 'pending' CHECK (customer_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN IF NOT EXISTS internal_email_status TEXT DEFAULT 'pending' CHECK (internal_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN IF NOT EXISTS customer_email_id TEXT,
ADD COLUMN IF NOT EXISTS internal_email_id TEXT,
ADD COLUMN IF NOT EXISTS email_attempted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_error_code TEXT,
ADD COLUMN IF NOT EXISTS retry_count INTEGER DEFAULT 0;

-- Add index for email status tracking (for analytics/dashboard)
CREATE INDEX IF NOT EXISTS idx_leads_customer_email_status ON public.leads(customer_email_status);
CREATE INDEX IF NOT EXISTS idx_leads_internal_email_status ON public.leads(internal_email_status);
CREATE INDEX IF NOT EXISTS idx_leads_email_attempted_at ON public.leads(email_attempted_at DESC);
