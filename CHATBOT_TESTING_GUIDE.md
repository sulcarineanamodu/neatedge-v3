# Premium Chatbot - Testing Guide

## Quick Start

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser
- Desktop: http://localhost:3000
- Mobile (DevTools): Toggle Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M)

### 3. Look for Chatbot
- Floating button in bottom-right corner (navy with chat icon)
- Click to open chat panel

## Desktop Testing (1440px)

### Visual Check
1. Navigate to any public page
2. Scroll to bottom-right corner
3. Verify floating button is visible
   - ✓ Navy background (#001F3F)
   - ✓ Chat icon centered
   - ✓ Positioned 24px from bottom and right edges
   - ✓ Shadow visible (shadow-lg)
   - ✓ Rounded circular button

### Open/Close Interaction
1. Click floating button
2. Chat panel should slide up from bottom-right
   - ✓ Panel width: 384px
   - ✓ Panel height: up to 600px
   - ✓ Rounded corners (rounded-2xl)
   - ✓ Navy header with "Neatedge Cleaning"
   - ✓ Close (X) button top-right
3. Click X button
   - ✓ Panel slides down
   - ✓ Floating button reappears
4. Click floating button again
   - ✓ Chat opens freshly (new conversation)

### Message Flow
1. Click floating button to open chat
2. Verify first question: "Hi! Welcome to Neatedge Cleaning. Whats your name?"
   - ✓ Message on left side in white box
   - ✓ Progress bar shows ~7% (1/13 questions)
3. Type a name (e.g., "John Smith")
   - ✓ Input field below message
   - ✓ Placeholder text: "Your full name"
4. Click "Continue" button
   - ✓ Your message appears on right in navy box
   - ✓ Typing indicator appears (bouncing dots)
   - ✓ After 500ms: next question appears

### Question Validation
**Email Question**:
1. Type invalid email (e.g., "notanemail")
2. Try to continue
   - ✓ Error message: "Please enter a valid email address"
   - ✓ Button disabled until valid input
3. Type valid email (e.g., "john@example.com")
   - ✓ Error clears
   - ✓ Can continue

**Phone Question**:
1. Type short number (e.g., "123")
2. Try to continue
   - ✓ Error: "Please enter a valid phone number"
3. Type valid number (e.g., "07700 123456")
   - ✓ Error clears
   - ✓ Can continue

**Postcode Question**:
1. Type invalid postcode (e.g., "invalid")
2. Try to continue
   - ✓ Error: "Please enter a valid UK postcode"
3. Type valid postcode (e.g., "SW1A 1AA")
   - ✓ Error clears
   - ✓ Can continue

**Service Selection**:
1. Dropdown should show 6 options:
   - Residential Cleaning
   - Deep Cleaning
   - End of Tenancy Cleaning
   - Carpet Cleaning
   - Office Cleaning
   - Commercial
2. Select "End of Tenancy Cleaning"
3. Click Continue

**Property Type Selection**:
1. Dropdown should show 7 options:
   - Apartment
   - House
   - Bungalow
   - Office
   - Retail Space
   - Warehouse
   - Other
2. Select "Apartment"
3. Click Continue

**Conditional Questions**:
1. Since property type is "Apartment", should see:
   - ✓ "How many bedrooms?" (type "2")
   - ✓ "How many bathrooms?" (type "1")
2. Since service is "End of Tenancy", should NOT see:
   - ✗ "How often do you need this service?" (frequency question)
3. Should see:
   - ✓ "When would you like the service?" (date picker for end-of-tenancy)
4. Select future date
5. Click Continue

**Additional Notes**:
1. Optional text area should appear
2. Type some notes (e.g., "Please be careful with the parquet floor")
3. Can leave empty
4. Click Continue

**Privacy Consent**:
1. Checkbox should appear: "I agree to the privacy policy"
2. Without checking: error "You must accept the privacy policy"
3. Check box
4. Click Continue

**Marketing Consent**:
1. Checkbox should appear: "I would like to receive updates about special offers"
2. Optional (no error if unchecked)
3. Check or leave unchecked
4. Click Continue

### Lead Submission
1. After marketing consent:
   - ✓ Loading spinner appears
   - ✓ "Sending..." text on button
2. After ~1-2 seconds:
   - ✓ Success message: "Great! We've received your inquiry. Our team will contact you shortly at [phone]."
   - ✓ Success message on left side with green/success styling
3. Then:
   - ✓ New message: "Would you like to continue the conversation on WhatsApp? We usually respond faster there."
   - ✓ "Continue on WhatsApp" button (green with WhatsApp icon)
   - ✓ "Start Over" button (grey)

### WhatsApp Handoff
1. Click "Continue on WhatsApp" button
2. WhatsApp should open (web.whatsapp.com or app) with:
   - ✓ Pre-filled message containing all data
   - ✓ Message starts with "*New Cleaning Service Inquiry*"
   - ✓ All fields included: Name, Email, Phone, Postcode, Service, Property Type, Bedrooms, Bathrooms, Preferred Date, Notes
   - ✓ Message ends with "*Source:* Website Chatbot"
3. Message format example:
   ```
   *New Cleaning Service Inquiry*
   
   *Name:* John Smith
   *Email:* john@example.com
   *Phone:* 07700 123456
   *Postcode:* SW1A 1AA
   *Service:* End of Tenancy Cleaning
   *Property Type:* Apartment
   *Bedrooms:* 2
   *Bathrooms:* 1
   *Preferred Date:* 2026-08-20
   *Notes:* Please be careful with the parquet floor
   
   *Source:* Website Chatbot
   ```

### Start Over
1. Click "Start Over" button
2. Chat resets
   - ✓ First question appears again
   - ✓ Progress bar resets to ~7%
   - ✓ No previous answers visible

### Progress Tracking
1. Monitor progress bar as you answer questions
2. Progress should increment smoothly with each answer
3. Final question (marketing consent) should be ~93% complete
4. Progress bar should disappear after submission

## Mobile Testing (390px / iPhone SE)

### Layout
1. Toggle Device Toolbar to iPhone SE (390px)
2. Open chat
3. Verify:
   - ✓ Panel width: fills viewport minus 24px (should be ~366px max)
   - ✓ Panel height: up to 85vh (most of screen)
   - ✓ No horizontal scrolling
   - ✓ All content vertically scrollable

### Touch Interactions
1. Buttons should be large
   - ✓ "Continue" button: ~44px minimum height
   - ✓ "Continue on WhatsApp": ~44px height
2. Inputs should be large
   - ✓ Text fields: ~40-44px height
   - ✓ Dropdown: ~40-44px height
   - ✓ Date picker: ~40-44px height

### Keyboard Handling
1. On mobile, click text field
2. Virtual keyboard appears
3. Verify:
   - ✓ Keyboard doesn't cover input field
   - ✓ Chat scrolls up to show input and keyboard
   - ✓ Message area scrolls as needed
4. Type text
   - ✓ Text appears in input
   - ✓ Spellcheck available (browser-dependent)
5. After input, press Done/Return on keyboard
   - ✓ Answer submits OR keyboard stays open (depending on browser)
   - ✓ Can click Continue button to proceed
6. Keyboard closes when message is sent

### Safe Area (Notched Phones)
1. On iPhone with notch, open chat
2. Verify:
   - ✓ Close button (X) not obscured by notch
   - ✓ Chat header visible
   - ✓ Content respects safe areas

## CRM Integration Testing

### Verify Lead Creation
1. Complete full chatbot flow
2. Open browser console (F12)
3. Look for log: "[CHATBOT_LEAD_SUBMITTED]"
4. Check Supabase dashboard:
   - Navigate to Database > leads table
   - Filter by lead_source = "website_chatbot"
   - Find your newly created lead
   - Verify fields:
     - ✓ name: matches your input
     - ✓ email: lowercase version
     - ✓ telephone: exact match
     - ✓ postcode: uppercase
     - ✓ service: selected value
     - ✓ property_type: selected value
     - ✓ bedrooms: numeric value or null
     - ✓ bathrooms: numeric value or null
     - ✓ frequency: value or null
     - ✓ preferred_date: date or null
     - ✓ message: notes or null
     - ✓ lead_source: "website_chatbot"
     - ✓ enquiry_type: "chatbot-qualification"
     - ✓ status: "new"
     - ✓ privacy_consent: true
     - ✓ marketing_consent: true/false as selected
     - ✓ created_at: recent timestamp
     - ✓ page_url: contains the page URL

### Test Duplicate Detection
1. Submit chatbot form completely
2. Try to submit again immediately with same email
3. Should see error: "An enquiry from this email was recently submitted. Please wait before submitting again."
4. Wait 5 minutes
5. Submit again with same email
6. Should succeed (duplicate window expired)

## Error Handling

### Network Error
1. Open DevTools (F12) > Network tab
2. Throttle to "Offline"
3. Complete chatbot form
4. Try to submit
5. Should show error: "An unexpected error occurred. Please try again or contact us directly."
6. Error message appears in red box
7. Re-enable network
8. Try again - should work

### Rate Limiting
1. Submit 6 chatbot leads from same IP within 60 seconds
2. On 6th submission: error "Too many submissions. Please try again later."

### Validation Errors
1. Submit with blank name
2. Error: "Please enter a valid name"
3. Submit with invalid email
4. Error: "Please enter a valid email address"
5. Submit with invalid phone
6. Error: "Please enter a valid phone number"
7. Submit with invalid postcode
8. Error: "Please enter a valid UK postcode"
9. Submit without privacy consent
10. Error: "You must accept the privacy policy"

## Analytics Check

### Event Tracking
1. Open DevTools Console
2. Complete chatbot and click WhatsApp
3. Look for gtag event (if GA configured)
4. Event: "whatsapp_handoff_clicked"

## Type Checking

### Run Type Check
```bash
npm run type-check
```

Expected: No errors related to:
- src/components/ChatbotPanel.tsx
- src/lib/chatbot-flow.ts
- src/app/api/chatbot/lead/route.ts

Note: Existing framer-motion error is expected (pre-existing issue)

## Build Verification

### Run Build
```bash
npm run build
```

Expected:
- Build completes successfully
- No errors for chatbot files
- Output includes chatbot component bundle
- No warnings in console

## Admin Dashboard Check

### View Chatbot Leads
1. Navigate to /admin
2. Login with admin credentials
3. View Leads page
4. Filter by lead_source = "website_chatbot"
5. Should see all submitted chatbot leads
6. Click on a lead to see full details
7. Verify all fields populated correctly
8. Check contact history (if implemented)

## Edge Cases

### Test Missing Environment Variable
1. Remove NEXT_PUBLIC_WHATSAPP_PHONE from .env
2. Submit chatbot
3. Click WhatsApp button
4. Should still work but use default number (447700123456)

### Test Very Long Input
1. Additional Notes field: paste 2000+ characters
2. Should truncate at 2000 chars or show error
3. Notes field placeholder: "E.g., specific areas of concern, access details, etc."

### Test Special Characters
1. Name with special characters: "José María O'Brien"
2. Should accept and store correctly
3. Notes with emojis: "Great cleaning needed! 👍"
4. Should handle in WhatsApp message

### Test Non-UK Postcodes
1. Try postcode format for other countries: "90210"
2. Should reject: "Please enter a valid UK postcode"
3. Only accepts UK format: "SW1A 1AA", "M1 1AE", etc.

## Performance Checks

### Page Load
1. Chatbot component loads instantly
2. No jank or layout shift
3. Floating button visible within 2 seconds

### Interaction Response
1. Click floating button → Opens within 200ms
2. Type in input → Instant response
3. Click Continue → Next question within 500ms
4. Lead submission → Response within 2 seconds

### Bundle Size
```bash
npm run build
# Check .next/static/chunks for chatbot bundle size
# Should be reasonable (<50KB for chatbot code)
```

## Browser Compatibility

### Test Browsers
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✓ Mobile Safari (iOS 14+)
- ✓ Chrome Mobile (Android 8+)

### Test Features
1. CSS: Tailwind utilities, flexbox, grid
2. JavaScript: ES6+, async/await, React hooks
3. APIs: Fetch, Supabase, WhatsApp web link
4. Forms: HTML5 validation, date picker

## Accessibility Testing

### Keyboard Navigation
1. Tab through all form elements
2. Focus indicators should be visible (gold outline)
3. Enter key should submit on single-field inputs
4. Shift+Tab should go backwards

### Screen Reader
1. Test with browser screen reader (Windows Narrator, macOS VoiceOver, NVDA)
2. Should announce:
   - Floating button: "Open chat" button
   - Panel: "Neatedge Cleaning Chat with us" header
   - Questions: Read as labels/text
   - Inputs: Read with input type and placeholder
   - Buttons: Read as "Continue" button, etc.
   - Errors: Announced when displayed

### Color Contrast
- Use contrast checker tool
- Navy on white: 21.4:1 (pass WCAG AAA)
- All text: minimum 4.5:1 (pass WCAG AA)

## Final Checklist

- [ ] Desktop layout correct
- [ ] Mobile layout correct
- [ ] All questions appear in correct order
- [ ] Conditional questions show/hide correctly
- [ ] Validation works for all fields
- [ ] Lead created in Supabase
- [ ] Lead_source set to "website_chatbot"
- [ ] WhatsApp message pre-filled correctly
- [ ] WhatsApp link opens
- [ ] Type-check passes
- [ ] Build succeeds
- [ ] No console errors
- [ ] No existing features broken
- [ ] Analytics events fire (if configured)
- [ ] Accessibility keyboard navigation works
- [ ] Mobile responsive (no horizontal scroll)
- [ ] Rate limiting works
- [ ] Duplicate detection works
- [ ] Error messages display correctly
- [ ] No network requests break existing features

---

**Test Date**: [Date]
**Tester**: [Name]
**Browser**: [Browser/Version]
**Device**: [Desktop/Mobile Device]
**Status**: [Pass/Fail]
**Notes**: [Any issues found]
