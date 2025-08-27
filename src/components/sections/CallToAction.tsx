import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CallToAction() {
	return (
		<div className="bg-primary">
			<div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2
						className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
						style={{ fontFamily: "Oswald-PFG, sans-serif" }}
					>
						READY TO TRANSFORM YOUR BUSINESS?
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
						Join hundreds of successful companies who have partnered with
						Devisery to achieve their goals. Let’s discuss how we can help you
						grow.
					</p>
					<div className=" mt-8 text-center">
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/contact">
								<Button
									size="lg"
									className="shadow-elegant hover:shadow-glow hover-scale bg-[#3095d2] hover:bg-[#324c82] text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
								>
									Claim Your Free Consultation
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
