import Image from "next/image";
import Link from "next/link";
import { Mail} from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-background border-t border-border">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
					{/* Company Info */}
					<div>
						<Link href="/" className="flex items-center space-x-2">
							<Image
								src="/assets/CadegoryIcon_1_official.png"
								alt="Devisery Business Consulting"
								width={40}
								height={40}
							/>
							<span className="text-lg font-bold text-foreground">
								Devisery
							</span>
						</Link>
						<p className="mt-4 text-sm text-muted-foreground leading-relaxed">
							Helping Austin businesses grow smarter with strategy, consulting,
							and expert guidance since 2025.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
							Quick Links
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link
									href="/about"
									className="text-muted-foreground hover:text-primary transition"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/services"
									className="text-muted-foreground hover:text-primary transition"
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-muted-foreground hover:text-primary transition"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info (Local SEO Boost) */}
					<div>
						<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
							Contact
						</h3>
						<ul className="space-y-3 text-sm text-muted-foreground">
							<li className="flex items-center">
								<Mail className="h-4 w-4 mr-2 text-primary" />
								hello@devisery.com
							</li>
						</ul>
					</div>

					{/* CTA */}
					<div>
						<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
							Get Started
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Ready to grow your business? Schedule a free consultation today.
						</p>
						<Link
							href="/contact"
							className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-glow transition hover-scale"
						>
							Free Consultation
						</Link>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
					<p>
						© {new Date().getFullYear()} Devisery Business Consulting. All
						rights reserved.
					</p>

					<div className="flex items-center space-x-2 mt-4 md:mt-0">
						<span>Website by</span>
						<a
							href="https://nichedoor.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center"
						>
							<Image
								src="/assets/nd_logo.png"
								alt="Nichedoor Web Design"
								className="h-6 w-auto"
								width={120}
								height={60}
								style={{ filter: "brightness(0.95)" }}
							/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
