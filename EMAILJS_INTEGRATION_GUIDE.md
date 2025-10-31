# EmailJS Integration Guide

All contact forms on the website now use a centralized email service. To complete the setup:

## Setup Steps:

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account (200 emails/month)

### 2. Add Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail recommended)
- Connect your sending email account

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Template name: `contact_form`
- Use these variables in your template:

```
Subject: New {{form_type}} from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Company: {{company}}

Message:
{{message}}

---
This email was sent via the NESS website contact form.
```

- Set "To email" to: `contact@nunam.com`

### 4. Get Your Credentials
- Service ID: From "Email Services" page
- Template ID: From "Email Templates" page
- Public Key: From "Account" > "General" > "API Keys"

### 5. Update Configuration
Edit `src/lib/email-service.ts` and replace:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID
- `YOUR_PUBLIC_KEY` with your Public Key

## Integrated Forms:

All these forms now send emails automatically:

1. **Contact Installer** (`/contact/installer`)
   - Fields: name, company, email, phone, project type, message

2. **Contact Homeowner** (`/contact/homeowner`)
   - Fields: name, phone, email, city, pincode, message

3. **General Contact** (`/contact`)
   - Fields: name, email, phone, location, property type, message

4. **Product Selector Wizard**
   - Custom quote requests with product details and appliances

## Testing:

After updating the credentials in `src/lib/email-service.ts`, test each form to ensure emails arrive at contact@nunam.com.

## Why EmailJS Instead of Resend?

EmailJS works directly from the frontend without requiring server-side code, making it perfect for this React application. Your Resend API key can be saved for future backend integrations if needed.

## Free Tier Limits:
- 200 emails/month
- 2 email services
- Should be sufficient for contact form submissions

## Alternative (If Preferred):
If you still want to use Resend, you would need to enable Lovable Cloud to create secure server-side email functions.
