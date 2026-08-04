interface CustomerEmailProps {
  name: string;
  enquiryType: string;
  leadId: string;
}

interface InternalEmailProps {
  name: string;
  email: string;
  telephone: string;
  postcode: string;
  enquiryType: string;
  message?: string;
  preferredContactMethod: string;
  leadId: string;
}

/**
 * Customer Enquiry Acknowledgement Email
 * Sent to customer immediately after form submission
 */
export function CustomerEnquiryReceivedEmail({ name, enquiryType, leadId }: CustomerEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#1a7a4a',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: '0', fontSize: '28px' }}>Neatedge Cleaning</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Professional Cleaning Services
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '30px 20px', lineHeight: '1.6', color: '#374151' }}>
        <p style={{ marginTop: 0 }}>Hi {name},</p>

        <p>
          Thank you for your enquiry to Neatedge Cleaning. We've received your request for{' '}
          <strong>{formatEnquiryType(enquiryType)}</strong> and we're excited to help.
        </p>

        <p>
          Our team will review your details and get back to you within 24 hours. You can expect to hear from us very soon with next steps and any questions we might have.
        </p>

        <div
          style={{
            backgroundColor: '#f3f4f6',
            padding: '15px',
            borderRadius: '8px',
            margin: '20px 0',
            borderLeft: '4px solid #1a7a4a',
          }}
        >
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280' }}>
            Enquiry Reference:
          </p>
          <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>
            {leadId}
          </p>
        </div>

        <p>
          <strong>What happens next?</strong>
        </p>
        <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
          <li>We'll assess your cleaning requirements</li>
          <li>Prepare a tailored quote for your property</li>
          <li>Contact you to confirm and schedule</li>
        </ul>

        <p>
          If you need to reach us sooner, feel free to call us on{' '}
          <strong>
            <a href="tel:07886091926" style={{ color: '#1a7a4a', textDecoration: 'none' }}>
              07886 091926
            </a>
          </strong>
          .
        </p>

        <p style={{ marginBottom: 0 }}>
          Best regards,
          <br />
          <strong>The Neatedge Cleaning Team</strong>
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          padding: '15px 20px',
          fontSize: '12px',
          color: '#9ca3af',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>
          Neatedge Cleaning • London, UK
          <br />
          <a href="mailto:info@neatedgecleaning.com" style={{ color: '#6b7280' }}>
            info@neatedgecleaning.com
          </a>
          {' • '}
          <a href="tel:07886091926" style={{ color: '#6b7280' }}>
            07886 091926
          </a>
        </p>
      </div>
    </div>
  );
}

/**
 * Internal New Lead Notification
 * Sent to info@neatedgecleaning.com immediately after customer submission
 */
export function InternalNewLeadEmail({
  name,
  email,
  telephone,
  postcode,
  enquiryType,
  message,
  preferredContactMethod,
  leadId,
}: InternalEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#1a7a4a',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: '0', fontSize: '28px' }}>🔔 New Lead Alert</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
          Neatedge Cleaning Portal
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '20px', lineHeight: '1.6', color: '#374151' }}>
        <p style={{ marginTop: 0, fontSize: '14px', margin: '0 0 15px 0' }}>
          New enquiry received from <strong>{name}</strong>.
        </p>

        {/* Lead Details Card */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937', width: '35%' }}>
                Lead ID:
              </td>
              <td style={{ padding: '12px', color: '#6b7280' }}>{leadId}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937', width: '35%' }}>
                Name:
              </td>
              <td style={{ padding: '12px', color: '#6b7280' }}>{name}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937' }}>Email:</td>
              <td style={{ padding: '12px', color: '#6b7280' }}>
                <a href={`mailto:${email}`} style={{ color: '#1a7a4a', textDecoration: 'none' }}>
                  {email}
                </a>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937' }}>Phone:</td>
              <td style={{ padding: '12px', color: '#6b7280' }}>
                <a href={`tel:${telephone}`} style={{ color: '#1a7a4a', textDecoration: 'none' }}>
                  {telephone}
                </a>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937' }}>Postcode:</td>
              <td style={{ padding: '12px', color: '#6b7280' }}>{postcode}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937' }}>
                Enquiry Type:
              </td>
              <td style={{ padding: '12px', color: '#6b7280' }}>
                <strong>{formatEnquiryType(enquiryType)}</strong>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#1f2937' }}>
                Preferred Contact:
              </td>
              <td style={{ padding: '12px', color: '#6b7280' }}>
                {preferredContactMethod.charAt(0).toUpperCase() + preferredContactMethod.slice(1)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Message Section */}
        {message && (
          <>
            <p style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Message:</p>
            <div
              style={{
                backgroundColor: '#f9fafb',
                padding: '12px',
                borderRadius: '6px',
                borderLeft: '3px solid #1a7a4a',
                marginBottom: '20px',
                color: '#6b7280',
              }}
            >
              <p style={{ margin: '0', whiteSpace: 'pre-wrap' }}>{message}</p>
            </div>
          </>
        )}

        {/* Action Button */}
        <div style={{ marginBottom: '20px' }}>
          <a
            href={`https://app.neatedgecleaning.com/leads/${leadId}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#1a7a4a',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            View Lead in Dashboard
          </a>
        </div>

        <p style={{ fontSize: '13px', color: '#9ca3af', margin: '15px 0 0 0' }}>
          This is an automated notification. Do not reply to this email.
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          padding: '15px 20px',
          fontSize: '12px',
          color: '#9ca3af',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0 }}>Neatedge Cleaning • Internal Portal • {new Date().toLocaleString('en-GB')}</p>
      </div>
    </div>
  );
}

/**
 * Helper: Format enquiry type for display
 */
function formatEnquiryType(type: string): string {
  const map: Record<string, string> = {
    general: 'General Enquiry',
    'residential-estimate': 'Residential Estimate',
    'commercial-survey': 'Commercial Survey',
    'property-partnership': 'Property Professional Partnership',
  };
  return map[type] || type;
}
