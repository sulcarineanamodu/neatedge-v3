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
    const { leadId, followUpAt, assignedTo, notes } = body;

    if (!leadId || !followUpAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update lead with follow-up date and assignment
    const { error: leadError } = await supabase
      .from('leads')
      .update({
        follow_up_at: followUpAt,
        assigned_to: assignedTo,
        last_contacted_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    if (leadError) throw leadError;

    // Create or update follow-up reminder
    const { error: reminderError } = await supabase
      .from('follow_up_reminders')
      .upsert({
        lead_id: leadId,
        follow_up_at: followUpAt,
        assigned_to: assignedTo,
      })
      .eq('lead_id', leadId);

    if (reminderError) throw reminderError;

    // Record in contact history if notes provided
    if (notes) {
      const { error: historyError } = await supabase
        .from('contact_history')
        .insert({
          lead_id: leadId,
          admin_id: user.id,
          contact_method: 'note',
          notes,
        });

      if (historyError) throw historyError;
    }

    // Log to audit trail
    await supabase.from('audit_log').insert({
      admin_id: admin.id,
      action: 'schedule_follow_up',
      resource_type: 'lead',
      resource_id: leadId,
      metadata: {
        follow_up_at: followUpAt,
        assigned_to: assignedTo,
      },
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      message: 'Follow-up scheduled',
    });
  } catch (error) {
    console.error('Error scheduling follow-up:', error);
    return NextResponse.json(
      { error: 'Failed to schedule follow-up' },
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
    const view = searchParams.get('view') || 'all';

    let query = supabase
      .from('leads')
      .select('id, name, email, telephone, status, assigned_to, follow_up_at, created_at, last_contacted_at')
      .neq('status', 'converted')
      .neq('status', 'archived');

    switch (view) {
      case 'overdue':
        query = query
          .not('follow_up_at', 'is', null)
          .lt('follow_up_at', new Date().toISOString());
        break;
      case 'due-today':
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        query = query
          .gte('follow_up_at', today.toISOString())
          .lt('follow_up_at', tomorrow.toISOString());
        break;
      case 'unassigned':
        query = query.is('assigned_to', null).eq('status', 'new');
        break;
      case 'no-follow-up':
        query = query.is('follow_up_at', null);
        break;
    }

    const { data, error } = await query.order('follow_up_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
