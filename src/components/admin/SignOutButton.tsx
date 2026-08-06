'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await fetch('/api/admin/auth/sign-out', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
