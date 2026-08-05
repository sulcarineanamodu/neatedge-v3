import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createAuditLog } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const APPROVED_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'quote_sent',
  'converted',
  'lost',
  'archived',
];

const updateStatusSchema = z.object({
  status: z.enum(APPROVED_STATUSES as [string, ...string[]]),
  notes: z.string().optional(),
});

async function recordLeadActivity(
  leadId: string,
  action: string,
  previousValue: any,
  newValue: any
) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase credentials');
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const admin = await requireAdmin();

  return supabase
    .from('lead_activity')
    .insert({
      lead_id: leadId,
      action,
      admin_id: admin.id,
      previous_value: previousValue,
      new_value: newValue,
    });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const validation = updateStatusSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const { status: newStatus, notes } = validation.data;
    const { id: leadId } = await params;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { error: 'Server error' },
        { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: currentLead, error: fetchError } = await supabase
      .from('leads')
      .select('id, status')
      .eq('id', leadId)
      .single();

    if (fetchError || !currentLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const previousStatus = currentLead.status;

    const { error: updateError } = await supabase
      .from('leads')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update status' },
        { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    await recordLeadActivity(
      leadId,
      'status_changed',
      { status: previousStatus },
      { status: newStatus, notes }
    );

    await createAuditLog('status_updated', {
      resourceType: 'lead',
      resourceId: leadId,
      status: 'success',
      metadata: {
        previousStatus,
        newStatus,
        notes,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Status updated',
        previousStatus,
        newStatus,
      },
      { status: 200, headers: { 'Cache-Control': 'private, no-store' } }
    );

  } catch (error) {
    console.error('[STATUS_UPDATE_ERROR]', error);

    await createAuditLog('status_updated', {
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    }).catch(() => {});

    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
}
