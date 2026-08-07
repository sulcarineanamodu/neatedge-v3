-- Migration 004: CRM Follow-up Workflow
-- Adds follow-up scheduling, contact history, and workflow automation
-- Date: 2026-08-06

-- ============================================================================
-- ENHANCE LEADS TABLE WITH FOLLOW-UP FIELDS
-- ============================================================================

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS follow_up_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS lost_reason VARCHAR(255);
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS estimated_job_value DECIMAL(10, 2);

-- ============================================================================
-- CONTACT HISTORY TABLE
-- ============================================================================
-- Tracks every contact attempt with a lead (call, email, WhatsApp, quote sent, etc)

CREATE TABLE IF NOT EXISTS public.contact_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('phone_call', 'email', 'whatsapp', 'site_survey', 'quote_sent', 'note', 'other')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_history_lead_id ON public.contact_history(lead_id);
CREATE INDEX IF NOT EXISTS idx_contact_history_admin_id ON public.contact_history(admin_id);
CREATE INDEX IF NOT EXISTS idx_contact_history_created_at ON public.contact_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_history_method ON public.contact_history(contact_method);

-- ============================================================================
-- FOLLOW-UP REMINDERS TABLE
-- ============================================================================
-- Stores scheduled follow-ups to trigger email reminders

CREATE TABLE IF NOT EXISTS public.follow_up_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE UNIQUE,
  follow_up_at TIMESTAMP WITH TIME ZONE NOT NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,
  reminded_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_lead_id ON public.follow_up_reminders(lead_id);
CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_follow_up_at ON public.follow_up_reminders(follow_up_at);
CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_assigned_to ON public.follow_up_reminders(assigned_to);
CREATE INDEX IF NOT EXISTS idx_follow_up_reminders_reminder_sent_at ON public.follow_up_reminders(reminder_sent_at);

-- ============================================================================
-- TEAM MEMBERS TABLE
-- ============================================================================
-- Maps admin users to team members for lead assignment

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  role VARCHAR(50),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON public.team_members(email);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON public.team_members(active);

-- ============================================================================
-- ENABLE RLS ON NEW TABLES
-- ============================================================================

ALTER TABLE public.contact_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Contact History: Only admins can read and insert
DROP POLICY IF EXISTS "contact_history_admin_read" ON public.contact_history;
CREATE POLICY "contact_history_admin_read" ON public.contact_history
  FOR SELECT
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "contact_history_admin_insert" ON public.contact_history;
CREATE POLICY "contact_history_admin_insert" ON public.contact_history
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "contact_history_admin_update" ON public.contact_history;
CREATE POLICY "contact_history_admin_update" ON public.contact_history
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Follow-up Reminders: Only admins can read and insert
DROP POLICY IF EXISTS "follow_up_reminders_admin_read" ON public.follow_up_reminders;
CREATE POLICY "follow_up_reminders_admin_read" ON public.follow_up_reminders
  FOR SELECT
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "follow_up_reminders_admin_insert" ON public.follow_up_reminders;
CREATE POLICY "follow_up_reminders_admin_insert" ON public.follow_up_reminders
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "follow_up_reminders_admin_update" ON public.follow_up_reminders;
CREATE POLICY "follow_up_reminders_admin_update" ON public.follow_up_reminders
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Team Members: Authenticated users can read, admins can insert/update
DROP POLICY IF EXISTS "team_members_read" ON public.team_members;
CREATE POLICY "team_members_read" ON public.team_members
  FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "team_members_admin_insert" ON public.team_members;
CREATE POLICY "team_members_admin_insert" ON public.team_members
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "team_members_admin_update" ON public.team_members;
CREATE POLICY "team_members_admin_update" ON public.team_members
  FOR UPDATE
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get leads that are overdue for follow-up
CREATE OR REPLACE FUNCTION public.get_overdue_leads()
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  telephone VARCHAR,
  status VARCHAR,
  assigned_to UUID,
  follow_up_at TIMESTAMP WITH TIME ZONE,
  days_overdue BIGINT
) AS $$
  SELECT
    l.id,
    l.name,
    l.email,
    l.telephone,
    l.status,
    l.assigned_to,
    l.follow_up_at,
    EXTRACT(DAY FROM (now() - l.follow_up_at))::BIGINT as days_overdue
  FROM public.leads l
  WHERE l.follow_up_at IS NOT NULL
    AND l.follow_up_at < now()
    AND l.status != 'converted'
    AND l.status != 'archived'
  ORDER BY l.follow_up_at ASC;
$$ LANGUAGE SQL STABLE;

-- Get leads due today for follow-up
CREATE OR REPLACE FUNCTION public.get_leads_due_today()
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  telephone VARCHAR,
  status VARCHAR,
  assigned_to UUID,
  follow_up_at TIMESTAMP WITH TIME ZONE
) AS $$
  SELECT
    l.id,
    l.name,
    l.email,
    l.telephone,
    l.status,
    l.assigned_to,
    l.follow_up_at
  FROM public.leads l
  WHERE l.follow_up_at IS NOT NULL
    AND DATE(l.follow_up_at) = CURRENT_DATE
    AND l.status != 'converted'
    AND l.status != 'archived'
  ORDER BY l.follow_up_at ASC;
$$ LANGUAGE SQL STABLE;

-- Get leads with no follow-up scheduled
CREATE OR REPLACE FUNCTION public.get_leads_without_follow_up()
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  telephone VARCHAR,
  status VARCHAR,
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  days_since_contact BIGINT
) AS $$
  SELECT
    l.id,
    l.name,
    l.email,
    l.telephone,
    l.status,
    l.assigned_to,
    l.created_at,
    EXTRACT(DAY FROM (now() - COALESCE(l.last_contacted_at, l.created_at)))::BIGINT as days_since_contact
  FROM public.leads l
  WHERE l.follow_up_at IS NULL
    AND l.status != 'converted'
    AND l.status != 'archived'
  ORDER BY COALESCE(l.last_contacted_at, l.created_at) ASC;
$$ LANGUAGE SQL STABLE;

-- Get unassigned new leads
CREATE OR REPLACE FUNCTION public.get_unassigned_new_leads()
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  email VARCHAR,
  telephone VARCHAR,
  enquiry_type VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
  SELECT
    l.id,
    l.name,
    l.email,
    l.telephone,
    l.enquiry_type,
    l.created_at
  FROM public.leads l
  WHERE l.assigned_to IS NULL
    AND l.status = 'new'
  ORDER BY l.created_at ASC;
$$ LANGUAGE SQL STABLE;

-- Grant permissions on new tables
GRANT ALL ON public.contact_history TO authenticated;
GRANT ALL ON public.follow_up_reminders TO authenticated;
GRANT ALL ON public.team_members TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_overdue_leads TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leads_due_today TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leads_without_follow_up TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_unassigned_new_leads TO authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Tables created:
--   - contact_history (tracks all contact attempts)
--   - follow_up_reminders (scheduled follow-ups)
--   - team_members (team member mapping)
-- Columns added to leads:
--   - follow_up_at
--   - last_contacted_at
--   - lost_reason
--   - estimated_job_value
-- Helper functions created:
--   - get_overdue_leads()
--   - get_leads_due_today()
--   - get_leads_without_follow_up()
--   - get_unassigned_new_leads()
-- RLS policies enabled and configured
