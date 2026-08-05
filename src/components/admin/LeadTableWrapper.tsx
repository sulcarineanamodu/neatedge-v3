'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import LeadTable from './LeadTable';

interface LeadTableWrapperProps {
  leads: any[];
  currentPage: number;
  pageSize: number;
  totalLeads: number;
}

export default function LeadTableWrapper({
  leads,
  currentPage,
  pageSize,
  totalLeads,
}: LeadTableWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <LeadTable
      leads={leads}
      currentPage={currentPage}
      pageSize={pageSize}
      totalLeads={totalLeads}
      onPageChange={handlePageChange}
    />
  );
}
