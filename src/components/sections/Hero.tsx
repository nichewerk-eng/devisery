"use client";

import { ArrowRight, Users, TrendingUp, Award, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { ContactForm } from "./ContactForm";
import Image from "next/image";

export function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Full Width Background Image */}
			<div className="absolute inset-0">
				<Image
					src="/assets/hero-image-v2.png"
					width={1000}
					height={1000}
					alt="Business consultant teaching and presenting to clients in professional office setting"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Gradient Overlay for Text Readability */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

			<div className="container mx-auto px-4 py-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<div className="space-y-8 max-w-2xl">
						{/* Main Headline */}
						<div className="space-y-4">
							<h1
								className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white uppercase"
								style={{ fontFamily: "Oswald-PFG, sans-serif" }}
							>
								Transform Your
								<br />
								Business Today
							</h1>

							<p className="text-xl md:text-2xl text-gray-200 max-w-lg leading-relaxed">
								Expert consulting that drives real results. We help local
								businesses grow, streamline operations, and increase
								profitability.
							</p>
						</div>

						{/* Enhanced CTA Section */}
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-[#3095d2] hover:bg-[#324c82] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
									onClick={() => {
										window.location.href = "/contact";
									}}
								>
									Book Free Consultation
									<ArrowRight className="w-5 h-5 ml-2" />
								</Button>

								<Button
									variant="outline"
									size="lg"
									className="border-2 border-white/30 hover:border-yellow-400 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
								>
									<Download className="w-5 h-5 mr-2" />
									Free Business Guide
								</Button>
							</div>

							{/* Social Proof */}
							<div className="flex items-center gap-6 pt-4">
								<div className="flex items-center gap-2">
									<Users className="w-5 h-5 text-green-400" />
									<span className="text-sm text-gray-300">100+ Clients</span>
								</div>
								<div className="flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-blue-400" />
									<span className="text-sm text-gray-300">
										95% Success Rate
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Award className="w-5 h-5 text-yellow-400" />
									<span className="text-sm text-gray-300">
										20+ Years Experience
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Content - Dynamic Lead Generation */}
					<div className="relative lg:flex lg:justify-end">
						<ContactForm />
					</div>
				</div>
			</div>

			{/* Bottom Wave */}
			<div className="absolute bottom-0 left-0 right-0">
				<svg
					className="w-full h-20"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
						fill="white"
					/>
				</svg>
			</div>
		</section>
	);
}

export default HeroSection;
