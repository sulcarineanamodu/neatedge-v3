import { NextResponse } from 'next/server';
import { clearSessionCookie, createAuditLog, getSession } from '@/lib/admin/auth';

export async function POST() {
  try {
    const session = await getSession();
    await clearSessionCookie();
    await createAuditLog('logout', { email: session?.email });

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { 'Cache-Control': 'private, no-store' } }
    );
  } catch (error) {
    console.error('[SIGN_OUT_ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
}
