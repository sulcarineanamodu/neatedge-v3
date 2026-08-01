/**
 * Security Utilities
 * CSRF protection, headers, and validation
 */

import crypto from 'crypto';
import type { CSRFToken } from '@/types';

// In-memory token store (replace with database in production)
const tokenStore = new Map<string, CSRFToken>();

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): CSRFToken {
  const token = crypto.randomBytes(32).toString('hex');
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 1000 * 60 * 60); // 1 hour expiry

  const csrfToken: CSRFToken = {
    token,
    createdAt,
    expiresAt,
  };

  // Store token
  tokenStore.set(token, csrfToken);

  return csrfToken;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  const stored = tokenStore.get(token);

  if (!stored) {
    return false;
  }

  // Check expiration
  if (new Date() > stored.expiresAt) {
    tokenStore.delete(token);
    return false;
  }

  // Token is valid, remove it (one-time use)
  tokenStore.delete(token);

  return true;
}

/**
 * Clean up expired tokens (should be called periodically)
 */
export function cleanupExpiredTokens(): number {
  let removed = 0;
  const now = new Date();

  for (const [token, csrfToken] of tokenStore.entries()) {
    if (now > csrfToken.expiresAt) {
      tokenStore.delete(token);
      removed++;
    }
  }

  return removed;
}

/**
 * Security headers for Next.js
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
} as const;

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format (UK)
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+44\s?|0)(?:\d\s?){9,10})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitize input to prevent XSS (basic version)
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * Hash password (basic version — use bcrypt in production)
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Generate a secure random string
 */
export function generateSecureString(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Rate limiting helper (simple version)
 */
export class RateLimiter {
  private attempts = new Map<string, number[]>();
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 5, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter((time) => now - time < this.windowMs);

    if (recentAttempts.length >= this.limit) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);

    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

/**
 * Validate request origin for CORS
 */
export function isValidOrigin(origin: string, allowedOrigins: string[]): boolean {
  return allowedOrigins.includes(origin);
}

/**
 * Check if URL is safe (no javascript:, data:, etc.)
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const protocol = parsed.protocol;

    // Only allow http and https
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}
