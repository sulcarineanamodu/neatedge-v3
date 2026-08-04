# Package 7: Persistent Lead Database

## Overview
Supabase PostgreSQL database for persistent lead storage with Row Level Security (RLS), validation, rate limiting, and GDPR compliance.

## Database Schema

### Leads Table
```
id                    UUID PRIMARY KEY
created_at            TIMESTAMP (auto)
updated_at            TIMESTAMP (auto)
name                  VARCHAR(255) NOT NULL
email                 VARCHAR(255) NOT NULL + indexed
telephone             VARCHAR(20) NOT NULL
postcode              VARCHAR(10) NOT NULL + validated
enquiry_type          VARCHAR(50) NOT NULL (enum)
customer_type         VARCHAR(50) (optional)
service               VARCHAR(255) (optional)
property_type         VARCHAR(50) (optional)
message               TEXT (max 2000 chars)
preferred_contact_method VARCHAR(50) NOT NULL (email|phone|both)
preferred_date        VARCHAR(50) (optional, YYYY-MM-DD format)
marketing_consent     BOOLEAN DEFAULT false
marketing_consent_at  TIMESTAMP (recorded when granted)
privacy_consent       BOOLEAN NOT NULL (must be true)
privacy_consent_at    TIMESTAMP (recorded when accepted)
lead_source           VARCHAR(100) (default: 'website')
page_url              TEXT (referrer URL)
status                VARCHAR(50) NOT NULL DEFAULT 'new'
assigned_to           UUID (optional, for admin)
internal_notes        TEXT (for admin use)
ip_address            INET (for fraud detection)
user_agent            TEXT (device fingerprint)
```

### Constraints
- Email validation (regex)
- Privacy consent must be true
- Enquiry type must be one of: general, residential-estimate, commercial-survey, property-partnership
- UK postcode format validation

### Indexes
- email (fast duplicate detection)
- created_at DESC (fast sorting)
- status (for filtering)
- enquiry_type (for analytics)

## Row Level Security (RLS) Policies

### Anonymous Users
- No read access
- No insert access
- No update access
- No delete access

### Staff (Authenticated)
- Can read all leads
- Can update leads (assigned status, internal notes)
- Cannot delete leads (audit trail)

### Application (Server-side API)
- Uses service-role key (never in browser)
- Inserts leads with validation
- Checks for duplicates
- Rate limited at application level

## Environment Variables Required

### Required (Supabase)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs... (NEVER in browser)
```

### Optional (Future)
```
SENDGRID_API_KEY=SG.xxx... (for email confirmations)
SENDGRID_FROM_EMAIL=noreply@neatedgecleaning.co.uk
ADMIN_SECRET=xxx... (for future admin endpoints)
```

## Security Measures

### Rate Limiting
- 3 submissions per minute per IP
- Returns 429 Too Many Requests on breach
- Tracked in-memory (scales with Redis in production)

### Request Validation
- Schema validation via Zod
- 10KB request size limit
- Email format validation (RFC)
- UK postcode format validation
- Phone number format validation (10-20 digits)

### Data Protection
- Service-role key server-side only
- Generic error messages (no SQL/DB details exposed)
- IP address logged for fraud detection
- Duplicate submission detection (5-minute window)
- Consent timestamps recorded for GDPR

### Input Sanitization
- Automatic trim and case normalization
- No dangerous characters allowed
- Message length limited to 2000 chars

## Submission Workflow

1. **Client submits form** → Browser calls `/api/enquiry` POST
2. **Server receives request** → Extract IP, validate schema
3. **Rate limiting check** → Reject if too many requests from IP
4. **Duplicate check** → Reject if same email within 5 minutes
5. **Validate all fields** → Reject if invalid data
6. **Insert to database** → Supabase RLS enforces server-only access
7. **Return success** → Generic message (no email confirmation yet)
8. **Email task** → Send confirmation email (TODO: SendGrid)

## Testing

Run validation tests:
```bash
npm run test -- __tests__/database-leads.test.ts
```

Tests verify:
- Valid enquiries are accepted
- Missing fields are rejected
- Invalid email/postcode/phone rejected
- Privacy consent is required
- Message length limited
- Oversized requests rejected
- Email normalization
- Postcode normalization
- No sensitive data in errors

## Deployment Checklist

- [ ] Supabase project created
- [ ] Migration applied (`supabase/migrations/001_create_leads_table.sql`)
- [ ] RLS policies enabled
- [ ] Environment variables set (production)
- [ ] Tests passing locally
- [ ] Service-role key configured (server-side only)
- [ ] Rate limiting configured (adjust as needed)
- [ ] In-memory storage removed from codebase
- [ ] Database connection string verified
- [ ] Error handling reviewed

## Data Retention & GDPR

### Retention Policy
- New leads: retained for 90 days minimum (for follow-up)
- Converted leads: retained for 3 years (for service history)
- Archived leads: deleted after 90 days (configurable)

### GDPR Rights
- **Access**: Admin dashboard to export lead data
- **Correction**: Update lead details via admin
- **Deletion**: Soft-delete (mark archived, then hard-delete after 90 days)
- **Export**: SQL query to get all personal data
- **Consent withdrawal**: Allow marketing_consent to be toggled

### Data Sharing
- No sharing with third parties
- Internal use only (sales, support)
- Never sell or trade leads

## Future Enhancements

1. Email confirmations (SendGrid/Mailgun)
2. Admin dashboard (CRUD, filtering, exporting)
3. CRM integration (Pipedrive, HubSpot)
4. Bot protection (reCAPTCHA v3)
5. SMS notifications (Twilio)
6. Webhook integration (Zapier, Make)
7. Analytics tracking (PostHog)
8. Email verification step
9. Phone verification step
10. Lead scoring (hot/warm/cold)
