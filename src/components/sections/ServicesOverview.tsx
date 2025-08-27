"use client";

import Script from "next/script";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const services = [
	{
		title: "Business Growth",
		description:
			"Accelerate revenue and market share with proven growth strategies designed for Austin businesses. From startups to established companies, we help you expand with confidence.",
		icon: "fi-br-stats",
		image: "/assets/business_growth_v2.png",
		accentFrom: "#3095d2",
		accentTo: "#324c82",
		slug: "business-growth",
	},
	{
		title: "Performance Optimization",
		description:
			"Boost productivity and streamline operations with tailored strategies. We work with Austin companies to cut inefficiencies and unlock higher performance across teams.",
		icon: "fi-br-rocket",
		image: "/assets/hero-image.jpg",
		accentFrom: "#f97316",
		accentTo: "#db2777",
		slug: "performance-optimization",
	},
	{
		title: "Expert Advisors",
		description:
			"Work directly with experienced Austin business consultants who understand local challenges and opportunities. Get the insights and strategies needed to stay ahead of the competition.",
		icon: "fi-br-user-crown",
		image: "/assets/expert_adv.png",
		accentFrom: "#0ea5e9",
		accentTo: "#0369a1",
		slug: "expert-advisors",
	},
	{
		title: "Financial Planning",
		description:
			"Secure your company’s financial future with comprehensive planning. From cash flow to long-term investment strategies, we guide Austin businesses to financial stability and growth.",
		icon: "fi-br-calculator",
		image: "/assets/financial_advice.jpg",
		accentFrom: "#eab308",
		accentTo: "#a16207",
		slug: "financial-planning",
	},
];

export default function ServicesOverview() {
	// ✅ JSON-LD Structured Data (SEO Boost)
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		provider: {
			"@type": "LocalBusiness",
			name: "Devisery Business Consulting",
			image: "https://www.devisery.com/logo.png",
			address: {
				"@type": "PostalAddress",
				streetAddress: "123 Austin Business Blvd",
				addressLocality: "Austin",
				addressRegion: "TX",
				postalCode: "78701",
				addressCountry: "US",
			},
			telephone: "+1-512-555-1234",
			url: "https://www.devisery.com",
		},
		serviceType: "Business Consulting",
		areaServed: {
			"@type": "City",
			name: "Austin",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Devisery Consulting Services",
			itemListElement: services.map((service) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: service.title,
					description: service.description,
					url: `https://www.devisery.com/services/${service.slug}`,
				},
			})),
		},
	};

	// Presentation-like slide deck state
	const [index, setIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [progress, setProgress] = useState(0);
	const slideCount = services.length;
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const progressRef = useRef<NodeJS.Timeout | null>(null);
	const lastWheelTs = useRef(0);
	const touchStartX = useRef<number | null>(null);

	const durationMs = 5000;

	const goTo = (i: number) =>
		setIndex(((i % slideCount) + slideCount) % slideCount);
	const next = useCallback(() => {
		setIndex((i) => (i + 1) % slideCount);
		setProgress(0);
	}, [slideCount]);
	const prev = useCallback(() => {
		setIndex((i) => (i - 1 + slideCount) % slideCount);
		setProgress(0);
	}, [slideCount]);

	useEffect(() => {
		if (isHovered) {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (progressRef.current) clearInterval(progressRef.current);
			return;
		}
		const startTs = Date.now();
		intervalRef.current = setInterval(next, durationMs);
		progressRef.current = setInterval(() => {
			const elapsed = Date.now() - startTs;
			setProgress(Math.min(100, Math.round((elapsed / durationMs) * 100)));
		}, 80);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (progressRef.current) clearInterval(progressRef.current);
		};
	}, [isHovered, next]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [next, prev]);

	const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		const now = Date.now();
		if (now - lastWheelTs.current < 800) return;
		lastWheelTs.current = now;
		if (e.deltaY > 10) next();
		else if (e.deltaY < -10) prev();
	};

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		touchStartX.current = e.touches[0]?.clientX ?? null;
	};
	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		if (touchStartX.current == null) return;
		const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
		if (Math.abs(dx) > 50) {
			if (dx < 0) {
				next();
			} else {
				prev();
			}
		}
		touchStartX.current = null;
	};

	return (
		<section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
			{/* ✅ Structured Data for SEO */}
			<Script
				id="services-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center mb-10">
					<h2 className="text-sm font-semibold tracking-wider text-[#3095d2] mb-2">
						Our Services, At a Glance
					</h2>
					<h1
						className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black uppercase"
						style={{ fontFamily: "Oswald-PFG, sans-serif" }}
					>
						Think of this like your strategy deck
					</h1>
				</div>

				{/* Slide frame with perspective */}
				<div
					className="relative mx-auto max-w-5xl md:aspect-[16/9] min-h-[65vh] md:min-h-0 rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden perspective-[1200px]"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onWheel={handleWheel}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
					aria-live="polite"
				>
					{/* Progress bar */}
					<div className="absolute left-0 top-0 h-1 w-full bg-gray-100">
						<div
							className="h-full bg-[#3095d2] transition-[width] duration-100"
							style={{ width: `${progress}%` }}
						/>
					</div>

					{/* Theme ribbon like a PPT template (uses current service accents) */}
					<div
						className="absolute -left-10 -top-10 h-28 w-80 rotate-[-12deg] opacity-90"
						style={{
							backgroundImage: `linear-gradient(90deg, ${services[index].accentFrom}, ${services[index].accentTo})`,
						}}
					></div>
					<div className="absolute -left-10 -top-14 h-28 w-60 rotate-[-12deg] bg-white/20"></div>

					{/* Slide content */}
					{services.map((s, i) => (
						<div
							key={s.title}
							className={`absolute inset-0 transition-all duration-500 ease-out [transform-style:preserve-3d] ${
								i === index ? "opacity-100 translate-x-0 rotate-y-0"
								: i < index ? "opacity-0 -translate-x-10 -rotate-y-[25deg]"
								: "opacity-0 translate-x-10 rotate-y-[25deg]"
							}`}
							role={i === index ? "group" : undefined}
							aria-hidden={i !== index}
						>
							<div className="grid h-full grid-cols-1 md:grid-cols-4">
								<div className="relative z-10 p-8 md:p-10 flex flex-col justify-center md:col-span-3">
									<h3 className="text-3xl md:text-4xl font-bold text-gray-900">
										{s.title}
									</h3>
									<ul className="mt-6 space-y-3 text-gray-700">
										<li className="flex gap-3">
											<span
												className="mt-1.5 size-1.5 rounded-full"
												style={{ backgroundColor: s.accentFrom }}
											></span>
											<span>{s.description}</span>
										</li>
										<li className="flex gap-3">
											<span
												className="mt-1.5 size-1.5 rounded-full"
												style={{ backgroundColor: s.accentTo }}
											></span>
											<span>
												Tailored roadmap with measurable milestones and ROI
												focus.
											</span>
										</li>
										<li className="flex gap-3">
											<span className="mt-1.5 size-1.5 rounded-full bg-gray-400"></span>
											<span>Hands‑on support from senior consultants.</span>
										</li>
									</ul>
								</div>
								<div className="relative hidden md:block md:col-span-1">
									{/* Service image with Ken Burns effect and overlay */}
									<div className="absolute inset-0 overflow-hidden">
										<Image
											src={s.image}
											alt={s.title}
											width={1250}
											height={1250}
											className="h-full w-full object-cover scale-105 animate-[kenburns_12s_ease-in-out_infinite]"
										/>
										<div
											className="absolute inset-0"
											style={{
												backgroundImage: `linear-gradient(135deg, ${s.accentFrom}33, transparent 60%)`,
											}}
										/>
									</div>
									{/* Accent corner */}
									<div
										className="absolute right-0 bottom-0 h-40 w-40 opacity-30 rounded-tl-3xl"
										style={{
											backgroundImage: `linear-gradient(135deg, ${s.accentFrom}, ${s.accentTo})`,
										}}
									/>
								</div>
							</div>
						</div>
					))}

					{/* Controls */}
					<button
						aria-label="Previous slide"
						onClick={prev}
						className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
					>
						<span className="sr-only">Previous</span>
						<svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
							<path d="M12.707 5.293a1 1 0 0 1 0 1.414L9.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0Z" />
						</svg>
					</button>
					<button
						aria-label="Next slide"
						onClick={next}
						className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
					>
						<span className="sr-only">Next</span>
						<svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
							<path d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" />
						</svg>
					</button>

					{/* Centered thumbnail strip inside slide */}
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-2 py-1 shadow">
						{services.map((s, i) => (
							<button
								key={s.slug}
								aria-label={`Go to slide ${i + 1}`}
								onClick={() => goTo(i)}
								className={`relative rounded-md overflow-hidden border transition-all ${i === index ? "scale-100 border-gray-400" : "scale-95 border-gray-300 hover:scale-100"}`}
							>
								<Image
									src={s.image}
									alt={s.title}
									width={64}
									height={40}
									className="h-10 w-16 object-cover"
								/>
							</button>
						))}
					</div>
				</div>
			</div>
			{/* Ken Burns keyframes */}
			<style jsx global>{`
				@keyframes kenburns {
					0% {
						transform: scale(1.05);
					}
					50% {
						transform: scale(1.12);
					}
					100% {
						transform: scale(1.05);
					}
				}
			`}</style>
		</section>
	);
}
