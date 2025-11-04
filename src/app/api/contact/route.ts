import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, company, phone, service, message, captchaToken } =
			body;

		// Validate CAPTCHA token
		if (!captchaToken) {
			return NextResponse.json(
				{ message: "CAPTCHA verification is required" },
				{ status: 400 }
			);
		}

		// Verify Cloudflare Turnstile token
		const turnstileResponse = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
					response: captchaToken,
				}),
			}
		);

		const turnstileData = await turnstileResponse.json();

		if (!turnstileData.success) {
			return NextResponse.json(
				{ message: "CAPTCHA verification failed. Please try again." },
				{ status: 400 }
			);
		}

		// Validate required fields
		if (!name || !email || !message) {
			return NextResponse.json(
				{ message: "Name, email, and message are required" },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ message: "Please provide a valid email address" },
				{ status: 400 }
			);
		}

		// Prepare email content
		const emailContent = `
			New Contact Form Submission from Devisery Website
			
			Name: ${name}
			Email: ${email}
			Company: ${company || "Not provided"}
			Phone: ${phone || "Not provided"}
			Service of Interest: ${service || "Not specified"}
			
			Message:
			${message}
			
			---
			This message was sent from the contact form on devisery.com
		`;

		// Send email via Postmark
		const postmarkResponse = await fetch("https://api.postmarkapp.com/email", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN || "",
			},
			body: JSON.stringify({
				From: process.env.FROM_EMAIL || "noreply@devisery.com",
				To: process.env.TO_EMAIL || "hello@devisery.com",
				Subject: `New Contact Form Submission: ${name}`,
				TextBody: emailContent,
				HtmlBody: `
					<!DOCTYPE html>
					<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
							.field { margin-bottom: 15px; }
							.label { font-weight: bold; color: #555; }
							.value { margin-top: 5px; }
							.message-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; }
							.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2>New Contact Form Submission</h2>
								<p>Someone has submitted the contact form on your website.</p>
							</div>
							
							<div class="field">
								<div class="label">Name:</div>
								<div class="value">${name}</div>
							</div>
							
							<div class="field">
								<div class="label">Email:</div>
								<div class="value">${email}</div>
							</div>
							
							${
								company ?
									`
							<div class="field">
								<div class="label">Company:</div>
								<div class="value">${company}</div>
							</div>
							`
								:	""
							}
							
							${
								phone ?
									`
							<div class="field">
								<div class="label">Phone:</div>
								<div class="value">${phone}</div>
							</div>
							`
								:	""
							}
							
							${
								service ?
									`
							<div class="field">
								<div class="label">Service of Interest:</div>
								<div class="value">${service}</div>
							</div>
							`
								:	""
							}
							
							<div class="message-box">
								<div class="label">Message:</div>
								<div class="value">${message.replace(/\n/g, "<br>")}</div>
							</div>
							
							<div class="footer">
								<p>This message was sent from the contact form on devisery.com</p>
								<p>Sent at: ${new Date().toLocaleString()}</p>
							</div>
						</div>
					</body>
					</html>
				`,
				MessageStream: "outbound",
			}),
		});

		if (!postmarkResponse.ok) {
			const errorData = await postmarkResponse.json();
			console.error("Postmark API error:", errorData);

			return NextResponse.json(
				{ message: "Failed to send email. Please try again later." },
				{ status: 500 }
			);
		}

		// Send confirmation email to the user
		const confirmationResponse = await fetch(
			"https://api.postmarkapp.com/email",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN || "",
				},
				body: JSON.stringify({
					From: process.env.FROM_EMAIL || "noreply@devisery.com",
					To: email,
					Subject: "Thank you for contacting Devisery",
					TextBody: `
					Dear ${name},
					
					Thank you for reaching out to Devisery Business Consulting. We've received your message and will get back to you within 24 hours.
					
					Here's a copy of your submission:
					
					Name: ${name}
					Email: ${email}
					Company: ${company || "Not provided"}
					Phone: ${phone || "Not provided"}
					Service of Interest: ${service || "Not specified"}
					
					Message:
					${message}
					
					We look forward to helping you transform your business!
					
					Best regards,
					The Devisery Team
					
					---
					Devisery Business Consulting
					Austin, Texas
					hello@devisery.com
				`,
					HtmlBody: `
					<!DOCTYPE html>
					<html>
					<head>
						<style>
							body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
							.container { max-width: 600px; margin: 0 auto; padding: 20px; }
							.header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
							.content { margin-bottom: 20px; }
							.submission { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; }
							.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #666; }
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h2>Thank You for Contacting Devisery!</h2>
								<p>We've received your message and will get back to you within 24 hours.</p>
							</div>
							
							<div class="content">
								<p>Dear ${name},</p>
								
								<p>Thank you for reaching out to Devisery Business Consulting. We're excited to learn more about your business goals and how we can help you achieve them.</p>
								
								<p>Here's a copy of your submission for your records:</p>
							</div>
							
							<div class="submission">
								<p><strong>Name:</strong> ${name}</p>
								<p><strong>Email:</strong> ${email}</p>
								${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
								${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
								${service ? `<p><strong>Service of Interest:</strong> ${service}</p>` : ""}
								<p><strong>Message:</strong></p>
								<p>${message.replace(/\n/g, "<br>")}</p>
							</div>
							
							<div class="content">
								<p>We look forward to helping you transform your business and achieve sustainable growth!</p>
								
								<p>Best regards,<br>
								<strong>The Devisery Team</strong></p>
							</div>
							
							<div class="footer">
								<p><strong>Devisery Business Consulting</strong></p>
								<p>Austin, Texas | hello@devisery.com</p>
								<p>Professional business consulting services for Austin businesses</p>
							</div>
						</div>
					</body>
					</html>
				`,
					MessageStream: "outbound",
				}),
			}
		);

		if (!confirmationResponse.ok) {
			console.warn("Failed to send confirmation email to user");
		}

		return NextResponse.json(
			{ message: "Message sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Contact form error:", error);

		return NextResponse.json(
			{ message: "Internal server error. Please try again later." },
			{ status: 500 }
		);
	}
}
