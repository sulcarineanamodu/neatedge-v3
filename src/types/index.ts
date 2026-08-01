/**
 * Type definitions for Neatedge Web Application
 * Package 1: Technical Foundation
 */

// Feature flags (all default false, must be explicitly enabled)
export interface FeatureFlags {
  gardenServicesEnabled: boolean;
  publicPricingEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  testimonialsEnabled: boolean;
  instantEstimateEnabled: boolean;
  aiReceptionistEnabled: boolean;
  publicAddressEnabled: boolean;
  dbsClaimsEnabled: boolean;
}

// Content verification status
export enum ContentStatus {
  VERIFIED = 'VERIFIED',
  OWNER_APPROVED = 'OWNER_APPROVED',
  DO_NOT_PUBLISH = 'DO_NOT_PUBLISH',
  STAGING_ONLY = 'STAGING_ONLY',
  PLACEHOLDER = 'PLACEHOLDER',
  EVIDENCE_REQUIRED = 'EVIDENCE_REQUIRED',
  OWNER_CONFIRMATION_REQUIRED = 'OWNER_CONFIRMATION_REQUIRED',
}

// Generic content item with verification
export interface VerifiedContent<T = unknown> {
  data: T;
  status: ContentStatus;
  verifiedAt?: Date;
  verifiedBy?: string;
  note?: string;
}

// Service offering
export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'cleaning' | 'garden' | 'other';
  basePrice?: number;
  isPublished: boolean;
  verification: ContentStatus;
}

// Pricing information (feature-gated)
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPublished: boolean;
  verification: ContentStatus;
}

// Contact information
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday?: string;
    sunday?: string;
  };
  verification: ContentStatus;
}

// Form validation error
export interface ValidationError {
  field: string;
  message: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: ValidationError[];
}

// CSRF token
export interface CSRFToken {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Request context with security
export interface RequestContext {
  csrfToken?: string;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
}

// Metadata for pages
export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
}

// Component props helpers
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export type CardVariant = 'default' | 'elevated' | 'outlined';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}

// Analytics
export interface PageView {
  url: string;
  referrer?: string;
  timestamp: Date;
  sessionId?: string;
}

export interface Event {
  name: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

// Error handling
export interface AppError extends Error {
  code: string;
  statusCode: number;
  context?: Record<string, unknown>;
}
