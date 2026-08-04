# Package 8: Privacy UX + Email Notifications (Resend)

**Status:** Implementation Complete | Database Migration Pending | Testing Ready

**Date:** 4 August 2026

---

## Overview

Package 8 adds transactional email notifications to Neatedge's enquiry form via Resend, with proper GDPR compliance and separate privacy consent from marketing consent.

**Key Principle:** Database persistence is the primary transaction. Email delivery is fire-and-forget. If Resend is unavailable, the lead is still saved.

---

## What's New

### 1. **Resend Email Service**
- **Sender:** `enquiries@send.neatedgecleaning.com`
- **Reply-to:** `info@neatedgecleaning.com`
- **API Key:** Set in `RESEND_API_KEY` environment variable (never prefixed with `NEXT_PUBLIC_`)

### 2. **Email Templates**
Two responsive HTML emails with Neatedge branding:

#### **Customer Acknowledgement Email**
- Sent immediately to customer's email address after form submission
- Confirms receipt of their enquiry
- References their enquiry ID
- Provides next steps and phone number
- Professional green/gold branding

#### **Internal Notification Email**
- Sent to `info@neatedgecleaning.com`
- Full lead details (name, email, phone, postcode, enquiry type)
- Customer's message quoted
- Link to dashboard (when admin panel is built)
- Encourages rapid response

### 3. **Privacy UX Separation**
Form now has **two separate consent mechanisms:**

#### **Privacy Consent (Required)**
- Checkbox with clear language about data processing
- Lawful basis: Performance of contract / Legitimate interest
- Required to submit form
- Stored in database with timestamp (`privacy_consent_at`)

#### **Marketing Consent (Optional)**
- Separate unchecked checkbox (opt-in, not opt-out)
- Lawful basis: Explicit consent
- Not required to obtain quotation
- Stored in database with timestamp (`marketing_consent_at`)

### 4. **Email Tracking**
Database now tracks email delivery status for each lead:
- `customer_email_status` (pending → sent → failed → bounced)
- `internal_email_status` (pending → sent → failed → bounced)
- `customer_email_id` (Resend message ID for tracking)
- `internal_email_id` (Resend message ID for tracking)
- `email_attempted_at` (timestamp of send attempt)
- `email_error_code` (if send failed)
- `retry_count` (incremented on retry)

---

## Setup Instructions

### Step 1: Apply Database Migration

Run this SQL in Supabase SQL Editor:

```sql
-- Add email tracking fields to leads table for Resend integration
ALTER TABLE public.leads
ADD COLUMN customer_email_status TEXT DEFAULT 'pending' CHECK (customer_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN internal_email_status TEXT DEFAULT 'pending' CHECK (internal_email_status IN ('pending', 'sent', 'failed', 'bounced')),
ADD COLUMN customer_email_id TEXT,
ADD COLUMN internal_email_id TEXT,
ADD COLUMN email_attempted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN email_error_code TEXT,
ADD COLUMN retry_count INTEGER DEFAULT 0;

-- Add index for email status tracking (for analytics/dashboard)
CREATE INDEX idx_leads_customer_email_status ON public.leads(customer_email_status);
CREATE INDEX idx_leads_internal_email_status ON public.leads(internal_email_status);
CREATE INDEX idx_leads_email_attempted_at ON public.leads(email_attempted_at DESC);
```

**Path in Supabase Console:**
1. Go to SQL Editor
2. Paste the SQL above
3. Click "Run"
4. Verify columns appear in `public.leads` table

### Step 2: Set Up Resend Domain

**In Resend Dashboard:**

1. Go to Domains (https://resend.com/domains)
2. Add new domain: `send.neatedgecleaning.com`
3. Follow Resend's DNS setup wizard
4. Add DNS records to your domain provider (Hostinger):
   - **SPF record** (Resend will provide exact record)
   - **DKIM record** (Resend will provide)
   - **DMARC record** (optional, recommended: `v=DMARC1; p=quarantine`)
5. Verify domain in Resend (typically takes 5-30 minutes)

**Do NOT modify existing MX records** — Hostinger already has mail setup for `info@neatedgecleaning.com`

### Step 3: Set Environment Variables

**Local Development** (`.env.local`):
```
RESEND_API_KEY=re_AKBiPeKo_sNrQ939Lf5667x2Fr7g6ymuQ
```

**Vercel Production** (via Vercel Settings → Environment Variables):
```
RESEND_API_KEY=re_AKBiPeKo_sNrQ939Lf5667x2Fr7g6ymuQ
```

**Important:** Never prefix with `NEXT_PUBLIC_` (would expose API key to browser)

---

## Files Modified/Created

### New Files
- `src/lib/email/templates.tsx` — Email template components (JSX)
- `src/lib/email/resend.ts` — Resend service with send + update functions
- `supabase/migrations/002_add_email_tracking.sql` — Database schema

### Modified Files
- `src/app/contact/page.tsx` — Privacy UX with two consent checkboxes
- `src/app/api/enquiry/route.ts` — Send emails after database save
- `.env.local` — Added RESEND_API_KEY

---

## Form Submission Flow

```
1. User fills form + clicks "Send Enquiry"
   ↓
2. Client-side validation (Zod schema)
   ↓
3. POST to /api/enquiry
   ↓
4. Server: Rate limit check (3/min per IP)
   ↓
5. Server: Duplicate check (5-min window by email)
   ↓
6. Server: Save to Supabase leads table ← PRIMARY TRANSACTION
   ↓
7. Server: Send customer acknowledgement email (async, non-blocking)
   ↓
8. Server: Send internal notification to info@neatedgecleaning.com (async, non-blocking)
   ↓
9. Server: Return success response to client
   ↓
10. Client: Show success message, reset form
```

**If email fails:**
- Lead is still saved in database ✓
- Email status fields track the failure
- No customer impact
- Internal team can see email failure in dashboard (future feature)

---

## Email Content

### Customer Acknowledgement

**Subject:** We Received Your Enquiry • Neatedge Cleaning

**Content:**
- Greeting with customer name
- Confirmation of enquiry type received
- "We'll get back to you within 24 hours" message
- Reference ID box (for tracking)
- Next steps (outline of what happens)
- Direct phone number for urgent contact
- Professional Neatedge branding (green header, gold accents)

### Internal Notification

**Subject:** New Lead: [Name] • [Enquiry Type]

**Content:**
- Lead ID (for internal tracking)
- Full contact details (name, email, phone, postcode)
- Enquiry type and preferred contact method
- Customer's message (quoted)
- Link to dashboard (when built)
- Timestamp of lead creation

---

## GDPR/ICO Compliance

### Privacy Basis
- **Lawful basis for processing:** Contract/Legitimate Interest (responding to enquiry)
- **Data minimization:** Only collect what's needed (name, email, phone, postcode, message)
- **Consent:** Explicit checkbox on form (privacy_consent = true)
- **Storage:** Encrypted in Supabase, access controlled via RLS

### Retention Policy
- Leads retained for 3 years (standard for cleaning contractor records)
- Soft-delete flag recommended for future compliance dashboard
- Email addresses never shared with third parties

### Marketing Emails
- **Lawful basis:** Explicit opt-in consent (separate checkbox)
- **Default:** Unchecked (opt-in, not opt-out)
- **Clear language:** "occasional cleaning offers and updates"
- **Unsubscribe:** Future feature (link in email footer)

---

## Testing Checklist

### Email Delivery (Dev Environment)
- [ ] Submit form with privacy consent checked
- [ ] Check personal email inbox for customer ack (should arrive within 10s)
- [ ] Check info@neatedgecleaning.com inbox for internal notification
- [ ] Verify email addresses and formatting
- [ ] Verify names/details in emails match form submission

### Email Delivery (Production)
- [ ] Send test form submission to production site
- [ ] Verify customer email arrives
- [ ] Verify internal email arrives at info@
- [ ] Test with multiple email domains (@gmail, @outlook, etc.)

### Database Tracking
- [ ] Submit form and check Supabase
- [ ] Verify lead row has `customer_email_status = 'sent'`
- [ ] Verify lead row has `internal_email_status = 'sent'`
- [ ] Verify timestamps populated in `email_attempted_at`
- [ ] Verify `customer_email_id` and `internal_email_id` match Resend message IDs

### Form UX
- [ ] Privacy checkbox is visible and required
- [ ] Marketing checkbox is visible and optional
- [ ] Privacy notice text is clear and linked to Privacy Policy page
- [ ] Form cannot submit without privacy consent
- [ ] Success message appears after submission
- [ ] Form clears after successful submission

### Error Handling
- [ ] Submit form with invalid email → validation error
- [ ] Submit form twice within 5 minutes from same email → duplicate error (rate limit)
- [ ] Simulate Resend API down → lead still saves, email status = 'failed'

---

## Resend Domain Verification Evidence

Once domain is set up, collect these for verification:

1. **SPF Record Status** (from Resend Domain Settings)
   ```
   Screenshot: Resend dashboard showing "SPF Verified"
   ```

2. **DKIM Record Status** (from Resend Domain Settings)
   ```
   Screenshot: Resend dashboard showing "DKIM Verified"
   ```

3. **DMARC Record** (from your domain provider's DNS settings)
   ```
   Screenshot: Hostinger DNS settings showing DMARC record
   ```

4. **Test Email Evidence**
   ```
   Screenshot 1: Customer acknowledgement email in inbox
   Screenshot 2: Internal notification email
   Screenshot 3: Email headers showing Resend origin
   ```

5. **Database Verification**
   ```
   Screenshot: Supabase Table Editor showing leads row with:
   - customer_email_status = 'sent'
   - internal_email_status = 'sent'
   - customer_email_id = [resend message ID]
   - internal_email_id = [resend message ID]
   ```

6. **Form Submission Screenshot**
   ```
   Screenshot: Form with privacy notice visible, both checkboxes showing
   ```

---

## Resend API Reference

### Send Email
```typescript
const result = await resend.emails.send({
  from: 'enquiries@send.neatedgecleaning.com',
  to: 'customer@example.com',
  replyTo: 'info@neatedgecleaning.com',
  subject: 'Subject line',
  react: EmailComponent({ /* props */ }),
});

// Returns: { data: { id: 'message-id' }, error: null }
//      or: { data: null, error: { code, message } }
```

### Email Status Tracking
- Resend provides delivery webhooks (future feature)
- For now, we track at send time (pending → sent → failed)
- Bounce handling via future webhook integration

---

## Deployment Checklist

### Before Deploying to Vercel

- [ ] Environment variable `RESEND_API_KEY` added to Vercel project
- [ ] Database migration applied to Supabase production
- [ ] Resend domain verified and active
- [ ] Test email sent successfully from Resend dashboard
- [ ] Git commit pushed to master
- [ ] All tests passing locally (npm run test)

### After Deploying to Vercel

- [ ] Site builds successfully (check Vercel deployment log)
- [ ] Form submission works on production site
- [ ] Customer email received within 10 seconds
- [ ] Internal email received within 10 seconds
- [ ] Database updated with email tracking fields
- [ ] No errors in Vercel function logs
- [ ] Privacy notice and checkboxes visible and functional

---

## Future Enhancements

### Phase 2: Email Webhooks
- Resend webhooks for bounce/complaint tracking
- Update email status when Resend notifies of delivery/bounce
- Dashboard widget showing email delivery stats

### Phase 3: Email Personalization
- Dynamic email content based on enquiry type
- Service-specific recommendations in customer email
- Sales playbook template in internal email

### Phase 4: Marketing Automation
- Marketing consent checkbox triggers CRM integration
- Automated drip campaign for marketing opt-ins
- Unsubscribe link in marketing emails

---

## Support & Troubleshooting

### Email Not Arriving
1. Check spam/junk folder (add `enquiries@send.neatedgecleaning.com` to contacts)
2. Verify Resend domain is active (check Resend dashboard)
3. Check email address in form (typos block delivery)
4. Review Resend logs for delivery errors
5. Verify SPF/DKIM records are correct

### Database Fields Not Updating
1. Check Supabase migration was applied (SQL Editor → run migration)
2. Verify column names match code (`customer_email_status`, etc.)
3. Check service-role key has permissions (should via RLS policies)

### API Rate Limiting
- 3 submissions per IP per 60 seconds
- Increase `RATE_LIMIT_MAX` in `/api/enquiry/route.ts` if needed
- Consider IP-based rate limiting vs per-email rate limiting for future

---

## Git Commit

```
commit 1bba35c
Package 8: Email integration with Resend and privacy UX

- Add Resend API integration for transactional emails
- Create email templates (customer ack + internal notification)
- Implement fire-and-forget email sending after database save
- Add email tracking fields to database schema
- Separate privacy notice from marketing consent checkbox
- Privacy consent required (lawful basis), marketing consent optional
- Database persistence is primary transaction
- Email failures don't prevent lead creation
- Add Resend to environment variables
```

---

## Success Criteria (Package 8 Complete)

- [x] Email templates created and styled
- [x] Resend integration implemented (fire-and-forget)
- [x] Database migration created (email tracking fields)
- [x] Form privacy UX redesigned (two consent types)
- [x] API route updated to send emails
- [x] Environment variables configured
- [x] Code committed to git
- [ ] Database migration applied (manual via Supabase)
- [ ] Resend domain verified (manual via Resend dashboard)
- [ ] Test emails sent and verified
- [ ] Verification evidence collected
- [ ] Deployed to production (Vercel)

---

**Next:** Admin Dashboard (Package 9) — Do NOT start this package until Package 8 is complete and tested.
