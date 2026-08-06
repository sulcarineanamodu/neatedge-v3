-- Migration 003: Admin Dashboard Schema
-- Creates admin authentication, lead activity tracking, and audit logging
-- Date: 2026-08-05

-- ============================================================================
-- ADMIN PROFILES TABLE
-- ============================================================================

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  role text not null default 'user' check (role in ('admin', 'user')),
  status text not null default 'active' check (status in ('active', 'inactive', 'suspended')),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index idx_admin_profiles_user_id on public.admin_profiles(user_id);
create index idx_admin_profiles_role on public.admin_profiles(role);
create index idx_admin_profiles_status on public.admin_profiles(status);

-- ============================================================================
-- LEAD ACTIVITY TABLE
-- ============================================================================

create table if not exists public.lead_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  admin_id uuid references auth.users(id) on delete set null,
  action text not null,
  previous_value jsonb,
  new_value jsonb,
  metadata jsonb,
  created_at timestamp with time zone not null default now()
);

create index idx_lead_activity_lead_id on public.lead_activity(lead_id);
create index idx_lead_activity_admin_id on public.lead_activity(admin_id);
create index idx_lead_activity_action on public.lead_activity(action);
create index idx_lead_activity_created_at on public.lead_activity(created_at desc);

-- ============================================================================
-- AUDIT LOG TABLE
-- ============================================================================

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource_type text,
  resource_id text,
  status text default 'pending' check (status in ('pending', 'success', 'failed')),
  error_message text,
  metadata jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone not null default now()
);

create index idx_audit_log_admin_id on public.audit_log(admin_id);
create index idx_audit_log_action on public.audit_log(action);
create index idx_audit_log_created_at on public.audit_log(created_at desc);
create index idx_audit_log_resource on public.audit_log(resource_type, resource_id);

-- ============================================================================
-- ENHANCE LEADS TABLE WITH ADMIN FIELDS
-- ============================================================================
-- Note: Email tracking columns (customer_email_status, internal_email_status,
-- customer_email_id, internal_email_id, email_attempted_at, email_error_code, retry_count)
-- were added in migration 002_add_email_tracking.sql

alter table public.leads add column if not exists internal_notes text;

-- ============================================================================
-- HELPER FUNCTION: IS_ADMIN
-- ============================================================================

create or replace function public.is_admin(user_id uuid)
returns boolean as $$
  select exists(
    select 1 from public.admin_profiles
    where admin_profiles.user_id = is_admin.user_id
    and admin_profiles.role = 'admin'
    and admin_profiles.status = 'active'
  );
$$ language sql security definer stable;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
alter table public.admin_profiles enable row level security;
alter table public.lead_activity enable row level security;
alter table public.audit_log enable row level security;

-- Admin Profiles: Only authenticated users can read, admins can update
create policy "admin_profiles_read" on public.admin_profiles
  for select
  using (auth.role() = 'authenticated');

create policy "admin_profiles_update_self" on public.admin_profiles
  for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Lead Activity: Only admins can read and insert
create policy "lead_activity_admin_read" on public.lead_activity
  for select
  using (public.is_admin(auth.uid()));

create policy "lead_activity_admin_insert" on public.lead_activity
  for insert
  with check (public.is_admin(auth.uid()));

-- Audit Log: Only admins can read and insert
create policy "audit_log_admin_read" on public.audit_log
  for select
  using (public.is_admin(auth.uid()));

create policy "audit_log_admin_insert" on public.audit_log
  for insert
  with check (public.is_admin(auth.uid()));

-- Leads: Restrict based on admin role
-- Anonymous users cannot access
-- Authenticated non-admins cannot access
-- Only admins can read and update
alter table public.leads enable row level security;

create policy "leads_admin_read" on public.leads
  for select
  using (public.is_admin(auth.uid()));

create policy "leads_admin_update" on public.leads
  for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

grant all on public.admin_profiles to authenticated;
grant all on public.lead_activity to authenticated;
grant all on public.audit_log to authenticated;
grant execute on function public.is_admin to authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Tables created:
--   - admin_profiles
--   - lead_activity
--   - audit_log
-- Columns added to leads:
--   - internal_notes (new)
-- Email tracking columns already exist from migration 002
-- RLS policies enabled and configured
-- is_admin() helper function created
