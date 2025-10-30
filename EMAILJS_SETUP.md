# EmailJS Setup Instructions

The Product Selector Wizard sends custom quote requests to contact@nunam.com using EmailJS.

## Setup Steps:

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Add Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account that will send emails

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Set template name (e.g., "quote_request")
   - Use these template variables in your email body:
     ```
     From: {{from_name}}
     Email: {{from_email}}
     Phone: {{from_phone}}
     
     {{message}}
     ```
   - Set "To email" to: contact@nunam.com

4. **Update Configuration**
   - Get your Service ID from Email Services
   - Get your Template ID from Email Templates
   - Get your Public Key from Account > API Keys
   
5. **Update the Code**
   In `src/components/ProductSelectorWizard.tsx`, replace:
   - `'YOUR_SERVICE_ID'` with your EmailJS Service ID
   - `'YOUR_TEMPLATE_ID'` with your EmailJS Template ID  
   - `'YOUR_PUBLIC_KEY'` with your EmailJS Public Key

## Example Configuration:
```typescript
const result = await emailjs.send(
  'service_abc1234',      // Your Service ID
  'template_xyz5678',      // Your Template ID
  {
    to_email: 'contact@nunam.com',
    from_name: formData.name,
    from_email: formData.email,
    from_phone: formData.phone,
    message: emailContent
  },
  'Hk7L9mNpQ2xRr8Sbt'     // Your Public Key
);
```

## Testing:
After setup, submit a test quote request through the wizard to verify emails are being sent to contact@nunam.com.

## Free Tier Limits:
- 200 emails/month
- 2 email services
- Should be sufficient for quote requests

## Alternative (No Setup Required):
If you prefer not to set up EmailJS, users can alternatively contact you directly at contact@nunam.com.
