import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '@/lib/admin/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { email } = body;

    // Get quote
    const { data: quote } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Get lead
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', quote.lead_id)
      .single();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Build email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; }
      .header { background-color: #1a7a4a; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; max-width: 600px; margin: 0 auto; }
      .section { margin: 20px 0; }
      .price { font-size: 28px; font-weight: bold; color: #1a7a4a; margin: 10px 0; }
      .table { width: 100%; border-collapse: collapse; margin: 10px 0; }
      .table th, .table td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
      .table th { background-color: #f3f4f6; font-weight: 600; }
      .total { background-color: #f3f4f6; font-weight: 600; font-size: 16px; }
      .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Neatedge Cleaning</h1>
      <p>Professional Cleaning Services</p>
    </div>

    <div class="content">
      <p>Dear ${lead.name},</p>

      <p>Thank you for your enquiry. We're pleased to provide the following quotation for your cleaning service:</p>

      <div class="section">
        <h3>Quote ${quote.quote_number}</h3>
        <p><strong>Valid until:</strong> ${new Date(quote.expires_at).toLocaleDateString('en-GB')}</p>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Quantity</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${JSON.parse(quote.pricing_snapshot).lineItems.map((item: any) => `
          <tr>
            <td>${item.description}</td>
            <td style="text-align: right;">${item.quantity}</td>
            <td style="text-align: right;">£${parseFloat(item.unitPrice).toFixed(2)}</td>
            <td style="text-align: right;">£${(item.quantity * item.unitPrice).toFixed(2)}</td>
          </tr>
          `).join('')}
          <tr class="total">
            <td colspan="3" style="text-align: right;">TOTAL:</td>
            <td style="text-align: right;">£${quote.final_quote_price.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="section">
        <p>If you're happy with this quote, please reply to confirm and we'll get started.</p>
        <p>If you have any questions or would like to discuss any aspect of this quote, please don't hesitate to get in touch.</p>
      </div>

      <div class="footer">
        <p><strong>Neatedge Cleaning Ltd</strong></p>
        <p>neatedgecleaning.co.uk | info@neatedgecleaning.com | 07886 091926</p>
      </div>
    </div>
  </body>
</html>
    `;

    // Send via Resend
    const sendResult = await resend.emails.send({
      from: 'quotes@neatedgecleaning.com',
      to: email || lead.email,
      subject: `Quotation ${quote.quote_number} - Neatedge Cleaning`,
      html: htmlContent,
    });

    if (sendResult.error) {
      console.error('Email send error:', sendResult.error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Update quote: mark as sent, store email_id
    const { data: updatedQuote, error: updateError } = await supabase
      .from('quotes')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        email_id: sendResult.data?.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Quote update error:', updateError);
      return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
    }

    // Log to audit trail
    await supabase.from('audit_log').insert({
      action: 'quote_sent',
      resource_type: 'quote',
      resource_id: id,
      admin_id: admin.id,
      metadata: {
        quote_number: quote.quote_number,
        final_price: quote.final_quote_price,
        recipient: email || lead.email,
        email_id: sendResult.data?.id,
      },
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      quote: updatedQuote,
      message: `Quote ${quote.quote_number} sent to ${email || lead.email}`,
    });
  } catch (error) {
    console.error('Quote send error:', error);
    return NextResponse.json({ error: 'Failed to send quote' }, { status: 500 });
  }
}
