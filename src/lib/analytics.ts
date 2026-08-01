/**
 * Analytics and Event Tracking
 * Wrapper for Google Analytics 4
 */

import type { PageView, Event } from '@/types';

/**
 * Initialize Google Analytics
 */
export function initializeAnalytics(gaId?: string): void {
  if (!gaId) {
    console.warn('Google Analytics ID not provided');
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId);
}

/**
 * Track page view
 */
export function trackPageView(pageView: PageView): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', 'page_view', {
    page_path: pageView.url,
    page_referrer: pageView.referrer,
    session_id: pageView.sessionId,
  });
}

/**
 * Track custom event
 */
export function trackEvent(event: Event): void {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return;
  }

  (window as any).gtag('event', event.name, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean = true): void {
  trackEvent({
    name: 'form_submit',
    category: 'engagement',
    label: formName,
    value: success ? 1 : 0,
    timestamp: new Date(),
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent({
    name: 'cta_click',
    category: 'engagement',
    label: `${ctaName} - ${location}`,
    timestamp: new Date(),
  });
}

/**
 * Track service inquiry
 */
export function trackServiceInquiry(serviceName: string): void {
  trackEvent({
    name: 'service_inquiry',
    category: 'conversion',
    label: serviceName,
    timestamp: new Date(),
  });
}

/**
 * Track pricing view
 */
export function trackPricingView(): void {
  trackEvent({
    name: 'pricing_view',
    category: 'engagement',
    timestamp: new Date(),
  });
}

/**
 * Track error
 */
export function trackError(errorMessage: string, errorCode?: string): void {
  trackEvent({
    name: 'error_occurred',
    category: 'error',
    label: `${errorCode || 'unknown'}: ${errorMessage}`,
    timestamp: new Date(),
  });
}

/**
 * Create session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create session ID (stored in sessionStorage)
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const stored = sessionStorage.getItem('neatedge_session_id');
  if (stored) {
    return stored;
  }

  const newSessionId = generateSessionId();
  sessionStorage.setItem('neatedge_session_id', newSessionId);
  return newSessionId;
}

/**
 * Track performance metrics
 */
export function trackPerformanceMetrics(): void {
  if (typeof window === 'undefined' || !window.performance) {
    return;
  }

  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  trackEvent({
    name: 'performance_metrics',
    category: 'performance',
    label: `Load: ${pageLoadTime}ms, Connect: ${connectTime}ms, Render: ${renderTime}ms`,
    value: pageLoadTime,
    timestamp: new Date(),
  });
}

/**
 * Local event logging (for development/debugging)
 */
export class LocalEventLog {
  private events: Event[] = [];
  private maxEvents: number;

  constructor(maxEvents: number = 100) {
    this.maxEvents = maxEvents;
  }

  log(event: Event): void {
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  getEvents(): Event[] {
    return [...this.events];
  }

  clear(): void {
    this.events = [];
  }

  export(): string {
    return JSON.stringify(this.events, null, 2);
  }
}

export const localEventLog = new LocalEventLog();
