# Premium Chatbot - Quick Start Guide

## 🚀 Quick Setup (2 minutes)

### 1. Verify Environment Variable
```bash
# Check if NEXT_PUBLIC_WHATSAPP_PHONE is set
grep "NEXT_PUBLIC_WHATSAPP_PHONE" .env.local
# Should output: NEXT_PUBLIC_WHATSAPP_PHONE=447700123456
```

### 2. Update WhatsApp Number (if needed)
```bash
# Edit .env.local and update the WhatsApp phone number
# Format: countrycode without +
# Example: 447700123456 = +44 7700 123456 (UK)
```

### 3. Start Development Server
```bash
npm run dev
# Server starts at http://localhost:3000
```

### 4. Open in Browser
- **Desktop**: http://localhost:3000
- **Mobile**: Toggle DevTools (Ctrl+Shift+M) to iPhone SE view

### 5. Look for Chatbot
- Bottom-right corner: Navy floating button with chat icon
- Click to open chat panel

---

## 📋 What Each File Does

### `src/components/ChatbotPanel.tsx`
**The Chat UI Component**
- Floating button that opens a chat panel
- Manages the conversation flow
- Collects user information
- Submits leads to the API
- Handles WhatsApp handoff

**To customize**:
- Change colors: Search for `bg-brand-navy`
- Change button position: Search for `bottom-6 right-6`
- Change questions: Edit import from `chatbot-flow.ts`

### `src/lib/chatbot-flow.ts`
**The Conversation Logic**
- Defines all 13 questions
- Sets up conditional questions (show/hide based on selections)
- Validates all data
- Generates WhatsApp messages
- Exports data types for TypeScript

**To customize**:
- Add questions: Modify `CHATBOT_FLOW` array
- Change service types: Edit `SERVICES` array
- Add validation: Modify `validateLeadData()` function
- Change message format: Edit `generateWhatsAppMessage()` function

### `src/app/api/chatbot/lead/route.ts`
**The Backend API**
- Receives lead data from chatbot
- Validates and stores in Supabase
- Implements rate limiting
- Prevents duplicate submissions
- Sets `lead_source = "website_chatbot"`

**To customize**:
- Change rate limit: Modify `RATE_LIMIT_MAX` (currently 5/minute)
- Change duplicate window: Modify window minutes parameter (currently 5)
- Add email notification: Call Resend API after insertion
- Add CRM integration: Call external API here

### `src/app/layout.tsx`
**The Global Integration**
- Imports ChatbotPanel component
- Adds it to root layout
- Makes chatbot appear on all pages

**Note**: Component is client-side only (uses `'use client'` directive)

---

## 🎯 Testing Checklist

### Quick Manual Test (5 minutes)
```bash
# 1. Start server
npm run dev

# 2. Open browser
# http://localhost:3000

# 3. Click floating button in bottom-right corner

# 4. Answer all questions:
# - Name: "Test User"
# - Email: "test@example.com"
# - Phone: "07700 123456"
# - Postcode: "SW1A 1AA"
# - Service: "Residential Cleaning"
# - Property Type: "Apartment"
# - Bedrooms: "2"
# - Bathrooms: "1"
# - Frequency: "Weekly"
# - Preferred Date: Leave blank
# - Notes: Leave blank
# - Privacy: Check box
# - Marketing: Leave unchecked

# 5. Click "Continue on WhatsApp"
# Should open WhatsApp with pre-filled message

# 6. Check Supabase
# - Database > leads table
# - Find new entry with lead_source = "website_chatbot"
```

### Type Check
```bash
npm run type-check
# Should show: no errors related to chatbot
```

### Full Build
```bash
npm run build
# Should complete successfully
```

---

## 📊 View Chatbot Leads

### In Admin Dashboard
1. Navigate to `/admin`
2. Login with credentials
3. Click "Leads"
4. Leads are automatically listed with latest first
5. Filter: Look for `lead_source = "website_chatbot"`

### In Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Database > leads table
4. Filter by `lead_source` equals `website_chatbot`
5. View and export data

### Via SQL Query
```sql
SELECT * FROM leads 
WHERE lead_source = 'website_chatbot'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🔧 Common Customizations

### Change WhatsApp Number
```bash
# Edit .env.local
NEXT_PUBLIC_WHATSAPP_PHONE=447123456789
```

### Add a New Question
1. Open `src/lib/chatbot-flow.ts`
2. Add question object to `CHATBOT_FLOW` array
3. Example:
```typescript
{
  id: 'moveInDate',
  text: 'When are you moving in?',
  type: 'date',
  required: true,
  conditional: (data) => data.propertyType === 'apartment',
}
```

### Change Question Order
1. Open `src/lib/chatbot-flow.ts`
2. Reorder items in `CHATBOT_FLOW` array
3. Note: Conditional questions still show based on logic

### Customize Message Format
1. Open `src/lib/chatbot-flow.ts`
2. Find `generateWhatsAppMessage()` function
3. Edit the `lines` array
4. Example:
```typescript
lines.push(`*Move In Date:* ${data.moveInDate}`);
```

### Disable Chatbot
Simply remove or comment out:
```typescript
// In src/app/layout.tsx
<ChatbotPanel /> // ← Comment this line out
```

### Style the Floating Button
1. Open `src/components/ChatbotPanel.tsx`
2. Find the floating button (search for "Floating Button")
3. Edit Tailwind classes
4. Example: Change `bg-brand-navy` to `bg-brand-gold`

---

## 🐛 Troubleshooting

### Chatbot doesn't appear
- Check browser console for errors (F12)
- Verify ChatbotPanel is in src/app/layout.tsx
- Ensure no CSS is hiding elements (check z-index)
- Try hard refresh (Ctrl+Shift+R)

### Questions don't show correctly
- Check browser DevTools > Console for errors
- Verify conditional logic in chatbot-flow.ts
- Test in incognito mode (clear cache)
- Check network tab for API errors

### Lead not created
- Check Supabase credentials in .env.local
- Verify form validation passed (no error message)
- Check network tab in DevTools (POST to /api/chatbot/lead)
- Check Supabase logs for database errors
- Try submitting again (rate limit may have triggered)

### WhatsApp link doesn't work
- Verify NEXT_PUBLIC_WHATSAPP_PHONE is set correctly
- Format: country code + number without + symbol
- Example: 447700123456 (not +447700123456)
- Try different phone number format
- Open in incognito mode to test

### Rate limit error
- Too many submissions too quickly
- Wait 60 seconds and try again
- Check IP address (sharing network may cause this)
- Different email address will bypass duplicate check

---

## 📈 Monitoring

### Daily Tasks
- [ ] Check for new chatbot leads in Supabase
- [ ] Review lead data quality
- [ ] Follow up on submissions via WhatsApp

### Weekly Tasks
- [ ] Analyze response patterns
- [ ] Check error logs
- [ ] Review conversion rates
- [ ] Check ChatGPT error messages

### Monthly Tasks
- [ ] Generate lead report by source
- [ ] Review and refine questions
- [ ] Update WhatsApp response templates
- [ ] Check for feature requests

---

## 🔒 Security Reminders

### Do NOT
- Commit `.env.local` to Git (use `.env.example`)
- Share WhatsApp phone number publicly
- Expose Supabase service role key
- Disable rate limiting without good reason

### Do
- Regularly review access logs
- Monitor for unusual lead volume
- Update phone number if compromised
- Rotate API keys periodically
- Keep dependencies updated

---

## 📞 Support Workflow

### Customer Submits via Chatbot
1. Lead created in Supabase
2. Lead visible in admin dashboard
3. Team receives notification (if email configured)
4. Customer can continue on WhatsApp

### Follow-up Steps
1. Send WhatsApp message with quote
2. Answer questions about service
3. Confirm booking details
4. Send invoice/payment link

### Update Lead Status
1. In admin dashboard, click on lead
2. Click "Status" dropdown
3. Change to "Qualified", "Quoted", "Booked", etc.
4. Add internal notes

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Test chatbot on desktop (1440px)
- [ ] Test chatbot on mobile (390px)
- [ ] Verify WhatsApp link with real number
- [ ] Update NEXT_PUBLIC_WHATSAPP_PHONE
- [ ] Test rate limiting
- [ ] Test duplicate detection
- [ ] Verify lead creation in Supabase
- [ ] Check admin dashboard displays leads
- [ ] Run full type check
- [ ] Run production build
- [ ] No console errors on any page
- [ ] No existing features broken
- [ ] Analytics events firing (if configured)
- [ ] Review error handling
- [ ] Document any customizations

---

## 📚 Full Documentation

For more details, see:
- `CHATBOT_IMPLEMENTATION.md` - Technical implementation details
- `CHATBOT_TESTING_GUIDE.md` - Comprehensive testing procedures
- `IMPLEMENTATION_SUMMARY.md` - Checklist and sign-off

---

## ⚡ Performance Tips

### Optimize Load Time
```typescript
// Use dynamic import in layout.tsx if needed
const ChatbotPanel = dynamic(() => import('@/components/ChatbotPanel'), {
  ssr: false,
  loading: () => null,
});
```

### Reduce Bundle Size
- Chatbot code: ~35 KB total
- Tree-shaking removes unused questions
- No external dependencies added

### Improve Interaction Speed
- Client-side validation (instant feedback)
- Debounced API calls (single submission)
- Optimistic UI updates

---

## 🎓 Learning Resources

### Understanding the Flow
```
User clicks button
    ↓
ChatbotPanel opens
    ↓
Get active questions (filter by conditionals)
    ↓
Display current question
    ↓
User inputs answer
    ↓
Validate (client-side)
    ↓
Add to leadData state
    ↓
Move to next question
    ↓
Repeat until all questions answered
    ↓
Submit to /api/chatbot/lead
    ↓
Create lead in Supabase
    ↓
Generate WhatsApp message
    ↓
User clicks WhatsApp button
    ↓
Opens wa.me with pre-filled message
```

### Key Concepts
- **Conditional Questions**: Show/hide based on previous answers
- **Lead Source**: "website_chatbot" identifies chatbot-generated leads
- **Rate Limiting**: Prevents spam (5/minute per IP)
- **Duplicate Detection**: Prevents re-submission (5-minute window)
- **WhatsApp Handoff**: Transfers conversation to business WhatsApp

---

**Ready to launch!** 🎉

Questions? Check the full documentation files or the code comments.
