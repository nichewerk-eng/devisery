# Postmark API Setup Guide

## Overview

The contact form on the Devisery website is integrated with Postmark API for reliable email delivery. This guide will help you set up the necessary configuration.

## Prerequisites

1. A Postmark account (https://postmarkapp.com)
2. A verified domain or sender signature
3. A Postmark server with API access

## Setup Steps

### 1. Create Postmark Account

- Sign up at https://postmarkapp.com
- Verify your domain or create a sender signature
- Create a new server for your application

### 2. Get API Credentials

- Go to your Postmark server dashboard
- Copy the **Server Token** (API key)
- Note your verified sender email address

### 3. Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Postmark API Configuration
POSTMARK_SERVER_TOKEN=your_actual_server_token_here

# Email Configuration
FROM_EMAIL=noreply@devisery.com
TO_EMAIL=hello@devisery.com
```

### 4. Domain Verification

- In Postmark, verify your domain (devisery.com)
- Set up SPF, DKIM, and DMARC records
- Wait for verification (usually 24-48 hours)

### 5. Test the Integration

- Fill out the contact form on your website
- Check that emails are delivered to your inbox
- Verify the user receives a confirmation email

## Email Templates

The system sends two types of emails:

### 1. Notification Email (to you)

- **Subject**: "New Contact Form Submission: [Name]"
- **Content**: All form details in a formatted HTML email
- **Recipient**: Your business email (TO_EMAIL)

### 2. Confirmation Email (to user)

- **Subject**: "Thank you for contacting Devisery"
- **Content**: Confirmation message with copy of their submission
- **Recipient**: The person who submitted the form

## Troubleshooting

### Common Issues

**Emails not sending:**

- Check POSTMARK_SERVER_TOKEN is correct
- Verify domain is verified in Postmark
- Check server logs for API errors

**Emails going to spam:**

- Ensure proper SPF/DKIM setup
- Use verified sender addresses
- Monitor Postmark delivery statistics

**API rate limits:**

- Postmark has generous limits (10,000 emails/month on free tier)
- Monitor usage in your dashboard

### Testing

- Use Postmark's test mode for development
- Test with real email addresses
- Check both HTML and text versions

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Postmark tokens have full access to your account
- Consider using restricted API keys for production

## Support

- Postmark Documentation: https://postmarkapp.com/developer
- Postmark Support: https://postmarkapp.com/support
- API Reference: https://postmarkapp.com/developer/api/overview

## Cost

- Postmark offers 10,000 emails/month free
- Additional emails: $15 per 10,000
- No setup fees or monthly charges
