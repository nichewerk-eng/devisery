import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog | Devisery",
	description:
		"Insights on growth, operations, and strategy from Devisery consultants.",
};

export default function BlogPage() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Devisery Blog",
		description: metadata.description,
		publisher: {
			"@type": "Organization",
			name: "Devisery Business Consulting",
		},
	};

	return (
		<>
			<Script
				id="blog-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Hero */}
			<section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/assets/hero-image-v2.png"
						width={1600}
						height={900}
						alt="Devisery Blog"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
				<div className="container mx-auto px-6 py-16 relative z-10">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold tracking-wider text-blue-300 mb-3">
							INSIGHTS
						</p>
						<h1
							className="text-5xl md:text-6xl font-bold leading-tight text-white uppercase"
							style={{ fontFamily: "Oswald-PFG, sans-serif" }}
						>
							Ideas to Grow Smarter
						</h1>
						<p className="mt-5 text-gray-200 text-lg">
							Strategic guides, playbooks, and operator lessons from the field.
						</p>
					</div>
				</div>
			</section>

			{/* Featured posts */}
			<section className="py-16 bg-gradient-subtle">
				<div className="container mx-auto px-6 max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[1, 2, 3].map((i) => (
							<article
								key={i}
								className="group bg-card/60 backdrop-blur-sm rounded-xl border border-border overflow-hidden hover:shadow-glow transition-all"
							>
								<div className="relative h-44">
									<Image
										src="/assets/hero-image.jpg"
										alt="Post"
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-5">
									<div className="text-xs text-muted-foreground mb-1">
										March {10 + i}, 2024
									</div>
									<h3 className="text-lg font-semibold text-card-foreground mb-2">
										<Link href="#" className="hover:text-[#3095d2]">
											Operator Playbook #{i}
										</Link>
									</h3>
									<p className="text-sm text-muted-foreground">
										Actionable steps to drive growth and efficiency this
										quarter.
									</p>
									<div className="mt-4">
										<Link
											href="#"
											className="text-sm font-medium text-[#3095d2] hover:text-[#324c82]"
										>
											Read more →
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Subscribe CTA */}
			<section className="py-16">
				<div className="container mx-auto px-6 max-w-2xl text-center">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground">
						Get the playbook in your inbox
					</h2>
					<p className="mt-3 text-muted-foreground">
						Monthly strategies and templates. No spam.
					</p>
					<form className="mt-6 flex flex-col sm:flex-row gap-3">
						<input
							type="email"
							required
							placeholder="your@email.com"
							className="flex-1 px-4 py-3 rounded-lg border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3095d2]"
						/>
						<button className="px-6 py-3 rounded-lg bg-[#3095d2] hover:bg-[#324c82] text-white font-medium">
							Subscribe
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
