"use client";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Mail, Calendar, Shield } from "lucide-react";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		challenge: "",
		industry: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<null | { ok: boolean; message: string }>(
		null
	);
	const [captchaToken, setCaptchaToken] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus(null);

		// Validate CAPTCHA
		if (!captchaToken) {
			setStatus({
				ok: false,
				message: "Please complete the CAPTCHA verification.",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone || undefined,
					company: formData.company || undefined,
					businessType: formData.industry || undefined,
					message: formData.challenge || "(no message)",
					captchaToken,
				}),
			});
			if (!res.ok) {
				const data = await res
					.json()
					.catch(() => ({ message: "Failed to send." }));
				throw new Error(data.message || "Failed to send.");
			}
			setStatus({
				ok: true,
				message: "Thanks! We\'ll get back within 24 hours.",
			});
			setFormData({
				name: "",
				email: "",
				phone: "",
				company: "",
				challenge: "",
				industry: "",
			});
			setCaptchaToken(""); // Reset captcha
		} catch (err: unknown) {
			setStatus({
				ok: false,
				message: err instanceof Error ? err.message : "Something went wrong.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 max-w-lg">
			{/* Header with Urgency */}
			<div className="text-center mb-6">
				<h3 className="text-xl font-bold text-gray-900 mb-2">
					Get Your FREE Business Analysis
				</h3>
				<p className="text-sm text-gray-600">
					$500 value • 30-minute session • No obligation
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="name" className="text-sm font-medium text-gray-700">
						Full Name *
					</Label>
					<Input
						id="name"
						type="text"
						placeholder="John Smith"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="mt-1"
						required
					/>
				</div>

				<div>
					<Label htmlFor="email" className="text-sm font-medium text-gray-700">
						Business Email *
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="john@company.com"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						className="mt-1"
						required
					/>
				</div>

				<div>
					<Label htmlFor="phone" className="text-sm font-medium text-gray-700">
						Phone Number *
					</Label>
					<Input
						id="phone"
						type="tel"
						placeholder="(555) 123-4567"
						value={formData.phone}
						onChange={(e) =>
							setFormData({ ...formData, phone: e.target.value })
						}
						className="mt-1"
						required
					/>
				</div>

				<div>
					<Label
						htmlFor="company"
						className="text-sm font-medium text-gray-700"
					>
						Company (optional)
					</Label>
					<Input
						id="company"
						type="text"
						placeholder="Company Inc."
						value={formData.company}
						onChange={(e) =>
							setFormData({ ...formData, company: e.target.value })
						}
						className="mt-1"
					/>
				</div>

				<div>
					<Label
						htmlFor="industry"
						className="text-sm font-medium text-gray-700"
					>
						Type of business
					</Label>
					<Select
						onValueChange={(value) =>
							setFormData({ ...formData, industry: value })
						}
					>
						<SelectTrigger className="mt-1">
							<SelectValue placeholder="Select a business type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="retail">Retail</SelectItem>
							<SelectItem value="healthcare">Healthcare</SelectItem>
							<SelectItem value="technology">Technology</SelectItem>
							<SelectItem value="manufacturing">Manufacturing</SelectItem>
							<SelectItem value="services">Professional Services</SelectItem>
							<SelectItem value="restaurant">Restaurant / Food</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label
						htmlFor="challenge"
						className="text-sm font-medium text-gray-700"
					>
						Biggest Business Challenge
					</Label>
					<Textarea
						id="challenge"
						placeholder="What's your main pain point?"
						value={formData.challenge}
						onChange={(e) =>
							setFormData({ ...formData, challenge: e.target.value })
						}
						className="mt-1 h-20 resize-none"
					/>
				</div>

				{/* Cloudflare Turnstile CAPTCHA */}
				<div className="flex justify-center">
					<Turnstile
						siteKey={
							process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
							"1x00000000000000000000AA"
						}
						onSuccess={setCaptchaToken}
						onError={() => setCaptchaToken("")}
						onExpire={() => setCaptchaToken("")}
					/>
				</div>

				<Button
					type="submit"
					className="w-full bg-[#3095d2] hover:bg-[#324c82] text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
					disabled={isSubmitting || !captchaToken}
				>
					<Calendar className="w-4 h-4 mr-2" />
					{isSubmitting ? "Sending..." : "Book My FREE Consultation"}
				</Button>
			</form>

			{status && (
				<p
					className={`mt-4 text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}
				>
					{status.message}
				</p>
			)}

			{/* Trust Signals */}
			<div className="mt-4 pt-4 border-t border-gray-200">
				<div className="flex items-center justify-center gap-4 text-xs text-gray-500">
					<div className="flex items-center gap-1">
						<Shield className="w-3 h-3" />
						<span>100% Confidential</span>
					</div>
					<div className="flex items-center gap-1">
						<Mail className="w-3 h-3" />
						<span>No Spam</span>
					</div>
				</div>
			</div>
		</div>
	);
}
