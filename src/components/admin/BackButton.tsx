'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-navy hover:text-blue-700 font-medium text-sm"
    >
      ← Back
    </button>
  );
}
