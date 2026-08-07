import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/admin/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify admin
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Parse request
    const body = await request.json();
    const {
      leadId,
      serviceType = 'standard_cleaning',
      lineItems = [],  // [{description, quantity, unitPrice}, ...]
      notes = '',
      expiresInDays = 14,
    } = body;

    // Get lead details
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Calculate totals from line items
    const totalPrice = lineItems.reduce((sum: number, item: any) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);

    // Generate quote number (NE-2026-XXXXX)
    const { data: lastQuote } = await supabase
      .from('quotes')
      .select('quote_number')
      .order('created_at', { ascending: false })
      .limit(1);

    let nextNumber = 1;
    if (lastQuote && lastQuote.length > 0) {
      const lastNumber = parseInt(lastQuote[0].quote_number.split('-')[2]);
      nextNumber = lastNumber + 1;
    }

    const quoteNumber = `NE-2026-${String(nextNumber).padStart(5, '0')}`;

    // Set expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    // Create quote record
    const { data: quote, error: createError } = await supabase
      .from('quotes')
      .insert({
        lead_id: leadId,
        quote_number: quoteNumber,
        service_type: serviceType,
        property_address: lead.postcode || '',
        final_quote_price: totalPrice,
        notes,
        expires_at: expiresAt.toISOString(),
        created_by: admin.id,
        status: 'draft',
        pricing_snapshot: { lineItems, totalPrice },
      })
      .select()
      .single();

    if (createError) {
      console.error('Quote creation error:', createError);
      return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
    }

    // Log to audit trail
    await supabase.from('audit_log').insert({
      action: 'quote_created',
      resource_type: 'quote',
      resource_id: quote.id,
      admin_id: admin.id,
      metadata: {
        quote_number: quoteNumber,
        lead_id: leadId,
        total_price: totalPrice,
        item_count: lineItems.length,
      },
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      quote,
      message: `Quote ${quoteNumber} created for £${totalPrice.toFixed(2)}`,
    });
  } catch (error) {
    console.error('Quote creation error:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
    }

    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const leadId = searchParams.get('leadId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase.from('quotes').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    if (leadId) {
      query = query.eq('lead_id', leadId);
    }

    const { data: quotes, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return NextResponse.json({
      success: true,
      data: quotes || [],
      count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Quote list error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}
