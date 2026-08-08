'use client';

import { useState, useEffect, useRef } from 'react';
import {
  getActiveQuestions,
  validateLeadData,
  generateWhatsAppMessage,
  ChatbotLeadData,
} from '@/lib/chatbot-flow';

const INITIAL_LEAD_DATA: ChatbotLeadData = {
  name: '',
  email: '',
  telephone: '',
  postcode: '',
  service: '',
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  squareFootage: '',
  frequency: '',
  preferredDate: '',
  additionalNotes: '',
  privacyConsent: false,
  marketingConsent: false,
};

interface ChatMessage {
  id: string;
  type: 'question' | 'answer' | 'error' | 'success';
  text: string;
  timestamp: number;
}

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadData, setLeadData] = useState<Partial<ChatbotLeadData>>(
    INITIAL_LEAD_DATA
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [isCheckboxQuestion, setIsCheckboxQuestion] = useState(false);

  const activeQuestions = getActiveQuestions(leadData);
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex + 1) / activeQuestions.length) * 100);

  // Scroll to bottom of messages
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
      const greeting = activeQuestions[0];
      if (greeting) {
        setMessages([
          {
            id: greeting.id,
            type: 'question',
            text: greeting.text,
            timestamp: Date.now(),
          },
        ]);
        setIsLoading(false);
        setShowCheckbox(false);
        setIsCheckboxQuestion(false);
      }
    }
  }, [isOpen, messages.length, activeQuestions]);

  // Handle answer submission
  const handleSubmitAnswer = async (value: string | boolean) => {
    if (!currentQuestion) return;

    // Trim if string
    const finalValue = typeof value === 'string' ? value.trim() : (value ? 'yes' : 'no');

    // Validate
    if (currentQuestion.required && !finalValue) {
      setError(currentQuestion.errorMessage || 'This field is required');
      return;
    }

    if (currentQuestion.validation && finalValue && !currentQuestion.validation(finalValue)) {
      setError(currentQuestion.errorMessage || 'Invalid input');
      return;
    }

    setError(null);

    // Add answer to messages
    const answerMessage: ChatMessage = {
      id: `answer-${Date.now()}`,
      type: 'answer',
      text: finalValue.toString(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, answerMessage]);

    // Update lead data
    const updatedData = {
      ...leadData,
      [currentQuestion.id]:
        currentQuestion.type === 'text' && (currentQuestion.id === 'privacyConsent' || currentQuestion.id === 'marketingConsent')
          ? value
          : finalValue,
    };
    setLeadData(updatedData);

    // Reset input
    setInputValue('');
    setShowCheckbox(false);

    // Move to next question or submit
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setIsLoading(true);

      // Simulate typing indicator
      setTimeout(() => {
        const nextQuestion = activeQuestions[nextIndex];
        if (nextQuestion) {
          setMessages((prev) => [
            ...prev,
            {
              id: nextQuestion.id,
              type: 'question',
              text: nextQuestion.text,
              timestamp: Date.now(),
            },
          ]);
          setIsLoading(false);
          setShowCheckbox(
            nextQuestion.id === 'privacyConsent' || nextQuestion.id === 'marketingConsent'
          );
          setIsCheckboxQuestion(
            nextQuestion.id === 'privacyConsent' || nextQuestion.id === 'marketingConsent'
          );
        }
      }, 500);
    } else {
      // All questions answered - submit lead
      await submitLead(updatedData as ChatbotLeadData);
    }
  };

  // Submit lead to API
  const submitLead = async (data: ChatbotLeadData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate
      const validation = validateLeadData(data);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        setIsSubmitting(false);
        return;
      }

      // Submit to API
      const response = await fetch('/api/chatbot/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit lead');
      }

      // Show success message
      setMessages((prev) => [
        ...prev,
        {
          id: 'success',
          type: 'success',
          text: `Great! We've received your inquiry. Our team will contact you shortly at ${data.telephone}.`,
          timestamp: Date.now(),
        },
      ]);

      // Offer WhatsApp option
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'whatsapp-offer',
            type: 'question',
            text: 'Would you like to continue the conversation on WhatsApp? We usually respond faster there.',
            timestamp: Date.now(),
          },
        ]);
        setShowCheckbox(false);
        setIsCheckboxQuestion(false);
        setIsSubmitting(false);
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: 'error',
          type: 'error',
          text: errorMessage,
          timestamp: Date.now(),
        },
      ]);
      setIsSubmitting(false);
    }
  };

  // Handle WhatsApp handoff
  const handleWhatsAppClick = (data: ChatbotLeadData) => {
    const message = generateWhatsAppMessage(data);
    const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '447700123456';
    const waLink = `https://wa.me/${whatsappPhone}?text=${message}`;
    window.open(waLink, '_blank');

    // Track event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_handoff_clicked');
    }
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setMessages([]);
    setLeadData(INITIAL_LEAD_DATA);
    setInputValue('');
    setError(null);
    setShowCheckbox(false);
    setIsCheckboxQuestion(false);
  };

  // Determine if we're past the questions (showing success/WhatsApp offer)
  const isPastQuestions = currentQuestionIndex >= activeQuestions.length;

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
              <p className="text-sm text-blue-100">Chat with us</p>
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

          {/* Progress Bar */}
          {!isPastQuestions && (
            <div className="w-full h-1 bg-grey-200">
              <div
                className="h-full bg-brand-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
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
                      msg.type === 'answer' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-lg ${
                        msg.type === 'question'
                          ? 'bg-white text-brand-navy rounded-bl-none shadow-sm'
                          : msg.type === 'answer'
                          ? 'bg-brand-navy text-white rounded-br-none'
                          : msg.type === 'success'
                          ? 'bg-status-success/10 text-status-success border border-status-success/20'
                          : 'bg-status-error/10 text-status-error border border-status-error/20'
                      } text-sm leading-relaxed`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-brand-navy px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-grey-600 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-grey-600 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-grey-600 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-grey-200 p-4 bg-white rounded-b-2xl">
            {error && (
              <p className="text-sm text-status-error mb-3 px-2">
                {error}
              </p>
            )}

            {isPastQuestions ? (
              // WhatsApp CTA Section
              <div className="space-y-3">
                <button
                  onClick={() => handleWhatsAppClick(leadData as ChatbotLeadData)}
                  className="w-full bg-status-success hover:bg-opacity-90 active:scale-95 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.923 1.379c-.589.328-1.142.774-1.612 1.318l-.992-1.247a1.125 1.125 0 10-1.592 1.59l1.003 1.254a9.926 9.926 0 00-1.323 4.632v.001c0 5.473 4.447 9.92 9.92 9.92 5.473 0 9.92-4.447 9.92-9.92 0-5.473-4.447-9.92-9.92-9.92zm0-2c6.638 0 12 5.362 12 12s-5.362 12-12 12S0 18.638 0 12 5.362 0 12 0z" />
                  </svg>
                  <span>Continue on WhatsApp</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full bg-grey-light hover:bg-grey-200 active:scale-95 text-brand-navy font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Start Over
                </button>
              </div>
            ) : currentQuestion ? (
              // Question Input
              <div className="space-y-3">
                {currentQuestion.type === 'select' ? (
                  <select
                    ref={inputRef as any}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="">Select an option...</option>
                    {currentQuestion.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : currentQuestion.type === 'textarea' ? (
                  <textarea
                    ref={inputRef as any}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                    rows={3}
                  />
                ) : currentQuestion.type === 'date' ? (
                  <input
                    ref={inputRef as any}
                    type="date"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                ) : (
                  <input
                    ref={inputRef as any}
                    type={currentQuestion.type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isLoading && !isSubmitting) {
                        handleSubmitAnswer(inputValue);
                      }
                    }}
                  />
                )}
                <button
                  onClick={() => handleSubmitAnswer(inputValue)}
                  disabled={isLoading || isSubmitting || (!showCheckbox && !inputValue.trim())}
                  className="w-full bg-brand-navy hover:bg-brand-midnight active:scale-95 disabled:bg-grey-300 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Continue'}
                </button>
              </div>
            ) : null}

            {isCheckboxQuestion && !isPastQuestions && (
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-grey-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={
                      currentQuestion?.id === 'privacyConsent'
                        ? (leadData.privacyConsent || false)
                        : (leadData.marketingConsent || false)
                    }
                    onChange={(e) => {
                      if (currentQuestion?.id === 'privacyConsent') {
                        setLeadData({
                          ...leadData,
                          privacyConsent: e.target.checked,
                        });
                      } else if (currentQuestion?.id === 'marketingConsent') {
                        setLeadData({
                          ...leadData,
                          marketingConsent: e.target.checked,
                        });
                      }
                    }}
                    className="w-4 h-4 accent-brand-navy rounded"
                  />
                  <span className="text-sm text-grey-700">
                    {currentQuestion?.text}
                  </span>
                </label>
                <button
                  onClick={() => handleSubmitAnswer(
                    currentQuestion?.id === 'privacyConsent'
                      ? leadData.privacyConsent || false
                      : leadData.marketingConsent || false
                  )}
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-brand-navy hover:bg-brand-midnight active:scale-95 disabled:bg-grey-300 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Continue'}
                </button>
              </div>
            )}

            {!isPastQuestions && (
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-sm text-grey-600 hover:text-grey-700 py-2 transition-colors"
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
