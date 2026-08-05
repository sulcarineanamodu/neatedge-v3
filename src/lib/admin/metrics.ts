import { createClient } from '@supabase/supabase-js';

interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  quoteSentLeads: number;
  convertedLeads: number;
  lostLeads: number;
  archivedLeads: number;
  emailFailures: number;
  todaysLeads: number;
  thisMonthsLeads: number;
  conversionRate: number;
}

interface PaginatedLeadsResult {
  leads: any[];
  total: number;
  page: number;
  pageSize: number;
}

interface LeadFilters {
  status?: string[];
  enquiryType?: string[];
  emailStatus?: string[];
  searchTerm?: string;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase credentials');
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: allLeads } = await supabase.from('leads').select('id, status, created_at, email_error_code');

  if (!allLeads) {
    return {
      totalLeads: 0,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      quoteSentLeads: 0,
      convertedLeads: 0,
      lostLeads: 0,
      archivedLeads: 0,
      emailFailures: 0,
      todaysLeads: 0,
      thisMonthsLeads: 0,
      conversionRate: 0,
    };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const metrics: DashboardMetrics = {
    totalLeads: allLeads.length,
    newLeads: allLeads.filter((l) => l.status === 'new').length,
    contactedLeads: allLeads.filter((l) => l.status === 'contacted').length,
    qualifiedLeads: allLeads.filter((l) => l.status === 'qualified').length,
    quoteSentLeads: allLeads.filter((l) => l.status === 'quote_sent').length,
    convertedLeads: allLeads.filter((l) => l.status === 'converted').length,
    lostLeads: allLeads.filter((l) => l.status === 'lost').length,
    archivedLeads: allLeads.filter((l) => l.status === 'archived').length,
    emailFailures: allLeads.filter((l) => l.email_error_code).length,
    todaysLeads: allLeads.filter((l) => new Date(l.created_at) >= today).length,
    thisMonthsLeads: allLeads.filter((l) => new Date(l.created_at) >= monthStart).length,
    conversionRate: allLeads.length > 0 ? Math.round((allLeads.filter((l) => l.status === 'converted').length / allLeads.length) * 100) : 0,
  };

  return metrics;
}

export async function getPaginatedLeads(
  page: number = 1,
  pageSize: number = 20,
  filters?: LeadFilters
): Promise<PaginatedLeadsResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase credentials');
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' });

  if (filters?.status && filters.status.length > 0) {
    query = query.in('status', filters.status);
  }

  if (filters?.enquiryType && filters.enquiryType.length > 0) {
    query = query.in('enquiry_type', filters.enquiryType);
  }

  if (filters?.emailStatus && filters.emailStatus.length > 0) {
    query = query.in('customer_email_status', filters.emailStatus);
  }

  if (filters?.searchTerm) {
    const term = `%${filters.searchTerm}%`;
    query = query.or(
      `name.ilike.${term},email.ilike.${term},telephone.ilike.${term}`
    );
  }

  const offset = (page - 1) * pageSize;
  query = query.order('created_at', { ascending: false }).range(offset, offset + pageSize - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('[METRICS_ERROR]', error);
    return { leads: [], total: 0, page, pageSize };
  }

  return {
    leads: data || [],
    total: count || 0,
    page,
    pageSize,
  };
}
