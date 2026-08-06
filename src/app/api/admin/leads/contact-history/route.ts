import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const body = await request.json();
    const { leadId, contactMethod, notes } = body;

    if (!leadId || !contactMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Record contact in history
    const { data: historyRecord, error: historyError } = await supabase
      .from('contact_history')
      .insert({
        lead_id: leadId,
        admin_id: admin.id,
        contact_method: contactMethod,
        notes: notes || null,
      })
      .select()
      .single();

    if (historyError) throw historyError;

    // Update lead's last_contacted_at
    const { error: leadError } = await supabase
      .from('leads')
      .update({
        last_contacted_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    if (leadError) throw leadError;

    // Update status to 'contacted' if it's still 'new'
    const { data: lead } = await supabase
      .from('leads')
      .select('status')
      .eq('id', leadId)
      .single();

    if (lead?.status === 'new') {
      await supabase
        .from('leads')
        .update({ status: 'contacted' })
        .eq('id', leadId);
    }

    // Log to audit trail
    await supabase.from('audit_log').insert({
      admin_id: admin.id,
      action: 'record_contact',
      resource_type: 'lead',
      resource_id: leadId,
      metadata: {
        contact_method: contactMethod,
      },
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      data: historyRecord,
    });
  } catch (error) {
    console.error('Error recording contact:', error);
    return NextResponse.json(
      { error: 'Failed to record contact' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { error: 'Missing leadId parameter' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contact_history')
      .select(
        `
        id,
        contact_method,
        notes,
        created_at,
        admin_id,
        admin_profiles:admin_profiles(display_name)
      `
      )
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching contact history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact history' },
      { status: 500 }
    );
  }
}
