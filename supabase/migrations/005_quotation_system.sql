-- Migration 005: Quotation System
-- Adds quote generation, pricing snapshots, and quote lifecycle tracking
-- Date: 2026-08-07

-- ============================================================================
-- QUOTES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  quote_number VARCHAR(50) NOT NULL UNIQUE,
  service_type VARCHAR(100) NOT NULL,
  property_address TEXT,

  -- Job configuration (inputs to calculator)
  cleaners_assumed INTEGER,
  hours_estimated DECIMAL(5, 2),
  material_cost DECIMAL(10, 2) DEFAULT 0,
  travel_cost DECIMAL(10, 2) DEFAULT 0,

  -- Pricing calculation
  calculated_minimum_price DECIMAL(10, 2),
  final_quote_price DECIMAL(10, 2) NOT NULL,
  profit_margin_pct DECIMAL(5, 2),

  -- Pricing snapshot (immutable record)
  pricing_snapshot JSONB,

  -- Quote metadata
  notes TEXT,
  internal_notes TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft',
  sent_at TIMESTAMP WITH TIME ZONE,
  email_id VARCHAR(255),

  -- VAT support (future-ready, currently disabled)
  vat_enabled BOOLEAN DEFAULT false,
  vat_rate DECIMAL(5, 4) DEFAULT 0.20,
  subtotal_net DECIMAL(10, 2),
  vat_amount DECIMAL(10, 2),
  total_gross DECIMAL(10, 2),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quotes_lead_id ON public.quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON public.quotes(quote_number);

-- ============================================================================
-- QUOTE RESPONSES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quote_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE UNIQUE,
  response_type VARCHAR(50),
  feedback TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quote_responses_quote_id ON public.quote_responses(quote_id);

-- ============================================================================
-- ENABLE RLS
-- ============================================================================

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_responses ENABLE ROW LEVEL SECURITY;

-- Quotes: Admin-only read/write
CREATE POLICY "quotes_admin_read" ON public.quotes
  FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "quotes_admin_insert" ON public.quotes
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "quotes_admin_update" ON public.quotes
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Quote responses: Public insert (unauthenticated), admin read
CREATE POLICY "quote_responses_public_insert" ON public.quote_responses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "quote_responses_admin_read" ON public.quote_responses
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT ALL ON public.quotes TO authenticated;
GRANT ALL ON public.quote_responses TO authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Tables created:
--   - quotes (quote records with pricing snapshots)
--   - quote_responses (accept/decline tracking)
-- RLS policies enabled and configured
-- Ready for quote generation API endpoints
