'use client';

import StatusBadge from './StatusBadge';
import LeadStatusControl from './LeadStatusControl';

interface LeadDetailContentProps {
  lead: any;
  activity: any[];
}

function formatDate(dateString: string): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatEnquiryType(type: string): string {
  const map: Record<string, string> = {
    general: 'General Enquiry',
    'residential-estimate': 'Residential Estimate',
    'commercial-survey': 'Commercial Survey',
    'property-partnership': 'Property Professional Partnership',
  };
  return map[type] || type;
}

export default function LeadDetailContent({ lead, activity }: LeadDetailContentProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Name</p>
            <p className="text-lg font-medium text-navy">{lead.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
            <p className="text-sm text-blue-600">
              <a href={`mailto:${lead.email}`}>{lead.email}</a>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Phone</p>
            <p className="text-sm text-blue-600">
              <a href={`tel:${lead.telephone}`}>{lead.telephone}</a>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Postcode</p>
            <p className="text-sm font-medium">{lead.postcode}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Enquiry Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Enquiry Type</p>
            <p className="text-sm font-medium">{formatEnquiryType(lead.enquiry_type)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Service</p>
            <p className="text-sm font-medium">{lead.service || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Property Type</p>
            <p className="text-sm font-medium">{lead.property_type || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Preferred Contact</p>
            <p className="text-sm font-medium capitalize">{lead.preferred_contact_method || '—'}</p>
          </div>
        </div>

        {lead.message && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Message</p>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Consent & Preferences</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Privacy Consent</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              lead.privacy_consent
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {lead.privacy_consent ? '✓ Confirmed' : '✗ Not Confirmed'}
            </span>
          </div>
          {lead.privacy_consent_at && (
            <p className="text-xs text-gray-600">Confirmed: {formatDate(lead.privacy_consent_at)}</p>
          )}

          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-gray-700">Marketing Consent</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              lead.marketing_consent
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {lead.marketing_consent ? '✓ Opted In' : '— Opted Out'}
            </span>
          </div>
          {lead.marketing_consent_at && (
            <p className="text-xs text-gray-600">Opted in: {formatDate(lead.marketing_consent_at)}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Email Delivery</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Customer Acknowledgement</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                lead.customer_email_status === 'sent'
                  ? 'bg-green-100 text-green-800'
                  : lead.customer_email_status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {lead.customer_email_status || 'pending'}
              </span>
              {lead.customer_email_id && (
                <p className="text-xs text-gray-600">ID: {lead.customer_email_id}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Internal Notification</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                lead.internal_email_status === 'sent'
                  ? 'bg-green-100 text-green-800'
                  : lead.internal_email_status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {lead.internal_email_status || 'pending'}
              </span>
              {lead.internal_email_id && (
                <p className="text-xs text-gray-600">ID: {lead.internal_email_id}</p>
              )}
            </div>
          </div>

          {lead.email_attempted_at && (
            <p className="text-xs text-gray-600 pt-2">Last attempt: {formatDate(lead.email_attempted_at)}</p>
          )}
          {lead.email_error_code && (
            <p className="text-xs text-red-600">Error: {lead.email_error_code}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Lead Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Current Status</p>
            <StatusBadge status={lead.status} variant="large" />
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Created</p>
            <p className="text-sm font-medium">{formatDate(lead.created_at)}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <LeadStatusControl leadId={lead.id} currentStatus={lead.status} />
        </div>

        {lead.internal_notes && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Internal Notes</p>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.internal_notes}</p>
            </div>
          </div>
        )}
      </div>

      {activity && activity.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Activity Timeline</h2>
          <div className="space-y-3">
            {activity.map((entry: any) => (
              <div key={entry.id} className="flex gap-4 pb-3 border-b border-gray-200 last:border-0">
                <div className="flex-shrink-0 w-24">
                  <p className="text-xs text-gray-600">{formatDate(entry.created_at)}</p>
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-navy capitalize">{entry.action.replace(/_/g, ' ')}</p>
                  {entry.metadata && (
                    <p className="text-xs text-gray-600 mt-1">
                      {typeof entry.metadata === 'string'
                        ? entry.metadata
                        : JSON.stringify(entry.metadata)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
