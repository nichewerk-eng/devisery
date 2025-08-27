import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
	title: "About Us | Devisery",
	description:
		"Learn about Devisery - our mission, values, and team dedicated to providing exceptional services.",
};

export default function AboutPage() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Devisery Business Consulting",
		url: "https://www.devisery.com",
		logo: "https://www.devisery.com/logo.png",
		description:
			"Business consulting focused on growth, operational excellence, and sustainable systems.",
		areaServed: {
			"@type": "City",
			name: "Austin",
		},
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "sales",
			email: "hello@devisery.com",
			telephone: "+1-512-555-1234",
		},
	};

	return (
		<>
			{/* JSON-LD */}
			<Script
				id="about-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Hero */}
			<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/assets/hero-image-v2.png"
						width={1600}
						height={900}
						alt="About Devisery"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
				<div className="container mx-auto px-6 py-24 relative z-10">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold tracking-wider text-blue-300 mb-3">
							ABOUT DEVISERY
						</p>
						<h1
							className="text-5xl md:text-6xl font-bold leading-tight text-white uppercase"
							style={{ fontFamily: "Oswald-PFG, sans-serif" }}
						>
							We Build Businesses That Last
						</h1>
						<p className="mt-5 text-gray-200 text-lg">
							Strategy, systems, and execution—focused on measurable outcomes
							and sustainable growth.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-[#3095d2] hover:bg-[#324c82] text-white px-7"
								>
									Book a Free Consultation
								</Button>
							</Link>
							<Link href="/services">
								<Button
									variant="outline"
									size="lg"
									className="border-white/40 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20"
								>
									Explore Services
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Credo / Values */}
			<section className="py-16 bg-gradient-subtle">
				<div className="container mx-auto px-6">
					<div className="mx-auto max-w-3xl text-center mb-10">
						<h2 className="text-3xl font-bold text-foreground">
							Our Operating Principles
						</h2>
						<p className="mt-3 text-muted-foreground">
							We combine senior expertise with pragmatic execution. No fluff,
							just outcomes.
						</p>
					</div>

					<div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
							<h3 className="text-lg font-semibold text-card-foreground mb-2">
								Outcome-Driven
							</h3>
							<p className="text-sm text-muted-foreground">
								We set KPIs up front and work backwards from measurable impact.
							</p>
						</div>
						<div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
							<h3 className="text-lg font-semibold text-card-foreground mb-2">
								Systems First
							</h3>
							<p className="text-sm text-muted-foreground">
								We install processes that make wins repeatable and scalable.
							</p>
						</div>
						<div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
							<h3 className="text-lg font-semibold text-card-foreground mb-2">
								Speed + Clarity
							</h3>
							<p className="text-sm text-muted-foreground">
								Quick wins in 30–60 days; durable results in 90–180.
							</p>
						</div>
						<div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
							<h3 className="text-lg font-semibold text-card-foreground mb-2">
								Transparent Partner
							</h3>
							<p className="text-sm text-muted-foreground">
								Radical candor, weekly reporting, and decision-ready insights.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Founding story / Social proof */}
			<section className="py-16">
				<div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
							Our Story
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							Founded in Austin, Devisery partners with local businesses to
							unlock growth, streamline operations, and build resilient
							organizations. We blend strategy with hands-on execution so
							progress is visible every week.
						</p>
						<div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
							<span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
								100+ Clients
							</span>
							<span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
								95% Success Rate
							</span>
							<span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
								20+ Years Experience
							</span>
						</div>
					</div>
					<div className="relative h-72 md:h-96 rounded-xl overflow-hidden border">
						<Image
							src="/assets/hero-image.jpg"
							alt="Devisery team working"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground">
						Ready to see what we can do for your business?
					</h2>
					<p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
						Book a free 30-minute strategy session. We’ll identify quick wins
						and lay out a clear roadmap.
					</p>
					<div className="mt-6 flex justify-center">
						<Link href="/contact">
							<Button
								size="lg"
								className="bg-[#3095d2] hover:bg-[#324c82] text-white px-8"
							>
								Book Free Consultation
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
