'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { KeyboardEvent, MouseEvent } from 'react';
import StatusBadge from './StatusBadge';

interface LeadTableProps {
  leads: any[];
  currentPage: number;
  pageSize: number;
  totalLeads: number;
  onPageChange?: (page: number) => void;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
  });
}

function getDisplayReference(lead: any): string {
  // Use reference field if it exists, otherwise generate from ID
  return (
    lead.reference ??
    lead.lead_reference ??
    `NE-${lead.id.slice(0, 8).toUpperCase()}`
  );
}

function LeadRow({ lead }: { lead: any }) {
  const router = useRouter();
  const href = `/admin/leads/${lead.id}`;
  const displayRef = getDisplayReference(lead);

  const openLead = () => {
    router.push(href);
  };

  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>) => {
    // Don't navigate if clicking on an interactive element
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
      return;
    }
    openLead();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLead();
    }
  };

  return (
    <tr
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      aria-label={`View lead ${displayRef}`}
      className="
        border-b border-gray-200
        cursor-pointer
        transition-colors
        hover:bg-gray-100
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-blue-500
      "
    >
      <td className="py-3 px-4">
        <Link
          href={href}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
          onKeyDown={(e: KeyboardEvent<HTMLAnchorElement>) => e.stopPropagation()}
          className="font-medium text-blue-600 hover:underline text-sm"
        >
          {displayRef}
        </Link>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{formatDate(lead.created_at)}</td>
      <td className="py-3 px-4 text-sm font-medium text-navy">{lead.name}</td>
      <td className="py-3 px-4 text-sm text-blue-600">
        
          href={`mailto:${lead.email}`}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
          className="hover:underline"
        >
          {lead.email}
        </a>
      </td>
      <td className="py-3 px-4 text-sm text-blue-600">
        
          href={`tel:${lead.telephone}`}
          onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
          className="hover:underline"
        >
          {lead.telephone}
        </a>
      </td>
      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        <StatusBadge status={lead.status} />
      </td>
    </tr>
  );
}

export default function LeadTable({
  leads,
  currentPage,
  pageSize,
  totalLeads,
}: LeadTableProps) {
  const totalPages = Math.ceil(totalLeads / pageSize);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Ref</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({totalLeads} total)
          </p>
        </div>
      )}
    </div>
  );
}
