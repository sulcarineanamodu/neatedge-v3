import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase credentials' },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check if summary already sent today to prevent duplicates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data: existingSummary } = await supabase
      .from('audit_log')
      .select('id')
      .eq('action', 'daily_summary_sent')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())
      .limit(1);

    if (existingSummary && existingSummary.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Daily summary already sent today' },
        { status: 200 }
      );
    }

    // Get overdue leads
    const { data: overdueLeads } = await supabase
      .from('leads')
      .select('id, name, email, follow_up_at')
      .lt('follow_up_at', new Date().toISOString())
      .neq('status', 'converted')
      .neq('status', 'archived');

    // Get leads due today
    const { data: dueToday } = await supabase
      .from('leads')
      .select('id, name, email, follow_up_at')
      .gte('follow_up_at', today.toISOString())
      .lt('follow_up_at', tomorrow.toISOString())
      .neq('status', 'converted')
      .neq('status', 'archived');

    // Get unassigned new leads
    const { data: unassignedLeads } = await supabase
      .from('leads')
      .select('id, name, email, created_at')
      .is('assigned_to', null)
      .eq('status', 'new');

    // Build summary
    const summary = {
      timestamp: new Date().toISOString(),
      overdue_count: overdueLeads?.length || 0,
      due_today_count: dueToday?.length || 0,
      unassigned_count: unassignedLeads?.length || 0,
      overdue_leads: overdueLeads || [],
      due_today_leads: dueToday || [],
      unassigned_leads: unassignedLeads || [],
    };

    // Log to audit trail (prevents duplicate sends)
    await supabase.from('audit_log').insert({
      action: 'daily_summary_sent',
      resource_type: 'system',
      metadata: summary,
      status: 'success',
    });

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error('Daily summary error:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily summary' },
      { status: 500 }
    );
  }
}
