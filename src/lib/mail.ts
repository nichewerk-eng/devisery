// Email service configuration for SendGrid and Postmark
import sgMail, { type MailDataRequired } from "@sendgrid/mail";

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailData {
	to: string;
	from?: string;
	subject: string;
	text?: string;
	html?: string;
	replyTo?: string;
}

export interface ContactFormData {
	name: string;
	email: string;
	subject?: string;
	message: string;
	phone?: string;
}

// SendGrid email service
export async function sendEmailWithSendGrid(emailData: EmailData) {
	try {
		type SGContent = { type: "text/plain" | "text/html"; value: string };
		const parts: SGContent[] = [];
		if (emailData.html)
			parts.push({ type: "text/html", value: emailData.html });
		if (emailData.text)
			parts.push({ type: "text/plain", value: emailData.text });
		if (parts.length === 0)
			parts.push({ type: "text/plain", value: "(no content)" });
		const [first, ...rest] = parts;
		const content = [first, ...rest] as [SGContent, ...SGContent[]];

		await sgMail.send({
			to: emailData.to,
			from: emailData.from || process.env.FROM_EMAIL || "hello@devisery.com",
			subject: emailData.subject,
			content: content as unknown as MailDataRequired["content"],
			replyTo: emailData.replyTo,
		} as unknown as MailDataRequired);
		return { success: true, message: "Email sent successfully" };
	} catch (error) {
		console.error("SendGrid error:", error);
		return { success: false, error: "Failed to send email" };
	}
}

// Postmark email service (alternative)
export async function sendEmailWithPostmark(emailData: EmailData) {
	try {
		const response = await fetch("https://api.postmarkapp.com/email", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN || "",
			},
			body: JSON.stringify({
				From: emailData.from || process.env.FROM_EMAIL || "hello@devisery.com",
				To: emailData.to,
				Subject: emailData.subject,
				TextBody: emailData.text,
				HtmlBody: emailData.html,
				ReplyTo: emailData.replyTo,
			}),
		});

		if (!response.ok) {
			throw new Error(`Postmark API error: ${response.status}`);
		}

		return { success: true, message: "Email sent successfully" };
	} catch (error) {
		console.error("Postmark error:", error);
		return { success: false, error: "Failed to send email" };
	}
}

// Contact form email templates
export function generateContactFormEmail(data: ContactFormData): EmailData {
	const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #374151;">Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          This email was sent from the Devisery contact form on ${new Date().toLocaleDateString()}.
        </p>
      </div>
    </div>
  `;

	const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.subject ? `Subject: ${data.subject}` : ""}

Message:
${data.message}

This email was sent from the Devisery contact form on ${new Date().toLocaleDateString()}.
  `;

	return {
		to: process.env.CONTACT_EMAIL || "hello@devisery.com",
		subject:
			data.subject ?
				`Contact Form: ${data.subject}`
			:	"New Contact Form Submission",
		html,
		text,
		replyTo: data.email,
	};
}

// Auto-reply email template
export function generateAutoReplyEmail(data: ContactFormData): EmailData {
	const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Thank you for contacting Devisery!</h2>
      
      <p>Hi ${data.name},</p>
      
      <p>Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.</p>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #374151;">Your Message Summary</h3>
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; font-style: italic;">${data.message}</p>
      </div>
      
      <p>In the meantime, feel free to:</p>
      <ul>
        <li><a href="https://devisery.com/services" style="color: #2563eb;">Explore our services</a></li>
        <li><a href="https://devisery.com/blog" style="color: #2563eb;">Read our latest blog posts</a></li>
        <li><a href="https://devisery.com/about" style="color: #2563eb;">Learn more about our team</a></li>
      </ul>
      
      <p>Best regards,<br>The Devisery Team</p>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          <strong>Devisery</strong><br>
          Email: hello@devisery.com<br>
          Website: https://devisery.com
        </p>
      </div>
    </div>
  `;

	const text = `
Thank you for contacting Devisery!

Hi ${data.name},

Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.

Your Message Summary:
${data.subject ? `Subject: ${data.subject}` : ""}
Message: ${data.message}

In the meantime, feel free to explore our website at https://devisery.com

Best regards,
The Devisery Team

---
Devisery
Email: hello@devisery.com
Website: https://devisery.com
  `;

	return {
		to: data.email,
		subject: "Thank you for contacting Devisery",
		html,
		text,
	};
}

// Main function to send contact form emails
export async function sendContactFormEmails(data: ContactFormData) {
	const results = [] as Array<{
		type: string;
		success: boolean;
		message?: string;
		error?: string;
	}>;

	// Send notification email to company
	const notificationEmail = generateContactFormEmail(data);
	const notificationResult = await sendEmailWithSendGrid(notificationEmail);
	results.push({ type: "notification", ...notificationResult });

	// Send auto-reply to customer
	const autoReplyEmail = generateAutoReplyEmail(data);
	const autoReplyResult = await sendEmailWithSendGrid(autoReplyEmail);
	results.push({ type: "auto-reply", ...autoReplyResult });

	return results;
}
