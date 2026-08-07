'use client';

import { useState } from 'react';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface GenerateQuoteModalProps {
  leadId: string;
  leadName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GenerateQuoteModal({
  leadId,
  leadName,
  isOpen,
  onClose,
  onSuccess,
}: GenerateQuoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'create' | 'review' | 'send' | 'success'>('create');
  const [error, setError] = useState('');
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  // Form state
  const [serviceType, setServiceType] = useState('residential_cleaning');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, unitPrice: 0 },
  ]);
  const [notes, setNotes] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(14);

  if (!isOpen) return null;

  const totalPrice = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleUpdateLineItem = (
    index: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    const updated = [...lineItems];
    if (field === 'quantity' || field === 'unitPrice') {
      updated[index]![field] = parseFloat(value as string) || 0;
    } else {
      updated[index]![field] = value as string;
    }
    setLineItems(updated);
  };

  const handleCreateQuote = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate line items
      if (lineItems.some((item) => !item.description || item.quantity <= 0 || item.unitPrice <= 0)) {
        setError('All line items must have description, quantity, and price');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          serviceType,
          lineItems,
          notes,
          expiresInDays,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create quote');
      }

      const data = await response.json();
      setQuoteId(data.quote.id);
      setQuoteNumber(data.quote.quote_number);
      setStep('review');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSendQuote = async () => {
    if (!quoteId) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/quotes/${quoteId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to send quote');
      }

      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Create quote with line items
  if (step === 'create') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-navy mb-6">Create Quote for {leadName}</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="residential_cleaning">Residential Cleaning</option>
                  <option value="office_cleaning">Office Cleaning</option>
                  <option value="end_of_tenancy">End of Tenancy</option>
                  <option value="carpet_cleaning">Carpet Cleaning</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid For (Days)</label>
                <select
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                </select>
              </div>
            </div>

            {/* Line items */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-navy mb-3">Line Items</h3>

              <div className="space-y-3">
                {lineItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleUpdateLineItem(idx, 'description', e.target.value)}
                      className="col-span-5 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      step="0.5"
                      value={item.quantity}
                      onChange={(e) => handleUpdateLineItem(idx, 'quantity', e.target.value)}
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateLineItem(idx, 'unitPrice', e.target.value)}
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <div className="col-span-2 text-right text-sm font-medium text-gray-600">
                      £{(item.quantity * item.unitPrice).toFixed(2)}
                    </div>
                    {lineItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveLineItem(idx)}
                        className="col-span-1 text-red-600 hover:text-red-800 text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddLineItem}
                className="mt-3 text-sm text-navy hover:underline"
              >
                + Add Line Item
              </button>
            </div>

            {/* Total */}
            <div className="bg-gray-50 p-4 rounded-lg text-right">
              <div className="text-2xl font-bold text-navy">
                £{totalPrice.toFixed(2)}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Internal Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or notes..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleCreateQuote}
              disabled={loading || totalPrice === 0}
              className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Quote'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Review
  if (step === 'review') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-navy mb-6">Review Quote {quoteNumber}</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-2">
              {lineItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.description}</span>
                  <span className="font-medium">
                    {item.quantity} × £{item.unitPrice.toFixed(2)} = £
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between text-base font-bold">
                <span>Total</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setStep('create')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              disabled={loading}
            >
              Back
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSendQuote}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Quote'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Success
  if (step === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-navy mb-2">Quote Sent!</h2>
          <p className="text-gray-600 mb-6">
            {quoteNumber} has been sent to the customer.
          </p>
          <p className="text-sm text-gray-500">Closing in 2 seconds...</p>
        </div>
      </div>
    );
  }

  return null;
}
