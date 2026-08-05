'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const STATUS_OPTIONS = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'quote_sent', label: 'Quote Sent' },
  { id: 'converted', label: 'Converted' },
  { id: 'lost', label: 'Lost' },
  { id: 'archived', label: 'Archived' },
];

const ENQUIRY_TYPE_OPTIONS = [
  { id: 'general', label: 'General Enquiry' },
  { id: 'residential-estimate', label: 'Residential Estimate' },
  { id: 'commercial-survey', label: 'Commercial Survey' },
  { id: 'property-partnership', label: 'Property Professional Partnership' },
];

const EMAIL_STATUS_OPTIONS = [
  { id: 'sent', label: 'Sent' },
  { id: 'failed', label: 'Failed' },
  { id: 'pending', label: 'Pending' },
];

export default function LeadFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const selectedStatuses = searchParams.get('status')?.split(',') || [];
  const selectedTypes = searchParams.get('type')?.split(',') || [];
  const selectedEmailStatus = searchParams.get('emailStatus')?.split(',') || [];

  function updateFilters(key: string, values: string[]) {
    const params = new URLSearchParams(searchParams);

    if (values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join(','));
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }

  function toggleStatus(status: string) {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateFilters('status', updated);
  }

  function toggleType(type: string) {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    updateFilters('type', updated);
  }

  function toggleEmailStatus(status: string) {
    const updated = selectedEmailStatus.includes(status)
      ? selectedEmailStatus.filter((s) => s !== status)
      : [...selectedEmailStatus, status];
    updateFilters('emailStatus', updated);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  }

  function clearFilters() {
    router.push('/admin/leads');
  }

  const hasFilters =
    selectedStatuses.length > 0 ||
    selectedTypes.length > 0 ||
    selectedEmailStatus.length > 0 ||
    searchTerm;

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, or phone..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
        />
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-navy hover:text-blue-700"
      >
        {isOpen ? '▼ Filters' : '▶ Filters'}
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => (
                <label key={status.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.id)}
                    onChange={() => toggleStatus(status.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Enquiry Type</p>
            <div className="space-y-2">
              {ENQUIRY_TYPE_OPTIONS.map((type) => (
                <label key={type.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.id)}
                    onChange={() => toggleType(type.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Email Status</p>
            <div className="space-y-2">
              {EMAIL_STATUS_OPTIONS.map((status) => (
                <label key={status.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedEmailStatus.includes(status.id)}
                    onChange={() => toggleEmailStatus(status.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
