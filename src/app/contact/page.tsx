import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";
import {
	Shield,
	Users,
	Award,
	Phone,
	Mail,
	CalendarClock,
	MapPin,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Contact Us | Devisery",
	description:
		"Book a free 30-minute strategy session. Ask questions and get clear next steps for growth.",
};

export default function ContactPage() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact Devisery",
		description: metadata.description,
		url: "https://www.devisery.com/contact",
	};

	return (
		<>
			<Script
				id="contact-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Form + Sidebar */}
			<section className="py-16">
				<div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-3 gap-8 items-start">
					{/* Lead form */}
					<div className="lg:col-span-2">
						<div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-4 md:p-6">
							<ContactForm />
							<p className="mt-4 text-xs text-muted-foreground">
								Prefer email? Reach us at{" "}
								<a className="underline" href="mailto:hello@devisery.com">
									hello@devisery.com
								</a>
							</p>
						</div>
					</div>

					{/* Sidebar: direct contact, office, process */}
					<div className="space-y-6">
						<div className="rounded-xl border bg-card p-6">
							<h2 className="text-lg font-semibold text-card-foreground mb-3">
								Talk to us directly
							</h2>
							<div className="space-y-3">
								<a
									href="mailto:hello@devisery.com"
									className="flex items-center gap-3 rounded-lg border px-3 py-2 hover:bg-accent transition-colors"
								>
									<Mail className="w-5 h-5 text-primary" />
									<span className="text-sm">hello@devisery.com</span>
								</a>
							</div>
						</div>

						<div className="rounded-xl border bg-card p-6">
							<h2 className="text-lg font-semibold text-card-foreground mb-3">
								Our office
							</h2>
							<div className="flex items-start gap-3 text-sm text-muted-foreground">
								<MapPin className="w-5 h-5 text-primary mt-0.5" />
								<div>Austin, TX 78701</div>
							</div>
							<div className="relative mt-4 h-40 rounded-lg overflow-hidden border">
								<Image
									src="/assets/hero-image.jpg"
									alt="Map placeholder"
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<div className="rounded-xl border bg-card p-6">
							<h2 className="text-lg font-semibold text-card-foreground mb-3">
								What happens next
							</h2>
							<ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
								<li>30‑minute call to learn your goals and constraints</li>
								<li>3 quick‑win recommendations within 48 hours</li>
								<li>Roadmap + proposal only if there’s strong ROI</li>
							</ol>
							<div className="mt-4 grid grid-cols-3 gap-3 text-center">
								<div className="rounded-lg border bg-white/50 p-3">
									<Shield className="w-5 h-5 mx-auto text-green-600" />
									<p className="text-[11px] mt-1">Risk‑Free</p>
								</div>
								<div className="rounded-lg border bg-white/50 p-3">
									<Users className="w-5 h-5 mx-auto text-blue-600" />
									<p className="text-[11px] mt-1">100+ Clients</p>
								</div>
								<div className="rounded-lg border bg-white/50 p-3">
									<Award className="w-5 h-5 mx-auto text-yellow-600" />
									<p className="text-[11px] mt-1">Proven</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
