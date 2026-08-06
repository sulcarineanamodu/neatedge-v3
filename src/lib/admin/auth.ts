import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export interface AdminSession {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value) as AdminSession;
    return session;
  } catch {
    return null;
  }
}

export async function verifyAdmin(): Promise<AdminSession | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('[AUTH] Missing Supabase credentials');
    return null;
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: adminProfile, error } = await supabase
    .from('admin_profiles')
    .select('id, user_id, role, status')
    .eq('user_id', session.id)
    .eq('status', 'active')
    .single();

  if (error || !adminProfile || adminProfile.role !== 'admin') {
    console.warn(`[AUTH] Admin verification failed for user ${session.id}`);
    return null;
  }

  return session;
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<{ user: any; session: any } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error('[AUTH] Missing Supabase public credentials');
    return null;
  }

  const supabase = createClient(url, anonKey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    console.warn(`[AUTH] Sign-in failed for ${email}`);
    return null;
  }

  return data;
}

export async function setSessionCookie(session: AdminSession): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'admin_session',
    value: JSON.stringify(session),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function createAuditLog(
  action: string,
  metadata?: Record<string, any>,
): Promise<void> {
  const session = await getSession();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('[AUDIT] Missing Supabase credentials');
    return;
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await supabase.from('audit_log').insert({
    admin_id: session?.id || null,
    action,
    metadata: metadata || {},
  });
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await verifyAdmin();

  if (!session) {
    throw new Error('Unauthorized: Admin access required');
  }

  return session;
}
