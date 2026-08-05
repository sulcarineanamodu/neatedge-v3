import { verifyAdmin } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';
import { notFound, redirect } from 'next/navigation';
import BackButton from '@/components/admin/BackButton';
import LeadDetailContent from '@/components/admin/LeadDetailContent';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return <div>Error loading lead</div>;
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (leadError || !lead) {
    notFound();
  }

  const { data: activity } = await supabase
    .from('lead_activity')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <BackButton />

      <div>
        <h1 className="text-4xl font-bold text-navy">{lead.name}</h1>
        <p className="text-gray-600 mt-2">Lead Reference: {lead.reference}</p>
      </div>

      <LeadDetailContent lead={lead} activity={activity || []} />
    </div>
  );
}
