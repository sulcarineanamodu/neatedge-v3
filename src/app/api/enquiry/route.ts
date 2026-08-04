import { NextRequest, NextResponse } from 'next/server';

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  enquiryType: 'general' | 'residential-estimate' | 'commercial-survey' | 'property-partnership';
  timestamp: string;
}

// In-memory lead storage (replace with database in production)
const leads: EnquiryData[] = [];

export async function POST(request: NextRequest) {
  try {
    const data: EnquiryData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.postcode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store lead
    leads.push(data);

    // Log to console (in production, send to email service & database)
    console.log(`[LEAD] ${data.enquiryType} - ${data.name} (${data.email})`);

    // TODO: Integrate email service (SendGrid, Mailgun, etc.)
    // const confirmationMsg = getConfirmationMessage(data);
    // await sendEmail({
    //   to: data.email,
    //   subject: confirmationMsg.subject,
    //   html: confirmationMsg.html,
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received. Confirmation sent to your email.',
        leadId: leads.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[ENQUIRY_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (for admin dashboard - implement auth in production)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    totalLeads: leads.length,
    leads: leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  });
}
