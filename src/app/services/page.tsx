import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import servicesData from "@/data/services.json";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
	title: "Our Services | Devisery",
	description:
		"Business growth, operations, and strategy services designed for measurable impact.",
};

export default function ServicesPage() {
	const list = (
		servicesData as {
			services: Array<{ id: string; title: string; description: string }>;
		}
	).services;
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		provider: {
			"@type": "Organization",
			name: "Devisery Business Consulting",
			url: "https://www.devisery.com",
		},
		serviceType: "Business Consulting",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Devisery Services",
			itemListElement: list.map((s) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: s.title,
					description: s.description,
					url: `https://www.devisery.com/services/${s.id}`,
				},
			})),
		},
	};

	return (
		<>
			<Script
				id="services-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Hero */}
			<section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/assets/hero-image-v2.png"
						width={1600}
						height={900}
						alt="Our services"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
				<div className="container mx-auto px-6 py-20 relative z-10">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold tracking-wider text-blue-300 mb-3">
							SERVICES
						</p>
						<h1
							className="text-5xl md:text-6xl font-bold leading-tight text-white uppercase"
							style={{ fontFamily: "Oswald-PFG, sans-serif" }}
						>
							Expert Consulting for Growth and Efficiency
						</h1>
						<p className="mt-5 text-gray-200 text-lg">
							We help businesses grow revenue, streamline operations, and make
							better decisions—fast.
						</p>
						<div className="mt-8">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-[#3095d2] hover:bg-[#324c82] text-white px-8"
								>
									Talk to an Expert
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Offerings */}
			<section className="py-16 bg-gradient-subtle">
				<div className="container mx-auto px-6 max-w-6xl">
					<div className="mx-auto max-w-2xl text-center mb-10">
						<h2 className="text-3xl font-bold text-foreground">What We Do</h2>
						<p className="mt-3 text-muted-foreground">
							A focused set of services that drive measurable business outcomes.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{list.map((s) => (
							<article
								key={s.id}
								className="group relative bg-card/60 backdrop-blur-sm p-6 rounded-xl border border-border shadow-elegant hover:shadow-glow transition-all"
							>
								<h3 className="text-xl font-semibold text-card-foreground mb-2">
									{s.title}
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									{s.description}
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#3095d2] to-[#324c82] opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Lead magnet */}
			<section className="py-16">
				<div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
							Free 30-Minute Strategy Session
						</h2>
						<p className="text-muted-foreground">
							Walk away with 3 actionable recommendations tailored to your
							business. No obligation.
						</p>
						<div className="mt-6">
							<Link href="/contact">
								<Button
									size="lg"
									className="bg-[#3095d2] hover:bg-[#324c82] text-white px-8"
								>
									Book Now
								</Button>
							</Link>
						</div>
					</div>
					<div className="relative h-64 md:h-80 rounded-xl overflow-hidden border">
						<Image
							src="/assets/hero-image.jpg"
							alt="Strategy session"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
