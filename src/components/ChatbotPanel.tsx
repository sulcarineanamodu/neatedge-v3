'use client';

import { useState, useEffect, useRef } from 'react';
import {
  validateField,
  validateLeadData,
  generateWhatsAppMessage,
  ChatbotLeadData,
  SERVICES,
  BEDROOMS_OPTIONS,
  BATHROOMS_OPTIONS,
  CARPET_ROOMS_OPTIONS,
  COMMERCIAL_TYPES,
  LANDLORD_SERVICES,
  TIMING_OPTIONS,
} from '@/lib/chatbot-flow';

const INITIAL_LEAD_DATA: ChatbotLeadData = {
  service: '',
  postcode: '',
  bedrooms: '',
  bathrooms: '',
  carpetRooms: '',
  commercialType: '',
  commercialFrequency: '',
  landlordServiceType: '',
  timing: '',
  preferredDate: '',
  additionalNotes: '',
};

type StepType = 'service' | 'postcode' | 'property-details' | 'timing' | 'summary';

interface ChatMessage {
  id: string;
  type: 'message' | 'error';
  text: string;
  timestamp: number;
}

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>('service');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadData, setLeadData] = useState<Partial<ChatbotLeadData>>(INITIAL_LEAD_DATA);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const steps: StepType[] = ['service', 'postcode', 'property-details', 'timing', 'summary'];
  const stepIndex = steps.indexOf(currentStep);

  // Scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chatbot
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'service-question',
          type: 'message',
          text: 'Hi 👋 What can Neatedge help you with?',
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isOpen, messages.length]);


  // Validate and save service selection
  const handleServiceSelect = (serviceValue: string) => {
    setLeadData((prev) => ({
      ...prev,
      service: serviceValue as any,
    }));

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'message',
        text: SERVICES.find((s) => s.value === serviceValue)?.label || serviceValue,
        timestamp: Date.now(),
      },
    ]);

    // Move to next step
    setTimeout(() => {
      setCurrentStep('postcode');
      setMessages((prev) => [
        ...prev,
        {
          id: 'postcode-question',
          type: 'message',
          text: "What's the postcode for the property?",
          timestamp: Date.now(),
        },
      ]);
    }, 300);
  };

  // Validate and save postcode
  const handlePostcodeSubmit = () => {
    const trimmed = inputValue.trim().toUpperCase();

    if (!trimmed) {
      setError('Please enter a postcode');
      return;
    }

    if (!validateField('postcode', trimmed)) {
      setError('Please enter a valid UK postcode (e.g., SW1A 1AA)');
      return;
    }

    setLeadData((prev) => ({
      ...prev,
      postcode: trimmed,
    }));

    setError(null);

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'message',
        text: trimmed,
        timestamp: Date.now(),
      },
    ]);

    // Move to property details
    setTimeout(() => {
      setCurrentStep('property-details');
      setInputValue('');
    }, 300);
  };

  // Handle property details step
  const handlePropertyDetailsSubmit = () => {
    const { service } = leadData;

    if (!service) {
      setError('Service type is required');
      return;
    }

    if (
      service === 'residential-cleaning' ||
      service === 'deep-cleaning' ||
      service === 'end-of-tenancy'
    ) {
      if (!inputValue) {
        setError('Please select bedroom and bathroom counts');
        return;
      }

      const [beds, baths] = inputValue.split('|');
      setLeadData((prev) => ({
        ...prev,
        bedrooms: beds,
        bathrooms: baths,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `answer-${Date.now()}`,
          type: 'message',
          text: `${beds} bedrooms, ${baths} bathrooms`,
          timestamp: Date.now(),
        },
      ]);
    } else if (service === 'carpet-cleaning') {
      if (!inputValue) {
        setError('Please select number of rooms');
        return;
      }

      setLeadData((prev) => ({
        ...prev,
        carpetRooms: inputValue,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `answer-${Date.now()}`,
          type: 'message',
          text: `${inputValue} room(s)`,
          timestamp: Date.now(),
        },
      ]);
    } else if (service === 'commercial') {
      if (!inputValue) {
        setError('Please select a premise type');
        return;
      }

      setLeadData((prev) => ({
        ...prev,
        commercialType: inputValue as any,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `answer-${Date.now()}`,
          type: 'message',
          text: COMMERCIAL_TYPES.find((t) => t.value === inputValue)?.label || inputValue,
          timestamp: Date.now(),
        },
      ]);
    } else if (service === 'property-landlord') {
      if (!inputValue) {
        setError('Please select a service type');
        return;
      }

      setLeadData((prev) => ({
        ...prev,
        landlordServiceType: inputValue,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `answer-${Date.now()}`,
          type: 'message',
          text: LANDLORD_SERVICES.find((s) => s.value === inputValue)?.label || inputValue,
          timestamp: Date.now(),
        },
      ]);
    }

    setError(null);
    setInputValue('');

    // Move to timing
    setTimeout(() => {
      setCurrentStep('timing');
    }, 300);
  };

  // Handle timing selection
  const handleTimingSelect = (timingValue: string) => {
    setLeadData((prev) => ({
      ...prev,
      timing: timingValue as any,
    }));

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${Date.now()}`,
        type: 'message',
        text: TIMING_OPTIONS.find((t) => t.value === timingValue)?.label || timingValue,
        timestamp: Date.now(),
      },
    ]);

    // Move to summary
    setTimeout(() => {
      setCurrentStep('summary');
      setInputValue('');
    }, 300);
  };

  // Submit lead to CRM (called before WhatsApp handoff)
  const submitLeadToCRM = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const validation = validateLeadData(leadData as ChatbotLeadData);
      if (!validation.valid) {
        setError(validation.errors[0] || null);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/chatbot/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit lead');
      }

      setIsSubmitting(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage || null);
      setIsSubmitting(false);
      console.error('Lead submission error:', err);
    }
  };

  // Handle WhatsApp handoff
  const handleWhatsAppClick = async (data: Partial<ChatbotLeadData>) => {
    // Save to CRM first
    await submitLeadToCRM();

    const message = generateWhatsAppMessage(data as ChatbotLeadData);
    const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '447700123456';
    const waLink = `https://wa.me/${whatsappPhone}?text=${message}`;
    window.open(waLink, '_blank');

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_handoff_clicked');
    }
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentStep('service');
    setMessages([
      {
        id: 'service-question',
        type: 'message',
        text: 'Hi 👋 What can Neatedge help you with?',
        timestamp: Date.now(),
      },
    ]);
    setLeadData(INITIAL_LEAD_DATA);
    setInputValue('');
    setError(null);
  };

  const renderPropertyDetailsQuestion = () => {
    const { service } = leadData;

    if (
      service === 'residential-cleaning' ||
      service === 'deep-cleaning' ||
      service === 'end-of-tenancy'
    ) {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-grey-700 mb-2">Bedrooms</label>
            <select
              value={inputValue.split('|')[0] || ''}
              onChange={(e) => {
                const beds = e.target.value;
                const baths = inputValue.split('|')[1] || '';
                setInputValue(`${beds}|${baths}`);
              }}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
            >
              <option value="">Select...</option>
              {BEDROOMS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-grey-700 mb-2">Bathrooms</label>
            <select
              value={inputValue.split('|')[1] || ''}
              onChange={(e) => {
                const beds = inputValue.split('|')[0] || '';
                const baths = e.target.value;
                setInputValue(`${beds}|${baths}`);
              }}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
            >
              <option value="">Select...</option>
              {BATHROOMS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    if (service === 'carpet-cleaning') {
      return (
        <select
          ref={inputRef as any}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
        >
          <option value="">How many rooms need carpet cleaning?</option>
          {CARPET_ROOMS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (service === 'commercial') {
      return (
        <select
          ref={inputRef as any}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
        >
          <option value="">What type of premises?</option>
          {COMMERCIAL_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (service === 'property-landlord') {
      return (
        <select
          ref={inputRef as any}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
        >
          <option value="">Select service type</option>
          {LANDLORD_SERVICES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return null;
  };

  const getSummaryText = () => {
    const lines: string[] = [];
    const serviceLabel = SERVICES.find((s) => s.value === leadData.service)?.label;
    if (serviceLabel) lines.push(`Service: ${serviceLabel}`);
    if (leadData.postcode) lines.push(`Postcode: ${leadData.postcode}`);

    if (
      leadData.service === 'residential-cleaning' ||
      leadData.service === 'deep-cleaning' ||
      leadData.service === 'end-of-tenancy'
    ) {
      if (leadData.bedrooms || leadData.bathrooms) {
        lines.push(`Property: ${leadData.bedrooms} bedrooms, ${leadData.bathrooms} bathrooms`);
      }
    } else if (leadData.service === 'carpet-cleaning' && leadData.carpetRooms) {
      lines.push(`Carpet rooms: ${leadData.carpetRooms}`);
    } else if (leadData.service === 'commercial' && leadData.commercialType) {
      lines.push(`Premises: ${leadData.commercialType}`);
    } else if (leadData.service === 'property-landlord' && leadData.landlordServiceType) {
      lines.push(`Service: ${leadData.landlordServiceType}`);
    }

    const timingLabel = TIMING_OPTIONS.find((t) => t.value === leadData.timing)?.label;
    if (timingLabel) lines.push(`When: ${timingLabel}`);

    return lines.join(' · ');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 bg-brand-navy text-white rounded-full shadow-lg hover:bg-brand-midnight active:scale-95 transition-all duration-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] md:max-h-[600px] border border-grey-200">
          {/* Header */}
          <div className="bg-brand-navy text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Neatedge Cleaning</h2>
              <p className="text-xs text-blue-100">About 30 seconds</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Close chat"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          {currentStep !== 'summary' && (
            <div className="px-6 py-3 text-xs text-grey-600 flex items-center space-x-2">
              {steps.map((step, idx) => (
                <span
                  key={step}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    idx < stepIndex ? 'bg-brand-gold' : idx === stepIndex ? 'bg-brand-navy' : 'bg-grey-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-grey-50">
            {messages.length === 0 ? (
              <div className="text-center text-grey-600 py-8">
                <p className="text-sm">Loading...</p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === 'error' ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        msg.type === 'error'
                          ? 'bg-status-error/10 text-status-error border border-status-error/20'
                          : 'bg-white text-brand-navy rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-grey-200 p-4 bg-white rounded-b-2xl">
            {error && (
              <p className="text-xs text-status-error mb-3 px-2">{error}</p>
            )}

            {currentStep === 'service' && (
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => handleServiceSelect(service.value)}
                    className="px-3 py-2 text-xs border border-grey-300 rounded-lg hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors text-center"
                  >
                    {service.label}
                  </button>
                ))}
                <button
                  className="px-3 py-2 text-xs border border-grey-300 rounded-lg hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors text-center"
                  onClick={() => handleServiceSelect('something-else')}
                >
                  Other
                </button>
              </div>
            )}

            {currentStep === 'postcode' && (
              <div className="space-y-3">
                <input
                  ref={inputRef as any}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                  placeholder="UB7 8EY"
                  className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handlePostcodeSubmit();
                  }}
                />
                <button
                  onClick={handlePostcodeSubmit}
                  disabled={!inputValue.trim()}
                  className="w-full bg-brand-navy hover:bg-brand-midnight active:scale-95 disabled:bg-grey-300 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 'property-details' && (
              <div className="space-y-3">
                {renderPropertyDetailsQuestion()}
                <button
                  onClick={handlePropertyDetailsSubmit}
                  disabled={!inputValue.trim()}
                  className="w-full bg-brand-navy hover:bg-brand-midnight active:scale-95 disabled:bg-grey-300 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 'timing' && (
              <div className="grid grid-cols-2 gap-2">
                {TIMING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleTimingSelect(opt.value)}
                    className="px-3 py-2 text-xs border border-grey-300 rounded-lg hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors text-center"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 'summary' && (
              <div className="space-y-4">
                <div className="bg-grey-50 rounded-lg p-4 border border-grey-200">
                  <p className="text-xs font-semibold text-grey-700 mb-2">Your enquiry</p>
                  <p className="text-sm text-grey-900">{getSummaryText()}</p>
                  {leadData.additionalNotes && (
                    <p className="text-xs text-grey-600 mt-2">Notes: {leadData.additionalNotes}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleWhatsAppClick(leadData)}
                    disabled={isSubmitting}
                    className="w-full bg-status-success hover:bg-opacity-90 active:scale-95 disabled:bg-grey-300 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.923 1.379c-.589.328-1.142.774-1.612 1.318l-.992-1.247a1.125 1.125 0 10-1.592 1.59l1.003 1.254a9.926 9.926 0 00-1.323 4.632v.001c0 5.473 4.447 9.92 9.92 9.92 5.473 0 9.92-4.447 9.92-9.92 0-5.473-4.447-9.92-9.92-9.92zm0-2c6.638 0 12 5.362 12 12s-5.362 12-12 12S0 18.638 0 12 5.362 0 12 0z" />
                    </svg>
                    <span>Continue on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="w-full bg-grey-light hover:bg-grey-200 active:scale-95 text-brand-navy font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                  >
                    Start Over
                  </button>
                </div>

                <p className="text-xs text-centre text-grey-600 px-2 py-2">
                  By continuing, you agree that Neatedge may use the details above to respond to
                  your enquiry.{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-navy hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}

            {currentStep !== 'summary' && (
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-xs text-grey-600 hover:text-grey-700 py-2 transition-colors"
              >
                Close for now
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
