import { NextRequest, NextResponse } from 'next/server';
import { signInWithPassword, setSessionCookie, createAuditLog } from '@/lib/admin/auth';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = signInSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const { email, password } = validation.data;
    const result = await signInWithPassword(email, password);

    if (!result) {
      await createAuditLog('login_failed', { email });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    await setSessionCookie({
      id: result.user.id,
      email: result.user.email,
      role: 'admin',
    });

    await createAuditLog('login_success', { email });

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { 'Cache-Control': 'private, no-store' } }
    );
  } catch (error) {
    console.error('[SIGN_IN_ERROR]', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
}
