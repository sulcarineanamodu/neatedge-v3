import Link from 'next/link';
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
              <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link href={`/admin/leads/${lead.id}`} className="text-blue-600 hover:underline font-medium text-sm">
                    {lead.reference}
                  </Link>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{formatDate(lead.created_at)}</td>
                <td className="py-3 px-4 text-sm font-medium text-navy">{lead.name}</td>
                <td className="py-3 px-4 text-sm text-blue-600">
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </td>
                <td className="py-3 px-4 text-sm text-blue-600">
                  <a href={`tel:${lead.telephone}`}>{lead.telephone}</a>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={lead.status} />
                </td>
              </tr>
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
