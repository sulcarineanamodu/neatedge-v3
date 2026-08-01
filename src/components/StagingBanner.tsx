'use client';

import React from 'react';
import { isPreview } from '@/lib/environment';

/**
 * StagingBanner
 * Visible banner shown only in preview/staging environments
 * Indicates that this is not production and won't be indexed
 */
export default function StagingBanner() {
  // Only show in preview environment
  if (!isPreview()) {
    return null;
  }

  return (
    <div className="w-full bg-yellow-50 border-b-4 border-yellow-400 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
            <svg
              className="h-5 w-5 text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-800">
            Staging Environment
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            This is a preview deployment. Not indexed by search engines.
          </p>
        </div>
      </div>
    </div>
  );
}
