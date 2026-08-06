'use client';

import { useState } from 'react';

interface QuickContactActionsProps {
  leadId: string;
  onSuccess: () => void;
}

export default function QuickContactActions({
  leadId,
  onSuccess,
}: QuickContactActionsProps) {
  const [loading, setLoading] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [notes, setNotes] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const methods = [
    { value: 'phone_call', label: '📞 Phone Call' },
    { value: 'email', label: '📧 Email' },
    { value: 'whatsapp', label: '💬 WhatsApp' },
    { value: 'site_survey', label: '🏠 Site Survey' },
    { value: 'quote_sent', label: '💰 Quote Sent' },
  ];

  const handleQuickContact = async (method: string) => {
    setLoading(true);
    setSelectedMethod(method);

    try {
      const response = await fetch('/api/admin/leads/contact-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          contactMethod: method,
          notes: method === 'quote_sent' ? 'Quote sent to customer' : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to record contact');

      onSuccess();
      setSelectedMethod('');
    } catch (error) {
      console.error('Error recording contact:', error);
      alert('Failed to record contact');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteSubmit = async () => {
    if (!notes.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/admin/leads/contact-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          contactMethod: 'note',
          notes,
        }),
      });

      if (!response.ok) throw new Error('Failed to save note');

      onSuccess();
      setNotes('');
      setShowNoteForm(false);
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {methods.map((method) => (
          <button
            key={method.value}
            onClick={() => handleQuickContact(method.value)}
            disabled={loading}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-left"
          >
            {method.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowNoteForm(!showNoteForm)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        📝 Add Note
      </button>

      {showNoteForm && (
        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal note..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleNoteSubmit}
              disabled={!notes.trim() || loading}
              className="flex-1 px-3 py-2 text-sm bg-navy text-white rounded-lg hover:bg-navy/90 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowNoteForm(false);
                setNotes('');
              }}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
