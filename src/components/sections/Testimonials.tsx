import { StarIcon } from "@heroicons/react/20/solid";

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		content:
			"Devisery transformed our entire digital infrastructure. Their expertise and dedication to excellence is unmatched. We saw a 300% increase in efficiency within the first quarter.",
		rating: 5,
		avatar: "/avatars/sarah.jpg",
	},
	{
		id: 2,
		name: "Michael Rodriguez",
		content:
			"Working with Devisery was a game-changer for our startup. They delivered exactly what we needed, on time and within budget. Their technical expertise is outstanding.",
		rating: 5,
		avatar: "/avatars/michael.jpg",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		content:
			"The team at Devisery doesn\'t just deliver solutions; they deliver results. Our revenue increased by 250% after implementing their recommended strategies.",
		rating: 5,
		avatar: "/avatars/emily.jpg",
	},
];

export default function Testimonials() {
	return (
		<div className="bg-primary py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl text-center">
					<h2 className="text-lg font-semibold leading-8 tracking-tight text-secondary">
						Testimonials
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
						What Our Clients Say
					</p>
				</div>

				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.id}
								className="bg-card p-8 rounded-2xl border border-border shadow-elegant hover:shadow-glow transition-all duration-300 hover-scale"
							>
								<div className="flex items-center gap-x-1 text-yellow-500 mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<StarIcon key={i} className="h-5 w-5" />
									))}
								</div>

								<blockquote className="text-card-foreground">
									<p className="text-sm leading-6">
										&quot;{testimonial.content}&quot;
									</p>
								</blockquote>

								<figcaption className="mt-6 flex items-center gap-x-4">
									<div className="h-10 w-10 rounded-full bg-muted" />
									<div>
										<div className="font-semibold text-card-foreground">
											{testimonial.name}
										</div>
									</div>
								</figcaption>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
