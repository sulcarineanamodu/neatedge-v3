'use client';

import { useEffect, useState } from 'react';

interface ContactRecord {
  id: string;
  contact_method: string;
  notes: string | null;
  created_at: string;
  admin_profiles?: { display_name: string };
}

interface ContactHistoryProps {
  leadId: string;
}

export default function ContactHistory({ leadId }: ContactHistoryProps) {
  const [history, setHistory] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `/api/admin/leads/contact-history?leadId=${leadId}`
        );
        if (!response.ok) throw new Error('Failed to fetch history');
        const { data } = await response.json();
        setHistory(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [leadId]);

  if (loading) return <div className="text-gray-600">Loading history...</div>;

  if (history.length === 0) {
    return <div className="text-gray-600 text-sm">No contact history yet</div>;
  }

  const formatMethod = (method: string) => {
    return method
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {history.map((record) => (
        <div
          key={record.id}
          className="border-l-2 border-navy pl-4 py-2"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-sm text-navy">
                {formatMethod(record.contact_method)}
              </p>
              <p className="text-xs text-gray-600">
                {formatDate(record.created_at)}
              </p>
            </div>
          </div>
          {record.notes && (
            <p className="text-sm text-gray-700 mt-2">{record.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
