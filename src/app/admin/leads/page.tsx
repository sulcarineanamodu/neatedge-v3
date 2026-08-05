import { getDashboardMetrics, getPaginatedLeads } from '@/lib/admin/metrics';
import MetricCard from '@/components/admin/MetricCard';
import LeadTable from '@/components/admin/LeadTable';
import LeadFilters from '@/components/admin/LeadFilters';
import { Suspense } from 'react';

async function DashboardContent({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const status = params.status?.split(',').filter(Boolean);
  const enquiryType = params.type?.split(',').filter(Boolean);
  const emailStatus = params.emailStatus?.split(',').filter(Boolean);
  const searchTerm = params.search;

  const metrics = await getDashboardMetrics();
  const { leads, total } = await getPaginatedLeads(page, 20, {
    status,
    enquiryType,
    emailStatus,
    searchTerm,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-navy">Lead Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage and track all customer enquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Leads" value={metrics.totalLeads} />
        <MetricCard label="New" value={metrics.newLeads} variant="default" />
        <MetricCard label="Converted" value={metrics.convertedLeads} variant="success" />
        <MetricCard label="Conversion Rate" value={metrics.conversionRate} description="%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Contacted" value={metrics.contactedLeads} />
        <MetricCard label="Qualified" value={metrics.qualifiedLeads} />
        <MetricCard label="Quote Sent" value={metrics.quoteSentLeads} />
        <MetricCard label="Lost" value={metrics.lostLeads} variant="error" />
      </div>

      <LeadFilters />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Leads</h2>
        <LeadTable leads={leads} currentPage={page} pageSize={20} totalLeads={total} />
      </div>
    </div>
  );
}

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function LeadsPage(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent searchParams={props.searchParams} />
    </Suspense>
  );
}
