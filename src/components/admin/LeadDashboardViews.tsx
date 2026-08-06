'use client';

import { useState, useEffect } from 'react';
import LeadTable from './LeadTable';

type ViewType = 'overdue' | 'due-today' | 'upcoming' | 'no-follow-up' | 'recently-contacted';

interface ViewTab {
  id: ViewType;
  label: string;
  description: string;
}

const VIEWS: ViewTab[] = [
  { id: 'overdue', label: '🔴 Overdue', description: 'Follow-ups past their scheduled date' },
  { id: 'due-today', label: '🟡 Due Today', description: 'Follow-ups scheduled for today' },
  { id: 'upcoming', label: '🟢 Upcoming', description: 'Follow-ups scheduled for future dates' },
  { id: 'no-follow-up', label: '⚪ No Follow-up', description: 'Leads without scheduled follow-ups' },
  { id: 'recently-contacted', label: '📞 Recently Contacted', description: 'Leads contacted in last 7 days' },
];

interface LeadData {
  id: string;
  name: string;
  email: string;
  telephone: string;
  status: string;
  follow_up_at?: string;
  last_contacted_at?: string;
  created_at: string;
  assigned_to?: string;
}

export default function LeadDashboardViews() {
  const [activeView, setActiveView] = useState<ViewType>('overdue');
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `/api/admin/leads/follow-up?view=${activeView}&page=${pageIndex}&limit=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch leads: ${response.status}`);
        }

        const { data } = await response.json();
        setLeads(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [activeView, pageIndex]);

  const currentView = VIEWS.find((v) => v.id === activeView);
  const totalPages = Math.ceil(leads.length / pageSize);

  return (
    <div className="space-y-6">
      {/* View Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {VIEWS.map((view) => (
            <button
              key={view.id}
              onClick={() => {
                setActiveView(view.id);
                setPageIndex(0);
              }}
              title={view.description}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === view.id
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active View Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-navy">{currentView?.label}</h2>
          <p className="text-sm text-gray-600 mt-1">{currentView?.description}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No leads found in this view
          </div>
        ) : (
          <>
            <LeadTable
              leads={leads}
              currentPage={pageIndex + 1}
              pageSize={pageSize}
              totalLeads={leads.length}
              onPageChange={(page) => setPageIndex(page - 1)}
            />

            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {pageIndex + 1} of {totalPages} ({leads.length} total)
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                    disabled={pageIndex === 0}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPageIndex(Math.min(totalPages - 1, pageIndex + 1))}
                    disabled={pageIndex >= totalPages - 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
