'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUS_OPTIONS = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'quote_sent', label: 'Quote Sent' },
  { id: 'converted', label: 'Converted' },
  { id: 'lost', label: 'Lost' },
  { id: 'archived', label: 'Archived' },
];

interface LeadStatusControlProps {
  leadId: string;
  currentStatus: string;
  onStatusChanged?: () => void;
}

export default function LeadStatusControl({
  leadId,
  currentStatus,
  onStatusChanged,
}: LeadStatusControlProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;

    if (newStatus === currentStatus) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update status');
      }

      router.refresh();
      onStatusChanged?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      e.target.value = currentStatus;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-2">
        Change Status
      </label>
      <div className="space-y-2">
        <select
          id="status"
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50"
        >
          {STATUS_OPTIONS.map(status => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {loading && (
          <p className="text-sm text-gray-600">Updating...</p>
        )}
      </div>
    </div>
  );
}
